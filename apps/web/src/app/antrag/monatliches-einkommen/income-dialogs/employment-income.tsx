import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { EmploymentIncomeSchema, TStepContext } from "@/lib/types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { produce } from "immer";
import { calculateSalary } from "@/lib/calculation";
import { generateId } from "@/lib/utils";
import { useStateContext } from "@/components/context";
import { IncomeComponentProps } from "../income-dialog";
import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  gros: z.coerce.number(),
  net: z.coerce.number(),
  isYoung: z.boolean(),
});

export const EmploymentIncome = ({
  person,
  income,
  setOpen,
}: IncomeComponentProps & {
  income: z.infer<typeof EmploymentIncomeSchema>;
}) => {
  const [state, setState] = useStateContext();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isYoung:
        typeof person?.age !== "undefined" && person.age < 25 ? true : false,
      gros: income?.gros ?? 0,
      net: income?.net ?? 0,
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
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
        isYoung: data.isYoung,
      });

      let newState: TStepContext;

      if (income) {
        /** Inplace update income if it is an existing one. */
        const selectedIncomeIndex = state.community[
          selectedPersonIndex
        ].income.findIndex((inc) => inc.id === income.id);

        newState = produce(state, (draft) => {
          if (
            data.isYoung &&
            typeof draft.community[selectedPersonIndex].age === "undefined"
          ) {
            draft.community[selectedPersonIndex].age = 24;
          } else draft.community[selectedPersonIndex].age = undefined;

          draft.community[selectedPersonIndex].income[selectedIncomeIndex] = {
            ...income,
            allowance,
            amount: Number(_income),
            type: "EmploymentIncome",
            gros: Number(data.gros),
            net: Number(data.net),
          };
        });
      } else {
        /** Create income if no income to be edited was provided. */
        newState = produce(state, (draft) => {
          if (
            data.isYoung &&
            typeof draft.community[selectedPersonIndex].age === "undefined"
          ) {
            draft.community[selectedPersonIndex].age = 24;
          } else draft.community[selectedPersonIndex].age = undefined;

          draft.community[selectedPersonIndex].income.push({
            allowance,
            amount: Number(_income),
            type: "EmploymentIncome",
            id: generateId(),
            gros: Number(data.gros),
            net: Number(data.net),
          });
        });
      }

      setState(newState);
    }

    setOpen(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div>
          <div className="grid grid-cols-2 gap-6 pb-4">
            <FormField
              control={form.control}
              name="gros"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brutto</FormLabel>
                  <FormControl>
                    <Input placeholder="0,00€" type="number" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="net"
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
          <FormField
            control={form.control}
            name="isYoung"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Person ist Student, Azubi oder Schüler und jünger als 25.
                  </FormLabel>
                </div>
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
          <Button type="submit">{income ? "Bearbeiten" : "Hinzufügen"}</Button>
        </div>
      </form>
    </Form>
  );
};
