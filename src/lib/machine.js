//@ts-check
import { createContext, useContext } from 'react';

export const StepsContext = createContext(null);

export const StepsDispatchContext = createContext(null);

/**
 * @returns {import("@/lib/types").TStepsConfig}
 */
export function useSteps() {
    return useContext(StepsContext);
}

/**
 * @template {import("@/lib/types").TAction} T
 * @returns {React.Dispatch<T>}
 */
export function useStepsDispatch() {
    return useContext(StepsDispatchContext);
}

/**
 * @param {import("@/lib/types").TStepsConfig} context The steps configuration
 * @param {import("@/lib/types").TAction} action The action to perform
 * @returns {import("@/lib/types").TStepsConfig} The whole steps configuration
 */
export function stepsReducer(context, action) {
    switch (action.type) {
        case 'next': {
            const newContext = { ...context, context: { ...context.context, ...action.data } }

            const nextStepId = context.steps[context.currentStep].next(newContext.context)
            newContext.currentStep = nextStepId

            return newContext
        }
        case 'previous': {
            const newContext = { ...context }

            newContext.currentStep = context.steps[context.currentStep].previous;
            return newContext
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}