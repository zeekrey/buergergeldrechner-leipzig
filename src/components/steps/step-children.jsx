"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { StepContent, StepNavigation } from "@/components/ui/step-primitives";
import { useSteps, useStepsDispatch } from "@/lib/machine";
import { BabyIcon, CircleOffIcon } from "lucide-react";
import { useState } from "react";

export function StepChildren() {
  const dispatch = useStepsDispatch();
  const steps = useSteps();
  const [children, setChildren] = useState(steps.context.kinder ?? false);

  return (
    <>
      <StepContent>
        <RadioGroup
          className="p-10 flex flex-col sm:flex-row gap-4"
          defaultValue={children}
          onValueChange={setChildren}
        >
          <div className="grow">
            <RadioGroupItem
              className="peer sr-only"
              id="with-children"
              value={true}
            />
            <Label
              className="h-full flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              htmlFor="with-children"
            >
              <BabyIcon className="mb-3 h-6 w-6" />
              Kinder
            </Label>
          </div>
          <div className="grow">
            <RadioGroupItem
              className="peer sr-only"
              id="without-children"
              value={false}
            />
            <Label
              className="h-full flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              htmlFor="without-children"
            >
              <CircleOffIcon className="mb-3 h-6 w-6" />
              Keine Kinder
            </Label>
          </div>
        </RadioGroup>
      </StepContent>
      <StepNavigation
        onNext={() => dispatch({ data: { kinder: children }, type: "next" })}
        onPrev={() => dispatch({ type: "previous" })}
      />
    </>
  );
}
