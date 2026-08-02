import { type TStepContext, type TAllowance } from "./types";
import { flattenIncome } from "./utils";
type TAdditional = {
    name: string;
    amount: number;
};
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
export declare function calculateOverall(context: TStepContext): {
    baseNeed: {
        sum: number;
        community: {
            name: string;
            personId: string;
            amount: number;
        }[];
    };
    additionalNeeds: {
        sum: number;
        community: {
            personId: string;
            name: string;
            additionals: TAdditional[];
        }[];
    };
    spendings: number;
    need: number;
    income: {
        sum: number;
        community: typeof flattenIncome;
    };
    allowance: {
        personId: string;
        type: TAllowance;
        amount: number;
    }[];
    incomeAfterAllowance: number;
    overall: number;
};
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
