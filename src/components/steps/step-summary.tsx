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

export function StepSummary() {
  const dispatch = useStepsDispatch();
  const { context } = useSteps();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch({
      data: {},
      type: "next",
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <StepContent>
        <div>Partnerschaft: {context.partnerschaft ? "Ja" : "Nein"}</div>
        <div>
          Kinder:
          {context.kinder?.length ? (
            <span>{context.kinder.length}</span>
          ) : (
            <span>Nein</span>
          )}
        </div>
        <div>
          Monatliche Ausgaben: {context.ausgaben.heizkosten},{" "}
          {context.ausgaben.kaltmiete}, {context.ausgaben.nebenkosten}
        </div>
        <div>
          Monatliches Einkommen (Antragsteller):{" "}
          {context.einkommen.antragsteller.brutto},{" "}
          {context.einkommen.antragsteller.netto}
        </div>
        <div>
          Monatliches Einkommen (Partner): {context.einkommen.partner?.brutto},{" "}
          {context.einkommen.partner?.netto}
        </div>
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
