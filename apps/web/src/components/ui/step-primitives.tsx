// "use client";

import { Button } from "@/components/ui/button";
import { HelpCircleIcon } from "lucide-react";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "lucide-react";
import { forwardRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const StepRoot = forwardRef<HTMLDivElement, InputProps>(
  ({ children, ...props }, ref) => {
    return (
      <div className="sm:h-screen sm:flex sm:items-center" {...props}>
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

const StepTitle = forwardRef<HTMLDivElement, InputProps>(
  ({ children, ...props }, ref) => {
    return (
      <div
        className="px-8 pt-6 flex justify-between items-center"
        ref={ref}
        {...props}
      >
        <h2 className="font-semibold tracking-tight text-2xl">{children}</h2>
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
              <div className="prose prose-sm">
                <h3>Warum wird diese Frage gestellt?</h3>
                <p>
                  Wie viel Bürgergeld Sie erhalten können, richtet sich
                  maßgeblich nach den finanziellen Mitteln die eine
                  Lebensgemeinschaft hat. Sind Sie partnerlos, wird sich nur
                  Ihre eigenen finanziellen Mitteln angeschaut. Leben Sie jedoch
                  in einer Partnerschaft, müssen auch die finanziellen Mittel
                  Ihres Partners betrachtet werden.
                </p>
                <h3>Wo finde ich mehr Informationen dazu?</h3>
                <p>Hier finden Sie mehr Informationen dazu:</p>
                <ul>
                  <li>
                    <a href="http://">Link #1</a>
                  </li>
                  <li>
                    <a href="http://">Link #1</a>
                  </li>
                  <li>
                    <a href="http://">Link #1</a>
                  </li>
                </ul>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    );
  }
);

StepTitle.displayName = "StepTitle";

const StepDescription = forwardRef<HTMLDivElement, InputProps>(
  ({ children, ...props }, ref) => {
    return (
      <div className="px-8 pt-4" ref={ref} {...props}>
        <p className="text-muted-foreground">{children}</p>
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

export { StepContent, StepDescription, StepNavigation, StepRoot, StepTitle };
