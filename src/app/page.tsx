"use client";

import { Hero } from "@/components/hero";
import { StatusBar } from "@/components/status-bar";
import { Step } from "@/components/step";
import { StepsProvider } from "@/components/step-context-provider";
import { stepsConfig } from "@/lib/machine";
import { useScrollSpy } from "../../packages/wizard/src/lib";
import { useEffect, useMemo, useRef } from "react";
import { produce } from "immer";

export default function StepPage() {
  const steps = useMemo(
    () => Object.entries(stepsConfig.steps).map((step) => step),
    [stepsConfig.steps]
  );

  const stepRefs = steps.map((step) => ({ name: step[0], ref: useRef() }));
  const activeStep = useScrollSpy(stepRefs);

  // useEffect(() => {
  //   produce(state, (draft) => {
  //     draft.currentStep = activeStep;
  //   });
  //   console.log("state changed: ", state);
  //   console.log(activeStep);
  // }, [activeStep]);

  return (
    <>
      <Hero />
      <StepsProvider value={stepsConfig}>
        <StatusBar />
        <main className="flex flex-col sm:gap-12 min-h-dvh mx-auto max-w-3xl">
          {steps.map(([id, step], index) => (
            <Step id={step.id} key={id} step={step} ref={stepRefs[index].ref} />
          ))}
        </main>
      </StepsProvider>
    </>
  );
}
