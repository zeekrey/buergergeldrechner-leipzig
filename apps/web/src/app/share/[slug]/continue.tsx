"use client";

import { Button } from "@/components/ui/button";
import { TStepContext } from "@/lib/types";
import { useRouter } from "next/navigation";

export function ContinueButton({ state }: { state: TStepContext }) {
  const router = useRouter();
  function handleContinue() {
    localStorage.setItem("state", JSON.stringify(state));
    router.push("/antrag/erwerbsfaehig");
  }

  return (
    <Button variant="secondary" onClick={handleContinue}>
      Weiter bearbeiten
    </Button>
  );
}
