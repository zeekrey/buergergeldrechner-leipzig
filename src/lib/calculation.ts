import { TStepContext, TChild } from "./types";
import * as data from "../config/data.json";
import { flattenIncome } from "./utils";

export function calculateCommunityNeed(context: TStepContext) {
  let sumByType = {};
  let totalSum = 0;

  const isSingle = context.community.length === 1;

  /** community need */
  context.community.forEach(({ type, ...attributes }) => {
    let value: number;

    if (type === "adult") {
      value = isSingle ? data[type]["single"] : data[type]["partner"];
    } else if (type === "child") {
      value = data[type][(attributes as TChild).age];
    }

    sumByType[type] = (sumByType[type] || 0) + value;
    totalSum += value;
  });

  return totalSum;
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
  const communityNeed = calculateCommunityNeed(context);
  const flattenedIncome = flattenIncome(context.community);
  const incomeSum = flattenedIncome.reduce((acc, curr) => acc + curr.amount, 0);

  // console.table([
  //   {
  //     "Community need": communityNeed,
  //     Income: incomeSum,
  //   },
  // ]);

  return communityNeed + context.spendings.sum - incomeSum;
}
