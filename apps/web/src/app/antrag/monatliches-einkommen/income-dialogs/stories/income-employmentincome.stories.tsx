import type { Story } from "@ladle/react";
import { initialStepsState } from "@/lib/machine";
import { EmploymentIncome } from "../employment-income";
import { TIncome, TIncomeType, TPerson } from "@/lib/types";
import { generateId } from "@/lib/utils";

const income: TIncome = {
  id: generateId(),
  allowance: 0,
  amount: 0,
  claim: 0,
  officialAllowance: 1,
  parentalAllowanceType: "normal",
  type: "ParentalAllowance",
};

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
