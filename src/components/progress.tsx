import { useSteps } from "@/lib/machine";
import { cn } from "@/lib/utils";

export function Progress() {
  const steps = useSteps();

  return (
    <ul className="flex gap-2">
      {Object.entries(steps.steps).map(([id]) => (
        <li
          className={cn("w-2 h-2 rounded-full bg-zinc-400", {
            "bg-zinc-600 w-10 rounded-sm": parseInt(id) === steps.currentStep,
          })}
          key={id}
        />
      ))}
    </ul>
  );
}
