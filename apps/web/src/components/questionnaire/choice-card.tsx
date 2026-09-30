import type { LucideIcon } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function QuestionnaireChoiceGroup({
  className,
  ...props
}: ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-3", className)} {...props} />;
}

type QuestionnaireChoiceCardProps = Omit<
  ComponentProps<typeof Label>,
  "children" | "htmlFor"
> & {
  checked?: boolean;
  control: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
  htmlFor: string;
  icon?: LucideIcon;
  invalid?: boolean;
  title: ReactNode;
};

export function QuestionnaireChoiceCard({
  checked = false,
  className,
  control,
  description,
  disabled = false,
  htmlFor,
  icon: Icon,
  invalid = false,
  title,
  ...props
}: QuestionnaireChoiceCardProps) {
  return (
    <Label
      aria-disabled={disabled}
      data-checked={checked}
      data-disabled={disabled}
      data-invalid={invalid}
      htmlFor={htmlFor}
      className={cn(
        "group/choice relative flex min-h-11 w-full cursor-pointer items-start gap-3 rounded-xl border border-input bg-background px-4 py-3 text-left leading-normal transition-[border-color,background-color,box-shadow] hover:bg-muted/50 has-[:focus-visible]:border-ring has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-ring/50",
        checked && "border-primary bg-primary/5 shadow-xs",
        disabled && "cursor-not-allowed opacity-60 hover:bg-background",
        invalid && "border-destructive/60 bg-destructive/5",
        className
      )}
      {...props}
    >
      {Icon ? (
        <Icon
          className={cn(
            "mt-0.5 size-5 shrink-0 text-muted-foreground transition-colors",
            checked && "text-foreground"
          )}
        />
      ) : null}
      <div className="flex flex-1 flex-col gap-1">
        <span className="font-medium text-foreground">{title}</span>
        {description ? (
          <span className="text-sm text-muted-foreground">{description}</span>
        ) : null}
      </div>
      <div className="mt-0.5 shrink-0">{control}</div>
    </Label>
  );
}
