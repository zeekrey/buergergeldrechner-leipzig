import { ImageResponse } from "next/og";
import { neon } from "@neondatabase/serverless";
import { TStepContext } from "@/lib/types";
import { calculateOverall } from "calculation";

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

  try {
    const sql = neon(process.env.DATABASE_URL);
    const response =
      await sql`SELECT * FROM links WHERE alias = ${params.slug}`;
    const data = response[0].state as TStepContext;

    const communitySize = data.community.length;
    const spendings = data.spendings.sum;
    const { allowance, overall, income } = calculateOverall(data);

    const allowanceSum = allowance.reduce(
      (acc, curr) => acc + (curr.amount ?? 0),
      0
    );

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#fff",
            justifyContent: "space-between",
            fontSize: 36,
            fontWeight: 300,
            color: "#3F3F46",
            paddingTop: 80,
            paddingLeft: 60,
            paddingRight: 60,
            paddingBottom: 80,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div>Berechneter Bürgergeldanspruch</div>
            <div style={{ fontWeight: 600, fontSize: 98, color: "#18181B" }}>
              {overall.toLocaleString("de-DE", {
                style: "currency",
                currency: "EUR",
              })}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 16,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.3334 28V25.3333C21.3334 23.9188 20.7715 22.5623 19.7713 21.5621C18.7711 20.5619 17.4146 20 16.0001 20H8.00008C6.58559 20 5.22904 20.5619 4.22885 21.5621C3.22865 22.5623 2.66675 23.9188 2.66675 25.3333V28"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12.0001 14.6667C14.9456 14.6667 17.3334 12.2789 17.3334 9.33333C17.3334 6.38781 14.9456 4 12.0001 4C9.05456 4 6.66675 6.38781 6.66675 9.33333C6.66675 12.2789 9.05456 14.6667 12.0001 14.6667Z"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M29.3333 28V25.3333C29.3324 24.1516 28.9391 23.0037 28.2151 22.0698C27.4911 21.1358 26.4774 20.4688 25.3333 20.1733"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M21.3333 4.17334C22.4805 4.46707 23.4973 5.13427 24.2234 6.06975C24.9496 7.00523 25.3437 8.15578 25.3437 9.34001C25.3437 10.5242 24.9496 11.6748 24.2234 12.6103C23.4973 13.5457 22.4805 14.2129 21.3333 14.5067"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                {communitySize} {communitySize > 1 ? "Personen" : "Person"}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.3333 21.3333L25.3333 10.6666L29.3333 21.3333C28.1733 22.2 26.7733 22.6666 25.3333 22.6666C23.8933 22.6666 22.4933 22.2 21.3333 21.3333Z"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M2.66675 21.3333L6.66675 10.6666L10.6667 21.3333C9.50675 22.2 8.10675 22.6666 6.66675 22.6666C5.22675 22.6666 3.82675 22.2 2.66675 21.3333Z"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M9.33325 28H22.6666"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M16 4V28"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M4 9.33329H6.66667C9.33333 9.33329 13.3333 7.99996 16 6.66663C18.6667 7.99996 22.6667 9.33329 25.3333 9.33329H28"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                {allowanceSum.toLocaleString("de-DE", {
                  style: "currency",
                  currency: "EUR",
                })}{" "}
                Freibträge
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.6667 20H17.3333C18.0406 20 18.7189 19.719 19.219 19.2189C19.719 18.7188 20 18.0405 20 17.3333C20 16.626 19.719 15.9478 19.219 15.4477C18.7189 14.9476 18.0406 14.6666 17.3333 14.6666H13.3333C12.5333 14.6666 11.8667 14.9333 11.4667 15.4666L4 22.6666"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M9.33325 28L11.4666 26.1333C11.8666 25.6 12.5333 25.3333 13.3333 25.3333H18.6666C20.1333 25.3333 21.4666 24.8 22.3999 23.7333L28.5333 17.8667C29.0478 17.3804 29.3481 16.7097 29.3681 16.0021C29.3881 15.2945 29.1261 14.6078 28.6399 14.0933C28.1537 13.5788 27.483 13.2785 26.7753 13.2585C26.0677 13.2385 25.3811 13.5004 24.8666 13.9867L19.2666 19.1867"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M2.66675 21.3334L10.6667 29.3334"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M21.3332 15.8666C23.4687 15.8666 25.1999 14.1355 25.1999 12C25.1999 9.86447 23.4687 8.1333 21.3332 8.1333C19.1977 8.1333 17.4666 9.86447 17.4666 12C17.4666 14.1355 19.1977 15.8666 21.3332 15.8666Z"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8 10.6666C10.2091 10.6666 12 8.87577 12 6.66663C12 4.45749 10.2091 2.66663 8 2.66663C5.79086 2.66663 4 4.45749 4 6.66663C4 8.87577 5.79086 10.6666 8 10.6666Z"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                {income.sum.toLocaleString("de-DE", {
                  style: "currency",
                  currency: "EUR",
                })}{" "}
                Einnahmen
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 28V17.3333C20 16.9797 19.8595 16.6406 19.6095 16.3905C19.3594 16.1405 19.0203 16 18.6667 16H13.3333C12.9797 16 12.6406 16.1405 12.3905 16.3905C12.1405 16.6406 12 16.9797 12 17.3333V28"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M4 13.3333C3.99991 12.9454 4.08445 12.5622 4.24772 12.2103C4.41099 11.8584 4.64906 11.5464 4.94533 11.296L14.2787 3.29733C14.76 2.89054 15.3698 2.66736 16 2.66736C16.6302 2.66736 17.24 2.89054 17.7213 3.29733L27.0547 11.296C27.3509 11.5464 27.589 11.8584 27.7523 12.2103C27.9156 12.5622 28.0001 12.9454 28 13.3333V25.3333C28 26.0406 27.719 26.7189 27.219 27.2189C26.7189 27.719 26.0406 28 25.3333 28H6.66667C5.95942 28 5.28115 27.719 4.78105 27.2189C4.28095 26.7189 4 26.0406 4 25.3333V13.3333Z"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                {spendings.toLocaleString("de-DE", {
                  style: "currency",
                  currency: "EUR",
                })}{" "}
                Unterkunft
              </div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div
              style={{
                width: 420,
                height: 80,
                background: "#F97316",
                borderRadius: 16,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                fontSize: 32,
                fontWeight: 600,
              }}
            >
              Jetzt berechnen
            </div>
          </div>
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
