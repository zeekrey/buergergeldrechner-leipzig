"use client";

import { calculateIncome } from "calculation";
import { produce } from "immer";
import {
  BanknoteIcon,
  CircleHelpIcon,
  PenIcon,
  PlusCircleIcon,
  XCircleIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Fragment, useCallback, useMemo } from "react";

import { useStateContext } from "@/components/context";
import {
  WizardBackButton,
  WizardNextButton,
} from "@/components/questionnaire/actions";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  StepContent,
  StepDescription,
  StepNavigation,
  StepRoot,
  StepTitle,
} from "@/components/ui/step-primitives";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import HelpMarkdown from "@/config/steps/monatliches-einkommen.mdx";
import { useCompleteContext } from "@/hooks/use-complete-context";
import { stepsConfig } from "@/lib/machine";
import { type TIncome, TPerson, incomeType } from "@/lib/types";
import { cn } from "@/lib/utils";

import { IncomeDialog } from "./income-dialog";
import { checkChildBenefitTransfert } from "./income-dialogs/default-income";

const step = stepsConfig[8];

function formatEuro(value: number) {
  return value.toLocaleString("de-DE", {
    currency: "EUR",
    style: "currency",
  });
}

export default function StepSalary() {
  const { push } = useRouter();
  const [state, setState] = useStateContext();
  const completeContext = useCompleteContext(state);

  const handleRemove = useCallback(
    (person: TPerson, income: TIncome) => {
      const newState = produce(state, (draft) => {
        const personIndex = draft.community.findIndex(
          (_person) => _person.id === person.id
        );
        if (personIndex !== -1) {
          const incomeIndex = draft.community[personIndex].income.findIndex(
            (_income) => _income.id === income.id
          );
          if (incomeIndex !== -1)
            draft.community[personIndex].income.splice(incomeIndex, 1);
        }

        checkChildBenefitTransfert(draft);
      });

      setState(newState);
    },
    [state]
  );

  const incomeSum = useMemo(
    () => (completeContext ? calculateIncome(completeContext) : 0),
    [completeContext]
  );

  const hasIncome = state.community.some((person) => person.income.length > 0);

  function handleSubmit() {
    const nextStep = step.next(state);
    push(`${stepsConfig[nextStep].id}`);
  }

  const handleBack = useCallback(() => {
    push(`${stepsConfig[step.previous(state)].id}`);
  }, [state]);

  if (!completeContext) return null;

  return (
    <StepRoot className="grow-0" id={step.id}>
      <StepTitle title={step.title}>
        <HelpMarkdown />
      </StepTitle>
      <StepDescription>{step.description}</StepDescription>
      <StepContent className="flex grow-0 flex-col gap-6 pb-0">
        <div className="flex min-h-0 flex-col">
          <div className={hasIncome ? "max-h-[280px] overflow-y-auto" : undefined}>
            {hasIncome ? (
              <Table>
                <TableBody>
                  {state.community
                    .filter((person) => person.income.length)
                    .map((person) => (
                      <Fragment key={person.id}>
                        <TableRow>
                          <TableCell
                            className="bg-muted font-semibold"
                            colSpan={3}
                          >
                            {person.name}
                          </TableCell>
                        </TableRow>
                        {person.income.map((income) => (
                          <TableRow key={income.id}>
                            <TableCell
                              className={cn({
                                "opacity-50":
                                  income.type === "ChildBenefitTransfer",
                              })}
                            >
                              {incomeType[income.type].label}
                            </TableCell>
                            <TableCell
                              className={cn({
                                "opacity-50":
                                  income.type === "ChildBenefitTransfer",
                              })}
                            >
                              {formatEuro(income.amount)}
                              {typeof income.allowance !== "undefined" &&
                              income.allowance > 0
                                ? ` (${formatEuro(income.allowance)})`
                                : null}
                            </TableCell>
                            <TableCell className="flex justify-center">
                              {income.type === "ChildBenefitTransfer" ? (
                                <Popover>
                                  <PopoverTrigger>
                                    <CircleHelpIcon className="mx-auto opacity-50" />
                                  </PopoverTrigger>
                                  <PopoverContent className="text-sm">
                                    Ein Kindergeldübertrag wird automatisch
                                    hinzugefügt und kann nicht verändert werden.
                                  </PopoverContent>
                                </Popover>
                              ) : (
                                <>
                                  <IncomeDialog
                                    selectedIncome={income}
                                    selectedPerson={person}
                                  >
                                    <Button
                                      aria-label={`${incomeType[income.type].label} bearbeiten`}
                                      type="button"
                                      variant="ghost"
                                    >
                                      <PenIcon />
                                    </Button>
                                  </IncomeDialog>
                                  <Button
                                    aria-label={`${incomeType[income.type].label} entfernen`}
                                    onClick={() => handleRemove(person, income)}
                                    type="button"
                                    variant="ghost"
                                  >
                                    <XCircleIcon />
                                  </Button>
                                </>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </Fragment>
                    ))}
                </TableBody>
              </Table>
            ) : (
              <Empty className="border border-dashed">
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <BanknoteIcon />
                  </EmptyMedia>
                  <EmptyTitle>Kein Einkommen angegeben</EmptyTitle>
                  <EmptyDescription>
                    Erwerbseinkommen, Kindergeld oder andere Einnahmen können
                    Sie hinzufügen.
                  </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                  <IncomeDialog>
                    <Button type="button" variant="secondary">
                      <PlusCircleIcon data-icon="inline-start" />
                      Einkommen hinzufügen
                    </Button>
                  </IncomeDialog>
                </EmptyContent>
              </Empty>
            )}
          </div>
          {hasIncome ? (
            <div className="flex justify-center py-3">
              <IncomeDialog>
                <Button type="button" variant="secondary">
                  <PlusCircleIcon data-icon="inline-start" />
                  Einkommen hinzufügen
                </Button>
              </IncomeDialog>
            </div>
          ) : null}
          <div className="flex items-center justify-between gap-4 border-t bg-card py-3 font-bold">
            <span>Gesamteinkommen</span>
            <span>{formatEuro(incomeSum)}</span>
          </div>
        </div>
      </StepContent>
      <StepNavigation>
        <WizardBackButton onClick={handleBack}>Zurück</WizardBackButton>
        <WizardNextButton onClick={handleSubmit} type="button">
          Weiter
        </WizardNextButton>
      </StepNavigation>
    </StepRoot>
  );
}
