"use client";

import { useMemo, useTransition } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { StepContent, StepNavigation } from "@/components/ui/step-primitives";
import {
  ArrowLeftCircleIcon,
  ClipboardCheckIcon,
  ExternalLinkIcon,
  FileQuestionIcon,
  FileTextIcon,
  RotateCwIcon,
  ShareIcon,
} from "lucide-react";
import { StepRoot, StepTitle } from "@/components/ui/step-primitives";
import { initialStepsState, stepsConfig } from "@/lib/machine";
import { useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { calculateOverall } from "@/lib/calculation";
import { useRouter } from "next/navigation";
import { useStateContext } from "@/components/context";
import { Result } from "./result";
import { Button } from "@/components/ui/button";
import HelpMarkdown from "@/config/steps/ergebnis.mdx";
import Link from "next/link";
import { createShareable } from "./actions";
import { toast } from "sonner";
import { ResultSheet } from "./result-sheet";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

const step = stepsConfig[9];

export default function StepSummary() {
  const { push } = useRouter();
  const [state, setState] = useStateContext();
  const [isPending, startTransition] = useTransition();

  const { allowance, income, overall } = useMemo(
    () => calculateOverall(state),
    [state]
  );

  const allowanceSum = useMemo(
    () => allowance.reduce((acc, curr) => acc + (curr.amount ?? 0), 0),
    [allowance]
  );

  const handleBack = useCallback(() => {
    push(`${stepsConfig[step.previous].id}`);
  }, [state]);

  const handleReset = useCallback(() => {
    setState(initialStepsState.context);
    localStorage.removeItem("state");
  }, []);

  const onCreateShareableClick = () => {
    startTransition(async () => {
      const result = await createShareable(JSON.stringify(state));
      if (result.success) {
        const data = JSON.parse(result.data);
        const { origin } = new URL(window?.location.href);

        try {
          await navigator.share({
            title: "Ich habe einen möglichen Bürgergeldanspruch berechnet:",
            url: `${origin}/share/${data.alias}`,
          });
        } catch (err) {
          toast("Teilbarer Link wurde erstellt.", {
            description:
              "Auf Kopieren klicken um den Link in die Zwischenablage zu kopieren.",
            action: {
              label: "Kopieren",
              onClick: async () =>
                await navigator.clipboard.writeText(
                  `${origin}/share/${data.alias}`
                ),
            },
          });
        }
      } else console.warn(result.error);
    });
  };

  return (
    <StepRoot id={step.id}>
      <StepTitle title={step.title}>
        <HelpMarkdown />
      </StepTitle>
      <StepContent>
        <Tabs defaultValue="result">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="result">Ergebnis</TabsTrigger>
            {/* <TabsTrigger value="documents">Dokumente</TabsTrigger> */}
            <TabsTrigger value="calculation">Berechnung</TabsTrigger>
          </TabsList>
          <TabsContent value="result">
            <Result
              communitySize={state.community.length}
              income={income.sum}
              spendings={state.spendings.sum}
              allowance={allowanceSum}
              overall={overall}
            />
          </TabsContent>
          <TabsContent value="calculation" data-testid="result-calculation">
            <div className="pb-8">
              <ScrollArea className="sm:h-[380px]">
                <Card className="overflow-hidden">
                  <CardHeader className="flex flex-row items-start bg-muted/50">
                    <div className="grid gap-0.5">
                      <CardTitle className="group flex items-center gap-2 text-lg">
                        Berechnungsergebnis
                      </CardTitle>
                      <CardDescription>
                        Erstellungsdatum:{" "}
                        {new Intl.DateTimeFormat("de-DE").format(Date.now())}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 text-sm">
                    <ResultSheet state={state} />
                  </CardContent>
                  <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                    <div className="text-xs text-muted-foreground">
                      Es handelt sich um eine Beispielrechnung.
                    </div>
                  </CardFooter>
                </Card>
              </ScrollArea>
            </div>
          </TabsContent>
        </Tabs>
        <div className="mt-4 grid md:grid-cols-3 gap-4">
          <Button asChild>
            <a href="https://jobcenter.digital" className="">
              <ExternalLinkIcon className="w-4 h-4 mr-2" />
              Jetzt beantragen
            </a>
          </Button>
          <Drawer>
            <DrawerTrigger>
              <Button variant="secondary">
                <ClipboardCheckIcon className="w-4 h-4 mr-2" />
                Benötigte Dokumente
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full max-w-3xl">
                <DrawerHeader>
                  <DrawerTitle>
                    Benötigte Dokumente und Informationen
                  </DrawerTitle>
                  <DrawerDescription>
                    Auf Basis Ihrer Eingaben werden folgende Dokumente für die
                    Beantragung des Bürgergelds benötigt.
                  </DrawerDescription>
                </DrawerHeader>
                <div className="p-4 pb-0">
                  <Alert variant="warning">
                    Reichen Sie bitte grundsätzlich keine Originalbelege,
                    sondern Kopien ein.
                  </Alert>
                  <h3 className="font-bold py-3">Auszufüllende Anträge</h3>
                  <ul className="list-disc list-inside">
                    <li>
                      <Badge className="mr-1">HA</Badge>
                      Hauptantrag
                    </li>
                    <li>
                      <Badge className="mr-1">KI</Badge>
                      Anlage für ein Kind unter 15 Jahren
                    </li>
                    <li>
                      <Badge className="mr-1">EK</Badge>
                      Anlage zur Feststellung der Einkommenverähltnisse...{" "}
                    </li>
                    <li>
                      <Badge className="mr-1">KDU</Badge>
                      Anlage zur Feststellung der Kosten der Untrkunft und
                      Heizung
                    </li>
                  </ul>
                  <h3 className="font-bold py-3">Benötigte Dokumente</h3>
                  <div className="space-y-2 divide-y">
                    <div className="grid grid-cols-3 font-bold">
                      <div>Typ</div>
                      <div>Grund</div>
                      <div>Art</div>
                    </div>
                    <div className="grid grid-cols-3">
                      <div>
                        <FileQuestionIcon className="w-4 h-4" />
                      </div>
                      <div>Allgemein</div>
                      <div>Rentenversicherungsnummer</div>
                    </div>
                    <div className="grid grid-cols-3">
                      <div>
                        <FileTextIcon className="w-4 h-4" />
                      </div>
                      <div>Schwangerschaft</div>
                      <div>
                        Nachweis über voraussichtlichen Entbindungstermin
                      </div>
                    </div>
                    <div className="grid grid-cols-3">
                      <div>
                        <FileTextIcon className="w-4 h-4" />
                      </div>
                      <div>Einkommen</div>
                      <div>Kontoauszüge der letzten 3 Monate</div>
                    </div>
                  </div>
                </div>
                <DrawerFooter>
                  <Button>Ausdrucken</Button>
                  <DrawerClose>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>

          <Button
            onClick={onCreateShareableClick}
            disabled={isPending}
            variant="secondary"
            className="w-full"
          >
            <ShareIcon className="w-4 h-4" /> Teilen
          </Button>
        </div>
      </StepContent>
      <StepNavigation>
        <Button
          onClick={handleBack}
          size="lg"
          type="button"
          variant="secondary"
        >
          <ArrowLeftCircleIcon className="w-4 h-4 mr-3" />
          Zurück
        </Button>
        <Button variant="secondary" size="lg" asChild onClick={handleReset}>
          <Link href="/antrag/erwerbsfaehig">
            <RotateCwIcon className="w-4 h-4 mr-2" />
            Neu starten
          </Link>
        </Button>
      </StepNavigation>
    </StepRoot>
  );
}
