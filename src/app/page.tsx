"use client";

import { Step } from "@/components/step";
import { StepsProvider } from "@/components/step-context-provider";
import { Button } from "@/components/ui/button";
import { TStepsConfig } from "@/lib/types";
import { BoltIcon, HelpCircleIcon } from "lucide-react";

const stepsConfig: TStepsConfig = {
  context: {
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
        "Es ist zunächst wichtig zu wissen, ob Sie in einer Partnerschaft leben. Partnerschaften sind zum Beispiel Ehe, eingetragene Lebenspartnerschaften oder auch nichteheliche Lebensgemeinschaften die in einer gemeinsamen Wohnung leben.",
      id: "partnerschaft",
      next: () => 1,
      previous: 0,
      title: "Leben Sie in einer Partnerschaft?",
    },
    1: {
      description: "Leben Kinder in Ihren Haushhalt?",
      id: "kinder",
      next: (ctx) => {
        if (ctx.kinder) {
          return 2;
        }

        return 3;
      },
      previous: 0,
      title: "Haben Sie Kinder?",
    },
    2: {
      description: "Wie viele Kinder leben in Ihrem Haushalt?",
      id: "kinder-anzahl",
      next: () => 3,
      previous: 1,
      title: "Wie viele Kinder leben in Ihrem Haushalt?",
    },
    3: {
      description:
        "Tragen Sie hier bitte Ihre Kaltmiete, Heiz- und Betriebskosten ein. Wenn Sie Bürgergeld beziehen, übernimmt Ihr Jobcenter die Kosten für Unterkunft und Heizung in angemessener Höhe (die Höhe der Kosten für die Unterkunft werden regional unterschiedlich berechnet). Ist Ihre Wohnung nicht angemessen, müssen Sie die Kosten möglichst senken.",
      id: "monatliche-ausgaben",
      next: () => 4,
      previous: 2,
      title: "Ihre Monatlichen Ausgaben",
    },
    4: {
      description:
        "Geben Sie hier bitte jeweils Ihr Brutto- und Nettoeinkommen (bitte beide Werte eintragen) an und wenn zutreffend ebenfalls das Ihrer Partnerin /Ihres Partners.",
      id: "monatliches-einkommen",
      next: () => 5,
      previous: 3,
      title: "Einkommen aus Erwerbstätigkeit",
    },
    5: {
      description:
        "Hierzu zählen zum Beispiel Arbeitslosengeld I, Krankengeld, Elterngeld über dem Freibetrag von 300 Euro, Unterhalt und Unterhaltsvorschuss vom Jugendamt, Renten, Einnahmen aus Vermietung, Zinsen oder Steuererstattungen.",
      id: "weiteres-einkommen",
      next: () => 6,
      previous: 4,
      title: "Weiteres Einkommen",
    },
    6: {
      description: "Ihre Berechnungsergebnisse",
      id: "ergebnis",
      next: () => 6,
      previous: 5,
      title: "Ergebnis",
    },
    // Schwangerschaft und diverse andere Fragen fehlen
  },
};

export default function StepPage() {
  return (
    <main className="flex flex-col sm:gap-12 min-h-dvh mx-auto max-w-3xl relative">
      <StepsProvider value={stepsConfig}>
        {Object.entries(stepsConfig.steps).map(([id, step]) => (
          <Step id={step.id} key={id} step={step} />
        ))}
      </StepsProvider>
      <div className="fixed bottom-0 inset-x-0 px-8 py-8 flex justify-between items-center backdrop-blur text-zinc-400">
        <div className="">
          <Button variant="ghost">
            <BoltIcon className="w-5 h-5" />
          </Button>
        </div>
        <ul className="flex gap-2">
          {Object.entries(stepsConfig.steps).map(([id, step]) => (
            <li className="w-2 h-2 rounded-full bg-zinc-500" key={id} />
          ))}
        </ul>
        <div className="">
          <Button variant="ghost">
            <HelpCircleIcon className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </main>
  );
}
