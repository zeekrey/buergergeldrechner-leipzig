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
import { useForm, useWatch } from "react-hook-form";
import { useStateContext } from "@/components/context";

const step = stepsConfig[6];

type TFormData = {
  rent: number;
  utilities: number;
  heating: number;
};

export default function StepSpending() {
  const { push } = useRouter();
  const [state, setState] = useStateContext();
  const [hasNoSpendings, setHasNoSpendings] = useState(false);

  const form = useForm<TFormData>({
    defaultValues: {
      rent: 0,
      utilities: 0,
      heating: 0,
    },
  });

  /** The form default values are only evaluated at first render. That's why we need to update the default values once localstorage is loaded. */
  useEffect(() => {
    form.reset({
      rent: state.spendings.rent,
      utilities: state.spendings.utilities,
      heating: state.spendings.heating,
    });
  }, [state]);

  const [rent, heating, utilities] = useWatch({
    control: form.control,
    name: ["rent", "heating", "utilities"],
  });

  const sum = Number(rent ?? 0) + Number(utilities ?? 0) + Number(heating ?? 0);

  function onSubmit(data: TFormData, event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newState = produce(state, (draft) => {
      draft.spendings = {
        heating: Number(data.heating),
        rent: Number(data.rent),
        utilities: Number(data.utilities),
        sum,
      };
    });

    setState(newState);

    const nextStep = step.next(state);
    push(`${stepsConfig[nextStep].id}`);
  }

  const handleBack = useCallback(() => {
    push(`${stepsConfig[step.previous].id}`);
  }, [state]);

  const handleHasNoSpendingsChange = useCallback(() => {
    setHasNoSpendings(!hasNoSpendings);
    form.reset();
  }, [hasNoSpendings]);

  return (
    <StepRoot id={step.id}>
      <StepTitle>{step.title}</StepTitle>
      <StepDescription>{step.description}</StepDescription>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <StepContent>
            <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <div>
                <Checkbox
                  checked={hasNoSpendings}
                  onCheckedChange={handleHasNoSpendingsChange}
                />
              </div>
              <div className="space-y-1 leading-none">
                <div>Mir entstehen keine Kosten für Unterkunft und Heizung</div>
              </div>
            </div>
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
                        disabled={hasNoSpendings}
                        control={form.control}
                        name="rent"
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
                        disabled={hasNoSpendings}
                        control={form.control}
                        name="utilities"
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
                        disabled={hasNoSpendings}
                        control={form.control}
                        name="heating"
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
