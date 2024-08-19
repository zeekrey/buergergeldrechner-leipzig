import StepResult from "./page";
import type { Story } from "@ladle/react";
import { StepsProvider } from "@/components/step-context-provider";
import { initialStepsState } from "@/lib/machine";
import { useState } from "react";
import { coupleWithKids, singleWithoutKids } from "@/config/fixtures";
import { TStepsState } from "@/lib/types";
import { stepsConfig } from "@/lib/machine";

const step = stepsConfig[8];

export const StepResultStory: Story = () => <StepResult />;
export const StepResultStoryNegative: Story = () => <StepResult />;

StepResultStory.decorators = [
  (Component) => {
    const [value, setValue] = useState<TStepsState>({
      currentStep: 8,
      step,
      context: singleWithoutKids,
    });

    return (
      <StepsProvider initialValue={value} syncValue={setValue}>
        <Component />
      </StepsProvider>
    );
  },
];

StepResultStoryNegative.decorators = [
  (Component) => {
    const [value, setValue] = useState<TStepsState>({
      currentStep: 8,
      step,
      context: coupleWithKids,
    });

    return (
      <StepsProvider initialValue={value} syncValue={setValue}>
        <Component />
      </StepsProvider>
    );
  },
];
