import { Dispatch, SetStateAction, createContext, useContext } from "react";
import { TAction, TStepsState, TStep, TStepContext } from "./types";

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
      "Bürgergeldberechtigt, sind Personen die erwerbsfähig sind. Das bedeutet, dass Sie in der Lage sein müssen, mindestens drei Stunden pro Tag arbeiten zu können. Sollte dies nicht der Fall sein, können Sie Anspruch auf andere Hilfeleistungen haben.",
    id: "erwerbsfaehig",
    next: () => 1,
    previous: 0,
    title: "Sind Sie erwerbsfähig?",
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
    description:
      "Bitte geben Sie an, ob Kinder in Ihrem Haushalt leben. Sie erhalten dann die Möglichkeit genauere Angaben zu tätigen.",
    id: "kinder",
    next: (ctx) => {
      if (ctx.community.some(({ type }) => type === "child")) {
        return 3;
      }

      return 5;
    },
    previous: 1,
    title: "Leben Kinder in Ihrem Haushhalt?",
  },
  3: {
    description:
      "Der Bedarf auf Bürgergeld richtet sich nach der Anzahl und dem Alter der Kinder, die in Ihrem Haushalt leben.",
    id: "kinder-anzahl",
    next: () => 5,
    previous: 2,
    title: "Wie viele Kinder leben in Ihrem Haushalt?",
  },
  5: {
    description:
      "Sieht so Ihre Bedarfsgemeinschaft aus? Wenn nicht, gehen Sie bitte Schritte zurück um sie anzupassen.",
    id: "bedarfsgemeinschaft",
    next: () => 6,
    previous: 3,
    title: "Ihre Bedarfsgemeinschaft",
  },
  6: {
    description:
      "Tragen Sie hier bitte Ihre aktuelle Kaltmiete, Heiz- und Betriebskosten ein.",
    // FIXME: Sollte auch kosten für Unterkunft und Heiztung heißen
    id: "monatliche-ausgaben",
    next: () => 7,
    previous: 5,
    title: "Kosten für Unterkunft und Heizung",
  },
  7: {
    description:
      "Für die Berechnung des Anspruchs geben Sie bitte das Einkommen aller erwerbstätigen Personen ein. Es gibt verschiedene Arten von Einkommen. Unter Einkommen hinzufügen stehen die Arten von Einkommen zur Verfügung. Bitte geben Sie alle Einkommen an, welche die Bedarfsgemeinschaft hat.",
    id: "monatliches-einkommen",
    next: () => 8,
    previous: 6,
    title: "Erfassung des Einkommens",
  },
  8: {
    description:
      "Auf Basis Ihrer Angaben sehen Sie die mögliche Höhe des Bürgergeldes. Ob Sie tatsächlich Anspruch haben, hängt von weiteren Faktoren ab. Bitte beachten Sie, dass es sich hierbei um eine unverbindliche Berechnung handelt.",
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
