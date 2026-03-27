import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { fontSans } from "@/lib/fonts";
import { FathomAnalytics } from "@/lib/fathom";

import "./globals.css";

export const metadata = {
  description:
    "Der Grundsicherungsrechner der Stadt Leipzig hilft Ihnen, schnell und einfach zu berechnen, ob Sie Anspruch auf Grundsicherung haben. Nutzen Sie unser benutzerfreundliches Tool, um Ihre finanzielle Unterstützung zu prüfen und wichtige Informationen zur Antragstellung zu erhalten.",
  title: "Grundsicherungsrechner des Jobcenter Leipzig",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html className="" lang="de" suppressHydrationWarning>
      <meta
        content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover"
        name="viewport"
      />
      <body
        className={cn("bg-muted/40 font-sans antialiased", fontSans.variable)}
      >
        <FathomAnalytics />
        {children}
      </body>
    </html>
  );
}
