import { type TStepContext, type TAllowance } from "./types";
import { flattenIncome } from "./utils";
type TAdditional = {
    name: string;
    amount: number;
};
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
export declare function calculateBaseNeed(context: TStepContext): {
    sum: number;
    community: {
        name: string;
        personId: string;
        amount: number;
    }[];
};
/**
 * Calculated additional needs based an person attributes.
 */
export declare function calculateAdditionalNeeds(context: TStepContext): {
    sum: number;
    community: {
        personId: string;
        name: string;
        additionals: TAdditional[];
    }[];
};
export declare function calculateChildBenefitTransfer(context: TStepContext): {
    name: string;
    amount: number;
}[];
export declare function calculateAllowance(context: TStepContext): {
    personId: string;
    type: TAllowance;
    amount: number;
}[];
export declare function calculateIncome(context: TStepContext): number;
type BenefitCommunityResult = {
    context: TStepContext;
    excludedPersonIds: string[];
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
    overall: number;
    benefitCommunity: TStepContext["community"];
    excludedPersonIds: string[];
};
/**
 * Children under 25 only belong to the benefit community while their own
 * assessable income does not cover their individual need. Their surplus may
 * not be used to cover the needs of parents or siblings.
 */
export declare function calculateBenefitCommunity(context: TStepContext): BenefitCommunityResult;
export declare function calculateOverall(context: TStepContext): OverallCalculation;
export declare function calculateSelfEmploymentIncome({ revenue, expenses, hasMinorChild, isYoung, }: {
    revenue: number;
    expenses: number;
    hasMinorChild: boolean;
    isYoung: boolean;
}): {
    allowance: number;
    income: number;
};
export declare function calculateSalary({ gross, net, hasMinorChild, isYoung, }: {
    gross: number;
    net: number;
    hasMinorChild: boolean;
    isYoung: boolean;
}): {
    allowance: number;
    income: number;
};
export {};
