import StepSalary from "./page";
import type { Story } from "@ladle/react";
import { StepsProvider } from "@/components/step-context-provider";
import { initialStepsState } from "@/lib/machine";
import { useState } from "react";
import { TStepsState } from "@/lib/types";

export const StepSalaryStory: Story = () => <StepSalary />;

StepSalaryStory.decorators = [
  (Component) => {
    const [value, setValue] = useState<TStepsState>(initialStepsState);

    return (
      <StepsProvider initialValue={value} syncValue={setValue}>
        <Component />
      </StepsProvider>
    );
  },
];
