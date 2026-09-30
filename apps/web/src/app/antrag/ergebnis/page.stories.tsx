import type { Story } from "@ladle/react";

import { StateProvider } from "@/components/context";
import {
  singleWithoutKids,
  singleWithoutKidsNoNeed,
} from "@/config/fixtures";

import StepResult from "./page";

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
    const value = singleWithoutKidsNoNeed;

    return (
      <StateProvider initialState={value}>
        <Component />
      </StateProvider>
    );
  },
];
