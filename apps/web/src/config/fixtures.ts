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
