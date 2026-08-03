import type { Story } from "@ladle/react";

import { initialStepsState } from "@/lib/machine";
import { TIncomeType, TPerson } from "@/lib/types";
import { generateId } from "@/lib/utils";

import { ParentalAllowance } from "../parental-allowance";

const person: TPerson = {
  id: generateId(),
  name: "Antragsteller",
  type: "adult",
  income: [],
};

const incomeType: TIncomeType = "ParentalAllowance";

initialStepsState.context.community = [person];

export const ParentalAllowanceStory: Story = () => {
  console.log("dwqdqwd");

  return (
    <ParentalAllowance
      person={person}
      incomeType={incomeType}
      setOpen={() => false}
    />
  );
};

ParentalAllowanceStory.decorators = [
  (Component) => {
    return <Component />;
  },
];

ParentalAllowanceStory.args = {
  argument: "hello world",
};

ParentalAllowanceStory.argTypes = {
  variant: {
    options: ["primary", "secondary"],
    control: { type: "radio" }, // or type: inline-radio
    defaultValue: "primary",
  },
};
