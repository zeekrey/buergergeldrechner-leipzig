"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { StepContent, StepNavigation } from "@/components/ui/step-primitives";
import { PenIcon, PlusCircleIcon, XCircleIcon } from "lucide-react";
import { IncomeDialog } from "./income-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "lucide-react";
import { Fragment, useCallback } from "react";
import { produce } from "immer";
import { type TIncome, TPerson, incomeType } from "@/lib/types";
import {
  StepRoot,
  StepTitle,
  StepDescription,
} from "@/components/ui/step-primitives";
import { stepsConfig } from "@/lib/machine";
import { useRouter } from "next/navigation";
import { useStateContext } from "@/components/context";

const step = stepsConfig[7];

export default function StepSalary() {
  const { push } = useRouter();
  const [state, setState] = useStateContext();

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
      });

      setState(newState);
    },
    [state]
  );

  function handleSubmit() {
    const nextStep = step.next(state);
    push(`${stepsConfig[nextStep].id}`);
  }

  const handleBack = useCallback(() => {
    push(`${stepsConfig[step.previous].id}`);
  }, [state]);

  return (
    <StepRoot id={step.id}>
      <StepTitle>{step.title}</StepTitle>
      <StepDescription>{step.description}</StepDescription>
      <StepContent>
        <ScrollArea className="sm:h-[380px]">
          <Table>
            {/* <TableCaption>
              Monatliches Einkommen Ihrer Bedarfsgemeinschaft
            </TableCaption> */}
            <TableHeader>
              <TableRow>
                <TableHead>Person</TableHead>
                <TableHead className="w-[320px]">Einkommensart</TableHead>
                <TableHead className="w-[180px]">Betrag (Freibetrag)</TableHead>
                <TableHead className="text-center">Aktionen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {state.community.map((person) => (
                <Fragment key={person.id}>
                  {person.income?.map((income) => (
                    <TableRow key={income.id}>
                      <TableCell>{person.name}</TableCell>
                      <TableCell>{incomeType[income.type].label}</TableCell>
                      <TableCell className="">
                        {income.amount.toLocaleString("de-DE", {
                          style: "currency",
                          currency: "EUR",
                        })}
                        {income.type === "EmploymentIncome" && (
                          <>
                            {" "}
                            (
                            {income.allowance.toLocaleString("de-DE", {
                              style: "currency",
                              currency: "EUR",
                            })}
                            )
                          </>
                        )}
                      </TableCell>
                      <TableCell className="flex text-center">
                        <IncomeDialog
                          state={state}
                          setState={setState}
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
                      </TableCell>
                    </TableRow>
                  ))}
                </Fragment>
              ))}

              <TableRow>
                <TableCell className="text-center" colSpan={5}>
                  <IncomeDialog state={state} setState={setState}>
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
                <TableCell colSpan={3} className="font-bold">
                  Gesamteinkommen
                </TableCell>
                {/* <TableCell className="text-right" colSpan={2}>
                  {incomeSum.toLocaleString("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </TableCell> */}
              </TableRow>
            </TableFooter>
          </Table>
        </ScrollArea>
      </StepContent>
      <StepNavigation>
        <Button
          onClick={handleBack}
          size="lg"
          type="button"
          variant="secondary"
        >
          <ArrowLeftCircleIcon className="w-4 h-4" />
        </Button>
        <Button
          className="grow sm:grow-0 sm:w-48 "
          size="lg"
          type="button"
          onClick={handleSubmit}
        >
          Weiter
          <ArrowRightCircleIcon className="w-4 h-4 ml-3" />
        </Button>
      </StepNavigation>
    </StepRoot>
  );
}
