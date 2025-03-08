import { Progress } from "./progress";
import { useMemo } from "react";
import { calculateOverall } from "@/lib/calculation";
import { useStateContext } from "./context";
import { ResultSheet } from "@/app/antrag/ergebnis/result-sheet";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ChevronDownIcon } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";

export function StatusBar() {
  const [state] = useStateContext();

  const { overall } = useMemo(() => calculateOverall(state), [state]);

  return (
    <Drawer>
      <DrawerTrigger className="w-full group">
        <div className="px-8 pt-6">
          <div className="flex justify-between mx-auto max-w-7xl">
            <div className="flex flex-col justify-between">
              <small className="text-xs text-left">Fortschritt</small>
              <Progress />
            </div>
            <div className="flex flex-col justify-center">
              <small className="text-xs">Möglicher Anspruch</small>
              <strong className="text-lg text-right">
                {overall.toLocaleString("de-DE", {
                  currency: "EUR",
                  style: "currency",
                })}
              </strong>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <ChevronDownIcon className="w-4 h-4 text-muted group-hover:text-primary transition" />
        </div>
      </DrawerTrigger>
      <DrawerContent className="max-h-[80%]">
        <DrawerHeader className="max-w-4xl mx-auto px-3">
          <DrawerTitle>Ihre aktuellen Eingaben</DrawerTitle>
          <DrawerDescription>
            Bei der Darstellung handelt es sich um eine Vorabrechnung auf die es
            keinerlei Haftung gibt. Ihren tatsächlichen Bürgergeldanspruch kann
            nur das Jobcenter prüfen.
          </DrawerDescription>
        </DrawerHeader>
        <div className="max-w-4xl mx-auto ">
          <ScrollArea className="h-[480px]">
            <ResultSheet state={state} />
          </ScrollArea>
        </div>
        <DrawerFooter />
      </DrawerContent>
    </Drawer>
  );
}
