import type { TPerson } from "./types";
export declare function flattenIncome(community: TPerson[]): (({
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "EmploymentIncome";
    gros: number;
    net: number;
} | {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "SelfEmploymentIncome";
    gros: number;
    net: number;
} | {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "ChildAllowance";
} | {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "AdvanceMaintenancePayment";
} | {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "Maintenance";
} | {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "UnemploymentBenefits";
} | {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "SicknessBenefits";
} | {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "HousingAllowance";
} | {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "ChildSupplement";
} | {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "BAfOG";
} | {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "ParentalAllowance";
    parentalAllowanceType: "normal" | "plus";
    claim: number;
    officialAllowance: number;
} | {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "Pension";
} | {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "MaintenanceContributionFromMasterCraftsmen";
} | {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "ShortTimeWorkAllowance";
    gros: number;
    net: number;
} | {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "VocationalTrainingAllowance";
} | {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "TaxFreeSideJob";
} | {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "VoluntarySocialYear";
} | {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "OtherIncome";
} | {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "ChildBenefitTransfer";
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
