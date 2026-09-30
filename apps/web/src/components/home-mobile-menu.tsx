"use client";

import { MenuIcon } from "lucide-react";
import Link from "next/link";

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

export function HomeMobileMenu() {
  return (
    <Drawer>
      <DrawerTrigger className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-zinc-700">
        <span className="sr-only">Menü öffnen</span>
        <MenuIcon className="size-6" aria-hidden="true" />
      </DrawerTrigger>
      <DrawerContent className="text-zinc-900">
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
