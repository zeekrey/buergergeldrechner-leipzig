import { calculateOverall } from "calculation";
import { ChevronDownIcon } from "lucide-react";
import { useMemo } from "react";

import { ResultSheet } from "@/app/antrag/ergebnis/result-sheet";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { hasCompleteAges } from "@/lib/complete-context";

import { useStateContext } from "./context";
import { Progress } from "./progress";
import { ScrollArea } from "./ui/scroll-area";

export function StatusBar() {
  const [state] = useStateContext();

  const calculation = useMemo(
    () => (hasCompleteAges(state) ? calculateOverall(state) : undefined),
    [state]
  );

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button
          className="group w-full border-t bg-muted/20 text-left transition-colors hover:bg-muted/35"
          type="button"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0 flex-1">
              <Progress />
            </div>
            <div className="flex items-center justify-between gap-4 rounded-xl border bg-background/80 px-4 py-3 shadow-xs">
              <div className="flex flex-col gap-1">
                <small className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  Möglicher Anspruch
                </small>
                <strong className="text-base font-semibold sm:text-lg">
                  {calculation?.resultStatus === "manual-review"
                    ? "Prüfung erforderlich"
                    : calculation
                      ? calculation.overall.toLocaleString("de-DE", {
                          currency: "EUR",
                          style: "currency",
                        })
                      : "Alter noch offen"}
                </strong>
              </div>
              <ChevronDownIcon className="size-4 text-muted-foreground transition-colors group-hover:text-foreground" />
            </div>
          </div>
        </button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[80%]">
        <DrawerHeader className="mx-auto w-full max-w-4xl px-4 sm:px-6">
          <DrawerTitle>Ihre aktuellen Eingaben</DrawerTitle>
          <DrawerDescription>
            Bei der Darstellung handelt es sich um eine unverbindliche
            Vorabberechnung. Ihren tatsächlichen Anspruch auf Grundsicherungsgeld
            kann nur das Jobcenter prüfen.
          </DrawerDescription>
        </DrawerHeader>
        <div className="mx-auto w-full max-w-4xl px-4 pb-6 sm:px-6">
          <ScrollArea className="h-[480px]">
            {calculation ? (
              <ResultSheet state={state} />
            ) : (
              <p className="text-sm text-muted-foreground">
                Tragen Sie zuerst das Alter aller Personen ein, damit eine
                Berechnung möglich ist.
              </p>
            )}
          </ScrollArea>
        </div>
        <DrawerFooter />
      </DrawerContent>
    </Drawer>
  );
}
