import { fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

import "./globals.css";

export const metadata = {
  description:
    "Der Bürgergeldrechner der Stadt Leipzig hilft Ihnen, schnell und einfach zu berechnen, ob Sie Anspruch auf Bürgergeld haben. Nutzen Sie unser benutzerfreundliches Tool, um Ihre finanzielle Unterstützung zu prüfen und wichtige Informationen zur Antragstellung zu erhalten.",
  title: "Bürgergeldrechner des Jobcenter Leipzig",
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
        {children}
      </body>
    </html>
  );
}
