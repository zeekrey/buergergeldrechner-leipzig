"use client";

import { ReactNode, useMemo, useTransition } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { StepContent, StepNavigation } from "@/components/ui/step-primitives";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
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
import { calculateBaseNeed, calculateOverall } from "@/lib/calculation";
import { useRouter } from "next/navigation";
import { useStateContext } from "@/components/context";
import { allowanceType, incomeType, TStepContext } from "@/lib/types";
import { Result } from "./result";
import { Button } from "@/components/ui/button";
import HelpMarkdown from "@/config/steps/ergebnis.mdx";
import Link from "next/link";
import { createShareable } from "./actions";
import { toast } from "sonner";

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
  const [isPending, startTransition] = useTransition();

  const { allowance, income, overall } = useMemo(
    () => calculateOverall(state),
    [state]
  );

  const allowanceSum = useMemo(
    () => allowance.reduce((acc, curr) => acc + (curr.amount ?? 0), 0),
    [allowance]
  );

  const handleBack = useCallback(() => {
    push(`${stepsConfig[step.previous].id}`);
  }, [state]);

  const handleReset = useCallback(() => {
    setState(initialStepsState.context);
    localStorage.removeItem("state");
  }, []);

  const onCreateShareableClick = () => {
    startTransition(async () => {
      const result = await createShareable(JSON.stringify(state));
      if (result.success) {
        const data = JSON.parse(result.data);
        const { origin } = new URL(window.location.href);

        toast("Teilbarer Link wurde erstellt.", {
          description:
            "Auf Kopieren klicken um den Link in die Zwischenablage zu kopieren.",
          action: {
            label: "Kopieren",
            onClick: async () =>
              await navigator.clipboard.writeText(
                `${origin}/share/${data.alias}`
              ),
          },
        });
      } else console.warn(result.error);
    });
  };

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
              communitySize={state.community.length}
              income={income.sum}
              spendings={state.spendings.sum}
              allowance={allowanceSum}
              overall={overall}
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
                    <ResultSheet state={state} />
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
        <Button onClick={onCreateShareableClick} disabled={isPending}>
          Teilen
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

export function ResultSheet({ state }: { state: TStepContext }) {
  const baseNeed = useMemo(() => calculateBaseNeed(state), [state]);
  const {
    need,
    allowance,
    additionalNeeds,
    income,
    incomeAfterAllowance,
    overall,
  } = useMemo(() => calculateOverall(state), [state]);

  const allowanceSum = useMemo(
    () => allowance.reduce((acc, curr) => acc + (curr.amount ?? 0), 0),
    [allowance]
  );

  const additionalsCount = useMemo(
    () =>
      additionalNeeds.community.reduce((acc, curr) => {
        return acc + curr.additionals.length;
      }, 0),
    []
  );

  const incomeCount = useMemo(
    () =>
      state.community.reduce((acc, curr) => {
        return acc + curr.income.length;
      }, 0),
    []
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Kategorie</TableHead>
          <TableHead colSpan={2}>Position</TableHead>
          <TableHead className="text-right">Betrag</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* Base need */}
        {baseNeed.community.map((item, index) => (
          <TableRow key={`income-${index}`}>
            {index === 0 && (
              <TableCell
                rowSpan={baseNeed.community.length + 1}
                className="font-medium"
              >
                Regelbedarf
              </TableCell>
            )}
            <TableCell colSpan={2}>{item.name}</TableCell>
            <TableCell className="text-right">
              {item.amount.toLocaleString("de-DE", {
                style: "currency",
                currency: "EUR",
              })}
            </TableCell>
          </TableRow>
        ))}
        <TableRow className="font-medium">
          <TableCell colSpan={2}>Summe</TableCell>
          <TableCell className="text-right">
            {baseNeed.sum.toLocaleString("de-DE", {
              style: "currency",
              currency: "EUR",
            })}
          </TableCell>
        </TableRow>
        {/* Additional need */}
        {additionalNeeds.community.map((person, personIndex) =>
          person.additionals.map((additionalNeed, needIndex) => (
            <TableRow key={person.name + additionalNeed.name}>
              {personIndex === 0 && needIndex === 0 && (
                <TableCell
                  className="font-medium"
                  rowSpan={additionalsCount + 1}
                >
                  Mehrbedarfe
                </TableCell>
              )}
              {needIndex === 0 && (
                <TableCell
                  className="font-medium"
                  rowSpan={person.additionals.length}
                >
                  {person.name}
                </TableCell>
              )}
              <TableCell className="font-medium">
                {additionalNeed.name}
              </TableCell>
              <TableCell className="font-medium text-right">
                {additionalNeed.amount.toLocaleString("de-DE", {
                  style: "currency",
                  currency: "EUR",
                })}
              </TableCell>
            </TableRow>
          ))
        )}
        {Boolean(additionalNeeds.community.length) && (
          <TableRow className="font-medium">
            <TableCell colSpan={2}>Summe</TableCell>
            <TableCell className="text-right">
              {additionalNeeds.sum.toLocaleString("de-DE", {
                style: "currency",
                currency: "EUR",
              })}
            </TableCell>
          </TableRow>
        )}
        {/* spendings */}
        {state.spendings.sum > 0 && (
          <>
            <TableRow>
              <TableCell rowSpan={4} className="font-medium">
                Kosten für Unterkunft und Heizung
              </TableCell>
              <TableCell colSpan={2}>
                Kaltmiete (Schuldzins bei Wohneigentum)
              </TableCell>
              <TableCell className="text-right">
                {state.spendings.rent.toLocaleString("de-DE", {
                  style: "currency",
                  currency: "EUR",
                })}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Nebenkosten</TableCell>
              <TableCell className="text-right">
                {state.spendings.utilities.toLocaleString("de-DE", {
                  style: "currency",
                  currency: "EUR",
                })}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Heizkosten</TableCell>
              <TableCell className="text-right">
                {state.spendings.heating.toLocaleString("de-DE", {
                  style: "currency",
                  currency: "EUR",
                })}
              </TableCell>
            </TableRow>
            <TableRow className="font-medium">
              <TableCell colSpan={2}>Summe</TableCell>
              <TableCell className="text-right">
                {state.spendings.sum.toLocaleString("de-DE", {
                  style: "currency",
                  currency: "EUR",
                })}
              </TableCell>
            </TableRow>
          </>
        )}
        {/* sub sum needs */}
        <TableRow className="font-medium bg-muted">
          <TableCell colSpan={3}>Summe aller Bedarfe</TableCell>
          <TableCell className="text-right">
            {need.toLocaleString("de-DE", {
              style: "currency",
              currency: "EUR",
            })}
          </TableCell>
        </TableRow>
        {/* income */}
        {state.community.map((person, personIndex) =>
          person.income.map(
            (income, incomeIndex) =>
              person.income.length && (
                <TableRow key={income.id}>
                  {personIndex === 0 && incomeIndex === 0 && (
                    <TableCell
                      className="font-medium"
                      rowSpan={incomeCount + 1}
                    >
                      Einkommen
                    </TableCell>
                  )}
                  {incomeIndex === 0 && (
                    <TableCell
                      className="font-medium"
                      rowSpan={person.income.length}
                    >
                      {person.name}
                    </TableCell>
                  )}
                  <TableCell className="font-medium">
                    {incomeType[income.type].label}
                  </TableCell>
                  <TableCell className="font-medium text-right">
                    {income.amount.toLocaleString("de-DE", {
                      style: "currency",
                      currency: "EUR",
                    })}
                  </TableCell>
                </TableRow>
              )
          )
        )}
        {incomeCount > 0 && (
          <TableRow className="font-medium">
            <TableCell colSpan={2}>Summe</TableCell>
            <TableCell className="text-right">
              {income.sum.toLocaleString("de-DE", {
                style: "currency",
                currency: "EUR",
              })}
            </TableCell>
          </TableRow>
        )}
        {/* allowance */}
        {allowance.map((_allowance, index) => (
          <TableRow key={index}>
            {index === 0 && (
              <TableCell className="font-medium" rowSpan={allowance.length + 1}>
                Freibeträge
              </TableCell>
            )}
            <TableCell className="font-medium" colSpan={2}>
              {allowanceType[_allowance.type].label} (
              {
                state.community.find((pers) => pers.id === _allowance.personId)
                  ?.name
              }
              )
            </TableCell>
            <TableCell className="font-medium text-right">
              {_allowance.amount?.toLocaleString("de-DE", {
                style: "currency",
                currency: "EUR",
              })}
            </TableCell>
          </TableRow>
        ))}
        {Boolean(allowance.length > 0) && (
          <TableRow className="font-medium">
            <TableCell colSpan={2}>Summe</TableCell>
            <TableCell className="text-right">
              {allowanceSum.toLocaleString("de-DE", {
                style: "currency",
                currency: "EUR",
              })}
            </TableCell>
          </TableRow>
        )}
        {/* sub sum income */}
        {incomeAfterAllowance > 0 && (
          <TableRow className="font-medium bg-muted">
            <TableCell colSpan={3}>
              Summe aller Einkommen (abzgl. Freibeträge)
            </TableCell>
            <TableCell className="text-right">
              {incomeAfterAllowance.toLocaleString("de-DE", {
                style: "currency",
                currency: "EUR",
              })}
            </TableCell>
          </TableRow>
        )}
        {/* overall sum  */}
        <TableRow className="bg-primary font-bold ">
          <TableCell colSpan={3}>Bürgergeldanspruch</TableCell>
          <TableCell className="text-right">
            {overall.toLocaleString("de-DE", {
              style: "currency",
              currency: "EUR",
            })}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
