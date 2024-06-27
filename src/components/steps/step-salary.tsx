"use client";

import type { FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "lucide-react";
import { useState } from "react";
import { calculateSalary } from "@/lib/calculation";

export function StepSalary() {
  const [state, dispatch] = useStepsMachine();
  const [income, setIncome] = useState({ brutto: 0, netto: 0 });

  /** FIXME: Just for preview. */
  const sum = calculateSalary({
    community: [],
    isEmployable: true,
    isSingle: true,
    salary: { gross: income.brutto, net: income.netto },
    spendings: { heating: 0, rent: 0, sum: 0, utilities: 0 },
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch({
      type: "next",
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <StepContent>
        <ScrollArea className="sm:h-[380px]">
          <Table>
            <TableCaption>Ihr monatlichen Einkommen</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Betroffener</TableHead>
                <TableHead className="w-[100px]">Position</TableHead>
                <TableHead className="text-right">Betrag</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell rowSpan={2}>Antragsteller</TableCell>
                <TableCell className="font-medium">Brutto</TableCell>
                <TableCell className="w-[60px] text-right">
                  <Input
                    className="m-0"
                    inputMode="decimal"
                    onChange={(e) =>
                      setIncome((state) => ({
                        ...state,
                        brutto: e.target.valueAsNumber,
                      }))
                    }
                    type="number"
                    value={income.brutto}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Netto</TableCell>
                <TableCell className="text-right">
                  <Input
                    className="m-0"
                    inputMode="decimal"
                    onChange={(e) =>
                      setIncome((state) => ({
                        ...state,
                        netto: e.target.valueAsNumber,
                      }))
                    }
                    type="number"
                    value={income.netto}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Freibetrag</TableCell>
                <TableCell className="text-right" colSpan={2}>
                  {sum.allowance.toLocaleString("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </TableCell>
              </TableRow>
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell className="font-medium">Einkommen</TableCell>
                <TableCell className="text-right" colSpan={2}>
                  {sum.income.toLocaleString("de-DE", {
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
        <Button className="sm:w-48 " size="lg" type="submit">
          Weiter
          <ArrowRightCircleIcon className="w-4 h-4 ml-3" />
        </Button>
      </StepNavigation>
    </form>
  );
}
