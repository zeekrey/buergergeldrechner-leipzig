import type { Story } from "@ladle/react";

import { initialStepsState } from "@/lib/machine";
import { TIncomeType, TPerson } from "@/lib/types";
import { generateId } from "@/lib/utils";

import { EmploymentIncome } from "../employment-income";

const person: TPerson = {
  id: generateId(),
  name: "Antragsteller",
  type: "adult",
  income: [],
};

const incomeType: TIncomeType = "EmploymentIncome";

initialStepsState.context.community = [person];

export const EmploymentIncomeStory: Story = () => {
  console.log("dwqdqwd");

  return (
    <EmploymentIncome
      person={person}
      incomeType={incomeType}
      setOpen={() => false}
    />
  );
};

EmploymentIncomeStory.decorators = [
  (Component) => {
    return <Component />;
  },
];

EmploymentIncomeStory.args = {
  argument: "hello world",
};

EmploymentIncomeStory.argTypes = {
  variant: {
    options: ["primary", "secondary"],
    control: { type: "radio" }, // or type: inline-radio
    defaultValue: "primary",
  },
};
