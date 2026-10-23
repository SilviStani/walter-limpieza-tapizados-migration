import { test, expect } from "@playwright/test";
import { business } from "../../lib/contact.js";

const expectedMessage = [
  "Hola Walter, quisiera consultar un presupuesto.",
  "Servicio: Sillones y sofás.",
  "Cantidad: 2.",
  "Barrio o localidad: Candioti.",
  "Detalles: Manchas en el respaldo & apoyabrazos.",
].join("\n");

test.beforeEach(async ({ page }) => {
  // Capture outgoing actions; these tests never contact WhatsApp or send messages.
  await page.addInitScript(() => {
    window.openedLinks = [];
    window.open = (...args) => { window.openedLinks.push(args); return null; };
    window.copiedMessages = [];
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: async (message) => { window.copiedMessages.push(message); } },
    });
  });
  await page.goto("/");
});

async function fillQuote(page) {
  await page.getByRole("radio", { name: "Sillones y sofás", exact: true }).check();
  await page.getByLabel("Cantidad", { exact: true }).fill("2");
  await page.getByLabel("Barrio o localidad", { exact: true }).fill("  Candioti  ");
  await page.getByLabel("¿Algo más que debamos saber?").fill("  Manchas en el respaldo & apoyabrazos.  ");
}

test("impide enviar sin servicio, con zona vacía o con cantidades inválidas", async ({ page }) => {
  const submit = page.getByRole("button", { name: "Continuar en WhatsApp", exact: true });
  const service = page.getByRole("radio", { name: "Sillones y sofás", exact: true });
  const zone = page.getByLabel("Barrio o localidad", { exact: true });
  const quantity = page.getByLabel("Cantidad", { exact: true });
  await submit.click();
  await expect(service).toBeFocused();
  await service.check();
  await submit.click();
  await expect(zone).toBeFocused();
  await zone.fill("   ");
  await submit.click();
  await expect(zone).toBeFocused();
  expect(await zone.evaluate((element) => element.validationMessage)).toBe("Escribí tu barrio o localidad.");
  await zone.fill("Centro");
  for (const value of ["", "0", "100", "1.5"]) {
    await quantity.fill(value);
    await submit.click();
    await expect(quantity).toBeFocused();
    expect(await quantity.evaluate((element) => element.checkValidity())).toBe(false);
  }
  expect(await page.evaluate(() => window.openedLinks)).toEqual([]);
  await quantity.fill("1");
  await submit.click();
  await expect.poll(() => page.evaluate(() => window.openedLinks.length)).toBe(1);
});

test("abre WhatsApp con el presupuesto completo y el teléfono centralizado", async ({ page }) => {
  await fillQuote(page);
  await page.getByRole("button", { name: "Continuar en WhatsApp", exact: true }).click();
  await expect.poll(() => page.evaluate(() => window.openedLinks.length)).toBe(1);
  const [url, target, features] = await page.evaluate(() => window.openedLinks[0]);
  const parsed = new URL(url);
  expect(parsed.origin).toBe("https://wa.me");
  expect(parsed.pathname).toBe(`/${business.phone.replace(/\D/g, "")}`);
  expect(parsed.searchParams.get("text")).toBe(expectedMessage);
  expect(target).toBe("_blank");
  expect(features).toBe("noopener,noreferrer");
});

test("copia el mensaje y descarta la confirmación al modificarlo", async ({ page }) => {
  await fillQuote(page);
  await page.getByRole("button", { name: "Copiar mensaje", exact: true }).click();
  await expect(page.getByRole("status")).toHaveText("Mensaje copiado. Ya podés pegarlo en WhatsApp.");
  expect(await page.evaluate(() => window.copiedMessages)).toEqual([expectedMessage]);
  expect(await page.evaluate(() => window.openedLinks)).toEqual([]);
  await page.getByLabel("Barrio o localidad", { exact: true }).fill("Centro");
  await expect(page.getByRole("status")).toBeEmpty();
});

test("ofrece copia manual si el portapapeles falla", async ({ page }) => {
  await page.evaluate(() => {
    navigator.clipboard.writeText = async () => { throw new Error("Clipboard unavailable"); };
  });
  await fillQuote(page);
  await page.getByRole("button", { name: "Copiar mensaje", exact: true }).click();
  const message = page.getByLabel("Mensaje para copiar", { exact: true });
  await expect(message).toHaveValue(expectedMessage);
  await expect(message).toHaveAttribute("readonly", "");
  await message.focus();
  expect(await message.evaluate((element) => element.value.slice(element.selectionStart, element.selectionEnd))).toBe(expectedMessage);
  expect(await page.evaluate(() => window.openedLinks)).toEqual([]);
});
