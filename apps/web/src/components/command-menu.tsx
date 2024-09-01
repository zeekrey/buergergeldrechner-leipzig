"use client";

import { UsersIcon, RotateCcwIcon, UserIcon } from "lucide-react";
import { useState, useCallback, useEffect } from "react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { CommandIcon } from "lucide-react";
import { Button } from "./ui/button";
import { coupleWithoutKids, singleWithoutKids } from "@/config/fixtures";
import { useStateContext } from "./context";

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [state, setState] = useStateContext();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleReset = useCallback(() => {
    /** Clear only our own data, instead of everything. */
    localStorage.removeItem("buergergeld.dev");
    setOpen(false);
  }, []);

  const handleSingleWithoutKids = useCallback(() => {
    // dispatch({
    //   type: "load",
    //   state: { ...state, context: singleWithoutKids },
    // });
    setOpen(false);
  }, []);

  const handleCoupleWithoutKids = useCallback(() => {
    // dispatch({
    //   type: "load",
    //   state: { ...state, context: coupleWithoutKids },
    // });
    setOpen(false);
  }, []);

  return (
    <>
      <Button
        variant="ghost"
        className="w-9 px-0"
        onClick={() => setOpen(true)}
      >
        <CommandIcon className="h-[1.2rem] w-[1.2rem]" />
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Kommando eingeben oder suchen..." />
        <CommandList>
          <CommandEmpty>Keine Einträge gefunden.</CommandEmpty>
          <CommandGroup heading="Voreinstellungen">
            <CommandItem onSelect={handleSingleWithoutKids}>
              <UserIcon className="mr-2 h-4 w-4" />
              <span>Alleinstehend ohne Kinder</span>
            </CommandItem>
            <CommandItem onSelect={handleCoupleWithoutKids}>
              <UsersIcon className="mr-2 h-4 w-4" />
              <span>Paar ohne Kinder</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Einstellungen">
            <CommandItem onSelect={handleReset}>
              <RotateCcwIcon className="mr-2 h-4 w-4" />
              <span>Zurücksetzen</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
