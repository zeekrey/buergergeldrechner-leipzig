import { test, expect, describe } from "vitest";
import {
  calculateAllowance,
  calculateCommunityNeed,
  calculateOverall,
  calculateSalary,
} from "./calculation";
import { TAdult, TChild, TStepContext } from "./types";
import { generateId } from "./utils";

const defaultContext: TStepContext = {
  community: [],
  income: {
    sum: 0,
    allowance: 0,
  },
  isEmployable: true,
  spendings: {
    heating: 0,
    rent: 0,
    sum: 0,
    utilities: 0,
  },
};

const defaultAdult: TAdult = {
  id: generateId(),
  name: "Person",
  type: "adult",
  income: [],
};

const defaultChild: TChild = {
  id: generateId(),
  name: "Person",
  type: "child",
  age: "18+",
};

describe("calculateCommunityNeed", () => {
  test("single, no kids", () => {
    const context: TStepContext = {
      ...defaultContext,
      community: [{ ...defaultAdult }],
    };

    const { need } = calculateCommunityNeed(context);

    expect(need).toEqual(563);
  });

  test("with partner, no kids", () => {
    const context: TStepContext = {
      ...defaultContext,
      community: [{ ...defaultAdult }, { ...defaultAdult }],
    };

    const { need } = calculateCommunityNeed(context);

    expect(need).toEqual(1012);
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

    const { need } = calculateCommunityNeed(context);

    expect(need).toEqual(506 + 506 + 451);
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

    const { need } = calculateCommunityNeed(context);

    expect(need).toEqual(506 + 506 + 471);
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

    const { need } = calculateCommunityNeed(context);

    expect(need).toEqual(506 + 506 + 390);
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

    const { need } = calculateCommunityNeed(context);

    expect(need).toEqual(506 + 506 + 357);
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
    const { need } = calculateCommunityNeed(context);

    expect(need).toEqual(506 + 506 + 357 + 390);
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
      community: [
        {
          ...defaultAdult,
          income: [
            {
              type: "EmploymentIncome",
              amount: calculateSalary({
                gross: 1200,
                net: 950,
                hasMinorChild: false,
              }).income,
            },
          ],
        },
      ],
      spendings: {
        heating: 100,
        rent: 350,
        sum: 516,
        utilities: 66,
      },
    };

    const { overall } = calculateOverall(context);

    expect(overall).toEqual(477);
  });

  test("case #2", () => {
    const context: TStepContext = {
      ...defaultContext,
      community: [
        {
          ...defaultAdult,
          income: [
            {
              type: "EmploymentIncome",
              amount: calculateSalary({
                gross: 2100,
                net: 1700,
                hasMinorChild: false,
              }).income,
            },
          ],
        },
        {
          ...defaultAdult,
        },
      ],
      spendings: {
        heating: 100,
        rent: 350,
        sum: 516,
        utilities: 66,
      },
    };

    const { overall } = calculateOverall(context);

    expect(overall).toEqual(176);
  });

  test("case #3", () => {
    const context: TStepContext = {
      ...defaultContext,
      community: [
        {
          ...defaultAdult,
          income: [
            {
              type: "EmploymentIncome",
              amount: calculateSalary({
                gross: 2100,
                net: 1700,
                hasMinorChild: true,
              }).income,
            },
          ],
        },
        {
          ...defaultAdult,
          income: [
            {
              type: "UnemploymentBenefits",
              amount: 1200,
            },
          ],
        },
        {
          ...defaultChild,
          income: [
            {
              amount: 250,
              type: "ChildAllowance",
            },
          ],
        },
        {
          ...defaultChild,
          income: [
            {
              amount: 250,
              type: "ChildAllowance",
            },
          ],
          age: "0-5",
        },
      ],
      spendings: {
        heating: 150,
        rent: 650,
        sum: 900,
        utilities: 100,
      },
    };

    const { overall, ...rest } = calculateOverall(context);

    console.log(rest);

    expect(overall).toEqual(-620);
  });
});

describe("calculateAllowance", () => {
  test("insurance allowance", () => {
    const context: TStepContext = {
      ...defaultContext,
      community: [
        {
          ...defaultAdult,
          income: [{ type: "AdvanceMaintenancePayment", amount: 1 }],
        },
      ],
      spendings: {
        heating: 100,
        rent: 350,
        sum: 516,
        utilities: 66,
      },
    };

    const allowance = calculateAllowance(context);

    expect(allowance.length).toEqual(1);
    expect(allowance[0].amount).toBe(30);
  });

  test("insurance allowance with kid", () => {
    const context: TStepContext = {
      ...defaultContext,
      community: [
        {
          ...defaultAdult,
          income: [{ type: "AdvanceMaintenancePayment", amount: 1 }],
        },
        {
          ...defaultChild,
          age: "0-5",
          income: [{ type: "AdvanceMaintenancePayment", amount: 1 }],
        },
      ],
      spendings: {
        heating: 100,
        rent: 350,
        sum: 516,
        utilities: 66,
      },
    };

    const allowance = calculateAllowance(context);
    const sum = allowance.reduce((acc, curr) => acc + curr.amount, 0);

    expect(allowance.length).toEqual(1);
    expect(sum).toBe(30);
  });

  test("insurance allowance with old kid", () => {
    const context: TStepContext = {
      ...defaultContext,
      community: [
        {
          ...defaultAdult,
          income: [{ type: "AdvanceMaintenancePayment", amount: 1 }],
        },
        {
          ...defaultChild,
          income: [{ type: "AdvanceMaintenancePayment", amount: 1 }],
        },
      ],
      spendings: {
        heating: 100,
        rent: 350,
        sum: 516,
        utilities: 66,
      },
    };

    const allowance = calculateAllowance(context);
    const sum = allowance.reduce((acc, curr) => acc + curr.amount, 0);

    expect(allowance.length).toEqual(2);
    expect(sum).toBe(60);
  });

  test("insurance allowance with old kid but different income type", () => {
    const context: TStepContext = {
      ...defaultContext,
      community: [
        {
          ...defaultAdult,
          income: [{ type: "EmploymentIncome", amount: 1 }],
        },
        {
          ...defaultChild,
          income: [{ type: "AdvanceMaintenancePayment", amount: 1 }],
        },
      ],
      spendings: {
        heating: 100,
        rent: 350,
        sum: 516,
        utilities: 66,
      },
    };

    const allowance = calculateAllowance(context);
    const sum = allowance.reduce((acc, curr) => acc + curr.amount, 0);

    expect(allowance.length).toEqual(1);
    expect(sum).toBe(30);
  });
});
