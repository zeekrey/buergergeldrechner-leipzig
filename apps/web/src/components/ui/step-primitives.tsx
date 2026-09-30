import { CircleHelpIcon } from "lucide-react";
import { forwardRef } from "react";
import Markdown from "react-markdown";

import { QuestionChat } from "@/components/question-chat";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

import { ScrollArea } from "./scroll-area";

export type StepPrimitiveProps = React.HTMLAttributes<HTMLDivElement>;

const StepRoot = forwardRef<HTMLDivElement, StepPrimitiveProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex w-full max-w-3xl grow flex-col gap-6 bg-card text-card-foreground sm:grow-0 sm:overflow-hidden sm:rounded-2xl sm:border sm:shadow-sm [--step-spacing:--spacing(5)] sm:[--step-spacing:--spacing(6)]",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

StepRoot.displayName = "StepRoot";

const StepTitle = forwardRef<
  HTMLDivElement,
  StepPrimitiveProps & { preview: string; title: string }
>(({ children, className, preview, title, ...props }, ref) => {
  return (
    <div
      className={cn(
        "grid auto-rows-min items-start gap-1 px-(--step-spacing) pt-(--step-spacing) print:hidden",
        "grid-cols-[1fr_auto] gap-x-4",
        className
      )}
      ref={ref}
      {...props}
    >
      <h2 className="text-xl font-semibold tracking-tight text-balance sm:text-2xl">
        {title}
      </h2>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            aria-label="Hilfe"
            className="rounded-full"
            size="icon-sm"
            variant="ghost"
          >
            <CircleHelpIcon />
          </Button>
        </DialogTrigger>
        <DialogContent className="flex h-[min(92dvh,52rem)] sm:max-w-2xl flex-col gap-0 overflow-hidden p-0">
          <DialogHeader className="shrink-0 border-b p-4 pr-12">
            <DialogTitle>Hilfe zur aktuellen Frage</DialogTitle>
            <DialogDescription>
              Lesen Sie die vorhandenen Hinweise oder stellen Sie Ihre eigene
              Frage.
            </DialogDescription>
          </DialogHeader>
          {children ? (
            <ScrollArea className="max-h-[35%] shrink-0 border-b px-4">
              <Accordion type="single" collapsible>
                <AccordionItem value="question-help">
                  <AccordionTrigger className="items-center hover:no-underline">
                    <span className="flex min-w-0 flex-1 flex-col gap-1 pr-4">
                      <span>{title}</span>
                      <span className="line-clamp-2 font-normal leading-5 text-muted-foreground">
                        <Markdown
                          components={{
                            p: ({ children: previewChildren }) => (
                              <>{previewChildren}</>
                            ),
                          }}
                        >
                          {preview.trim()}
                        </Markdown>
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="prose prose-sm max-w-none dark:prose-invert">
                    {children}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </ScrollArea>
          ) : null}
          <QuestionChat questionTitle={title} />
        </DialogContent>
      </Dialog>
    </div>
  );
});

StepTitle.displayName = "StepTitle";

const StepDescription = forwardRef<
  HTMLDivElement,
  StepPrimitiveProps & { children: string }
>(({ children, className, ...props }, ref) => {
  return (
    <div
      className={cn(
        "px-(--step-spacing) -mt-4 text-sm text-muted-foreground print:hidden",
        className
      )}
      ref={ref}
      {...props}
    >
      <div className="prose prose-sm max-w-none text-muted-foreground dark:prose-invert [&_p]:my-0 [&_strong]:text-foreground">
        <Markdown>{children}</Markdown>
      </div>
    </div>
  );
});

StepDescription.displayName = "StepDescription";

const StepContent = forwardRef<HTMLDivElement, StepPrimitiveProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        className={cn("grow px-(--step-spacing) pb-(--step-spacing)", className)}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

StepContent.displayName = "StepContent";

const StepNavigation = forwardRef<HTMLDivElement, StepPrimitiveProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        className={cn(
          "mt-auto flex items-center justify-between gap-3 border-t bg-muted/35 px-(--step-spacing) py-4 print:hidden",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

StepNavigation.displayName = "StepNavigation";

export { StepContent, StepDescription, StepNavigation, StepRoot, StepTitle };
