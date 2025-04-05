"use client";

import { useState } from "react";
import { CalculatorIcon } from "lucide-react";
import { RentCalculation } from "./rent-calculation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function StepDiseases() {
  const [result, setResult] = useState<
    { title: string; description: string } | undefined
  >(undefined);

  return (
    <div className="p-4 md:max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Bedarfsprüfung für Wohnkosten</CardTitle>
          <CardDescription>
            Hier können Sie die Höhe der angemessenen Kosten für Unterkunft und
            Heizung (KdU) prüfen.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RentCalculation onResult={setResult} />
        </CardContent>
        <CardFooter>
          {result && (
            <Alert>
              <CalculatorIcon className="h-4 w-4" />
              <AlertTitle>{result.title}</AlertTitle>
              <AlertDescription>{result.description}</AlertDescription>
            </Alert>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
