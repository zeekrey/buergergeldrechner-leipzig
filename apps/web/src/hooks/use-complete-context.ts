"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import type { TStepContext } from "@/lib/types";

import { useStateHydrated } from "@/components/context";
import {
  hasCompleteAges,
  type TCompleteStepContext,
} from "@/lib/complete-context";

export function useCompleteContext(
  context: TStepContext
): TCompleteStepContext | undefined {
  const router = useRouter();
  const hydrated = useStateHydrated();
  const completeContext = hasCompleteAges(context) ? context : undefined;

  useEffect(() => {
    if (hydrated && !completeContext) {
      router.replace(
        context.community.length > 0
          ? "/antrag/alter"
          : "/antrag/erwerbsfaehig"
      );
    }
  }, [completeContext, context.community.length, hydrated, router]);

  return completeContext;
}
