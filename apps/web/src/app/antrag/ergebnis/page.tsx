"use client";

import { ReactNode, useMemo } from "react";
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
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  BabyIcon,
  CheckCircle2Icon,
  ChevronsUpDownIcon,
  LifeBuoyIcon,
  PhoneCallIcon,
  SaveIcon,
  UsersIcon,
} from "lucide-react";
import {
  StepRoot,
  StepTitle,
  StepDescription,
} from "@/components/ui/step-primitives";
import { stepsConfig } from "@/lib/machine";
import { useCallback } from "react";
import { incomeType } from "@/lib/types";

const step = stepsConfig[8];

import { Separator } from "../../../components/ui/separator";
import {
  calculateAllowance,
  calculateCommunityNeed,
  calculateOverall,
} from "@/lib/calculation";
import { useRouter } from "next/navigation";
import { flattenIncome } from "@/lib/utils";

const SectionCard = ({
  name,
  amount,
  description,
  children,
}: {
  name: string;
  amount: number;
  description: string;
  children: ReactNode;
}) => (
  <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
    <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
      <h3 className="tracking-tight text-sm font-medium">{name}</h3>
      {children}
    </div>
    <div className="p-6 pt-0">
      <div className="text-2xl font-bold">
        {amount.toLocaleString("de-DE", { currency: "EUR", style: "currency" })}
      </div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  </div>
);

export default function StepSummary() {
  const { push } = useRouter();
  const [state, dispatch] = useStepsMachine();

  const need = useMemo(
    () => calculateCommunityNeed(state.context),
    [state.context]
  );

  const result = useMemo(
    () => calculateOverall(state.context),
    [state.context]
  );

  const income = useMemo(
    () => flattenIncome(state.context.community),
    [state.context]
  );

  const allowance = useMemo(
    () => calculateAllowance(state.context),
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
                {result.overall.toLocaleString("de-DE", {
                  style: "currency",
                  currency: "EUR",
                })}
              </div>
            </div>
            <CheckCircle2Icon className="text-green-600" />
          </div>

          <Table>
            <TableBody>
              {/* Regelbedarf */}
              <TableRow>
                <TableHead className="w-full">Regelbedarf</TableHead>
                <TableHead className="text-right">
                  {need.need.toLocaleString("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </TableHead>
              </TableRow>
              {need.community.map((person) => (
                <TableRow className="border-none" key={person.name}>
                  <TableCell className="py-2 text-xs">{person.name}</TableCell>
                  <TableCell className="py-2 text-xs text-right">
                    {person.amount.toLocaleString("de-DE", {
                      style: "currency",
                      currency: "EUR",
                    })}
                  </TableCell>
                </TableRow>
              ))}
              {/* Ausgaben */}
              <TableRow>
                <TableHead>Ausgaben</TableHead>
                <TableHead className="text-right">
                  {state.context.spendings.sum.toLocaleString("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </TableHead>
              </TableRow>
              <TableRow className="border-none">
                <TableCell className="py-2 text-xs">Kaltmiete</TableCell>
                <TableCell className="py-2 text-xs text-right">
                  {state.context.spendings.rent.toLocaleString("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </TableCell>
              </TableRow>
              <TableRow className="border-none">
                <TableCell className="py-2 text-xs">Nebenkosten</TableCell>
                <TableCell className="py-2 text-xs text-right">
                  {state.context.spendings.utilities.toLocaleString("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </TableCell>
              </TableRow>
              <TableRow className="border-none">
                <TableCell className="py-2 text-xs">Heizkosten</TableCell>
                <TableCell className="py-2 text-xs text-right">
                  {state.context.spendings.heating.toLocaleString("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </TableCell>
              </TableRow>
              {/* Einkommen */}
              <TableRow>
                <TableHead>Einkommen</TableHead>
                <TableHead className="text-right">
                  {result.income.toLocaleString("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </TableHead>
              </TableRow>
              {state.context.community.map((person) => (
                <>
                  {person.income?.map((income) => (
                    <TableRow className="border-none" key={person.id}>
                      <TableCell className="py-2 text-xs">
                        {person.name} ({income.type})
                      </TableCell>
                      <TableCell className="py-2 text-xs text-right">
                        {income.amount.toLocaleString("de-DE", {
                          style: "currency",
                          currency: "EUR",
                        })}
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              ))}
              {/* Freibeträge */}
              <TableRow>
                <TableHead>Freibeträge</TableHead>
                <TableHead className="text-right">
                  {result.allowance
                    .reduce((acc, curr) => acc + curr.amount, 0)
                    .toLocaleString("de-DE", {
                      style: "currency",
                      currency: "EUR",
                    })}
                </TableHead>
              </TableRow>
              {allowance.map((person) => (
                <TableRow className="border-none" key={person.id}>
                  <TableCell className="py-2 text-xs">{person.type}</TableCell>
                  <TableCell className="py-2 text-xs text-right">
                    {person.amount.toLocaleString("de-DE", {
                      style: "currency",
                      currency: "EUR",
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell>Bürgergeldanspruch</TableCell>
                <TableCell className="text-right">
                  {result.overall.toLocaleString("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>

          {/* <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <SectionCard
              name="Regelbedarf"
              amount={result.need}
              description="dwq"
            >
              <UsersIcon className="w-4 h-4" />
            </SectionCard>
          </div> */}
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
              <div className="space-y-2 text-sm">
                <h4>
                  Die Bedarfsgemeinschaft besteht aus{" "}
                  {state.context.community.length} Personen
                </h4>
                <div className="grid grid-cols-3 gap-4 text-xs">
                  {state.context.community.map((person) => (
                    <div className="border rounded-sm">
                      <div className="bg-muted/70 p-2 flex justify-between">
                        <div className="font-bold">{person.name}</div>
                        <BabyIcon className="w-4 h-4" />
                      </div>
                      <div className="p-2">{person.type}</div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between">
                  <div className="font-bold">
                    Daraus ergebender Regelbedarf (Stand 2024)
                  </div>
                  <div className="font-bold">
                    {result.need.toLocaleString("de-DE", {
                      style: "currency",
                      currency: "EUR",
                    })}
                  </div>
                </div>

                <Separator />

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
                <div className="flex justify-between">
                  <div className="font-bold">Ihre monatlichen Ausgaben</div>
                  <div className="font-bold">
                    {state.context.spendings.sum.toLocaleString("de-DE", {
                      style: "currency",
                      currency: "EUR",
                    })}
                  </div>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <div className="font-bold">Gesamtbedarf</div>
                  <div>
                    Summe:{" "}
                    {result.spendingNeed.toLocaleString("de-DE", {
                      style: "currency",
                      currency: "EUR",
                    })}
                  </div>
                </div>
                <Separator />
                <Table>
                  <TableCaption>
                    Monatliches Einkommen Ihrer Bedarfsgemeinschaft
                  </TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Person</TableHead>
                      <TableHead className="w-[320px]">Einkommensart</TableHead>
                      <TableHead className="w-[180px]">
                        Betrag (Freibetrag)
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {income.map((person, index) => (
                      <TableRow key={person.id}>
                        <TableCell>{person.name}</TableCell>
                        <TableCell>{incomeType[person.type].label}</TableCell>
                        <TableCell className="">
                          {person.amount.toLocaleString("de-DE", {
                            style: "currency",
                            currency: "EUR",
                          })}
                          {person.type === "EmploymentIncome" && (
                            <>
                              {" "}
                              (
                              {person.allowance.toLocaleString("de-DE", {
                                style: "currency",
                                currency: "EUR",
                              })}
                              )
                            </>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell
                        className="text-center"
                        colSpan={5}
                      ></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <Separator />
                <div className="flex justify-between">
                  <div className="font-bold">Gesamteinkommen</div>
                  <div>
                    Summe:{" "}
                    {result.income.toLocaleString("de-DE", {
                      style: "currency",
                      currency: "EUR",
                    })}
                  </div>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <div className="font-bold">Freibeträge</div>
                  <div>Summe: 0</div>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <div className="font-bold">Anpruch</div>
                  <div>
                    Summe:{" "}
                    {result.overall.toLocaleString("de-DE", {
                      style: "currency",
                      currency: "EUR",
                    })}
                  </div>
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