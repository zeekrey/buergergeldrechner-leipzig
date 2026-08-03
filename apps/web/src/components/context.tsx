"use client";

import {
  useState,
  useEffect,
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
  useCallback,
} from "react";

import { StepContext, TStepContext } from "@/lib/types";

export const StateContext = createContext<TStepContext>(null!);

export const SetStateContext =
  createContext<Dispatch<SetStateAction<TStepContext>>>(null!);

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
  const setStateWithLocalStorageSync = useCallback(
    (action: SetStateAction<TStepContext>) => {
      setState((currentState) => {
        const nextState =
          typeof action === "function" ? action(currentState) : action;
        localStorage.setItem("state", JSON.stringify(nextState));
        return nextState;
      });
    },
    []
  );

  /** Sync the runtime state with the localstorage.  */
  useEffect(() => {
    const localState = localStorage.getItem("state");

    if (localState) {
      const { success, data, error } = StepContext.safeParse(
        JSON.parse(localState)
      );
      if (success) {
        console.log("Syncing new state: ", data);
        setState(data);
      } else {
        console.warn(
          "State objects in localstorage does not match with current version."
        );
        console.warn(error.issues);
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
