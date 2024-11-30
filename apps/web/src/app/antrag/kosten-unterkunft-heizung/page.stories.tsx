import type { Story } from "@ladle/react";
import { StateProvider } from "@/components/context";
import { initialStepsState } from "@/lib/machine";
import StepSpending from "./page";

export const StepSpendingStory: Story = () => <StepSpending />;

StepSpendingStory.decorators = [
  (Component) => {
    return (
      <StateProvider initialState={initialStepsState.context}>
        <Component />
      </StateProvider>
    );
  },
];
