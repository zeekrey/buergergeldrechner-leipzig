"use client";

import type { FormEvent } from "react";

import { produce } from "immer";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useStateContext } from "@/components/context";
import {
  WizardBackButton,
  WizardNextButton,
} from "@/components/questionnaire/actions";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  StepContent,
  StepDescription,
  StepNavigation,
  StepRoot,
  StepTitle,
} from "@/components/ui/step-primitives";
import { isValidPersonAge } from "@/lib/complete-context";
import { stepsConfig } from "@/lib/machine";

const step = stepsConfig[4];
const adultAges = Array.from({ length: 106 }, (_, index) => index + 15);
const childAges = Array.from({ length: 25 }, (_, index) => index);

export default function StepAges() {
  const { push } = useRouter();
  const [state, setState] = useStateContext();
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);

    if (state.community.some((person) => !isValidPersonAge(person))) {
      return;
    }

    push(stepsConfig[step.next(state)].id);
  }

  return (
    <StepRoot id={step.id}>
      <StepTitle title={step.title} />
      <StepDescription>{step.description}</StepDescription>
      <form onSubmit={handleSubmit}>
        <StepContent>
          <FieldGroup>
            {state.community.map((person) => {
              const invalid = submitted && !isValidPersonAge(person);
              const selectId = `age-${person.id}`;

              return (
                <Field
                  data-invalid={invalid || undefined}
                  key={person.id}
                  orientation="horizontal"
                >
                  <FieldContent>
                    <FieldLabel htmlFor={selectId}>
                      {person.name} – Alter in Jahren
                    </FieldLabel>
                    <FieldDescription>
                      {person.type === "child"
                        ? "Vollendete Lebensjahre (0 bis 24)."
                        : "Vollendete Lebensjahre (15 bis 120)."}
                    </FieldDescription>
                    {invalid ? (
                      <FieldError>
                        Bitte geben Sie ein gültiges Alter in vollständigen
                        Jahren an.
                      </FieldError>
                    ) : null}
                  </FieldContent>
                  <Select
                    onValueChange={(value) => {
                      setState((currentState) =>
                        produce(currentState, (draft) => {
                          const entry = draft.community.find(
                            ({ id }) => id === person.id
                          );
                          if (entry) {
                            entry.age = Number(value);
                          }
                        })
                      );
                    }}
                    value={
                      person.age === undefined || person.age < 0
                        ? ""
                        : String(person.age)
                    }
                  >
                    <SelectTrigger
                      aria-invalid={invalid || undefined}
                      className="ml-auto min-w-24"
                      id={selectId}
                    >
                      <SelectValue placeholder="Alter" />
                    </SelectTrigger>
                    <SelectContent align="end" position="popper">
                      <SelectGroup>
                        {(person.type === "child" ? childAges : adultAges).map(
                          (age) => (
                            <SelectItem key={age} value={String(age)}>
                              {String(age)}
                            </SelectItem>
                          )
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
              );
            })}
          </FieldGroup>
        </StepContent>
        <StepNavigation>
          <WizardBackButton
            onClick={() => push(stepsConfig[step.previous(state)].id)}
          >
            Zurück
          </WizardBackButton>
          <WizardNextButton>Weiter</WizardNextButton>
        </StepNavigation>
      </form>
    </StepRoot>
  );
}
