"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { BaseSyntheticEvent, FormEventHandler } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRightCircleIcon } from "lucide-react";
import { calculateRent } from "@/lib/rent-calculation";
import { zodResolver } from "@hookform/resolvers/zod";

const FormSchema = z.object({
  communityCount: z.coerce
    .number()
    .min(1, {
      message: "Es muss mindestens 1 Person in der Bedarfsgemeinschafts sein.",
    })
    .max(15, {
      message:
        "Die Anzahl der Personen in der Bedarfsgemeinschaft, darf 15 nicht überschreiten.",
    }),
  residence: z.string(),
  rent: z.coerce.number(),
  utilities: z.coerce.number(),
  rentSum: z.number(),
  space: z.coerce.number(),
});

export function RentCalculation({
  state,
  onResult,
}: {
  state?: z.infer<typeof FormSchema>;
  onResult?: ({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) => void;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: state ?? {
      communityCount: 0,
      residence: "Leipzig",
      rent: 0,
      utilities: 0,
      rentSum: 0,
      space: 0,
    },
  });

  function onSubmit(
    data: z.infer<typeof FormSchema>,
    event?: BaseSyntheticEvent
  ) {
    event?.preventDefault();
    const { isOk, description } = calculateRent(data);

    onResult &&
      onResult({
        title: isOk
          ? "Der Anspruch wird nicht überschritten."
          : "Der Anspruch wird überschritten",
        description,
      });
  }

  const onChange: FormEventHandler<HTMLFormElement> = (event) => {
    const { rent, utilities } = form.getValues();
    form.setValue("rentSum", Number(rent) + Number(utilities));
  };

  return (
    <Form {...form}>
      <form onChange={onChange} className="@container w-full">
        <div className="grid grid-cols-1 @md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="communityCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Personenanzahl der Bedarfsgemeinschaft</FormLabel>
                <FormControl>
                  <Input placeholder="Anzahl" type="number" {...field} />
                </FormControl>
                <FormDescription>
                  Wie viele Personen leben in der Bedarfsgemeinschaft?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rent"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Grundmiete</FormLabel>
                <FormControl>
                  <Input placeholder="400,00€" type="number" {...field} />
                </FormControl>
                <FormDescription>
                  Wie hoch ist die Grundmiete (Kaltmiete)?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="utilities"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kalte Betriebskosten</FormLabel>
                <FormControl>
                  <Input placeholder="100,00€" type="number" {...field} />
                </FormControl>
                <FormDescription>
                  Wie hoch sind die kalten Betriebskosten (Nebenkosten)?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="space"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Wohnfläche (m²)</FormLabel>
                <FormControl>
                  <Input placeholder="50" {...field} />
                </FormControl>
                <FormDescription>
                  Wie viel Wohnfläche steht insgesamt zur Verfügung?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rentSum"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gesamtmiete</FormLabel>
                <FormControl>
                  <Input placeholder="500,00€" disabled {...field} />
                </FormControl>
                <FormDescription>
                  Wie hoch ist die Miete laut Mietangebot (gesamt)?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="residence"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Wohnort</FormLabel>
                <FormControl>
                  <Input placeholder="Leipzig" disabled {...field} />
                </FormControl>
                <FormDescription>
                  In welchem Wohnort befindet sich die Wohnung?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="pt-4 flex justify-end">
          <Button
            className="grow sm:grow-0 sm:w-48"
            size="lg"
            type="button"
            onClick={form.handleSubmit(onSubmit)}
          >
            Berechnen
            <ArrowRightCircleIcon className="w-4 h-4 ml-3" />
          </Button>
        </div>
      </form>
    </Form>
  );
}
