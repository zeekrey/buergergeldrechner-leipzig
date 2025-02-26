import { ResultSheet } from "@/app/antrag/ergebnis/result-sheet";
import { TStepContext } from "@/lib/types";

const exampleResult: TStepContext = {
  community: [
    {
      id: "1733937640824382",
      name: "Antragsteller",
      income: [
        {
          id: "1738016730781580",
          type: "EmploymentIncome",
          amount: 800,
          allowance: 348,
          gros: 1200,
          net: 800,
        },
      ],
      attributes: {
        isPregnant: false,
        isSingleParent: false,
        hasDiseases: false,
        diseases: [],
      },
      type: "adult",
    },
    {
      id: "1735250980608142",
      name: "Partner",
      income: [],
      attributes: {
        isPregnant: true,
        isSingleParent: false,
        hasDiseases: false,
        diseases: [],
      },
      type: "adult",
    },
    {
      id: "1738332395682400",
      type: "child",
      name: "Kind 1",
      income: [
        {
          id: "1738332395682773",
          type: "ChildAllowance",
          amount: 255,
          allowance: 0,
        },
      ],
      attributes: {
        hasDiseases: false,
        isPregnant: false,
        isSingleParent: false,
        diseases: [],
      },
      age: 3,
    },
  ],
  isEmployable: true,
  spendings: { rent: 380, utilities: 120, heating: 50, sum: 550 },
  income: { sum: 0, allowance: 0 },
};

export function ResultExample() {
  return (
    <div className="sm:border sm:shadow-xs rounded-lg w-full flex flex-col min-h-96 bg-background">
      <ResultSheet state={exampleResult} />
    </div>
  );
}
