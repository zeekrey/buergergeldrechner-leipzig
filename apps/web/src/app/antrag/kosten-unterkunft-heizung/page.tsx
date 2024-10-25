"use client";

import type { FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { StepContent, StepNavigation } from "@/components/ui/step-primitives";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { produce } from "immer";
import {
  StepRoot,
  StepTitle,
  StepDescription,
} from "@/components/ui/step-primitives";
import { stepsConfig } from "@/lib/machine";
import { useRouter } from "next/navigation";
import { useStateContext } from "@/components/context";
import { CheckedState } from "@radix-ui/react-checkbox";
import HelpMarkdown from "@/config/steps/kosten-unterkunft-heizung.mdx";

const step = stepsConfig[7];

export default function StepSpending() {
  const { push } = useRouter();
  const [state, setState] = useStateContext();
  const [hasNoSpendings, setHasNoSpendings] = useState(false);

  const calculateSum = useCallback(
    ({ rent = 0, utilities = 0, heating = 0, sum = 0 }) => {
      return rent + utilities + heating;
    },
    []
  );

  const onValueChange = (key: keyof typeof state.spendings, value: number) => {
    const newState = produce(state, (draft) => {
      draft.spendings[key] = value;
      draft.spendings.sum = calculateSum(draft.spendings);
    });

    setState(newState);
  };

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextStep = step.next(state);
    push(`${stepsConfig[nextStep].id}`);
  }

  const handleBack = useCallback(() => {
    push(`${stepsConfig[step.previous].id}`);
  }, [state]);

  const handleHasNoSpendingsChange = (_hasNoSpendings: CheckedState) => {
    if (_hasNoSpendings) {
      const newState = produce(state, (draft) => {
        draft.spendings.sum = 0;
        draft.spendings.heating = 0;
        draft.spendings.rent = 0;
        draft.spendings.utilities = 0;
      });

      setState(newState);
    }

    setHasNoSpendings(!hasNoSpendings);
  };

  return (
    <StepRoot id={step.id}>
      <StepTitle title={step.title}>
        <HelpMarkdown />
      </StepTitle>
      <StepDescription>{step.description}</StepDescription>
      <form className="space-y-2" onSubmit={onSubmit}>
        <StepContent>
          <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <div>
              <Checkbox
                checked={hasNoSpendings}
                onCheckedChange={handleHasNoSpendingsChange}
              />
            </div>
            <div className="space-y-1 leading-none">
              <p className="text-sm">
                Mir entstehen keine Kosten für Unterkunft und Heizung
              </p>
            </div>
          </div>
          <ScrollArea className="sm:h-[380px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Position</TableHead>
                  <TableHead className="text-right">Betrag</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">
                    Kaltmiete (Schuldzins bei Wohneigentum)
                  </TableCell>
                  <TableCell className="w-[60px] text-right relative">
                    <i className="absolute right-7 top-6 not-italic text-input">
                      €
                    </i>
                    <Input
                      min={1}
                      placeholder="0,00€"
                      inputMode="numeric"
                      disabled={hasNoSpendings}
                      value={state.spendings.rent}
                      onChange={(e) =>
                        onValueChange("rent", Number(e.currentTarget.value))
                      }
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Nebenkosten</TableCell>
                  <TableCell className="text-right relative">
                    <i className="absolute right-7 top-6 not-italic text-input">
                      €
                    </i>
                    <Input
                      min={1}
                      inputMode="numeric"
                      placeholder="0,00€"
                      disabled={hasNoSpendings}
                      value={state.spendings.utilities}
                      onChange={(e) =>
                        onValueChange(
                          "utilities",
                          Number(e.currentTarget.value)
                        )
                      }
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Heizkosten</TableCell>
                  <TableCell className="text-right relative">
                    <i className="absolute right-7 top-6 not-italic text-input">
                      €
                    </i>
                    <Input
                      min={1}
                      inputMode="numeric"
                      placeholder="0,00€"
                      disabled={hasNoSpendings}
                      value={state.spendings.heating}
                      onChange={(e) =>
                        onValueChange("heating", Number(e.currentTarget.value))
                      }
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell className="font-medium">Summe</TableCell>
                  <TableCell className="text-right relative">
                    <i className="absolute right-7 top-6 not-italic text-input">
                      €
                    </i>
                    <Input
                      className="m-0"
                      disabled
                      value={state.spendings.sum}
                    />
                  </TableCell>
                </TableRow>
              </TableFooter>
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
