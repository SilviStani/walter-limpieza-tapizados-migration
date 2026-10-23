import { test, expect } from "@playwright/test";

for (const { triggerName, title } of [
  { triggerName: "Ampliar antes y después: sillón de tres plazas", title: "Sillón de tres plazas" },
  { triggerName: "Política de Privacidad", title: "Política de privacidad" },
]) {
  test(`${title}: teclado, foco contenido, Escape y retorno al botón`, async ({ page }) => {
    await page.goto("/");
    const trigger = page.getByRole("button", { name: triggerName, exact: true });
    const dialog = page.getByRole("dialog", { name: title, exact: true });
    await trigger.focus();
    await page.keyboard.press("Enter");
    await expect(dialog).toBeVisible();
    const close = dialog.getByRole("button", { name: "Cerrar ventana" });
    await expect(close).toBeFocused();
    expect(await page.evaluate(() => document.body.style.overflow)).toBe("hidden");

    for (const key of ["Tab", "Tab", "Shift+Tab", "Shift+Tab"]) {
      await page.keyboard.press(key);
      await expect.poll(() => dialog.evaluate((element) => element.contains(document.activeElement))).toBe(true);
    }
    // The background must remain inert while the native dialog is open.
    await page.locator("#quote-zone").evaluate((element) => element.focus());
    await expect.poll(() => dialog.evaluate((element) => element.contains(document.activeElement))).toBe(true);
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
    await expect(trigger).toBeFocused();
    expect(await page.evaluate(() => document.body.style.overflow)).toBe("");

    await page.keyboard.press("Space");
    await expect(dialog).toBeVisible();
    await expect(close).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(dialog).not.toBeVisible();
    await expect(trigger).toBeFocused();
  });
}
