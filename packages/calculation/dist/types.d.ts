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
export declare const IncomeTypEnum: z.ZodEnum<{
    AdvanceMaintenancePayment: "AdvanceMaintenancePayment";
    BAfOG: "BAfOG";
    ChildAllowance: "ChildAllowance";
    ChildBenefitTransfer: "ChildBenefitTransfer";
    ChildSupplement: "ChildSupplement";
    EmploymentIncome: "EmploymentIncome";
    HousingAllowance: "HousingAllowance";
    Maintenance: "Maintenance";
    MaintenanceContributionFromMasterCraftsmen: "MaintenanceContributionFromMasterCraftsmen";
    OtherIncome: "OtherIncome";
    ParentalAllowance: "ParentalAllowance";
    Pension: "Pension";
    SelfEmploymentIncome: "SelfEmploymentIncome";
    ShortTimeWorkAllowance: "ShortTimeWorkAllowance";
    SicknessBenefits: "SicknessBenefits";
    TaxFreeSideJob: "TaxFreeSideJob";
    UnemploymentBenefits: "UnemploymentBenefits";
    VocationalTrainingAllowance: "VocationalTrainingAllowance";
    VoluntarySocialYear: "VoluntarySocialYear";
}>;
export type TIncomeType = z.infer<typeof IncomeTypEnum>;
export declare const IncomeBaseSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodEnum<{
        AdvanceMaintenancePayment: "AdvanceMaintenancePayment";
        BAfOG: "BAfOG";
        ChildAllowance: "ChildAllowance";
        ChildBenefitTransfer: "ChildBenefitTransfer";
        ChildSupplement: "ChildSupplement";
        EmploymentIncome: "EmploymentIncome";
        HousingAllowance: "HousingAllowance";
        Maintenance: "Maintenance";
        MaintenanceContributionFromMasterCraftsmen: "MaintenanceContributionFromMasterCraftsmen";
        OtherIncome: "OtherIncome";
        ParentalAllowance: "ParentalAllowance";
        Pension: "Pension";
        SelfEmploymentIncome: "SelfEmploymentIncome";
        ShortTimeWorkAllowance: "ShortTimeWorkAllowance";
        SicknessBenefits: "SicknessBenefits";
        TaxFreeSideJob: "TaxFreeSideJob";
        UnemploymentBenefits: "UnemploymentBenefits";
        VocationalTrainingAllowance: "VocationalTrainingAllowance";
        VoluntarySocialYear: "VoluntarySocialYear";
    }>;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export declare const EmploymentIncomeSchema: z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
    type: z.ZodLiteral<"EmploymentIncome">;
    gros: z.ZodNumber;
    net: z.ZodNumber;
}, z.core.$strip>;
export declare const SelfEmploymentIncomeSchema: z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
    type: z.ZodLiteral<"SelfEmploymentIncome">;
    gros: z.ZodNumber;
    net: z.ZodNumber;
}, z.core.$strip>;
export declare const ChildAllowanceSchema: z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
    type: z.ZodLiteral<"ChildAllowance">;
}, z.core.$strip>;
export declare const AdvanceMaintenancePaymentSchema: z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
    type: z.ZodLiteral<"AdvanceMaintenancePayment">;
}, z.core.$strip>;
export declare const MaintenanceSchema: z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
    type: z.ZodLiteral<"Maintenance">;
}, z.core.$strip>;
export declare const UnemploymentBenefitsSchema: z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
    type: z.ZodLiteral<"UnemploymentBenefits">;
}, z.core.$strip>;
export declare const SicknessBenefitsSchema: z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
    type: z.ZodLiteral<"SicknessBenefits">;
}, z.core.$strip>;
export declare const HousingAllowanceSchema: z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
    type: z.ZodLiteral<"HousingAllowance">;
}, z.core.$strip>;
export declare const ChildSupplementSchema: z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
    type: z.ZodLiteral<"ChildSupplement">;
}, z.core.$strip>;
export declare const BAfOGSchema: z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
    type: z.ZodLiteral<"BAfOG">;
}, z.core.$strip>;
export declare const ParentalAllowanceSchema: z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
    type: z.ZodLiteral<"ParentalAllowance">;
    parentalAllowanceType: z.ZodEnum<{
        normal: "normal";
        plus: "plus";
    }>;
    claim: z.ZodNumber;
    officialAllowance: z.ZodNumber;
}, z.core.$strip>;
export declare const PensionSchema: z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
    type: z.ZodLiteral<"Pension">;
}, z.core.$strip>;
export declare const MaintenanceContributionFromMasterCraftsmenSchema: z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
    type: z.ZodLiteral<"MaintenanceContributionFromMasterCraftsmen">;
}, z.core.$strip>;
export declare const ShortTimeWorkAllowanceSchema: z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
    type: z.ZodLiteral<"ShortTimeWorkAllowance">;
    gros: z.ZodNumber;
    net: z.ZodNumber;
}, z.core.$strip>;
export declare const VocationalTrainingAllowanceSchema: z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
    type: z.ZodLiteral<"VocationalTrainingAllowance">;
}, z.core.$strip>;
export declare const TaxFreeSideJobSchema: z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
    type: z.ZodLiteral<"TaxFreeSideJob">;
}, z.core.$strip>;
export declare const VoluntarySocialYearSchema: z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
    type: z.ZodLiteral<"VoluntarySocialYear">;
}, z.core.$strip>;
export declare const OtherIncomeSchema: z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
    type: z.ZodLiteral<"OtherIncome">;
}, z.core.$strip>;
export declare const ChildBenefitTransferSchema: z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
    type: z.ZodLiteral<"ChildBenefitTransfer">;
}, z.core.$strip>;
export declare const ExtendedIncomeSchema: z.ZodUnion<readonly [z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
    type: z.ZodLiteral<"EmploymentIncome">;
    gros: z.ZodNumber;
    net: z.ZodNumber;
}, z.core.$strip>, z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
    type: z.ZodLiteral<"SelfEmploymentIncome">;
    gros: z.ZodNumber;
    net: z.ZodNumber;
}, z.core.$strip>, z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
    type: z.ZodLiteral<"ChildAllowance">;
}, z.core.$strip>, z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
    type: z.ZodLiteral<"AdvanceMaintenancePayment">;
}, z.core.$strip>, z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
    type: z.ZodLiteral<"Maintenance">;
}, z.core.$strip>, z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
    type: z.ZodLiteral<"UnemploymentBenefits">;
}, z.core.$strip>, z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
    type: z.ZodLiteral<"SicknessBenefits">;
}, z.core.$strip>, z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
    type: z.ZodLiteral<"HousingAllowance">;
}, z.core.$strip>, z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
    type: z.ZodLiteral<"ChildSupplement">;
}, z.core.$strip>, z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
    type: z.ZodLiteral<"BAfOG">;
}, z.core.$strip>, z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
    type: z.ZodLiteral<"ParentalAllowance">;
    parentalAllowanceType: z.ZodEnum<{
        normal: "normal";
        plus: "plus";
    }>;
    claim: z.ZodNumber;
    officialAllowance: z.ZodNumber;
}, z.core.$strip>, z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
    type: z.ZodLiteral<"Pension">;
}, z.core.$strip>, z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
    type: z.ZodLiteral<"MaintenanceContributionFromMasterCraftsmen">;
}, z.core.$strip>, z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
    type: z.ZodLiteral<"ShortTimeWorkAllowance">;
    gros: z.ZodNumber;
    net: z.ZodNumber;
}, z.core.$strip>, z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
    type: z.ZodLiteral<"VocationalTrainingAllowance">;
}, z.core.$strip>, z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
    type: z.ZodLiteral<"TaxFreeSideJob">;
}, z.core.$strip>, z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
    type: z.ZodLiteral<"VoluntarySocialYear">;
}, z.core.$strip>, z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
    type: z.ZodLiteral<"OtherIncome">;
}, z.core.$strip>, z.ZodObject<{
    id: z.ZodString;
    amount: z.ZodNumber;
    allowance: z.ZodOptional<z.ZodNumber>;
    type: z.ZodLiteral<"ChildBenefitTransfer">;
}, z.core.$strip>]>;
declare const Adult: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    income: z.ZodArray<z.ZodUnion<readonly [z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"EmploymentIncome">;
        gros: z.ZodNumber;
        net: z.ZodNumber;
    }, z.core.$strip>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"SelfEmploymentIncome">;
        gros: z.ZodNumber;
        net: z.ZodNumber;
    }, z.core.$strip>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"ChildAllowance">;
    }, z.core.$strip>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"AdvanceMaintenancePayment">;
    }, z.core.$strip>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"Maintenance">;
    }, z.core.$strip>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"UnemploymentBenefits">;
    }, z.core.$strip>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"SicknessBenefits">;
    }, z.core.$strip>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"HousingAllowance">;
    }, z.core.$strip>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"ChildSupplement">;
    }, z.core.$strip>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"BAfOG">;
    }, z.core.$strip>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"ParentalAllowance">;
        parentalAllowanceType: z.ZodEnum<{
            normal: "normal";
            plus: "plus";
        }>;
        claim: z.ZodNumber;
        officialAllowance: z.ZodNumber;
    }, z.core.$strip>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"Pension">;
    }, z.core.$strip>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"MaintenanceContributionFromMasterCraftsmen">;
    }, z.core.$strip>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"ShortTimeWorkAllowance">;
        gros: z.ZodNumber;
        net: z.ZodNumber;
    }, z.core.$strip>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"VocationalTrainingAllowance">;
    }, z.core.$strip>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"TaxFreeSideJob">;
    }, z.core.$strip>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"VoluntarySocialYear">;
    }, z.core.$strip>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"OtherIncome">;
    }, z.core.$strip>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"ChildBenefitTransfer">;
    }, z.core.$strip>]>>;
    age: z.ZodOptional<z.ZodNumber>;
    attributes: z.ZodObject<{
        isPregnant: z.ZodBoolean;
        isSingleParent: z.ZodBoolean;
        hasDiseases: z.ZodBoolean;
        diseases: z.ZodArray<z.ZodString>;
    }, z.core.$strip>;
    type: z.ZodLiteral<"adult">;
}, z.core.$strip>;
declare const Child: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    income: z.ZodArray<z.ZodUnion<readonly [z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"EmploymentIncome">;
        gros: z.ZodNumber;
        net: z.ZodNumber;
    }, z.core.$strip>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"SelfEmploymentIncome">;
        gros: z.ZodNumber;
        net: z.ZodNumber;
    }, z.core.$strip>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"ChildAllowance">;
    }, z.core.$strip>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"AdvanceMaintenancePayment">;
    }, z.core.$strip>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"Maintenance">;
    }, z.core.$strip>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"UnemploymentBenefits">;
    }, z.core.$strip>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"SicknessBenefits">;
    }, z.core.$strip>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"HousingAllowance">;
    }, z.core.$strip>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"ChildSupplement">;
    }, z.core.$strip>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"BAfOG">;
    }, z.core.$strip>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"ParentalAllowance">;
        parentalAllowanceType: z.ZodEnum<{
            normal: "normal";
            plus: "plus";
        }>;
        claim: z.ZodNumber;
        officialAllowance: z.ZodNumber;
    }, z.core.$strip>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"Pension">;
    }, z.core.$strip>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"MaintenanceContributionFromMasterCraftsmen">;
    }, z.core.$strip>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"ShortTimeWorkAllowance">;
        gros: z.ZodNumber;
        net: z.ZodNumber;
    }, z.core.$strip>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"VocationalTrainingAllowance">;
    }, z.core.$strip>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"TaxFreeSideJob">;
    }, z.core.$strip>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"VoluntarySocialYear">;
    }, z.core.$strip>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"OtherIncome">;
    }, z.core.$strip>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"ChildBenefitTransfer">;
    }, z.core.$strip>]>>;
    attributes: z.ZodObject<{
        isPregnant: z.ZodBoolean;
        isSingleParent: z.ZodBoolean;
        hasDiseases: z.ZodBoolean;
        diseases: z.ZodArray<z.ZodString>;
    }, z.core.$strip>;
    type: z.ZodLiteral<"child">;
    age: z.ZodNumber;
}, z.core.$strip>;
declare const Person: z.ZodDiscriminatedUnion<[z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    income: z.ZodArray<z.ZodUnion<readonly [z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"EmploymentIncome">;
        gros: z.ZodNumber;
        net: z.ZodNumber;
    }, z.core.$strip>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"SelfEmploymentIncome">;
        gros: z.ZodNumber;
        net: z.ZodNumber;
    }, z.core.$strip>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"ChildAllowance">;
    }, z.core.$strip>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"AdvanceMaintenancePayment">;
    }, z.core.$strip>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"Maintenance">;
    }, z.core.$strip>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"UnemploymentBenefits">;
    }, z.core.$strip>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"SicknessBenefits">;
    }, z.core.$strip>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"HousingAllowance">;
    }, z.core.$strip>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"ChildSupplement">;
    }, z.core.$strip>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"BAfOG">;
    }, z.core.$strip>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"ParentalAllowance">;
        parentalAllowanceType: z.ZodEnum<{
            normal: "normal";
            plus: "plus";
        }>;
        claim: z.ZodNumber;
        officialAllowance: z.ZodNumber;
    }, z.core.$strip>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"Pension">;
    }, z.core.$strip>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"MaintenanceContributionFromMasterCraftsmen">;
    }, z.core.$strip>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"ShortTimeWorkAllowance">;
        gros: z.ZodNumber;
        net: z.ZodNumber;
    }, z.core.$strip>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"VocationalTrainingAllowance">;
    }, z.core.$strip>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"TaxFreeSideJob">;
    }, z.core.$strip>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"VoluntarySocialYear">;
    }, z.core.$strip>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"OtherIncome">;
    }, z.core.$strip>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"ChildBenefitTransfer">;
    }, z.core.$strip>]>>;
    age: z.ZodOptional<z.ZodNumber>;
    attributes: z.ZodObject<{
        isPregnant: z.ZodBoolean;
        isSingleParent: z.ZodBoolean;
        hasDiseases: z.ZodBoolean;
        diseases: z.ZodArray<z.ZodString>;
    }, z.core.$strip>;
    type: z.ZodLiteral<"adult">;
}, z.core.$strip>, z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    income: z.ZodArray<z.ZodUnion<readonly [z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"EmploymentIncome">;
        gros: z.ZodNumber;
        net: z.ZodNumber;
    }, z.core.$strip>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"SelfEmploymentIncome">;
        gros: z.ZodNumber;
        net: z.ZodNumber;
    }, z.core.$strip>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"ChildAllowance">;
    }, z.core.$strip>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"AdvanceMaintenancePayment">;
    }, z.core.$strip>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"Maintenance">;
    }, z.core.$strip>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"UnemploymentBenefits">;
    }, z.core.$strip>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"SicknessBenefits">;
    }, z.core.$strip>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"HousingAllowance">;
    }, z.core.$strip>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"ChildSupplement">;
    }, z.core.$strip>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"BAfOG">;
    }, z.core.$strip>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"ParentalAllowance">;
        parentalAllowanceType: z.ZodEnum<{
            normal: "normal";
            plus: "plus";
        }>;
        claim: z.ZodNumber;
        officialAllowance: z.ZodNumber;
    }, z.core.$strip>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"Pension">;
    }, z.core.$strip>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"MaintenanceContributionFromMasterCraftsmen">;
    }, z.core.$strip>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"ShortTimeWorkAllowance">;
        gros: z.ZodNumber;
        net: z.ZodNumber;
    }, z.core.$strip>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"VocationalTrainingAllowance">;
    }, z.core.$strip>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"TaxFreeSideJob">;
    }, z.core.$strip>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"VoluntarySocialYear">;
    }, z.core.$strip>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"OtherIncome">;
    }, z.core.$strip>, z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
        type: z.ZodLiteral<"ChildBenefitTransfer">;
    }, z.core.$strip>]>>;
    attributes: z.ZodObject<{
        isPregnant: z.ZodBoolean;
        isSingleParent: z.ZodBoolean;
        hasDiseases: z.ZodBoolean;
        diseases: z.ZodArray<z.ZodString>;
    }, z.core.$strip>;
    type: z.ZodLiteral<"child">;
    age: z.ZodNumber;
}, z.core.$strip>], "type">;
export declare const StepContext: z.ZodObject<{
    community: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        income: z.ZodArray<z.ZodUnion<readonly [z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
            type: z.ZodLiteral<"EmploymentIncome">;
            gros: z.ZodNumber;
            net: z.ZodNumber;
        }, z.core.$strip>, z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
            type: z.ZodLiteral<"SelfEmploymentIncome">;
            gros: z.ZodNumber;
            net: z.ZodNumber;
        }, z.core.$strip>, z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
            type: z.ZodLiteral<"ChildAllowance">;
        }, z.core.$strip>, z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
            type: z.ZodLiteral<"AdvanceMaintenancePayment">;
        }, z.core.$strip>, z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
            type: z.ZodLiteral<"Maintenance">;
        }, z.core.$strip>, z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
            type: z.ZodLiteral<"UnemploymentBenefits">;
        }, z.core.$strip>, z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
            type: z.ZodLiteral<"SicknessBenefits">;
        }, z.core.$strip>, z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
            type: z.ZodLiteral<"HousingAllowance">;
        }, z.core.$strip>, z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
            type: z.ZodLiteral<"ChildSupplement">;
        }, z.core.$strip>, z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
            type: z.ZodLiteral<"BAfOG">;
        }, z.core.$strip>, z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
            type: z.ZodLiteral<"ParentalAllowance">;
            parentalAllowanceType: z.ZodEnum<{
                normal: "normal";
                plus: "plus";
            }>;
            claim: z.ZodNumber;
            officialAllowance: z.ZodNumber;
        }, z.core.$strip>, z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
            type: z.ZodLiteral<"Pension">;
        }, z.core.$strip>, z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
            type: z.ZodLiteral<"MaintenanceContributionFromMasterCraftsmen">;
        }, z.core.$strip>, z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
            type: z.ZodLiteral<"ShortTimeWorkAllowance">;
            gros: z.ZodNumber;
            net: z.ZodNumber;
        }, z.core.$strip>, z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
            type: z.ZodLiteral<"VocationalTrainingAllowance">;
        }, z.core.$strip>, z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
            type: z.ZodLiteral<"TaxFreeSideJob">;
        }, z.core.$strip>, z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
            type: z.ZodLiteral<"VoluntarySocialYear">;
        }, z.core.$strip>, z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
            type: z.ZodLiteral<"OtherIncome">;
        }, z.core.$strip>, z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
            type: z.ZodLiteral<"ChildBenefitTransfer">;
        }, z.core.$strip>]>>;
        age: z.ZodOptional<z.ZodNumber>;
        attributes: z.ZodObject<{
            isPregnant: z.ZodBoolean;
            isSingleParent: z.ZodBoolean;
            hasDiseases: z.ZodBoolean;
            diseases: z.ZodArray<z.ZodString>;
        }, z.core.$strip>;
        type: z.ZodLiteral<"adult">;
    }, z.core.$strip>, z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        income: z.ZodArray<z.ZodUnion<readonly [z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
            type: z.ZodLiteral<"EmploymentIncome">;
            gros: z.ZodNumber;
            net: z.ZodNumber;
        }, z.core.$strip>, z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
            type: z.ZodLiteral<"SelfEmploymentIncome">;
            gros: z.ZodNumber;
            net: z.ZodNumber;
        }, z.core.$strip>, z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
            type: z.ZodLiteral<"ChildAllowance">;
        }, z.core.$strip>, z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
            type: z.ZodLiteral<"AdvanceMaintenancePayment">;
        }, z.core.$strip>, z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
            type: z.ZodLiteral<"Maintenance">;
        }, z.core.$strip>, z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
            type: z.ZodLiteral<"UnemploymentBenefits">;
        }, z.core.$strip>, z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
            type: z.ZodLiteral<"SicknessBenefits">;
        }, z.core.$strip>, z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
            type: z.ZodLiteral<"HousingAllowance">;
        }, z.core.$strip>, z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
            type: z.ZodLiteral<"ChildSupplement">;
        }, z.core.$strip>, z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
            type: z.ZodLiteral<"BAfOG">;
        }, z.core.$strip>, z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
            type: z.ZodLiteral<"ParentalAllowance">;
            parentalAllowanceType: z.ZodEnum<{
                normal: "normal";
                plus: "plus";
            }>;
            claim: z.ZodNumber;
            officialAllowance: z.ZodNumber;
        }, z.core.$strip>, z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
            type: z.ZodLiteral<"Pension">;
        }, z.core.$strip>, z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
            type: z.ZodLiteral<"MaintenanceContributionFromMasterCraftsmen">;
        }, z.core.$strip>, z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
            type: z.ZodLiteral<"ShortTimeWorkAllowance">;
            gros: z.ZodNumber;
            net: z.ZodNumber;
        }, z.core.$strip>, z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
            type: z.ZodLiteral<"VocationalTrainingAllowance">;
        }, z.core.$strip>, z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
            type: z.ZodLiteral<"TaxFreeSideJob">;
        }, z.core.$strip>, z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
            type: z.ZodLiteral<"VoluntarySocialYear">;
        }, z.core.$strip>, z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
            type: z.ZodLiteral<"OtherIncome">;
        }, z.core.$strip>, z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
            type: z.ZodLiteral<"ChildBenefitTransfer">;
        }, z.core.$strip>]>>;
        attributes: z.ZodObject<{
            isPregnant: z.ZodBoolean;
            isSingleParent: z.ZodBoolean;
            hasDiseases: z.ZodBoolean;
            diseases: z.ZodArray<z.ZodString>;
        }, z.core.$strip>;
        type: z.ZodLiteral<"child">;
        age: z.ZodNumber;
    }, z.core.$strip>], "type">>;
    isEmployable: z.ZodBoolean;
    spendings: z.ZodObject<{
        rent: z.ZodNumber;
        utilities: z.ZodNumber;
        heating: z.ZodNumber;
        sum: z.ZodNumber;
    }, z.core.$strip>;
    income: z.ZodObject<{
        sum: z.ZodNumber;
        allowance: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const StepState: z.ZodObject<{
    context: z.ZodObject<{
        community: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            income: z.ZodArray<z.ZodUnion<readonly [z.ZodObject<{
                id: z.ZodString;
                amount: z.ZodNumber;
                allowance: z.ZodOptional<z.ZodNumber>;
                type: z.ZodLiteral<"EmploymentIncome">;
                gros: z.ZodNumber;
                net: z.ZodNumber;
            }, z.core.$strip>, z.ZodObject<{
                id: z.ZodString;
                amount: z.ZodNumber;
                allowance: z.ZodOptional<z.ZodNumber>;
                type: z.ZodLiteral<"SelfEmploymentIncome">;
                gros: z.ZodNumber;
                net: z.ZodNumber;
            }, z.core.$strip>, z.ZodObject<{
                id: z.ZodString;
                amount: z.ZodNumber;
                allowance: z.ZodOptional<z.ZodNumber>;
                type: z.ZodLiteral<"ChildAllowance">;
            }, z.core.$strip>, z.ZodObject<{
                id: z.ZodString;
                amount: z.ZodNumber;
                allowance: z.ZodOptional<z.ZodNumber>;
                type: z.ZodLiteral<"AdvanceMaintenancePayment">;
            }, z.core.$strip>, z.ZodObject<{
                id: z.ZodString;
                amount: z.ZodNumber;
                allowance: z.ZodOptional<z.ZodNumber>;
                type: z.ZodLiteral<"Maintenance">;
            }, z.core.$strip>, z.ZodObject<{
                id: z.ZodString;
                amount: z.ZodNumber;
                allowance: z.ZodOptional<z.ZodNumber>;
                type: z.ZodLiteral<"UnemploymentBenefits">;
            }, z.core.$strip>, z.ZodObject<{
                id: z.ZodString;
                amount: z.ZodNumber;
                allowance: z.ZodOptional<z.ZodNumber>;
                type: z.ZodLiteral<"SicknessBenefits">;
            }, z.core.$strip>, z.ZodObject<{
                id: z.ZodString;
                amount: z.ZodNumber;
                allowance: z.ZodOptional<z.ZodNumber>;
                type: z.ZodLiteral<"HousingAllowance">;
            }, z.core.$strip>, z.ZodObject<{
                id: z.ZodString;
                amount: z.ZodNumber;
                allowance: z.ZodOptional<z.ZodNumber>;
                type: z.ZodLiteral<"ChildSupplement">;
            }, z.core.$strip>, z.ZodObject<{
                id: z.ZodString;
                amount: z.ZodNumber;
                allowance: z.ZodOptional<z.ZodNumber>;
                type: z.ZodLiteral<"BAfOG">;
            }, z.core.$strip>, z.ZodObject<{
                id: z.ZodString;
                amount: z.ZodNumber;
                allowance: z.ZodOptional<z.ZodNumber>;
                type: z.ZodLiteral<"ParentalAllowance">;
                parentalAllowanceType: z.ZodEnum<{
                    normal: "normal";
                    plus: "plus";
                }>;
                claim: z.ZodNumber;
                officialAllowance: z.ZodNumber;
            }, z.core.$strip>, z.ZodObject<{
                id: z.ZodString;
                amount: z.ZodNumber;
                allowance: z.ZodOptional<z.ZodNumber>;
                type: z.ZodLiteral<"Pension">;
            }, z.core.$strip>, z.ZodObject<{
                id: z.ZodString;
                amount: z.ZodNumber;
                allowance: z.ZodOptional<z.ZodNumber>;
                type: z.ZodLiteral<"MaintenanceContributionFromMasterCraftsmen">;
            }, z.core.$strip>, z.ZodObject<{
                id: z.ZodString;
                amount: z.ZodNumber;
                allowance: z.ZodOptional<z.ZodNumber>;
                type: z.ZodLiteral<"ShortTimeWorkAllowance">;
                gros: z.ZodNumber;
                net: z.ZodNumber;
            }, z.core.$strip>, z.ZodObject<{
                id: z.ZodString;
                amount: z.ZodNumber;
                allowance: z.ZodOptional<z.ZodNumber>;
                type: z.ZodLiteral<"VocationalTrainingAllowance">;
            }, z.core.$strip>, z.ZodObject<{
                id: z.ZodString;
                amount: z.ZodNumber;
                allowance: z.ZodOptional<z.ZodNumber>;
                type: z.ZodLiteral<"TaxFreeSideJob">;
            }, z.core.$strip>, z.ZodObject<{
                id: z.ZodString;
                amount: z.ZodNumber;
                allowance: z.ZodOptional<z.ZodNumber>;
                type: z.ZodLiteral<"VoluntarySocialYear">;
            }, z.core.$strip>, z.ZodObject<{
                id: z.ZodString;
                amount: z.ZodNumber;
                allowance: z.ZodOptional<z.ZodNumber>;
                type: z.ZodLiteral<"OtherIncome">;
            }, z.core.$strip>, z.ZodObject<{
                id: z.ZodString;
                amount: z.ZodNumber;
                allowance: z.ZodOptional<z.ZodNumber>;
                type: z.ZodLiteral<"ChildBenefitTransfer">;
            }, z.core.$strip>]>>;
            age: z.ZodOptional<z.ZodNumber>;
            attributes: z.ZodObject<{
                isPregnant: z.ZodBoolean;
                isSingleParent: z.ZodBoolean;
                hasDiseases: z.ZodBoolean;
                diseases: z.ZodArray<z.ZodString>;
            }, z.core.$strip>;
            type: z.ZodLiteral<"adult">;
        }, z.core.$strip>, z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            income: z.ZodArray<z.ZodUnion<readonly [z.ZodObject<{
                id: z.ZodString;
                amount: z.ZodNumber;
                allowance: z.ZodOptional<z.ZodNumber>;
                type: z.ZodLiteral<"EmploymentIncome">;
                gros: z.ZodNumber;
                net: z.ZodNumber;
            }, z.core.$strip>, z.ZodObject<{
                id: z.ZodString;
                amount: z.ZodNumber;
                allowance: z.ZodOptional<z.ZodNumber>;
                type: z.ZodLiteral<"SelfEmploymentIncome">;
                gros: z.ZodNumber;
                net: z.ZodNumber;
            }, z.core.$strip>, z.ZodObject<{
                id: z.ZodString;
                amount: z.ZodNumber;
                allowance: z.ZodOptional<z.ZodNumber>;
                type: z.ZodLiteral<"ChildAllowance">;
            }, z.core.$strip>, z.ZodObject<{
                id: z.ZodString;
                amount: z.ZodNumber;
                allowance: z.ZodOptional<z.ZodNumber>;
                type: z.ZodLiteral<"AdvanceMaintenancePayment">;
            }, z.core.$strip>, z.ZodObject<{
                id: z.ZodString;
                amount: z.ZodNumber;
                allowance: z.ZodOptional<z.ZodNumber>;
                type: z.ZodLiteral<"Maintenance">;
            }, z.core.$strip>, z.ZodObject<{
                id: z.ZodString;
                amount: z.ZodNumber;
                allowance: z.ZodOptional<z.ZodNumber>;
                type: z.ZodLiteral<"UnemploymentBenefits">;
            }, z.core.$strip>, z.ZodObject<{
                id: z.ZodString;
                amount: z.ZodNumber;
                allowance: z.ZodOptional<z.ZodNumber>;
                type: z.ZodLiteral<"SicknessBenefits">;
            }, z.core.$strip>, z.ZodObject<{
                id: z.ZodString;
                amount: z.ZodNumber;
                allowance: z.ZodOptional<z.ZodNumber>;
                type: z.ZodLiteral<"HousingAllowance">;
            }, z.core.$strip>, z.ZodObject<{
                id: z.ZodString;
                amount: z.ZodNumber;
                allowance: z.ZodOptional<z.ZodNumber>;
                type: z.ZodLiteral<"ChildSupplement">;
            }, z.core.$strip>, z.ZodObject<{
                id: z.ZodString;
                amount: z.ZodNumber;
                allowance: z.ZodOptional<z.ZodNumber>;
                type: z.ZodLiteral<"BAfOG">;
            }, z.core.$strip>, z.ZodObject<{
                id: z.ZodString;
                amount: z.ZodNumber;
                allowance: z.ZodOptional<z.ZodNumber>;
                type: z.ZodLiteral<"ParentalAllowance">;
                parentalAllowanceType: z.ZodEnum<{
                    normal: "normal";
                    plus: "plus";
                }>;
                claim: z.ZodNumber;
                officialAllowance: z.ZodNumber;
            }, z.core.$strip>, z.ZodObject<{
                id: z.ZodString;
                amount: z.ZodNumber;
                allowance: z.ZodOptional<z.ZodNumber>;
                type: z.ZodLiteral<"Pension">;
            }, z.core.$strip>, z.ZodObject<{
                id: z.ZodString;
                amount: z.ZodNumber;
                allowance: z.ZodOptional<z.ZodNumber>;
                type: z.ZodLiteral<"MaintenanceContributionFromMasterCraftsmen">;
            }, z.core.$strip>, z.ZodObject<{
                id: z.ZodString;
                amount: z.ZodNumber;
                allowance: z.ZodOptional<z.ZodNumber>;
                type: z.ZodLiteral<"ShortTimeWorkAllowance">;
                gros: z.ZodNumber;
                net: z.ZodNumber;
            }, z.core.$strip>, z.ZodObject<{
                id: z.ZodString;
                amount: z.ZodNumber;
                allowance: z.ZodOptional<z.ZodNumber>;
                type: z.ZodLiteral<"VocationalTrainingAllowance">;
            }, z.core.$strip>, z.ZodObject<{
                id: z.ZodString;
                amount: z.ZodNumber;
                allowance: z.ZodOptional<z.ZodNumber>;
                type: z.ZodLiteral<"TaxFreeSideJob">;
            }, z.core.$strip>, z.ZodObject<{
                id: z.ZodString;
                amount: z.ZodNumber;
                allowance: z.ZodOptional<z.ZodNumber>;
                type: z.ZodLiteral<"VoluntarySocialYear">;
            }, z.core.$strip>, z.ZodObject<{
                id: z.ZodString;
                amount: z.ZodNumber;
                allowance: z.ZodOptional<z.ZodNumber>;
                type: z.ZodLiteral<"OtherIncome">;
            }, z.core.$strip>, z.ZodObject<{
                id: z.ZodString;
                amount: z.ZodNumber;
                allowance: z.ZodOptional<z.ZodNumber>;
                type: z.ZodLiteral<"ChildBenefitTransfer">;
            }, z.core.$strip>]>>;
            attributes: z.ZodObject<{
                isPregnant: z.ZodBoolean;
                isSingleParent: z.ZodBoolean;
                hasDiseases: z.ZodBoolean;
                diseases: z.ZodArray<z.ZodString>;
            }, z.core.$strip>;
            type: z.ZodLiteral<"child">;
            age: z.ZodNumber;
        }, z.core.$strip>], "type">>;
        isEmployable: z.ZodBoolean;
        spendings: z.ZodObject<{
            rent: z.ZodNumber;
            utilities: z.ZodNumber;
            heating: z.ZodNumber;
            sum: z.ZodNumber;
        }, z.core.$strip>;
        income: z.ZodObject<{
            sum: z.ZodNumber;
            allowance: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>;
    }, z.core.$strip>;
    currentStep: z.ZodNumber;
    step: z.ZodAny;
}, z.core.$strip>;
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
