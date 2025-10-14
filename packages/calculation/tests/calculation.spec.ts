import { test, expect, describe } from "vitest";
import {
  calculateAdditionalNeeds,
  calculateAllowance,
  calculateChildBenefitTransfer,
  calculateBaseNeed,
  calculateOverall,
  calculateIncome,
  calculateSalary,
} from "../src/calculation";
import { type TAdult, type TChild, type TStepContext } from "../src/types";
import { generateId } from "../src/utils";

describe("salary", () => {
  test("900 gross, 600 net", () => {
    expect(
      calculateSalary({
        gross: 900,
        net: 600,
        hasMinorChild: false,
        isYoung: false,
      })
    ).toEqual({
      allowance: 298,
      income: 600,
    });
  });

  test("1200 gross, 950 net", () => {
    expect(
      calculateSalary({
        gross: 1200,
        net: 950,
        hasMinorChild: false,
        isYoung: false,
      })
    ).toEqual({
      allowance: 348,
      income: 950,
    });
  });

  test("2100 gross, 1700 net", () => {
    expect(
      calculateSalary({
        gross: 2100,
        net: 1700,
        hasMinorChild: false,
        isYoung: false,
      })
    ).toEqual({
      allowance: 348,
      income: 1700,
    });
  });

  test("2100 gross, 1700 net", () => {
    expect(
      calculateSalary({
        gross: 2100,
        net: 1700,
        hasMinorChild: true,
        isYoung: false,
      })
    ).toEqual({
      allowance: 378,
      income: 1700,
    });
  });
});

const defaultContext: TStepContext = {
  community: [],
  income: {
    sum: 0,
    allowance: 0,
  },
  isEmployable: true,
  spendings: {
    heating: 150,
    rent: 500,
    sum: 750,
    utilities: 100,
  },
};

const defaultAdult: TAdult = {
  id: generateId(),
  name: "Person",
  type: "adult",
  income: [],
  attributes: {
    diseases: [],
    hasDiseases: false,
    isPregnant: false,
    isSingleParent: false,
  },
};

const defaultChild: TChild = {
  id: generateId(),
  name: "Person",
  type: "child",
  age: 18,
  attributes: {
    diseases: [],
    hasDiseases: false,
    isPregnant: false,
    isSingleParent: false,
  },
  income: [],
};

describe("calculateAdditionalNeeds", () => {
  test("single, is pregnant", () => {
    const adult = defaultAdult;

    const context: TStepContext = {
      ...defaultContext,
      community: [
        { ...adult, attributes: { ...adult.attributes, isPregnant: true } },
      ],
    };

    const res = calculateAdditionalNeeds(context);

    expect(res.community).toStrictEqual([
      {
        personId: adult.id,
        name: "Person",
        additionals: [{ name: "Schwanger", amount: 95.71 }],
      },
    ]);
  });

  test("partner is pregnant", () => {
    const adult = { ...defaultAdult, name: "Partner" };

    const context: TStepContext = {
      ...defaultContext,
      community: [
        defaultAdult,
        { ...adult, attributes: { ...adult.attributes, isPregnant: true } },
      ],
    };

    const res = calculateAdditionalNeeds(context);

    expect(res.community).toStrictEqual([
      {
        personId: adult.id,
        name: "Partner",
        additionals: [{ name: "Schwanger", amount: 86.02 }],
      },
    ]);
  });

  test("child is pregnant", () => {
    const child = { ...defaultChild, name: "Kind 1" };
    const adult = defaultAdult;

    const context: TStepContext = {
      ...defaultContext,
      community: [
        adult,
        { ...child, attributes: { ...child.attributes, isPregnant: true } },
      ],
    };

    const res = calculateAdditionalNeeds(context);

    expect(res.community).toStrictEqual([
      {
        personId: adult.id,
        name: "Person",
        additionals: [
          {
            amount: 67.56,
            name: "1 Kind über 7 Jahre",
          },
        ],
      },
      {
        personId: child.id,
        name: "Kind 1",
        additionals: [{ name: "Schwanger", amount: 76.67 }],
      },
    ]);
  });

  test("single, with one child younger then 7", () => {
    const adult = defaultAdult;

    const context: TStepContext = {
      ...defaultContext,
      community: [{ ...defaultAdult }, { ...defaultChild, age: 1 }],
    };

    const res = calculateAdditionalNeeds(context);

    expect(res.community).toStrictEqual([
      {
        personId: adult.id,
        name: "Person",
        additionals: [{ amount: 202.68, name: "1 Kind unter 7 Jahre" }],
      },
    ]);
  });

  test("single, with one child younger then 7 and disease", () => {
    const adult = defaultAdult;

    const context: TStepContext = {
      ...defaultContext,
      community: [
        {
          ...adult,
          attributes: { ...adult.attributes, diseases: ["celiacDisease"] },
        },
        { ...defaultChild, age: 1 },
      ],
    };

    const res = calculateAdditionalNeeds(context);

    expect(res.community).toStrictEqual([
      {
        personId: adult.id,
        name: "Person",
        additionals: [
          { amount: 202.68, name: "1 Kind unter 7 Jahre" },
          { amount: 112.6, name: "Zöliakie" },
        ],
      },
    ]);
  });

  test("partner has disease", () => {
    const adult = defaultAdult;

    const context: TStepContext = {
      ...defaultContext,
      community: [
        { ...defaultAdult },
        {
          ...adult,
          attributes: { ...adult.attributes, diseases: ["celiacDisease"] },
        },
      ],
    };

    const res = calculateAdditionalNeeds(context);

    expect(res.community).toStrictEqual([
      {
        personId: adult.id,
        name: "Person",
        additionals: [{ amount: 101.2, name: "Zöliakie" }],
      },
    ]);
  });
});

describe("calculateCommunityNeed", () => {
  test("single, no kids", () => {
    const context: TStepContext = {
      ...defaultContext,
      community: [{ ...defaultAdult }],
    };

    const { sum } = calculateBaseNeed(context);

    expect(sum).toEqual(563);
  });

  test("with partner, no kids", () => {
    const context: TStepContext = {
      ...defaultContext,
      community: [{ ...defaultAdult }, { ...defaultAdult }],
    };

    const { sum } = calculateBaseNeed(context);

    expect(sum).toEqual(1012);
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

    const { sum } = calculateBaseNeed(context);

    expect(sum).toEqual(506 + 506 + 451);
  });

  test("with partner, one kid (14-17)", () => {
    const context: TStepContext = {
      ...defaultContext,
      community: [
        { ...defaultAdult },
        { ...defaultAdult },
        { ...defaultChild, age: 15 },
      ],
    };

    const { sum } = calculateBaseNeed(context);

    expect(sum).toEqual(506 + 506 + 471);
  });

  test("with partner, one kid (6-13)", () => {
    const context: TStepContext = {
      ...defaultContext,
      community: [
        { ...defaultAdult },
        { ...defaultAdult },
        { ...defaultChild, age: 7 },
      ],
    };

    const { sum } = calculateBaseNeed(context);

    expect(sum).toEqual(506 + 506 + 390);
  });

  test("with partner, one kid (0-5)", () => {
    const context: TStepContext = {
      ...defaultContext,
      community: [
        { ...defaultAdult },
        { ...defaultAdult },
        { ...defaultChild, age: 1 },
      ],
    };

    const { sum } = calculateBaseNeed(context);

    expect(sum).toEqual(506 + 506 + 357);
  });

  test("with partner, two kids (0-5, 6-13)", () => {
    const context: TStepContext = {
      ...defaultContext,
      community: [
        { ...defaultAdult },
        { ...defaultAdult },
        { ...defaultChild, age: 2 },
        { ...defaultChild, age: 7 },
      ],
    };
    const { sum } = calculateBaseNeed(context);

    expect(sum).toEqual(506 + 506 + 357 + 390);
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
              id: generateId(),
              type: "EmploymentIncome",
              amount: calculateSalary({
                gross: 1200,
                net: 950,
                hasMinorChild: false,
                isYoung: false,
              }).income,
              gros: 1200,
              net: 950,
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

    expect(overall).toEqual(129);
  });

  test("case #2", () => {
    const context: TStepContext = {
      ...defaultContext,
      community: [
        {
          ...defaultAdult,
          income: [
            {
              id: generateId(),
              type: "EmploymentIncome",
              amount: calculateSalary({
                gross: 2100,
                net: 1700,
                hasMinorChild: false,
                isYoung: false,
              }).income,
              gros: 2100,
              net: 1700,
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

    expect(overall).toEqual(-172);
  });

  test("case #3", () => {
    const context: TStepContext = {
      ...defaultContext,
      community: [
        {
          ...defaultAdult,
          income: [
            {
              id: generateId(),
              type: "EmploymentIncome",
              amount: calculateSalary({
                gross: 2100,
                net: 1700,
                hasMinorChild: true,
                isYoung: false,
              }).income,
              gros: 2100,
              net: 1700,
            },
          ],
        },
        {
          ...defaultAdult,
          income: [
            {
              id: generateId(),
              type: "UnemploymentBenefits",
              amount: 1200,
            },
          ],
        },
        {
          ...defaultChild,
          income: [{ id: generateId(), amount: 255, type: "ChildAllowance" }],
        },
        {
          ...defaultChild,
          income: [
            {
              id: generateId(),
              amount: 255,
              type: "ChildAllowance",
            },
          ],
          age: 1,
        },
      ],
      spendings: {
        heating: 150,
        rent: 650,
        sum: 900,
        utilities: 100,
      },
    };

    const { overall } = calculateOverall(context);

    expect(overall).toEqual(-630);
  });
});

describe("calculateAllowance", () => {
  test("insurance allowance", () => {
    const context: TStepContext = {
      ...defaultContext,
      community: [
        {
          ...defaultAdult,
          income: [
            { id: generateId(), type: "AdvanceMaintenancePayment", amount: 1 },
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
          income: [
            { id: generateId(), type: "AdvanceMaintenancePayment", amount: 1 },
          ],
        },
        {
          ...defaultChild,
          age: 1,
          income: [
            { id: generateId(), type: "AdvanceMaintenancePayment", amount: 1 },
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

    const allowance = calculateAllowance(context);
    const sum = allowance.reduce((acc, curr) => acc + (curr.amount ?? 0), 0);

    expect(allowance.length).toEqual(1);
    expect(sum).toBe(30);
  });

  test("insurance allowance with old kid", () => {
    const context: TStepContext = {
      ...defaultContext,
      community: [
        {
          ...defaultAdult,
          income: [
            { id: generateId(), type: "AdvanceMaintenancePayment", amount: 1 },
          ],
        },
        {
          ...defaultChild,
          income: [
            { id: generateId(), type: "AdvanceMaintenancePayment", amount: 1 },
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

    const allowance = calculateAllowance(context);
    const sum = allowance.reduce((acc, curr) => acc + (curr.amount ?? 0), 0);

    expect(allowance.length).toEqual(2);
    expect(sum).toBe(60);
  });

  test("insurance allowance with old kid but different income type", () => {
    const context: TStepContext = {
      ...defaultContext,
      community: [
        {
          ...defaultAdult,
          income: [
            {
              id: generateId(),
              type: "EmploymentIncome",
              amount: 1,
              gros: 0,
              net: 0,
            },
          ],
        },
        {
          ...defaultChild,
          income: [
            { id: generateId(), type: "AdvanceMaintenancePayment", amount: 1 },
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

    const allowance = calculateAllowance(context);
    const sum = allowance.reduce((acc, curr) => acc + (curr.amount ?? 0), 0);

    expect(allowance.length).toEqual(1);
    expect(sum).toBe(30);
  });
});

describe("calculate child benefit transfert", () => {
  test("should calculate child benefit transfert", () => {
    const context: TStepContext = {
      ...defaultContext,
      community: [
        {
          ...defaultAdult,
        },
        {
          ...defaultChild,
          income: [
            { id: generateId(), type: "AdvanceMaintenancePayment", amount: 1 },
          ],
        },
      ],
    };

    const res = calculateChildBenefitTransfer(context);

    expect(res).toStrictEqual([]);
  });

  test("should calculate child benefit transfert", () => {
    const child = defaultChild;

    const context: TStepContext = {
      ...defaultContext,
      community: [
        {
          ...defaultAdult,
        },
        {
          ...defaultChild,
        },
        {
          ...defaultChild,
        },
        {
          ...child,
          age: 7,
          income: [
            { id: generateId(), type: "ChildAllowance", amount: 255 },
            { id: generateId(), type: "Maintenance", amount: 500 },
          ],
        },
      ],
    };

    const res = calculateChildBenefitTransfer(context);

    expect(res).toStrictEqual([
      {
        name: child.name,
        amount: 177.5,
      },
    ]);
  });
});
