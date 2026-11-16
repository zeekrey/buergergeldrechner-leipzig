import type { TPerson } from "./types";
export declare function flattenIncome(community: TPerson[]): (({
    id: string;
    amount: number;
    type: "EmploymentIncome";
    gros: number;
    net: number;
    allowance?: number | undefined;
} | {
    id: string;
    amount: number;
    type: "SelfEmploymentIncome";
    gros: number;
    net: number;
    allowance?: number | undefined;
} | {
    id: string;
    amount: number;
    type: "ChildAllowance";
    allowance?: number | undefined;
} | {
    id: string;
    amount: number;
    type: "AdvanceMaintenancePayment";
    allowance?: number | undefined;
} | {
    id: string;
    amount: number;
    type: "Maintenance";
    allowance?: number | undefined;
} | {
    id: string;
    amount: number;
    type: "UnemploymentBenefits";
    allowance?: number | undefined;
} | {
    id: string;
    amount: number;
    type: "SicknessBenefits";
    allowance?: number | undefined;
} | {
    id: string;
    amount: number;
    type: "HousingAllowance";
    allowance?: number | undefined;
} | {
    id: string;
    amount: number;
    type: "ChildSupplement";
    allowance?: number | undefined;
} | {
    id: string;
    amount: number;
    type: "BAfOG";
    allowance?: number | undefined;
} | {
    id: string;
    amount: number;
    type: "ParentalAllowance";
    parentalAllowanceType: "normal" | "plus";
    claim: number;
    officialAllowance: number;
    allowance?: number | undefined;
} | {
    id: string;
    amount: number;
    type: "Pension";
    allowance?: number | undefined;
} | {
    id: string;
    amount: number;
    type: "MaintenanceContributionFromMasterCraftsmen";
    allowance?: number | undefined;
} | {
    id: string;
    amount: number;
    type: "ShortTimeWorkAllowance";
    gros: number;
    net: number;
    allowance?: number | undefined;
} | {
    id: string;
    amount: number;
    type: "VocationalTrainingAllowance";
    allowance?: number | undefined;
} | {
    id: string;
    amount: number;
    type: "TaxFreeSideJob";
    allowance?: number | undefined;
} | {
    id: string;
    amount: number;
    type: "VoluntarySocialYear";
    allowance?: number | undefined;
} | {
    id: string;
    amount: number;
    type: "OtherIncome";
    allowance?: number | undefined;
} | {
    id: string;
    amount: number;
    type: "ChildBenefitTransfer";
    allowance?: number | undefined;
}) & {
    personId: string;
    name: string;
})[];
export declare function generateId(): string;
export declare function getChildAgeGroup(age: number): "0-5" | "6-13" | "14-17" | "18+";
interface AdditionalChildNeedsCategory {
    description: string;
    percentage: number;
}
export declare const additionalChildNeedsCategory: AdditionalChildNeedsCategory[];
export {};
