import { expect, test } from "@playwright/test";

test.use({ baseURL: "http://localhost:3000" });

for (const width of [390, 1280]) {
  test(`home page hydrates and the mobile menu works at ${width}px`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error" && /hydrat/i.test(message.text())) {
        errors.push(message.text());
      }
    });

    await page.setViewportSize({ width, height: 800 });
    await page.goto("/");
    await expect(
      page.getByRole("heading", {
        name: "Grundsicherungsgeld, schnell und einfach berechnen",
      }),
    ).toBeVisible();

    // The trigger must survive hydration even when CSS hides it on desktop.
    const trigger = page.locator('[data-slot="drawer-trigger"]');
    await expect(trigger).toHaveCount(1);
    if (width < 1024) {
      const menu = page.getByRole("button", { name: "Menü öffnen" });
      await menu.click();
      const drawer = page.getByRole("dialog", {
        name: "Grundsicherungsrechner des Jobcenters Leipzig",
      });
      await expect(drawer).toBeVisible();
      await expect(drawer.getByRole("link", { name: "Berechnen" })).toHaveAttribute(
        "href",
        "/antrag",
      );
      await page.keyboard.press("Escape");
      await expect(drawer).toBeHidden();
      await expect(menu).toBeFocused();
    } else {
      await expect(trigger).toBeHidden();
      await expect(
        page.getByRole("navigation", { name: "Global" }).getByRole("link", {
          name: "Berechnen",
        }),
      ).toBeVisible();
    }

    expect(errors).toEqual([]);
  });
}
