import { Metadata } from "next";
import { Geist } from "next/font/google";
import { ReactNode } from "react";

import { TooltipProvider } from "@/components/ui/tooltip";
import { FathomAnalytics } from "@/lib/fathom";
import { cn } from "@/lib/utils";

import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  description:
    "Der Grundsicherungsrechner der Stadt Leipzig hilft Ihnen, schnell und einfach einen möglichen Anspruch auf Grundsicherungsgeld zu berechnen. Das Ergebnis ist eine unverbindliche Orientierung zur Grundsicherung für Arbeitsuchende.",
  title: "Grundsicherungsrechner des Jobcenters Leipzig",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html className={cn("font-sans", geist.variable)} lang="de" suppressHydrationWarning>
      <meta
        content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover"
        name="viewport"
      />
      <body className="bg-muted/40 font-sans antialiased">
        <TooltipProvider>
          <FathomAnalytics />
          {children}
        </TooltipProvider>
      </body>
    </html>
  );
}
