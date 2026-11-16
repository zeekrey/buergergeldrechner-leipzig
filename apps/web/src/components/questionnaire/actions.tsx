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
      className={cn("min-w-0 flex-1 sm:min-w-40 sm:flex-none", className)}
      size="lg"
      type={type}
      {...props}
    >
      {children}
      <ArrowRightIcon data-icon="inline-end" />
    </Button>
  );
}
