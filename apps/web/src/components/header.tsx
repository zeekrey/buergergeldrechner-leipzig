import { MainNav } from "@/components/main-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { HelpPopup } from "./help-popup";
import { StatusBar } from "./status-bar";

export function SiteHeader() {
  // const [state, setState] = useStateContext();

  // const handleReset = useCallback(() => {
  //   setState(initialStepsState.context);
  //   localStorage.removeItem("state");
  // }, []);

  return (
    <header className="w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className=" px-8 py-3 border-b border-border/40">
        <div className="flex items-center max-w-7xl mx-auto">
          <MainNav />
          {/* <MobileNav /> */}
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none"></div>
            <nav className="flex items-center">
              <ModeToggle />
              <HelpPopup />
            </nav>
          </div>
        </div>
      </div>
      <StatusBar />
    </header>
  );
}
