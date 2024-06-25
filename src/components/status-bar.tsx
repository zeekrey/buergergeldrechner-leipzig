import Link from "next/link";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
// import { CommandMenu } from "@/components/command-menu";
// import { Icons } from "@/components/icons";
import { MainNav } from "@/components/main-nav";
import { MobileNav } from "@/components/mobile-nav";
import { ModeToggle } from "@/components/mode-toggle";
// import { buttonVariants } from "@/components/ui/button";
// import { GithubIcon } from "lucide-react";
import { LanguageToggle } from "./language-toggle";
import { Progress } from "./progress";
import { TChild, TStepContext } from "@/lib/types";
import { useStepsMachine } from "@/lib/machine";
import { useEffect, useMemo } from "react";
import * as data from "../config/data.json";

function calculate(context: TStepContext) {
  let sumByType = {};
  let totalSum = 0;

  context.community.forEach(({ type, ...attributes }) => {
    let value: number;

    if (type === "adult") value = data[type].default;
    else if (type === "child") {
      value = data[type][(attributes as TChild).age];
    }

    sumByType[type] = (sumByType[type] || 0) + value;
    totalSum += value;
  });

  return totalSum;
}

export function StatusBar() {
  const [state] = useStepsMachine();

  console.log(state);

  const result = calculate(state.context);
  const communitySize = useMemo(
    () => state.context.community.length,
    [state.context.community]
  );

  return (
    <div className="fixed bottom-8 w-full z-10">
      {Boolean(state.currentStep) && (
        <div className="mx-auto max-w-3xl border-t sm:border border-border/40 sm:shadow-sm sm:rounded-lg justify-between px-8 py-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex justify-between">
            <div className="flex flex-col justify-between gap-2">
              <small className="text-xs">Fortschritt</small>
              <Progress state={state} />
            </div>
            <div className="flex flex-col gap-2 items-center">
              <small className="text-xs">Bedarfsgemeinschaft</small>
              <strong className="text-lg">{communitySize} Personen</strong>
            </div>
            <div className="flex flex-col justify-center gap-2">
              <small className="text-xs">Möglicher Anspruch:</small>
              <strong className="text-lg text-right">{result} €</strong>
            </div>
          </div>
          {/* <div className="text-xs flex w-full justify-between items-center">
            <small>Fortschritt</small>
            <small>Bedarfsgemeinschaft</small>
            <small>Möglicher Anspruch:</small>
          </div>
          <div className="flex w-full justify-between items-center">
            <Progress state={state} />
            <strong className="text-lg">{communitySize} Personen</strong>
            <strong className="text-lg">{result} €</strong>
          </div> */}
        </div>
      )}
      {/* <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost">
            <BoltIcon className="w-5 h-5" />
          </Button>
        </DialogTrigger>
        <Settings />
      </Dialog>
      <Progress />
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost">
            <HelpCircleIcon className="w-5 h-5" />
          </Button>
        </DialogTrigger>
        <About />
      </Dialog> */}
    </div>

    // <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    //   <div className="container flex h-14 max-w-screen-2xl items-center">
    //     <MainNav />
    //     {/* <MobileNav /> */}
    //     <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
    //       <div className="w-full flex-1 md:w-auto md:flex-none">
    //         {/* <CommandMenu /> */}
    //         huhu
    //       </div>
    //       <nav className="flex items-center">
    //         {/* <Link
    //           href={siteConfig.links.github}
    //           target="_blank"
    //           rel="noreferrer"
    //         >
    //           <div
    //             className={cn(
    //               buttonVariants({
    //                 variant: "ghost",
    //               }),
    //               "w-9 px-0"
    //             )}
    //           >
    //             <GithubIcon className="h-4 w-4" />
    //             <span className="sr-only">GitHub</span>
    //           </div>
    //         </Link> */}
    //         <LanguageToggle />
    //         <ModeToggle />
    //       </nav>
    //     </div>
    //   </div>
    // </header>
  );
}
