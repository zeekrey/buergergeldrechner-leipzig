"use server";

import { TStepContext } from "@/lib/types";
import { neon } from "@neondatabase/serverless";
import slug from "unique-slug";

/**
 * Table was created with:
 * CREATE TABLE links (
 *  id SERIAL PRIMARY KEY,
 *  alias VARCHAR(8) NOT NULL UNIQUE,
 *  state JSONB NOT NULL,
 *  visit_count INT DEFAULT 0
 * );
 */

/**
 * Takes a data string (created with btoa) and creates a linked slug.
 */
export async function createShareable(
  data: string
): Promise<
  { success: false; error: string } | { success: true; data: string }
> {
  "use server";

  if (
    typeof process.env.DATABASE_URL === "undefined" ||
    typeof data === "undefined"
  ) {
    console.error("Provide env vars for neon or an function argument.");
    return { success: false, error: "Check server logs!" };
  }

  try {
    const sql = neon(process.env.DATABASE_URL);
    const response = await sql`INSERT INTO links (alias, state, visit_count) 
      VALUES (${slug()}, ${JSON.parse(data)}, 1)
      RETURNING *;`;

    // TODO: handle not unique error (code: 23505)
    return {
      success: true,
      data: JSON.stringify(response[0]),
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: JSON.stringify(error),
    };
  }
}
