import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CircleHelpIcon,
  XCircleIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";

// Presentation only: no questionnaire primitives, state, navigation, or help chat.
export function StepExample() {
  return (
    <div
      role="img"
      aria-label="Statische Vorschau der Frage zur Kinderanzahl mit zwei Kindern."
    >
      <div
        inert
        aria-hidden="true"
        className="flex w-full max-w-3xl flex-col gap-6 overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-sm [--step-spacing:--spacing(5)] sm:[--step-spacing:--spacing(6)]"
      >
        <div className="grid auto-rows-min grid-cols-[1fr_auto] items-start gap-x-4 gap-y-1 px-(--step-spacing) pt-(--step-spacing)">
          <h2 className="text-xl font-semibold tracking-tight text-balance sm:text-2xl">
            Wie viele Kinder leben in Ihrem Haushalt?
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
        <p className="-mt-4 px-(--step-spacing) text-sm text-muted-foreground">
          Die Höhe des Grundsicherungsbedarfs richtet sich unter anderem nach
          der Anzahl und dem Alter der Kinder, die in Ihrem Haushalt leben.
        </p>
        <div>
          <div className="px-(--step-spacing) pb-(--step-spacing)">
            <div className="sm:h-[200px]">
              {["Kind 1", "Kind 2"].map((name) => (
                <div className="flex items-center gap-3 py-1" key={name}>
                  <div className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm">
                    {name}
                  </div>
                  <Button
                    aria-label={`${name} entfernen`}
                    type="button"
                    variant="outline"
                  >
                    <XCircleIcon />
                  </Button>
                </div>
              ))}
              <div className="pt-1">
                <Button
                  className="h-10 w-full justify-between rounded-md border border-dashed border-input bg-background px-3 py-2 text-input"
                  type="button"
                  variant="ghost"
                >
                  Kind hinzufügen
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-auto flex items-center justify-between gap-3 border-t bg-muted/35 px-(--step-spacing) py-4">
            <Button
              className="min-w-28"
              size="lg"
              type="button"
              variant="outline"
            >
              <ArrowLeftIcon data-icon="inline-start" />
              Zurück
            </Button>
            <Button
              className="min-w-0 flex-1 sm:min-w-40 sm:flex-none"
              size="lg"
              type="button"
            >
              Weiter
              <ArrowRightIcon data-icon="inline-end" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
