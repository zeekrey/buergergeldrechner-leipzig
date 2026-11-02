import { z } from "zod";

export type TStep = {
  description: string;
  id: string;
  next: (ctx: TStepContext) => number;
  previous: (ctx: TStepContext) => number;
  title: string;
};

export const diseases = [
  {
    id: "renalInsufficiency",
    label: "Chronisch obstruktive Erkrankung",
    description:
      "Häufig bei chronisch obstruktiven Lungenerkrankungen (COPD), Tumorerkrankungen, CED (Morbus Crohn, Collitis Ulcerosa), Neurologischen Erkrankungen (auch Schluckstörungen*), terminaler Niereninsuffizienz, insb. bei Dialyse* und präterminale Niereninsuffizienz, insb. bei Dialyse, Wundheilungsstörungen, Lebererkrankungen (z. B. alkoholische Steatohepatitis, Leberzirrhose)",
  },
  {
    id: "liverDiseases",
    label: "Niereninsuffizienz",
    description: "Terminale Niereninsuffizienz mit Dialysetherapie.",
  },
  {
    id: "celiacDisease",
    label: "Zöliakie",
    description: "",
  },
  {
    id: "cysticFibrosis",
    label: "Mukoviszidose/zystische Fibrose",
    description: "",
  },
] as const;

export const IncomeTypEnum = z.enum([
  "EmploymentIncome",
  "SelfEmploymentIncome",
  "ChildAllowance",
  "AdvanceMaintenancePayment",
  "Maintenance",
  "UnemploymentBenefits",
  "SicknessBenefits",
  "HousingAllowance",
  "ChildSupplement",
  "BAfOG",
  "ParentalAllowance",
  "Pension",
  "MaintenanceContributionFromMasterCraftsmen",
  "ShortTimeWorkAllowance",
  "VocationalTrainingAllowance",
  "TaxFreeSideJob",
  "VoluntarySocialYear",
  "OtherIncome",
  "ChildBenefitTransfer",
]);

export type TIncomeType = z.infer<typeof IncomeTypEnum>;

export const IncomeBaseSchema = z.object({
  id: z.string(),
  type: IncomeTypEnum,
  amount: z.number(),
  allowance: z.optional(z.number()),
});

export const EmploymentIncomeSchema = IncomeBaseSchema.extend({
  type: z.literal("EmploymentIncome"),
  gros: z.number(),
  net: z.number(),
});
export const SelfEmploymentIncomeSchema = IncomeBaseSchema.extend({
  type: z.literal("SelfEmploymentIncome"),
  gros: z.number(),
  net: z.number(),
});
export const ChildAllowanceSchema = IncomeBaseSchema.extend({
  type: z.literal("ChildAllowance"),
});
export const AdvanceMaintenancePaymentSchema = IncomeBaseSchema.extend({
  type: z.literal("AdvanceMaintenancePayment"),
});
export const MaintenanceSchema = IncomeBaseSchema.extend({
  type: z.literal("Maintenance"),
});
export const UnemploymentBenefitsSchema = IncomeBaseSchema.extend({
  type: z.literal("UnemploymentBenefits"),
});
export const SicknessBenefitsSchema = IncomeBaseSchema.extend({
  type: z.literal("SicknessBenefits"),
});
export const HousingAllowanceSchema = IncomeBaseSchema.extend({
  type: z.literal("HousingAllowance"),
});
export const ChildSupplementSchema = IncomeBaseSchema.extend({
  type: z.literal("ChildSupplement"),
});
export const BAfOGSchema = IncomeBaseSchema.extend({
  type: z.literal("BAfOG"),
});
export const ParentalAllowanceSchema = IncomeBaseSchema.extend({
  type: z.literal("ParentalAllowance"),
  parentalAllowanceType: z.enum(["normal", "plus"]),
  claim: z.number(),
  officialAllowance: z.number(),
});
export const PensionSchema = IncomeBaseSchema.extend({
  type: z.literal("Pension"),
});
export const MaintenanceContributionFromMasterCraftsmenSchema =
  IncomeBaseSchema.extend({
    type: z.literal("MaintenanceContributionFromMasterCraftsmen"),
  });
export const ShortTimeWorkAllowanceSchema = IncomeBaseSchema.extend({
  type: z.literal("ShortTimeWorkAllowance"),
  gros: z.number(),
  net: z.number(),
});
export const VocationalTrainingAllowanceSchema = IncomeBaseSchema.extend({
  type: z.literal("VocationalTrainingAllowance"),
});
export const TaxFreeSideJobSchema = IncomeBaseSchema.extend({
  type: z.literal("TaxFreeSideJob"),
});
export const VoluntarySocialYearSchema = IncomeBaseSchema.extend({
  type: z.literal("VoluntarySocialYear"),
});
export const OtherIncomeSchema = IncomeBaseSchema.extend({
  type: z.literal("OtherIncome"),
});
export const ChildBenefitTransferSchema = IncomeBaseSchema.extend({
  type: z.literal("ChildBenefitTransfer"),
});

export const ExtendedIncomeSchema = z.union([
  EmploymentIncomeSchema,
  SelfEmploymentIncomeSchema,
  ChildAllowanceSchema,
  AdvanceMaintenancePaymentSchema,
  MaintenanceSchema,
  UnemploymentBenefitsSchema,
  SicknessBenefitsSchema,
  HousingAllowanceSchema,
  ChildSupplementSchema,
  BAfOGSchema,
  ParentalAllowanceSchema,
  PensionSchema,
  MaintenanceContributionFromMasterCraftsmenSchema,
  ShortTimeWorkAllowanceSchema,
  VocationalTrainingAllowanceSchema,
  TaxFreeSideJobSchema,
  VoluntarySocialYearSchema,
  OtherIncomeSchema,
  ChildBenefitTransferSchema,
]);

export const AssetTypeEnum = z.enum([
  "BankAccount",
  "Securities",
  "BuildingSavings",
  "RetirementProvision",
  "Vehicle",
  "OwnerOccupiedProperty",
  "OtherProperty",
  "Other",
]);

export type TAssetType = z.infer<typeof AssetTypeEnum>;

const AssetBaseSchema = z.object({
  id: z.string(),
  personId: z.string(),
  amount: z.number().positive(),
});

export const BankAccountAssetSchema = AssetBaseSchema.extend({
  type: z.literal("BankAccount"),
});
export const SecuritiesAssetSchema = AssetBaseSchema.extend({
  type: z.literal("Securities"),
});
export const BuildingSavingsAssetSchema = AssetBaseSchema.extend({
  type: z.literal("BuildingSavings"),
});
export const RetirementProvisionAssetSchema = AssetBaseSchema.extend({
  type: z.literal("RetirementProvision"),
});
export const VehicleAssetSchema = AssetBaseSchema.extend({
  type: z.literal("Vehicle"),
  remainingLoan: z.number().nonnegative(),
});
export const OwnerOccupiedPropertyAssetSchema = AssetBaseSchema.extend({
  type: z.literal("OwnerOccupiedProperty"),
  livingSpace: z.number().positive(),
  propertyKind: z.enum(["house", "condo"]),
  mortgages: z.number().nonnegative(),
});
export const OtherPropertyAssetSchema = AssetBaseSchema.extend({
  type: z.literal("OtherProperty"),
  mortgages: z.number().nonnegative(),
});
export const OtherAssetSchema = AssetBaseSchema.extend({
  type: z.literal("Other"),
});

export const ExtendedAssetSchema = z.discriminatedUnion("type", [
  BankAccountAssetSchema,
  SecuritiesAssetSchema,
  BuildingSavingsAssetSchema,
  RetirementProvisionAssetSchema,
  VehicleAssetSchema,
  OwnerOccupiedPropertyAssetSchema,
  OtherPropertyAssetSchema,
  OtherAssetSchema,
]);

export const AssetsSchema = z.object({
  items: z.array(ExtendedAssetSchema),
  hasReceivedBenefitsForOneYear: z.boolean(),
  selfEmploymentYearsWithoutPension: z.number().int().nonnegative(),
});

export const emptyAssets: z.infer<typeof AssetsSchema> = {
  items: [],
  hasReceivedBenefitsForOneYear: false,
  selfEmploymentYearsWithoutPension: 0,
};

export const assetType: {
  [key in TAssetType]: { label: string };
} = {
  BankAccount: { label: "Konten und Bargeld" },
  Securities: { label: "Wertpapiere, Fonds und Krypto" },
  BuildingSavings: { label: "Bausparvertrag" },
  RetirementProvision: { label: "Zertifizierte oder geförderte Altersvorsorge" },
  Vehicle: { label: "Kraftfahrzeug" },
  OwnerOccupiedProperty: { label: "Selbst genutztes Wohneigentum" },
  OtherProperty: { label: "Andere Immobilien oder Grundstücke" },
  Other: { label: "Sonstiges Vermögen" },
};

const PersonCommon = z.object({
  id: z.string(),
  name: z.string(),
  income: z.array(ExtendedIncomeSchema),
  age: z.number().int().min(0).max(120).optional(),
  attributes: z.object({
    isPregnant: z.boolean(),
    isSingleParent: z.boolean(),
    hasDiseases: z.boolean(),
    diseases: z.array(z.string()),
  }),
});

const Adult = PersonCommon.merge(z.object({ type: z.literal("adult") }));
const Child = PersonCommon.merge(
  z.object({
    type: z.literal("child"),
    age: z.union([z.literal(-1), z.number().int().min(0).max(24)]),
  })
);
const Person = z.discriminatedUnion("type", [Adult, Child]);

export const StepContext = z.object({
  community: z.array(Person),
  isEmployable: z.boolean(),
  spendings: z.object({
    rent: z.number(),
    utilities: z.number(),
    heating: z.number(),
    sum: z.number(),
  }),
  income: z.object({
    sum: z.number(),
    allowance: z.optional(z.number()),
  }),
  assets: AssetsSchema,
});

export const StepState = z.object({
  context: StepContext,
  currentStep: z.number(),
  step: z.any(),
});

export type TStepContext = z.infer<typeof StepContext>;
export type TPerson = z.infer<typeof Person>;
export type TChild = z.infer<typeof Child>;
export type TAdult = z.infer<typeof Adult>;
export type TIncome = z.infer<typeof Person>["income"][0];
export type TAsset = z.infer<typeof ExtendedAssetSchema>;
export type TAssets = z.infer<typeof AssetsSchema>;

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

export const incomeType: {
  [key in TIncomeType]: { label: string; standardAmount?: number };
} = {
  EmploymentIncome: { label: "Einkommen aus Erwerbstätigkeit" },
  SelfEmploymentIncome: { label: "Einkommen aus Selbstständigkeit" },
  ChildAllowance: { label: "Kindergeld", standardAmount: 255 },
  AdvanceMaintenancePayment: { label: "Unterhaltsvorschuss" },
  Maintenance: { label: "Unterhalt" },
  UnemploymentBenefits: { label: "Arbeitslosengeld" },
  SicknessBenefits: { label: "Krankengeld" },
  HousingAllowance: { label: "Wohngeld" },
  ChildSupplement: { label: "Kinderzuschlag" },
  BAfOG: { label: "BAföG" },
  ParentalAllowance: { label: "Elterngeld" },
  Pension: { label: "Rente" },
  MaintenanceContributionFromMasterCraftsmen: {
    label: "Unterhaltsbeitrag aus Meisterbafög",
  },
  ShortTimeWorkAllowance: { label: "Kurzarbeitergeld" },
  VocationalTrainingAllowance: { label: "Berufsausbildungsbeihilfe (BAB)" },
  TaxFreeSideJob: {
    label: "Steuerfreie nebenberufliche ehrenamtliche Tätigkeit",
  },
  VoluntarySocialYear: {
    label: "Freiwilligendienst, Soziales/Ökologisches Jahr",
  },
  OtherIncome: {
    label: "Sonstiges Einkommen (Geldgeschenke)",
  },
  ChildBenefitTransfer: { label: "Kindergeldübertrag" },
};

export type TAllowance = TIncomeType | "insurance" | "income" | "baseDeduction";

export const allowanceType: {
  [key in TAllowance]: {
    label: string;
    standardAmount?: number;
  };
} = {
  insurance: { label: "Pauschale für angemessene private Versicherungen" },
  income: { label: "Einkommen aus Erwerbstätigkeit" },
  baseDeduction: { label: "Grund" },
  ...incomeType,
};
