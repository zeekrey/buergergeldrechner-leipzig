import { test, expect } from "@playwright/test";

test("single with standard income", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Starten" }).click();

  await page.waitForURL("**/erwerbsfaehig");
  await page.getByLabel("Ja, ich bin erwerbsfähig.").click();
  await page.getByRole("button", { name: "Weiter" }).click();

  await page.waitForURL("**/partnerschaft");
  await expect(page.getByRole("strong")).toContainText("563 €");

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
  await expect(page.getByRole("strong")).toContainText("1079 €");

  await page.getByRole("button", { name: "Einkommen hinzufügen" }).click();
  await page.getByLabel("Brutto").fill("1200");
  await page.getByLabel("Netto").fill("950");
  await page.getByRole("button", { name: "Hinzufügen" }).click();

  await page.getByRole("button", { name: "Weiter" }).click();

  await page.waitForURL("**/ergebnis");
  await expect(page.getByLabel("Ergebnis")).toContainText("825");
});

test("couple without kids", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("button", { name: "Starten" }).click();
  await page.waitForURL("**/erwerbsfaehig");

  await page.getByText("Ja, ich bin erwerbsfähig.").click();
  await page.getByRole("button", { name: "Weiter" }).click();
  await page.waitForURL("**/partnerschaft");

  await page.getByText("Partnerschaft", { exact: true }).click();

  await expect(page.getByRole("strong")).toContainText("1012 €");
  await page.getByRole("button", { name: "Weiter" }).click();
  await page.getByText("Keine Kinder").click();
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
  await expect(page.getByRole("strong")).toContainText("1528 €");
  await page.getByRole("button", { name: "Einkommen hinzufügen" }).click();
  await page.getByLabel("Brutto").fill("2100");
  await page.getByLabel("Netto").fill("1700");
  await page.getByRole("button", { name: "Hinzufügen" }).click();

  await page.getByRole("button", { name: "Weiter" }).click();
  await page.waitForURL("**/ergebnis");

  await page.getByText("176 €").click();
  await page.getByRole("tab", { name: "Berechnung" }).click();
});
