// Run against a production server and Chrome with --remote-debugging-port=9223.
// Usage: node scripts/measure-assets.mjs http://127.0.0.1:4175 docs/performance/before.json
import { mkdir, writeFile, stat } from "node:fs/promises";
import { dirname } from "node:path";
import { setTimeout as delay } from "node:timers/promises";

const site = process.argv[2] || "http://127.0.0.1:4175";
const output = process.argv[3];
const debuggerUrl = process.env.CHROME_DEBUG_URL || "http://127.0.0.1:9223";
const version = await fetch(`${debuggerUrl}/json/version`).then((r) => r.json());

async function connect(url) {
  const socket = new WebSocket(url);
  await new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, { once: true });
    socket.addEventListener("error", reject, { once: true });
  });
  let nextId = 0;
  const pending = new Map();
  const listeners = new Set();
  socket.addEventListener("message", ({ data }) => {
    const message = JSON.parse(data);
    if (message.id) {
      const request = pending.get(message.id);
      if (!request) return;
      clearTimeout(request.timer);
      pending.delete(message.id);
      if (message.error) request.reject(new Error(JSON.stringify(message.error)));
      else request.resolve(message.result);
    } else {
      for (const listener of listeners) listener(message);
    }
  });
  return {
    listen: (listener) => listeners.add(listener),
    close: () => socket.close(),
    send(method, params = {}) {
      const id = ++nextId;
      return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
          pending.delete(id);
          reject(new Error(`Timed out: ${method}`));
        }, 30000);
        pending.set(id, { resolve, reject, timer });
        socket.send(JSON.stringify({ id, method, params }));
      });
    },
  };
}

const browser = await connect(version.webSocketDebuggerUrl);
const results = [];
try {
  for (const viewport of [
    { width: 360, height: 800, deviceScaleFactor: 2, mobile: true },
    { width: 390, height: 844, deviceScaleFactor: 3, mobile: true },
    { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false },
  ]) {
    const { browserContextId } = await browser.send("Target.createBrowserContext");
    let page;
    try {
      const { targetId } = await browser.send("Target.createTarget", { url: "about:blank", browserContextId });
      const targets = await fetch(`${debuggerUrl}/json/list`).then((r) => r.json());
      page = await connect(targets.find((target) => target.id === targetId).webSocketDebuggerUrl);
      const requests = new Map();
      page.listen(({ method, params }) => {
        if (method === "Network.responseReceived") {
          const r = params.response;
          requests.set(params.requestId, {
            url: r.url, type: params.type, mimeType: r.mimeType, status: r.status,
            fromDiskCache: !!r.fromDiskCache, fromServiceWorker: !!r.fromServiceWorker,
          });
        }
        if (method === "Network.loadingFinished" && requests.has(params.requestId)) {
          requests.get(params.requestId).encodedDataLength = params.encodedDataLength;
        }
      });
      await page.send("Page.enable");
      await page.send("Network.enable");
      await page.send("Network.setCacheDisabled", { cacheDisabled: true });
      await page.send("Emulation.setDeviceMetricsOverride", viewport);
      if (viewport.mobile) {
        await page.send("Network.setUserAgentOverride", {
          userAgent: `Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${version.Browser.split("/")[1]} Mobile Safari/537.36`,
        });
      }
      const evaluate = async (expression) => {
        const result = await page.send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });
        if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails));
        return result.result.value;
      };
      await page.send("Page.navigate", { url: site });
      let ready = false;
      for (let attempt = 0; attempt < 60; attempt++) {
        ready = await evaluate("document.readyState === 'complete' && !!document.querySelector('.hero-photo') && document.querySelector('.hero-photo').complete");
        if (ready) break;
        await delay(500);
      }
      if (!ready) throw new Error("Page or hero image did not finish loading");
      await evaluate("document.fonts.ready.then(() => true)");
      await delay(1000);
      const initial = await evaluate(`(() => {
        const hero = document.querySelector('.hero-photo');
        return {
          hero: { currentSrc: hero.currentSrc, sizes: hero.sizes, renderedWidth: hero.getBoundingClientRect().width, renderedHeight: hero.getBoundingClientRect().height },
          bodyFont: getComputedStyle(document.body).fontFamily,
          fonts: [...document.fonts].map(font => ({ family: font.family, status: font.status })),
          resources: performance.getEntriesByType('resource').map(r => ({ url: r.name, initiatorType: r.initiatorType, transferSize: r.transferSize, encodedBodySize: r.encodedBodySize, decodedBodySize: r.decodedBodySize })),
          videoElements: document.querySelectorAll('video').length,
          horizontalOverflow: document.documentElement.scrollWidth > innerWidth,
        };
      })()`);
      const initialRequests = structuredClone([...requests.values()]);
      // Scroll the entire document to include any media that might load lazily.
      await evaluate("document.documentElement.style.scrollBehavior = 'auto'");
      const height = await evaluate("document.documentElement.scrollHeight");
      for (let y = 0; y < height; y += viewport.height) {
        await evaluate(`window.scrollTo(0, ${y})`);
        await delay(100);
      }
      await delay(1000);
      results.push({ viewport, ...initial, initialRequests, requestsAfterScroll: [...requests.values()] });
    } finally {
      page?.close();
      await browser.send("Target.disposeBrowserContext", { browserContextId });
    }
  }
} finally {
  browser.close();
}

const report = {
  measuredAt: new Date().toISOString(), site, browser: version.Browser,
  conditions: "Local production build; isolated browser contexts; browser cache disabled; no network or CPU throttling. Mobile viewport and DPR emulation, not a physical phone. encodedBodySize is payload bytes; transferSize includes browser-estimated HTTP overhead. Timing is not a field performance measurement.",
  originalHeroBytes: (await stat(new URL("../public/wal_limpieza.png", import.meta.url))).size,
  results,
};
if (output) {
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, `${JSON.stringify(report, null, 2)}\n`);
}
for (const result of results) {
  console.log(JSON.stringify({
    viewport: result.viewport,
    hero: result.resources.find((resource) => resource.url === result.hero.currentSrc),
    fonts: result.initialRequests.filter((request) => request.type === "Font"),
    videoRequests: result.requestsAfterScroll.filter((request) => request.type === "Media" || /\.(mp4|webm|mov)(\?|$)/i.test(request.url)).length,
    horizontalOverflow: result.horizontalOverflow,
  }, null, 2));
}
