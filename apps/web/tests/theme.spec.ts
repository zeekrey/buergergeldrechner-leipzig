import { expect, test } from "@playwright/test";

for (const colorScheme of ["light", "dark"] as const) {
  for (const width of [390, 1280]) {
    test(`homepage follows ${colorScheme} system theme at ${width}px`, async ({ page }) => {
      await page.emulateMedia({ colorScheme });
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/");
      await expect(page.locator("html")).toHaveClass(new RegExp(`\\b${colorScheme}\\b`));

      const foreground = await page.locator("body").evaluate((element) => getComputedStyle(element).color);
      for (const name of [
        "Grundsicherungsgeld, schnell und einfach berechnen",
        "Ergebnisse teilen",
        "Vertrauenswürdig transparent",
      ]) {
        await expect(page.getByRole("heading", { name, exact: true })).toHaveCSS("color", foreground);
      }

      const summary = page.getByTestId("result-preview-summary");
      await expect(summary.locator("span")).toHaveCSS("color", foreground);
      // The result preview must not retain its light green background in dark mode.
      const surface = await summary.evaluate((element) => getComputedStyle(element).backgroundColor);
      await page.emulateMedia({ colorScheme: colorScheme === "dark" ? "light" : "dark" });
      await expect(page.locator("html")).not.toHaveClass(new RegExp(`\\b${colorScheme}\\b`));
      await expect(summary).not.toHaveCSS("background-color", surface);
      await page.emulateMedia({ colorScheme });
      await expect(page.locator("html")).toHaveClass(new RegExp(`\\b${colorScheme}\\b`));

      const logos = page.getByRole("img", { name: "Stadt Leipzig Logo", exact: true }).locator("..");
      await expect(logos).toHaveCSS("background-color", "rgb(255, 255, 255)");
      await expect(page.getByRole("navigation", { name: "Footer" })).toBeVisible();

      if (width < 1024) {
        await page.getByRole("button", { name: "Menü öffnen" }).click();
        const drawer = page.getByRole("dialog");
        await expect(drawer).toBeVisible();
        await expect(drawer.getByRole("heading")).toHaveCSS("color", foreground);
      }
    });
  }

  test(`chat only dims disabled controls in ${colorScheme} mode`, async ({ page }) => {
    await page.emulateMedia({ colorScheme });
    let releaseResponse!: () => void;
    const responseGate = new Promise<void>((resolve) => { releaseResponse = resolve; });
    await page.route("**/api/chat", async (route) => {
      await responseGate;
      await route.fulfill({ status: 503, body: "Unavailable" });
    });

    await page.goto("/antrag/erwerbsfaehig");
    await expect(page.locator("html")).toHaveClass(new RegExp(`\\b${colorScheme}\\b`));
    await page.getByRole("button", { name: "Hilfe", exact: true }).click();
    const dialog = page.getByRole("dialog", { name: "Hilfe zur aktuellen Frage" });
    const input = dialog.getByRole("textbox", { name: "Frage zur Grundsicherung" });
    const send = dialog.getByRole("button", { name: "Senden", exact: true });
    const group = dialog.locator('[data-slot="input-group"]');

    await expect(input).toBeEditable();
    await expect(send).toBeDisabled();
    await expect(group).toHaveCSS("opacity", "1");
    await input.fill("   ");
    await expect(send).toBeDisabled();
    await expect(group).toHaveCSS("opacity", "1");
    await input.fill("Was ist Grundsicherung?");
    await expect(send).toBeEnabled();
    await expect(group).toHaveCSS("opacity", "1");
    await send.click();
    try {
      await expect(input).toBeDisabled();
      await expect(group).toHaveCSS("opacity", "0.5");
      await expect(dialog.getByRole("button", { name: "Stoppen" })).toBeEnabled();
    } finally {
      releaseResponse();
    }
    await expect(dialog.getByText("Antwort nicht verfügbar", { exact: true })).toBeVisible();
    await expect(input).toBeEditable();
    await expect(send).toBeDisabled();
    await expect(group).toHaveCSS("opacity", "1");
  });
}
