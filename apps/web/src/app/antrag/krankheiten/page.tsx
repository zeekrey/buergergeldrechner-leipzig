"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { produce } from "immer";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { useStateContext } from "@/components/context";
import {
  WizardBackButton,
  WizardNextButton,
} from "@/components/questionnaire/actions";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { StepContent, StepNavigation } from "@/components/ui/step-primitives";
import {
  StepRoot,
  StepTitle,
  StepDescription,
} from "@/components/ui/step-primitives";
import HelpMarkdown from "@/config/steps/krankheiten.mdx";
import { stepsConfig } from "@/lib/machine";
import { diseases } from "@/lib/types";

const step = stepsConfig[6];

const FormSchema = z.object({
  person: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      items: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: "Bitte wählen Sie mindestens eine Krankheit aus.",
      }),
    })
  ),
});

export default function StepDiseases() {
  const { push } = useRouter();
  const [state, setState] = useStateContext();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      person: state.community
        .filter((p) => p.attributes?.hasDiseases)
        .map((person) => ({
          id: person.id,
          name: person.name,
          items: person.attributes.diseases,
        })),
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    const newState = produce(state, (draft) => {
      data.person.forEach((person) => {
        const personIndex = draft.community.findIndex(
          (_person) => _person.id === person.id
        );

        if (personIndex !== -1) {
          draft.community[personIndex].attributes.diseases = person.items;
        } else draft.community[personIndex].attributes.diseases = [];
      });
    });

    setState(newState);

    const nextStep = step.next(state);
    push(`${stepsConfig[nextStep].id}`);
  }

  const handleBack = useCallback(() => {
    push(`${stepsConfig[step.previous].id}`);
  }, [state]);

  // const handleChange = (
  //   personId: string,
  //   disease: z.infer<typeof Diseases>
  // ) => {
  //   const newState = produce(state, (draft) => {
  //     const personIndex = draft.community.findIndex(
  //       (_person) => _person.id === personId
  //     );
  //     if (personIndex !== -1) {
  //       const index =
  //         draft.community[personIndex].attributes?.diseases?.indexOf(disease);
  //       if (typeof index === "undefined" || index === -1) {
  //         draft.community[personIndex].attributes?.diseases?.push(disease);
  //       } else {
  //         draft.community[personIndex].attributes?.diseases?.splice(index, 1);
  //       }
  //     }
  //   });

  //   setState(newState);
  // };

  const { fields } = useFieldArray({ name: "person", control: form.control });

  return (
    <StepRoot id={step.id}>
      <StepTitle title={step.title}>
        <HelpMarkdown />
      </StepTitle>
      <StepDescription>{step.description}</StepDescription>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <StepContent>
            <ScrollArea className="sm:h-[380px]">
              {fields.map((field, index) => (
                <FormField
                  key={field.id}
                  control={form.control}
                  name={`person.${index}`}
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel className="text-base">
                        {field.value.name}
                      </FormLabel>
                      <Separator />
                      {diseases.map((item) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name={`person.${index}.items`}
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(item.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...field.value,
                                            item.id,
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== item.id
                                            )
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {item.label}
                                </FormLabel>
                                <FormMessage />
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </FormItem>
                  )}
                />
              ))}
            </ScrollArea>
          </StepContent>
          <StepNavigation>
            <WizardBackButton onClick={handleBack}>Zurück</WizardBackButton>
            <WizardNextButton>Weiter</WizardNextButton>
          </StepNavigation>
        </form>
      </Form>
    </StepRoot>
  );
}
