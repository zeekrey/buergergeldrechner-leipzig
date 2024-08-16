"use server";

import { cookies } from "next/headers";

export async function createCookie() {
  cookies().set("state", JSON.stringify({ works: false }), { secure: true });
}
