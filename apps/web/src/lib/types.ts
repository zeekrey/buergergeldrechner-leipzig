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

export type TStepContext = {
  community: TPerson[];
  isEmployable: boolean;
  spendings: {
    rent: number;
    utilities: number;
    heating: number;
    sum: number;
  };
  income: {
    sum: number;
    allowance?: number;
  };
};

export type TPersonCommon = {
  id: string;
  name: string;
  isPregnant?: boolean;
  needsSpecialFood?: boolean;
  income?: {
    type: TIncomeType;
    amount: number;
    allowance?: number;
    net?: number;
    gros?: number;
  }[];
};

export type TAdult = TPersonCommon & {
  type: "adult";
};

export type TChild = TPersonCommon & {
  type: "child";
  age: "0-5" | "6-13" | "14-17" | "18+";
  isInTraining?: boolean;
};

export type TPerson = TAdult | TChild;

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

export type TIncome = {
  id: string;
  name: string;
  type: TIncomeType;
  amount: number;
  allowance?: number;
  gros?: number;
  net?: number;
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
