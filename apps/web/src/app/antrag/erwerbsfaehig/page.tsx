"use client";

import type { FormEvent } from "react";

import { Button } from "@/components/ui/button";
import {
  StepContent,
  StepNavigation,
  StepNote,
} from "@/components/ui/step-primitives";
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
import { generateId, generateMember } from "@/lib/utils";
import { useStateContext } from "@/components/context";
import HelpMarkdown from "@/config/steps/erwerbsfaehig.mdx";

const step = stepsConfig[0];

export default function StepEmployable() {
  const { push } = useRouter();
  const [state, setState] = useStateContext();

  const handleCheckedChange = useCallback((value: boolean) => {
    setState(
      produce(state, (draft) => {
        draft.isEmployable = value;
      })
    );
  }, []);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const newState = produce(state, (draft) => {
        /** Create a new person if the community is empty. */
        if (!draft.community.length) {
          draft.community.push(
            generateMember({
              id: generateId(),
              type: "adult",
              name: "Antragsteller",
            })
          );
        }
      });

      setState(newState);

      const nextStep = step.next(state);
      push(`${stepsConfig[nextStep].id}`);
    },
    [state]
  );

  return (
    <StepRoot id={step.id}>
      <StepTitle title={step.title}>
        <HelpMarkdown />
      </StepTitle>
      <StepDescription>{step.description}</StepDescription>
      <form onSubmit={handleSubmit}>
        <StepContent>
          <div className="items-top flex space-x-2 grow px-2 py-4 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
            <Checkbox
              id="terms1"
              checked={state.isEmployable}
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
            disabled={!state.isEmployable}
          >
            Weiter
            <ArrowRightCircleIcon className="w-4 h-4 ml-3" />
          </Button>
        </StepNavigation>
      </form>
      <StepNote>
        Sind Sie nicht erwerbsfähig, so stehen Ihnen unter Umständen andere
        Sozialleistungen zu. Hier finden Sie eine Übersicht über möglich
        Alternativen. <a href="http://">→ Jobcenter</a>
      </StepNote>
    </StepRoot>
  );
}
