import Image from "next/image";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  ArrowRightIcon,
  DraftingCompassIcon,
  LockIcon,
  MenuIcon,
  ShapesIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { StepExample } from "../components/step-example";
import ExportScreenshotImage from "../assets/export-screenshot.png";
import StadtLeipzigImage from "../assets/stadt-leipzig.webp";
import SmartCityImage from "../assets/smart-city-challenge.webp";
import JobcenterImage from "../assets/logo.webp";

export const metadata: Metadata = {
  title: "Bürgergeldrechner des Jobcenter Leipzig",
  description:
    "Berechnen Sie Ihr Bürgergeld einfach und unkompliziert mit dem Bürgergeldrechner des Jobcenters Leipzig. Erfahren Sie, welche Leistungen Ihnen zustehen und erhalten Sie individuelle Unterstützung bei Ihrer Antragstellung. Nutzen Sie unseren kostenlosen Online-Rechner für eine schnelle und präzise Berechnung.",
  openGraph: {
    title: "Bürgergeldrechner des Jobcenter Leipzig",
    description:
      "Berechnen Sie Ihr Bürgergeld einfach und unkompliziert mit dem Bürgergeldrechner des Jobcenters Leipzig. Erfahren Sie, welche Leistungen Ihnen zustehen und erhalten Sie individuelle Unterstützung bei Ihrer Antragstellung. Nutzen Sie unseren kostenlosen Online-Rechner für eine schnelle und präzise Berechnung.",
    url: "https://buergergeld.io",
    siteName: "Bürgergeldrechner des Jobcenter Leipzig",
    images: [
      {
        url: "https://www.buergergeld.dev/og.png", // Must be an absolute URL
        width: 1200,
        height: 630,
      },
    ],
    locale: "de_DE",
    type: "website",
  },
};

// const navigation = [
//   { name: "Funktionen", href: "/#features" },
//   { href: "/#roadmap", name: "Roadmap" },
//   { href: "/updates", name: "Updates" },
//   { href: "/blog", name: "Blog" },
// ];

const features = [
  {
    description:
      "Für die Berechnung ist keine Anmeldung und auch keine Verifizierung erforderlich.",
    name: "Einfach und schnell.",
    icon: ShapesIcon,
  },
  {
    description:
      "Keine der von Ihnen eingegebenen Informationen verlässt Ihren Computer oder Ihr Telefon. Ihre Daten sind somit sicher.",
    name: "Sicher und geschützt.",
    icon: LockIcon,
  },
  {
    description:
      "Der Bürgergeldrechner berücksichtigt bereits zahlreiche Informationen, die für den Anspruch auf Bürgergeld relevant sind.",
    name: "Detailgenaue berechnung",
    icon: DraftingCompassIcon,
  },
];

export default function HomePage() {
  return (
    <>
      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          {/* <div className="flex lg:flex-1">
            <Link className="-m-1.5 p-1.5" href="/">
              Bürgergeldrechner des Jobcenter Leipzig
            </Link>
          </div> */}
          <div className="flex lg:hidden">
            <Drawer>
              <DrawerTrigger asChild>
                <button
                  className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-zinc-700"
                  type="button"
                >
                  <span className="sr-only">Menü öffnen</span>
                  <MenuIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </DrawerTrigger>
              <DrawerContent className="text-zinc-900">
                <DrawerHeader>
                  <DrawerTitle>
                    Bürgergeldrechner des Jobcenter Leipzig
                  </DrawerTitle>
                  <DrawerDescription>
                    Schnell und einfach den Anspruch auf Bürgergeld mit dem
                    Bürgergeldrechner des Jobcenters Leipzig prüfen.
                  </DrawerDescription>
                </DrawerHeader>
                {/* <div className="p-2 flex flex-col"> */}
                {/* nav */}
                {/* {navigation.map((item) => (
                    <Link
                      className="text-sm font-semibold leading-6 text-zinc-900 border-b border-zinc-900/10 pb-3 mb-3 flex items-center justify-between"
                      href={item.href}
                      key={item.name}
                    >
                      {item.name}
                      <ArrowRightIcon
                        className="w-3 h-3 ml-1"
                        aria-hidden="true"
                      />
                    </Link>
                  ))} */}
                {/* </div> */}
                <DrawerFooter>
                  <Button asChild>
                    <Link href="/antrag">Berechnen</Link>
                  </Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
          {/* <div className="hidden lg:flex lg:gap-x-12"> */}
          {/* {navigation.map((item) => (
              <a
                className="text-sm font-semibold leading-6 text-zinc-900"
                href={item.href}
                key={item.name}
              >
                {item.name}
              </a>
            ))} */}
          {/* nav */}
          {/* </div> */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Button variant="default" asChild>
              <Link
                className="text-sm font-semibold leading-6 flex items-center gap-1"
                href="/antrag"
              >
                Berechnen
                <ArrowRightIcon className="w-3 h-3" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </nav>
      </header>
      {/* hero */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <svg
          style={{
            maskImage:
              "radial-gradient(100% 100% at top right,white,transparent)",
          }}
          className="h-full w-full absolute stroke-zinc-200 inset-0 -z-10"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
              patternUnits="userSpaceOnUse"
              height="200"
              width="200"
              x="50%"
              y="-1"
            >
              <path d="M.5 200V.5H200" fill="none"></path>
            </pattern>
          </defs>
          <rect
            fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)"
            strokeWidth="0"
            height="100%"
            width="100%"
          ></rect>
        </svg>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <a
              className="relative bg-white flex items-center gap-1 rounded-full px-3 py-1 text-sm leading-6 text-zinc-600 ring-1 ring-zinc-900/10 hover:ring-zinc-600/20"
              href="https://www.arbeitsagentur.de/arbeitslos-arbeit-finden/buergergeld"
            >
              Sie sind bereit einen Bürgergeldantrag zu stellen?
              <span className="">Direkt zu Jobcenter.digital</span>
              <ArrowRightIcon className="w-3 h-3" aria-hidden />
            </a>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-6xl">
              Bürgergeld, schnell und einfach berechnen
            </h1>
            <p className="mt-6 text-lg leading-8 text-zinc-700">
              Ermitteln Sie Ihre möglichen Ansprüche in nur wenigen Schritten –
              transparent und unkompliziert. Bestens informiert und vorbereitet.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                className={cn(buttonVariants({ variant: "default" }))}
                href="/antrag"
              >
                Jetzt berechnen
              </Link>
              <a
                className={cn(buttonVariants({ variant: "link" }))}
                href="#features"
              >
                Mehr Informationen
                <ArrowRightIcon className="w-3 h-3 ml-1" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* features */}
      <div className="overflow-x-hidden py-24 sm:py-32" id="features">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:pr-8 lg:pt-4">
              <div className="lg:max-w-lg">
                <h2 className="text-base font-semibold leading-7 text-zinc-900/50">
                  Einfach & sicher
                </h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
                  Bürgergeld berechnen
                </p>
                <p className="mt-6 text-lg leading-8 text-zinc-700">
                  Der Bürgergeldrechner des Jobcenters Leipzig bietet eine
                  einfache und sichere Möglichkeit, den eigenen Bürgergeldbedarf
                  zu prüfen – ganz ohne Anmeldung.
                </p>
                <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-zinc-700 lg:max-w-none">
                  {features.map((feature) => (
                    <div className="relative pl-9" key={feature.name}>
                      <dt className="inline font-semibold text-zinc-900">
                        <feature.icon
                          className="absolute left-1 top-1 h-5 w-5 text-zinc-900/50"
                          aria-hidden="true"
                        />
                        {feature.name}
                      </dt>{" "}
                      <dd className="inline">{feature.description}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
            <div className="w-[42rem] max-w-none sm:w-[42rem] md:-ml-4 lg:-ml-0 self-center">
              <div className="-m-4 p-4 bg-zinc-100 rounded-xl ring-1 ring-gray-400/30">
                <div className="rounded-lg drop-shadow-xl overflow-hidden">
                  <StepExample />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* results */}
      <div className="py-24 sm:py-32" id="import">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-zinc-900/50">
              Ganz einfach
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
              Ergebnisse teilen
            </p>
            <p className="mt-6 text-lg leading-8 text-zinc-700">
              Der Bürgergeldrechner zeigt eine detailgenaue Berechnung des
              Bürgergelds. Zudem haben Sie die Möglichkeit das Ergebnis mit
              jemandem zu teilen.
            </p>
          </div>
          <div className="pt-16 overflow-hidden relative">
            <div className="px-6 mx-auto max-w-6xl">
              <Image
                className="ring-1 ring-zinc-200 drop-shadow-2xl rounded-xl mx-auto"
                style={{ marginBottom: "-12%" }}
                alt="import image"
                src={ExportScreenshotImage}
              />
              <div className="relative" aria-hidden>
                <div className="bg-gradient-to-b from-transparent to-muted/40 pt-[7%] absolute bottom-0 -inset-x-20"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* supported by */}
      <div className="py-24 sm:py-32" id="roadmap">
        <div className="py-24 sm:py-32">
          <div className="mx-auto max-w-4xl px-6 lg:px-8 ">
            <div className="text-center mx-auto">
              <h2 className="text-base font-semibold leading-7 text-zinc-900/50">
                Ein Projekt des Jobcenter Leipzig und der Stadt Leipzig
              </h2>
              <p className="text-center text-xl font-semibold text-zinc-900 mt-2">
                Der Bürgergeldrechner wurde im Rahmen des Innovationswettbewerbs
                "Smart City Challenge Leipzig" durch das Referat Digitale Stadt
                Leipzig gefördert.
              </p>
            </div>
            <div className="flex flex-col mt-10 items-center space-y-16 sm:space-y-0 sm:flex-row justify-center">
              <Image
                alt="Stadt Leipzig Logo"
                src={StadtLeipzigImage}
                width={158}
                className="max-h-20 w-full object-contain"
              />
              <Image
                alt="Smart City Logo"
                src={SmartCityImage}
                width={158}
                className="max-h-16 w-full object-contain"
              />
              <Image
                alt="Jobcenter Leipzig Logo"
                src={JobcenterImage}
                width={158}
                className="max-h-16 w-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
      {/* footer */}
      <footer>
        <hr />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <nav
            className="flex justify-center gap-12 text-zinc-700 text-sm"
            aria-label="Footer"
          >
            <div>
              <a href="https://jobcenter-leipzig.de/ueber-uns/impressum/">
                Impressum
              </a>
            </div>
            <div>
              <a href="https://jobcenter-leipzig.de/ueber-uns/datenschutzerklaerung/">
                Datenschutz
              </a>
            </div>
          </nav>
        </div>
      </footer>
    </>
  );
}
