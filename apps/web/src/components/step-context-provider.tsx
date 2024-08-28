"use client";

import {
  initialStepsState,
  stepsConfig,
  StepsContext,
  StepsDispatchContext,
  stepsReducer,
} from "@/lib/machine";
import { TStepsState } from "@/lib/types";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useReducer, useRef } from "react";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { produce } from "immer";

export function StepsProvider({
  children,
  initialValue,
  syncValue,
}: {
  children: React.ReactNode;
  initialValue: TStepsState;
  syncValue: Dispatch<SetStateAction<TStepsState>>;
}) {
  const { replace } = useRouter();
  const slug = usePathname();
  const [steps, dispatch] = useReducer(stepsReducer, initialValue);

  /**
   * Check localstorage on load:
   * If there is no local storage object, and the URL is not the start URL → Redirect to start
   * If there is a local storage object, the URL is not the same is current stepp in the local storage object → Show hint with redirect option
   */
  // useEffect(() => {
  //   if (`/antrag/${initialValue.step?.id} ` !== slug) {
  //     console.warn(
  //       "Redirecting because no state does not match slug.",
  //       `Current step is "/antrag/${initialValue.step?.id}", but slug is "${slug}."`
  //     );
  //     /**
  //      * TODO:
  //      * If there is a mismatch between the localstorage and the requested page, redirect and reset the local storage for now.
  //      * The key should be stored as reference.
  //      */
  //     dispatch({
  //       type: "load",
  //       state: initialStepsState,
  //     });
  //     replace("/antrag/erwerbsfaehig");
  //   }
  // }, []);

  useEffect(() => {
    console.log(steps.context);
    syncValue(steps);
  }, [steps]);

  return (
    <StepsContext.Provider value={steps}>
      <StepsDispatchContext.Provider value={dispatch}>
        {children}
      </StepsDispatchContext.Provider>
    </StepsContext.Provider>
  );
}
