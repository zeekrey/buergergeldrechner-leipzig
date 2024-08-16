"use client";

import type { FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { useStepsMachine } from "@/lib/machine";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "lucide-react";
import { useState, useCallback } from "react";
import { produce } from "immer";
import {
  StepRoot,
  StepTitle,
  StepDescription,
} from "@/components/ui/step-primitives";
import { stepsConfig } from "@/lib/machine";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";

const step = stepsConfig[6];

type TFormData = {
  rent: number;
  utilities: number;
  heating: number;
};

export default function StepSpending() {
  const { push } = useRouter();
  const [state, dispatch] = useStepsMachine();

  const form = useForm<TFormData>({
    defaultValues: {
      rent: state.context.spendings.rent ?? 0,
      utilities: state.context.spendings.utilities ?? 0,
      heating: state.context.spendings.heating ?? 0,
    },
  });

  /** TODO: Not sure if this can be optimized. */
  const rent = form.watch("rent");
  const utilities = form.watch("utilities");
  const heating = form.watch("heating");

  const sum = Number(rent) + Number(utilities) + Number(heating);

  function onSubmit(data: TFormData, event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch({
      state: produce(state, (draft) => {
        draft.context.spendings = { ...data, sum };
      }),
      type: "next",
    });
    const nextStep = stepsConfig[state.currentStep].next(state.context);
    push(`${stepsConfig[nextStep].id}`);
  }

  const handleBack = useCallback(() => {
    dispatch({ type: "previous" });

    const previousStep = stepsConfig[state.currentStep].previous;
    push(`${stepsConfig[previousStep].id}`);
  }, [state]);

  return (
    <StepRoot id={step.id}>
      <StepTitle>{step.title}</StepTitle>
      <StepDescription>{step.description}</StepDescription>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <StepContent>
            <ScrollArea className="sm:h-[380px]">
              <Table>
                <TableCaption>Ihre monatlichen Kosten</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Position</TableHead>
                    <TableHead className="text-right">Betrag</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Kaltmiete</TableCell>
                    <TableCell className="w-[60px] text-right">
                      <FormField
                        control={form.control}
                        name="rent"
                        rules={{ min: 1 }}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="0,00€"
                                min={1}
                                inputMode="numeric"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Nebenkosten</TableCell>
                    <TableCell className="text-right">
                      <FormField
                        control={form.control}
                        name="utilities"
                        rules={{ min: 1 }}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="0,00€"
                                min={1}
                                inputMode="numeric"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Heizkosten</TableCell>
                    <TableCell className="text-right">
                      <FormField
                        control={form.control}
                        name="heating"
                        rules={{ min: 1 }}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="0,00€"
                                min={1}
                                inputMode="numeric"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell className="font-medium">Summe</TableCell>
                    <TableCell className="text-right">
                      <Input className="m-0" disabled value={sum} />
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
      </Form>
    </StepRoot>
  );
}
