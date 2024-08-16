"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { StepContent, StepNavigation } from "@/components/ui/step-primitives";
import { PenIcon, PlusCircleIcon, XCircleIcon } from "lucide-react";
import { IncomeDialog } from "./income-dialog";
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
import { useStepsMachine } from "@/lib/machine";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { produce } from "immer";
import { type TIncome, incomeType } from "@/lib/types";
import {
  StepRoot,
  StepTitle,
  StepDescription,
} from "@/components/ui/step-primitives";
import { stepsConfig } from "@/lib/machine";
import { groupBy, flattenIncome } from "@/lib/utils";
import { useRouter } from "next/navigation";

const step = stepsConfig[7];

export default function StepSalary() {
  const { push } = useRouter();
  const [state, dispatch] = useStepsMachine();
  const [income, setIncome] = useState(flattenIncome(state.context.community));

  const incomeSum = useMemo(
    () => income.reduce((acc, curr) => acc + Number(curr.amount), 0),
    [income]
  );

  useEffect(() => {
    setIncome(flattenIncome(state.context.community));
  }, [state]);

  const handleRemove = useCallback((index: number) => {
    setIncome(
      produce((draft) => {
        draft.splice(index, 1);
      })
    );
  }, []);

  function handleSubmit() {
    const res = groupBy<TIncome>(income, "name");

    dispatch({
      type: "next",
      state: produce(state, (draft) => {
        Object.entries(res).forEach(([key, value]) => {
          const index = draft.context.community.findIndex(
            (pers) => pers.name === key
          );
          if (index !== -1) draft.context.community[index].income = value;
        });
      }),
    });

    const nextStep = stepsConfig[state.currentStep].next(state.context);
    push(`${stepsConfig[nextStep].id}`);
  }

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
          <Table>
            <TableCaption>
              Monatliches Einkommen Ihrer Bedarfsgemeinschaft
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Person</TableHead>
                <TableHead className="w-[320px]">Einkommensart</TableHead>
                <TableHead className="w-[180px]">Betrag (Freibetrag)</TableHead>
                <TableHead className="text-center">Aktionen</TableHead>
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
                  <TableCell className="flex text-center">
                    <IncomeDialog
                      community={state.context.community}
                      setIncome={setIncome}
                      selectedPerson={person}
                    >
                      <Button variant="ghost" type="button">
                        <PenIcon className="w-4 h-4" />
                      </Button>
                    </IncomeDialog>
                    <Button
                      variant="ghost"
                      type="button"
                      onClick={() => handleRemove(index)}
                    >
                      <XCircleIcon className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell className="text-center" colSpan={5}>
                  <IncomeDialog
                    community={state.context.community}
                    setIncome={setIncome}
                  >
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
                <TableCell className="text-right" colSpan={2}>
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
