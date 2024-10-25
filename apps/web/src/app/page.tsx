import Image from "next/image";

import { Button } from "@/components/ui/button";
import BgImage from "../assets/bg-image.webp";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bürgergeldrechner des Jobcenter Leipzig",
  description:
    "Berechnen Sie Ihr Bürgergeld einfach und unkompliziert mit dem Bürgergeldrechner des Jobcenters Leipzig. Erfahren Sie, welche Leistungen Ihnen zustehen und erhalten Sie individuelle Unterstützung bei Ihrer Antragstellung. Nutzen Sie unseren kostenlosen Online-Rechner für eine schnelle und präzise Berechnung.",
};

export default function StepPage() {
  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[450px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">
              Bürgergeldrechner des Jobcenter Leipzig
            </h1>
            <p className="text-balance text-muted-foreground">
              Schnell und einfach den Bürgergeldanspruch prüfen mit dem
              Bürgergeldrechner des Jobcenters Leipzig.
            </p>
          </div>
          <Link href="antrag/erwerbsfaehig" className="mx-auto">
            <Button className="w-[250px]">Starten</Button>
          </Link>
          <div className="mt-4 text-center text-sm">
            Sie sind bereit einen Bürgergeldantrag zu stellen?
            <a
              href="https://www.arbeitsagentur.de/arbeitslos-arbeit-finden/buergergeld"
              className="underline block"
            >
              → Zum Jobcenter.digital
            </a>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block relative group">
        <Image
          src={BgImage}
          alt="Hintergrundbild, Foto von Leipzig"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.3] dark:grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-80% to-muted"></div>
        <div className="absolute right-2 bottom-16 rounded-md backdrop-blur-sm px-2 py-1 text-xs opacity-20 text-muted group-hover:opacity-100 group-hover:backdrop-blur-xl">
          Foto von{" "}
          <a
            href="https://unsplash.com/de/@kiwihug?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
            className="underline"
          >
            Kiwihug
          </a>{" "}
          auf{" "}
          <a
            href="https://unsplash.com/de/fotos/luftaufnahme-des-stadtgebiets-YR_r_lrfATc?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
            className="underline"
          >
            Unsplash
          </a>
        </div>
      </div>
    </div>
  );
}
