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
import { TStepContext } from "@/lib/types";
import { useSteps } from "@/lib/machine";
import { useEffect } from "react";

function calculate(context: TStepContext) {
  let sumByType = {};
  let totalSum = 0;

  context.community.forEach((obj) => {
    const type = obj.type;
    let value: number;

    switch (type) {
      case "applicant":
        value = 506;
        break;
      case "partner":
        value = 506;
        break;
      case "child":
        value = 471;
        break;
      default:
        break;
    }

    sumByType[type] = (sumByType[type] || 0) + value;
    totalSum += value;
  });

  return totalSum;
}

export function StatusBar() {
  const steps = useSteps();

  const result = calculate(steps.context);

  return (
    <div className="fixed bottom-8 w-full z-10">
      {Boolean(steps.currentStep) && (
        <div className="mx-auto max-w-3xl border-t sm:border border-border/40 sm:shadow-sm sm:rounded-lg justify-between px-8 py-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="text-xs flex w-full justify-between items-center">
            <small>Fortschritt</small>
            <small>Möglicher Anspruch:</small>
          </div>
          <div className="flex w-full justify-between items-center">
            <Progress />
            <strong className="text-lg">{result} €</strong>
          </div>
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
