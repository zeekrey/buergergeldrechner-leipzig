import { Geist } from "next/font/google";
import { ReactNode } from "react";

import { TooltipProvider } from "@/components/ui/tooltip";
import { FathomAnalytics } from "@/lib/fathom";
import { cn } from "@/lib/utils";

import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
  description:
    "Der Bürgergeldrechner der Stadt Leipzig hilft Ihnen, schnell und einfach zu berechnen, ob Sie Anspruch auf Bürgergeld haben. Nutzen Sie unser benutzerfreundliches Tool, um Ihre finanzielle Unterstützung zu prüfen und wichtige Informationen zur Antragstellung zu erhalten.",
  title: "Bürgergeldrechner des Jobcenter Leipzig",
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
