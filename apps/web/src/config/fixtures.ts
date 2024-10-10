import { TStepContext } from "@/lib/types";
import { generateId } from "@/lib/utils";

export const singleWithoutKids: TStepContext = {
  community: [
    {
      id: generateId(),
      type: "adult",
      name: "Antragsteller",
      income: [
        {
          type: "UnemploymentBenefits",
          amount: 500,
        },
      ],
    },
  ],
  isEmployable: true,
  spendings: {
    rent: 350,
    utilities: 66,
    heating: 100,
    sum: 516,
  },
  income: {
    allowance: 348,
    sum: 602,
  },
};

export const singleWithoutKidsNoNeed: TStepContext = {
  community: [
    {
      id: generateId(),
      type: "adult",
      name: "Antragsteller",
      income: [
        {
          type: "UnemploymentBenefits",
          amount: 5000,
        },
      ],
    },
  ],
  isEmployable: true,
  spendings: {
    rent: 350,
    utilities: 66,
    heating: 100,
    sum: 516,
  },
  income: {
    allowance: 348,
    sum: 602,
  },
};

export const coupleWithoutKids: TStepContext = {
  community: [
    {
      id: generateId(),
      type: "adult",
      name: "Antragsteller",
      income: [
        {
          type: "EmploymentIncome",
          amount: 500,
        },
      ],
    },
    {
      id: generateId(),
      type: "adult",
      name: "Partner",
    },
  ],
  isEmployable: true,
  spendings: {
    rent: 350,
    utilities: 66,
    heating: 100,
    sum: 516,
  },
  income: {
    allowance: 348,
    sum: 1352,
  },
};

export const coupleWithKids: TStepContext = {
  community: [
    {
      id: "1724096609683115",
      type: "adult",
      name: "Antragsteller",
      income: [
        {
          allowance: 378,
          amount: 1322,
          type: "EmploymentIncome",
          gros: 2100,
          net: 1700,
        },
      ],
    },
    {
      id: "1724096612132570",
      type: "adult",
      name: "Partner",
      income: [
        {
          type: "UnemploymentBenefits",
          amount: 1200,
          gros: 0,
          net: 0,
          allowance: 0,
        },
      ],
    },
    {
      id: "1724096620691548",
      name: "Kind 1",
      type: "child",
      age: 19,
      income: [
        {
          type: "ChildAllowance",
          amount: 250,
        },
      ],
    },
    {
      id: "1724096622144916",
      type: "child",
      name: "Kind 2",
      age: 4,
      income: [
        {
          type: "ChildAllowance",
          amount: 250,
        },
      ],
    },
  ],
  isEmployable: true,
  spendings: {
    heating: 150,
    rent: 650,
    utilities: 100,
    sum: 900,
  },
  income: {
    allowance: 0,
    sum: 0,
  },
};
