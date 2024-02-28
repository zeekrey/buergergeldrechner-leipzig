"use client";

import type { FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
import { useSteps, useStepsDispatch } from "@/lib/machine";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  BabyIcon,
  CircleOffIcon,
} from "lucide-react";
import { useState } from "react";

export function StepIncome() {
  const dispatch = useStepsDispatch();
  const steps = useSteps();
  const [income, setIncome] = useState({
    arbeitslosengeld: 0,
    elterngeld: 0,
    kindergeld: 0,
    rente: 0,
    sonstiges: 0,
  });

  const sum = Object.values(income).reduce((acc, curr) => acc + curr, 0);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch({
      data: {
        einkommen: {
          ...steps.context.einkommen,
          antragsteller: {
            ...steps.context.einkommen.antragsteller,
            arbeitslosengeld: income.arbeitslosengeld,
            elterngeld: income.elterngeld,
            kindergeld: income.kindergeld,
            rente: income.rente,
            sonstiges: income.sonstiges,
          },
        },
      },
      type: "next",
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <StepContent>
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
                      kindergeld: e.target.valueAsNumber,
                    }))
                  }
                  type="number"
                  value={income.kindergeld}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Elterngeld</TableCell>
              <TableCell className="text-right">
                <Input
                  className="m-0"
                  inputMode="decimal"
                  onChange={(e) =>
                    setIncome((state) => ({
                      ...state,
                      elterngeld: e.target.valueAsNumber,
                    }))
                  }
                  type="number"
                  value={income.elterngeld}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Arbeitslosengeld</TableCell>
              <TableCell className="text-right">
                <Input
                  className="m-0"
                  inputMode="decimal"
                  onChange={(e) =>
                    setIncome((state) => ({
                      ...state,
                      arbeitslosengeld: e.target.valueAsNumber,
                    }))
                  }
                  type="number"
                  value={income.arbeitslosengeld}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Rente</TableCell>
              <TableCell className="text-right">
                <Input
                  className="m-0"
                  inputMode="decimal"
                  onChange={(e) =>
                    setIncome((state) => ({
                      ...state,
                      rente: e.target.valueAsNumber,
                    }))
                  }
                  type="number"
                  value={income.rente}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Sonstiges</TableCell>
              <TableCell className="text-right">
                <Input
                  className="m-0"
                  inputMode="decimal"
                  onChange={(e) =>
                    setIncome((state) => ({
                      ...state,
                      sonstiges: e.target.valueAsNumber,
                    }))
                  }
                  type="number"
                  value={income.sonstiges}
                />
              </TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell className="font-medium">Summe</TableCell>
              <TableCell className="text-right">
                <Input className="m-0" disabled value={sum.toLocaleString()} />
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </StepContent>
      <StepNavigation>
        <Button onClick={() => dispatch({ type: "previous" })} type="button">
          <ArrowLeftCircleIcon className="w-4 h-4" />
        </Button>
        <Button className="grow sm:grow-0 sm:w-48 " type="submit">
          Weiter
          <ArrowRightCircleIcon className="w-4 h-4 ml-3" />
        </Button>
      </StepNavigation>
    </form>
  );
}
