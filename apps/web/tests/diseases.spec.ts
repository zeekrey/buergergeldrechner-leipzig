import { test, expect } from "@playwright/test";

test("should selected diseases", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("button", { name: "Starten" }).click();
  await page.getByText("Ja, ich bin erwerbsfähig.").click();
  await page.getByRole("button", { name: "Weiter" }).click();
  await page.waitForURL("**/partnerschaft");

  await page.getByText("Partnerschaft", { exact: true }).click();
  await page.getByRole("button", { name: "Weiter" }).click();
  await page.waitForURL("**/kinder");

  await page.getByRole("button", { name: "Weiter" }).click();
  await page.waitForURL("**/bedarfsgemeinschaft");

  await page
    .getByRole("row", { name: "Antragsteller Mehrbedarfe" })
    .getByRole("button")
    .click();
  await page
    .getByRole("menuitemcheckbox", { name: "Krankheitsbedinge Ernährung" })
    .click();
  await page.getByRole("button", { name: "Mehrbedarfe auswählen" }).click();
  await page
    .getByRole("menuitemcheckbox", { name: "Krankheitsbedinge Ernährung" })
    .click();
  await page.getByRole("button", { name: "Weiter" }).click();
  await page.waitForURL("**/krankheiten");

  await expect(page.getByRole("heading")).toContainText("Krankheiten");
  await expect(page.locator("form")).toContainText("Antragsteller");
  await expect(page.locator("form")).toContainText("Partner");
  await page.getByLabel("Chronisch obstruktive").first().click();
  await page.getByLabel("Niereninsuffizienz").first().click();
  await page.getByLabel("Zöliakie").nth(1).click();
  await page.getByLabel("Mukoviszidose/zystische").nth(1).click();
  await page.getByRole("button", { name: "Weiter" }).click();
  await page.waitForURL("**/kosten-unterkunft-heizung");

  await page.getByRole("button", { name: "Weiter" }).click();
  await page.waitForURL("**/monatliches-einkommen");

  await page.getByRole("button", { name: "Weiter" }).click();
  await page.getByRole("tab", { name: "Berechnung" }).click();

  await expect(
    page.getByRole("cell", { name: "Chronisch obstruktive" })
  ).toBeVisible();
  await expect(page.getByRole("cell", { name: "Zöliakie" })).toBeVisible();
  await expect(page.getByRole("strong")).toContainText("1.340,90 €");
});
