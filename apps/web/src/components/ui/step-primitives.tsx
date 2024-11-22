import { Button } from "@/components/ui/button";
import { AlertCircleIcon, HelpCircleIcon } from "lucide-react";
import { forwardRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Markdown from "react-markdown";
import { ScrollArea } from "./scroll-area";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const StepRoot = forwardRef<HTMLDivElement, InputProps>(
  ({ children, ...props }, ref) => {
    return (
      <div
        className="sm:min-h-screen sm:flex sm:items-center sm:pt-24 sm:pb-36"
        {...props}
      >
        <div
          className="sm:border sm:shadow-sm rounded-lg w-full flex flex-col min-h-dvh sm:min-h-96 bg-background pt-14 sm:pt-0"
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
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost">
                <HelpCircleIcon className="w-5 h-5" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Über diese Frage</DialogTitle>
              </DialogHeader>
              <ScrollArea className="h-[500px] prose prose-sm">
                {children}
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </div>
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
      <div className="px-8 py-6 flex justify-between gap-4" {...props}>
        {children}
      </div>
    );
  }
);

StepNavigation.displayName = "StepNavigation";

const StepNote = forwardRef<HTMLDivElement, InputProps>(
  ({ children, ...props }, ref) => {
    return (
      <div className="px-8 py-6" {...props}>
        <div className="px-2 py-4 rounded-md bg-yellow-100 flex gap-2 items-center">
          <AlertCircleIcon className="shrink-0 w-5 h-5 text-yellow-950" />
          <p className="text-sm text-yellow-950">{children}</p>
        </div>
      </div>
    );
  }
);

export {
  StepContent,
  StepDescription,
  StepNavigation,
  StepRoot,
  StepTitle,
  StepNote,
};
