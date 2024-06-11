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
import { useSteps, useStepsDispatch } from "@/lib/machine";
import { ArrowRightCircleIcon, XCircleIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "../ui/button";

export function StepChildrenCount() {
  const dispatch = useStepsDispatch();
  const steps = useSteps();
  console.log(
    steps.context.community.filter((entry) => entry.type === "child")
  );
  const [childrenCount, setChildrenCount] = useState(
    steps.context.community.filter((entry) => entry.type === "child")
  );
  console.log(childrenCount);

  const childAges = {
    adult: "Erwachsen (19+ Jahre)",
    child: "Kind (4-6 Jahre)",
    teen: "Teenager (7-18 Jahre)",
    toddler: "Kleinkind (0-3 Jahre)",
  };

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch({ data: {}, type: "next" });
  }

  return (
    <form onSubmit={handleSubmit}>
      <StepContent>
        <ScrollArea className="sm:h-[200px]">
          {childrenCount.map((child, index) => (
            <div className="items-center gap-3 flex pb-3" key={index}>
              <div className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1">
                {index + 1}. Kind
              </div>
              <Select>
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
                onClick={() =>
                  setChildrenCount([
                    ...childrenCount.slice(0, index),
                    ...childrenCount.slice(index + 1),
                  ])
                }
                variant="outline"
                type="button"
              >
                <XCircleIcon className="w-4 h-4" />
              </Button>
            </div>
          ))}
          <div className="items-center gap-4 flex">
            <Button
              className="flex h-10 w-full items-center justify-between rounded-md border border-input text-input border-dashed cursor-pointer bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
              onClick={() =>
                setChildrenCount((curr) => [...curr, { type: "child" }])
              }
              variant="ghost"
              type="button"
            >
              Kind hinzufügen
            </Button>
          </div>
        </ScrollArea>
      </StepContent>
      <StepNavigation>
        <Button className="sm:w-48 " size="lg" type="submit">
          Weiter
          <ArrowRightCircleIcon className="w-4 h-4 ml-3" />
        </Button>
      </StepNavigation>
    </form>
  );
}
