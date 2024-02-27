import { Dispatch, createContext, useContext } from "react";

import { TAction, TStepsConfig } from "./types";

export const StepsContext = createContext<TStepsConfig>(null);

export const StepsDispatchContext = createContext<Dispatch<TAction>>(null);

export function useSteps() {
  return useContext(StepsContext);
}

export function useStepsDispatch() {
  return useContext(StepsDispatchContext);
}

export function stepsReducer(context, action) {
  switch (action.type) {
    case "next": {
      const newContext = {
        ...context,
        context: { ...context.context, ...action.data },
      };

      const nextStepId = context.steps[context.currentStep].next(
        newContext.context
      );
      newContext.currentStep = nextStepId;

      return newContext;
    }
    case "previous": {
      const newContext = { ...context };

      newContext.currentStep = context.steps[context.currentStep].previous;
      return newContext;
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
