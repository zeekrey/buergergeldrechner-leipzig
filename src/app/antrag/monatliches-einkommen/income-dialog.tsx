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
import { TIncomeType, TPerson } from "@/lib/types";
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
  name: string;
  type: TIncomeType;
  amount: number;
  gros: number;
  net: number;
  allowance: number;
};

let nextId = 100;

export const IncomeDialog = ({
  children,
  selectedPerson,
  community,
  setIncome,
}: {
  children: React.ReactNode;
  selectedPerson?: TIncome;
  community: TPerson[];
  setIncome: Dispatch<SetStateAction<TIncome[]>>;
}) => {
  const [open, setOpen] = useState(false);
  const incomeTypeList = useMemo(
    () => Object.entries(incomeType).map((type) => type),
    []
  );

  const form = useForm<TFormData>({
    defaultValues: {
      name:
        selectedPerson?.name ?? community[0]?.name ?? "Keine Person erfasst",
      type: selectedPerson?.type ?? "EmploymentIncome",
      amount: selectedPerson?.amount ?? 0,
      gros: selectedPerson?.gros ?? 0,
      net: selectedPerson?.net ?? 0,
      allowance: selectedPerson?.allowance ?? 0,
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

    if (selectedIncomeType === "EmploymentIncome") {
      /** Calculate allowance */
      const { allowance, income } = calculateSalary({
        gross: Number(data.gros),
        net: Number(data.net),
        hasMinorChild: community.some(
          (person) =>
            person.type === "child" &&
            ["0-5", "6-13", "14-17"].includes(person.age)
        ),
      });

      setIncome(
        produce((draft) => {
          /** Push to array if it's a new entry. */
          if (!selectedPerson)
            draft.push({
              allowance,
              amount: Number(income),
              name: data.name,
              type: data.type,
              id: generateId(),
              gros: data.gros,
              net: data.net,
            });
          /** Inplace update if it is an existing entry (selectedPerson is available). */ else {
            const index = draft.findIndex(
              (person) => person.id === selectedPerson.id
            );
            if (index !== -1) draft[index] = { ...data, id: selectedPerson.id };
          }
        })
      );
    } else {
      setIncome(
        produce((draft) => {
          /** Push to array if it's a new entry. */
          if (!selectedPerson)
            draft.push({
              ...data,
              amount: Number(data.amount),
              id: generateId(),
            });
          /** Inplace update if it is an existing entry (selectedPerson is available). */ else {
            const index = draft.findIndex(
              (person) => person.id === selectedPerson.id
            );
            if (index !== -1) draft[index] = { ...data, id: selectedPerson.id };
          }
        })
      );
    }

    setOpen(false);
    form.reset();
  };

  const handleIncomeChange = useCallback(
    (event: any, nativOnChange: (e: any) => void) => {
      const [gros, net] = form.getValues(["gros", "net"]);

      const { allowance } = calculateSalary({
        gross: gros,
        net,
        hasMinorChild: community.some(
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
              name="name"
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
                      {community.map((person) => (
                        <SelectItem value={person.name} key={person.name}>
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
                        Ihnen eine Freibetrag von{" "}
                        <b>
                          {allowance.toLocaleString("de-DE", {
                            style: "currency",
                            currency: "EUR",
                          })}
                        </b>{" "}
                        angerechnet.
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
