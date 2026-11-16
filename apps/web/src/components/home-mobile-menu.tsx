"use client";

import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { useSyncExternalStore } from "react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const subscribe = () => () => {};
const getHydrated = () => true;
const getServerHydrated = () => false;

export function HomeMobileMenu() {
  const hydrated = useSyncExternalStore(
    subscribe,
    getHydrated,
    getServerHydrated,
  );

  return (
    <Drawer>
      <DrawerTrigger
        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-foreground"
        disabled={!hydrated}
      >
        <span className="sr-only">Menü öffnen</span>
        <MenuIcon className="size-6" aria-hidden="true" />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            Grundsicherungsrechner des Jobcenters Leipzig
          </DrawerTitle>
          <DrawerDescription>
            Schnell und einfach einen möglichen Anspruch auf Grundsicherungsgeld
            mit dem Grundsicherungsrechner des Jobcenters Leipzig prüfen.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button asChild>
            <Link href="/antrag">Berechnen</Link>
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
