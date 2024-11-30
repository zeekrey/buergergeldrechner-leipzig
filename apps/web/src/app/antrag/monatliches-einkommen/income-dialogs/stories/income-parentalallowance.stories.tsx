import type { Story } from "@ladle/react";
import { initialStepsState } from "@/lib/machine";
import { ParentalAllowance } from "../parental-allowance";
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
