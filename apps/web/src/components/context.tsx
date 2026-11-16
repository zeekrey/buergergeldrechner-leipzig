"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type Dispatch,
  type SetStateAction,
} from "react";

import { StepContext, TStepContext } from "@/lib/types";

export const StateContext = createContext<TStepContext>(null!);
export const SetStateContext = createContext<
  Dispatch<SetStateAction<TStepContext>>
>(null!);
export const StateHydratedContext = createContext(false);

const STATE_CHANGED_EVENT = "calculator-state-changed";

function subscribeToStorage(onChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === "state" || event.key === null) onChange();
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener(STATE_CHANGED_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(STATE_CHANGED_EVENT, onChange);
  };
}

function getStoredState() {
  return localStorage.getItem("state");
}

function getServerState() {
  return undefined;
}

function parseStoredState(
  serialized: string | null | undefined,
  initialState: TStepContext,
) {
  if (!serialized) return initialState;
  try {
    const result = StepContext.safeParse(JSON.parse(serialized));
    return result.success ? result.data : initialState;
  } catch {
    return initialState;
  }
}

export function useStateContext() {
  return [useContext(StateContext), useContext(SetStateContext)] as const;
}

export function useStateHydrated() {
  return useContext(StateHydratedContext);
}

export function StateProvider({
  children,
  initialState,
}: {
  children: React.ReactNode;
  initialState: TStepContext;
}) {
  const serialized = useSyncExternalStore<string | null | undefined>(
    subscribeToStorage,
    getStoredState,
    getServerState,
  );
  const state = useMemo(
    () => parseStoredState(serialized, initialState),
    [serialized, initialState],
  );

  const setState = useCallback(
    (action: SetStateAction<TStepContext>) => {
      const current = parseStoredState(getStoredState(), initialState);
      const next = typeof action === "function" ? action(current) : action;
      localStorage.setItem("state", JSON.stringify(next));
      window.dispatchEvent(new Event(STATE_CHANGED_EVENT));
    },
    [initialState],
  );

  return (
    <StateContext.Provider value={state}>
      <SetStateContext.Provider value={setState}>
        <StateHydratedContext.Provider value={serialized !== undefined}>
          <div
            className="contents"
            data-slot="calculator-state"
            inert={serialized === undefined}
          >
            {children}
          </div>
        </StateHydratedContext.Provider>
      </SetStateContext.Provider>
    </StateContext.Provider>
  );
}
