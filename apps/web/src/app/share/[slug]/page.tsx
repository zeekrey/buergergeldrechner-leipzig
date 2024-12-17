import { TStepContext } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { neon } from "@neondatabase/serverless";
import { HelpPopup } from "@/components/help-popup";
import { ModeToggle } from "@/components/mode-toggle";
import { ResultSheet } from "@/app/antrag/ergebnis/page";
import { ThemeProvider } from "@/components/theme-provider";

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

    return { success: true, data: JSON.stringify(response[0]) };
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
  const data = JSON.parse(result.data) as {
    id: number;
    alias: string;
    state: TStepContext;
    visit_count: number;
    version: string;
    created_at: string;
  };

  const _data = [
    [
      [1, 2],
      [1, 2],
    ],
  ];

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      disableTransitionOnChange
      enableSystem
    >
      <div className="mb-12">
        <header className="w-full">
          <div className="container flex h-14 max-w-screen-2xl items-center">
            <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
              <div className="w-full flex-1 md:w-auto md:flex-none"></div>
              <nav className="flex items-center">
                <ModeToggle />
                <HelpPopup />
              </nav>
            </div>
          </div>
        </header>
        {/* <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-background  to-muted"></div> */}
        <div className="container sm:max-w-2xl lg:max-w-4xl">
          <h1 className="text-2xl font-bold my-12">
            Bürgergeldrechner des Jobcenter Leipzig
          </h1>
          <div className="sm:-m-4 sm:p-4 bg-zinc-100 dark:bg-zinc-800 sm:rounded-xl sm:ring-1 ring-gray-400/30">
            <div className="sm:rounded-lg sm:drop-shadow-xl">
              <Card className="overflow-hidden">
                <div className="bg-muted/50 px-4 py-6">
                  <h2 className="font-bold">
                    Berechnet am{" "}
                    {new Date(data.created_at).toLocaleString("de-DE")}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Version {data.version}
                  </p>
                </div>
                <ResultSheet state={data.state} />
              </Card>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
