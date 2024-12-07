import { test, expect } from "@playwright/test";

test("Case #1 - single with standard income", async ({ page }) => {
  await page.goto("http://localhost:3000/antrag/erwerbsfaehig");

  await page.getByLabel("Ja, ich bin erwerbsfähig.").click();
  await page.getByRole("button", { name: "Weiter" }).click();

  await page.waitForURL("**/partnerschaft");
  await expect(page.getByRole("strong")).toContainText("563,00 €");

  await page.getByText("Alleinstehend").click();
  await page.getByRole("button", { name: "Weiter" }).click();

  await page.waitForURL("**/kinder");
  await page.getByRole("button", { name: "Weiter" }).click();

  await page.waitForURL("**/bedarfsgemeinschaft");
  await page.getByRole("button", { name: "Weiter" }).click();

  await page.waitForURL("**/kosten-unterkunft-heizung");
  await page
    .getByRole("row", { name: "Kaltmiete" })
    .getByPlaceholder("Kaltmiete")
    .fill("350");
  await page
    .getByRole("row", { name: "Nebenkosten" })
    .getByPlaceholder("Nebenkosten")
    .fill("66");
  await page
    .getByRole("row", { name: "Heizkosten" })
    .getByPlaceholder("Heizkosten")
    .fill("100");

  await expect(page.getByText("516,00 €")).toBeVisible();

  await page.getByRole("button", { name: "Weiter" }).click();

  await page.waitForURL("**/monatliches-einkommen");
  await expect(page.getByRole("strong")).toContainText("1.079,00 €");

  await page.getByRole("button", { name: "Einkommen hinzufügen" }).click();
  await page.getByLabel("Brutto").fill("1200");
  await page.getByLabel("Netto").fill("950");
  await page.getByRole("button", { name: "Hinzufügen" }).click();

  await page.getByRole("button", { name: "Weiter" }).click();

  await page.waitForURL("**/ergebnis");
  await expect(page.getByTestId("result")).toContainText("477");

  await page.getByRole("tab", { name: "Berechnung" }).click();

  const result = page.getByTestId("result-calculation");

  await expect(result).toBeVisible();
  await result.screenshot();
});

test("Case #2 - Couple without kids", async ({ page }) => {
  await page.goto("http://localhost:3000/antrag/erwerbsfaehig");

  await page.getByText("Ja, ich bin erwerbsfähig.").click();
  await page.getByRole("button", { name: "Weiter" }).click();
  await page.waitForURL("**/partnerschaft");

  await page.getByText("Partnerschaft", { exact: true }).click();

  await expect(page.getByRole("strong")).toContainText("1.012,00 €");
  await page.getByRole("button", { name: "Weiter" }).click();
  await page.getByText("Keine Kinder").click();
  await page.getByRole("button", { name: "Weiter" }).click();

  await page.waitForURL("**/bedarfsgemeinschaft");
  await page.getByRole("button", { name: "Weiter" }).click();

  await page.waitForURL("**/kosten-unterkunft-heizung");
  await page
    .getByRole("row", { name: "Kaltmiete" })
    .getByPlaceholder("Kaltmiete")
    .fill("350");
  await page
    .getByRole("row", { name: "Nebenkosten" })
    .getByPlaceholder("Nebenkosten")
    .fill("66");
  await page
    .getByRole("row", { name: "Heizkosten" })
    .getByPlaceholder("Heizkosten")
    .fill("100");
  await expect(page.getByText("516,00 €")).toBeVisible();

  await page.getByRole("button", { name: "Weiter" }).click();

  await page.waitForURL("**/monatliches-einkommen");
  await expect(page.getByRole("strong")).toContainText("1.528,00 €");
  await page.getByRole("button", { name: "Einkommen hinzufügen" }).click();
  await page.getByLabel("Brutto").fill("2100");
  await page.getByLabel("Netto").fill("1700");
  await page.getByRole("button", { name: "Hinzufügen" }).click();

  await page.getByRole("button", { name: "Weiter" }).click();
  await page.waitForURL("**/ergebnis");

  await expect(page.getByTestId("result")).toContainText("176");

  await page.getByRole("tab", { name: "Berechnung" }).click();
});

test("Case #3 - Couple with 1 kid", async ({ page }) => {
  await page.goto("http://localhost:3000/antrag/erwerbsfaehig");

  await page.getByText("Ja, ich bin erwerbsfähig.").click();
  await page.getByRole("button", { name: "Weiter" }).click();
  await page.waitForURL("**/partnerschaft");

  await page.getByText("Partnerschaft", { exact: true }).click();
  await page.getByRole("button", { name: "Weiter" }).click();

  await page.waitForURL("**/kinder");
  await page.getByText("Kinder", { exact: true }).click();
  await page.getByRole("button", { name: "Weiter" }).click();

  await page.waitForURL("**/kinder-anzahl");
  await page.getByRole("button", { name: "Weiter" }).click();

  await page.waitForURL("**/bedarfsgemeinschaft");
  await page.getByRole("button", { name: "Weiter" }).click();

  await page.waitForURL("**/kosten-unterkunft-heizung");
  await page
    .getByRole("row", { name: "Kaltmiete (Schuldzins bei Wohneigentum)" })
    .getByPlaceholder("Kaltmiete")
    .fill("550");
  await page
    .getByRole("row", { name: "Nebenkosten" })
    .getByPlaceholder("Nebenkosten")
    .fill("100");
  await page
    .getByRole("row", { name: "Heizkosten" })
    .getByPlaceholder("Heizkosten")
    .fill("150");

  await page.getByRole("button", { name: "Weiter" }).click();
  await page.waitForURL("**/monatliches-einkommen");

  await page.getByRole("button", { name: "Einkommen hinzufügen" }).click();
  await page.getByLabel("Brutto").fill("2100");
  await page.getByLabel("Netto").fill("1700");
  await page.getByRole("button", { name: "Hinzufügen" }).click();
  await page.getByRole("button", { name: "Weiter" }).click();

  await page.waitForURL("**/ergebnis");
  await expect(page.getByTestId("result")).toContainText("597");

  await page.getByRole("tab", { name: "Berechnung" }).click();
});

test("Case #4 - Couple with 2 kids", async ({ page }) => {
  await page.goto("http://localhost:3000/antrag/erwerbsfaehig");

  await page.getByText("Ja, ich bin erwerbsfähig.").click();
  await page.getByRole("button", { name: "Weiter" }).click();
  await page.waitForURL("**/partnerschaft");

  await page.getByText("Partnerschaft", { exact: true }).click();
  await page.getByRole("button", { name: "Weiter" }).click();

  await page.waitForURL("**/kinder");
  await page.getByText("Kinder", { exact: true }).click();
  await page.getByRole("button", { name: "Weiter" }).click();

  await page.waitForURL("**/kinder-anzahl");
  await page.getByRole("combobox").click();
  await page.getByLabel("19 Jahre").click();
  await page.getByRole("button", { name: "Kind hinzufügen" }).click();
  await page.getByRole("button", { name: "Weiter" }).click();

  await page.waitForURL("**/bedarfsgemeinschaft");
  await page.getByRole("button", { name: "Weiter" }).click();

  await page.waitForURL("**/kosten-unterkunft-heizung");
  await page
    .getByRole("row", { name: "Kaltmiete (Schuldzins bei Wohneigentum)" })
    .getByPlaceholder("Kaltmiete")
    .fill("650");
  await page
    .getByRole("row", { name: "Nebenkosten" })
    .getByPlaceholder("Nebenkosten")
    .fill("100");
  await page
    .getByRole("row", { name: "Heizkosten" })
    .getByPlaceholder("Heizkosten")
    .fill("150");
  await page.getByRole("button", { name: "Weiter" }).click();

  await page.waitForURL("**/monatliches-einkommen");
  await page.getByRole("button", { name: "Einkommen hinzufügen" }).click();
  await page.getByLabel("Brutto").fill("2100");
  await page.getByLabel("Netto").fill("1700");
  await page.getByRole("button", { name: "Hinzufügen" }).click();
  await page.getByRole("button", { name: "Einkommen hinzufügen" }).click();
  await page.getByRole("combobox").filter({ hasText: "Antragsteller" }).click();
  await page.getByLabel("Partner").click();
  await page
    .getByRole("combobox")
    .filter({ hasText: "Einkommen aus Erwerbstätigkeit" })
    .click();
  await page
    .getByLabel("Arbeitslosengeld")
    .getByText("Arbeitslosengeld")
    .click();
  // FIXME: .fill is not working here.
  await page.getByPlaceholder("€").type("1200");
  await page.getByRole("button", { name: "Hinzufügen" }).click();
  await page.getByRole("button", { name: "Weiter" }).click();

  await page.waitForURL("**/ergebnis");
  await expect(page.getByTestId("result")).toContainText("Kein Anspruch");
  await expect(page.getByRole("strong")).toContainText("-242,00 €");

  await page.getByRole("tab", { name: "Berechnung" }).click();

  const result = page.getByTestId("result-calculation");

  await expect(result).toBeVisible();
  await result.screenshot();
});
