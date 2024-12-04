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
import { calculateChildBenefitTransfer } from "@/lib/calculation";

type TFormData = {
  amount: number;
  allowance: number;
};

export function checkChildBenefitTransfert(draft: WritableDraft<TStepContext>) {
  /** Check child benefit transfer. */
  const childBenefitTransfer = calculateChildBenefitTransfer(draft);

  const applicant = draft.community.findIndex(
    (pers) => pers.name === "Antragsteller"
  );

  /** Remove existing ones. */
  const existingChildBenefitPosition = draft.community[
    applicant
  ].income.findIndex((inc) => inc.type === "ChildBenefitTransfer");

  if (existingChildBenefitPosition !== -1) {
    draft.community[applicant].income = draft.community[
      applicant
    ].income.filter((el) => el.type !== "ChildBenefitTransfer");
  }

  if (childBenefitTransfer.length) {
    /** Add new childbenefittransfer */
    childBenefitTransfer.forEach((benefit) => {
      draft.community[applicant].income.push({
        id: generateId(),
        type: "ChildBenefitTransfer",
        amount: benefit.amount,
      });
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
          ].income.findIndex((income) => income.id === income.id);

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
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="amount"
          rules={{ min: 1 }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Betrag</FormLabel>
              <FormControl>
                <Input placeholder="0,00€" type="number" min={1} {...field} />
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
