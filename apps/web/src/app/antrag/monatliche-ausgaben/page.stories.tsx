import type { Story } from "@ladle/react";
import { StepsProvider } from "@/components/step-context-provider";
import { initialStepsState } from "@/lib/machine";
import { useState } from "react";
import { TStepsState } from "@/lib/types";
import StepSpending from "./page";

export const StepSpendingStory: Story = () => <StepSpending />;

StepSpendingStory.decorators = [
  (Component) => {
    const [value, setValue] = useState<TStepsState>(initialStepsState);

    return (
      <StepsProvider initialValue={value} syncValue={setValue}>
        <Component />
      </StepsProvider>
    );
  },
];
