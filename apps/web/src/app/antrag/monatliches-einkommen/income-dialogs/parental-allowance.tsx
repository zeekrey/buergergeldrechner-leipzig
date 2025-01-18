import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { ParentalAllowanceSchema, TStepContext } from "@/lib/types";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { produce } from "immer";
import { generateId } from "@/lib/utils";
import { useStateContext } from "@/components/context";
import { IncomeComponentProps } from "../income-dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { z } from "zod";
import { checkChildBenefitTransfert } from "./default-income";

type TFormData = {
  type: "normal" | "plus";
  claim: number;
  officialAllowance: number;
};

export const parentalAllowanceCalculation = (props: TFormData) => {
  const { claim, officialAllowance, type } = props;
  let allowance = 0;

  if (type === "normal") {
    allowance =
      Number(officialAllowance) > 300 ? 300 : Number(officialAllowance);
  } else {
    allowance =
      Number(officialAllowance) > 150 ? 150 : Number(officialAllowance);
  }
  const amount = Number(claim) - allowance;

  return {
    allowance: Number(allowance.toFixed(2)),
    amount: Number(amount.toFixed(2)),
  };
};

/**
 * Tests for parentalAllowanceCalculation
 */
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  it("calculate parental allowance with normal allowance (case #1)", () => {
    expect(
      parentalAllowanceCalculation({
        claim: 300,
        officialAllowance: 255,
        type: "normal",
      })
    ).toEqual({
      allowance: 255,
      amount: 45,
    });
  });

  it("calculate parental allowance with normal allowance (case #2)", () => {
    expect(
      parentalAllowanceCalculation({
        claim: 361.53,
        officialAllowance: 300,
        type: "normal",
      })
    ).toEqual({
      allowance: 300,
      amount: 61.53,
    });
  });

  it("calculate parental allowance with plus allowance (case #1)", () => {
    expect(
      parentalAllowanceCalculation({
        claim: 180.77,
        officialAllowance: 150,
        type: "plus",
      })
    ).toEqual({
      allowance: 150,
      amount: 30.77,
    });
  });

  it("calculate parental allowance with plus allowance (case #2)", () => {
    expect(
      parentalAllowanceCalculation({
        claim: 310.42,
        officialAllowance: 150,
        type: "plus",
      })
    ).toEqual({
      allowance: 150,
      amount: 160.42,
    });
  });
}

export const ParentalAllowance = ({
  person,
  income,
  setOpen,
}: IncomeComponentProps & {
  income: z.infer<typeof ParentalAllowanceSchema>;
}) => {
  const [state, setState] = useStateContext();

  const form = useForm<TFormData>({
    defaultValues: {
      type: "normal",
      claim: income?.claim ?? 0,
      officialAllowance: income?.officialAllowance ?? 0,
    },
  });

  const onSubmit: SubmitHandler<TFormData> = (data, event) => {
    // event.preventDefault();

    const selectedPersonIndex = state.community.findIndex(
      (per) => per.id === person.id
    );

    if (selectedPersonIndex !== -1) {
      const { allowance, amount } = parentalAllowanceCalculation(data);

      let newState: TStepContext;

      if (income) {
        /** Inplace update income if it is an existing one. */
        const selectedIncomeIndex = state.community[
          selectedPersonIndex
        ].income.findIndex((income) => income.id === income.id);

        newState = produce(state, (draft) => {
          draft.community[selectedPersonIndex].income[selectedIncomeIndex] = {
            ...income,
            allowance,
            amount,
            type: "ParentalAllowance",
            claim: Number(data.claim),
            officialAllowance: Number(data.officialAllowance),
            parentalAllowanceType: data.type,
          };

          checkChildBenefitTransfert(draft);
        });
      } else {
        /** Create income if no income to be edited was provided. */
        newState = produce(state, (draft) => {
          draft.community[selectedPersonIndex].income.push({
            allowance,
            amount,
            type: "ParentalAllowance",
            id: generateId(),
            claim: Number(data.claim),
            officialAllowance: Number(data.officialAllowance),
            parentalAllowanceType: data.type,
          });

          checkChildBenefitTransfert(draft);
        });
      }

      setState(newState);
    }

    setOpen(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Welche Art von Elterngeld erhalten Sie?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="normal" />
                      </FormControl>
                      <FormLabel className="font-normal">Elterngeld</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="plus" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Elterngeld Plus
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="claim"
            rules={{ min: 1 }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Elterngeldanspruch</FormLabel>
                <FormControl>
                  <Input
                    placeholder="0,00€"
                    type="number"
                    min={1}
                    step="any"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="officialAllowance"
            rules={{ min: 1 }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Freibetrag Elterngeld laut dem Elterngeldbescheid
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="0,00€"
                    type="number"
                    max={form.getValues("type") === "normal" ? 300 : 150}
                    step="any"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
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
