"use client";

import type { FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { StepContent, StepNavigation } from "@/components/ui/step-primitives";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "lucide-react";
import {
  StepRoot,
  StepTitle,
  StepDescription,
} from "@/components/ui/step-primitives";
import { stepsConfig } from "@/lib/machine";
import { useRouter } from "next/navigation";
import { Fragment, useCallback } from "react";
import { useStateContext } from "@/components/context";
import { produce } from "immer";
import { Checkbox } from "@/components/ui/checkbox";
import { diseases as DiseasesMap } from "@/lib/types";

const step = stepsConfig[6];

export default function StepDiseases() {
  const { push } = useRouter();
  const [state, setState] = useStateContext();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextStep = step.next(state);
    push(`${stepsConfig[nextStep].id}`);
  }

  const handleBack = useCallback(() => {
    push(`${stepsConfig[step.previous].id}`);
  }, [state]);

  const handleChange = (personId, disease) => {
    const newState = produce(state, (draft) => {
      const personIndex = draft.community.findIndex(
        (_person) => _person.id === personId
      );
      if (personIndex !== -1) {
        const index =
          draft.community[personIndex].attributes.diseases.indexOf(disease);
        if (index > -1) {
          draft.community[personIndex].attributes.diseases.splice(index, 1);
        } else {
          draft.community[personIndex].attributes.diseases.push(disease);
        }
      }
    });

    setState(newState);
  };

  return (
    <StepRoot id={step.id}>
      <StepTitle>{step.title}</StepTitle>
      <StepDescription>{step.description}</StepDescription>
      <form onSubmit={handleSubmit}>
        <StepContent>
          <ScrollArea className="sm:h-[380px]">
            {state.community
              .filter((p) => p.attributes?.hasDiseases)
              .map((person) => (
                <Fragment key={person.id}>
                  <p className="font-bold mb-2 text-muted-foreground">
                    {person.name}
                  </p>
                  <fieldset>
                    {(
                      [
                        "renalInsufficiency",
                        "liverDiseases",
                        "celiacDisease",
                        "cysticFibrosis",
                      ] as const
                    ).map((disease) => (
                      <label
                        key={disease}
                        className="flex items-center gap-2 w-full bg-primary-foreground/15 p-3 has-[:checked]:bg-primary-foreground text-sm border-x border-primary-foreground has-[:checked]:border-primary first:border-t last:border-b first:rounded-t-lg last:rounded-b-lg"
                      >
                        <Checkbox
                          className="peer"
                          checked={person.attributes.diseases?.includes(
                            disease
                          )}
                          onCheckedChange={() =>
                            handleChange(person.id, disease)
                          }
                        />
                        <span className="flex flex-col">
                          <span className="font-bold">
                            {DiseasesMap[disease].label}
                          </span>
                          <span>{DiseasesMap[disease].description}</span>
                        </span>
                      </label>
                    ))}
                  </fieldset>
                </Fragment>
              ))}
          </ScrollArea>
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
