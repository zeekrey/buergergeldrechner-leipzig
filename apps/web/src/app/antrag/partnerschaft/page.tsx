"use client";

import type { FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { StepContent, StepNavigation } from "@/components/ui/step-primitives";
import { stepsConfig } from "@/lib/machine";
import {
  ArrowRightCircleIcon,
  ArrowLeftCircleIcon,
  UserIcon,
  UsersIcon,
} from "lucide-react";
import { useCallback, useMemo } from "react";
import { produce } from "immer";
import {
  StepRoot,
  StepTitle,
  StepDescription,
} from "@/components/ui/step-primitives";
import { useRouter } from "next/navigation";
import { generateId, generateMember } from "@/lib/utils";
import { useStateContext } from "@/components/context";
import HelpMarkdown from "@/config/steps/partnerschaft.mdx";

type RadioValue = "with-partner" | "without-partner";
const step = stepsConfig[1];

export default function StepPartner() {
  const { push } = useRouter();
  const [state, setState] = useStateContext();

  const partner = useMemo(
    () =>
      state.community.findIndex((person) => person.name === "Partner") !== -1
        ? "with-partner"
        : "without-partner",
    [state]
  );

  const handleChange = useCallback(
    (value: RadioValue) => {
      const newState = produce(state, (draft) => {
        /** Add a partner only if not already existing. */
        if (
          value === "with-partner" &&
          draft.community.findIndex((person) => person.name === "Partner") ===
            -1
        ) {
          draft.community.push(
            generateMember({
              id: generateId(),
              type: "adult",
              name: "Partner",
              income: [],
            })
          );
        } else {
          /** Remove partner if one exists. */
          const index = draft.community.findIndex(
            (person) => person.name === "Partner"
          );
          if (index !== -1) draft.community.splice(index, 1);
        }
      });

      setState(newState);
    },
    [state]
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextStep = step.next(state);
    push(`${stepsConfig[nextStep].id}`);
  };

  const handleBack = useCallback(() => {
    push(`${stepsConfig[step.previous].id}`);
  }, [state]);

  return (
    <StepRoot id={step.id}>
      <StepTitle title={step.title}>
        <HelpMarkdown />
      </StepTitle>
      <StepDescription>{step.description}</StepDescription>
      <form onSubmit={handleSubmit}>
        <StepContent>
          <RadioGroup
            className="py-6 gap-4 flex flex-col"
            value={partner}
            onValueChange={(value: RadioValue) => handleChange(value)}
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
