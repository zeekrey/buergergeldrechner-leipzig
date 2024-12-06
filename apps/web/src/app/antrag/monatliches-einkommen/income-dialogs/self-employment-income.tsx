import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { SelfEmploymentIncomeSchema, TStepContext } from "@/lib/types";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { produce } from "immer";
import { calculateSalary } from "./employment-income";
import { generateId } from "@/lib/utils";
import { useStateContext } from "@/components/context";
import { IncomeComponentProps } from "../income-dialog";
import { z } from "zod";
import { checkChildBenefitTransfert } from "./default-income";

type TFormData = {
  net: number;
  gros: number;
};

export const SelfEmploymentIncome = ({
  person,
  income,
  setOpen,
}: IncomeComponentProps & {
  income: z.infer<typeof SelfEmploymentIncomeSchema>;
}) => {
  const [state, setState] = useStateContext();

  const form = useForm<TFormData>({
    defaultValues: {
      gros: income?.gros ?? 0,
      net: income?.net ?? 0,
    },
  });

  const onSubmit: SubmitHandler<TFormData> = (data, event) => {
    // event.preventDefault();

    const selectedPersonIndex = state.community.findIndex(
      (per) => per.id === person.id
    );

    if (selectedPersonIndex !== -1) {
      const { allowance, income: _income } = calculateSalary({
        gross: Number(data.gros),
        net: Number(data.net),
        hasMinorChild: state.community.some(
          (person) => person.type === "child" && person.age < 18
        ),
        //FIXME: should be respected.
        isYoung: false,
      });

      let newState: TStepContext;

      if (income) {
        /** Inplace update income if it is an existing one. */
        const selectedIncomeIndex = state.community[
          selectedPersonIndex
        ].income.findIndex((_income) => {
          return income.id === _income.id;
        });

        newState = produce(state, (draft) => {
          draft.community[selectedPersonIndex].income[selectedIncomeIndex] = {
            ...income,
            allowance,
            amount: Number(_income),
            type: "SelfEmploymentIncome",
            gros: Number(data.gros),
            net: Number(data.net),
          };

          checkChildBenefitTransfert(draft);
        });
      } else {
        /** Create income if no income to be edited was provided. */
        newState = produce(state, (draft) => {
          draft.community[selectedPersonIndex].income.push({
            allowance,
            amount: Number(_income),
            type: "SelfEmploymentIncome",
            id: generateId(),
            gros: Number(data.gros),
            net: Number(data.net),
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
        <div>
          <div className="grid grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="gros"
              rules={{ min: 1 }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Betriebseinnahmen</FormLabel>
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
              name="net"
              rules={{ min: 1 }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Betriebsausgaben</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="0,00€"
                      type="number"
                      step="any"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
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
