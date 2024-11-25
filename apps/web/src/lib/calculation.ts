import {
  TStepContext,
  TChild,
  diseases as DiseaseMap,
  IncomeTypEnum,
} from "./types";
import data from "../config/data.json";
import {
  additionalChildNeedsCategory,
  flattenIncome,
  getChildAgeGroup,
} from "./utils";
import { z } from "zod";

export function calculateCommunityNeed(context: TStepContext) {
  const isSingle =
    context.community.filter((person) => person.type === "adult").length === 1;

  const community = context.community.map(({ name, type, ...rest }) => {
    let amount: number = 0;

    if (type === "adult") {
      amount = isSingle ? data[type]["single"] : data[type]["partner"];
    } else if (type === "child") {
      amount = data[type][getChildAgeGroup((rest as TChild).age)];
    }

    return { name, amount };
  });

  const need = community.reduce((acc, curr) => acc + curr.amount, 0);

  return {
    need,
    community,
  };
}

type TAdditional = { name: string; amount: number };

export function calculateAdditionalNeeds(context: TStepContext) {
  const isSingle =
    context.community.filter((person) => person.type === "adult").length === 1;

  const additionalNeeds = context.community.reduce<
    { personId: string; name: string; additionals: TAdditional[] }[]
  >((acc, person) => {
    const { type } = person;
    let additionals: TAdditional[] = [];

    /** isSingle */
    if (isSingle && type === "adult") {
      const baseNeed = data["adult"].single;
      const children = context.community.filter(
        (person) => person.type === "child"
      );

      const ages = children.map((child) => child.age);
      const under7 = ages.filter((age) => age < 7).length;
      const under16 = ages.filter((age) => age < 16).length;
      const over16 = ages.filter((age) => age > 16).length;
      const over7 = ages.filter((age) => age > 7).length;
      const totalChildren = children.length;

      for (const category of additionalChildNeedsCategory) {
        switch (category.description) {
          case "1 Kind unter 7 Jahre":
            if (under7 === 1 && totalChildren === 1) {
              additionals.push({
                name: category.description,
                amount: (baseNeed * category.percentage) / 100,
              });
            }
            break;
          case "1 Kind über 7 Jahre":
            if (over7 === 1 && totalChildren === 1) {
              additionals.push({
                name: category.description,
                amount: (baseNeed * category.percentage) / 100,
              });
            }
            break;
          case "2 Kinder unter 16 Jahre":
            if (under16 === 2 && over16 === 0) {
              additionals.push({
                name: category.description,
                amount: (baseNeed * category.percentage) / 100,
              });
            }
            break;
          case "2 Kinder über 16 Jahre":
            if (over16 === 2) {
              additionals.push({
                name: category.description,
                amount: (baseNeed * category.percentage) / 100,
              });
            }
            break;
          case "1 Kind über 7 Jahre und 1 Kind über 16 Jahre":
            if (over7 === 1 && over16 === 1 && totalChildren === 2) {
              additionals.push({
                name: category.description,
                amount: (baseNeed * category.percentage) / 100,
              });
            }
            break;
          case "1 Kind unter 7 Jahre und 1 Kind unter 16 Jahre":
            if (under7 === 1 && under16 === 1 && totalChildren === 2) {
              additionals.push({
                name: category.description,
                amount: (baseNeed * category.percentage) / 100,
              });
            }
            break;
          case "3 Kinder":
            if (totalChildren === 3) {
              additionals.push({
                name: category.description,
                amount: (baseNeed * category.percentage) / 100,
              });
            }
            break;
          case "4 Kinder":
            if (totalChildren === 4) {
              additionals.push({
                name: category.description,
                amount: (baseNeed * category.percentage) / 100,
              });
            }
            break;
          case "ab 5 Kinder":
            if (totalChildren >= 5) {
              additionals.push({
                name: category.description,
                amount: (baseNeed * category.percentage) / 100,
              });
            }
            break;
        }
      }
    }
    /** isPregnant */
    if (person.attributes?.isPregnant) {
      if (person.type === "adult") {
        // Check adult pregnancy
        if (isSingle)
          additionals.push({
            name: "Schwanger",
            amount:
              Math.round(data[type as "adult"]["single"] * 0.17 * 100) / 100,
          });
        else {
          if (type === "adult")
            additionals.push({
              name: "Schwanger",
              amount: Math.round(data[type]["partner"] * 0.17 * 100) / 100,
            });
        }
      } else {
        // Check child pregnancy
        if (getChildAgeGroup((person as TChild).age) === "18+") {
          additionals.push({
            name: "Schwanger",
            amount: Math.round(data["child"]["18+"] * 0.17 * 100) / 100,
          });
        }
        if (getChildAgeGroup((person as TChild).age) === "14-17") {
          additionals.push({
            name: "Schwanger",
            amount: Math.round(data["child"]["14-17"] * 0.17 * 100) / 100,
          });
        }
      }
    }
    /** hasDeseases */
    if (person.attributes?.diseases?.length) {
      person.attributes.diseases.map((disease) => {
        if (disease === "celiacDisease") {
          if (type === "adult") {
            return additionals.push({
              name:
                DiseaseMap.find((el) => el.id === disease)?.label ??
                "unknown disease",
              amount: isSingle
                ? Math.round(data[type]["single"] * 0.2 * 100) / 100
                : Math.round(data[type]["partner"] * 0.2 * 100) / 100,
            });
          } else {
            const ageGroup = getChildAgeGroup((person as TChild).age);
            return additionals.push({
              name:
                DiseaseMap.find((el) => el.id === disease)?.label ??
                "unknown disease",
              amount: Math.round(data[type][ageGroup] * 0.2 * 100) / 100,
            });
          }
        }

        if (disease === "cysticFibrosis") {
          if (type === "adult") {
            return additionals.push({
              name:
                DiseaseMap.find((el) => el.id === disease)?.label ??
                "unknown disease",
              amount: isSingle
                ? Math.round(data[type]["single"] * 0.3 * 100) / 100
                : Math.round(data[type]["partner"] * 0.3 * 100) / 100,
            });
          } else {
            const ageGroup = getChildAgeGroup((person as TChild).age);
            return additionals.push({
              name:
                DiseaseMap.find((el) => el.id === disease)?.label ??
                "unknown disease",
              amount: Math.round(data[type][ageGroup] * 0.3 * 100) / 100,
            });
          }
        }

        if (disease === "liverDiseases") {
          if (type === "adult") {
            return additionals.push({
              name:
                DiseaseMap.find((el) => el.id === disease)?.label ??
                "unknown disease",
              amount: isSingle
                ? Math.round(data[type]["single"] * 0.05 * 100) / 100
                : Math.round(data[type]["partner"] * 0.05 * 100) / 100,
            });
          } else {
            const ageGroup = getChildAgeGroup((person as TChild).age);
            return additionals.push({
              name:
                DiseaseMap.find((el) => el.id === disease)?.label ??
                "unknown disease",
              amount: Math.round(data[type][ageGroup] * 0.05 * 100) / 100,
            });
          }
        }

        if (disease === "renalInsufficiency") {
          if (type === "adult") {
            return additionals.push({
              name:
                DiseaseMap.find((el) => el.id === disease)?.label ??
                "unknown disease",
              amount: isSingle
                ? Math.round(data[type]["single"] * 0.1 * 100) / 100
                : Math.round(data[type]["partner"] * 0.1 * 100) / 100,
            });
          } else {
            const ageGroup = getChildAgeGroup((person as TChild).age);
            return additionals.push({
              name:
                DiseaseMap.find((el) => el.id === disease)?.label ??
                "unknown disease",
              amount: Math.round(data[type][ageGroup] * 0.1 * 100) / 100,
            });
          }
        }
      });
    }

    if (additionals.length)
      acc.push({ personId: person.id, name: person.name, additionals });

    return acc;
  }, []);

  return additionalNeeds;
}

export function calculateSalary({
  gross,
  net,
  hasMinorChild,
  isYoung,
}: {
  gross: number;
  net: number;
  hasMinorChild: boolean;
  isYoung?: boolean;
}) {
  // FIXME: add calculation for isYoung. See https://github.com/zeekrey/buergergeldrechner-leipzig/issues/7
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
    income: net,
  };
}

export function calculateOverall(context: TStepContext) {
  const { need } = calculateCommunityNeed(context);
  const additionalNeeds = calculateAdditionalNeeds(context);
  const flattenedIncome = flattenIncome(context.community);
  const incomeSum = flattenedIncome.reduce((acc, curr) => acc + curr.amount, 0);
  const allowance = calculateAllowance(context);
  const childBenefitTransferSum = calculateChildBenefitTransfer(context).reduce(
    (acc, curr) => acc + curr.amount,
    0
  );

  const additionalNeedsSum = additionalNeeds.reduce((totalSum, item) => {
    // Sum the values of additionals for the current item
    const additionalsSum = item.additionals.reduce(
      (sum, additional) => sum + additional.amount,
      0
    );
    return totalSum + additionalsSum; // Add to the total sum
  }, 0);

  return {
    need,
    income: incomeSum,
    spendingNeed: need + context.spendings.sum,
    allowance,
    overall:
      need +
      additionalNeedsSum +
      context.spendings.sum +
      allowance.reduce((acc, curr) => acc + (curr.amount ?? 0), 0) -
      incomeSum -
      childBenefitTransferSum,
  };
}

export function calculateChildBenefitTransfer(context: TStepContext) {
  /** Child benefit transfer (Kindergeldübertrag) */
  const rentPerPerson =
    Math.round((context.spendings.sum / context.community.length) * 100) / 100;

  const childBenefitTransfer = context.community
    .filter((pers) => pers.type === "child")
    .reduce<{ name: string; amount: number }[]>((acc, child) => {
      const baseAmount = data.child[getChildAgeGroup(child.age)];

      const incomeSum = child.income.reduce((_acc, curr) => {
        return _acc + curr.amount;
      }, 0);

      if (incomeSum > baseAmount + rentPerPerson)
        acc.push({
          name: child.name,
          amount: incomeSum - (baseAmount + rentPerPerson),
        });

      return acc;
    }, []);

  return childBenefitTransfer;
}

export function calculateAllowance(context: TStepContext) {
  /** Private insurance */
  const legitimate = context.community.filter((person) => {
    if (
      (person.type === "adult" || getChildAgeGroup(person.age) === "18+") &&
      person.income?.length > 0 &&
      person.income?.every((income) => income.type !== "EmploymentIncome")
    )
      return true;
  });

  /** Allowance from income */
  const incomeAllowance = context.community.flatMap((group) =>
    group.income
      .filter((income) => income.allowance)
      .map((income) => ({
        id: income.id,
        amount: income.allowance,
        type: income.type,
      }))
  );

  /** Basic deduction amount, only once */
  // FIXME:
  const schema = z.array(IncomeTypEnum);
  const legitimateIncomeTypes: z.infer<typeof schema> = [
    "BAfOG",
    "VocationalTrainingAllowance",
    "MaintenanceContributionFromMasterCraftsmen",
  ];
  // const [hasBasicDeduction] = context.community.flatMap((group) =>
  //   group.income.some((item) => legitimateIncomeTypes.includes(item.type))
  // );

  const baseDeduction = context.community.reduce<
    { id: string; type: "baseDeduction"; amount: number }[]
  >((acc, curr) => {
    const hasBasicDeduction = curr.income.some((item) =>
      legitimateIncomeTypes.includes(item.type)
    );

    if (hasBasicDeduction) {
      acc.push({ id: curr.id, type: "baseDeduction", amount: 100 });
    }

    return acc; // Ensure to return the accumulator in every iteration
  }, []);

  return [
    ...baseDeduction,
    ...legitimate.map((person) => ({
      id: person.id,
      type: "insurance",
      amount: 30,
    })),
    ...incomeAllowance,
  ];
}
