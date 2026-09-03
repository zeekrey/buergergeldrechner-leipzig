import type { ComponentProps } from "react";

import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type WizardActionButtonProps = Omit<ComponentProps<typeof Button>, "size">;

export function WizardBackButton({
  children = "Zurück",
  className,
  type = "button",
  variant = "outline",
  ...props
}: WizardActionButtonProps) {
  return (
    <Button
      className={cn("min-w-28", className)}
      size="lg"
      type={type}
      variant={variant}
      {...props}
    >
      <ArrowLeftIcon data-icon="inline-start" />
      {children}
    </Button>
  );
}

export function WizardNextButton({
  children = "Weiter",
  className,
  type = "submit",
  ...props
}: WizardActionButtonProps) {
  return (
    <Button
      className={cn("w-full sm:w-auto sm:min-w-40", className)}
      size="lg"
      type={type}
      {...props}
    >
      {children}
      <ArrowRightIcon data-icon="inline-end" />
    </Button>
  );
}
