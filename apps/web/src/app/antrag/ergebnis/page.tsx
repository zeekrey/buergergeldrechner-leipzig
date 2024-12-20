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
import { ArrowLeftCircleIcon, RotateCwIcon, ShareIcon } from "lucide-react";
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
        <Button
          onClick={onCreateShareableClick}
          disabled={isPending}
          variant="secondary"
          className="w-full"
        >
          <ShareIcon className="w-4 h-4" /> Teilen
        </Button>
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
      <TableBody className="grid grid-cols-2 sm:grid-cols-4">
        {/* Base need */}
        <TableCell
          style={{
            gridRow: `span ${baseNeed.community.length + 1} / span ${
              baseNeed.community.length + 1
            }`,
          }}
          className="font-medium col-span-2 sm:col-span-1"
        >
          Regelbedarf
        </TableCell>
        {baseNeed.community.map((item, index) => (
          <>
            <TableCell className="sm:col-span-2">{item.name}</TableCell>
            <TableCell className="text-right">
              {item.amount.toLocaleString("de-DE", {
                style: "currency",
                currency: "EUR",
              })}
            </TableCell>
          </>
        ))}
        <TableCell className="sm:col-span-2 bg-muted/30 font-bold">
          Summe
        </TableCell>
        <TableCell className="text-right bg-muted/30 font-bold">
          {baseNeed.sum.toLocaleString("de-DE", {
            style: "currency",
            currency: "EUR",
          })}
        </TableCell>
        {/* Additional need */}
        {Boolean(additionalNeeds.community.length) && (
          <TableCell
            className="font-medium col-span-2 sm:col-span-1"
            style={{
              gridRow: `span ${additionalsCount + 1} / span ${
                additionalsCount + 1
              }`,
            }}
          >
            Mehrbedarfe
          </TableCell>
        )}
        {additionalNeeds.community.map((person, personIndex) => (
          <>
            <TableCell
              className="font-medium col-span-2 sm:col-span-1"
              style={{
                gridRow: `span ${person.additionals.length} / span ${person.additionals.length}`,
              }}
            >
              {person.name}
            </TableCell>
            {person.additionals.map((additionalNeed, needIndex) => (
              <>
                <TableCell className="font-medium">
                  {additionalNeed.name}
                </TableCell>
                <TableCell className="font-medium text-right">
                  {additionalNeed.amount.toLocaleString("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </TableCell>
              </>
            ))}
          </>
        ))}
        {Boolean(additionalNeeds.community.length) && (
          <>
            <TableCell className="sm:col-span-2 bg-muted/30 font-bold">
              Summe
            </TableCell>
            <TableCell className="text-right bg-muted/30">
              {additionalNeeds.sum.toLocaleString("de-DE", {
                style: "currency",
                currency: "EUR",
              })}
            </TableCell>
          </>
        )}
        {/* spendings */}
        {state.spendings.sum > 0 && (
          <>
            <TableCell className="font-medium row-span-4 col-span-2 sm:col-span-1">
              Kosten für Unterkunft und Heizung
            </TableCell>
            <TableCell className="sm:col-span-2">
              Kaltmiete (Schuldzins bei Wohneigentum)
            </TableCell>
            <TableCell className="text-right">
              {state.spendings.rent.toLocaleString("de-DE", {
                style: "currency",
                currency: "EUR",
              })}
            </TableCell>
            <TableCell className="sm:col-span-2">Nebenkosten</TableCell>
            <TableCell className="text-right">
              {state.spendings.utilities.toLocaleString("de-DE", {
                style: "currency",
                currency: "EUR",
              })}
            </TableCell>
            <TableCell className="sm:col-span-2">Heizkosten</TableCell>
            <TableCell className="text-right">
              {state.spendings.heating.toLocaleString("de-DE", {
                style: "currency",
                currency: "EUR",
              })}
            </TableCell>
            <TableCell className="sm:col-span-2 bg-muted/30 font-bold">
              Summe
            </TableCell>
            <TableCell className="text-right bg-muted/30">
              {state.spendings.sum.toLocaleString("de-DE", {
                style: "currency",
                currency: "EUR",
              })}
            </TableCell>
          </>
        )}
        {/* sub sum needs */}
        <TableCell className="sm:col-span-3 bg-muted font-bold">
          Summe aller Bedarfe
        </TableCell>
        <TableCell className="text-right bg-muted font-bold">
          {need.toLocaleString("de-DE", {
            style: "currency",
            currency: "EUR",
          })}
        </TableCell>
        {/* income */}
        <TableCell
          className="font-medium col-span-2 sm:col-span-1"
          style={{
            gridRow: `span ${incomeCount + 1} / span ${incomeCount + 1}`,
          }}
        >
          Einkommen
        </TableCell>
        {state.community
          .filter((p) => p.income.length)
          .map((person, personIndex) => (
            <>
              <TableCell
                className="font-medium col-span-2 sm:col-span-1"
                style={{
                  gridRow: `span ${person.income.length} / span ${person.income.length}`,
                }}
              >
                {person.name}
              </TableCell>
              {person.income.map((income, incomeIndex) => (
                <>
                  <TableCell className="font-medium">
                    {incomeType[income.type].label}
                  </TableCell>
                  <TableCell className="font-medium text-right">
                    {income.amount.toLocaleString("de-DE", {
                      style: "currency",
                      currency: "EUR",
                    })}
                  </TableCell>
                </>
              ))}
            </>
          ))}
        {incomeCount > 0 && (
          <>
            <TableCell className="sm:col-span-2 bg-muted/30 font-bold">
              Summe
            </TableCell>
            <TableCell className="text-right bg-muted/30 font-bold">
              {income.sum.toLocaleString("de-DE", {
                style: "currency",
                currency: "EUR",
              })}
            </TableCell>
          </>
        )}
        {/* allowance */}
        {Boolean(allowance.length) && (
          <TableCell
            className="font-medium col-span-2 sm:col-span-1"
            style={{
              gridRow: `span ${allowance.length + 1} / span ${
                allowance.length + 1
              }`,
            }}
          >
            Freibeträge
          </TableCell>
        )}
        {allowance.map((_allowance, index) => (
          <>
            <TableCell className="font-medium sm:col-span-2">
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
          </>
        ))}
        {Boolean(allowance.length > 0) && (
          <>
            <TableCell className="sm:col-span-2 bg-muted/30 font-bold">
              Summe
            </TableCell>
            <TableCell className="text-right bg-muted/30 font-bold">
              {allowanceSum.toLocaleString("de-DE", {
                style: "currency",
                currency: "EUR",
              })}
            </TableCell>
          </>
        )}
        {/* sub sum income */}
        {incomeAfterAllowance > 0 && (
          <>
            <TableCell className="sm:col-span-3 bg-muted font-bold">
              Summe aller Einkommen (abzgl. Freibeträge)
            </TableCell>
            <TableCell className="text-right bg-muted font-bold">
              {incomeAfterAllowance.toLocaleString("de-DE", {
                style: "currency",
                currency: "EUR",
              })}
            </TableCell>
          </>
        )}
        {/* overall sum  */}
        <>
          <TableCell className="sm:col-span-3 bg-primary font-bold">
            Bürgergeldanspruch
          </TableCell>
          <TableCell className="text-right bg-primary font-bold">
            {overall.toLocaleString("de-DE", {
              style: "currency",
              currency: "EUR",
            })}
          </TableCell>
        </>
      </TableBody>
    </Table>
  );
}
