"use client";

import { Fragment, ReactNode, useMemo } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { StepContent, StepNavigation } from "@/components/ui/step-primitives";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeftCircleIcon, RotateCwIcon } from "lucide-react";
import { StepRoot, StepTitle } from "@/components/ui/step-primitives";
import { initialStepsState, stepsConfig } from "@/lib/machine";
import { useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  calculateAdditionalNeeds,
  calculateAllowance,
  calculateChildBenefitTransfer,
  calculateCommunityNeed,
  calculateOverall,
} from "@/lib/calculation";
import { useRouter } from "next/navigation";
import { useStateContext } from "@/components/context";
import { incomeType } from "@/lib/types";
import { Result } from "./result";
import { Button } from "@/components/ui/button";
import HelpMarkdown from "@/config/steps/ergebnis.mdx";
import Link from "next/link";

const step = stepsConfig[9];

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
  const [state, setState] = useStateContext();

  const communitySize = useMemo(() => state.community.length, [state]);
  const need = useMemo(() => calculateCommunityNeed(state), [state]);
  const additionalNeeds = useMemo(
    () => calculateAdditionalNeeds(state),
    [state]
  );
  const result = useMemo(() => calculateOverall(state), [state]);
  const allowance = useMemo(() => calculateAllowance(state), [state]);
  const allowanceSum = useMemo(
    () => result.allowance.reduce((acc, curr) => acc + (curr.amount ?? 0), 0),
    [allowance]
  );

  const childBenefitTransfer = useMemo(
    () => calculateChildBenefitTransfer(state),
    [state]
  );

  const childBenefitTransferSum = useMemo(
    () => childBenefitTransfer.reduce((acc, curr) => acc + curr.amount, 0),
    [state]
  );

  const additionalNeedsSum = useMemo(
    () =>
      additionalNeeds.reduce((totalSum, item) => {
        // Sum the values of additionals for the current item
        const additionalsSum = item.additionals.reduce(
          (sum, additional) => sum + additional.amount,
          0
        );
        return totalSum + additionalsSum; // Add to the total sum
      }, 0),
    [additionalNeeds]
  );

  const handleBack = useCallback(() => {
    push(`${stepsConfig[step.previous].id}`);
  }, [state]);

  const handleReset = useCallback(() => {
    setState(initialStepsState.context);
    localStorage.removeItem("state");
  }, []);

  return (
    <StepRoot id={step.id}>
      <StepTitle title={step.title}>
        <HelpMarkdown />
      </StepTitle>
      <StepContent>
        <Tabs defaultValue="result">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="result">Ergebnis</TabsTrigger>
            <TabsTrigger value="calculation">Berechnung</TabsTrigger>
          </TabsList>
          <TabsContent value="result">
            <Result
              communitySize={communitySize}
              income={result.income}
              spendings={state.spendings.sum}
              allowance={allowanceSum}
              overall={result.overall}
            />
          </TabsContent>
          <TabsContent value="calculation" data-testid="result-calculation">
            <div className="pb-8">
              <ScrollArea className="sm:h-[380px]">
                <Card className="overflow-hidden">
                  <CardHeader className="flex flex-row items-start bg-muted/50">
                    <div className="grid gap-0.5">
                      <CardTitle className="group flex items-center gap-2 text-lg">
                        Berechnungsergebnis
                      </CardTitle>
                      <CardDescription>
                        Erstellungsdatum:{" "}
                        {new Intl.DateTimeFormat("de-DE").format(Date.now())}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 text-sm">
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
                            <TableCell className="py-2 text-xs">
                              {person.name}
                            </TableCell>
                            <TableCell className="py-2 text-xs text-right">
                              {person.amount.toLocaleString("de-DE", {
                                style: "currency",
                                currency: "EUR",
                              })}
                            </TableCell>
                          </TableRow>
                        ))}
                        {/* Mehrbedarf */}
                        <TableRow>
                          <TableHead className="w-full">Mehrbedarf</TableHead>
                          <TableHead className="text-right">
                            {additionalNeedsSum.toLocaleString("de-DE", {
                              style: "currency",
                              currency: "EUR",
                            })}
                          </TableHead>
                        </TableRow>
                        {additionalNeeds.map((need) => (
                          <Fragment key={need.additionals + need.personId}>
                            {need.additionals.map((additional) => (
                              <TableRow className="border-none">
                                <TableCell className="py-2 text-xs">
                                  {need.name} ({additional.name})
                                </TableCell>
                                <TableCell className="py-2 text-xs text-right">
                                  {additional.amount.toLocaleString("de-DE", {
                                    style: "currency",
                                    currency: "EUR",
                                  })}
                                </TableCell>
                              </TableRow>
                            ))}
                          </Fragment>
                        ))}
                        {/* Ausgaben */}
                        <TableRow>
                          <TableHead>
                            Kosten für Unterkunft und Heizung
                          </TableHead>
                          <TableHead className="text-right">
                            {state.spendings.sum.toLocaleString("de-DE", {
                              style: "currency",
                              currency: "EUR",
                            })}
                          </TableHead>
                        </TableRow>
                        <TableRow className="border-none">
                          <TableCell className="py-2 text-xs">
                            Kaltmiete (Schuldzins bei Wohneigentum)
                          </TableCell>
                          <TableCell className="py-2 text-xs text-right">
                            {state.spendings.rent.toLocaleString("de-DE", {
                              style: "currency",
                              currency: "EUR",
                            })}
                          </TableCell>
                        </TableRow>
                        <TableRow className="border-none">
                          <TableCell className="py-2 text-xs">
                            Nebenkosten
                          </TableCell>
                          <TableCell className="py-2 text-xs text-right">
                            {state.spendings.utilities.toLocaleString("de-DE", {
                              style: "currency",
                              currency: "EUR",
                            })}
                          </TableCell>
                        </TableRow>
                        <TableRow className="border-none">
                          <TableCell className="py-2 text-xs">
                            Heizkosten
                          </TableCell>
                          <TableCell className="py-2 text-xs text-right">
                            {state.spendings.heating.toLocaleString("de-DE", {
                              style: "currency",
                              currency: "EUR",
                            })}
                          </TableCell>
                        </TableRow>
                        {/* Gesamtbedarf */}
                        <TableRow className="bg-muted/50">
                          <TableHead>
                            Gesamtbedarf der Bedarfsgemeinschaft
                          </TableHead>
                          <TableHead className="text-right">
                            {(
                              need.need +
                              state.spendings.sum +
                              additionalNeedsSum
                            ).toLocaleString("de-DE", {
                              style: "currency",
                              currency: "EUR",
                            })}
                          </TableHead>
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
                        {state.community.map((person) => (
                          <Fragment key={person.id}>
                            {person.income?.map((income) => (
                              <TableRow className="border-none" key={income.id}>
                                <TableCell className="py-2 text-xs">
                                  {person.name} ({incomeType[income.type].label}
                                  )
                                </TableCell>
                                <TableCell className="py-2 text-xs text-right">
                                  {income.amount.toLocaleString("de-DE", {
                                    style: "currency",
                                    currency: "EUR",
                                  })}
                                </TableCell>
                              </TableRow>
                            ))}
                          </Fragment>
                        ))}
                        {/* Kindergeldübertrag */}
                        {}
                        <TableRow>
                          <TableHead>Kindergeldübertrag</TableHead>
                          <TableHead className="text-right">
                            {childBenefitTransferSum.toLocaleString("de-DE", {
                              style: "currency",
                              currency: "EUR",
                            })}
                          </TableHead>
                        </TableRow>
                        {childBenefitTransfer.map((transfer) => (
                          <TableRow className="border-none" key={transfer.name}>
                            <TableCell className="py-2 text-xs">
                              Kindergeldübertrag ({transfer.name})
                            </TableCell>
                            <TableCell className="py-2 text-xs text-right">
                              {transfer.amount?.toLocaleString("de-DE", {
                                style: "currency",
                                currency: "EUR",
                              })}
                            </TableCell>
                          </TableRow>
                        ))}
                        {/* Freibeträge */}
                        <TableRow>
                          <TableHead>Freibeträge</TableHead>
                          <TableHead className="text-right">
                            {allowanceSum.toLocaleString("de-DE", {
                              style: "currency",
                              currency: "EUR",
                            })}
                          </TableHead>
                        </TableRow>
                        {allowance.map((allowance) => (
                          <TableRow className="border-none" key={allowance.id}>
                            <TableCell className="py-2 text-xs">
                              {
                                {
                                  ...incomeType,
                                  insurance: { label: "Versicherung" },
                                  baseDeduction: {
                                    label: "Grundabsetzungsbetrag",
                                  },
                                }[allowance.type]?.label
                              }
                            </TableCell>
                            <TableCell className="py-2 text-xs text-right">
                              {allowance.amount?.toLocaleString("de-DE", {
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
                  </CardContent>
                  <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                    <div className="text-xs text-muted-foreground">
                      Es handelt sich um eine Beispielrechnung.
                    </div>
                  </CardFooter>
                </Card>
              </ScrollArea>
            </div>
          </TabsContent>
        </Tabs>
      </StepContent>
      <StepNavigation>
        <Button
          onClick={handleBack}
          size="lg"
          type="button"
          variant="secondary"
        >
          <ArrowLeftCircleIcon className="w-4 h-4 mr-3" />
          Zurück
        </Button>
        <Button variant="secondary" size="lg" asChild onClick={handleReset}>
          <Link href="/antrag/erwerbsfaehig">
            <RotateCwIcon className="w-4 h-4 mr-2" />
            Neu starten
          </Link>
        </Button>
      </StepNavigation>
    </StepRoot>
  );
}
