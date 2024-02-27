"use client";

import { Button } from "@/components/ui/button";
import { HelpCircleIcon } from "lucide-react";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "lucide-react";
import { forwardRef } from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const StepRoot = forwardRef<HTMLDivElement, InputProps>(
  ({ children, ...props }, ref) => {
    return (
      <div className="sm:h-screen sm:flex sm:items-center" {...props}>
        <div
          className="sm:border sm:shadow-sm rounded-lg w-full flex flex-col min-h-dvh sm:min-h-96"
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
          <Button variant="ghost">
            <HelpCircleIcon className="w-5 h-5" />
          </Button>
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
