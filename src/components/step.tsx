import {
  StepDescription,
  StepRoot,
  StepTitle,
} from "@/components/ui/step-primitives";

import { StepChildren } from "./steps/step-children";
import { StepChildrenCount } from "./steps/step-children-count";
import { StepIncome } from "./steps/step-income";
import { StepPartner } from "./steps/step-partner";
import { StepSalary } from "./steps/step-salary";
import { StepSpending } from "./steps/step-spendings";
import { StepSummary } from "./steps/step-summary";

const stepComponents = {
  ergebnis: (arg) => <StepSummary />,
  kinder: (arg) => <StepChildren />,
  "kinder-anzahl": (arg) => <StepChildrenCount />,
  "monatliche-ausgaben": (arg) => <StepSpending />,
  "monatliches-einkommen": (arg) => <StepSalary />,
  partnerschaft: (arg) => <StepPartner />,
  "weiteres-einkommen": (arg) => <StepIncome />,
};

export function Step({ id, step }) {
  const StepToRender = stepComponents[id](step);

  return (
    <StepRoot id={id}>
      <StepTitle>{step.title}</StepTitle>
      <StepDescription>{step.description}</StepDescription>
      {StepToRender}
    </StepRoot>
  );
}
