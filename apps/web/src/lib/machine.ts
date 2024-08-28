import { Dispatch, createContext, useContext } from "react";
import { TAction, TStepsState, TStep } from "./types";

export const StepsContext = createContext<TStepsState>(null);

export const StepsDispatchContext = createContext<Dispatch<TAction>>(null);

export function useStepsMachine() {
  return [useContext(StepsContext), useContext(StepsDispatchContext)] as const;
}

export function stepsReducer(
  state: TStepsState,
  action: { type: "next" | "previous" | "load"; state: TStepsState }
) {
  switch (action.type) {
    case "next": {
      const nextState = action.state ?? state;

      const { currentStep } = state;

      const nextStep = stepsConfig[currentStep].next(nextState.context);

      return {
        ...nextState,
        step: stepsConfig[nextStep],
        currentStep: stepsConfig[currentStep].next(nextState.context),
      };
    }
    case "previous": {
      const { currentStep } = state;

      const previousStep = stepsConfig[currentStep].previous;

      return {
        ...state,
        step: stepsConfig[previousStep],
        currentStep: previousStep,
      };
    }
    case "load": {
      return {
        ...state,
        ...action.state,
      };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

export const stepsConfig: Record<number, TStep> = {
  0: {
    description:
      "Willkommen beim Bürgergeldrechner des Jobcenter Leipzig. Ermitteln den Bürgergeldanspruch ihrer Bedarfsgemeinsschaft in wenigen Klicks. Bürgergeldberechtigt, sind nur Personen die erwerbsfähig sind. Das bedeutet, dass Sie in der Lage sein müssen, mindestens drei Stunden pro Tag arbeiten zu können. Sollte dies nicht der Fall sein, haben Sie anspruch auf andere Hilfeleistungen, jedoch keinen Anspruch auf Bürgergeld.",
    id: "erwerbsfaehig",
    next: () => 1,
    previous: 0,
    title: "Ermitteln Sie Ihren persönlichen Bürgergeldbedarf",
  },
  1: {
    description:
      "Es ist zunächst wichtig zu wissen, ob Sie in einer Partnerschaft leben. Partnerschaften sind zum Beispiel Ehe, eingetragene Lebenspartnerschaften oder auch nichteheliche Lebensgemeinschaften die in einer gemeinsamen Wohnung leben.",
    id: "partnerschaft",
    next: () => 2,
    previous: 0,
    title: "Leben Sie in einer Partnerschaft?",
  },
  2: {
    description: "Leben Kinder in Ihren Haushhalt?",
    id: "kinder",
    next: (ctx) => {
      if (ctx.community.some(({ type }) => type === "child")) {
        return 3;
      }

      return 5;
    },
    previous: 1,
    title: "Haben Sie Kinder?",
  },
  3: {
    description: "Wie viele Kinder leben in Ihrem Haushalt?",
    id: "kinder-anzahl",
    next: () => 5,
    previous: 2,
    title: "Wie viele Kinder leben in Ihrem Haushalt?",
  },
  5: {
    description:
      "Sieht so Ihre Bedarfsgemeinschaft aus? Sie haben nun die Möglichkeit einige Merkmale Ihrer Bedarfsgemeinschaft zu erfassen. Auf welche Person genau dieses Merkmal zutrifft, können Sie im folgenden Schritt bestimmen.",
    id: "bedarfsgemeinschaft",
    next: () => 6,
    previous: 3,
    title: "Ihre Bedarfsgemeinschaft",
  },
  6: {
    description:
      "Tragen Sie hier bitte Ihre Kaltmiete, Heiz- und Betriebskosten ein. Wenn Sie Bürgergeld beziehen, übernimmt Ihr Jobcenter die Kosten für Unterkunft und Heizung in angemessener Höhe (die Höhe der Kosten für die Unterkunft werden regional unterschiedlich berechnet). Ist Ihre Wohnung nicht angemessen, müssen Sie die Kosten möglichst senken.",
    id: "monatliche-ausgaben",
    next: () => 7,
    previous: 5,
    title: "Ihre Monatlichen Ausgaben",
  },
  7: {
    description:
      "Geben Sie hier bitte jeweils Ihr Brutto- und Nettoeinkommen (bitte beide Werte eintragen) an und wenn zutreffend ebenfalls das Ihrer Partnerin /Ihres Partners.",
    id: "monatliches-einkommen",
    next: () => 8,
    previous: 6,
    title: "Einkommen aus Erwerbstätigkeit",
  },
  8: {
    description:
      "Auf Basis Ihrer Angaben könnten sie Anspruch auf Bürgergeld haben. Hier sehen Sie Ihr Berechnungsergebnis. Ob Sie tatsächlich Anspruch haben, hängt von weiteren Faktoren ab. Bitte beachten Sie, dass es sich hierbei um eine unverbindliche Berechnung handelt.",
    id: "ergebnis",
    next: () => 10,
    previous: 7,
    title: "Ihr Berechnungsergebnis",
  },
};

export const initialStepsState: TStepsState = {
  context: {
    community: [],
    isEmployable: false,
    spendings: {
      heating: 0,
      rent: 0,
      sum: 0,
      utilities: 0,
    },
    income: {
      allowance: 0,
      sum: 0,
    },
  },
  currentStep: 0,
  step: stepsConfig[0],
};
