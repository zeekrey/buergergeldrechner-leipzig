import { expect, test } from "@playwright/test";

const mobileViewports = [320, 340, 375, 390];

for (const width of mobileViewports) {
  test(`wizard navigation stays within its container at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 700 });
    await page.goto("/antrag/kinder");

    const nextButton = page.getByRole("button", { name: "Weiter" });
    await expect(nextButton).toBeVisible();

    const bounds = await nextButton.evaluate((button) => {
      const container = button.parentElement;

      if (!container) {
        throw new Error("Wizard navigation container is missing");
      }

      const buttonRect = button.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      return {
        buttonLeft: buttonRect.left,
        buttonRight: buttonRect.right,
        containerLeft: containerRect.left,
        containerRight: containerRect.right,
      };
    });

    expect(bounds.buttonLeft).toBeGreaterThanOrEqual(bounds.containerLeft);
    expect(bounds.buttonRight).toBeLessThanOrEqual(bounds.containerRight);
  });
}
