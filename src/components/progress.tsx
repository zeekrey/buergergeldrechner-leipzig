import { TStepsState } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

export function Progress({ state }: { state: TStepsState }) {
  console.log(state);
  const steps = useMemo(() => Object.entries(state.steps), [state.steps]);

  return (
    <ul className="flex gap-2 py-2">
      {steps.map(([id]) => (
        <li
          className={cn("w-2 h-2 rounded-full bg-zinc-400", {
            "bg-zinc-600 w-10 rounded-sm": parseInt(id) === state.currentStep,
          })}
          key={id}
        />
      ))}
    </ul>
  );
}
