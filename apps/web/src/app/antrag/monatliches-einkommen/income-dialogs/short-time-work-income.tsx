import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { WandSparklesIcon } from "lucide-react";
import {
  EmploymentIncomeSchema,
  ShortTimeWorkAllowanceSchema,
  TStepContext,
} from "@/lib/types";
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
  isYoung: boolean;
  gros: number;
  net: number;
};

export const ShortTimeWorkIncome = ({
  person,
  income,
  setOpen,
  incomeType,
}: IncomeComponentProps & {
  income: z.infer<typeof ShortTimeWorkAllowanceSchema>;
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
      // TODO: calculateSalary needs to be extended by isYoung boolean.

      const { allowance, income: _income } = calculateSalary({
        gross: Number(data.gros),
        net: Number(data.net),
        hasMinorChild: state.community.some(
          (person) => person.type === "child" && person.age < 18
        ),
        isYoung: false,
      });

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
            amount: Number(_income),
            type: "ShortTimeWorkAllowance",
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
            type: "ShortTimeWorkAllowance",
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
          <div className="grid grid-cols-2 gap-6 pb-4">
            <FormField
              control={form.control}
              name="gros"
              rules={{ min: 1 }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brutto</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="0,00€"
                      type="number"
                      min={1}
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
                  <FormLabel>Netto</FormLabel>
                  <FormControl>
                    <Input placeholder="0,00€" type="number" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          {/* <div className="flex pt-4 gap-2">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
              <WandSparklesIcon className="h-4 w-4 text-green-600" />
            </div>
            <FormDescription>
              Bei einem Einkommen aus Erwerbstätigkeit wird Ihnen ein Freibetrag
              gewährt.
            </FormDescription>
          </div> */}
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
