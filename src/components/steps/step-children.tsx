"use client";

import type { FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { StepContent, StepNavigation } from "@/components/ui/step-primitives";
import { useStepsMachine } from "@/lib/machine";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  BabyIcon,
  CircleOffIcon,
} from "lucide-react";
import { useState } from "react";
import { produce } from "immer";

export function StepChildren() {
  const [state, dispatch] = useStepsMachine();
  const [children, setChildren] = useState<
    "with-children" | "without-children"
  >("without-children");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch({
      type: "next",
      state: produce(state, (draft) => {
        if (children === "with-children")
          draft.context.community.push({
            name: "Kind 1",
            type: "child",
            age: "0-5",
          });
      }),
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <StepContent>
        <RadioGroup
          className="py-6 gap-4 flex flex-col"
          defaultValue={children}
          onValueChange={(value: "with-children" | "without-children") =>
            setChildren(value)
          }
        >
          <div>
            <RadioGroupItem
              className="peer sr-only"
              id="with-children"
              value="with-children"
            />
            <Label
              className="max-w-[165px] flex items-center gap-2 rounded-md border-2 border-muted bg-popover py-3 px-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              htmlFor="with-children"
            >
              <BabyIcon className="h-5 w-5" />
              Kinder
            </Label>
          </div>
          <div>
            <RadioGroupItem
              className="peer sr-only"
              id="without-children"
              value="without-children"
            />
            <Label
              className="max-w-[165px] flex items-center gap-2 rounded-md border-2 border-muted bg-popover py-3 px-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              htmlFor="without-children"
            >
              <CircleOffIcon className="h-5 w-5" />
              Keine Kinder
            </Label>
          </div>
        </RadioGroup>
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
