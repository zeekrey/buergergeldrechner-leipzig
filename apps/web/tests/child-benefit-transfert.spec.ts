import { test, expect } from "@playwright/test";

test("should assign child benefit transfer", async ({ page }) => {
  await page.goto("http://localhost:3000/antrag/erwerbsfaehig");

  await page.getByText("Ja, ich bin erwerbsfähig.").click();
  await page.getByRole("button", { name: "Weiter" }).click();
  await page.waitForURL("**/partnerschaft");

  //   await page.getByText("Partnerschaft", { exact: true }).click();
  await page.getByRole("button", { name: "Weiter" }).click();

  await page.waitForURL("**/kinder");
  await page.getByText("Kinder", { exact: true }).click();
  await page.getByRole("button", { name: "Weiter" }).click();

  await page.waitForURL("**/kinder-anzahl");
  /** Add child */
  await page.getByRole("combobox").click();
  await page.getByLabel("7 Jahre", { exact: true }).click();

  await page.getByRole("button", { name: "Kind hinzufügen" }).click();
  await page.getByRole("combobox").nth(1).click();
  await page.getByLabel("7 Jahre", { exact: true }).click();

  await page.getByRole("button", { name: "Kind hinzufügen" }).click();
  await page.getByRole("button", { name: "Weiter" }).click();

  await page.waitForURL("**/bedarfsgemeinschaft");
  await page
    .getByRole("row", { name: "Antragsteller Mehrbedarfe" })
    .getByRole("button")
    .click();
  await page.getByRole("menuitemcheckbox", { name: "Ist Schwanger" }).click();
  await page.getByRole("button", { name: "Weiter" }).click();

  await page.waitForURL("**/kosten-unterkunft-heizung");
  await page.getByPlaceholder("Kaltmiete").fill("500");
  await page.getByPlaceholder("Nebenkosten").fill("100");
  await page.getByPlaceholder("Heizkosten").fill("150");
  await page.getByRole("button", { name: "Weiter" }).click();

  await page.waitForURL("**/monatliches-einkommen");
  await page.getByRole("button", { name: "Einkommen hinzufügen" }).click();
  await page.locator("button").filter({ hasText: "Antragsteller" }).click();
  await page.getByLabel("Kind 1").click();
  await page
    .locator("button")
    .filter({ hasText: "Einkommen aus Erwerbstätigkeit" })
    .click();
  await page.getByText("Unterhalt", { exact: true }).click();
  await page.getByPlaceholder("€").click();
  await page.getByPlaceholder("€").fill("500");
  await page.getByPlaceholder("€").press("Tab");
  await page.getByRole("button", { name: "Hinzufügen" }).click();
  await expect(page.locator("tbody")).toContainText("Kindergeldübertrag");
  await expect(page.locator("tbody")).toContainText("172,50 €");
  await expect(page.locator("tbody")).toContainText("Kindergeldübertrag");
  await expect(page.locator("tbody")).toContainText("-172,50 €");
  await expect(page.locator("tbody")).toContainText("Antragsteller");
  await expect(page.locator("tbody")).toContainText("Kind 1");
  await page.getByRole("button", { name: "Weiter" }).click();
  await expect(page.getByTestId("result")).toContainText("1.528,39 €");
  await page.getByRole("button", { name: "Zurück" }).click();
  await page
    .getByRole("row", { name: "Kind 1 Unterhalt 500,00 €" })
    .getByRole("button")
    .nth(1)
    .click();
});
