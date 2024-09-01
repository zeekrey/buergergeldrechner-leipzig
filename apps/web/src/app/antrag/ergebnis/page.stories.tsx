import StepResult from "./page";
import type { Story } from "@ladle/react";
import { StateProvider } from "@/components/context";
import { coupleWithKids, singleWithoutKids } from "@/config/fixtures";
import { stepsConfig } from "@/lib/machine";

const step = stepsConfig[8];

export const StepResultStory: Story = () => <StepResult />;
export const StepResultStoryNegative: Story = () => <StepResult />;

StepResultStory.decorators = [
  (Component) => {
    const value = singleWithoutKids;

    return (
      <StateProvider initialState={value}>
        <Component />
      </StateProvider>
    );
  },
];

StepResultStoryNegative.decorators = [
  (Component) => {
    const value = coupleWithKids;

    return (
      <StateProvider initialState={value}>
        <Component />
      </StateProvider>
    );
  },
];
