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
import { useStepsMachine } from "@/lib/machine";
import { ArrowRightCircleIcon, XCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "../ui/button";
import { produce } from "immer";
import { TChild } from "@/lib/types";

export function StepChildrenCount() {
  const [state, dispatch] = useStepsMachine();

  const [children, setChildren] = useState<TChild[]>([]);

  /** FIXME: Used to sync internal state with global state object. */
  useEffect(() => {
    setChildren(
      state.context.community.filter((entry) => entry.type === "child")
    );
  }, [state.context.community]);

  const childAges: { [key in TChild["age"]]: string } = {
    "18+": "18+ Jahre",
    "6-13": "6-13 Jahre",
    "14-17": "14-17 Jahre",
    "0-5": "0-5 Jahre",
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch({
      type: "next",
      state: produce(state, (draft) => {
        draft.context.community = [
          ...draft.context.community.filter((entry) => entry.type !== "child"),
          ...children,
        ];
      }),
    });
  };

  const handleChange = (value: TChild["age"], index: number) => {
    setChildren(
      produce(children, (draft) => {
        draft[index].age = value;
      })
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <StepContent>
        <ScrollArea className="sm:h-[200px]">
          {children.map((child, index) => (
            <div className="items-center gap-3 flex py-3" key={index}>
              <div className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1">
                {child.name}
              </div>
              <Select
                value={child.age}
                onValueChange={(value) =>
                  handleChange(value as TChild["age"], index)
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
                onClick={() =>
                  setChildren([
                    ...children.slice(0, index),
                    ...children.slice(index + 1),
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
                setChildren((curr) => [
                  ...curr,
                  { type: "child", name: "Kind", age: "0-5" },
                ])
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
