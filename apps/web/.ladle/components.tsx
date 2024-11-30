import "../src/app/globals.css";
import { GlobalProvider } from "@ladle/react";
import { AppRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import * as React from "react";
import { initialStepsState } from "../src/lib/machine";
import { Debugger } from "../src/components/debugger";
import { StateProvider } from "../src/components/context";

export const Provider: GlobalProvider = ({
  children,
  globalState,
  storyMeta,
}) => {
  return (
    <AppRouterContext.Provider
      value={{
        back: () => {
          // Do nothing
        },
        forward: () => {
          // Do nothing
        },
        prefetch: () => {
          // Do nothing
        },
        push: () => {
          // Do nothing
        },
        refresh: () => {
          // Do nothing
        },
        replace: () => {
          // Do nothing
        },
      }}
    >
      <StateProvider initialState={initialStepsState.context}>
        {children}
        <Debugger />
      </StateProvider>
    </AppRouterContext.Provider>
  );
};
