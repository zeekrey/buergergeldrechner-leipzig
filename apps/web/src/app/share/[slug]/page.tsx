import { ResultSheet } from "@/app/antrag/ergebnis/page";
import { SiteHeader } from "@/components/header";
import { HelpPopup } from "@/components/help-popup";
import { ModeToggle } from "@/components/mode-toggle";
import { Card } from "@/components/ui/card";
import { neon } from "@neondatabase/serverless";

async function getData(
  slug: string
): Promise<
  { success: false; error: string } | { success: true; data: string }
> {
  if (
    typeof process.env.DATABASE_URL === "undefined" ||
    typeof slug === "undefined"
  ) {
    console.error("Provide env vars for neon or an function argument.");
    return { success: false, error: "Check server logs!" };
  }

  try {
    const sql = neon(process.env.DATABASE_URL);
    const response = await sql`SELECT * FROM links WHERE alias = ${slug}`;

    console.log(response);
    return { success: true, data: JSON.stringify(response[0].state) };
  } catch (error) {
    return { success: false, error: JSON.stringify(error) };
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const result = await getData(slug);

  if (!result.success) return <>Unknown</>;

  return (
    <div className="">
      <header className="w-full">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          {/* <MainNav /> */}
          {/* <MobileNav /> */}
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none"></div>
            <nav className="flex items-center">
              {/* <Link
                    href={siteConfig.links.github}
                    target="_blank"
                    rel="noreferrer"
                    >
                    <div
                    className={cn(
                      buttonVariants({
                        variant: "ghost",
                        }),
                        "w-9 px-0"
                        )}
                        >
                        <GithubIcon className="h-4 w-4" />
                        <span className="sr-only">GitHub</span>
                        </div>
                        </Link> */}
              {/* <CommandMenu /> */}
              {/* {state && (
                    <Button variant="link" size="sm" asChild onClick={handleReset}>
                      <Link href="/antrag/erwerbsfaehig">
                        <RotateCwIcon className="w-4 h-4 mr-2" />
                        Neu starten
                      </Link>
                    </Button>
                  )} */}
              <ModeToggle />
              <HelpPopup />
            </nav>
          </div>
        </div>
      </header>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-background  to-muted"></div>
      <div className="mx-auto max-w-4xl">
        <h1 className="text-2xl font-bold my-12">
          Bürgergeldrechner des Jobcenter Leipzig
        </h1>
        <div className="-m-4 p-4 bg-zinc-100 rounded-xl ring-1 ring-gray-400/30">
          <div className="rounded-lg drop-shadow-xl">
            <Card className="overflow-hidden">
              <div className="bg-muted/50 px-4 py-6">
                <h2 className="font-bold">Berechnet am 06.12.2024</h2>
                <p className="text-sm text-muted-foreground">Version 0.5.0</p>
              </div>
              <ResultSheet state={JSON.parse(result.data)} />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
