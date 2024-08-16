import { test, expect, describe } from "vitest";
import {
  calculateCommunityNeed,
  calculateOverall,
  calculateSalary,
} from "./calculation";
import { TAdult, TChild, TStepContext } from "./types";

const defaultContext: TStepContext = {
  community: [],
  isEmployable: true,
  isSingle: false,
  spendings: {
    heating: 0,
    rent: 0,
    sum: 0,
    utilities: 0,
  },
};

const defaultAdult: TAdult = {
  name: "Person",
  type: "adult",
  isPregnant: false,
  needsSpecialFood: false,
  income: [],
};

const defaultChild: TChild = {
  name: "Person",
  type: "child",
  isPregnant: false,
  needsSpecialFood: false,
  age: "18+",
};

describe("calculateCommunityNeed", () => {
  test("single, no kids", () => {
    const context: TStepContext = {
      ...defaultContext,
      isSingle: true,
      community: [{ ...defaultAdult }],
    };

    expect(calculateCommunityNeed(context)).toEqual(563);
  });

  test("with partner, no kids", () => {
    const context: TStepContext = {
      ...defaultContext,
      community: [{ ...defaultAdult }, { ...defaultAdult }],
    };

    expect(calculateCommunityNeed(context)).toEqual(1012);
  });

  test("with partner, one kid (18+)", () => {
    const context: TStepContext = {
      ...defaultContext,
      community: [
        { ...defaultAdult },
        { ...defaultAdult },
        { ...defaultChild },
      ],
    };

    expect(calculateCommunityNeed(context)).toEqual(506 + 506 + 451);
  });

  test("with partner, one kid (14-17)", () => {
    const context: TStepContext = {
      ...defaultContext,
      community: [
        { ...defaultAdult },
        { ...defaultAdult },
        { ...defaultChild, age: "14-17" },
      ],
    };

    expect(calculateCommunityNeed(context)).toEqual(506 + 506 + 471);
  });

  test("with partner, one kid (6-13)", () => {
    const context: TStepContext = {
      ...defaultContext,
      community: [
        { ...defaultAdult },
        { ...defaultAdult },
        { ...defaultChild, age: "6-13" },
      ],
    };

    expect(calculateCommunityNeed(context)).toEqual(506 + 506 + 390);
  });

  test("with partner, one kid (0-5)", () => {
    const context: TStepContext = {
      ...defaultContext,
      community: [
        { ...defaultAdult },
        { ...defaultAdult },
        { ...defaultChild, age: "0-5" },
      ],
    };

    expect(calculateCommunityNeed(context)).toEqual(506 + 506 + 357);
  });

  test("with partner, two kids (0-5, 6-13)", () => {
    const context: TStepContext = {
      ...defaultContext,
      community: [
        { ...defaultAdult },
        { ...defaultAdult },
        { ...defaultChild, age: "0-5" },
        { ...defaultChild, age: "6-13" },
      ],
    };

    expect(calculateCommunityNeed(context)).toEqual(506 + 506 + 357 + 390);
  });
});

describe("calculateSalary", () => {
  test("900 gross, 600 net", () => {
    expect(
      calculateSalary({ gross: 900, net: 600, hasMinorChild: false })
    ).toEqual({
      allowance: 298,
      income: 600 - 298,
    });
  });

  test("1200 gross, 950 net", () => {
    expect(
      calculateSalary({ gross: 1200, net: 950, hasMinorChild: false })
    ).toEqual({
      allowance: 348,
      income: 602,
    });
  });

  test("2100 gross, 1700 net", () => {
    expect(
      calculateSalary({ gross: 2100, net: 1700, hasMinorChild: false })
    ).toEqual({
      allowance: 348,
      income: 1352,
    });
  });

  test("2100 gross, 1700 net", () => {
    expect(
      calculateSalary({
        gross: 2100,
        net: 1700,
        hasMinorChild: true,
      })
    ).toEqual({
      allowance: 378,
      income: 1322,
    });
  });
});

describe("calculateOverall", () => {
  test("case #1", () => {
    const context: TStepContext = {
      ...defaultContext,
      community: [{ ...defaultAdult }],
      isSingle: true,
      spendings: {
        heating: 100,
        rent: 350,
        sum: 516,
        utilities: 66,
      },
    };

    expect(calculateOverall(context)).toEqual(477);
  });
});
