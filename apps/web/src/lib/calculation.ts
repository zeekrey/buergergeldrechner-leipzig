import {
  TStepContext,
  TChild,
  diseases as DiseaseMap,
  IncomeTypEnum,
  TAllowance,
} from "./types";
import data from "../config/data.json";
import {
  additionalChildNeedsCategory,
  flattenIncome,
  getChildAgeGroup,
} from "./utils";
import { z } from "zod";

type TAdditional = { name: string; amount: number };

/**
 * "Bürgergeld" is the result of the following:
 *   Regelbedarf (base need)
 * + Mehrbedarf (additional need)
 * + Kosten der Unterkunft (spendings)
 * = need
 *
 *   Einkommen (income)
 * - Freibeträge (allowance)
 * = Einkommen abzgl. Freibeträge (income after allowance)
 *
 *   Bedarf (need)
 * - Einkommen abzgl. Freibeträge (income after allowance)
 * = Bürgergeldanspruch (overall)
 */

/**
 * Calculates the base need based on person type and age.
 */
export function calculateBaseNeed(context: TStepContext) {
  const isSingle =
    context.community.filter((person) => person.type === "adult").length === 1;

  const community = context.community.map(({ name, type, ...rest }) => {
    let amount: number = 0;

    if (type === "adult") {
      amount = isSingle ? data[type]["single"] : data[type]["partner"];
    } else if (type === "child") {
      amount = data[type][getChildAgeGroup((rest as TChild).age)];
    }

    return { name, personId: rest.id, amount };
  });

  const sum = community.reduce((acc, curr) => acc + curr.amount, 0);

  return {
    sum,
    community,
  };
}

/**
 * Calculated additional needs based an person attributes.
 */
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

  const sum = additionalNeeds.reduce((totalSum, item) => {
    // Sum the values of additionals for the current item
    const additionalsSum = item.additionals.reduce(
      (sum, additional) => sum + additional.amount,
      0
    );
    return totalSum + additionalsSum; // Add to the total sum
  }, 0);

  return {
    sum,
    community: additionalNeeds,
  };
}

export function calculateChildBenefitTransfer(context: TStepContext) {
  /** Child benefit transfer (Kindergeldübertrag) */

  /** 1.Evenly distribute the expenses (KdU) among all community members. */
  const rentPerPerson =
    Math.round((context.spendings.sum / context.community.length) * 100) / 100;

  /** 2. Go through all childs */
  const childBenefitTransfer = context.community
    .filter((pers) => pers.type === "child")
    .reduce<{ name: string; amount: number }[]>((acc, child) => {
      /** 3. Get the base amount for the child (depending on age) */
      const baseAmount = data.child[getChildAgeGroup(child.age)];

      /** 4. Calculate the income sum. */
      const incomeSum = child.income.reduce((_acc, curr) => {
        return _acc + curr.amount;
      }, 0);

      /** 5. If the income is greater then the base amount + the rent share, add a benefit transfer. */
      if (incomeSum > baseAmount + rentPerPerson)
        acc.push({
          name: child.name,
          amount: incomeSum - (baseAmount + rentPerPerson),
        });

      return acc;
    }, []);

  return childBenefitTransfer;
}

export function calculateAllowance(context: TStepContext): {
  id: string;
  type: TAllowance;
  amount: number;
}[] {
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
        amount: income.allowance ?? 0,
        type: income.type,
      }))
  );

  /** Basic deduction amount, only once */
  const schema = z.array(IncomeTypEnum);
  const legitimateIncomeTypes: z.infer<typeof schema> = [
    "BAfOG",
    "VocationalTrainingAllowance",
    "MaintenanceContributionFromMasterCraftsmen",
  ];

  const baseDeduction = context.community.reduce<
    { id: string; type: "baseDeduction"; amount: number }[]
  >((acc, curr) => {
    const hasBasicDeduction = curr.income.some((item) =>
      legitimateIncomeTypes.includes(item.type)
    );

    if (hasBasicDeduction) {
      acc.push({ id: curr.id, type: "baseDeduction" as const, amount: 100 });
    }

    return acc;
  }, []);

  return [
    ...baseDeduction,
    ...legitimate.map((person) => ({
      id: person.id,
      type: "insurance" as const,
      amount: 30,
    })),
    ...incomeAllowance,
  ];
}

export function calculateIncome(context: TStepContext) {
  const flattenedIncome = flattenIncome(context.community);
  return flattenedIncome.reduce((acc, curr) => acc + curr.amount, 0);
}

export function calculateOverall(context: TStepContext) {
  const baseNeed = calculateBaseNeed(context);
  const additionalNeeds = calculateAdditionalNeeds(context);
  const income = calculateIncome(context);
  const allowance = calculateAllowance(context);

  const need = baseNeed.sum + additionalNeeds.sum + context.spendings.sum;
  const incomeAfterAllowance =
    income - allowance.reduce((acc, curr) => acc + (curr.amount ?? 0), 0);

  return {
    baseNeed,
    additionalNeeds,
    spendings: context.spendings.sum,
    need,
    income: {
      sum: income,
      community: flattenIncome,
    },
    allowance,
    incomeAfterAllowance,
    overall: need - incomeAfterAllowance,
  };
}
