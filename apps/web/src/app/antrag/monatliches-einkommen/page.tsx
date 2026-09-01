"use client";

import { calculateIncome } from "calculation";
import { produce } from "immer";
import {
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { StepContent, StepNavigation } from "@/components/ui/step-primitives";
import {
  StepRoot,
  StepTitle,
  StepDescription,
} from "@/components/ui/step-primitives";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableRow,
} from "@/components/ui/table";
import HelpMarkdown from "@/config/steps/monatliches-einkommen.mdx";
import { useCompleteContext } from "@/hooks/use-complete-context";
import { stepsConfig } from "@/lib/machine";
import { type TIncome, TPerson, incomeType } from "@/lib/types";
import { cn } from "@/lib/utils";

import { IncomeDialog } from "./income-dialog";
import { checkChildBenefitTransfert } from "./income-dialogs/default-income";

const step = stepsConfig[8];

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

  function handleSubmit() {
    const nextStep = step.next(state);
    push(`${stepsConfig[nextStep].id}`);
  }

  const handleBack = useCallback(() => {
    push(`${stepsConfig[step.previous(state)].id}`);
  }, [state]);

  if (!completeContext) return null;

  return (
    <StepRoot id={step.id}>
      <StepTitle title={step.title}>
        <HelpMarkdown />
      </StepTitle>
      <StepDescription>{step.description}</StepDescription>
      <StepContent>
        <ScrollArea className="sm:h-[380px] w-full">
          <Table>
            {/* <TableHeader>
              <TableRow>
                <TableHead>Person</TableHead>
                <TableHead className="w-[320px]">Einkommensart</TableHead>
                <TableHead className="w-[180px]">Betrag (Freibetrag)</TableHead>
                <TableHead className="text-center">Aktionen</TableHead>
              </TableRow>
            </TableHeader> */}
            <TableBody>
              {state.community
                .filter((p) => p.income.length)
                .map((person) => (
                  <Fragment key={person.id}>
                    <TableRow>
                      <TableCell colSpan={3} className="font-semibold bg-muted">
                        {person.name}
                      </TableCell>
                    </TableRow>
                    {person.income?.map((income) => (
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
                          {income.amount.toLocaleString("de-DE", {
                            style: "currency",
                            currency: "EUR",
                          })}{" "}
                          {typeof income.allowance !== "undefined" &&
                            income.allowance > 0 &&
                            `(${income.allowance?.toLocaleString("de-DE", {
                              style: "currency",
                              currency: "EUR",
                            })})`}
                        </TableCell>
                        <TableCell className="flex justify-center">
                          {income.type === "ChildBenefitTransfer" ? (
                            <Popover>
                              <PopoverTrigger>
                                <CircleHelpIcon className="w-4 h-4 opacity-50 mx-auto" />
                              </PopoverTrigger>
                              <PopoverContent className="text-sm">
                                Ein Kindergeldübertrag wird automatisch
                                hinzugefügt und kann nicht verändert werden.
                              </PopoverContent>
                            </Popover>
                          ) : (
                            <>
                              <IncomeDialog
                                selectedPerson={person}
                                selectedIncome={income}
                              >
                                <Button variant="ghost" type="button">
                                  <PenIcon className="w-4 h-4" />
                                </Button>
                              </IncomeDialog>
                              <Button
                                variant="ghost"
                                type="button"
                                onClick={() => handleRemove(person, income)}
                              >
                                <XCircleIcon className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </Fragment>
                ))}
              <TableRow>
                <TableCell className="text-center" colSpan={3}>
                  <IncomeDialog>
                    <Button variant="secondary" type="button">
                      <PlusCircleIcon className="w-4 h-4 mr-2" />
                      Einkommen hinzufügen
                    </Button>
                  </IncomeDialog>
                </TableCell>
              </TableRow>
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={2} className="font-bold">
                  Gesamteinkommen
                </TableCell>
                <TableCell className="text-right">
                  {incomeSum.toLocaleString("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </ScrollArea>
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
