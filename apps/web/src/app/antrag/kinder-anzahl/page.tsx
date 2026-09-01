"use client";

import type { FormEvent } from "react";

import { produce } from "immer";
import { XCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useCallback } from "react";

import { useStateContext } from "@/components/context";
import {
  WizardBackButton,
  WizardNextButton,
} from "@/components/questionnaire/actions";
import { ScrollArea } from "@/components/ui/scroll-area";
import { StepContent, StepNavigation } from "@/components/ui/step-primitives";
import {
  StepRoot,
  StepTitle,
  StepDescription,
} from "@/components/ui/step-primitives";
import HelpMarkdown from "@/config/steps/kinder-anzahl.mdx";
import { stepsConfig } from "@/lib/machine";
import { TPerson } from "@/lib/types";
import { incomeType } from "@/lib/types";
import { generateId, generateMember } from "@/lib/utils";

import { Button } from "../../../components/ui/button";

const step = stepsConfig[3];

export default function StepChildrenCount() {
  const { push } = useRouter();
  const [state, setState] = useStateContext();

  const children = useMemo(
    () => state.community.filter((person) => person.type === "child"),
    [state]
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newState = produce(state, (draft) => {
      draft.community = [
        ...draft.community.filter((entry) => entry.type !== "child"),
        ...children,
      ];
    });

    setState(newState);

    const nextStep = step.next(newState);
    push(`${stepsConfig[nextStep].id}`);
  };

  const handleBack = useCallback(() => {
    push(`${stepsConfig[step.previous(state)].id}`);
  }, [state]);

  const addChildren = () => {
    const newState = produce(state, (draft) => {
      draft.community.push(
        generateMember({
          id: generateId(),
          type: "child",
          name: `Kind ${children.length + 1}`,
          age: -1,
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
    });

    setState(newState);
  };

  const removeChildren = (id: TPerson["id"]) => {
    const newState = produce(state, (draft) => {
      const index = draft.community.findIndex((person) => person.id === id);
      if (index !== -1) draft.community.splice(index, 1);
      draft.assets.items = draft.assets.items.filter(
        (asset) => asset.personId !== id
      );
    });

    setState(newState);
  };

  return (
    <StepRoot id={step.id}>
      <StepTitle title={step.title}>
        <HelpMarkdown />
      </StepTitle>
      <StepDescription>{step.description}</StepDescription>
      <form onSubmit={handleSubmit}>
        <StepContent>
          <ScrollArea className="sm:h-[200px]">
            {children.map((child) => (
              <div className="flex items-center gap-3 py-1" key={child.id}>
                <div className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm">
                  {child.name}
                </div>
                <Button
                  aria-label={`${child.name} entfernen`}
                  onClick={() => removeChildren(child.id)}
                  variant="outline"
                  type="button"
                >
                  <XCircleIcon />
                </Button>
              </div>
            ))}
            <div className="items-center gap-4 flex pt-1">
              <Button
                className="flex h-10 w-full items-center justify-between rounded-md border border-input text-input border-dashed cursor-pointer bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                onClick={addChildren}
                variant="ghost"
                type="button"
              >
                Kind hinzufügen
              </Button>
            </div>
          </ScrollArea>
        </StepContent>
        <StepNavigation>
          <WizardBackButton onClick={handleBack}>Zurück</WizardBackButton>
          <WizardNextButton>Weiter</WizardNextButton>
        </StepNavigation>
      </form>
    </StepRoot>
  );
}
