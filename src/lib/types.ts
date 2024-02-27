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
  ausgaben: {
    heizkosten: number;
    kaltmiete: number;
    nebenkosten: number;
  };
  einkommen: {
    antragsteller: {
      arbeitslosengeld: number;
      brutto: number;
      elterngeld: number;
      kindergeld: number;
      netto: number;
      rente: number;
      sonstiges: number;
    };
    partner: {
      arbeitslosengeld: number;
      brutto: number;
      elterngeld: number;
      kindergeld: number;
      netto: number;
      rente: number;
      sonstiges: number;
    };
  };
  kinder: ("adult" | "child" | "teenager" | "toddler")[];
  partnerschaft: "false" | "true" | undefined;
  schwanger: "false" | "true" | undefined;
};

export type TStepsConfig = {
  context: TStepContext;
  currentStep: number;
  steps: Record<number, TStep>;
};

export type TAction = {
  data?: RecursivePartial<TStepContext>;
  type: "next" | "previous";
};
