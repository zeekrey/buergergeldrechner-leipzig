import { Dispatch, createContext, useContext } from "react";

import { TAction, TStepsConfig } from "./types";

export const StepsContext = createContext<TStepsConfig>(null);

export const StepsDispatchContext = createContext<Dispatch<TAction>>(null);

export function useSteps() {
  return useContext(StepsContext);
}

export function useStepsDispatch() {
  return useContext(StepsDispatchContext);
}

export function stepsReducer(context, action) {
  switch (action.type) {
    case "next": {
      const newContext = {
        ...context,
        context: { ...context.context, ...action.data },
      };

      const nextStepId = context.steps[context.currentStep].next(
        newContext.context
      );
      newContext.currentStep = nextStepId;

      return newContext;
    }
    case "previous": {
      const newContext = { ...context };

      newContext.currentStep = context.steps[context.currentStep].previous;
      return newContext;
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

export const stepsConfig: TStepsConfig = {
  context: {
    community: [],
    ausgaben: {
      heizkosten: 0,
      kaltmiete: 0,
      nebenkosten: 0,
    },
    einkommen: {
      antragsteller: {
        arbeitslosengeld: 0,
        brutto: 0,
        elterngeld: 0,
        kindergeld: 0,
        netto: 0,
        rente: 0,
        sonstiges: 0,
      },
      partner: {
        arbeitslosengeld: 0,
        brutto: 0,
        elterngeld: 0,
        kindergeld: 0,
        netto: 0,
        rente: 0,
        sonstiges: 0,
      },
    },
    kinder: [],
    partnerschaft: "false",
    schwanger: "false",
  },
  currentStep: 0,
  steps: {
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
        if (ctx.kinder) {
          return 3;
        }

        return 4;
      },
      previous: 0,
      title: "Haben Sie Kinder?",
    },
    3: {
      description: "Wie viele Kinder leben in Ihrem Haushalt?",
      id: "kinder-anzahl",
      next: () => 4,
      previous: 1,
      title: "Wie viele Kinder leben in Ihrem Haushalt?",
    },
    4: {
      description:
        "Sind einige der folgenden Merkmale für Sie relevant? Wenn ja, aktivieren Sie bitte diese.",
      id: "merkmale",
      next: () => 5,
      previous: 3,
      title: "Merkmale Ihrer Bedarfsgemeinschaft",
    },
    5: {
      description:
        "Sieht so Ihre Bedarfsgemeinschaft aus? Sie haben nun die Möglichkeit einige Merkmale Ihrer Bedarfsgemeinschaft zu erfassen. AUf welche Person genau dieses Merkmal zutrifft, können Sie im folgenden Schritt bestimmen.",
      id: "bedarfsgemeinschaft",
      next: () => 6,
      previous: 4,
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
        "Hierzu zählen zum Beispiel Arbeitslosengeld I, Krankengeld, Elterngeld über dem Freibetrag von 300 Euro, Unterhalt und Unterhaltsvorschuss vom Jugendamt, Renten, Einnahmen aus Vermietung, Zinsen oder Steuererstattungen.",
      id: "weiteres-einkommen",
      next: () => 9,
      previous: 7,
      title: "Weiteres Einkommen",
    },
    9: {
      description:
        "Auf Basis Ihrer Angaben könnten sie Anspruch auf Bürgergeld haben. Hier sehen Sie Ihr Berechnungsergebnis. Ob Sie tatsächlich Anspruch haben, hängt von weiteren Faktoren ab. Bitte beachten Sie, dass es sich hierbei um eine unverbindliche Berechnung handelt.",
      id: "ergebnis",
      next: () => 8,
      previous: 9,
      title: "Ihr Berechnungsergebnis",
    },
    // Schwangerschaft und diverse andere Fragen fehlen
  },
};
