"use client";

import { initialStepsState } from "@/lib/machine";
import { StateProvider } from "@/components/context";
import { StatusBar } from "@/components/status-bar";
import { SiteHeader } from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <StateProvider initialState={initialStepsState.context}>
      <Toaster position="top-right" />
      <SiteHeader />
      <StatusBar />
      <main className="flex flex-col sm:gap-12 min-h-dvh mx-auto max-w-3xl">
        {children}
      </main>
    </StateProvider>
  );
}
