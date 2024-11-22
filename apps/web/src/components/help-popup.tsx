"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./ui/sheet";
import LogoImage from "../assets/logo.webp";
import SmartCityImage from "../assets/smart-city-challenge.webp";
import StadtImage from "../assets/stadt-leipzig.webp";
import { InfoIcon } from "lucide-react";
import Image from "next/image";

export function HelpPopup() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="w-9 px-0">
          <InfoIcon className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Hilfe anzeigen</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] flex flex-col">
        <SheetHeader>
          <div className="text-center">
            <h2 className="text-muted-foreground text-sm mt-6">
              Ein offizielles Angebot des
            </h2>
            <Image
              src={LogoImage}
              alt="jobcenter-leipzig-logo"
              width={120}
              className="mx-auto py-4"
            />
          </div>
        </SheetHeader>
        <div className="flex-grow"></div>
        <div>
          <div className="flex justify-center gap-2">
            <Image
              src={StadtImage}
              alt="jobcenter-leipzig-logo"
              width={100}
              className=""
            />
            <Image
              src={SmartCityImage}
              alt="jobcenter-leipzig-logo"
              width={200}
              className=""
            />
          </div>
          <p className="text-muted-foreground text-sm mt-6">
            Der Bürgergeldrechner wurde im Rahmen des Innovationswettbewerbs
            <strong>"Smart City Challenge Leipzig"</strong>durch das Referat
            Digitale Stadt Leipzig gefördert.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
