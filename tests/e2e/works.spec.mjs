import { test, expect } from "@playwright/test";

test("el contexto del trabajo acompaña las fotos en la tarjeta y el modal", async ({ page }, testInfo) => {
  await page.goto("/");
  const card = page.getByRole("article").filter({ has: page.getByRole("heading", { name: "Sillón de tres plazas", exact: true }) });
  await expect(card.getByText("Tapizado de tela con almohadones a rayas.", { exact: true })).toBeVisible();
  await expect(card.getByText("Manchas visibles en los almohadones del asiento.", { exact: true })).toBeVisible();
  // No unspecified treatment or placeholder should be presented as fact.
  await expect(card.getByText("Tratamiento realizado", { exact: true })).toHaveCount(0);
  await card.scrollIntoViewIfNeeded();
  await page.screenshot({ path: testInfo.outputPath("gallery.png") });
  await card.getByRole("button", { name: "Ampliar antes y después: sillón de tres plazas" }).click();
  const dialog = page.getByRole("dialog", { name: "Sillón de tres plazas", exact: true });
  await expect(dialog.getByText("Tapizado de tela con almohadones a rayas.", { exact: true })).toBeVisible();
  await expect(dialog.getByText("Manchas visibles en los almohadones del asiento.", { exact: true })).toBeVisible();
  for (const image of await dialog.getByRole("img").all()) {
    await expect.poll(() => image.evaluate((element) => element.complete && element.naturalWidth > 0)).toBe(true);
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
