import {
  ArrowLeftIcon,
  CircleHelpIcon,
  ExternalLinkIcon,
  FileTextIcon,
  HandCoinsIcon,
  LandmarkIcon,
  PiggyBankIcon,
  RotateCwIcon,
  ScaleIcon,
  ShareIcon,
  UsersIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const exampleInputs = [
  { icon: UsersIcon, label: "3 Personen" },
  { icon: PiggyBankIcon, label: "1.055,00 € Einnahmen" },
  {
    icon: HandCoinsIcon,
    label: "550,00 € Kosten für Unterkunft und Heizung",
  },
  { icon: ScaleIcon, label: "348,00 € Freibeträge" },
  { icon: LandmarkIcon, label: "Vermögen innerhalb der Freibeträge" },
];

// Fixed example values and inert controls keep this independent of the calculator.
export function ResultExample() {
  return (
    <div
      role="img"
      aria-label="Statische Vorschau des Berechnungsergebnisses: drei Personen mit einem möglichen Grundsicherungsanspruch von 1.298,02 Euro."
    >
      <div
        inert
        aria-hidden="true"
        className="flex w-full max-w-3xl flex-col gap-6 overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-sm [--step-spacing:--spacing(5)] sm:[--step-spacing:--spacing(6)]"
      >
        <div className="grid auto-rows-min grid-cols-[1fr_auto] items-start gap-x-4 gap-y-1 px-(--step-spacing) pt-(--step-spacing)">
          <h2 className="text-xl font-semibold tracking-tight text-balance sm:text-2xl">
            Ihr Berechnungsergebnis
          </h2>
          <Button
            aria-label="Hilfe"
            className="rounded-full"
            size="icon-sm"
            type="button"
            variant="ghost"
          >
            <CircleHelpIcon />
          </Button>
        </div>
        <div className="grow px-(--step-spacing) pb-(--step-spacing)">
          <div className="flex flex-col gap-2">
            <div className="grid h-8 w-full grid-cols-3 items-center rounded-lg bg-muted p-[3px] text-xs font-medium sm:text-sm">
              <span className="flex h-[calc(100%-1px)] items-center justify-center rounded-md border border-transparent bg-background px-1.5 py-0.5 text-foreground shadow-sm">
                Ergebnis
              </span>
              <span className="px-1.5 py-0.5 text-center text-foreground/60">
                Berechnung
              </span>
              <span className="px-1.5 py-0.5 text-center text-foreground/60">
                Unterlagen
              </span>
            </div>
            <div className="grid grid-cols-1 grid-rows-2 gap-5 py-6 md:grid-cols-2">
              <div className="flex items-center">
                <p className="text-base leading-7 text-muted-foreground">
                  Auf Basis Ihrer Angaben sehen Sie die mögliche Höhe des
                  Grundsicherungsgeldes. Ob Sie tatsächlich Anspruch haben,
                  hängt von weiteren Faktoren ab. Bitte beachten Sie, dass es
                  sich hierbei um eine unverbindliche Berechnung handelt.
                </p>
              </div>
              <div className="row-span-2 flex flex-col justify-center rounded-2xl bg-green-50 px-4 text-center ring-1 ring-inset ring-green-200 sm:px-8 lg:py-16">
                <p className="flex items-baseline justify-center gap-x-2">
                  <span className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                    1.298,02 €
                  </span>
                </p>
                <div className="mt-10 flex flex-col justify-end gap-4">
                  <Button type="button" variant="outline">
                    <FileTextIcon data-icon="inline-start" />
                    Benötigte Dokumente
                  </Button>
                  <Button type="button">
                    <ExternalLinkIcon data-icon="inline-start" />
                    Jetzt beantragen
                  </Button>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-x-4">
                  <h4 className="flex-none text-sm font-semibold leading-6 text-primary">
                    Ihre Eingaben
                  </h4>
                  <Separator className="flex-1" />
                </div>
                <ul className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-muted-foreground sm:grid-cols-2 sm:gap-6">
                  {exampleInputs.map(({ icon: Icon, label }) => (
                    <li className="flex gap-x-3" key={label}>
                      <Icon
                        aria-hidden="true"
                        className="h-6 w-5 flex-none text-primary"
                      />
                      {label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <Button className="w-full" type="button" variant="secondary">
            <ShareIcon data-icon="inline-start" />
            Teilen
          </Button>
        </div>
        <div className="mt-auto flex items-center justify-between gap-3 border-t bg-muted/35 px-(--step-spacing) py-4">
          <Button
            className="min-w-28"
            size="lg"
            type="button"
            variant="secondary"
          >
            <ArrowLeftIcon data-icon="inline-start" />
            Zurück
          </Button>
          <Button size="lg" type="button" variant="secondary">
            <RotateCwIcon data-icon="inline-start" />
            Neu starten
          </Button>
        </div>
      </div>
    </div>
  );
}
