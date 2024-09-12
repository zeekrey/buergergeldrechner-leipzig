import Link from "next/link";

import { CommandMenu } from "./command-menu";
// import { Icons } from "@/components/icons";
import { MainNav } from "@/components/main-nav";
import { MobileNav } from "@/components/mobile-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { HelpCircleIcon, RotateCwIcon } from "lucide-react";
import { HelpPopup } from "./help-popup";
import { Button } from "./ui/button";
import { useStateContext } from "./context";
import { useCallback } from "react";
import { initialStepsState } from "@/lib/machine";
// import { buttonVariants } from "@/components/ui/button";
// import { GithubIcon } from "lucide-react";

export function SiteHeader() {
  const [state, setState] = useStateContext();

  const handleReset = useCallback(() => {
    setState(initialStepsState.context);
    localStorage.removeItem("state");
  }, []);

  return (
    <header className="sticky md:absolute top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none"></div>
          <nav className="flex items-center">
            {/* <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              >
              <div
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  }),
                  "w-9 px-0"
                  )}
                  >
                  <GithubIcon className="h-4 w-4" />
                  <span className="sr-only">GitHub</span>
                  </div>
                  </Link> */}
            {/* <CommandMenu /> */}
            {state && (
              <Button variant="link" size="sm" asChild onClick={handleReset}>
                <Link href="/antrag/erwerbsfaehig">
                  <RotateCwIcon className="w-4 h-4 mr-2" />
                  Neu starten
                </Link>
              </Button>
            )}
            <ModeToggle />
            <HelpPopup />
          </nav>
        </div>
      </div>
    </header>
  );
}
