"use client";

import { Button } from "@/components/ui/button";
import { useSteps, useStepsDispatch } from "@/lib/machine";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "lucide-react";
import { forwardRef } from "react";

const StepRoot = forwardRef(({ children, ...props }, ref) => {
  return (
    <div className="sm:h-screen sm:flex sm:items-center" {...props}>
      <div
        className="border shadow-sm rounded-lg w-full flex flex-col min-h-screen sm:min-h-96"
        ref={ref}
      >
        {children}
      </div>
    </div>
  );
});

StepRoot.displayName = "StepRoot";

const StepTitle = forwardRef(({ children, ...props }, ref) => {
  return (
    <div className="px-8 pt-6" ref={ref} {...props}>
      <h2 className="font-semibold tracking-tight text-2xl">{children}</h2>
    </div>
  );
});

StepTitle.displayName = "StepTitle";

const StepDescription = forwardRef(({ children, ...props }, ref) => {
  return (
    <div className="px-8 pt-4" ref={ref} {...props}>
      <p className="text-muted-foreground">{children}</p>
    </div>
  );
});

StepDescription.displayName = "StepDescription";

const StepContent = forwardRef(({ children, ...props }, ref) => {
  return (
    <div className="px-8 pt-4 grow" ref={ref} {...props}>
      {children}
    </div>
  );
});

StepContent.displayName = "StepContent";

const StepNavigation = forwardRef(({ children, ...props }, ref) => {
  const dispatch = useStepsDispatch();

  return (
    <div className="px-8 py-6 flex justify-between gap-4">
      <Button onClick={() => dispatch({ type: "previous" })}><ArrowLeftCircleIcon className="w-4 h-4" /></Button>
      <Button
        className="grow sm:grow-0 sm:w-48 "
        onClick={() => dispatch({ type: "next" })}
      >
        Weiter
        <ArrowRightCircleIcon className="w-4 h-4 ml-3" />
      </Button>
    </div>
  );
});

StepNavigation.displayName = "StepNavigation";

export { StepContent, StepDescription, StepNavigation, StepRoot, StepTitle };
