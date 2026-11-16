import { describe, expect, test } from "vitest";

import {
  APPROPRIATE_VEHICLE_VALUE,
  calculateAssets,
  getAppropriateLivingSpace,
  getAssetAllowanceByAge,
} from "../src/assets";
import {
  AssetsSchema,
  emptyAssets,
  type TStepContext,
} from "../src/types";

const adult = (
  id: string,
  age: number
): TStepContext["community"][number] => ({
  id,
  name: id,
  type: "adult",
  age,
  income: [],
  attributes: {
    diseases: [],
    hasDiseases: false,
    isPregnant: false,
    isSingleParent: false,
  },
});

const child = (
  id: string,
  age: number
): TStepContext["community"][number] => ({
  id,
  name: id,
  type: "child",
  age,
  income: [],
  attributes: {
    diseases: [],
    hasDiseases: false,
    isPregnant: false,
    isSingleParent: false,
  },
});

const context = (
  community: TStepContext["community"],
  assets: TStepContext["assets"]
): TStepContext => ({
  community,
  isEmployable: true,
  spendings: { rent: 0, utilities: 0, heating: 0, sum: 0 },
  income: { sum: 0, allowance: 0 },
  assets,
});

describe("getAssetAllowanceByAge", () => {
  test("uses the age brackets from § 12 Abs. 2", () => {
    expect(getAssetAllowanceByAge(17)).toBe(5000);
    expect(getAssetAllowanceByAge(29)).toBe(5000);
    expect(getAssetAllowanceByAge(30)).toBe(10000);
    expect(getAssetAllowanceByAge(39)).toBe(10000);
    expect(getAssetAllowanceByAge(40)).toBe(12500);
    expect(getAssetAllowanceByAge(49)).toBe(12500);
    expect(getAssetAllowanceByAge(50)).toBe(20000);
  });
});

describe("getAppropriateLivingSpace", () => {
  test("raises the limit by 20 m² from the fifth person", () => {
    expect(getAppropriateLivingSpace(4, "condo")).toBe(130);
    expect(getAppropriateLivingSpace(4, "house")).toBe(140);
    expect(getAppropriateLivingSpace(5, "condo")).toBe(150);
    expect(getAppropriateLivingSpace(6, "house")).toBe(180);
  });
});

describe("calculateAssets", () => {
  test("leaves no excess when there is no Vermögen", () => {
    const result = calculateAssets(context([adult("a", 35)], emptyAssets));
    expect(result.countable).toBe(0);
    expect(result.allowance).toBe(10000);
    expect(result.excess).toBe(0);
  });

  test("requires every person's age instead of assuming an age band", () => {
    const person = {
      ...adult("a", 35),
      type: "adult" as const,
      age: undefined,
    };
    expect(() => calculateAssets(context([person], emptyAssets))).toThrow(
      "Für a fehlt das Alter."
    );
  });

  test("ignores assets whose owner is not in the active community", () => {
    const result = calculateAssets(
      context([adult("a", 35)], {
        ...emptyAssets,
        items: [
          {
            id: "orphaned",
            personId: "removed-person",
            type: "BankAccount",
            amount: 100000,
          },
        ],
      })
    );

    expect(result.countable).toBe(0);
    expect(result.items).toEqual([]);
  });

  test("exempts retirement provision and household-appropriate cars", () => {
    const result = calculateAssets(
      context([adult("a", 35)], {
        ...emptyAssets,
        items: [
          {
            id: "r",
            personId: "a",
            type: "RetirementProvision",
            amount: 80000,
          },
          {
            id: "c",
            personId: "a",
            type: "Vehicle",
            amount: 12000,
            remainingLoan: 2000,
          },
        ],
      })
    );

    expect(result.countable).toBe(0);
    expect(result.excess).toBe(0);
    expect(result.manualReviewReasons).toContain("vehicle");
  });

  test("counts the vehicle value above the 15.000 € presumption", () => {
    const result = calculateAssets(
      context([adult("a", 35)], {
        ...emptyAssets,
        items: [
          {
            id: "c",
            personId: "a",
            type: "Vehicle",
            amount: 20000,
            remainingLoan: 0,
          },
        ],
      })
    );

    expect(result.countable).toBe(20000 - APPROPRIATE_VEHICLE_VALUE);
    expect(result.excess).toBe(0);
  });

  test("counts a second car for a single employable adult in full", () => {
    const result = calculateAssets(
      context([adult("a", 35)], {
        ...emptyAssets,
        items: [
          {
            id: "c1",
            personId: "a",
            type: "Vehicle",
            amount: 8000,
            remainingLoan: 0,
          },
          {
            id: "c2",
            personId: "a",
            type: "Vehicle",
            amount: 6000,
            remainingLoan: 0,
          },
        ],
      })
    );

    expect(result.countable).toBe(6000);
  });

  test("does not use the applicant's vehicle exemption for another owner", () => {
    const result = calculateAssets(
      context([adult("applicant", 35), adult("partner", 35)], {
        ...emptyAssets,
        items: [
          {
            id: "partner-car",
            personId: "partner",
            type: "Vehicle",
            amount: 12000,
            remainingLoan: 0,
          },
        ],
      })
    );

    expect(result.countable).toBe(12000);
    expect(result.manualReviewReasons).toContain("vehicle");
  });

  test("exempts an appropriate owner-occupied home during Karenzzeit", () => {
    const result = calculateAssets(
      context([adult("a", 42)], {
        ...emptyAssets,
        items: [
          {
            id: "h",
            personId: "a",
            type: "OwnerOccupiedProperty",
            amount: 280000,
            livingSpace: 200,
            propertyKind: "house",
            mortgages: 0,
          },
        ],
      })
    );

    expect(result.countable).toBe(0);
    expect(result.manualReviewReasons).toContain("owner-occupied-property");
  });

  test("counts an oversized owner-occupied home after Karenzzeit", () => {
    const result = calculateAssets(
      context([adult("a", 42)], {
        ...emptyAssets,
        hasReceivedBenefitsForOneYear: true,
        items: [
          {
            id: "h",
            personId: "a",
            type: "OwnerOccupiedProperty",
            amount: 280000,
            livingSpace: 200,
            propertyKind: "house",
            mortgages: 40000,
          },
        ],
      })
    );

    expect(result.countable).toBe(240000);
    expect(result.excess).toBe(240000 - 12500);
  });

  test("transfers unused allowances within the benefit community", () => {
    const result = calculateAssets(
      context([adult("father", 37), adult("mother", 35), child("child", 5)], {
        ...emptyAssets,
        items: [
          {
            id: "f",
            personId: "father",
            type: "BankAccount",
            amount: 25000,
          },
          {
            id: "m",
            personId: "mother",
            type: "BankAccount",
            amount: 17500,
          },
          {
            id: "c",
            personId: "child",
            type: "BankAccount",
            amount: 2500,
          },
        ],
      })
    );

    expect(result.allowance).toBe(25000);
    expect(result.countable).toBe(45000);
    expect(result.excess).toBe(20000);
    expect(result.manualReviewReasons).toContain("asset-excess");
  });

  test("changes the allowance at the exact 50-year boundary", () => {
    const assets = {
      ...emptyAssets,
      items: [
        {
          id: "bank",
          personId: "a",
          type: "BankAccount" as const,
          amount: 18000,
        },
      ],
    };

    expect(calculateAssets(context([adult("a", 49)], assets)).excess).toBe(
      5500
    );
    expect(calculateAssets(context([adult("a", 50)], assets)).excess).toBe(0);
  });

  test("rejects invalid conditional asset data", () => {
    expect(
      AssetsSchema.safeParse({
        ...emptyAssets,
        items: [
          {
            id: "home",
            personId: "a",
            type: "OwnerOccupiedProperty",
            amount: 200000,
            livingSpace: 0,
            propertyKind: "house",
            mortgages: -1,
          },
        ],
        selfEmploymentYearsWithoutPension: 1.5,
      }).success
    ).toBe(false);
  });

  test("requires manual review instead of applying self-employment years to arbitrary assets", () => {
    const result = calculateAssets(
      context([adult("a", 45)], {
        ...emptyAssets,
        selfEmploymentYearsWithoutPension: 2,
        items: [
          {
            id: "s",
            personId: "a",
            type: "Securities",
            amount: 20000,
          },
        ],
      })
    );

    expect(result.countable).toBe(20000);
    expect(result.excess).toBe(7500);
    expect(result.manualReviewReasons).toContain("self-employment-retirement");
  });
});
