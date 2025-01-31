"use client";

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
import { useState } from "react";
import { StepTitle, StepDescription } from "@/components/ui/step-primitives";
import { Button } from "@/components/ui/button";
import { stepsConfig } from "@/lib/machine";
import HelpMarkdown from "@/config/steps/kinder-anzahl.mdx";

const step = stepsConfig[3];

export function StepExample() {
  const [children, setChildren] = useState([
    {
      name: "Pepe",
      age: 3,
    },
    {
      name: "Sophie",
      age: 6,
    },
  ]);

  function addChildren() {
    setChildren([...children, { name: "👼🏻", age: 2 }]);
  }

  function handleChange(age: number, id: number) {
    const newState = children.map((child, i) =>
      i === id ? { ...child, age } : child
    );
    setChildren(newState);
  }

  function removeChildren(id: number) {
    const newState = children.filter((_, i) => i !== id);
    setChildren(newState);
    console.log(children);
  }

  return (
    <div className="sm:border sm:shadow-sm rounded-lg w-full flex flex-col min-h-96 bg-background pt-14 sm:pt-0">
      <StepTitle title={step.title}>
        <HelpMarkdown />
      </StepTitle>
      <StepDescription>{step.description}</StepDescription>
      <StepContent>
        <ScrollArea className="sm:h-[200px]">
          {children.map((child, index) => (
            <div className="items-center gap-3 flex py-1" key={index}>
              <div className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1">
                {child.name}
              </div>
              <Select
                value={child.age.toString()}
                onValueChange={(value) => handleChange(Number(value), index)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Altersgruppe" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 24 }, (_, i) => i + 1).map((value) => (
                    <SelectItem key={value.toString()} value={value.toString()}>
                      {value} {value < 2 ? "Jahr" : "Jahre"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                onClick={() => removeChildren(index)}
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
        <Button size="lg" type="button">
          <ArrowLeftCircleIcon className="w-4 h-4" />
        </Button>
        <Button className="grow sm:grow-0 sm:w-48 " size="lg" type="button">
          Weiter
          <ArrowRightCircleIcon className="w-4 h-4 ml-3" />
        </Button>
      </StepNavigation>
    </div>
  );
}
