"use client";

import type { FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { StepContent, StepNavigation } from "@/components/ui/step-primitives";
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
import { useMemo, useCallback } from "react";
import { produce } from "immer";
import { stepsConfig } from "@/lib/machine";
import { useRouter } from "next/navigation";
import { generateId } from "@/lib/utils";
import { incomeType } from "@/lib/types";
import { useStateContext } from "@/components/context";

type RadioValue = "with-children" | "without-children";
const step = stepsConfig[2];

export default function StepChildren() {
  const { push } = useRouter();
  const [state, setState] = useStateContext();

  const children = useMemo(
    () =>
      state.community.some((person) => person.type === "child")
        ? "with-children"
        : "without-children",
    [state]
  );

  const handleChange = useCallback(
    (value: RadioValue) => {
      const newState = produce(state, (draft) => {
        if (
          value === "with-children" &&
          !draft.community.find((person) => person.type === "child")
        ) {
          draft.community.push({
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
          draft.community = draft.community.filter(
            (person) => person.type !== "child"
          );
        }
      });

      setState(newState);
    },
    [state]
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextStep = step.next(state);
    push(`${stepsConfig[nextStep].id}`);
  }

  const handleBack = useCallback(() => {
    push(`${stepsConfig[step.previous].id}`);
  }, [state]);

  return (
    <StepRoot id={step.id}>
      <StepTitle>{step.title}</StepTitle>
      <StepDescription>{step.description}</StepDescription>
      <form onSubmit={handleSubmit}>
        <StepContent>
          <RadioGroup
            className="py-6 gap-4 flex flex-col"
            value={children}
            onValueChange={(value: "with-children" | "without-children") =>
              handleChange(value)
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
