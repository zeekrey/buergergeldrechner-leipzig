"use client";

import { StepContext, TStepContext } from "@/lib/types";
import {
  useState,
  useEffect,
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
  useCallback,
} from "react";

export const StateContext = createContext<TStepContext>(null);

export const SetStateContext =
  createContext<Dispatch<SetStateAction<TStepContext>>>(null);

export function useStateContext() {
  return [useContext(StateContext), useContext(SetStateContext)] as const;
}

export function StateProvider({
  children,
  initialState,
}: {
  children: React.ReactNode;
  initialState: TStepContext;
}) {
  const [state, setState] = useState<TStepContext>(initialState);

  /** Store the state in localstorage whenever the setState method is called. */
  const setStateWithLocalStorageSync = useCallback((_state: TStepContext) => {
    localStorage.setItem("state", JSON.stringify(_state));
    setState(_state);
  }, []);

  /** Sync the runtime state with the localstorage.  */
  useEffect(() => {
    const localState = localStorage.getItem("state");

    if (localState) {
      const { success, data } = StepContext.safeParse(JSON.parse(localState));
      if (success) {
        setState(data);
      }
    }
  }, [setState]);

  return (
    <StateContext.Provider value={state}>
      <SetStateContext.Provider value={setStateWithLocalStorageSync}>
        {children}
      </SetStateContext.Provider>
    </StateContext.Provider>
  );
}
