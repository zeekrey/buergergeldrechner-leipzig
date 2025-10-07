import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  ChildAllowanceSchema,
  IncomeBaseSchema,
  IncomeTypEnum,
  TStepContext,
} from "@/lib/types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { produce, WritableDraft } from "immer";
import { IncomeComponentProps } from "../income-dialog";
import { useStateContext } from "@/components/context";
import { generateId } from "@/lib/utils";
import { z } from "zod";
import { calculateChildBenefitTransfer } from "calculation";

type TFormData = {
  amount: number;
  allowance: number;
};

/**
 * Child benefit transfer checks whether a child has an income that exceeds their needs. If so, the child's income will be set to the maximum need, and the remainder will be considered additional income for the parents.
 * For this two steps are made:
 * 1. Determine the difference between income and need, and apply this amount as income to the parents.
 * 2. Decrease the child's income to ensure that the need is not exceeded.
 */
export function checkChildBenefitTransfert(draft: WritableDraft<TStepContext>) {
  /** Check child benefit transfer. */
  const childBenefitTransfer = calculateChildBenefitTransfer(draft);

  const applicant = draft.community.findIndex(
    (pers) => pers.name === "Antragsteller"
  );

  /** Remove all existing child benefits. */
  draft.community.forEach((p, i) => {
    const existingChildBenefitPosition = p.income.findIndex(
      (inc) => inc.type === "ChildBenefitTransfer"
    );

    if (existingChildBenefitPosition !== -1) {
      draft.community[i].income = draft.community[i].income.filter(
        (el) => el.type !== "ChildBenefitTransfer"
      );
    }
  });

  if (childBenefitTransfer.length) {
    /** Add new childbenefittransfer */
    childBenefitTransfer.forEach((benefit) => {
      draft.community[applicant].income.push({
        id: generateId(),
        type: "ChildBenefitTransfer",
        amount: benefit.amount,
      });

      const childIndex = draft.community.findIndex(
        (c) => c.name === benefit.name
      );

      if (childIndex !== -1) {
        draft.community[childIndex].income.push({
          id: generateId(),
          type: "ChildBenefitTransfer",
          amount: -benefit.amount,
        });
      }
    });
  }
}

export const DefaultIncome = ({
  person,
  income,
  setOpen,
  incomeType,
}: IncomeComponentProps & {
  income: z.infer<typeof IncomeBaseSchema>;
  incomeType: "OtherIncome";
}) => {
  const [state, setState] = useStateContext();

  const form = useForm<TFormData>({
    defaultValues: {
      amount: income?.amount ?? 0,
      allowance: income?.allowance ?? 0,
    },
  });

  const onSubmit: SubmitHandler<TFormData> = (data, event) => {
    // event.preventDefault();

    const selectedPersonIndex = state.community.findIndex(
      (per) => per.id === person.id
    );

    if (selectedPersonIndex !== -1) {
      const { allowance, income: _income } = {
        allowance: 0,
        income: data.amount,
      };

      const newState = produce(state, (draft) => {
        if (income) {
          /** Inplace update income if it is an existing one. */
          const selectedIncomeIndex = draft.community[
            selectedPersonIndex
          ].income.findIndex((inc) => inc.id === income.id);

          draft.community[selectedPersonIndex].income[selectedIncomeIndex] = {
            ...income,
            allowance,
            amount: Number(_income),
          };
        } else {
          draft.community[selectedPersonIndex].income.push({
            allowance,
            amount: Number(_income),
            type: incomeType,
            id: generateId(),
          });
        }

        checkChildBenefitTransfert(draft);
      });

      setState(newState);
    }

    setOpen(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                  min={1}
                  step="any"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
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
