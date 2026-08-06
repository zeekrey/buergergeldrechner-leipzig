"use client";

import type { FormEvent } from "react";

import { produce } from "immer";
import { BriefcaseIcon, ShieldAlertIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

import { useStateContext } from "@/components/context";
import { WizardNextButton } from "@/components/questionnaire/actions";
import {
  QuestionnaireChoiceCard,
  QuestionnaireChoiceGroup,
} from "@/components/questionnaire/choice-card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import {
  StepContent,
  StepDescription,
  StepNavigation,
  StepRoot,
  StepTitle,
} from "@/components/ui/step-primitives";
import HelpMarkdown from "@/config/steps/erwerbsfaehig.mdx";
import { stepsConfig } from "@/lib/machine";
import { generateId, generateMember } from "@/lib/utils";

const step = stepsConfig[0];

export default function StepEmployable() {
  /** Product requirement: coming from the index page should reset existing calculations. */
  /** FIXME: Can we check the previous page in history? */
  useEffect(() => localStorage.removeItem("state"), []);

  const { push } = useRouter();
  const [state, setState] = useStateContext();

  const handleCheckedChange = useCallback(
    (value: boolean) => {
      setState(
        produce(state, (draft) => {
          draft.isEmployable = value;
        })
      );
    },
    [setState, state]
  );

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
    [push, setState, state]
  );

  return (
    <StepRoot id={step.id}>
      <StepTitle title={step.title}>
        <HelpMarkdown />
      </StepTitle>
      <StepDescription>{step.description}</StepDescription>
      <form onSubmit={handleSubmit}>
        <StepContent className="flex flex-col gap-6">
          <QuestionnaireChoiceGroup>
            <QuestionnaireChoiceCard
              checked={state.isEmployable}
              control={
                <Checkbox
                  checked={state.isEmployable}
                  id="terms1"
                  onCheckedChange={(value) => handleCheckedChange(value === true)}
                />
              }
              htmlFor="terms1"
              icon={BriefcaseIcon}
              title="Ja, ich bin erwerbsfähig."
            />
          </QuestionnaireChoiceGroup>
          <Alert>
            <ShieldAlertIcon className="size-4" />
            <AlertTitle>Nicht erwerbsfähig?</AlertTitle>
            <AlertDescription>
              Sind Sie nicht erwerbsfähig, so stehen Ihnen unter Umständen andere
              Sozialleistungen zu. Hier finden Sie eine Übersicht über möglich
              Alternativen.{" "}
              <a href="https://www.leipzig.de/buergerservice-und-verwaltung/aemter-und-behoerdengaenge/behoerden-und-dienstleistungen/dienstleistung/sozialhilfe-beantragen-5b5842148421a/">
                → Sozialhilfe
              </a>
            </AlertDescription>
          </Alert>
        </StepContent>
        <StepNavigation className="justify-end">
          <WizardNextButton disabled={!state.isEmployable}>
            Weiter
          </WizardNextButton>
        </StepNavigation>
      </form>
    </StepRoot>
  );
}
