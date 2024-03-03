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
import { useStepsDispatch } from "@/lib/machine";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "lucide-react";
import { useState } from "react";

export function StepSalary() {
  const dispatch = useStepsDispatch();
  const [income, setIncome] = useState({ brutto: 0, netto: 0 });
  const [incomePartner, setIncomePartner] = useState({ brutto: 0, netto: 0 });

  const sum =
    income.brutto + income.netto + incomePartner.brutto + incomePartner.netto;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch({
      data: {
        einkommen: {
          antragsteller: {
            brutto: income.brutto,
            netto: income.netto,
          },
          partner: {
            brutto: incomePartner.brutto,
            netto: incomePartner.netto,
          },
        },
      },
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
                <TableCell rowSpan={2}>Partner</TableCell>
                <TableCell className="font-medium">Brutto</TableCell>
                <TableCell className="text-right">
                  <Input
                    className="m-0"
                    inputMode="decimal"
                    onChange={(e) =>
                      setIncomePartner((state) => ({
                        ...state,
                        brutto: e.target.valueAsNumber,
                      }))
                    }
                    type="number"
                    value={incomePartner.brutto}
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
                      setIncomePartner((state) => ({
                        ...state,
                        netto: e.target.valueAsNumber,
                      }))
                    }
                    type="number"
                    value={incomePartner.netto}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell className="font-medium">Summe</TableCell>
                <TableCell className="text-right" colSpan={2}>
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
