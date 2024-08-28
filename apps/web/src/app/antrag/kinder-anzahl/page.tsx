"use client";

import type { FormEvent } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StepContent, StepNavigation } from "@/components/ui/step-primitives";
import {
  ArrowRightCircleIcon,
  ArrowLeftCircleIcon,
  XCircleIcon,
} from "lucide-react";
import { useMemo, useCallback } from "react";
import {
  StepRoot,
  StepTitle,
  StepDescription,
} from "@/components/ui/step-primitives";

import { Button } from "../../../components/ui/button";
import { produce } from "immer";
import { TChild, TPerson } from "@/lib/types";
import { stepsConfig } from "@/lib/machine";
import { useRouter } from "next/navigation";
import { generateId } from "@/lib/utils";
import { incomeType } from "@/lib/types";
import { useStateContext } from "@/components/context";

const step = stepsConfig[3];

export default function StepChildrenCount() {
  const { push } = useRouter();
  const [state, setState] = useStateContext();

  const children = useMemo(
    () => state.community.filter((person) => person.type === "child"),
    [state]
  );

  const childAges: { [key in TChild["age"]]: string } = {
    "0-5": "0-5 Jahre",
    "6-13": "6-13 Jahre",
    "14-17": "14-17 Jahre",
    "18+": "18+ Jahre",
  };

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

  const handleChange = (age: TChild["age"], id: TPerson["id"]) => {
    const newState = produce(state, (draft) => {
      const index = draft.community.findIndex((person) => person.id === id);
      if (index !== -1) (draft.community[index] as TChild).age = age;
    });

    setState(newState);
  };

  const handleBack = useCallback(() => {
    push(`${stepsConfig[step.previous].id}`);
  }, [state]);

  const addChildren = () => {
    const newState = produce(state, (draft) => {
      draft.community.push({
        id: generateId(),
        type: "child",
        name: `Kind ${children.length + 1}`,
        age: "0-5",
        income: [
          {
            type: "ChildAllowance",
            amount: incomeType.ChildAllowance.standardAmount,
          },
        ],
      });
    });

    setState(newState);
  };

  const removeChildren = (id: TPerson["id"]) => {
    const newState = produce(state, (draft) => {
      const index = draft.community.findIndex((person) => person.id === id);
      if (index !== -1) draft.community.splice(index, 1);
    });

    setState(newState);
  };

  return (
    <StepRoot id={step.id}>
      <StepTitle>{step.title}</StepTitle>
      <StepDescription>{step.description}</StepDescription>
      <form onSubmit={handleSubmit}>
        <StepContent>
          <ScrollArea className="sm:h-[200px]">
            {children.map((child, index) => (
              <div className="items-center gap-3 flex py-1" key={index}>
                <div className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1">
                  {child.name}
                </div>
                <Select
                  value={child.age}
                  onValueChange={(value) =>
                    handleChange(value as TChild["age"], child.id)
                  }
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Altersgruppe" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(childAges).map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  onClick={() => removeChildren(child.id)}
                  variant="outline"
                  type="button"
                >
                  <XCircleIcon className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <div className="items-center gap-4 flex pt-1">
              <Button
                className="flex h-10 w-full items-center justify-between rounded-md border border-input text-input border-dashed cursor-pointer bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
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
