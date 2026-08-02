import { z } from "zod";
export type TStep = {
    description: string;
    id: string;
    next: (ctx: TStepContext) => number;
    previous: number;
    title: string;
};
export declare const diseases: readonly [{
    readonly id: "renalInsufficiency";
    readonly label: "Chronisch obstruktive Erkrankung";
    readonly description: "Häufig bei chronisch obstruktiven Lungenerkrankungen (COPD), Tumorerkrankungen, CED (Morbus Crohn, Collitis Ulcerosa), Neurologischen Erkrankungen (auch Schluckstörungen*), terminaler Niereninsuffizienz, insb. bei Dialyse* und präterminale Niereninsuffizienz, insb. bei Dialyse, Wundheilungsstörungen, Lebererkrankungen (z. B. alkoholische Steatohepatitis, Leberzirrhose)";
}, {
    readonly id: "liverDiseases";
    readonly label: "Niereninsuffizienz";
    readonly description: "Terminale Niereninsuffizienz mit Dialysetherapie.";
}, {
    readonly id: "celiacDisease";
    readonly label: "Zöliakie";
    readonly description: "";
}, {
    readonly id: "cysticFibrosis";
    readonly label: "Mukoviszidose/zystische Fibrose";
    readonly description: "";
}];
export declare const IncomeTypEnum: z.ZodEnum<["EmploymentIncome", "SelfEmploymentIncome", "ChildAllowance", "AdvanceMaintenancePayment", "Maintenance", "UnemploymentBenefits", "SicknessBenefits", "HousingAllowance", "ChildSupplement", "BAfOG", "ParentalAllowance", "Pension", "MaintenanceContributionFromMasterCraftsmen", "ShortTimeWorkAllowance", "VocationalTrainingAllowance", "TaxFreeSideJob", "VoluntarySocialYear", "OtherIncome", "ChildBenefitTransfer"]>;
export type TIncomeType = z.infer<typeof IncomeTypEnum>;
export declare const IncomeBaseSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodEnum<["EmploymentIncome", "SelfEmploymentIncome", "ChildAllowance", "AdvanceMaintenancePayment", "Maintenance", "UnemploymentBenefits", "SicknessBenefits", "HousingAllowance", "ChildSupplement", "BAfOG", "ParentalAllowance", "Pension", "MaintenanceContributionFromMasterCraftsmen", "ShortTimeWorkAllowance", "VocationalTrainingAllowance", "TaxFreeSideJob", "VoluntarySocialYear", "OtherIncome", "ChildBenefitTransfer"]>;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    id: string;
    type: "AdvanceMaintenancePayment" | "BAfOG" | "ChildAllowance" | "ChildBenefitTransfer" | "ChildSupplement" | "EmploymentIncome" | "HousingAllowance" | "Maintenance" | "MaintenanceContributionFromMasterCraftsmen" | "OtherIncome" | "ParentalAllowance" | "Pension" | "SelfEmploymentIncome" | "ShortTimeWorkAllowance" | "SicknessBenefits" | "TaxFreeSideJob" | "UnemploymentBenefits" | "VocationalTrainingAllowance" | "VoluntarySocialYear";
    amount: number;
    allowance?: number | undefined;
}, {
    id: string;
    type: "AdvanceMaintenancePayment" | "BAfOG" | "ChildAllowance" | "ChildBenefitTransfer" | "ChildSupplement" | "EmploymentIncome" | "HousingAllowance" | "Maintenance" | "MaintenanceContributionFromMasterCraftsmen" | "OtherIncome" | "ParentalAllowance" | "Pension" | "SelfEmploymentIncome" | "ShortTimeWorkAllowance" | "SicknessBenefits" | "TaxFreeSideJob" | "UnemploymentBenefits" | "VocationalTrainingAllowance" | "VoluntarySocialYear";
    amount: number;
    allowance?: number | undefined;
}>;
export declare const EmploymentIncomeSchema: z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
} & {
    type: z.ZodLiteral<"EmploymentIncome">;
    gros: z.ZodNumber;
    net: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "EmploymentIncome";
    gros: number;
    net: number;
}, {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "EmploymentIncome";
    gros: number;
    net: number;
}>;
export declare const SelfEmploymentIncomeSchema: z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
} & {
    type: z.ZodLiteral<"SelfEmploymentIncome">;
    gros: z.ZodNumber;
    net: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "SelfEmploymentIncome";
    gros: number;
    net: number;
}, {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "SelfEmploymentIncome";
    gros: number;
    net: number;
}>;
export declare const ChildAllowanceSchema: z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
} & {
    type: z.ZodLiteral<"ChildAllowance">;
}, "strip", z.ZodTypeAny, {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "ChildAllowance";
}, {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "ChildAllowance";
}>;
export declare const AdvanceMaintenancePaymentSchema: z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
} & {
    type: z.ZodLiteral<"AdvanceMaintenancePayment">;
}, "strip", z.ZodTypeAny, {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "AdvanceMaintenancePayment";
}, {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "AdvanceMaintenancePayment";
}>;
export declare const MaintenanceSchema: z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
} & {
    type: z.ZodLiteral<"Maintenance">;
}, "strip", z.ZodTypeAny, {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "Maintenance";
}, {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "Maintenance";
}>;
export declare const UnemploymentBenefitsSchema: z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
} & {
    type: z.ZodLiteral<"UnemploymentBenefits">;
}, "strip", z.ZodTypeAny, {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "UnemploymentBenefits";
}, {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "UnemploymentBenefits";
}>;
export declare const SicknessBenefitsSchema: z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
} & {
    type: z.ZodLiteral<"SicknessBenefits">;
}, "strip", z.ZodTypeAny, {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "SicknessBenefits";
}, {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "SicknessBenefits";
}>;
export declare const HousingAllowanceSchema: z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
} & {
    type: z.ZodLiteral<"HousingAllowance">;
}, "strip", z.ZodTypeAny, {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "HousingAllowance";
}, {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "HousingAllowance";
}>;
export declare const ChildSupplementSchema: z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
} & {
    type: z.ZodLiteral<"ChildSupplement">;
}, "strip", z.ZodTypeAny, {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "ChildSupplement";
}, {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "ChildSupplement";
}>;
export declare const BAfOGSchema: z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
} & {
    type: z.ZodLiteral<"BAfOG">;
}, "strip", z.ZodTypeAny, {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "BAfOG";
}, {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "BAfOG";
}>;
export declare const ParentalAllowanceSchema: z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
} & {
    type: z.ZodLiteral<"ParentalAllowance">;
    parentalAllowanceType: z.ZodEnum<["normal", "plus"]>;
    claim: z.ZodNumber;
    officialAllowance: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "ParentalAllowance";
    parentalAllowanceType: "normal" | "plus";
    claim: number;
    officialAllowance: number;
}, {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "ParentalAllowance";
    parentalAllowanceType: "normal" | "plus";
    claim: number;
    officialAllowance: number;
}>;
export declare const PensionSchema: z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
} & {
    type: z.ZodLiteral<"Pension">;
}, "strip", z.ZodTypeAny, {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "Pension";
}, {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "Pension";
}>;
export declare const MaintenanceContributionFromMasterCraftsmenSchema: z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
} & {
    type: z.ZodLiteral<"MaintenanceContributionFromMasterCraftsmen">;
}, "strip", z.ZodTypeAny, {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "MaintenanceContributionFromMasterCraftsmen";
}, {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "MaintenanceContributionFromMasterCraftsmen";
}>;
export declare const ShortTimeWorkAllowanceSchema: z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
} & {
    type: z.ZodLiteral<"ShortTimeWorkAllowance">;
    gros: z.ZodNumber;
    net: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "ShortTimeWorkAllowance";
    gros: number;
    net: number;
}, {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "ShortTimeWorkAllowance";
    gros: number;
    net: number;
}>;
export declare const VocationalTrainingAllowanceSchema: z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
} & {
    type: z.ZodLiteral<"VocationalTrainingAllowance">;
}, "strip", z.ZodTypeAny, {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "VocationalTrainingAllowance";
}, {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "VocationalTrainingAllowance";
}>;
export declare const TaxFreeSideJobSchema: z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
} & {
    type: z.ZodLiteral<"TaxFreeSideJob">;
}, "strip", z.ZodTypeAny, {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "TaxFreeSideJob";
}, {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "TaxFreeSideJob";
}>;
export declare const VoluntarySocialYearSchema: z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
} & {
    type: z.ZodLiteral<"VoluntarySocialYear">;
}, "strip", z.ZodTypeAny, {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "VoluntarySocialYear";
}, {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "VoluntarySocialYear";
}>;
export declare const OtherIncomeSchema: z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
} & {
    type: z.ZodLiteral<"OtherIncome">;
}, "strip", z.ZodTypeAny, {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "OtherIncome";
}, {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "OtherIncome";
}>;
export declare const ChildBenefitTransferSchema: z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
} & {
    type: z.ZodLiteral<"ChildBenefitTransfer">;
}, "strip", z.ZodTypeAny, {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "ChildBenefitTransfer";
}, {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "ChildBenefitTransfer";
}>;
export declare const ExtendedIncomeSchema: z.ZodUnion<[z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
} & {
    type: z.ZodLiteral<"EmploymentIncome">;
    gros: z.ZodNumber;
    net: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "EmploymentIncome";
    gros: number;
    net: number;
}, {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "EmploymentIncome";
    gros: number;
    net: number;
}>, z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
} & {
    type: z.ZodLiteral<"SelfEmploymentIncome">;
    gros: z.ZodNumber;
    net: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "SelfEmploymentIncome";
    gros: number;
    net: number;
}, {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "SelfEmploymentIncome";
    gros: number;
    net: number;
}>, z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
} & {
    type: z.ZodLiteral<"ChildAllowance">;
}, "strip", z.ZodTypeAny, {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "ChildAllowance";
}, {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "ChildAllowance";
}>, z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
} & {
    type: z.ZodLiteral<"AdvanceMaintenancePayment">;
}, "strip", z.ZodTypeAny, {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "AdvanceMaintenancePayment";
}, {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "AdvanceMaintenancePayment";
}>, z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
} & {
    type: z.ZodLiteral<"Maintenance">;
}, "strip", z.ZodTypeAny, {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "Maintenance";
}, {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "Maintenance";
}>, z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
} & {
    type: z.ZodLiteral<"UnemploymentBenefits">;
}, "strip", z.ZodTypeAny, {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "UnemploymentBenefits";
}, {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "UnemploymentBenefits";
}>, z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
} & {
    type: z.ZodLiteral<"SicknessBenefits">;
}, "strip", z.ZodTypeAny, {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "SicknessBenefits";
}, {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "SicknessBenefits";
}>, z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
} & {
    type: z.ZodLiteral<"HousingAllowance">;
}, "strip", z.ZodTypeAny, {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "HousingAllowance";
}, {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "HousingAllowance";
}>, z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
} & {
    type: z.ZodLiteral<"ChildSupplement">;
}, "strip", z.ZodTypeAny, {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "ChildSupplement";
}, {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "ChildSupplement";
}>, z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
} & {
    type: z.ZodLiteral<"BAfOG">;
}, "strip", z.ZodTypeAny, {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "BAfOG";
}, {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "BAfOG";
}>, z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
} & {
    type: z.ZodLiteral<"ParentalAllowance">;
    parentalAllowanceType: z.ZodEnum<["normal", "plus"]>;
    claim: z.ZodNumber;
    officialAllowance: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "ParentalAllowance";
    parentalAllowanceType: "normal" | "plus";
    claim: number;
    officialAllowance: number;
}, {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "ParentalAllowance";
    parentalAllowanceType: "normal" | "plus";
    claim: number;
    officialAllowance: number;
}>, z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
} & {
    type: z.ZodLiteral<"Pension">;
}, "strip", z.ZodTypeAny, {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "Pension";
}, {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "Pension";
}>, z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
} & {
    type: z.ZodLiteral<"MaintenanceContributionFromMasterCraftsmen">;
}, "strip", z.ZodTypeAny, {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "MaintenanceContributionFromMasterCraftsmen";
}, {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "MaintenanceContributionFromMasterCraftsmen";
}>, z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
} & {
    type: z.ZodLiteral<"ShortTimeWorkAllowance">;
    gros: z.ZodNumber;
    net: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "ShortTimeWorkAllowance";
    gros: number;
    net: number;
}, {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "ShortTimeWorkAllowance";
    gros: number;
    net: number;
}>, z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
} & {
    type: z.ZodLiteral<"VocationalTrainingAllowance">;
}, "strip", z.ZodTypeAny, {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "VocationalTrainingAllowance";
}, {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "VocationalTrainingAllowance";
}>, z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
} & {
    type: z.ZodLiteral<"TaxFreeSideJob">;
}, "strip", z.ZodTypeAny, {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "TaxFreeSideJob";
}, {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "TaxFreeSideJob";
}>, z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
} & {
    type: z.ZodLiteral<"VoluntarySocialYear">;
}, "strip", z.ZodTypeAny, {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "VoluntarySocialYear";
}, {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "VoluntarySocialYear";
}>, z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
} & {
    type: z.ZodLiteral<"OtherIncome">;
}, "strip", z.ZodTypeAny, {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "OtherIncome";
}, {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "OtherIncome";
}>, z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
} & {
    type: z.ZodLiteral<"ChildBenefitTransfer">;
}, "strip", z.ZodTypeAny, {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "ChildBenefitTransfer";
}, {
    id: string;
    amount: number;
    allowance?: number | undefined;
    type: "ChildBenefitTransfer";
}>]>;
declare const Adult: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    income: z.ZodArray<z.ZodUnion<[z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    } & {
        type: z.ZodLiteral<"EmploymentIncome">;
        gros: z.ZodNumber;
        net: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "EmploymentIncome";
        gros: number;
        net: number;
    }, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "EmploymentIncome";
        gros: number;
        net: number;
    }>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    } & {
        type: z.ZodLiteral<"SelfEmploymentIncome">;
        gros: z.ZodNumber;
        net: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "SelfEmploymentIncome";
        gros: number;
        net: number;
    }, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "SelfEmploymentIncome";
        gros: number;
        net: number;
    }>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    } & {
        type: z.ZodLiteral<"ChildAllowance">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "ChildAllowance";
    }, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "ChildAllowance";
    }>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    } & {
        type: z.ZodLiteral<"AdvanceMaintenancePayment">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "AdvanceMaintenancePayment";
    }, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "AdvanceMaintenancePayment";
    }>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    } & {
        type: z.ZodLiteral<"Maintenance">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "Maintenance";
    }, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "Maintenance";
    }>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    } & {
        type: z.ZodLiteral<"UnemploymentBenefits">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "UnemploymentBenefits";
    }, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "UnemploymentBenefits";
    }>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    } & {
        type: z.ZodLiteral<"SicknessBenefits">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "SicknessBenefits";
    }, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "SicknessBenefits";
    }>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    } & {
        type: z.ZodLiteral<"HousingAllowance">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "HousingAllowance";
    }, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "HousingAllowance";
    }>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    } & {
        type: z.ZodLiteral<"ChildSupplement">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "ChildSupplement";
    }, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "ChildSupplement";
    }>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    } & {
        type: z.ZodLiteral<"BAfOG">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "BAfOG";
    }, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "BAfOG";
    }>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    } & {
        type: z.ZodLiteral<"ParentalAllowance">;
        parentalAllowanceType: z.ZodEnum<["normal", "plus"]>;
        claim: z.ZodNumber;
        officialAllowance: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "ParentalAllowance";
        parentalAllowanceType: "normal" | "plus";
        claim: number;
        officialAllowance: number;
    }, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "ParentalAllowance";
        parentalAllowanceType: "normal" | "plus";
        claim: number;
        officialAllowance: number;
    }>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    } & {
        type: z.ZodLiteral<"Pension">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "Pension";
    }, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "Pension";
    }>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    } & {
        type: z.ZodLiteral<"MaintenanceContributionFromMasterCraftsmen">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "MaintenanceContributionFromMasterCraftsmen";
    }, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "MaintenanceContributionFromMasterCraftsmen";
    }>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    } & {
        type: z.ZodLiteral<"ShortTimeWorkAllowance">;
        gros: z.ZodNumber;
        net: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "ShortTimeWorkAllowance";
        gros: number;
        net: number;
    }, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "ShortTimeWorkAllowance";
        gros: number;
        net: number;
    }>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    } & {
        type: z.ZodLiteral<"VocationalTrainingAllowance">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "VocationalTrainingAllowance";
    }, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "VocationalTrainingAllowance";
    }>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    } & {
        type: z.ZodLiteral<"TaxFreeSideJob">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "TaxFreeSideJob";
    }, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "TaxFreeSideJob";
    }>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    } & {
        type: z.ZodLiteral<"VoluntarySocialYear">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "VoluntarySocialYear";
    }, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "VoluntarySocialYear";
    }>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    } & {
        type: z.ZodLiteral<"OtherIncome">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "OtherIncome";
    }, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "OtherIncome";
    }>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    } & {
        type: z.ZodLiteral<"ChildBenefitTransfer">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "ChildBenefitTransfer";
    }, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "ChildBenefitTransfer";
    }>]>, "many">;
    age: z.ZodOptional<z.ZodNumber>;
    attributes: z.ZodObject<{
        isPregnant: z.ZodBoolean;
        isSingleParent: z.ZodBoolean;
        hasDiseases: z.ZodBoolean;
        diseases: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        isPregnant: boolean;
        isSingleParent: boolean;
        hasDiseases: boolean;
        diseases: string[];
    }, {
        isPregnant: boolean;
        isSingleParent: boolean;
        hasDiseases: boolean;
        diseases: string[];
    }>;
} & {
    type: z.ZodLiteral<"adult">;
}, "strip", z.ZodTypeAny, {
    id: string;
    name: string;
    income: ({
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
    })[];
    age?: number | undefined;
    attributes: {
        isPregnant: boolean;
        isSingleParent: boolean;
        hasDiseases: boolean;
        diseases: string[];
    };
    type: "adult";
}, {
    id: string;
    name: string;
    income: ({
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
    })[];
    age?: number | undefined;
    attributes: {
        isPregnant: boolean;
        isSingleParent: boolean;
        hasDiseases: boolean;
        diseases: string[];
    };
    type: "adult";
}>;
declare const Child: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    income: z.ZodArray<z.ZodUnion<[z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    } & {
        type: z.ZodLiteral<"EmploymentIncome">;
        gros: z.ZodNumber;
        net: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "EmploymentIncome";
        gros: number;
        net: number;
    }, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "EmploymentIncome";
        gros: number;
        net: number;
    }>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    } & {
        type: z.ZodLiteral<"SelfEmploymentIncome">;
        gros: z.ZodNumber;
        net: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "SelfEmploymentIncome";
        gros: number;
        net: number;
    }, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "SelfEmploymentIncome";
        gros: number;
        net: number;
    }>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    } & {
        type: z.ZodLiteral<"ChildAllowance">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "ChildAllowance";
    }, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "ChildAllowance";
    }>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    } & {
        type: z.ZodLiteral<"AdvanceMaintenancePayment">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "AdvanceMaintenancePayment";
    }, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "AdvanceMaintenancePayment";
    }>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    } & {
        type: z.ZodLiteral<"Maintenance">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "Maintenance";
    }, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "Maintenance";
    }>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    } & {
        type: z.ZodLiteral<"UnemploymentBenefits">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "UnemploymentBenefits";
    }, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "UnemploymentBenefits";
    }>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    } & {
        type: z.ZodLiteral<"SicknessBenefits">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "SicknessBenefits";
    }, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "SicknessBenefits";
    }>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    } & {
        type: z.ZodLiteral<"HousingAllowance">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "HousingAllowance";
    }, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "HousingAllowance";
    }>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    } & {
        type: z.ZodLiteral<"ChildSupplement">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "ChildSupplement";
    }, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "ChildSupplement";
    }>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    } & {
        type: z.ZodLiteral<"BAfOG">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "BAfOG";
    }, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "BAfOG";
    }>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    } & {
        type: z.ZodLiteral<"ParentalAllowance">;
        parentalAllowanceType: z.ZodEnum<["normal", "plus"]>;
        claim: z.ZodNumber;
        officialAllowance: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "ParentalAllowance";
        parentalAllowanceType: "normal" | "plus";
        claim: number;
        officialAllowance: number;
    }, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "ParentalAllowance";
        parentalAllowanceType: "normal" | "plus";
        claim: number;
        officialAllowance: number;
    }>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    } & {
        type: z.ZodLiteral<"Pension">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "Pension";
    }, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "Pension";
    }>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    } & {
        type: z.ZodLiteral<"MaintenanceContributionFromMasterCraftsmen">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "MaintenanceContributionFromMasterCraftsmen";
    }, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "MaintenanceContributionFromMasterCraftsmen";
    }>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    } & {
        type: z.ZodLiteral<"ShortTimeWorkAllowance">;
        gros: z.ZodNumber;
        net: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "ShortTimeWorkAllowance";
        gros: number;
        net: number;
    }, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "ShortTimeWorkAllowance";
        gros: number;
        net: number;
    }>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    } & {
        type: z.ZodLiteral<"VocationalTrainingAllowance">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "VocationalTrainingAllowance";
    }, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "VocationalTrainingAllowance";
    }>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    } & {
        type: z.ZodLiteral<"TaxFreeSideJob">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "TaxFreeSideJob";
    }, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "TaxFreeSideJob";
    }>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    } & {
        type: z.ZodLiteral<"VoluntarySocialYear">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "VoluntarySocialYear";
    }, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "VoluntarySocialYear";
    }>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    } & {
        type: z.ZodLiteral<"OtherIncome">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "OtherIncome";
    }, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "OtherIncome";
    }>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    } & {
        type: z.ZodLiteral<"ChildBenefitTransfer">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "ChildBenefitTransfer";
    }, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "ChildBenefitTransfer";
    }>]>, "many">;
    attributes: z.ZodObject<{
        isPregnant: z.ZodBoolean;
        isSingleParent: z.ZodBoolean;
        hasDiseases: z.ZodBoolean;
        diseases: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        isPregnant: boolean;
        isSingleParent: boolean;
        hasDiseases: boolean;
        diseases: string[];
    }, {
        isPregnant: boolean;
        isSingleParent: boolean;
        hasDiseases: boolean;
        diseases: string[];
    }>;
} & {
    type: z.ZodLiteral<"child">;
    age: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: string;
    name: string;
    income: ({
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
    })[];
    attributes: {
        isPregnant: boolean;
        isSingleParent: boolean;
        hasDiseases: boolean;
        diseases: string[];
    };
    type: "child";
    age: number;
}, {
    id: string;
    name: string;
    income: ({
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
    })[];
    attributes: {
        isPregnant: boolean;
        isSingleParent: boolean;
        hasDiseases: boolean;
        diseases: string[];
    };
    type: "child";
    age: number;
}>;
declare const Person: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    income: z.ZodArray<z.ZodUnion<[z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    } & {
        type: z.ZodLiteral<"EmploymentIncome">;
        gros: z.ZodNumber;
        net: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "EmploymentIncome";
        gros: number;
        net: number;
    }, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "EmploymentIncome";
        gros: number;
        net: number;
    }>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    } & {
        type: z.ZodLiteral<"SelfEmploymentIncome">;
        gros: z.ZodNumber;
        net: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "SelfEmploymentIncome";
        gros: number;
        net: number;
    }, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "SelfEmploymentIncome";
        gros: number;
        net: number;
    }>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    } & {
        type: z.ZodLiteral<"ChildAllowance">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "ChildAllowance";
    }, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "ChildAllowance";
    }>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    } & {
        type: z.ZodLiteral<"AdvanceMaintenancePayment">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "AdvanceMaintenancePayment";
    }, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "AdvanceMaintenancePayment";
    }>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    } & {
        type: z.ZodLiteral<"Maintenance">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "Maintenance";
    }, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "Maintenance";
    }>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    } & {
        type: z.ZodLiteral<"UnemploymentBenefits">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "UnemploymentBenefits";
    }, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "UnemploymentBenefits";
    }>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    } & {
        type: z.ZodLiteral<"SicknessBenefits">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "SicknessBenefits";
    }, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "SicknessBenefits";
    }>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    } & {
        type: z.ZodLiteral<"HousingAllowance">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "HousingAllowance";
    }, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "HousingAllowance";
    }>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    } & {
        type: z.ZodLiteral<"ChildSupplement">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "ChildSupplement";
    }, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "ChildSupplement";
    }>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    } & {
        type: z.ZodLiteral<"BAfOG">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "BAfOG";
    }, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "BAfOG";
    }>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    } & {
        type: z.ZodLiteral<"ParentalAllowance">;
        parentalAllowanceType: z.ZodEnum<["normal", "plus"]>;
        claim: z.ZodNumber;
        officialAllowance: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "ParentalAllowance";
        parentalAllowanceType: "normal" | "plus";
        claim: number;
        officialAllowance: number;
    }, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "ParentalAllowance";
        parentalAllowanceType: "normal" | "plus";
        claim: number;
        officialAllowance: number;
    }>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    } & {
        type: z.ZodLiteral<"Pension">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "Pension";
    }, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "Pension";
    }>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    } & {
        type: z.ZodLiteral<"MaintenanceContributionFromMasterCraftsmen">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "MaintenanceContributionFromMasterCraftsmen";
    }, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "MaintenanceContributionFromMasterCraftsmen";
    }>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    } & {
        type: z.ZodLiteral<"ShortTimeWorkAllowance">;
        gros: z.ZodNumber;
        net: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "ShortTimeWorkAllowance";
        gros: number;
        net: number;
    }, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "ShortTimeWorkAllowance";
        gros: number;
        net: number;
    }>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    } & {
        type: z.ZodLiteral<"VocationalTrainingAllowance">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "VocationalTrainingAllowance";
    }, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "VocationalTrainingAllowance";
    }>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    } & {
        type: z.ZodLiteral<"TaxFreeSideJob">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "TaxFreeSideJob";
    }, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "TaxFreeSideJob";
    }>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    } & {
        type: z.ZodLiteral<"VoluntarySocialYear">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "VoluntarySocialYear";
    }, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "VoluntarySocialYear";
    }>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    } & {
        type: z.ZodLiteral<"OtherIncome">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "OtherIncome";
    }, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "OtherIncome";
    }>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    } & {
        type: z.ZodLiteral<"ChildBenefitTransfer">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "ChildBenefitTransfer";
    }, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "ChildBenefitTransfer";
    }>]>, "many">;
    age: z.ZodOptional<z.ZodNumber>;
    attributes: z.ZodObject<{
        isPregnant: z.ZodBoolean;
        isSingleParent: z.ZodBoolean;
        hasDiseases: z.ZodBoolean;
        diseases: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        isPregnant: boolean;
        isSingleParent: boolean;
        hasDiseases: boolean;
        diseases: string[];
    }, {
        isPregnant: boolean;
        isSingleParent: boolean;
        hasDiseases: boolean;
        diseases: string[];
    }>;
} & {
    type: z.ZodLiteral<"adult">;
}, "strip", z.ZodTypeAny, {
    id: string;
    name: string;
    income: ({
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
    })[];
    age?: number | undefined;
    attributes: {
        isPregnant: boolean;
        isSingleParent: boolean;
        hasDiseases: boolean;
        diseases: string[];
    };
    type: "adult";
}, {
    id: string;
    name: string;
    income: ({
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
    })[];
    age?: number | undefined;
    attributes: {
        isPregnant: boolean;
        isSingleParent: boolean;
        hasDiseases: boolean;
        diseases: string[];
    };
    type: "adult";
}>, z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    income: z.ZodArray<z.ZodUnion<[z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    } & {
        type: z.ZodLiteral<"EmploymentIncome">;
        gros: z.ZodNumber;
        net: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "EmploymentIncome";
        gros: number;
        net: number;
    }, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "EmploymentIncome";
        gros: number;
        net: number;
    }>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    } & {
        type: z.ZodLiteral<"SelfEmploymentIncome">;
        gros: z.ZodNumber;
        net: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "SelfEmploymentIncome";
        gros: number;
        net: number;
    }, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "SelfEmploymentIncome";
        gros: number;
        net: number;
    }>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    } & {
        type: z.ZodLiteral<"ChildAllowance">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "ChildAllowance";
    }, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "ChildAllowance";
    }>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    } & {
        type: z.ZodLiteral<"AdvanceMaintenancePayment">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "AdvanceMaintenancePayment";
    }, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "AdvanceMaintenancePayment";
    }>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    } & {
        type: z.ZodLiteral<"Maintenance">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "Maintenance";
    }, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "Maintenance";
    }>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    } & {
        type: z.ZodLiteral<"UnemploymentBenefits">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "UnemploymentBenefits";
    }, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "UnemploymentBenefits";
    }>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    } & {
        type: z.ZodLiteral<"SicknessBenefits">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "SicknessBenefits";
    }, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "SicknessBenefits";
    }>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    } & {
        type: z.ZodLiteral<"HousingAllowance">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "HousingAllowance";
    }, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "HousingAllowance";
    }>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    } & {
        type: z.ZodLiteral<"ChildSupplement">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "ChildSupplement";
    }, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "ChildSupplement";
    }>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    } & {
        type: z.ZodLiteral<"BAfOG">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "BAfOG";
    }, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "BAfOG";
    }>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    } & {
        type: z.ZodLiteral<"ParentalAllowance">;
        parentalAllowanceType: z.ZodEnum<["normal", "plus"]>;
        claim: z.ZodNumber;
        officialAllowance: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "ParentalAllowance";
        parentalAllowanceType: "normal" | "plus";
        claim: number;
        officialAllowance: number;
    }, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "ParentalAllowance";
        parentalAllowanceType: "normal" | "plus";
        claim: number;
        officialAllowance: number;
    }>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    } & {
        type: z.ZodLiteral<"Pension">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "Pension";
    }, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "Pension";
    }>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    } & {
        type: z.ZodLiteral<"MaintenanceContributionFromMasterCraftsmen">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "MaintenanceContributionFromMasterCraftsmen";
    }, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "MaintenanceContributionFromMasterCraftsmen";
    }>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    } & {
        type: z.ZodLiteral<"ShortTimeWorkAllowance">;
        gros: z.ZodNumber;
        net: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "ShortTimeWorkAllowance";
        gros: number;
        net: number;
    }, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "ShortTimeWorkAllowance";
        gros: number;
        net: number;
    }>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    } & {
        type: z.ZodLiteral<"VocationalTrainingAllowance">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "VocationalTrainingAllowance";
    }, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "VocationalTrainingAllowance";
    }>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    } & {
        type: z.ZodLiteral<"TaxFreeSideJob">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "TaxFreeSideJob";
    }, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "TaxFreeSideJob";
    }>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    } & {
        type: z.ZodLiteral<"VoluntarySocialYear">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "VoluntarySocialYear";
    }, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "VoluntarySocialYear";
    }>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    } & {
        type: z.ZodLiteral<"OtherIncome">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "OtherIncome";
    }, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "OtherIncome";
    }>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    } & {
        type: z.ZodLiteral<"ChildBenefitTransfer">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "ChildBenefitTransfer";
    }, {
        id: string;
        amount: number;
        allowance?: number | undefined;
        type: "ChildBenefitTransfer";
    }>]>, "many">;
    attributes: z.ZodObject<{
        isPregnant: z.ZodBoolean;
        isSingleParent: z.ZodBoolean;
        hasDiseases: z.ZodBoolean;
        diseases: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        isPregnant: boolean;
        isSingleParent: boolean;
        hasDiseases: boolean;
        diseases: string[];
    }, {
        isPregnant: boolean;
        isSingleParent: boolean;
        hasDiseases: boolean;
        diseases: string[];
    }>;
} & {
    type: z.ZodLiteral<"child">;
    age: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: string;
    name: string;
    income: ({
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
    })[];
    attributes: {
        isPregnant: boolean;
        isSingleParent: boolean;
        hasDiseases: boolean;
        diseases: string[];
    };
    type: "child";
    age: number;
}, {
    id: string;
    name: string;
    income: ({
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
    })[];
    attributes: {
        isPregnant: boolean;
        isSingleParent: boolean;
        hasDiseases: boolean;
        diseases: string[];
    };
    type: "child";
    age: number;
}>]>;
export declare const StepContext: z.ZodObject<{
    community: z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        income: z.ZodArray<z.ZodUnion<[z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
        } & {
            type: z.ZodLiteral<"EmploymentIncome">;
            gros: z.ZodNumber;
            net: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            id: string;
            amount: number;
            allowance?: number | undefined;
            type: "EmploymentIncome";
            gros: number;
            net: number;
        }, {
            id: string;
            amount: number;
            allowance?: number | undefined;
            type: "EmploymentIncome";
            gros: number;
            net: number;
        }>, z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
        } & {
            type: z.ZodLiteral<"SelfEmploymentIncome">;
            gros: z.ZodNumber;
            net: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            id: string;
            amount: number;
            allowance?: number | undefined;
            type: "SelfEmploymentIncome";
            gros: number;
            net: number;
        }, {
            id: string;
            amount: number;
            allowance?: number | undefined;
            type: "SelfEmploymentIncome";
            gros: number;
            net: number;
        }>, z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
        } & {
            type: z.ZodLiteral<"ChildAllowance">;
        }, "strip", z.ZodTypeAny, {
            id: string;
            amount: number;
            allowance?: number | undefined;
            type: "ChildAllowance";
        }, {
            id: string;
            amount: number;
            allowance?: number | undefined;
            type: "ChildAllowance";
        }>, z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
        } & {
            type: z.ZodLiteral<"AdvanceMaintenancePayment">;
        }, "strip", z.ZodTypeAny, {
            id: string;
            amount: number;
            allowance?: number | undefined;
            type: "AdvanceMaintenancePayment";
        }, {
            id: string;
            amount: number;
            allowance?: number | undefined;
            type: "AdvanceMaintenancePayment";
        }>, z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
        } & {
            type: z.ZodLiteral<"Maintenance">;
        }, "strip", z.ZodTypeAny, {
            id: string;
            amount: number;
            allowance?: number | undefined;
            type: "Maintenance";
        }, {
            id: string;
            amount: number;
            allowance?: number | undefined;
            type: "Maintenance";
        }>, z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
        } & {
            type: z.ZodLiteral<"UnemploymentBenefits">;
        }, "strip", z.ZodTypeAny, {
            id: string;
            amount: number;
            allowance?: number | undefined;
            type: "UnemploymentBenefits";
        }, {
            id: string;
            amount: number;
            allowance?: number | undefined;
            type: "UnemploymentBenefits";
        }>, z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
        } & {
            type: z.ZodLiteral<"SicknessBenefits">;
        }, "strip", z.ZodTypeAny, {
            id: string;
            amount: number;
            allowance?: number | undefined;
            type: "SicknessBenefits";
        }, {
            id: string;
            amount: number;
            allowance?: number | undefined;
            type: "SicknessBenefits";
        }>, z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
        } & {
            type: z.ZodLiteral<"HousingAllowance">;
        }, "strip", z.ZodTypeAny, {
            id: string;
            amount: number;
            allowance?: number | undefined;
            type: "HousingAllowance";
        }, {
            id: string;
            amount: number;
            allowance?: number | undefined;
            type: "HousingAllowance";
        }>, z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
        } & {
            type: z.ZodLiteral<"ChildSupplement">;
        }, "strip", z.ZodTypeAny, {
            id: string;
            amount: number;
            allowance?: number | undefined;
            type: "ChildSupplement";
        }, {
            id: string;
            amount: number;
            allowance?: number | undefined;
            type: "ChildSupplement";
        }>, z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
        } & {
            type: z.ZodLiteral<"BAfOG">;
        }, "strip", z.ZodTypeAny, {
            id: string;
            amount: number;
            allowance?: number | undefined;
            type: "BAfOG";
        }, {
            id: string;
            amount: number;
            allowance?: number | undefined;
            type: "BAfOG";
        }>, z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
        } & {
            type: z.ZodLiteral<"ParentalAllowance">;
            parentalAllowanceType: z.ZodEnum<["normal", "plus"]>;
            claim: z.ZodNumber;
            officialAllowance: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            id: string;
            amount: number;
            allowance?: number | undefined;
            type: "ParentalAllowance";
            parentalAllowanceType: "normal" | "plus";
            claim: number;
            officialAllowance: number;
        }, {
            id: string;
            amount: number;
            allowance?: number | undefined;
            type: "ParentalAllowance";
            parentalAllowanceType: "normal" | "plus";
            claim: number;
            officialAllowance: number;
        }>, z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
        } & {
            type: z.ZodLiteral<"Pension">;
        }, "strip", z.ZodTypeAny, {
            id: string;
            amount: number;
            allowance?: number | undefined;
            type: "Pension";
        }, {
            id: string;
            amount: number;
            allowance?: number | undefined;
            type: "Pension";
        }>, z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
        } & {
            type: z.ZodLiteral<"MaintenanceContributionFromMasterCraftsmen">;
        }, "strip", z.ZodTypeAny, {
            id: string;
            amount: number;
            allowance?: number | undefined;
            type: "MaintenanceContributionFromMasterCraftsmen";
        }, {
            id: string;
            amount: number;
            allowance?: number | undefined;
            type: "MaintenanceContributionFromMasterCraftsmen";
        }>, z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
        } & {
            type: z.ZodLiteral<"ShortTimeWorkAllowance">;
            gros: z.ZodNumber;
            net: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            id: string;
            amount: number;
            allowance?: number | undefined;
            type: "ShortTimeWorkAllowance";
            gros: number;
            net: number;
        }, {
            id: string;
            amount: number;
            allowance?: number | undefined;
            type: "ShortTimeWorkAllowance";
            gros: number;
            net: number;
        }>, z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
        } & {
            type: z.ZodLiteral<"VocationalTrainingAllowance">;
        }, "strip", z.ZodTypeAny, {
            id: string;
            amount: number;
            allowance?: number | undefined;
            type: "VocationalTrainingAllowance";
        }, {
            id: string;
            amount: number;
            allowance?: number | undefined;
            type: "VocationalTrainingAllowance";
        }>, z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
        } & {
            type: z.ZodLiteral<"TaxFreeSideJob">;
        }, "strip", z.ZodTypeAny, {
            id: string;
            amount: number;
            allowance?: number | undefined;
            type: "TaxFreeSideJob";
        }, {
            id: string;
            amount: number;
            allowance?: number | undefined;
            type: "TaxFreeSideJob";
        }>, z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
        } & {
            type: z.ZodLiteral<"VoluntarySocialYear">;
        }, "strip", z.ZodTypeAny, {
            id: string;
            amount: number;
            allowance?: number | undefined;
            type: "VoluntarySocialYear";
        }, {
            id: string;
            amount: number;
            allowance?: number | undefined;
            type: "VoluntarySocialYear";
        }>, z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
        } & {
            type: z.ZodLiteral<"OtherIncome">;
        }, "strip", z.ZodTypeAny, {
            id: string;
            amount: number;
            allowance?: number | undefined;
            type: "OtherIncome";
        }, {
            id: string;
            amount: number;
            allowance?: number | undefined;
            type: "OtherIncome";
        }>, z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
        } & {
            type: z.ZodLiteral<"ChildBenefitTransfer">;
        }, "strip", z.ZodTypeAny, {
            id: string;
            amount: number;
            allowance?: number | undefined;
            type: "ChildBenefitTransfer";
        }, {
            id: string;
            amount: number;
            allowance?: number | undefined;
            type: "ChildBenefitTransfer";
        }>]>, "many">;
        age: z.ZodOptional<z.ZodNumber>;
        attributes: z.ZodObject<{
            isPregnant: z.ZodBoolean;
            isSingleParent: z.ZodBoolean;
            hasDiseases: z.ZodBoolean;
            diseases: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            isPregnant: boolean;
            isSingleParent: boolean;
            hasDiseases: boolean;
            diseases: string[];
        }, {
            isPregnant: boolean;
            isSingleParent: boolean;
            hasDiseases: boolean;
            diseases: string[];
        }>;
    } & {
        type: z.ZodLiteral<"adult">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        name: string;
        income: ({
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
        })[];
        age?: number | undefined;
        attributes: {
            isPregnant: boolean;
            isSingleParent: boolean;
            hasDiseases: boolean;
            diseases: string[];
        };
        type: "adult";
    }, {
        id: string;
        name: string;
        income: ({
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
        })[];
        age?: number | undefined;
        attributes: {
            isPregnant: boolean;
            isSingleParent: boolean;
            hasDiseases: boolean;
            diseases: string[];
        };
        type: "adult";
    }>, z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        income: z.ZodArray<z.ZodUnion<[z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
        } & {
            type: z.ZodLiteral<"EmploymentIncome">;
            gros: z.ZodNumber;
            net: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            id: string;
            amount: number;
            allowance?: number | undefined;
            type: "EmploymentIncome";
            gros: number;
            net: number;
        }, {
            id: string;
            amount: number;
            allowance?: number | undefined;
            type: "EmploymentIncome";
            gros: number;
            net: number;
        }>, z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
        } & {
            type: z.ZodLiteral<"SelfEmploymentIncome">;
            gros: z.ZodNumber;
            net: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            id: string;
            amount: number;
            allowance?: number | undefined;
            type: "SelfEmploymentIncome";
            gros: number;
            net: number;
        }, {
            id: string;
            amount: number;
            allowance?: number | undefined;
            type: "SelfEmploymentIncome";
            gros: number;
            net: number;
        }>, z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
        } & {
            type: z.ZodLiteral<"ChildAllowance">;
        }, "strip", z.ZodTypeAny, {
            id: string;
            amount: number;
            allowance?: number | undefined;
            type: "ChildAllowance";
        }, {
            id: string;
            amount: number;
            allowance?: number | undefined;
            type: "ChildAllowance";
        }>, z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
        } & {
            type: z.ZodLiteral<"AdvanceMaintenancePayment">;
        }, "strip", z.ZodTypeAny, {
            id: string;
            amount: number;
            allowance?: number | undefined;
            type: "AdvanceMaintenancePayment";
        }, {
            id: string;
            amount: number;
            allowance?: number | undefined;
            type: "AdvanceMaintenancePayment";
        }>, z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
        } & {
            type: z.ZodLiteral<"Maintenance">;
        }, "strip", z.ZodTypeAny, {
            id: string;
            amount: number;
            allowance?: number | undefined;
            type: "Maintenance";
        }, {
            id: string;
            amount: number;
            allowance?: number | undefined;
            type: "Maintenance";
        }>, z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
        } & {
            type: z.ZodLiteral<"UnemploymentBenefits">;
        }, "strip", z.ZodTypeAny, {
            id: string;
            amount: number;
            allowance?: number | undefined;
            type: "UnemploymentBenefits";
        }, {
            id: string;
            amount: number;
            allowance?: number | undefined;
            type: "UnemploymentBenefits";
        }>, z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
        } & {
            type: z.ZodLiteral<"SicknessBenefits">;
        }, "strip", z.ZodTypeAny, {
            id: string;
            amount: number;
            allowance?: number | undefined;
            type: "SicknessBenefits";
        }, {
            id: string;
            amount: number;
            allowance?: number | undefined;
            type: "SicknessBenefits";
        }>, z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
        } & {
            type: z.ZodLiteral<"HousingAllowance">;
        }, "strip", z.ZodTypeAny, {
            id: string;
            amount: number;
            allowance?: number | undefined;
            type: "HousingAllowance";
        }, {
            id: string;
            amount: number;
            allowance?: number | undefined;
            type: "HousingAllowance";
        }>, z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
        } & {
            type: z.ZodLiteral<"ChildSupplement">;
        }, "strip", z.ZodTypeAny, {
            id: string;
            amount: number;
            allowance?: number | undefined;
            type: "ChildSupplement";
        }, {
            id: string;
            amount: number;
            allowance?: number | undefined;
            type: "ChildSupplement";
        }>, z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
        } & {
            type: z.ZodLiteral<"BAfOG">;
        }, "strip", z.ZodTypeAny, {
            id: string;
            amount: number;
            allowance?: number | undefined;
            type: "BAfOG";
        }, {
            id: string;
            amount: number;
            allowance?: number | undefined;
            type: "BAfOG";
        }>, z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
        } & {
            type: z.ZodLiteral<"ParentalAllowance">;
            parentalAllowanceType: z.ZodEnum<["normal", "plus"]>;
            claim: z.ZodNumber;
            officialAllowance: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            id: string;
            amount: number;
            allowance?: number | undefined;
            type: "ParentalAllowance";
            parentalAllowanceType: "normal" | "plus";
            claim: number;
            officialAllowance: number;
        }, {
            id: string;
            amount: number;
            allowance?: number | undefined;
            type: "ParentalAllowance";
            parentalAllowanceType: "normal" | "plus";
            claim: number;
            officialAllowance: number;
        }>, z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
        } & {
            type: z.ZodLiteral<"Pension">;
        }, "strip", z.ZodTypeAny, {
            id: string;
            amount: number;
            allowance?: number | undefined;
            type: "Pension";
        }, {
            id: string;
            amount: number;
            allowance?: number | undefined;
            type: "Pension";
        }>, z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
        } & {
            type: z.ZodLiteral<"MaintenanceContributionFromMasterCraftsmen">;
        }, "strip", z.ZodTypeAny, {
            id: string;
            amount: number;
            allowance?: number | undefined;
            type: "MaintenanceContributionFromMasterCraftsmen";
        }, {
            id: string;
            amount: number;
            allowance?: number | undefined;
            type: "MaintenanceContributionFromMasterCraftsmen";
        }>, z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
        } & {
            type: z.ZodLiteral<"ShortTimeWorkAllowance">;
            gros: z.ZodNumber;
            net: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            id: string;
            amount: number;
            allowance?: number | undefined;
            type: "ShortTimeWorkAllowance";
            gros: number;
            net: number;
        }, {
            id: string;
            amount: number;
            allowance?: number | undefined;
            type: "ShortTimeWorkAllowance";
            gros: number;
            net: number;
        }>, z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
        } & {
            type: z.ZodLiteral<"VocationalTrainingAllowance">;
        }, "strip", z.ZodTypeAny, {
            id: string;
            amount: number;
            allowance?: number | undefined;
            type: "VocationalTrainingAllowance";
        }, {
            id: string;
            amount: number;
            allowance?: number | undefined;
            type: "VocationalTrainingAllowance";
        }>, z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
        } & {
            type: z.ZodLiteral<"TaxFreeSideJob">;
        }, "strip", z.ZodTypeAny, {
            id: string;
            amount: number;
            allowance?: number | undefined;
            type: "TaxFreeSideJob";
        }, {
            id: string;
            amount: number;
            allowance?: number | undefined;
            type: "TaxFreeSideJob";
        }>, z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
        } & {
            type: z.ZodLiteral<"VoluntarySocialYear">;
        }, "strip", z.ZodTypeAny, {
            id: string;
            amount: number;
            allowance?: number | undefined;
            type: "VoluntarySocialYear";
        }, {
            id: string;
            amount: number;
            allowance?: number | undefined;
            type: "VoluntarySocialYear";
        }>, z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
        } & {
            type: z.ZodLiteral<"OtherIncome">;
        }, "strip", z.ZodTypeAny, {
            id: string;
            amount: number;
            allowance?: number | undefined;
            type: "OtherIncome";
        }, {
            id: string;
            amount: number;
            allowance?: number | undefined;
            type: "OtherIncome";
        }>, z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
        } & {
            type: z.ZodLiteral<"ChildBenefitTransfer">;
        }, "strip", z.ZodTypeAny, {
            id: string;
            amount: number;
            allowance?: number | undefined;
            type: "ChildBenefitTransfer";
        }, {
            id: string;
            amount: number;
            allowance?: number | undefined;
            type: "ChildBenefitTransfer";
        }>]>, "many">;
        attributes: z.ZodObject<{
            isPregnant: z.ZodBoolean;
            isSingleParent: z.ZodBoolean;
            hasDiseases: z.ZodBoolean;
            diseases: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            isPregnant: boolean;
            isSingleParent: boolean;
            hasDiseases: boolean;
            diseases: string[];
        }, {
            isPregnant: boolean;
            isSingleParent: boolean;
            hasDiseases: boolean;
            diseases: string[];
        }>;
    } & {
        type: z.ZodLiteral<"child">;
        age: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id: string;
        name: string;
        income: ({
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
        })[];
        attributes: {
            isPregnant: boolean;
            isSingleParent: boolean;
            hasDiseases: boolean;
            diseases: string[];
        };
        type: "child";
        age: number;
    }, {
        id: string;
        name: string;
        income: ({
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
        })[];
        attributes: {
            isPregnant: boolean;
            isSingleParent: boolean;
            hasDiseases: boolean;
            diseases: string[];
        };
        type: "child";
        age: number;
    }>]>, "many">;
    isEmployable: z.ZodBoolean;
    spendings: z.ZodObject<{
        rent: z.ZodNumber;
        utilities: z.ZodNumber;
        heating: z.ZodNumber;
        sum: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        rent: number;
        utilities: number;
        heating: number;
        sum: number;
    }, {
        rent: number;
        utilities: number;
        heating: number;
        sum: number;
    }>;
    income: z.ZodObject<{
        sum: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        sum: number;
        allowance?: number | undefined;
    }, {
        sum: number;
        allowance?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    community: ({
        id: string;
        name: string;
        income: ({
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
        })[];
        age?: number | undefined;
        attributes: {
            isPregnant: boolean;
            isSingleParent: boolean;
            hasDiseases: boolean;
            diseases: string[];
        };
        type: "adult";
    } | {
        id: string;
        name: string;
        income: ({
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
        })[];
        attributes: {
            isPregnant: boolean;
            isSingleParent: boolean;
            hasDiseases: boolean;
            diseases: string[];
        };
        type: "child";
        age: number;
    })[];
    isEmployable: boolean;
    spendings: {
        rent: number;
        utilities: number;
        heating: number;
        sum: number;
    };
    income: {
        sum: number;
        allowance?: number | undefined;
    };
}, {
    community: ({
        id: string;
        name: string;
        income: ({
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
        })[];
        age?: number | undefined;
        attributes: {
            isPregnant: boolean;
            isSingleParent: boolean;
            hasDiseases: boolean;
            diseases: string[];
        };
        type: "adult";
    } | {
        id: string;
        name: string;
        income: ({
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
        })[];
        attributes: {
            isPregnant: boolean;
            isSingleParent: boolean;
            hasDiseases: boolean;
            diseases: string[];
        };
        type: "child";
        age: number;
    })[];
    isEmployable: boolean;
    spendings: {
        rent: number;
        utilities: number;
        heating: number;
        sum: number;
    };
    income: {
        sum: number;
        allowance?: number | undefined;
    };
}>;
export declare const StepState: z.ZodObject<{
    context: z.ZodObject<{
        community: z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            income: z.ZodArray<z.ZodUnion<[z.ZodObject<{
                id: z.ZodString;
                amount: z.ZodNumber;
                allowance: z.ZodOptional<z.ZodNumber>;
            } & {
                type: z.ZodLiteral<"EmploymentIncome">;
                gros: z.ZodNumber;
                net: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                id: string;
                amount: number;
                allowance?: number | undefined;
                type: "EmploymentIncome";
                gros: number;
                net: number;
            }, {
                id: string;
                amount: number;
                allowance?: number | undefined;
                type: "EmploymentIncome";
                gros: number;
                net: number;
            }>, z.ZodObject<{
                id: z.ZodString;
                amount: z.ZodNumber;
                allowance: z.ZodOptional<z.ZodNumber>;
            } & {
                type: z.ZodLiteral<"SelfEmploymentIncome">;
                gros: z.ZodNumber;
                net: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                id: string;
                amount: number;
                allowance?: number | undefined;
                type: "SelfEmploymentIncome";
                gros: number;
                net: number;
            }, {
                id: string;
                amount: number;
                allowance?: number | undefined;
                type: "SelfEmploymentIncome";
                gros: number;
                net: number;
            }>, z.ZodObject<{
                id: z.ZodString;
                amount: z.ZodNumber;
                allowance: z.ZodOptional<z.ZodNumber>;
            } & {
                type: z.ZodLiteral<"ChildAllowance">;
            }, "strip", z.ZodTypeAny, {
                id: string;
                amount: number;
                allowance?: number | undefined;
                type: "ChildAllowance";
            }, {
                id: string;
                amount: number;
                allowance?: number | undefined;
                type: "ChildAllowance";
            }>, z.ZodObject<{
                id: z.ZodString;
                amount: z.ZodNumber;
                allowance: z.ZodOptional<z.ZodNumber>;
            } & {
                type: z.ZodLiteral<"AdvanceMaintenancePayment">;
            }, "strip", z.ZodTypeAny, {
                id: string;
                amount: number;
                allowance?: number | undefined;
                type: "AdvanceMaintenancePayment";
            }, {
                id: string;
                amount: number;
                allowance?: number | undefined;
                type: "AdvanceMaintenancePayment";
            }>, z.ZodObject<{
                id: z.ZodString;
                amount: z.ZodNumber;
                allowance: z.ZodOptional<z.ZodNumber>;
            } & {
                type: z.ZodLiteral<"Maintenance">;
            }, "strip", z.ZodTypeAny, {
                id: string;
                amount: number;
                allowance?: number | undefined;
                type: "Maintenance";
            }, {
                id: string;
                amount: number;
                allowance?: number | undefined;
                type: "Maintenance";
            }>, z.ZodObject<{
                id: z.ZodString;
                amount: z.ZodNumber;
                allowance: z.ZodOptional<z.ZodNumber>;
            } & {
                type: z.ZodLiteral<"UnemploymentBenefits">;
            }, "strip", z.ZodTypeAny, {
                id: string;
                amount: number;
                allowance?: number | undefined;
                type: "UnemploymentBenefits";
            }, {
                id: string;
                amount: number;
                allowance?: number | undefined;
                type: "UnemploymentBenefits";
            }>, z.ZodObject<{
                id: z.ZodString;
                amount: z.ZodNumber;
                allowance: z.ZodOptional<z.ZodNumber>;
            } & {
                type: z.ZodLiteral<"SicknessBenefits">;
            }, "strip", z.ZodTypeAny, {
                id: string;
                amount: number;
                allowance?: number | undefined;
                type: "SicknessBenefits";
            }, {
                id: string;
                amount: number;
                allowance?: number | undefined;
                type: "SicknessBenefits";
            }>, z.ZodObject<{
                id: z.ZodString;
                amount: z.ZodNumber;
                allowance: z.ZodOptional<z.ZodNumber>;
            } & {
                type: z.ZodLiteral<"HousingAllowance">;
            }, "strip", z.ZodTypeAny, {
                id: string;
                amount: number;
                allowance?: number | undefined;
                type: "HousingAllowance";
            }, {
                id: string;
                amount: number;
                allowance?: number | undefined;
                type: "HousingAllowance";
            }>, z.ZodObject<{
                id: z.ZodString;
                amount: z.ZodNumber;
                allowance: z.ZodOptional<z.ZodNumber>;
            } & {
                type: z.ZodLiteral<"ChildSupplement">;
            }, "strip", z.ZodTypeAny, {
                id: string;
                amount: number;
                allowance?: number | undefined;
                type: "ChildSupplement";
            }, {
                id: string;
                amount: number;
                allowance?: number | undefined;
                type: "ChildSupplement";
            }>, z.ZodObject<{
                id: z.ZodString;
                amount: z.ZodNumber;
                allowance: z.ZodOptional<z.ZodNumber>;
            } & {
                type: z.ZodLiteral<"BAfOG">;
            }, "strip", z.ZodTypeAny, {
                id: string;
                amount: number;
                allowance?: number | undefined;
                type: "BAfOG";
            }, {
                id: string;
                amount: number;
                allowance?: number | undefined;
                type: "BAfOG";
            }>, z.ZodObject<{
                id: z.ZodString;
                amount: z.ZodNumber;
                allowance: z.ZodOptional<z.ZodNumber>;
            } & {
                type: z.ZodLiteral<"ParentalAllowance">;
                parentalAllowanceType: z.ZodEnum<["normal", "plus"]>;
                claim: z.ZodNumber;
                officialAllowance: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                id: string;
                amount: number;
                allowance?: number | undefined;
                type: "ParentalAllowance";
                parentalAllowanceType: "normal" | "plus";
                claim: number;
                officialAllowance: number;
            }, {
                id: string;
                amount: number;
                allowance?: number | undefined;
                type: "ParentalAllowance";
                parentalAllowanceType: "normal" | "plus";
                claim: number;
                officialAllowance: number;
            }>, z.ZodObject<{
                id: z.ZodString;
                amount: z.ZodNumber;
                allowance: z.ZodOptional<z.ZodNumber>;
            } & {
                type: z.ZodLiteral<"Pension">;
            }, "strip", z.ZodTypeAny, {
                id: string;
                amount: number;
                allowance?: number | undefined;
                type: "Pension";
            }, {
                id: string;
                amount: number;
                allowance?: number | undefined;
                type: "Pension";
            }>, z.ZodObject<{
                id: z.ZodString;
                amount: z.ZodNumber;
                allowance: z.ZodOptional<z.ZodNumber>;
            } & {
                type: z.ZodLiteral<"MaintenanceContributionFromMasterCraftsmen">;
            }, "strip", z.ZodTypeAny, {
                id: string;
                amount: number;
                allowance?: number | undefined;
                type: "MaintenanceContributionFromMasterCraftsmen";
            }, {
                id: string;
                amount: number;
                allowance?: number | undefined;
                type: "MaintenanceContributionFromMasterCraftsmen";
            }>, z.ZodObject<{
                id: z.ZodString;
                amount: z.ZodNumber;
                allowance: z.ZodOptional<z.ZodNumber>;
            } & {
                type: z.ZodLiteral<"ShortTimeWorkAllowance">;
                gros: z.ZodNumber;
                net: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                id: string;
                amount: number;
                allowance?: number | undefined;
                type: "ShortTimeWorkAllowance";
                gros: number;
                net: number;
            }, {
                id: string;
                amount: number;
                allowance?: number | undefined;
                type: "ShortTimeWorkAllowance";
                gros: number;
                net: number;
            }>, z.ZodObject<{
                id: z.ZodString;
                amount: z.ZodNumber;
                allowance: z.ZodOptional<z.ZodNumber>;
            } & {
                type: z.ZodLiteral<"VocationalTrainingAllowance">;
            }, "strip", z.ZodTypeAny, {
                id: string;
                amount: number;
                allowance?: number | undefined;
                type: "VocationalTrainingAllowance";
            }, {
                id: string;
                amount: number;
                allowance?: number | undefined;
                type: "VocationalTrainingAllowance";
            }>, z.ZodObject<{
                id: z.ZodString;
                amount: z.ZodNumber;
                allowance: z.ZodOptional<z.ZodNumber>;
            } & {
                type: z.ZodLiteral<"TaxFreeSideJob">;
            }, "strip", z.ZodTypeAny, {
                id: string;
                amount: number;
                allowance?: number | undefined;
                type: "TaxFreeSideJob";
            }, {
                id: string;
                amount: number;
                allowance?: number | undefined;
                type: "TaxFreeSideJob";
            }>, z.ZodObject<{
                id: z.ZodString;
                amount: z.ZodNumber;
                allowance: z.ZodOptional<z.ZodNumber>;
            } & {
                type: z.ZodLiteral<"VoluntarySocialYear">;
            }, "strip", z.ZodTypeAny, {
                id: string;
                amount: number;
                allowance?: number | undefined;
                type: "VoluntarySocialYear";
            }, {
                id: string;
                amount: number;
                allowance?: number | undefined;
                type: "VoluntarySocialYear";
            }>, z.ZodObject<{
                id: z.ZodString;
                amount: z.ZodNumber;
                allowance: z.ZodOptional<z.ZodNumber>;
            } & {
                type: z.ZodLiteral<"OtherIncome">;
            }, "strip", z.ZodTypeAny, {
                id: string;
                amount: number;
                allowance?: number | undefined;
                type: "OtherIncome";
            }, {
                id: string;
                amount: number;
                allowance?: number | undefined;
                type: "OtherIncome";
            }>, z.ZodObject<{
                id: z.ZodString;
                amount: z.ZodNumber;
                allowance: z.ZodOptional<z.ZodNumber>;
            } & {
                type: z.ZodLiteral<"ChildBenefitTransfer">;
            }, "strip", z.ZodTypeAny, {
                id: string;
                amount: number;
                allowance?: number | undefined;
                type: "ChildBenefitTransfer";
            }, {
                id: string;
                amount: number;
                allowance?: number | undefined;
                type: "ChildBenefitTransfer";
            }>]>, "many">;
            age: z.ZodOptional<z.ZodNumber>;
            attributes: z.ZodObject<{
                isPregnant: z.ZodBoolean;
                isSingleParent: z.ZodBoolean;
                hasDiseases: z.ZodBoolean;
                diseases: z.ZodArray<z.ZodString, "many">;
            }, "strip", z.ZodTypeAny, {
                isPregnant: boolean;
                isSingleParent: boolean;
                hasDiseases: boolean;
                diseases: string[];
            }, {
                isPregnant: boolean;
                isSingleParent: boolean;
                hasDiseases: boolean;
                diseases: string[];
            }>;
        } & {
            type: z.ZodLiteral<"adult">;
        }, "strip", z.ZodTypeAny, {
            id: string;
            name: string;
            income: ({
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
            })[];
            age?: number | undefined;
            attributes: {
                isPregnant: boolean;
                isSingleParent: boolean;
                hasDiseases: boolean;
                diseases: string[];
            };
            type: "adult";
        }, {
            id: string;
            name: string;
            income: ({
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
            })[];
            age?: number | undefined;
            attributes: {
                isPregnant: boolean;
                isSingleParent: boolean;
                hasDiseases: boolean;
                diseases: string[];
            };
            type: "adult";
        }>, z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            income: z.ZodArray<z.ZodUnion<[z.ZodObject<{
                id: z.ZodString;
                amount: z.ZodNumber;
                allowance: z.ZodOptional<z.ZodNumber>;
            } & {
                type: z.ZodLiteral<"EmploymentIncome">;
                gros: z.ZodNumber;
                net: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                id: string;
                amount: number;
                allowance?: number | undefined;
                type: "EmploymentIncome";
                gros: number;
                net: number;
            }, {
                id: string;
                amount: number;
                allowance?: number | undefined;
                type: "EmploymentIncome";
                gros: number;
                net: number;
            }>, z.ZodObject<{
                id: z.ZodString;
                amount: z.ZodNumber;
                allowance: z.ZodOptional<z.ZodNumber>;
            } & {
                type: z.ZodLiteral<"SelfEmploymentIncome">;
                gros: z.ZodNumber;
                net: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                id: string;
                amount: number;
                allowance?: number | undefined;
                type: "SelfEmploymentIncome";
                gros: number;
                net: number;
            }, {
                id: string;
                amount: number;
                allowance?: number | undefined;
                type: "SelfEmploymentIncome";
                gros: number;
                net: number;
            }>, z.ZodObject<{
                id: z.ZodString;
                amount: z.ZodNumber;
                allowance: z.ZodOptional<z.ZodNumber>;
            } & {
                type: z.ZodLiteral<"ChildAllowance">;
            }, "strip", z.ZodTypeAny, {
                id: string;
                amount: number;
                allowance?: number | undefined;
                type: "ChildAllowance";
            }, {
                id: string;
                amount: number;
                allowance?: number | undefined;
                type: "ChildAllowance";
            }>, z.ZodObject<{
                id: z.ZodString;
                amount: z.ZodNumber;
                allowance: z.ZodOptional<z.ZodNumber>;
            } & {
                type: z.ZodLiteral<"AdvanceMaintenancePayment">;
            }, "strip", z.ZodTypeAny, {
                id: string;
                amount: number;
                allowance?: number | undefined;
                type: "AdvanceMaintenancePayment";
            }, {
                id: string;
                amount: number;
                allowance?: number | undefined;
                type: "AdvanceMaintenancePayment";
            }>, z.ZodObject<{
                id: z.ZodString;
                amount: z.ZodNumber;
                allowance: z.ZodOptional<z.ZodNumber>;
            } & {
                type: z.ZodLiteral<"Maintenance">;
            }, "strip", z.ZodTypeAny, {
                id: string;
                amount: number;
                allowance?: number | undefined;
                type: "Maintenance";
            }, {
                id: string;
                amount: number;
                allowance?: number | undefined;
                type: "Maintenance";
            }>, z.ZodObject<{
                id: z.ZodString;
                amount: z.ZodNumber;
                allowance: z.ZodOptional<z.ZodNumber>;
            } & {
                type: z.ZodLiteral<"UnemploymentBenefits">;
            }, "strip", z.ZodTypeAny, {
                id: string;
                amount: number;
                allowance?: number | undefined;
                type: "UnemploymentBenefits";
            }, {
                id: string;
                amount: number;
                allowance?: number | undefined;
                type: "UnemploymentBenefits";
            }>, z.ZodObject<{
                id: z.ZodString;
                amount: z.ZodNumber;
                allowance: z.ZodOptional<z.ZodNumber>;
            } & {
                type: z.ZodLiteral<"SicknessBenefits">;
            }, "strip", z.ZodTypeAny, {
                id: string;
                amount: number;
                allowance?: number | undefined;
                type: "SicknessBenefits";
            }, {
                id: string;
                amount: number;
                allowance?: number | undefined;
                type: "SicknessBenefits";
            }>, z.ZodObject<{
                id: z.ZodString;
                amount: z.ZodNumber;
                allowance: z.ZodOptional<z.ZodNumber>;
            } & {
                type: z.ZodLiteral<"HousingAllowance">;
            }, "strip", z.ZodTypeAny, {
                id: string;
                amount: number;
                allowance?: number | undefined;
                type: "HousingAllowance";
            }, {
                id: string;
                amount: number;
                allowance?: number | undefined;
                type: "HousingAllowance";
            }>, z.ZodObject<{
                id: z.ZodString;
                amount: z.ZodNumber;
                allowance: z.ZodOptional<z.ZodNumber>;
            } & {
                type: z.ZodLiteral<"ChildSupplement">;
            }, "strip", z.ZodTypeAny, {
                id: string;
                amount: number;
                allowance?: number | undefined;
                type: "ChildSupplement";
            }, {
                id: string;
                amount: number;
                allowance?: number | undefined;
                type: "ChildSupplement";
            }>, z.ZodObject<{
                id: z.ZodString;
                amount: z.ZodNumber;
                allowance: z.ZodOptional<z.ZodNumber>;
            } & {
                type: z.ZodLiteral<"BAfOG">;
            }, "strip", z.ZodTypeAny, {
                id: string;
                amount: number;
                allowance?: number | undefined;
                type: "BAfOG";
            }, {
                id: string;
                amount: number;
                allowance?: number | undefined;
                type: "BAfOG";
            }>, z.ZodObject<{
                id: z.ZodString;
                amount: z.ZodNumber;
                allowance: z.ZodOptional<z.ZodNumber>;
            } & {
                type: z.ZodLiteral<"ParentalAllowance">;
                parentalAllowanceType: z.ZodEnum<["normal", "plus"]>;
                claim: z.ZodNumber;
                officialAllowance: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                id: string;
                amount: number;
                allowance?: number | undefined;
                type: "ParentalAllowance";
                parentalAllowanceType: "normal" | "plus";
                claim: number;
                officialAllowance: number;
            }, {
                id: string;
                amount: number;
                allowance?: number | undefined;
                type: "ParentalAllowance";
                parentalAllowanceType: "normal" | "plus";
                claim: number;
                officialAllowance: number;
            }>, z.ZodObject<{
                id: z.ZodString;
                amount: z.ZodNumber;
                allowance: z.ZodOptional<z.ZodNumber>;
            } & {
                type: z.ZodLiteral<"Pension">;
            }, "strip", z.ZodTypeAny, {
                id: string;
                amount: number;
                allowance?: number | undefined;
                type: "Pension";
            }, {
                id: string;
                amount: number;
                allowance?: number | undefined;
                type: "Pension";
            }>, z.ZodObject<{
                id: z.ZodString;
                amount: z.ZodNumber;
                allowance: z.ZodOptional<z.ZodNumber>;
            } & {
                type: z.ZodLiteral<"MaintenanceContributionFromMasterCraftsmen">;
            }, "strip", z.ZodTypeAny, {
                id: string;
                amount: number;
                allowance?: number | undefined;
                type: "MaintenanceContributionFromMasterCraftsmen";
            }, {
                id: string;
                amount: number;
                allowance?: number | undefined;
                type: "MaintenanceContributionFromMasterCraftsmen";
            }>, z.ZodObject<{
                id: z.ZodString;
                amount: z.ZodNumber;
                allowance: z.ZodOptional<z.ZodNumber>;
            } & {
                type: z.ZodLiteral<"ShortTimeWorkAllowance">;
                gros: z.ZodNumber;
                net: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                id: string;
                amount: number;
                allowance?: number | undefined;
                type: "ShortTimeWorkAllowance";
                gros: number;
                net: number;
            }, {
                id: string;
                amount: number;
                allowance?: number | undefined;
                type: "ShortTimeWorkAllowance";
                gros: number;
                net: number;
            }>, z.ZodObject<{
                id: z.ZodString;
                amount: z.ZodNumber;
                allowance: z.ZodOptional<z.ZodNumber>;
            } & {
                type: z.ZodLiteral<"VocationalTrainingAllowance">;
            }, "strip", z.ZodTypeAny, {
                id: string;
                amount: number;
                allowance?: number | undefined;
                type: "VocationalTrainingAllowance";
            }, {
                id: string;
                amount: number;
                allowance?: number | undefined;
                type: "VocationalTrainingAllowance";
            }>, z.ZodObject<{
                id: z.ZodString;
                amount: z.ZodNumber;
                allowance: z.ZodOptional<z.ZodNumber>;
            } & {
                type: z.ZodLiteral<"TaxFreeSideJob">;
            }, "strip", z.ZodTypeAny, {
                id: string;
                amount: number;
                allowance?: number | undefined;
                type: "TaxFreeSideJob";
            }, {
                id: string;
                amount: number;
                allowance?: number | undefined;
                type: "TaxFreeSideJob";
            }>, z.ZodObject<{
                id: z.ZodString;
                amount: z.ZodNumber;
                allowance: z.ZodOptional<z.ZodNumber>;
            } & {
                type: z.ZodLiteral<"VoluntarySocialYear">;
            }, "strip", z.ZodTypeAny, {
                id: string;
                amount: number;
                allowance?: number | undefined;
                type: "VoluntarySocialYear";
            }, {
                id: string;
                amount: number;
                allowance?: number | undefined;
                type: "VoluntarySocialYear";
            }>, z.ZodObject<{
                id: z.ZodString;
                amount: z.ZodNumber;
                allowance: z.ZodOptional<z.ZodNumber>;
            } & {
                type: z.ZodLiteral<"OtherIncome">;
            }, "strip", z.ZodTypeAny, {
                id: string;
                amount: number;
                allowance?: number | undefined;
                type: "OtherIncome";
            }, {
                id: string;
                amount: number;
                allowance?: number | undefined;
                type: "OtherIncome";
            }>, z.ZodObject<{
                id: z.ZodString;
                amount: z.ZodNumber;
                allowance: z.ZodOptional<z.ZodNumber>;
            } & {
                type: z.ZodLiteral<"ChildBenefitTransfer">;
            }, "strip", z.ZodTypeAny, {
                id: string;
                amount: number;
                allowance?: number | undefined;
                type: "ChildBenefitTransfer";
            }, {
                id: string;
                amount: number;
                allowance?: number | undefined;
                type: "ChildBenefitTransfer";
            }>]>, "many">;
            attributes: z.ZodObject<{
                isPregnant: z.ZodBoolean;
                isSingleParent: z.ZodBoolean;
                hasDiseases: z.ZodBoolean;
                diseases: z.ZodArray<z.ZodString, "many">;
            }, "strip", z.ZodTypeAny, {
                isPregnant: boolean;
                isSingleParent: boolean;
                hasDiseases: boolean;
                diseases: string[];
            }, {
                isPregnant: boolean;
                isSingleParent: boolean;
                hasDiseases: boolean;
                diseases: string[];
            }>;
        } & {
            type: z.ZodLiteral<"child">;
            age: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            id: string;
            name: string;
            income: ({
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
            })[];
            attributes: {
                isPregnant: boolean;
                isSingleParent: boolean;
                hasDiseases: boolean;
                diseases: string[];
            };
            type: "child";
            age: number;
        }, {
            id: string;
            name: string;
            income: ({
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
            })[];
            attributes: {
                isPregnant: boolean;
                isSingleParent: boolean;
                hasDiseases: boolean;
                diseases: string[];
            };
            type: "child";
            age: number;
        }>]>, "many">;
        isEmployable: z.ZodBoolean;
        spendings: z.ZodObject<{
            rent: z.ZodNumber;
            utilities: z.ZodNumber;
            heating: z.ZodNumber;
            sum: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            rent: number;
            utilities: number;
            heating: number;
            sum: number;
        }, {
            rent: number;
            utilities: number;
            heating: number;
            sum: number;
        }>;
        income: z.ZodObject<{
            sum: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            sum: number;
            allowance?: number | undefined;
        }, {
            sum: number;
            allowance?: number | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        community: ({
            id: string;
            name: string;
            income: ({
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
            })[];
            age?: number | undefined;
            attributes: {
                isPregnant: boolean;
                isSingleParent: boolean;
                hasDiseases: boolean;
                diseases: string[];
            };
            type: "adult";
        } | {
            id: string;
            name: string;
            income: ({
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
            })[];
            attributes: {
                isPregnant: boolean;
                isSingleParent: boolean;
                hasDiseases: boolean;
                diseases: string[];
            };
            type: "child";
            age: number;
        })[];
        isEmployable: boolean;
        spendings: {
            rent: number;
            utilities: number;
            heating: number;
            sum: number;
        };
        income: {
            sum: number;
            allowance?: number | undefined;
        };
    }, {
        community: ({
            id: string;
            name: string;
            income: ({
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
            })[];
            age?: number | undefined;
            attributes: {
                isPregnant: boolean;
                isSingleParent: boolean;
                hasDiseases: boolean;
                diseases: string[];
            };
            type: "adult";
        } | {
            id: string;
            name: string;
            income: ({
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
            })[];
            attributes: {
                isPregnant: boolean;
                isSingleParent: boolean;
                hasDiseases: boolean;
                diseases: string[];
            };
            type: "child";
            age: number;
        })[];
        isEmployable: boolean;
        spendings: {
            rent: number;
            utilities: number;
            heating: number;
            sum: number;
        };
        income: {
            sum: number;
            allowance?: number | undefined;
        };
    }>;
    currentStep: z.ZodNumber;
    step: z.ZodAny;
}, "strip", z.ZodTypeAny, {
    context: {
        community: ({
            id: string;
            name: string;
            income: ({
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
            })[];
            age?: number | undefined;
            attributes: {
                isPregnant: boolean;
                isSingleParent: boolean;
                hasDiseases: boolean;
                diseases: string[];
            };
            type: "adult";
        } | {
            id: string;
            name: string;
            income: ({
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
            })[];
            attributes: {
                isPregnant: boolean;
                isSingleParent: boolean;
                hasDiseases: boolean;
                diseases: string[];
            };
            type: "child";
            age: number;
        })[];
        isEmployable: boolean;
        spendings: {
            rent: number;
            utilities: number;
            heating: number;
            sum: number;
        };
        income: {
            sum: number;
            allowance?: number | undefined;
        };
    };
    currentStep: number;
    step?: any;
}, {
    context: {
        community: ({
            id: string;
            name: string;
            income: ({
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
            })[];
            age?: number | undefined;
            attributes: {
                isPregnant: boolean;
                isSingleParent: boolean;
                hasDiseases: boolean;
                diseases: string[];
            };
            type: "adult";
        } | {
            id: string;
            name: string;
            income: ({
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
            })[];
            attributes: {
                isPregnant: boolean;
                isSingleParent: boolean;
                hasDiseases: boolean;
                diseases: string[];
            };
            type: "child";
            age: number;
        })[];
        isEmployable: boolean;
        spendings: {
            rent: number;
            utilities: number;
            heating: number;
            sum: number;
        };
        income: {
            sum: number;
            allowance?: number | undefined;
        };
    };
    currentStep: number;
    step?: any;
}>;
export type TStepContext = z.infer<typeof StepContext>;
export type TPerson = z.infer<typeof Person>;
export type TChild = z.infer<typeof Child>;
export type TAdult = z.infer<typeof Adult>;
export type TIncome = z.infer<typeof Person>["income"][0];
export type TStepsState = {
    context: TStepContext;
    step: TStep;
    currentStep: number;
};
type RecursivePartial<T> = {
    [P in keyof T]?: RecursivePartial<T[P]>;
};
export type TAction = {
    state?: RecursivePartial<TStepsState>;
    type: "next" | "previous" | "load";
};
export declare const incomeType: {
    [key in TIncomeType]: {
        label: string;
        standardAmount?: number;
    };
};
export type TAllowance = TIncomeType | "insurance" | "income" | "baseDeduction";
export declare const allowanceType: {
    [key in TAllowance]: {
        label: string;
        standardAmount?: number;
    };
};
export {};
