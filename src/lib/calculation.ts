import { TStepContext, TChild } from "./types";
import * as data from "../config/data.json";
import { flattenIncome } from "./utils";

export function calculateCommunityNeed(context: TStepContext) {
  const isSingle = context.community.length === 1;

  const community = context.community.map(({ name, type, ...attributes }) => {
    let amount: number;

    if (type === "adult") {
      amount = isSingle ? data[type]["single"] : data[type]["partner"];
    } else if (type === "child") {
      amount = data[type][(attributes as TChild).age];
    }

    return { name, amount };
  });

  const need = community.reduce((acc, curr) => acc + curr.amount, 0);

  return {
    need,
    community,
  };
}

export function calculateSalary({
  gross,
  net,
  hasMinorChild,
}: {
  gross: number;
  net: number;
  hasMinorChild: boolean;
}) {
  if (gross < 1 || net < 1 || net > gross)
    return {
      allowance: 0,
      income: 0,
    };

  let allowance = 100;

  if (gross <= 520) {
    allowance += (gross - 100) * 0.2; // 20% for the range 100-520
  } else {
    allowance += (520 - 100) * 0.2; // 20% for the range 100-520
    if (gross <= 1000) {
      allowance += (gross - 520) * 0.3; // 30% for the range 520-1000 (or 1500 with a minor child)
    } else {
      allowance += (1000 - 520) * 0.3; // 30% for the range 520-1000 (or 1500 with a minor child)
      if (gross <= (hasMinorChild ? 1500 : 1200)) {
        allowance += (gross - 1000) * 0.1; // 10% for the range 1000-1200
      } else {
        allowance += ((hasMinorChild ? 1500 : 1200) - 1000) * 0.1; // 10% for the range 1000-1200
      }
    }
  }

  return {
    allowance: allowance,
    income: net - allowance,
  };
}

export function calculateOverall(context: TStepContext) {
  const { need } = calculateCommunityNeed(context);
  const flattenedIncome = flattenIncome(context.community);
  const incomeSum = flattenedIncome.reduce((acc, curr) => acc + curr.amount, 0);
  const allowance = calculateAllowance(context);

  return {
    need,
    income: incomeSum,
    spendingNeed: need + context.spendings.sum,
    allowance,
    overall:
      need +
      context.spendings.sum +
      allowance.reduce((acc, curr) => acc + curr.amount, 0) -
      incomeSum,
  };
}

export function calculateAllowance(context: TStepContext) {
  /** Private insurance */
  const legitimate = context.community.filter((person) => {
    if (
      (person.type === "adult" || person.age === "18+") &&
      person.income?.every((income) => income.type !== "EmploymentIncome")
    )
      return true;
  });

  return legitimate.map((person) => ({
    id: person.id,
    type: "insurance",
    amount: 30,
  }));
}
