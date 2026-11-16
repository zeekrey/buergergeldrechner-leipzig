"use client";

import { ReactNode } from "react";

import { StateProvider } from "@/components/context";
import { SiteHeader } from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
import { initialStepsState } from "@/lib/machine";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <StateProvider initialState={initialStepsState.context}>
      <Toaster position="bottom-right" />
      <div className="flex flex-col min-h-dvh">
        <SiteHeader />
        <main className="grow flex flex-col justify-center items-center sm:py-6">
          {children}
        </main>
      </div>
    </StateProvider>
  );
}
