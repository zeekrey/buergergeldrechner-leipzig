import { ImageResponse } from "next/og";
import { neon } from "@neondatabase/serverless";
import { TStepContext } from "@/lib/types";

export const runtime = "edge";

// Image metadata
export const alt = "Bürgergeldrechner Jobcenter Leipzig";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

async function loadGoogleFont(font: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(
    text
  )}`;
  const css = await (await fetch(url)).text();
  const resource = css.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/
  );

  if (resource) {
    const response = await fetch(resource[1]);
    if (response.status == 200) {
      return await response.arrayBuffer();
    }
  }

  throw new Error("failed to load font data");
}

// Image generation
export default async function Image({ params }: { params: { slug: string } }) {
  if (
    typeof process.env.DATABASE_URL === "undefined" ||
    typeof params.slug === "undefined"
  ) {
    console.error("Provide env vars for neon or an function argument.");
    return { success: false, error: "Check server logs!" };
  }

  // Font
  const interSemiBold = fetch(
    new URL("./Inter-SemiBold.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  try {
    const sql = neon(process.env.DATABASE_URL);
    const response =
      await sql`SELECT * FROM links WHERE alias = ${params.slug}`;
    const data = response[0].state as TStepContext;

    return new ImageResponse(
      (
        // ImageResponse JSX element
        <div
          style={{
            fontSize: 128,
            background: "white",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {data.community.at(0)?.name}
        </div>
      ),
      // ImageResponse options
      {
        // For convenience, we can re-use the exported opengraph-image
        // size config to also set the ImageResponse's width and height.
        ...size,
        fonts: [
          {
            name: "Inter",
            data: await loadGoogleFont(
              "Inter",
              data.community.at(0)?.name ?? "Some text"
            ),
            style: "normal",
            weight: 400,
          },
        ],
      }
    );
  } catch (error) {
    console.error(JSON.stringify(error));
  }
}
