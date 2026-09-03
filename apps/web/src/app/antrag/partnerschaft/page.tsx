"use client";

import type { FormEvent } from "react";

import { produce } from "immer";
import { UserIcon, UsersIcon } from "lucide-react";
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
import HelpMarkdown from "@/config/steps/partnerschaft.mdx";
import { stepsConfig } from "@/lib/machine";
import { generateId, generateMember } from "@/lib/utils";

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
          if (index !== -1) {
            const [removedPartner] = draft.community.splice(index, 1);
            draft.assets.items = draft.assets.items.filter(
              (asset) => asset.personId !== removedPartner.id
            );
          }
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
    push(`${stepsConfig[step.previous(state)].id}`);
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
            value={partner}
          >
            <QuestionnaireChoiceGroup>
              <QuestionnaireChoiceCard
                checked={partner === "without-partner"}
                control={
                  <RadioGroupItem
                    id="without-partner"
                    value="without-partner"
                  />
                }
                htmlFor="without-partner"
                icon={UserIcon}
                title="Alleinstehend"
              />
              <QuestionnaireChoiceCard
                checked={partner === "with-partner"}
                control={
                  <RadioGroupItem id="with-partner" value="with-partner" />
                }
                htmlFor="with-partner"
                icon={UsersIcon}
                title="Partnerschaft"
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
