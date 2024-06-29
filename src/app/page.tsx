"use client";

import { Hero } from "@/components/hero";
import { StatusBar } from "@/components/status-bar";
import { Step } from "@/components/step";
import { StepsProvider } from "@/components/step-context-provider";
import { stepsConfig } from "@/lib/machine";
import { useMemo } from "react";

export default function StepPage() {
  const steps = useMemo(
    () => Object.entries(stepsConfig.steps),
    [stepsConfig.steps]
  );

  return (
    <>
      <Hero />
      <StepsProvider value={stepsConfig}>
        <StatusBar />
        <main className="flex flex-col sm:gap-12 min-h-dvh mx-auto max-w-3xl">
          {steps.map(([id, step]) => (
            <Step id={step.id} key={id} step={step} />
          ))}
        </main>
      </StepsProvider>
    </>
  );
}
