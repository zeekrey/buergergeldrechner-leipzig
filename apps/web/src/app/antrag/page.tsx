"use client";
import { redirect } from "next/navigation";

export default function StepPage() {
  /** Product requirement: coming from the index page should reset existing calculations. */
  localStorage.removeItem("state");

  redirect("/antrag/erwerbsfaehig");
}
