"use client";

import type { FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { StepContent, StepNavigation } from "@/components/ui/step-primitives";
import { useSteps, useStepsDispatch } from "@/lib/machine";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  UserIcon,
  UsersIcon,
} from "lucide-react";
import { useState } from "react";

export function StepPartner() {
  const dispatch = useStepsDispatch();
  const steps = useSteps();
  const [partner, setPartner] = useState(
    steps.context.partnerschaft ?? "false"
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch({ data: { partnerschaft: partner }, type: "next" });
  }

  return (
    <form onSubmit={handleSubmit}>
      <StepContent>
        <RadioGroup
          className="p-10 flex flex-col sm:flex-row gap-4"
          defaultValue={partner}
          onValueChange={(value: "false" | "true") => setPartner(value)}
        >
          <div className="grow">
            <RadioGroupItem
              className="peer sr-only"
              id="without-partner"
              value={"false"}
            />
            <Label
              className="h-full flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              htmlFor="without-partner"
            >
              <UserIcon className="mb-3 h-6 w-6" />
              Alleinstehend
            </Label>
          </div>
          <div className="grow">
            <RadioGroupItem
              className="peer sr-only"
              id="with-partner"
              value={"true"}
            />
            <Label
              className="h-full flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              htmlFor="with-partner"
            >
              <UsersIcon className="mb-3 h-6 w-6" />
              Partnerschaft
            </Label>
          </div>
        </RadioGroup>
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
