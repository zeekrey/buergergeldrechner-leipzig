import { test, expect, describe } from "vitest";
import { calculateCommunityNeed, calculateSalary } from "./calculation";
import { TAdult, TChild, TPerson, TStepContext } from "./types";

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
  salary: {
    gross: 0,
    net: 0,
  },
};

const defaultAdult: TAdult = {
  name: "Person",
  type: "adult",
  isPregnant: false,
  needsSpecialFood: false,
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
    const context: TStepContext = {
      ...defaultContext,
      salary: {
        gross: 900,
        net: 600,
      },
    };

    expect(calculateSalary(context)).toEqual({
      allowance: 298,
      income: 600 - 298,
    });
  });

  test("1200 gross, 950 net", () => {
    const context: TStepContext = {
      ...defaultContext,
      salary: {
        gross: 1200,
        net: 950,
      },
    };

    expect(calculateSalary(context)).toEqual({
      allowance: 348,
      income: 602,
    });
  });

  test("2100 gross, 1700 net", () => {
    const context: TStepContext = {
      ...defaultContext,
      salary: {
        gross: 2100,
        net: 1700,
      },
    };

    expect(calculateSalary(context)).toEqual({
      allowance: 348,
      income: 1352,
    });
  });

  test("2100 gross, 1700 net", () => {
    const context: TStepContext = {
      ...defaultContext,
      community: [
        {
          name: "Child below 18",
          type: "child",
          age: "0-5",
        },
      ],
      salary: {
        gross: 2100,
        net: 1700,
      },
    };

    expect(calculateSalary(context)).toEqual({
      allowance: 378,
      income: 1322,
    });
  });
});
