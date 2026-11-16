import { expect, test, type Page } from "@playwright/test";

async function holdClientScripts(page: Page) {
  let release!: () => void;
  const ready = new Promise<void>((resolve) => {
    release = resolve;
  });
  await page.route(/\/_next\/.*\.js(?:\?|$)/, async (route) => {
    await ready;
    await route.continue();
  });
  return release;
}

test("mobile menu stays disabled until its client scripts are ready", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 800 });
  const release = await holdClientScripts(page);
  try {
    await page.goto("/", { waitUntil: "commit" });
    const menu = page.getByRole("button", { name: "Menü öffnen" });
    await expect(menu).toBeDisabled();
    release();
    await expect(menu).toBeEnabled();
    await menu.click();
    await expect(
      page.getByRole("dialog", {
        name: "Grundsicherungsrechner des Jobcenters Leipzig",
      }),
    ).toBeVisible();
  } finally {
    release();
  }
});

test("age validation waits for hydration and restored calculator state", async ({
  page,
}) => {
  const attributes = {
    isPregnant: false,
    isSingleParent: false,
    hasDiseases: false,
    diseases: [],
  };
  await page.addInitScript(
    (state) => {
      localStorage.setItem("state", JSON.stringify(state));
    },
    {
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
    },
  );
  const release = await holdClientScripts(page);
  try {
    await page.goto("/antrag/alter", { waitUntil: "commit" });
    const calculator = page.locator('[data-slot="calculator-state"]');
    await expect(calculator).toHaveAttribute("inert", "");
    release();
    await expect(calculator).not.toHaveAttribute("inert");
    await expect(page.getByRole("combobox")).toHaveCount(2);
    await page.getByRole("button", { name: "Weiter" }).click();
    await expect(
      page.getByText(
        "Bitte geben Sie ein gültiges Alter in vollständigen Jahren an.",
        { exact: true },
      ),
    ).toHaveCount(2);
  } finally {
    release();
  }
});
