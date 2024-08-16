"use client";

import { stepsConfig } from "@/lib/machine";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Progress() {
  const slug = usePathname();
  const steps = useMemo(() => Object.entries(stepsConfig), []);

  return (
    <ul className="flex gap-2 py-2">
      {steps.map(([id, step]) => (
        <HoverCard key={id}>
          <HoverCardTrigger asChild>
            <Link href={step.id}>
              <li
                className={cn(
                  "cursor-pointer hover:bg-primary w-2 h-2 rounded-full bg-zinc-400",
                  {
                    "bg-zinc-600 w-10 rounded-sm":
                      slug === `/antrag/${step.id}`,
                  }
                )}
              />
            </Link>
          </HoverCardTrigger>
          <HoverCardContent>
            <p className="text-xs">{step.title}</p>
          </HoverCardContent>
        </HoverCard>
      ))}
    </ul>
  );
}
