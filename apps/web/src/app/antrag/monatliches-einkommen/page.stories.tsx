import type { Story } from "@ladle/react";

import { StateProvider } from "@/components/context";
import { initialStepsState } from "@/lib/machine";

import StepSalary from "./page";

export const StepSalaryStory: Story = () => <StepSalary />;

StepSalaryStory.decorators = [
  (Component) => {
    const value = initialStepsState;

    return (
      <StateProvider initialState={value.context}>
        <Component />
      </StateProvider>
    );
  },
];
