"use client";

import type { FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { StepContent, StepNavigation } from "@/components/ui/step-primitives";
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
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  BabyIcon,
  CircleOffIcon,
} from "lucide-react";
import { useState } from "react";
import { produce } from "immer";

export function StepIncome() {
  const [state, dispatch] = useStepsMachine();
  const [income, setIncome] = useState({
    childBenefit: 0,
  });

  const sum = Object.values(income).reduce((acc, curr) => acc + curr, 0);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch({
      type: "next",
      state: produce(state, (draft) => {
        draft.context.income.childBenefit = income.childBenefit;
      }),
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <StepContent>
        <ScrollArea className="sm:h-[380px]">
          <Table>
            <TableCaption>Ihre monatlichen Kosten</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Position</TableHead>
                <TableHead className="text-right">Betrag</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Kindergeld</TableCell>
                <TableCell className="w-[60px] text-right">
                  <Input
                    className="m-0"
                    inputMode="decimal"
                    onChange={(e) =>
                      setIncome((state) => ({
                        ...state,
                        childBenefit: e.target.valueAsNumber,
                      }))
                    }
                    type="number"
                    value={income.childBenefit}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell className="font-medium">Summe</TableCell>
                <TableCell className="text-right">
                  <Input
                    className="m-0"
                    disabled
                    value={sum.toLocaleString()}
                  />
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </ScrollArea>
      </StepContent>
      <StepNavigation>
        <Button
          onClick={() => dispatch({ type: "previous" })}
          size="lg"
          type="button"
        >
          <ArrowLeftCircleIcon className="w-4 h-4" />
        </Button>
        <Button className="grow sm:grow-0 sm:w-48 " size="lg" type="submit">
          Weiter
          <ArrowRightCircleIcon className="w-4 h-4 ml-3" />
        </Button>
      </StepNavigation>
    </form>
  );
}
