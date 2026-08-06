import type { TStepContext } from "@/lib/types";

import { stepsConfig } from "@/lib/machine";

export function getApplicableStepIds(state: TStepContext) {
  const stepIds: string[] = [];
  const visitedSteps = new Set<number>();
  let currentStep = 0;

  while (!visitedSteps.has(currentStep)) {
    const step = stepsConfig[currentStep];

    if (!step) {
      break;
    }

    visitedSteps.add(currentStep);
    stepIds.push(step.id);

    const nextStep = step.next(state);

    if (!stepsConfig[nextStep]) {
      break;
    }

    currentStep = nextStep;
  }

  return stepIds;
}
