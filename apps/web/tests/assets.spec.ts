import { expect, test, type Page } from "@playwright/test";

const attributes = {
  diseases: [],
  hasDiseases: false,
  isPregnant: false,
  isSingleParent: false,
};

async function loadState(page: Page, state: object, path: string) {
  await page.addInitScript((value) => {
    if (!window.localStorage.getItem("state")) {
      window.localStorage.setItem("state", JSON.stringify(value));
    }
  }, state);
  await page.goto(`http://localhost:3000${path}`);
}

test("blocks future progress links and redirects incomplete calculation routes", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/antrag/erwerbsfaehig");
  await expect(
    page.getByRole("link", {
      name: "Schritt 10: Welches Vermögen haben Sie?",
    })
  ).toHaveCount(0);
  await expect(
    page.getByRole("img", {
      name: "Schritt 10: Welches Vermögen haben Sie? (noch nicht verfügbar)",
    })
  ).toBeVisible();

  const incompleteState = {
    community: [
      {
        id: "applicant",
        name: "Antragsteller",
        type: "adult",
        attributes,
        income: [],
      },
    ],
    isEmployable: true,
    spendings: { rent: 0, utilities: 0, heating: 0, sum: 0 },
    income: { sum: 0, allowance: 0 },
    assets: {
      items: [],
      hasReceivedBenefitsForOneYear: false,
      selfEmploymentYearsWithoutPension: 0,
    },
  };

  await loadState(page, incompleteState, "/antrag/vermoegen");
  await expect(page).toHaveURL(/\/antrag\/alter$/);

  await page.evaluate((state) => {
    window.localStorage.setItem(
      "state",
      JSON.stringify({ ...state, community: [] })
    );
  }, incompleteState);
  await page.reload();
  await page.goto("http://localhost:3000/antrag/ergebnis");
  await expect(page).toHaveURL(/\/antrag\/erwerbsfaehig$/);
});

test("collects and persists every age on the dedicated step", async ({
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
        age: -1,
        attributes,
        income: [],
      },
    ],
    isEmployable: true,
    spendings: { rent: 0, utilities: 0, heating: 0, sum: 0 },
    income: { sum: 0, allowance: 0 },
    assets: {
      items: [],
      hasReceivedBenefitsForOneYear: false,
      selfEmploymentYearsWithoutPension: 0,
    },
  };

  await loadState(page, state, "/antrag/alter");
  await page.getByRole("button", { name: "Weiter" }).click();
  await expect(
    page.getByText(
      "Bitte geben Sie ein gültiges Alter in vollständigen Jahren an.",
      { exact: true }
    )
  ).toHaveCount(2);

  await page
    .getByRole("combobox", { name: "Antragsteller – Alter in Jahren" })
    .click();
  await page.getByRole("option", { name: "50", exact: true }).click();
  await page
    .getByRole("combobox", { name: "Kind 1 – Alter in Jahren" })
    .click();
  await page.getByRole("option", { name: "0", exact: true }).click();
  await page.reload();
  await expect(
    page.getByRole("combobox", {
      name: "Antragsteller – Alter in Jahren",
    })
  ).toHaveText("50");
  await expect(
    page.getByRole("combobox", { name: "Kind 1 – Alter in Jahren" })
  ).toHaveText("0");

  await page.getByRole("button", { name: "Weiter" }).click();
  await expect(page).toHaveURL(/\/antrag\/bedarfsgemeinschaft$/);

  await page.goto("http://localhost:3000/antrag/kinder-anzahl");
  await expect(page.getByRole("combobox")).toHaveCount(0);
  await page.goto("http://localhost:3000/antrag/vermoegen");
  await expect(page.getByText("Alter der Erwachsenen")).toHaveCount(0);
});

test("adds valid assets through the dialog and rejects invalid property data", async ({
  page,
}) => {
  const state = {
    community: [
      {
        id: "applicant",
        name: "Antragsteller",
        type: "adult",
        age: 50,
        attributes,
        income: [],
      },
    ],
    isEmployable: true,
    spendings: { rent: 0, utilities: 0, heating: 0, sum: 0 },
    income: { sum: 0, allowance: 0 },
    assets: {
      items: [],
      hasReceivedBenefitsForOneYear: false,
      selfEmploymentYearsWithoutPension: 0,
    },
  };

  await loadState(page, state, "/antrag/vermoegen");
  await page.getByRole("button", { name: "Vermögen hinzufügen" }).click();
  await page.getByLabel("Art des Vermögens").click();
  await page
    .getByRole("option", { name: "Selbst genutztes Wohneigentum" })
    .click();
  await page.getByLabel("Verkehrswert").fill("200000");
  await page.getByRole("button", { name: "Hinzufügen" }).click();
  await expect(page.getByText("Bitte geben Sie eine positive Wohnfläche an."))
    .toBeVisible();

  await page.getByLabel("Wohnfläche").fill("120");
  await page.getByLabel("Grundschuld oder Hypothek").fill("-1");
  await page.getByRole("button", { name: "Hinzufügen" }).click();
  await expect(page.getByText("Die Hypothek darf nicht negativ sein."))
    .toBeVisible();

  await page.getByLabel("Grundschuld oder Hypothek").fill("0");
  await page.getByRole("button", { name: "Hinzufügen" }).click();
  await expect(page.getByText("Selbst genutztes Wohneigentum")).toBeVisible();
  await page.reload();
  await expect(page.getByText("Selbst genutztes Wohneigentum")).toBeVisible();
});

test("removing a person also removes that person's persisted assets", async ({
  page,
}) => {
  const state = {
    community: [
      {
        id: "applicant",
        name: "Antragsteller",
        type: "adult",
        age: 35,
        attributes,
        income: [],
      },
      {
        id: "partner",
        name: "Partner",
        type: "adult",
        age: 35,
        attributes,
        income: [],
      },
    ],
    isEmployable: true,
    spendings: { rent: 0, utilities: 0, heating: 0, sum: 0 },
    income: { sum: 0, allowance: 0 },
    assets: {
      items: [
        {
          id: "partner-bank",
          personId: "partner",
          type: "BankAccount",
          amount: 100000,
        },
      ],
      hasReceivedBenefitsForOneYear: false,
      selfEmploymentYearsWithoutPension: 0,
    },
  };

  await loadState(page, state, "/antrag/partnerschaft");
  await page.getByText("Alleinstehend").click();
  await page.reload();
  await page.goto("http://localhost:3000/antrag/vermoegen");
  await expect(page.getByText("Kein Vermögen angegeben")).toBeVisible();
});

test("shows manual review when child assets make BG membership indeterminate", async ({
  page,
}) => {
  const state = {
    community: [
      {
        id: "applicant",
        name: "Antragsteller",
        type: "adult",
        age: 35,
        attributes,
        income: [],
      },
      {
        id: "child",
        name: "Kind 1",
        type: "child",
        age: 10,
        attributes,
        income: [],
      },
    ],
    isEmployable: true,
    spendings: { rent: 600, utilities: 0, heating: 0, sum: 600 },
    income: { sum: 0, allowance: 0 },
    assets: {
      items: [
        {
          id: "child-bank",
          personId: "child",
          type: "BankAccount",
          amount: 100000,
        },
      ],
      hasReceivedBenefitsForOneYear: false,
      selfEmploymentYearsWithoutPension: 0,
    },
  };

  await loadState(page, state, "/antrag/ergebnis");

  await expect(page.getByTestId("result")).toHaveText(
    "Manuelle Prüfung erforderlich"
  );
  await expect(page.getByRole("link", { name: "Jetzt beantragen" })).toBeVisible();
});

test("counts bank deposits above the age-based asset allowance", async ({
  page,
}) => {
  const state = {
    community: [
      {
        id: "applicant",
        name: "Antragsteller",
        type: "adult",
        age: 35,
        attributes,
        income: [],
      },
    ],
    isEmployable: true,
    spendings: { rent: 350, utilities: 66, heating: 100, sum: 516 },
    income: { sum: 0, allowance: 0 },
    assets: {
      items: [
        {
          id: "bank-1",
          personId: "applicant",
          type: "BankAccount",
          amount: 25000,
        },
      ],
      hasReceivedBenefitsForOneYear: false,
      selfEmploymentYearsWithoutPension: 0,
    },
  };

  await loadState(page, state, "/antrag/vermoegen");

  await expect(page.getByRole("heading")).toContainText("Welches Vermögen");
  await expect(page.getByText("Konten und Bargeld")).toBeVisible();
  await expect(page.getByText("Anrechenbares Vermögen")).toBeVisible();
  await expect(page.getByText("15.000,00 €")).toBeVisible();

  await page.getByRole("button", { name: "Weiter" }).click();
  await page.waitForURL("**/ergebnis");
  await expect(page.getByTestId("result")).toContainText(
    "Manuelle Prüfung erforderlich"
  );
  await expect(page.getByRole("link", { name: "Jetzt beantragen" })).toBeVisible();
  await expect(
    page.getByText("Vermögen über dem Freibetrag")
  ).toBeVisible();
});

test("keeps an appropriate car outside the countable assets", async ({
  page,
}) => {
  const state = {
    community: [
      {
        id: "applicant",
        name: "Antragsteller",
        type: "adult",
        age: 42,
        attributes,
        income: [],
      },
    ],
    isEmployable: true,
    spendings: { rent: 350, utilities: 66, heating: 100, sum: 516 },
    income: { sum: 0, allowance: 0 },
    assets: {
      items: [
        {
          id: "car-1",
          personId: "applicant",
          type: "Vehicle",
          amount: 12000,
          remainingLoan: 0,
        },
      ],
      hasReceivedBenefitsForOneYear: false,
      selfEmploymentYearsWithoutPension: 0,
    },
  };

  await loadState(page, state, "/antrag/vermoegen");

  await expect(page.getByText("12.000,00 € frei")).toBeVisible();
  await expect(page.getByText("Anrechenbares Vermögen")).toBeVisible();
  await expect(page.getByText("0,00 €", { exact: true })).toBeVisible();
});
