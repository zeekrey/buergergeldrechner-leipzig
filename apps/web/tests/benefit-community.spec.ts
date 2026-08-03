import { expect, test, type Page } from "@playwright/test";

const attributes = {
  diseases: [],
  hasDiseases: false,
  isPregnant: false,
  isSingleParent: false,
};

async function loadState(page: Page, state: object, path: string) {
  await page.goto(`http://localhost:3000${path}`);
  await page.evaluate((value) => {
    window.localStorage.setItem("state", JSON.stringify(value));
  }, state);
  await page.reload();
}

test("the documented seven-person household excludes self-supporting children and the incorrect €30 allowance", async ({
  page,
}) => {
  const employmentIncome = (id: string, net: number) => ({
    id,
    type: "EmploymentIncome",
    amount: net,
    allowance: 378,
    gros: 3000,
    net,
  });
  const childAllowance = (id: string) => ({
    id,
    type: "ChildAllowance",
    amount: 255,
    allowance: 0,
  });
  const state = {
    community: [
      {
        id: "applicant",
        name: "Antragsteller",
        type: "adult",
        attributes,
        income: [employmentIncome("father-income", 1684)],
      },
      {
        id: "partner",
        name: "Partner",
        type: "adult",
        attributes,
        income: [],
      },
      {
        id: "child-1",
        name: "Kind 1",
        type: "child",
        age: 22,
        attributes,
        income: [employmentIncome("child-1-income", 2241)],
      },
      {
        id: "child-2",
        name: "Kind 2",
        type: "child",
        age: 21,
        attributes,
        income: [employmentIncome("child-2-income", 2225)],
      },
      {
        id: "child-3",
        name: "Kind 3",
        type: "child",
        age: 19,
        attributes,
        income: [childAllowance("child-3-benefit")],
      },
      {
        id: "child-4",
        name: "Kind 4",
        type: "child",
        age: 15,
        attributes,
        income: [childAllowance("child-4-benefit")],
      },
      {
        id: "child-5",
        name: "Kind 5",
        type: "child",
        age: 13,
        attributes,
        income: [childAllowance("child-5-benefit")],
      },
    ],
    isEmployable: true,
    spendings: {
      rent: 3341.03,
      utilities: 0,
      heating: 0,
      sum: 3341.03,
    },
    income: { sum: 0, allowance: 0 },
  };

  await loadState(page, state, "/antrag/ergebnis");

  await expect(page.getByTestId("result")).toHaveText("2.639,45 €");
  await expect(page.getByText("2.449,00 € Einnahmen")).toBeVisible();
  await expect(
    page.getByText("2.386,45 € Kosten für Unterkunft und Heizung")
  ).toBeVisible();
  await expect(page.getByText("378,00 € Freibeträge")).toBeVisible();

  await page.getByRole("tab", { name: "Berechnung" }).click();
  const calculation = page.getByTestId("result-calculation");

  await expect(calculation).toContainText("2.639,45 €");
  await expect(calculation).toContainText("2.324,00 €");
  await expect(calculation).toContainText("2.386,45 €");
  await expect(calculation).toContainText("2.449,00 €");
  await expect(calculation).toContainText("2.071,00 €");
  await expect(calculation).toContainText("378,00 €");
  await expect(calculation).not.toContainText("30,00 €");
  await expect(calculation).not.toContainText("Kind 1");
  await expect(calculation).not.toContainText("Kind 2");
});

test("employment income without Kindergeld never creates a Kindergeld transfer", async ({
  page,
}) => {
  const state = {
    community: [
      {
        id: "applicant",
        name: "Antragsteller",
        type: "adult",
        attributes,
        income: [],
      },
      {
        id: "child",
        name: "Kind 1",
        type: "child",
        age: 22,
        attributes,
        income: [],
      },
    ],
    isEmployable: true,
    spendings: { rent: 750, utilities: 0, heating: 0, sum: 750 },
    income: { sum: 0, allowance: 0 },
  };

  await loadState(page, state, "/antrag/monatliches-einkommen");

  await page.getByRole("button", { name: "Einkommen hinzufügen" }).click();
  await page.getByRole("combobox").filter({ hasText: "Antragsteller" }).click();
  await page.getByLabel("Kind 1").click();
  await page.getByLabel("Brutto").fill("3000");
  await page.getByLabel("Netto").fill("2241");
  await page.getByRole("button", { name: "Hinzufügen" }).click();

  const incomeTable = page.locator("tbody");
  await expect(incomeTable).toContainText("Kind 1");
  await expect(incomeTable).toContainText("2.241,00 €");
  await expect(incomeTable).not.toContainText("Kindergeldübertrag");
});
