import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { TChild, TStepContext, VoluntarySocialYearSchema } from "@/lib/types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { produce } from "immer";
import { IncomeComponentProps } from "../income-dialog";
import { useStateContext } from "@/components/context";
import { generateId } from "@/lib/utils";
import { z } from "zod";
import { checkChildBenefitTransfert as checkChildBenefitTransfer } from "./default-income";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldAlertIcon } from "lucide-react";

type TFormData = {
  amount: number;
  age?: number;
};

export const voluntarySocialYearCalculation = ({ age, amount }: TFormData) => {
  let allowance = 0;

  if (age && age < 25) {
    allowance = 556;
  }

  const rest = Math.min(amount, allowance);
  const income = Number(amount);

  return {
    allowance: rest,
    income,
  };
};

/**
 * Tests for voluntarySocialYearCalculation
 */
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  it("calculate voluntary social year younger then 25", () => {
    expect(
      voluntarySocialYearCalculation({
        amount: 100,
        age: 16,
      })
    ).toEqual({
      allowance: 100,
      income: 100,
    });
  });

  it("calculate voluntary social year younger then 25 exceeding allowance", () => {
    expect(
      voluntarySocialYearCalculation({
        amount: 600,
        age: 16,
      })
    ).toEqual({
      allowance: 556,
      income: 600,
    });
  });

  it("calculate voluntary social year older then 25", () => {
    expect(
      voluntarySocialYearCalculation({
        amount: 100,
        age: 26,
      })
    ).toEqual({
      allowance: 0,
      income: 100,
    });
  });
}

export const VoluntarySocialYear = ({
  person,
  income,
  setOpen,
  incomeType,
}: IncomeComponentProps & {
  income: z.infer<typeof VoluntarySocialYearSchema>;
  incomeType: "VoluntarySocialYear";
}) => {
  const [state, setState] = useStateContext();

  const form = useForm<TFormData>({
    defaultValues: {
      amount: income?.amount ?? 0,
      age: person?.age ?? 18,
    },
  });

  const onSubmit: SubmitHandler<TFormData> = (data, event) => {
    const age = data.age ?? (person as TChild).age;
    // event.preventDefault();

    const selectedPersonIndex = state.community.findIndex(
      (per) => per.id === person.id
    );

    if (selectedPersonIndex !== -1) {
      const { allowance, income: _income } = voluntarySocialYearCalculation({
        age,
        amount: data.amount,
      });

      let newState: TStepContext;

      if (income) {
        /** Inplace update income if it is an existing one. */
        const selectedIncomeIndex = state.community[
          selectedPersonIndex
        ].income.findIndex((income) => income.id === income.id);

        newState = produce(state, (draft) => {
          draft.community[selectedPersonIndex].age = Number(data.age);
          draft.community[selectedPersonIndex].income[selectedIncomeIndex] = {
            ...income,
            allowance,
            amount: _income,
            type: incomeType,
          };

          checkChildBenefitTransfer(draft);
        });
      } else {
        newState = produce(state, (draft) => {
          draft.community[selectedPersonIndex].age = Number(data.age);
          draft.community[selectedPersonIndex].income.push({
            allowance,
            amount: Number(_income),
            type: incomeType,
            id: generateId(),
          });

          checkChildBenefitTransfer(draft);
        });
      }

      setState(newState);
    }

    setOpen(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {!(person.type === "child" && person.age < 25) && (
          <FormField
            control={form.control}
            name="amount"
            rules={{ min: 1 }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Monatlicher Betrag in Euro</FormLabel>
                <FormControl>
                  <Input
                    placeholder="0,00€"
                    type="number"
                    step="any"
                    min={1}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="age"
          rules={{ min: 1 }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alter</FormLabel>
              <FormControl>
                <Input
                  placeholder="Wie alt sind Sie?"
                  type="number"
                  step="any"
                  min={1}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="px-0 pt-2">
          <Alert variant="warning">
            <ShieldAlertIcon className="h-4 w-4" />
            <AlertTitle>Pauschalbetrag</AlertTitle>
            <AlertDescription>
              Für Personen in Freiwilligendienst, sozialem/ökologischen Jahr,
              gilt ab dem 01.01.2025 in Höhe von 556,00 Euro monatlich, sofern
              die Person an mindestens einem Tag des Monats das 25. Lebensjahr
              noch nicht vollendet hat.
            </AlertDescription>
          </Alert>
        </div>
        <div className="flex justify-between pt-2">
          <Button
            type="button"
            variant="secondary"
            onClick={() => setOpen(false)}
          >
            Abrechen
          </Button>
          <Button
            type="submit"
            disabled={!form.formState.isDirty || !form.formState.isValid}
          >
            {income ? "Bearbeiten" : "Hinzufügen"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
