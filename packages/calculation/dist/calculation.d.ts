import { type TStepContext, type TAllowance } from "./types";
import { calculateAssets } from "./assets";
import { flattenIncome } from "./utils";
type TAdditional = {
    name: string;
    amount: number;
};
/** Monthly Sofortzuschlag under § 72 Abs. 1 SGB II (from 1 January 2025). */
export declare const IMMEDIATE_SUPPLEMENT_AMOUNT = 25;
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
    requiresManualReview: boolean;
};
export type ImmediateSupplementResult = {
    sum: number;
    community: {
        personId: string;
        name: string;
        amount: number;
    }[];
};
export type OverallCalculation = {
    baseNeed: ReturnType<typeof calculateBaseNeed>;
    additionalNeeds: ReturnType<typeof calculateAdditionalNeeds>;
    immediateSupplement: ImmediateSupplementResult;
    spendings: number;
    spendingDetails: TStepContext["spendings"];
    housingCostLimit: number | null;
    housingCostReduction: number;
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
export declare function calculateHousingCosts(context: TStepContext): {
    limit: number | null;
    reduction: number;
    sum: number;
};
/**
 * Children under 25 only belong to the benefit community while their own
 * assessable income does not cover their individual need. Their surplus may
 * not be used to cover the needs of parents or siblings.
 */
export declare function calculateBenefitCommunity(context: TStepContext): BenefitCommunityResult;
/**
 * Calculates the monthly Sofortzuschlag (25 EUR) under § 72 SGB II for children,
 * adolescents, and young adults whose base need corresponds to Regelbedarfsstufe
 * 3, 4, 5, or 6.
 *
 * The Sofortzuschlag is an additional benefit and does not create entitlement on
 * its own (Rz. 72.2). It also applies to children excluded from the benefit
 * community solely because Kindergeld covers their need (§ 72 Abs. 1 Satz 2 Nr. 2).
 */
export declare function calculateImmediateSupplement(context: TStepContext, benefitContext: TStepContext, excludedPersonIds: string[], entitlementBeforeSupplement: number): ImmediateSupplementResult;
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
