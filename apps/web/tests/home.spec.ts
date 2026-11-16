import { expect, test } from "@playwright/test";

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
      await expect(
        drawer.getByRole("link", { name: "Berechnen" }),
      ).toHaveAttribute("href", "/antrag");
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

for (const width of [320, 390, 800, 1280]) {
  test(`result preview has an unclipped frame and padded summary at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");

    const frame = page.getByTestId("result-preview-frame");
    await frame.scrollIntoViewIfNeeded();
    const bounds = await frame.evaluate((element) => {
      const outer = element.getBoundingClientRect();
      const inner = element.firstElementChild!.getBoundingClientRect();
      const clip =
        element.parentElement!.parentElement!.getBoundingClientRect();
      return {
        left: inner.left - outer.left,
        right: outer.right - inner.right,
        top: inner.top - outer.top,
        bottom: outer.bottom - inner.bottom,
        clipLeft: outer.left - clip.left,
        clipRight: clip.right - outer.right,
      };
    });
    expect(bounds.left).toBeGreaterThanOrEqual(8);
    expect(bounds.right).toBeCloseTo(bounds.left);
    expect(bounds.top).toBeCloseTo(bounds.left);
    expect(bounds.bottom).toBeCloseTo(bounds.left);
    expect(bounds.clipLeft).toBeGreaterThanOrEqual(1);
    expect(bounds.clipRight).toBeGreaterThanOrEqual(1);

    const padding = await page
      .getByTestId("result-preview-summary")
      .evaluate((element) => {
        const style = getComputedStyle(element);
        return [parseFloat(style.paddingTop), parseFloat(style.paddingBottom)];
      });
    expect(padding[0]).toBeGreaterThanOrEqual(40);
    expect(padding[1]).toBeGreaterThanOrEqual(40);
  });
}

test("starting the calculator does not mount a script during client navigation", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto("/");
  await expect(
    page.getByRole("link", {
      name: "Komplett überarbeitet für das Grundsicherungsgeld",
    }),
  ).toBeVisible();
  await page
    .getByRole("link", { name: "Jetzt berechnen", exact: true })
    .click();
  await expect(page).toHaveURL(/\/antrag\/erwerbsfaehig$/);
  await expect(
    page.getByRole("heading", { name: "Sind Sie erwerbsfähig?" }),
  ).toBeVisible();
  expect(errors).toEqual([]);
});
