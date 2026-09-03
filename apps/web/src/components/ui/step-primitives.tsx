import { CircleHelpIcon } from "lucide-react";
import { forwardRef } from "react";
import Markdown from "react-markdown";

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
  StepPrimitiveProps & { title: string }
>(({ children, className, title, ...props }, ref) => {
  return (
    <div
      className={cn(
        "grid auto-rows-min items-start gap-1 px-(--step-spacing) pt-(--step-spacing) print:hidden",
        children ? "grid-cols-[1fr_auto] gap-x-4" : undefined,
        className
      )}
      ref={ref}
      {...props}
    >
      <h2 className="text-xl font-semibold tracking-tight text-balance sm:text-2xl">
        {title}
      </h2>
      {children ? (
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
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Über diese Frage</DialogTitle>
              <DialogDescription>
                Zusätzliche Hintergrundinformationen zur aktuellen Frage.
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="h-[500px] prose prose-sm max-w-none dark:prose-invert">
              {children}
            </ScrollArea>
          </DialogContent>
        </Dialog>
      ) : null}
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
