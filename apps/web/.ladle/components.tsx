import "../src/app/globals.css";
import { GlobalProvider } from "@ladle/react";
import { AppRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const Provider: GlobalProvider = ({ children }) => {
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
      {children}
    </AppRouterContext.Provider>
  );
};
