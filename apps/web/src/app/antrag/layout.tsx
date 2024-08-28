"use client";

import { StepState, TStepsState } from "@/lib/types";
import { useLocalStorage } from "usehooks-ts";
import { initialStepsState } from "@/lib/machine";
import { StepsProvider } from "@/components/step-context-provider";
import { StatusBar } from "@/components/status-bar";
import { SiteHeader } from "@/components/header";
import { Toaster } from "@/components/ui/sonner";

export default function Layout({ children }) {
  /** FIXME: Remove this for now, as it only makes issues. */
  // const [value, setValue] = useLocalStorage<TStepsState>(
  //   "state",
  //   initialStepsState,
  //   {
  //     initializeWithValue: false,
  //   }
  // );

  /** The received localstorage state gets parsed by zod. If it is successfull, it is passed. Otherwise a fresh state is used. */
  // const initialValue = StepState.safeParse(value).success
  //   ? value
  //   : initialStepsState;

  return (
    <StepsProvider initialValue={initialStepsState} syncValue={() => {}}>
      <Toaster position="top-right" />
      <SiteHeader />
      <StatusBar />
      <main className="flex flex-col sm:gap-12 min-h-dvh mx-auto max-w-3xl">
        {children}
      </main>
    </StepsProvider>
  );
}
