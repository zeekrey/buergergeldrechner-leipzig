import { createContext, useContext, useEffect, useReducer } from 'react';

/**
 * @typedef {Object} Step
 * @property {string} title - The title of the step.
 * @property {number} next - The age of the person.
 */

export const StepsContext = createContext(null);

export const StepsDispatchContext = createContext(null);

export function useSteps() {
    return useContext(StepsContext);
}

/**
 * @returns {React.Dispatch<{ type: 'next' | 'previous' | 'deleted', id?: string }>}
 */
export function useStepsDispatch() {
    return useContext(StepsDispatchContext);
}

/**
 * @param {typeof stepsConfig.steps} steps The steps configuration
 * @param {{ type: 'next' | 'previous' | 'deleted', id?: string }} action The action to perform
 * @returns {typeof stepsConfig} The whole steps configuration
 */
export function stepsReducer(steps, action) {
    switch (action.type) {
        case 'next': {
            const newContext = { ...steps }

            newContext.currentStep = steps.steps[steps.currentStep].next;
            return newContext
        }
        case 'previous': {
            const newContext = { ...steps }

            newContext.currentStep = steps.steps[steps.currentStep].previous;
            return newContext
        }
        case 'deleted': {
            return steps.filter(t => t.id !== action.id);
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}