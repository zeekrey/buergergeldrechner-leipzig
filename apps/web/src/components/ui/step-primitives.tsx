import { Button } from "@/components/ui/button";
import { HelpCircleIcon } from "lucide-react";
import { forwardRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import Markdown from "react-markdown";
import { ScrollArea } from "./scroll-area";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const StepRoot = forwardRef<HTMLDivElement, InputProps>(
  ({ children, ...props }, ref) => {
    return (
      <div
        className="sm:flex sm:items-center sm:pt-24 sm:pb-36 sm:min-h-dvh"
        {...props}
      >
        <div
          className="sm:border sm:shadow-sm rounded-lg w-full flex flex-col sm:min-h-96 bg-background pt-14 sm:pt-0"
          ref={ref}
        >
          {children}
        </div>
      </div>
    );
  }
);

StepRoot.displayName = "StepRoot";

const StepTitle = forwardRef<HTMLDivElement, InputProps & { title: string }>(
  ({ children, ...props }, ref) => {
    return (
      <div
        className="px-8 pt-6 flex justify-between items-center"
        ref={ref}
        {...props}
      >
        <h2 className="font-semibold tracking-tight text-2xl">{props.title}</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost">
              <HelpCircleIcon className="w-5 h-5" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Über diese Frage</DialogTitle>
              <DialogDescription className="hidden">
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="h-[500px] prose prose-sm dark:prose-invert">
              {children}
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
);

StepTitle.displayName = "StepTitle";

const StepDescription = forwardRef<HTMLDivElement, { children: string }>(
  ({ children, ...props }, ref) => {
    return (
      <div className="px-8 pt-4" ref={ref} {...props}>
        <Markdown className="text-muted-foreground">{children}</Markdown>
      </div>
    );
  }
);

StepDescription.displayName = "StepDescription";

const StepContent = forwardRef<HTMLDivElement, InputProps>(
  ({ children, ...props }, ref) => {
    return (
      <div className="px-8 pt-4 grow" ref={ref} {...props}>
        {children}
      </div>
    );
  }
);

StepContent.displayName = "StepContent";

const StepNavigation = forwardRef<HTMLDivElement, InputProps>(
  ({ children, ...props }, ref) => {
    return (
      <div className="px-8 py-6 flex justify-between" {...props}>
        {children}
      </div>
    );
  }
);

StepNavigation.displayName = "StepNavigation";

export { StepContent, StepDescription, StepNavigation, StepRoot, StepTitle };
