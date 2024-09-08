import { test, expect } from "@playwright/test";

test("single with standard income", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Starten" }).click();

  await page.waitForURL("**/erwerbsfaehig");
  await page.getByLabel("Ja, ich bin erwerbsfähig.").click();
  await page.getByRole("button", { name: "Weiter" }).click();

  await page.waitForURL("**/partnerschaft");
  await expect(page.getByRole("strong")).toContainText("593 €");

  await page.getByText("Alleinstehend").click();
  await page.getByRole("button", { name: "Weiter" }).click();

  await page.waitForURL("**/kinder");
  await page.getByRole("button", { name: "Weiter" }).click();

  await page.waitForURL("**/bedarfsgemeinschaft");
  await page.getByRole("button", { name: "Weiter" }).click();

  await page.waitForURL("**/monatliche-ausgaben");
  await page
    .getByRole("row", { name: "Kaltmiete" })
    .getByPlaceholder("€")
    .fill("350");
  await page
    .getByRole("row", { name: "Nebenkosten" })
    .getByPlaceholder("€")
    .fill("66");
  await page
    .getByRole("row", { name: "Heizkosten" })
    .getByPlaceholder("€")
    .fill("100");

  await expect(
    page.getByRole("row", { name: "Summe" }).getByRole("textbox")
  ).toHaveValue("516");

  await page.getByRole("button", { name: "Weiter" }).click();

  await page.waitForURL("**/monatliches-einkommen");
  await expect(page.getByRole("strong")).toContainText("1109 €");

  await page.getByRole("button", { name: "Einkommen hinzufügen" }).click();
  await page.getByLabel("Brutto").fill("1200");
  await page.getByLabel("Netto").fill("950");
  await page.getByRole("button", { name: "Hinzufügen" }).click();

  await expect(page.locator("tbody")).toContainText("602,00 € (348,00 €)");

  await page.getByRole("button", { name: "Weiter" }).click();

  await page.waitForURL("**/ergebnis");
  await expect(page.getByLabel("Ergebnis")).toContainText("825");
});
