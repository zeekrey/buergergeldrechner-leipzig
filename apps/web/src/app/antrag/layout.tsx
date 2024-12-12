"use client";

import { ReactNode } from "react";
import { SiteHeader } from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
import { initialStepsState } from "@/lib/machine";
import { StateProvider } from "@/components/context";
import { ThemeProvider } from "@/components/theme-provider";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      disableTransitionOnChange
      enableSystem
    >
      <StateProvider initialState={initialStepsState.context}>
        <Toaster position="top-right" />
        <SiteHeader />
        <main className="flex flex-col sm:gap-12 mx-auto max-w-3xl">
          {children}
        </main>
      </StateProvider>
    </ThemeProvider>
  );
}
