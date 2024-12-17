"use client";

import type { FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { StepContent, StepNavigation } from "@/components/ui/step-primitives";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  ChevronDownIcon,
  PlusCircle,
  XCircleIcon,
} from "lucide-react";
import {
  StepRoot,
  StepTitle,
  StepDescription,
} from "@/components/ui/step-primitives";
import { stepsConfig } from "@/lib/machine";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useStateContext } from "@/components/context";
import { TChild, TPerson } from "@/lib/types";
import { produce } from "immer";
import { CheckedState } from "@radix-ui/react-checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import HelpMarkdown from "../../../config/steps/bedarfsgemeinschaft.mdx";

const step = stepsConfig[5];

function getExistingAttributes(obj: TPerson["attributes"]): string {
  const existingKeys: string[] = [];

  if (obj && "isPregnant" in obj && obj.isPregnant) {
    existingKeys.push("Schwanger");
  }
  if (obj && "hasDiseases" in obj && obj.hasDiseases) {
    existingKeys.push("Krankheit");
  }

  return existingKeys.length > 0
    ? existingKeys.join(", ")
    : "Mehrbedarfe auswählen";
}

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

  const handleRemove = useCallback(
    (person: TPerson) => {
      setState(
        produce(state, (draft) => {
          const index = draft.community.findIndex(
            (pers) => pers.id === person.id
          );
          if (index !== -1) draft.community.splice(index, 1);
        })
      );
    },
    [state]
  );

  const handlePregnantChange = useCallback(
    (person: TPerson, checked: CheckedState) => {
      setState(
        produce(state, (draft) => {
          const index = draft.community.findIndex(
            (pers) => pers.id === person.id
          );

          if (index !== -1)
            draft.community[index].attributes = {
              ...state.community[index].attributes,
              isPregnant: Boolean(checked),
            };
        })
      );
    },
    [state]
  );

  const handleDiseasesChange = useCallback(
    (person: TPerson, checked: CheckedState) => {
      setState(
        produce(state, (draft) => {
          const index = draft.community.findIndex(
            (pers) => pers.id === person.id
          );

          if (index !== -1)
            draft.community[index].attributes = {
              ...state.community[index].attributes,
              hasDiseases: Boolean(checked),
              diseases: [],
            };
        })
      );
    },
    [state]
  );

  return (
    <StepRoot id={step.id}>
      <StepTitle title={step.title}>
        <HelpMarkdown />
      </StepTitle>
      <StepDescription>{step.description}</StepDescription>
      <form onSubmit={handleSubmit}>
        <StepContent>
          <ScrollArea className="sm:h-[380px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="">Person</TableHead>
                  <TableHead className="text-center">Mehrbedarfe</TableHead>
                  <TableHead className="text-center"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {state.community.map((person, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {person.name}
                      {person.type === "child" && (
                        <span className="ml-1 text-muted-foreground">
                          ({person.age} {person.age < 2 ? "Jahr" : "Jahre"})
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          {getExistingAttributes(person.attributes)}
                          <PlusCircle className="w-3 h-3 ml-2 inline" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {(person.type === "adult" ||
                            (person as TChild).age > 12) && (
                            <DropdownMenuCheckboxItem
                              checked={person.attributes?.isPregnant}
                              onCheckedChange={(checked) =>
                                handlePregnantChange(person, checked)
                              }
                            >
                              Ist Schwanger
                            </DropdownMenuCheckboxItem>
                          )}
                          <DropdownMenuCheckboxItem
                            checked={Boolean(person.attributes?.hasDiseases)}
                            onCheckedChange={(checked) =>
                              handleDiseasesChange(person, checked)
                            }
                          >
                            Krankheitsbedinge Ernährung
                          </DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                    <TableCell className="text-center">
                      {person.name !== "Antragsteller" && (
                        <Button
                          variant="ghost"
                          type="button"
                          onClick={() => handleRemove(person)}
                        >
                          <XCircleIcon className="w-4 h-4" />
                        </Button>
                      )}
                    </TableCell>
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
          <Button
            className="grow sm:grow-0 sm:w-48 ml-4"
            size="lg"
            type="submit"
          >
            Weiter
            <ArrowRightCircleIcon className="w-4 h-4 ml-3" />
          </Button>
        </StepNavigation>
      </form>
    </StepRoot>
  );
}
