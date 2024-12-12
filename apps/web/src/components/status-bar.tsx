import { Progress } from "./progress";
import { useMemo } from "react";
import { calculateOverall } from "@/lib/calculation";
import { useStateContext } from "./context";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ResultSheet } from "@/app/antrag/ergebnis/page";

export function StatusBar() {
  const [state] = useStateContext();

  const { overall } = useMemo(() => calculateOverall(state), [state]);

  return (
    <Collapsible>
      <CollapsibleTrigger className="w-full">
        <div className="mx-auto sm:rounded-lg justify-between px-8 pt-6">
          <div className="flex justify-between">
            <div className="flex flex-col justify-between gap-2">
              <small className="text-xs text-left">Fortschritt</small>
              <Progress />
            </div>
            <div className="flex flex-col gap-2 items-center justify-center">
              {/* <div className="flex gap-2 border border-amber-300 bg-amber-100 text-amber-950 rounded-full items-center px-1 py-1">
              <div className="border border-amber-300 rounded-full p-1">
                <RotateCcwIcon className="w-4 h-4 text-amber-950" />
              </div>
              <div className="text-xs pr-2">Wollen Sie von Vorne beginnen?</div>
            </div> */}
            </div>
            <div className="flex flex-col justify-center gap-2">
              <small className="text-xs">Möglicher Anspruch</small>
              <strong className="text-lg text-right">
                {overall.toLocaleString("de-DE", {
                  currency: "EUR",
                  style: "currency",
                })}
              </strong>
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
        <div className="w-8 h-1.5 rounded bg-muted mx-auto mb-3"></div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="p-4">
          <ResultSheet state={state} />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
