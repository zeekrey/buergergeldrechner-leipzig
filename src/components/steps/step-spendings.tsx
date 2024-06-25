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

export function StepSpending() {
  const [state, dispatch] = useStepsMachine();
  const [rent, setRent] = useState(0);
  const [utilities, setUtilities] = useState(0);
  const [heating, setHeating] = useState(0);

  const sum = rent + utilities + heating;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch({
      data: {
        ausgaben: {
          heizkosten: heating,
          kaltmiete: rent,
          nebenkosten: utilities,
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
            <TableCaption>Ihre monatlichen Kosten</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Position</TableHead>
                <TableHead className="text-right">Betrag</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Kaltmiete</TableCell>
                <TableCell className="w-[60px] text-right">
                  <Input
                    className="m-0"
                    inputMode="decimal"
                    onChange={(e) => setRent(e.target.valueAsNumber)}
                    type="number"
                    value={rent}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Nebenkosten</TableCell>
                <TableCell className="text-right">
                  <Input
                    className="m-0"
                    inputMode="decimal"
                    onChange={(e) => setUtilities(e.target.valueAsNumber)}
                    type="number"
                    value={utilities}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Heizkosten</TableCell>
                <TableCell className="text-right">
                  <Input
                    className="m-0"
                    inputMode="decimal"
                    onChange={(e) => setHeating(e.target.valueAsNumber)}
                    type="number"
                    value={heating}
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
        <Button className="sm:w-48" size="lg" type="submit">
          Weiter
          <ArrowRightCircleIcon className="w-4 h-4 ml-3" />
        </Button>
      </StepNavigation>
    </form>
  );
}
