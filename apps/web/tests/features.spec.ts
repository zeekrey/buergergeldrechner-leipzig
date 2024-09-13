import { test, expect } from "@playwright/test";

test("Case #1 - single with standard income", async ({ page }) => {
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
  await expect(page.getByTestId("result")).toContainText("477");
});

test("Case #2 - Couple without kids", async ({ page }) => {
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

  await expect(page.getByTestId("result")).toContainText("176");
});

test("Case #3 - Couple with 1 kid", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("button", { name: "Starten" }).click();
  await page.waitForURL("**/erwerbsfaehig");

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

  await page.waitForURL("**/monatliche-ausgaben");
  await page
    .getByRole("row", { name: "Kaltmiete €" })
    .getByPlaceholder("€")
    .fill("550");
  await page
    .getByRole("row", { name: "Nebenkosten €" })
    .getByPlaceholder("€")
    .fill("100");
  await page
    .getByRole("row", { name: "Heizkosten €" })
    .getByPlaceholder("€")
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
});

test("Case #4 - Couple with 2 kids", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("button", { name: "Starten" }).click();
  await page.waitForURL("**/erwerbsfaehig");

  await page.getByText("Ja, ich bin erwerbsfähig.").click();
  await page.getByRole("button", { name: "Weiter" }).click();
  await page.waitForURL("**/partnerschaft");

  await page.getByText("Partnerschaft", { exact: true }).click();
  await page.getByRole("button", { name: "Weiter" }).click();

  await page.waitForURL("**/kinder");
  await page.getByText("Kinder", { exact: true }).click();
  await page.getByRole("button", { name: "Weiter" }).click();

  await page.waitForURL("**/kinder-anzahl");
  await page.getByRole("button", { name: "Kind hinzufügen" }).click();
  await page
    .locator("div")
    .filter({
      hasText: /^Kind 20-5 Jahre0-5 Jahre6-13 Jahre14-17 Jahre18\+ Jahre$/,
    })
    .getByRole("combobox")
    .click();
  await page.getByLabel("+ Jahre").getByText("+ Jahre").click();
  await page.getByRole("button", { name: "Weiter" }).click();

  await page.waitForURL("**/bedarfsgemeinschaft");
  await page.getByRole("button", { name: "Weiter" }).click();

  await page.waitForURL("**/monatliche-ausgaben");
  await page
    .getByRole("row", { name: "Kaltmiete €" })
    .getByPlaceholder("€")
    .fill("650");
  await page
    .getByRole("row", { name: "Nebenkosten €" })
    .getByPlaceholder("€")
    .fill("100");
  await page
    .getByRole("row", { name: "Heizkosten €" })
    .getByPlaceholder("€")
    .fill("150");
  await page.getByRole("button", { name: "Weiter" }).click();

  await page.waitForURL("**/monatliches-einkommen");
  await page.getByRole("button", { name: "Einkommen hinzufügen" }).click();
  await page.getByLabel("Brutto").fill("2100");
  await page.getByLabel("Netto").fill("1700");
  await page.getByRole("button", { name: "Hinzufügen" }).click();
  await page.getByRole("button", { name: "Einkommen hinzufügen" }).click();
  await page.getByLabel("Person").click();
  await page.getByLabel("Partner").click();
  await page.getByLabel("Einkommensart").click();
  await page
    .getByLabel("Arbeitslosengeld")
    .getByText("Arbeitslosengeld")
    .click();
  await page.getByPlaceholder("€").fill("1200");
  await page.getByRole("button", { name: "Hinzufügen" }).click();
  await page.getByRole("button", { name: "Weiter" }).click();

  await page.waitForURL("**/ergebnis");
  await expect(page.getByTestId("result")).toContainText("Kein Anspruch");
  await expect(page.getByRole("strong")).toContainText("-242 €");
});
