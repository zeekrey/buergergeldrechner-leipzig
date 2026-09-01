import {
  type TStepContext,
  type TChild,
  diseases as DiseaseMap,
  IncomeTypEnum,
  type TAllowance,
} from "./types";
import { calculateAssets } from "./assets";
import data from "./data.json";
import {
  additionalChildNeedsCategory,
  flattenIncome,
  getChildAgeGroup,
} from "./utils";
import { z } from "zod";

type TAdditional = { name: string; amount: number };

const roundCurrency = (amount: number) => Math.round(amount * 100) / 100;

/**
 * "Grundsicherungsgeld" is the result of the following:
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
 * = Grundsicherungsanspruch (overall)
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
  if (!context.community.length) return [];

  const rentPerPerson = context.spendings.sum / context.community.length;
  const additionalNeeds = calculateAdditionalNeeds(context);
  const allowances = calculateAllowance(context);

  return context.community
    .filter((person) => person.type === "child")
    .reduce<{ name: string; amount: number }[]>((result, child) => {
      const childBenefit = child.income
        .filter((income) => income.type === "ChildAllowance")
        .reduce((sum, income) => sum + income.amount, 0);

      if (childBenefit <= 0) return result;

      // Existing transfer entries are derived values and must not influence a
      // recalculation after another income position was edited.
      const income = child.income
        .filter((entry) => entry.type !== "ChildBenefitTransfer")
        .reduce((sum, entry) => sum + entry.amount, 0);
      const allowance = allowances
        .filter((entry) => entry.personId === child.id)
        .reduce((sum, entry) => sum + entry.amount, 0);
      const childAdditionalNeeds =
        additionalNeeds.community
          .find((entry) => entry.personId === child.id)
          ?.additionals.reduce((sum, entry) => sum + entry.amount, 0) ?? 0;
      const need =
        data.child[getChildAgeGroup(child.age)] +
        childAdditionalNeeds +
        rentPerPerson;
      const transferableChildBenefit = Math.min(
        Math.max(income - allowance - need, 0),
        childBenefit
      );

      if (transferableChildBenefit > 0) {
        result.push({
          name: child.name,
          amount: roundCurrency(transferableChildBenefit),
        });
      }

      return result;
    }, []);
}

export function calculateAllowance(context: TStepContext): {
  personId: string;
  type: TAllowance;
  amount: number;
}[] {
  /** Private insurance */
  const legitimate = context.community.filter((person) => {
    const relevantIncome = person.income.filter(
      (income) =>
        income.type !== "ChildAllowance" &&
        income.type !== "ChildBenefitTransfer"
    );

    return (
      (person.type === "adult" || getChildAgeGroup(person.age) === "18+") &&
      relevantIncome.length > 0 &&
      relevantIncome.every(
        (income) =>
          income.type !== "EmploymentIncome" &&
          income.type !== "SelfEmploymentIncome"
      )
    );
  });

  /** Allowance from income */
  const incomeAllowance = context.community.flatMap((group) =>
    group.income
      .filter((income) => income.allowance)
      .map((income) => ({
        personId: group.id,
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
    { personId: string; type: "baseDeduction"; amount: number }[]
  >((acc, curr) => {
    const hasBasicDeduction = curr.income.some((item) =>
      legitimateIncomeTypes.includes(item.type)
    );

    if (hasBasicDeduction) {
      acc.push({
        personId: curr.id,
        type: "baseDeduction" as const,
        amount: 100,
      });
    }

    return acc;
  }, []);

  return [
    ...baseDeduction,
    ...legitimate.map((person) => ({
      personId: person.id,
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

type BenefitCommunityResult = {
  context: TStepContext;
  excludedPersonIds: string[];
  requiresManualReview: boolean;
};

export type OverallCalculation = {
  baseNeed: ReturnType<typeof calculateBaseNeed>;
  additionalNeeds: ReturnType<typeof calculateAdditionalNeeds>;
  spendings: number;
  spendingDetails: TStepContext["spendings"];
  need: number;
  income: {
    sum: number;
    community: ReturnType<typeof flattenIncome>;
  };
  allowance: ReturnType<typeof calculateAllowance>;
  incomeAfterAllowance: number;
  assets: ReturnType<typeof calculateAssets>;
  overall: number;
  resultStatus: "calculated" | "manual-review";
  benefitCommunity: TStepContext["community"];
  benefitCommunityRequiresManualReview: boolean;
  excludedPersonIds: string[];
};

/**
 * Children under 25 only belong to the benefit community while their own
 * assessable income does not cover their individual need. Their surplus may
 * not be used to cover the needs of parents or siblings.
 */
export function calculateBenefitCommunity(
  context: TStepContext
): BenefitCommunityResult {
  if (!context.community.length) {
    return {
      context,
      excludedPersonIds: [] as string[],
      requiresManualReview: false,
    };
  }

  const rentPerPerson = context.spendings.sum / context.community.length;
  const baseNeed = calculateBaseNeed(context);
  const additionalNeeds = calculateAdditionalNeeds(context);
  const allowance = calculateAllowance(context);

  const excludedPersonIds: string[] = [];
  let requiresManualReview = false;

  context.community
    .filter((person) => person.type === "child" && person.age < 25)
    .forEach((child) => {
      const individualBaseNeed =
        baseNeed.community.find((entry) => entry.personId === child.id)
          ?.amount ?? 0;
      const individualAdditionalNeeds =
        additionalNeeds.community
          .find((entry) => entry.personId === child.id)
          ?.additionals.reduce((sum, entry) => sum + entry.amount, 0) ?? 0;
      const individualNeed =
        individualBaseNeed + individualAdditionalNeeds + rentPerPerson;
      const individualIncome = child.income.reduce(
        (sum, entry) => sum + entry.amount,
        0
      );
      const individualAllowance = allowance
        .filter((entry) => entry.personId === child.id)
        .reduce((sum, entry) => sum + entry.amount, 0);
      const incomeAfterAllowance = individualIncome - individualAllowance;

      if (incomeAfterAllowance >= individualNeed) {
        excludedPersonIds.push(child.id);
        return;
      }

      const individualAssets = calculateAssets({
        ...context,
        community: [child],
        isEmployable: false,
        assets: {
          ...context.assets,
          items: context.assets.items.filter(
            (asset) => asset.personId === child.id
          ),
        },
      });
      const assetsWouldMakeChildSelfSupporting =
        incomeAfterAllowance + individualAssets.excess >= individualNeed;

      if (!assetsWouldMakeChildSelfSupporting) return;
      if (individualAssets.requiresManualReview) {
        requiresManualReview = true;
        return;
      }
      excludedPersonIds.push(child.id);
    });

  const community = context.community.filter(
    (person) => !excludedPersonIds.includes(person.id)
  );
  const communityShare = community.length / context.community.length;
  const spendings = {
    rent: roundCurrency(context.spendings.rent * communityShare),
    utilities: roundCurrency(context.spendings.utilities * communityShare),
    heating: roundCurrency(context.spendings.heating * communityShare),
    sum: roundCurrency(rentPerPerson * community.length),
  };

  return {
    context: {
      ...context,
      community,
      spendings,
      assets: {
        ...context.assets,
        items: context.assets.items.filter(
          (asset) => !excludedPersonIds.includes(asset.personId)
        ),
      },
    },
    excludedPersonIds,
    requiresManualReview,
  };
}

export function calculateOverall(
  context: TStepContext
): OverallCalculation {
  const {
    context: benefitContext,
    excludedPersonIds,
    requiresManualReview: benefitCommunityRequiresManualReview,
  } = calculateBenefitCommunity(context);
  const baseNeed = calculateBaseNeed(benefitContext);
  const additionalNeeds = calculateAdditionalNeeds(benefitContext);
  const income = calculateIncome(benefitContext);
  const allowance = calculateAllowance(benefitContext);

  const need =
    baseNeed.sum + additionalNeeds.sum + benefitContext.spendings.sum;
  const incomeAfterAllowance =
    income - allowance.reduce((acc, curr) => acc + (curr.amount ?? 0), 0);
  const assets = calculateAssets(benefitContext);
  const overall = need - incomeAfterAllowance;
  const resultStatus =
    assets.requiresManualReview || benefitCommunityRequiresManualReview
      ? "manual-review"
      : "calculated";

  return {
    baseNeed,
    additionalNeeds,
    spendings: benefitContext.spendings.sum,
    spendingDetails: benefitContext.spendings,
    need,
    income: {
      sum: income,
      community: flattenIncome(benefitContext.community),
    },
    allowance,
    incomeAfterAllowance,
    assets,
    overall,
    resultStatus,
    benefitCommunity: benefitContext.community,
    benefitCommunityRequiresManualReview,
    excludedPersonIds,
  };
}

export function calculateSelfEmploymentIncome({
  revenue,
  expenses,
  hasMinorChild,
  isYoung,
}: {
  revenue: number;
  expenses: number;
  hasMinorChild: boolean;
  isYoung: boolean;
}) {
  if (revenue < 0 || expenses < 0) {
    return {
      allowance: 0,
      income: 0,
    };
  }

  const profit = Math.max(revenue - expenses, 0);

  if (profit === 0) {
    return {
      allowance: 0,
      income: 0,
    };
  }

  // For self-employment, both the assessable income and the allowance are
  // based on profit (revenue minus business expenses), not on revenue.
  return calculateSalary({
    gross: profit,
    net: profit,
    hasMinorChild,
    isYoung,
  });
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
  isYoung: boolean;
}) {
  if (gross < 1 || net < 1 || net > gross)
    return {
      allowance: 0,
      income: 0,
    };

  let allowance = isYoung ? 556 : 100;

  // Check if isYoung is true to skip the following rules.
  if (!isYoung && gross <= 520) {
    allowance += (gross - 100) * 0.2; // 20% for the range 100-520
  } else if (!isYoung) {
    allowance += (520 - 100) * 0.2; // 20% for the range 100-520
  }

  if (!isYoung && gross > 520) {
    // This check ensures we only apply the next conditions if gross > 520
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

  // Ensure allowance does not exceed gross
  if (allowance > net) {
    allowance = net;
  }

  return {
    allowance: allowance,
    income: net,
  };
}
