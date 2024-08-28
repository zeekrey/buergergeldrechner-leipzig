"use client";

import type { FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { StepContent, StepNavigation } from "@/components/ui/step-primitives";
import { useStepsMachine } from "@/lib/machine";
import { ArrowRightCircleIcon } from "lucide-react";
import { useCallback } from "react";
import { Checkbox } from "../../../components/ui/checkbox";
import {
  StepRoot,
  StepTitle,
  StepDescription,
} from "@/components/ui/step-primitives";
import { stepsConfig } from "@/lib/machine";
import { useRouter } from "next/navigation";
import { produce } from "immer";
import { generateId } from "@/lib/utils";
import { useLocalStorageState } from "@/lib/hooks";

const step = stepsConfig[0];

export default function StepEmployable() {
  const { push } = useRouter();
  const [state, dispatch] = useStepsMachine();

  useLocalStorageState(dispatch);

  const handleCheckedChange = useCallback((value: boolean) => {
    dispatch({
      type: "load",
      state: produce(state, (draft) => {
        draft.context.isEmployable = value;
      }),
    });
  }, []);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      dispatch({
        type: "next",
        state: produce(state, (draft) => {
          /** Create a new person if the community is empty. */
          if (!draft.context.community.length) {
            draft.context.community.push({
              id: generateId(),
              type: "adult",
              name: "Antragsteller",
            });
          }
        }),
      });
      const nextStep = stepsConfig[state.currentStep].next(state.context);
      push(`${stepsConfig[nextStep].id}`);
    },
    [state]
  );

  return (
    <StepRoot id={step.id}>
      <StepTitle>{step.title}</StepTitle>
      <StepDescription>{step.description}</StepDescription>
      <form onSubmit={handleSubmit}>
        <StepContent>
          <div className="items-top flex space-x-2 grow px-2 py-4 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
            <Checkbox
              id="terms1"
              checked={state.context.isEmployable}
              onCheckedChange={(value: boolean) => handleCheckedChange(value)}
            />
            <label
              htmlFor="terms1"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Ja, ich bin erwerbsfähig.
            </label>
          </div>
        </StepContent>
        <StepNavigation>
          <div />
          <Button
            className="grow sm:grow-0 sm:w-48 "
            size="lg"
            type="submit"
            disabled={!state.context.isEmployable}
          >
            Weiter
            <ArrowRightCircleIcon className="w-4 h-4 ml-3" />
          </Button>
        </StepNavigation>
      </form>
    </StepRoot>
  );
}
