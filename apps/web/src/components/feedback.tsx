import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  BugIcon,
  FileQuestionIcon,
  LifeBuoyIcon,
  MessageCircleQuestionIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import { useState, useTransition } from "react";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import { Textarea } from "./ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { sendEmail } from "@/lib/actions";
import { cn } from "@/lib/utils";

type TFeedbackImprovement = "issue" | "improvement" | "other";

const FormSchema = z.object({
  feedback: z
    .string()
    .min(10, {
      message: "Ihr Feedback sollte mindestens 10 Zeichen haben.",
    })
    .max(160, {
      message: "Ihr Feedback sollte nicht mehr als 1.000 haben.",
    }),
});

export function Feedback() {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [feedbackType, setFeedbackType] = useState<
    TFeedbackImprovement | undefined
  >(undefined);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      const result = await sendEmail(
        JSON.stringify({ feedbackType, text: data.feedback })
      );

      setOpen(false);
      form.reset();
      setFeedbackType(undefined);

      if (result.success) {
        toast("Wir haben Ihr Feedback erhalten.", {
          description: "Vielen lieben Dank!",
        });
      } else {
        toast("Wir konnten Ihr Feedback nicht speichern.", {
          description: "Bitte versuchen Sie es später erneut.",
        });
        console.warn(result.error);
      }
    });
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="w-9 px-0">
          <MessageCircleQuestionIcon className="w-5 h-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex items-center pb-2">
          {typeof feedbackType !== "undefined" && (
            <Button
              variant="ghost"
              className="text-sm"
              onClick={() => setFeedbackType(undefined)}
            >
              ←
            </Button>
          )}
          <h4
            className={cn(
              "font-bold flex-grow",
              typeof feedbackType !== "undefined"
                ? "pl-3 h-auto"
                : "pl-14 h-12 pt-2"
            )}
          >
            Feedback geben
          </h4>
        </div>

        {typeof feedbackType === "undefined" ? (
          <RadioGroup
            value={feedbackType}
            onValueChange={(val: TFeedbackImprovement) => setFeedbackType(val)}
          >
            <div className="grid grid-cols-3 gap-2">
              <RadioGroupItem value="issue">
                <label className="flex flex-col justify-center items-center aspect-square bg-muted/40 hover:bg-muted rounded-lg cursor-pointer text-sm">
                  <BugIcon className="pb-1" />
                  Problem
                </label>
              </RadioGroupItem>
              <RadioGroupItem value="improvement">
                <label className="flex flex-col justify-center items-center aspect-square bg-muted/40 hover:bg-muted rounded-lg cursor-pointer text-sm">
                  <FileQuestionIcon className="pb-1" />
                  Frage
                </label>
              </RadioGroupItem>
              <RadioGroupItem value="other">
                <label className="flex flex-col justify-center items-center aspect-square bg-muted/40 hover:bg-muted rounded-lg cursor-pointer text-sm">
                  <LifeBuoyIcon className="pb-1" />
                  Anderes
                </label>
              </RadioGroupItem>
            </div>
          </RadioGroup>
        ) : (
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="feedback"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Geben Sie hier Ihr Feedback ein..."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Bitte senden Sie uns auf diesem Weg keine persönlichen
                        Daten.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isPending}>
                  Senden
                </Button>
              </form>
            </Form>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
