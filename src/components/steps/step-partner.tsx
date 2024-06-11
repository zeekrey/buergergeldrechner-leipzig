"use client";

import type { FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { StepContent, StepNavigation } from "@/components/ui/step-primitives";
import { useSteps, useStepsDispatch } from "@/lib/machine";
import { ArrowRightCircleIcon, UserIcon, UsersIcon } from "lucide-react";
import { useState } from "react";

export function StepPartner() {
  const dispatch = useStepsDispatch();
  const steps = useSteps();
  const [partner, setPartner] = useState<"with-partner" | "without-partner">(
    "without-partner"
  );

  console.log(partner);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch({
      data: {
        community:
          partner === "with-partner"
            ? [{ type: "applicant" }, { type: "partner" }]
            : [{ type: "applicant" }],
      },
      type: "next",
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <StepContent>
        <RadioGroup
          className="py-6 gap-4 flex flex-col"
          defaultValue={partner}
          onValueChange={(value: "with-partner" | "without-partner") =>
            setPartner(value)
          }
        >
          <div>
            <RadioGroupItem
              className="peer sr-only"
              id="without-partner"
              value={"without-partner"}
            />
            <Label
              className="max-w-fit flex items-center gap-2 rounded-md border-2 border-muted bg-popover py-3 px-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              htmlFor="without-partner"
            >
              <UserIcon className="h-5 w-5" />
              Alleinstehend
            </Label>
          </div>
          <div>
            <RadioGroupItem
              className="peer sr-only"
              id="with-partner"
              value={"with-partner"}
            />
            <Label
              className="max-w-fit flex items-center gap-2 rounded-md border-2 border-muted bg-popover py-3 px-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              htmlFor="with-partner"
            >
              <UsersIcon className="h-5 w-5" />
              Partnerschaft
            </Label>
          </div>
        </RadioGroup>
      </StepContent>
      <StepNavigation>
        <Button size="lg" type="submit">
          Weiter
          <ArrowRightCircleIcon className="w-4 h-4 ml-3" />
        </Button>
      </StepNavigation>
    </form>
  );
}
