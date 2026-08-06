"use client";

import type { FormEvent } from "react";

import { produce } from "immer";
import { BabyIcon, CircleOffIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

import { useStateContext } from "@/components/context";
import {
  WizardBackButton,
  WizardNextButton,
} from "@/components/questionnaire/actions";
import {
  QuestionnaireChoiceCard,
  QuestionnaireChoiceGroup,
} from "@/components/questionnaire/choice-card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  StepContent,
  StepDescription,
  StepNavigation,
  StepRoot,
  StepTitle,
} from "@/components/ui/step-primitives";
import HelpMarkdown from "@/config/steps/kinder.mdx";
import { stepsConfig } from "@/lib/machine";
import { incomeType } from "@/lib/types";
import { generateId, generateMember } from "@/lib/utils";

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
          draft.community.push(
            generateMember({
              id: generateId(),
              name: "Kind 1",
              type: "child",
              age: 1,
              income: [
                {
                  id: generateId(),
                  type: "ChildAllowance",
                  amount: incomeType.ChildAllowance.standardAmount ?? 0,
                  allowance: 0,
                },
              ],
            })
          );
        } else {
          /** without children */
          draft.community = draft.community.filter(
            (person) => person.type !== "child"
          );
        }
      });

      setState(newState);
    },
    [setState, state]
  );

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const nextStep = step.next(state);
      push(`${stepsConfig[nextStep].id}`);
    },
    [push, state]
  );

  const handleBack = useCallback(() => {
    push(`${stepsConfig[step.previous].id}`);
  }, [push]);

  return (
    <StepRoot id={step.id}>
      <StepTitle title={step.title}>
        <HelpMarkdown />
      </StepTitle>
      <StepDescription>{step.description}</StepDescription>
      <form onSubmit={handleSubmit}>
        <StepContent>
          <RadioGroup
            className="flex flex-col gap-3"
            onValueChange={(value: RadioValue) => handleChange(value)}
            value={children}
          >
            <QuestionnaireChoiceGroup>
              <QuestionnaireChoiceCard
                checked={children === "with-children"}
                control={
                  <RadioGroupItem id="with-children" value="with-children" />
                }
                htmlFor="with-children"
                icon={BabyIcon}
                title="Kinder"
              />
              <QuestionnaireChoiceCard
                checked={children === "without-children"}
                control={
                  <RadioGroupItem
                    id="without-children"
                    value="without-children"
                  />
                }
                htmlFor="without-children"
                icon={CircleOffIcon}
                title="Keine Kinder"
              />
            </QuestionnaireChoiceGroup>
          </RadioGroup>
        </StepContent>
        <StepNavigation>
          <WizardBackButton onClick={handleBack}>Zurück</WizardBackButton>
          <WizardNextButton>Weiter</WizardNextButton>
        </StepNavigation>
      </form>
    </StepRoot>
  );
}
