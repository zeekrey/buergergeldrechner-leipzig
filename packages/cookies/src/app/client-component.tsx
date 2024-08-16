"use client";
import { createCookie } from "./actions";

export const ClientComponent = () => {
  return (
    <button onClick={async () => await createCookie()}>Create Cookie!</button>
  );
};
