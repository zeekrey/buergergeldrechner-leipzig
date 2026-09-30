import { describe, expect, it } from "vitest";

import { hasCompleteAges, isValidPersonAge } from "./complete-context";
import { emptyAssets, StepContext, type TStepContext } from "./types";

const attributes = {
  diseases: [],
  hasDiseases: false,
  isPregnant: false,
  isSingleParent: false,
};

const context = (community: TStepContext["community"]): TStepContext => ({
  assets: emptyAssets,
  community,
  income: { allowance: 0, sum: 0 },
  isEmployable: true,
  spendings: { heating: 0, rent: 0, sum: 0, utilities: 0 },
});

describe("completed age validation", () => {
  it("requires a nonempty community", () => {
    expect(hasCompleteAges(context([]))).toBe(false);
  });

  it("rejects adults below 15", () => {
    const adult = {
      age: 10,
      attributes,
      id: "adult",
      income: [],
      name: "Antragsteller",
      type: "adult" as const,
    };

    expect(isValidPersonAge(adult)).toBe(false);
    expect(hasCompleteAges(context([adult]))).toBe(false);
  });

  it("rejects children above 24 in completed and persisted state", () => {
    const invalidContext = {
      ...context([]),
      community: [
        {
          age: 25,
          attributes,
          id: "child",
          income: [],
          name: "Kind 1",
          type: "child" as const,
        },
      ],
    };

    expect(
      isValidPersonAge(
        invalidContext.community[0] as TStepContext["community"][number]
      )
    ).toBe(false);
    expect(StepContext.safeParse(invalidContext).success).toBe(false);
  });

  it("accepts valid ages for every person", () => {
    expect(
      hasCompleteAges(
        context([
          {
            age: 15,
            attributes,
            id: "adult",
            income: [],
            name: "Antragsteller",
            type: "adult",
          },
          {
            age: 0,
            attributes,
            id: "child",
            income: [],
            name: "Kind 1",
            type: "child",
          },
        ])
      )
    ).toBe(true);
  });
});
