import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { WandSparklesIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useState,
  useMemo,
  useEffect,
  FormEvent,
  type Dispatch,
  type SetStateAction,
  useCallback,
} from "react";
import { TIncomeType, TPerson, TStepContext } from "@/lib/types";
import { type TIncome, incomeType } from "@/lib/types";
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
import { calculateSalary } from "@/lib/calculation";
import { generateId } from "@/lib/utils";

type TFormData = {
  person: TPerson["id"];
  type: TIncomeType;
  amount: number;
  gros: number;
  net: number;
  allowance: number;
};

export const IncomeDialog = ({
  children,
  selectedPerson,
  selectedIncome,
  state,
  setState,
}: {
  children: React.ReactNode;
  selectedPerson?: TPerson;
  selectedIncome?: TIncome;
  state: TStepContext;
  setState: Dispatch<SetStateAction<TStepContext>>;
}) => {
  const [open, setOpen] = useState(false);
  const incomeTypeList = useMemo(
    () => Object.entries(incomeType).map((type) => type),
    []
  );

  const form = useForm<TFormData>({
    defaultValues: {
      person: selectedPerson?.id ?? state.community[0]?.id,
      type: selectedIncome?.type ?? "EmploymentIncome",
      amount: selectedIncome?.amount ?? 0,
      gros: selectedIncome?.gros ?? 0,
      net: selectedIncome?.net ?? 0,
      allowance: selectedIncome?.allowance ?? 0,
    },
  });

  const selectedIncomeType = form.watch("type");
  const allowance = form.watch("allowance");

  useEffect(() => {
    /** Some fields need to be shown conditionally. That's why they get registered/unregistered depending on the selected income type. */
    if (selectedIncomeType === "EmploymentIncome") {
      form.unregister("amount", { keepDefaultValue: true, keepValue: true });
      form.register("gros");
      form.register("net");
    } else {
      form.register("amount");
      form.unregister("gros", { keepDefaultValue: true, keepValue: true });
      form.unregister("net", { keepDefaultValue: true, keepValue: true });
    }

    /** Set default values for specific income types. */
    if (selectedIncomeType === "ChildAllowance")
      form.setValue("amount", incomeType.ChildAllowance.standardAmount);
  }, [selectedIncomeType, form.register, form.unregister]);

  const onSubmit = (data: TFormData, event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const selectedPersonIndex = state.community.findIndex(
      (person) => person.id === data.person
    );

    if (selectedPersonIndex !== -1) {
      const { allowance, income } =
        selectedIncomeType === "EmploymentIncome"
          ? calculateSalary({
              gross: Number(data.gros),
              net: Number(data.net),
              hasMinorChild: state.community.some(
                (person) =>
                  person.type === "child" &&
                  ["0-5", "6-13", "14-17"].includes(person.age)
              ),
            })
          : { allowance: 0, income: data.amount };

      let newState: TStepContext;

      if (selectedIncome) {
        /** Inplace update income if it is an existing one. */
        const selectedIncomeIndex = state.community[
          selectedPersonIndex
        ].income.findIndex((income) => income.id === selectedIncome.id);

        newState = produce(state, (draft) => {
          draft.community[selectedPersonIndex].income[selectedIncomeIndex] = {
            ...selectedIncome,
            allowance,
            amount: Number(income),
            type: data.type,
            gros: Number(data.gros),
            net: Number(data.net),
          };
        });
      } else {
        newState = produce(state, (draft) => {
          draft.community[selectedPersonIndex].income.push({
            allowance,
            amount: Number(income),
            type: data.type,
            id: generateId(),
            gros: Number(data.gros),
            net: Number(data.net),
          });
        });
      }

      setState(newState);
    }

    setOpen(false);
  };

  const handleIncomeChange = useCallback(
    (event: any, nativOnChange: (e: any) => void) => {
      const [gros, net] = form.getValues(["gros", "net"]);

      const { allowance } = calculateSalary({
        gross: gros,
        net,
        hasMinorChild: state.community.some(
          (person) =>
            person.type === "child" &&
            ["0-5", "6-13", "14-17"].includes(person.age)
        ),
      });

      form.setValue("allowance", allowance);
      nativOnChange(event);
    },
    []
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Einkommen erfassen</DialogTitle>
          <DialogDescription>
            Bitte erfassen Sie jede Art von Einkommen.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            id="dialog-form"
            className="space-y-2"
            key={2}
          >
            <FormField
              control={form.control}
              name="person"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Person</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Person auswählen" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {state.community.map((person) => (
                        <SelectItem value={person.id} key={person.name}>
                          {person.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Einkommensart</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Einkommensart auswählen" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {incomeTypeList.map((type) => (
                        <SelectItem value={type[0]} key={type[0]}>
                          {type[1].label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {selectedIncomeType !== "EmploymentIncome" ? (
              <FormField
                control={form.control}
                name="amount"
                rules={{ min: 1 }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Betrag</FormLabel>
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
            ) : (
              <div>
                <div className="grid grid-cols-2 gap-6">
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
                            onChange={(event) =>
                              handleIncomeChange(event, field.onChange)
                            }
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
                          <Input
                            placeholder="0,00€"
                            type="number"
                            {...field}
                            onChange={(event) =>
                              handleIncomeChange(event, field.onChange)
                            }
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex pt-4 gap-2">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                    <WandSparklesIcon className="h-4 w-4 text-green-600" />
                  </div>
                  <FormDescription>
                    {allowance > 0 ? (
                      <>
                        Durch das eingegeben Einkommen aus Erwerbstätigkeit wird
                        Ihnen ein Freibetrag von{" "}
                        <b>
                          {allowance.toLocaleString("de-DE", {
                            style: "currency",
                            currency: "EUR",
                          })}
                        </b>{" "}
                        gewährt.
                      </>
                    ) : (
                      <>
                        Bei einem Einkommen aus Erwerbstätigkeit wird Ihnen ein
                        Freibetrag gewährt.
                      </>
                    )}
                  </FormDescription>
                </div>
              </div>
            )}
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
                form="dialog-form"
              >
                {selectedPerson ? "Bearbeiten" : "Hinzufügen"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
