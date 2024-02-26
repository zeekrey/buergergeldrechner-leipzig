"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StepContent, StepNavigation } from "@/components/ui/step-primitives";
import { useSteps, useStepsDispatch } from "@/lib/machine";
import { XCircleIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "../ui/button";

export function StepChildrenCount() {
  // anzahl_kinder
  const dispatch = useStepsDispatch();
  const steps = useSteps();
  const [childrenCount, setChildrenCount] = useState(
    steps.context.kinder ?? []
  );

  const childAges = {
    adult: "Erwachsen (19+ Jahre)",
    child: "Kind (4-6 Jahre)",
    teen: "Teenager (7-18 Jahre)",
    toddler: "Kleinkind (0-3 Jahre)",
  };

  return (
    <>
      <StepContent>
        {childrenCount.map((child, index) => (
          <div className="items-center gap-3 flex pb-3" key={index}>
            <div className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1">
              {index + 1}. Kind
            </div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Theme" />
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
            >
              <XCircleIcon className="w-4 h-4" />
            </Button>
          </div>
        ))}
        <div className="items-center gap-4 flex">
          <Button
            className="flex h-10 w-full items-center justify-between rounded-md border border-input text-input border-dashed cursor-pointer bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
            onClick={() => setChildrenCount([...childrenCount, ""])}
            variant="ghost"
          >
            Kind hinzufügen
          </Button>
        </div>
      </StepContent>
      <StepNavigation
        onNext={() => dispatch({ data: { kinder: children }, type: "next" })}
        onPrev={() => dispatch({ type: "previous" })}
      />
    </>
  );
}
