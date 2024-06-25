"use client";

import type { FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { StepContent, StepNavigation } from "@/components/ui/step-primitives";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useStepsMachine } from "@/lib/machine";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "lucide-react";
import { useState } from "react";
import { Switch } from "../ui/switch";

export function StepAttributes() {
  const [state, dispatch] = useStepsMachine();
  const [rent, setRent] = useState(0);
  const [utilities, setUtilities] = useState(0);
  const [heating, setHeating] = useState(0);

  const sum = rent + utilities + heating;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch({
      // data: {},
      type: "next",
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <StepContent>
        <div className="space-y-4">
          {/* Schwangerschaft */}
          <div className="space-y-2 flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <label
                className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-base"
                htmlFor=":r1fk:-form-item"
              >
                Schwangerschaft
              </label>
              <p
                id=":r1fk:-form-item-description"
                className="text-[0.8rem] text-muted-foreground"
              >
                Ist eine Personen in Ihrer Bedarfsgemeinschaft schwanger?
              </p>
            </div>
            <Switch />
          </div>
          {/* Ausbildung */}
          <div className="space-y-2 flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <label
                className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-base"
                htmlFor=":r1fk:-form-item"
              >
                Ausbildung
              </label>
              <p
                id=":r1fk:-form-item-description"
                className="text-[0.8rem] text-muted-foreground"
              >
                Befindet sich eine Person in Ihrer Bedarfsgemeinschaft in
                Ausbildung?
              </p>
            </div>
            <Switch />
          </div>
          {/* Ernährung */}
          <div className="space-y-2 flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <label
                className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-base"
                htmlFor=":r1fk:-form-item"
              >
                Spezielle Ernährung
              </label>
              <p
                id=":r1fk:-form-item-description"
                className="text-[0.8rem] text-muted-foreground"
              >
                Hat eine Person in Ihrer Bedarfsgemeinschaft eine Erkrankung
                welche eine spezielle Ernährung erfordert?
              </p>
            </div>
            <Switch />
          </div>
        </div>
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
