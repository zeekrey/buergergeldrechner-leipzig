"use client";

import {
  StepsContext,
  StepsDispatchContext,
  stepsReducer,
} from "@/lib/machine";
import { useRouter } from "next/navigation";
import { useEffect, useReducer } from "react";

export function StepsProvider({ children, value }) {
  const { push } = useRouter();
  const [steps, dispatch] = useReducer(stepsReducer, value);

  useEffect(() => {
    window.history.pushState({}, "", `#${steps.steps[steps.currentStep].id}`);
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        document.querySelector(hash).scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [steps, push]);

  return (
    <StepsContext.Provider value={steps}>
      <StepsDispatchContext.Provider value={dispatch}>
        {children}
      </StepsDispatchContext.Provider>
    </StepsContext.Provider>
  );
}
