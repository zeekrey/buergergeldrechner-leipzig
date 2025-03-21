"use client";

import { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import { initialStepsState } from "@/lib/machine";
import { StateProvider } from "@/components/context";
import { ThemeProvider } from "@/components/theme-provider";
import { MainNav } from "@/components/main-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { Feedback } from "@/components/feedback";
import { HelpPopup } from "@/components/help-popup";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      disableTransitionOnChange
      enableSystem
    >
      <StateProvider initialState={initialStepsState.context}>
        <Toaster position="bottom-right" />
        <div className="flex flex-col min-h-dvh">
          <header className="w-full border-b border-border/40 bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/60">
            <div className="px-4 md:px-8 py-3 border-b border-border/40">
              <div className="flex items-center max-w-7xl mx-auto">
                <MainNav />
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                  <div className="w-full flex-1 md:w-auto md:flex-none"></div>
                  <nav className="flex items-center gap-2">
                    <ModeToggle />
                    <Feedback />
                    <HelpPopup />
                  </nav>
                </div>
              </div>
            </div>
          </header>
          <main className="grow flex flex-col justify-center items-center sm:py-6">
            {children}
          </main>
        </div>
      </StateProvider>
    </ThemeProvider>
  );
}
