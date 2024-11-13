import { z } from "zod";

type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

export type TStep = {
  description: string;
  id: string;
  next: (ctx: TStepContext) => number;
  previous: number;
  title: string;
};

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
]);

export const diseases = {
  renalInsufficiency: {
    label: "Chronisch obstruktive Erkrankung",
    description:
      "Häufig bei chronisch obstruktiven Lungenerkrankungen (COPD), Tumorerkrankungen, CED (Morbus Crohn, Collitis Ulcerosa), Neurologischen Erkrankungen (auch Schluckstörungen*), terminaler Niereninsuffizienz, insb. bei Dialyse* und präterminale Niereninsuffizienz, insb. bei Dialyse, Wundheilungsstörungen, Lebererkrankungen (z. B. alkoholische Steatohepatitis, Leberzirrhose)",
  },
  liverDiseases: {
    label: "Niereninsuffizienz",
    description: "Terminale Niereninsuffizienz mit Dialysetherapie.",
  },
  celiacDisease: {
    label: "Zöliakie",
    description: "",
  },
  cysticFibrosis: {
    label: "Mukoviszidose/zystische Fibrose",
    description: "",
  },
} as const;

/* FIXME: Feels weird. */
const [firstKey, ...otherKeys] = Object.keys(
  diseases
) as (keyof typeof diseases)[];

export const Diseases = z.enum([firstKey, ...otherKeys]);

const IncomeBaseSchema = z.object({
  id: z.string(),
  type: IncomeTypEnum,
  amount: z.number(),
  allowance: z.number(),
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
]);

const PersonCommon = z.object({
  id: z.string(),
  name: z.string(),
  income: z.array(ExtendedIncomeSchema),
  attributes: z.optional(
    z.object({
      isPregnant: z.optional(z.boolean()),
      isSingleParent: z.optional(z.boolean()),
      hasDiseases: z.optional(z.boolean()),
      diseases: z.optional(z.array(Diseases)),
    })
  ),
});

const Adult = PersonCommon.merge(z.object({ type: z.literal("adult") }));
const Child = PersonCommon.merge(
  z.object({
    type: z.literal("child"),
    age: z.number(),
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

export type TIncomeType =
  | "EmploymentIncome"
  | "SelfEmploymentIncome"
  | "ChildAllowance"
  | "AdvanceMaintenancePayment"
  | "Maintenance"
  | "UnemploymentBenefits"
  | "SicknessBenefits"
  | "HousingAllowance"
  | "ChildSupplement"
  | "BAfOG"
  | "ParentalAllowance"
  | "Pension"
  | "MaintenanceContributionFromMasterCraftsmen"
  | "ShortTimeWorkAllowance"
  | "VocationalTrainingAllowance"
  | "TaxFreeSideJob"
  | "VoluntarySocialYear"
  | "OtherIncome";

export type TStepsState = {
  context: TStepContext;
  step: TStep;
  currentStep: number;
};

export type TAction = {
  state?: RecursivePartial<TStepsState>;
  type: "next" | "previous" | "load";
};

export const allowanceType = {
  insurance: "Pauschale für angemessene private Versicherungen",
  income: "Einkommen aus Erwerbstätigkeit",
};

export const incomeType: {
  [key in TIncomeType]: { label: string; standardAmount?: number };
} = {
  EmploymentIncome: { label: "Einkommen aus Erwerbstätigkeit" },
  SelfEmploymentIncome: { label: "Einkommen aus Selbstständigkeit" },
  ChildAllowance: { label: "Kindergeld", standardAmount: 250 },
  AdvanceMaintenancePayment: { label: "Unterhaltsvorschuss" },
  Maintenance: { label: "Unterhalt" },
  UnemploymentBenefits: { label: "Arbeitslosengeld" },
  SicknessBenefits: { label: "Krankengeld" },
  HousingAllowance: { label: "Wohngeld" },
  ChildSupplement: { label: "Kinderzuschlag" },
  BAfOG: { label: "BAfÖG" },
  ParentalAllowance: { label: "Elterngeld" },
  Pension: { label: "Rente" },
  MaintenanceContributionFromMasterCraftsmen: {
    label: "Unterhaltsbeitrag aus Meisterbafög",
  },
  ShortTimeWorkAllowance: { label: "Kurzarbeitergeld" },
  VocationalTrainingAllowance: { label: "Berufsausbildungsbeihilfe (BAB)" },
  TaxFreeSideJob: { label: "Steuerfreie nebenberufliche Tätigkeit" },
  VoluntarySocialYear: {
    label: "Freiwilligendienst, Soziales/Ökologisches Jahr",
  },
  OtherIncome: { label: "Sonstiges Einkommen (Geldgeschenke)" },
};
