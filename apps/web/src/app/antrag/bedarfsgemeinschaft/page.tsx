"use client";

import type { FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { StepContent, StepNavigation } from "@/components/ui/step-primitives";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "lucide-react";
import {
  StepRoot,
  StepTitle,
  StepDescription,
} from "@/components/ui/step-primitives";
import { stepsConfig } from "@/lib/machine";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useStateContext } from "@/components/context";

const step = stepsConfig[5];

export default function StepCommunity() {
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

  return (
    <StepRoot id={step.id}>
      <StepTitle>{step.title}</StepTitle>
      <StepDescription>{step.description}</StepDescription>
      <form onSubmit={handleSubmit}>
        <StepContent>
          <ScrollArea className="sm:h-[380px]">
            <Table>
              {/* <TableCaption>Ihre Bedarfsgemeinschaft</TableCaption> */}
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Person</TableHead>
                  {/* <TableHead className="text-right">Schwanger</TableHead> */}
                  {/* <TableHead className="text-right">Ausbildung</TableHead> */}
                </TableRow>
              </TableHeader>
              <TableBody>
                {state.community.map((person, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium w-full">
                      {person.name}
                      {person.type === "child" && (
                        <span className="ml-1 text-muted-foreground">
                          ({person.age})
                        </span>
                      )}
                    </TableCell>
                    {/* <TableCell className="text-center">
                    <Checkbox />
                  </TableCell> */}
                    {/* <TableCell className="text-center">
                    <Checkbox />
                  </TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
