"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { StepState } from "./types";

const useHash = () => {
  const params = useParams();
  const [hash, setHash] = useState("");

  useEffect(() => {
    const currentHash = window.location.hash.replace("#", "");
    setHash(currentHash);
  }, [params]);

  return hash;
};

/**
 * Used to check if the localstorage holds an valid state object and if so, load it.
 * @param dispatch
 */
const useLocalStorageState = (dispatch) => {
  useEffect(() => {
    const localState = localStorage.getItem("state");

    if (localState) {
      const { success, data } = StepState.safeParse(JSON.parse(localState));
      if (success) {
        dispatch({ type: "load", state: data });
      }
    }
  }, [dispatch]);
};

export { useLocalStorageState };

export default useHash;
