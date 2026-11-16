import { expect, test } from "@playwright/test";

for (const stored of ["{invalid JSON", JSON.stringify({ community: [] })]) {
  test(`recovers from invalid stored state: ${stored}`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.addInitScript((value) => {
      if (!sessionStorage.getItem("seeded")) {
        localStorage.setItem("state", value);
        sessionStorage.setItem("seeded", "true");
      }
    }, stored);
    await page.goto("/antrag/partnerschaft");
    await expect(
      page.getByRole("radio", { name: "Alleinstehend" }),
    ).toBeChecked();
    await page
      .getByRole("radio", { name: "Partnerschaft", exact: true })
      .check();
    await page.reload();
    await expect(
      page.getByRole("radio", { name: "Partnerschaft", exact: true }),
    ).toBeChecked();
    expect(errors).toEqual([]);
  });
}

test("keeps persisted calculator state in sync between tabs", async ({
  page,
  context,
}) => {
  await page.goto("/antrag/erwerbsfaehig");
  await page
    .getByRole("checkbox", { name: "Ja, ich bin erwerbsfähig." })
    .check();
  await page.getByRole("button", { name: "Weiter" }).click();
  await expect(page).toHaveURL(/\/antrag\/partnerschaft$/);

  const otherTab = await context.newPage();
  await otherTab.goto("/antrag/partnerschaft");
  await expect(
    otherTab.getByRole("radio", { name: "Alleinstehend" }),
  ).toBeChecked();

  await page.getByRole("radio", { name: "Partnerschaft", exact: true }).check();
  await expect(
    otherTab.getByRole("radio", { name: "Partnerschaft", exact: true }),
  ).toBeChecked();
  await otherTab.getByRole("radio", { name: "Alleinstehend" }).check();
  await expect(
    page.getByRole("radio", { name: "Alleinstehend" }),
  ).toBeChecked();
  await page.reload();
  await expect(
    page.getByRole("radio", { name: "Alleinstehend" }),
  ).toBeChecked();
});
