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
import { generateId } from "@/lib/utils";
import { useStateContext } from "@/components/context";
import { IncomeComponentProps } from "../income-dialog";
import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkChildBenefitTransfert } from "./default-income";

export function calculateSalary({
  gross,
  net,
  hasMinorChild,
  isYoung,
}: {
  gross: number;
  net: number;
  hasMinorChild: boolean;
  isYoung: boolean;
}) {
  if (gross < 1 || net < 1 || net > gross)
    return {
      allowance: 0,
      income: 0,
    };

  let allowance = isYoung ? 556 : 100;

  // Check if isYoung is true to skip the following rules.
  if (!isYoung && gross <= 520) {
    allowance += (gross - 100) * 0.2; // 20% for the range 100-520
  } else if (!isYoung) {
    allowance += (520 - 100) * 0.2; // 20% for the range 100-520
  }

  if (!isYoung && gross > 520) {
    // This check ensures we only apply the next conditions if gross > 520
    if (gross <= 1000) {
      allowance += (gross - 520) * 0.3; // 30% for the range 520-1000 (or 1500 with a minor child)
    } else {
      allowance += (1000 - 520) * 0.3; // 30% for the range 520-1000 (or 1500 with a minor child)
      if (gross <= (hasMinorChild ? 1500 : 1200)) {
        allowance += (gross - 1000) * 0.1; // 10% for the range 1000-1200
      } else {
        allowance += ((hasMinorChild ? 1500 : 1200) - 1000) * 0.1; // 10% for the range 1000-1200
      }
    }
  }

  // Ensure allowance does not exceed gross
  if (allowance > net) {
    allowance = net;
  }

  return {
    allowance: allowance,
    income: net,
  };
}

/**
 * Tests for parentalAllowanceCalculation
 */
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;

  it("900 gross, 600 net", () => {
    expect(
      calculateSalary({
        gross: 900,
        net: 600,
        hasMinorChild: false,
        isYoung: false,
      })
    ).toEqual({
      allowance: 298,
      income: 600,
    });
  });

  it("1200 gross, 950 net", () => {
    expect(
      calculateSalary({
        gross: 1200,
        net: 950,
        hasMinorChild: false,
        isYoung: false,
      })
    ).toEqual({
      allowance: 348,
      income: 950,
    });
  });

  it("2100 gross, 1700 net", () => {
    expect(
      calculateSalary({
        gross: 2100,
        net: 1700,
        hasMinorChild: false,
        isYoung: false,
      })
    ).toEqual({
      allowance: 348,
      income: 1700,
    });
  });

  it("2100 gross, 1700 net", () => {
    expect(
      calculateSalary({
        gross: 2100,
        net: 1700,
        hasMinorChild: true,
        isYoung: false,
      })
    ).toEqual({
      allowance: 378,
      income: 1700,
    });
  });
}

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

          checkChildBenefitTransfert(draft);
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

          checkChildBenefitTransfert(draft);
        });
      }

      setState(newState);
    }

    setOpen(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <div className="grid grid-cols-2 gap-6 pb-4">
            <FormField
              control={form.control}
              name="gros"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brutto</FormLabel>
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
            <FormField
              control={form.control}
              name="net"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Netto</FormLabel>
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
          <FormField
            control={form.control}
            name="isYoung"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start rounded-md border p-4">
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
