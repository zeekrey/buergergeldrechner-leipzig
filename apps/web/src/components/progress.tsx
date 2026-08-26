"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

import { useStateContext } from "@/components/context";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { stepsConfig } from "@/lib/machine";
import { cn } from "@/lib/utils";
import { getApplicableStepIds } from "@/lib/wizard-progress";

const allSteps = Object.values(stepsConfig);

export function Progress() {
  const pathname = usePathname();
  const [state] = useStateContext();

  const currentSlug = pathname.split("/").filter(Boolean).at(-1) ?? "";

  const applicableStepIds = useMemo(() => getApplicableStepIds(state), [state]);
  const applicableStepSet = useMemo(
    () => new Set(applicableStepIds),
    [applicableStepIds]
  );

  const currentApplicableIndex = applicableStepIds.indexOf(currentSlug);
  const currentStepNumber = currentApplicableIndex === -1 ? 1 : currentApplicableIndex + 1;
  const totalSteps = applicableStepIds.length || 1;
  const progressValue = Math.round((currentStepNumber / totalSteps) * 100);
  const currentStep =
    allSteps.find((step) => step.id === currentSlug) ?? allSteps[0];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Fortschritt
          </span>
          <p className="text-sm font-medium">
            Schritt {currentStepNumber} von {totalSteps}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1 text-right">
          <span className="max-w-52 truncate text-xs text-muted-foreground sm:max-w-none">
            {currentStep.title}
          </span>
          <span className="text-sm font-medium">{progressValue}%</span>
        </div>
      </div>
      <ol className="flex flex-wrap items-center gap-2">
        {allSteps.map((step, index) => {
          const isCurrent = currentSlug === step.id;
          const applicableIndex = applicableStepIds.indexOf(step.id);
          const isApplicable = applicableStepSet.has(step.id);
          const isCompleted =
            applicableIndex !== -1 && applicableIndex < currentApplicableIndex;

          return (
            <li key={step.id}>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Link
                    href={`/antrag/${step.id}`}
                    className={cn(
                      "block rounded-full transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                      isCurrent
                        ? "h-2.5 w-8 bg-primary"
                        : isCompleted
                          ? "size-2.5 bg-primary/75"
                          : isApplicable
                            ? "size-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                            : "size-2.5 border border-dashed border-muted-foreground/30 hover:border-muted-foreground/50"
                    )}
                  >
                    <span className="sr-only">
                      Schritt {index + 1}: {step.title}
                    </span>
                  </Link>
                </HoverCardTrigger>
                <HoverCardContent className="w-auto px-3 py-2">
                  <p className="text-xs font-medium">{step.title}</p>
                  {!isApplicable ? (
                    <p className="text-xs text-muted-foreground">
                      Derzeit nicht erforderlich
                    </p>
                  ) : null}
                </HoverCardContent>
              </HoverCard>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
