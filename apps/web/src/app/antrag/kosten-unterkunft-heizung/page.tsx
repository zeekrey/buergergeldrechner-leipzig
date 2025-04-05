"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { StepContent, StepNavigation } from "@/components/ui/step-primitives";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  CalculatorIcon,
  OctagonAlertIcon,
} from "lucide-react";
import { useCallback, useState } from "react";
import { produce } from "immer";
import {
  StepRoot,
  StepTitle,
  StepDescription,
} from "@/components/ui/step-primitives";
import { stepsConfig } from "@/lib/machine";
import { useRouter } from "next/navigation";
import { useStateContext } from "@/components/context";
import HelpMarkdown from "@/config/steps/kosten-unterkunft-heizung.mdx";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { calculateRent } from "@/lib/rent-calculation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { RentCalculation } from "@/app/mietpruefung/rent-calculation";

const step = stepsConfig[7];

const formSchema = z.object({
  heating: z.coerce.number().optional(),
  rent: z.coerce.number().optional(),
  utilities: z.coerce.number().optional(),
  hasNoSpendings: z.boolean(),
});

export default function StepSpending() {
  const { push } = useRouter();
  const [state, setState] = useStateContext();
  const [dialogIsOpen, setDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      heating: state.spendings.heating ?? 0,
      rent: state.spendings.rent ?? 0,
      utilities: state.spendings.utilities ?? 0,
      hasNoSpendings: false,
    },
  });

  const calculateSum = useCallback(
    ({ rent = 0, utilities = 0, heating = 0 }) => {
      return rent + utilities + heating;
    },
    []
  );

  function onSubmit({
    rent,
    utilities,
    heating,
    hasNoSpendings,
  }: z.infer<typeof formSchema>) {
    console.log(rent);

    const newState = produce(state, (draft) => {
      if (hasNoSpendings) {
        draft.spendings["rent"] = 0;
        draft.spendings["utilities"] = 0;
        draft.spendings["heating"] = 0;
        draft.spendings.sum = 0;
      } else {
        draft.spendings["rent"] = rent ?? 0;
        draft.spendings["utilities"] = utilities ?? 0;
        draft.spendings["heating"] = heating ?? 0;
        draft.spendings.sum = calculateSum(draft.spendings);
      }
    });
    setState(newState);

    const nextStep = step.next(state);
    push(`${stepsConfig[nextStep].id}`);
  }

  const [heating, rent, utilities] = form.watch([
    "heating",
    "rent",
    "utilities",
  ]);
  const sum = Number(heating ?? 0) + Number(rent ?? 0) + Number(utilities ?? 0);
  const { isOk, issues, description } = calculateRent({
    rent: Number(rent ?? 0),
    utilities: Number(utilities ?? 0) + Number(heating ?? 0),
    communityCount: state.community.length,
    space: 1,
  });

  console.log("isOk", isOk);
  console.log("description", description);

  const handleBack = useCallback(() => {
    push(`${stepsConfig[step.previous].id}`);
  }, [state]);

  return (
    <StepRoot id={step.id}>
      <StepTitle title={step.title}>
        <HelpMarkdown />
      </StepTitle>
      <StepDescription>{step.description}</StepDescription>
      <Form {...form}>
        <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
          <StepContent>
            <FormField
              control={form.control}
              name="hasNoSpendings"
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
                      Mir entstehen keine Kosten für Unterkunft und Heizung
                    </FormLabel>
                    {/* <FormDescription>
                      You can manage your mobile notifications in the page.
                    </FormDescription> */}
                  </div>
                </FormItem>
              )}
            />
            <ScrollArea className="sm:h-[380px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Position</TableHead>
                    <TableHead className="text-right">Betrag</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">
                      Kaltmiete (Schuldzins bei Wohneigentum) in €
                    </TableCell>
                    <TableCell className="w-[60px] text-right">
                      <FormField
                        disabled={form.getValues("hasNoSpendings")}
                        control={form.control}
                        name="rent"
                        render={({ field }) => (
                          <FormItem className="">
                            <FormControl>
                              <Input
                                placeholder="Kaltmiete"
                                type="number"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="w-[60px]  font-medium">
                      Nebenkosten in €
                    </TableCell>
                    <TableCell className="text-right">
                      <FormField
                        disabled={form.getValues("hasNoSpendings")}
                        control={form.control}
                        name="utilities"
                        render={({ field }) => (
                          <FormItem className="">
                            <FormControl>
                              <Input
                                placeholder="Nebenkosten"
                                type="number"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Heizkosten in €
                    </TableCell>
                    <TableCell className="w-[60px] text-right">
                      <FormField
                        disabled={form.getValues("hasNoSpendings")}
                        control={form.control}
                        name="heating"
                        render={({ field }) => (
                          <FormItem className="">
                            <FormControl>
                              <Input
                                placeholder="Heizkosten"
                                {...field}
                                type="number"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell className="font-medium">Summe</TableCell>
                    <TableCell className="w-[60px] text-right">
                      {sum.toLocaleString("de-DE", {
                        currency: "EUR",
                        style: "currency",
                      })}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
              {issues?.includes("rent") && (
                <Dialog open={dialogIsOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Alert
                      className="absolute bottom-0 cursor-pointer hover:shadow transition-shadow"
                      onClick={() => console.log("click")}
                    >
                      <CalculatorIcon className="h-4 w-4" />
                      <AlertTitle>
                        Ihre Miete ist zu eventuell zu hoch.
                      </AlertTitle>
                      <AlertDescription>
                        {description} Drücken Sie um auf den Button um mehr zu
                        erfahren.
                      </AlertDescription>
                    </Alert>
                  </DialogTrigger>
                  <DialogContent className="md:min-w-[625px]">
                    <DialogHeader>
                      <DialogTitle>Bedarfsprüfung für Wohnkosten</DialogTitle>
                      <DialogDescription>
                        Hier können Sie die Höhe der angemessenen Kosten für
                        Unterkunft und Heizung (KdU) prüfen.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center space-x-2">
                      <RentCalculation />
                    </div>
                    {/* <DialogFooter className="sm:justify-start">
                      <DialogClose asChild>
                        <Button type="button" variant="secondary">
                          Close
                        </Button>
                      </DialogClose>
                    </DialogFooter> */}
                  </DialogContent>
                </Dialog>
              )}
            </ScrollArea>
          </StepContent>
          <StepNavigation>
            <Button onClick={handleBack} size="lg" type="button">
              <ArrowLeftCircleIcon className="w-4 h-4" />
            </Button>
            <Button
              className="grow sm:grow-0 sm:w-48 ml-4"
              size="lg"
              type="submit"
            >
              Weiter
              <ArrowRightCircleIcon className="w-4 h-4 ml-3" />
            </Button>
          </StepNavigation>
        </form>
      </Form>
    </StepRoot>
  );
}
