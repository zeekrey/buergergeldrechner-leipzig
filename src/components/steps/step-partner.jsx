"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { StepContent, StepNavigation } from "@/components/ui/step-primitives";
import { useSteps, useStepsDispatch } from "@/lib/machine";
import { UsersIcon } from "lucide-react";
import { UserIcon } from "lucide-react";
import { useState } from "react";

export function StepPartner() {
  const dispatch = useStepsDispatch();
  const steps = useSteps();
  const [partner, setPartner] = useState(steps.context.partnerschaft ?? false);

  function handleSubmit(event) {
    event.preventDefault();
    dispatch({ data: { partnerschaft: partner }, type: "next" });
  }

  return (
    <form onSubmit={handleSubmit}>
      <StepContent>
        <RadioGroup
          className="p-10 flex flex-col sm:flex-row gap-4"
          defaultValue={partner}
          onValueChange={setPartner}
        >
          <div className="grow">
            <RadioGroupItem
              className="peer sr-only"
              id="without-partner"
              value={false}
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
              value={true}
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
      <StepNavigation
        onNext={handleSubmit}
        onPrev={() => dispatch({ type: "previous" })}
      />
    </form>
  );
}
