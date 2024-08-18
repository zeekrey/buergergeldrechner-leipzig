"use client";

import type { FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { StepContent, StepNavigation } from "@/components/ui/step-primitives";
import { useStepsMachine } from "@/lib/machine";
import {
  StepRoot,
  StepTitle,
  StepDescription,
} from "@/components/ui/step-primitives";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  BabyIcon,
  CircleOffIcon,
} from "lucide-react";
import { useState, useCallback } from "react";
import { produce } from "immer";
import { stepsConfig } from "@/lib/machine";
import { useRouter } from "next/navigation";
import { generateId } from "@/lib/utils";
import { incomeType } from "@/lib/types";

const step = stepsConfig[2];

export default function StepChildren() {
  const { push } = useRouter();
  const [state, dispatch] = useStepsMachine();
  const [children, setChildren] = useState<
    "with-children" | "without-children"
  >("without-children");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextState = produce(state, (draft) => {
      if (
        children === "with-children" &&
        !draft.context.community.find((person) => person.type === "child")
      ) {
        draft.context.community.push({
          id: generateId(),
          name: "Kind 1",
          type: "child",
          age: "0-5",
          income: [
            {
              type: "ChildAllowance",
              amount: incomeType.ChildAllowance.standardAmount,
            },
          ],
        });
      } else {
        /** without children */
        draft.context.community = draft.context.community.filter(
          (person) => person.type !== "child"
        );
      }
    });

    dispatch({
      type: "next",
      state: nextState,
    });

    const nextStep = stepsConfig[state.currentStep].next(nextState.context);
    push(`${stepsConfig[nextStep].id}`);
  }

  const handleBack = useCallback(() => {
    dispatch({ type: "previous" });

    const previousStep = stepsConfig[state.currentStep].previous;
    push(`${stepsConfig[previousStep].id}`);
  }, [state]);

  return (
    <StepRoot id={step.id}>
      <StepTitle>{step.title}</StepTitle>
      <StepDescription>{step.description}</StepDescription>
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
          <Button onClick={handleBack} size="lg" type="button">
            <ArrowLeftCircleIcon className="w-4 h-4" />
          </Button>
          <Button className="grow sm:grow-0 sm:w-48 " size="lg" type="submit">
            Weiter
            <ArrowRightCircleIcon className="w-4 h-4 ml-3" />
          </Button>
        </StepNavigation>
      </form>
    </StepRoot>
  );
}
