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
  // ausgaben: {
  //   heizkosten: number;
  //   kaltmiete: number;
  //   nebenkosten: number;
  // };
  // einkommen: {
  //   antragsteller: {
  //     arbeitslosengeld: number;
  //     brutto: number;
  //     elterngeld: number;
  //     kindergeld: number;
  //     netto: number;
  //     rente: number;
  //     sonstiges: number;
  //   };
  //   partner: {
  //     arbeitslosengeld: number;
  //     brutto: number;
  //     elterngeld: number;
  //     kindergeld: number;
  //     netto: number;
  //     rente: number;
  //     sonstiges: number;
  //   };
  // };
  // kinder: ("adult" | "child" | "teenager" | "toddler")[];
  // partnerschaft: "false" | "true" | undefined;
  // schwanger: "false" | "true" | undefined;
  community: TPerson[];
  isEmployable: boolean;
};

export type TStepsState = {
  context: TStepContext;
  currentStep: number;
  steps: Record<number, TStep>;
};

export type TAction = {
  state?: RecursivePartial<TStepsState>;
  type: "next" | "previous";
};

export type TPersonCommon = {
  name: string;
  isPregnant?: boolean;
  needsSpecialFood?: boolean;
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
