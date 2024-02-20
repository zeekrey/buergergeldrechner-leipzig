/**
 * @typedef {import('../lib/machine').Step} Step
 */

import {
  StepContent,
  StepDescription,
  StepNavigation,
  StepRoot,
  StepTitle,
} from "@/components/ui/step-primitives";

import { StepPartner } from "./steps/step-partner";

const stepComponents = {
  kinder: (arg) => <StepPartner step={arg} />,
  "kinder-anzahl": (arg) => <StepPartner step={arg} />,
  "monatliche-ausgaben": (arg) => <StepPartner step={arg} />,
  "monatliches-einkommen": (arg) => <StepPartner step={arg} />,
  partnerschaft: (arg) => <StepPartner step={arg} />,
  "weiteres-einkommen": (arg) => <StepPartner step={arg} />,
};

/**
 * React component description.
 * @param {Object} props - The props object.
 * @param {Step} props.step - Description of the step prop.
 * @returns {JSX.Element} React component with prop.
 */
export function Step({ id, step }) {
  const StepToRender = stepComponents[id](step);

  return (
    <StepRoot id={id}>
      <StepTitle>{step.title}</StepTitle>
      <StepDescription>{step.description}</StepDescription>
      <StepContent>{StepToRender}</StepContent>
      <StepNavigation />
    </StepRoot>
  );
}
