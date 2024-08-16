"use client";

import { TStepsState } from "@/lib/types";
import { useLocalStorage } from "usehooks-ts";
import { initialStepsState } from "@/lib/machine";
import { StepsProvider } from "@/components/step-context-provider";
import { StatusBar } from "@/components/status-bar";
import { SiteHeader } from "@/components/header";
import { Toaster } from "@/components/ui/sonner";

export default function Layout({ children }) {
  const [value, setValue] = useLocalStorage<TStepsState>(
    "buergergeld.dev",
    initialStepsState
  );

  return (
    <StepsProvider initialValue={value} syncValue={setValue}>
      <Toaster position="top-right" />
      <SiteHeader />
      <StatusBar />
      <main className="flex flex-col sm:gap-12 min-h-dvh mx-auto max-w-3xl">
        {children}
      </main>
    </StepsProvider>
  );
}
