"use client";

import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { StepContent, StepNavigation } from "@/components/ui/step-primitives";
import { useStepsMachine } from "@/lib/machine";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  CheckCircle2Icon,
  ChevronsUpDownIcon,
  LifeBuoyIcon,
  PhoneCallIcon,
  SaveIcon,
} from "lucide-react";
import {
  StepRoot,
  StepTitle,
  StepDescription,
} from "@/components/ui/step-primitives";
import { stepsConfig } from "@/lib/machine";
import { useCallback } from "react";

const step = stepsConfig[8];

import { Separator } from "../../../components/ui/separator";
import { calculateOverall } from "@/lib/calculation";
import { useRouter } from "next/navigation";

export default function StepSummary() {
  const { push } = useRouter();
  const [state, dispatch] = useStepsMachine();

  const result = useMemo(
    () => calculateOverall(state.context),
    [state.context]
  );

  const handleBack = useCallback(() => {
    dispatch({ type: "previous" });

    const previousStep = stepsConfig[state.currentStep].previous;
    push(`${stepsConfig[previousStep].id}`);
  }, [state]);

  return (
    <StepRoot id={step.id}>
      <StepTitle>{step.title}</StepTitle>
      <StepDescription>{step.description}</StepDescription>
      <StepContent>
        <ScrollArea className="sm:h-[380px]">
          <div className="flex justify-between items-center p-4 mb-4 bg-green-100 dark:bg-green-900 rounded-lg border border-green-300 dark:border-green-700">
            <div>
              <div className="text-sm">Ihr möglicher Bürgergeld-Anspruch</div>
              <div className="text-xl font-bold">
                {result.toLocaleString("de-DE", {
                  style: "currency",
                  currency: "EUR",
                })}
              </div>
            </div>
            <CheckCircle2Icon className="text-green-600" />
          </div>
          <div>
            <h2 className="font-bold mb-2">Wie geht es weiter?</h2>
            <p className=" text-muted-foreground">
              Ihre Eingaben wurden nicht übermittelt. Um tatsächlich Bürgergeld
              zu beantragen, können Sie dieses Ergebnis speichern und eine Liste
              mit notwendigen Dokumenten erzeugen. Sollten Sie noch Fragen
              haben, können Sie gerne mit uns Kontakt aufnahmenen.
            </p>
            <div className="flex py-6 gap-3">
              <Button
                className="flex-col px-4 h-16 flex-grow"
                variant="outline"
              >
                <SaveIcon className="w-4 h-4" />
                <div className="text-sm">Ergebnis speichern</div>
              </Button>
              <Button
                className="flex-col px-4 h-auto flex-grow"
                variant="outline"
              >
                <PhoneCallIcon className="w-4 h-4" />
                <div className="text-sm">Kontakt aufnahmen</div>
              </Button>
              <Button
                className="flex-col px-4 h-auto flex-grow"
                variant="outline"
              >
                <LifeBuoyIcon className="w-4 h-4" />
                <div className="text-sm">Weitere Informationen</div>
              </Button>
            </div>
          </div>
          <Collapsible>
            <CollapsibleTrigger asChild>
              <Button
                className="flex justify-between w-full"
                type="button"
                variant="outline"
              >
                <div>Ihre Eingaben</div>
                <ChevronsUpDownIcon className="h-4 w-4" />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="space-y-2 text-sm px-2 py-4">
                <div className="flex justify-between">
                  <div className="font-bold">
                    Leben Sie in einer Partnerschaft?
                  </div>
                  <div className="font-bold">
                    {state.context.community.length === 1 ? "Nein" : "Ja"}
                  </div>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <div className="font-bold">Haben Sie Kinder?</div>
                  <div className="font-bold">
                    {state.context.community.filter(
                      (pers) => pers.type === "child"
                    ).length === 0
                      ? "Nein"
                      : "Ja"}
                  </div>
                </div>
                {state.context.community
                  .filter((pers) => pers.type === "child")
                  ?.map((kind, index) => (
                    <div
                      className="flex justify-between pl-2 border-l"
                      key={kind.id}
                    >
                      <div>{index + 1}.Kind</div>
                      <div>{}</div>
                    </div>
                  ))}
                <Separator />
                <div className="flex justify-between">
                  <div className="font-bold">Ihre monatlichen Ausgaben</div>
                  <div className="font-bold">800,00€</div>
                </div>
                <div className="flex justify-between pl-2 border-l">
                  <div>Heizkosten</div>
                  <div>{state.context.spendings.heating}</div>
                </div>
                <div className="flex justify-between pl-2 border-l">
                  <div>Kaltmiete</div>
                  <div>{state.context.spendings.rent}</div>
                </div>
                <div className="flex justify-between pl-2 border-l">
                  <div>Nebenkosten</div>
                  <div>{state.context.spendings.utilities}</div>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <div className="font-bold">Ihre monatlichen Einnahmen</div>
                  <div>Summe: {state.context.income.sum}</div>
                  <div>Freibetrag: {state.context.income.allowance}</div>
                </div>
                <Separator />
              </div>
            </CollapsibleContent>
          </Collapsible>
        </ScrollArea>
      </StepContent>
    </StepRoot>
  );
}
