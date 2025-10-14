"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ExternalLinkIcon, PrinterIcon } from "lucide-react";
import { useMemo } from "react";
import { useStateContext } from "@/components/context";
import { TIncome } from "@/lib/types";

type DocRow = {
  name: string;
  description?: string;
  when?: string;
};

export function RequiredDocuments() {
  const onPrint = () => {
    if (typeof window !== "undefined") window.print();
  };

  const [state] = useStateContext();

  const adults = useMemo(
    () => state.community.filter((p) => p.type === "adult"),
    [state]
  );
  const children = useMemo(
    () => state.community.filter((p) => p.type === "child"),
    [state]
  );
  const isSingle = adults.length === 1;
  const hasPartner = adults.length >= 2;
  const hasChildren = children.length > 0;
  const anyChildOver14 = children.some((c) => (c as any).age > 14);
  const anyPregnant = state.community.some((p) => p.attributes?.isPregnant);
  const hasHousingCosts = (state.spendings?.sum ?? 0) > 0;

  const incomeTypesPresent = useMemo(() => {
    const all: TIncome[] = state.community.flatMap((p) => p.income || []);
    const types = new Set(all.map((i) => i.type));
    return types;
  }, [state]);

  const generalDocs: DocRow[] = [
    {
      name: "Ausweisdokument",
      description: "Identitätsnachweis (Personalausweis oder Reisepass)",
      when: "immer",
    },
    {
      name: "Kontoauszüge",
      description:
        "Alle Konten der Bedarfsgemeinschaft: letzte 3 Monate, jeweils als ein Dokument (keine Einzelfotos/Screenshots)",
      when: "immer",
    },
  ];

  const basedOnInputs: DocRow[] = [];

  // Partnerschaft
  if (isSingle) {
    basedOnInputs.push(
      {
        name: "Scheidungsurteil",
        description: "falls vorhanden",
        when: "Alleinstehend",
      },
      {
        name: "Erklärung getrenntlebend",
        description: "falls zutreffend",
        when: "Alleinstehend",
      },
      {
        name: "Vaterschaftsanerkennung(en)",
        description: "falls zutreffend",
        when: "Alleinstehend",
      },
      {
        name: "Unterhaltstitel",
        description:
          "Urkunden, Urteile, schriftliche Vereinbarungen (falls vorhanden)",
        when: "Alleinstehend",
      }
    );
  }
  if (hasPartner) {
    basedOnInputs.push({
      name: "Eheurkunde",
      description: "falls verheiratet",
      when: "Partner",
    });
  }

  // Kinder
  if (hasChildren) {
    basedOnInputs.push({
      name: "Geburtsurkunde(n)",
      description: "der Kinder",
      when: "Kinder im Haushalt",
    });
    if (anyChildOver14) {
      basedOnInputs.push({
        name: "Schulbescheinigung",
        description: "> 14 Jahre",
        when: "Kinder > 14 Jahre",
      });
    }
  }

  // Schwangerschaft
  if (anyPregnant) {
    basedOnInputs.push({
      name: "Mutterpass",
      description: "mit voraussichtlichem Entbindungstermin",
      when: "Mehrbedarf Schwangerschaft",
    });
  }

  // Einkommen nach Typen
  if (incomeTypesPresent.has("EmploymentIncome")) {
    basedOnInputs.push(
      {
        name: "Arbeits-/Ausbildungsvertrag",
        description: "Kopie ausreichend",
        when: "Erwerbstätigkeit",
      },
      {
        name: "Entgeltbescheinigungen",
        description: "Der letzten 6 Monate",
        when: "Erwerbstätigkeit",
      },
      {
        name: "Nachweis Kfz-Versicherung",
        description: "Aktueller Beitragsbescheid, falls relevant",
        when: "Erwerbstätigkeit",
      },
      {
        name: "Nachweis doppelte Haushaltsführung",
        description: "Zum Beispiel Mietvertrag am Arbeitsort, Falls relevant",
        when: "Erwerbstätigkeit",
      },
      {
        name: "Nachweis Fahrkosten",
        description: "Für den Arbeitsweg, Falls relevant",
        when: "Erwerbstätigkeit",
      },
      {
        name: "Bescheide Fahr-/Trennungskostenbeihilfe",
        description: "Bewilligung oder Ablehnung",
        when: "Erwerbstätigkeit",
      },
      {
        name: "Nachweis Beendigung Arbeitsverhältnis",
        description: "falls aktuell",
        when: "Erwerbstätigkeit",
      }
    );
  }

  if (incomeTypesPresent.has("SelfEmploymentIncome")) {
    basedOnInputs.push({
      name: "Anlage EKS",
      description: "Einnahmen-/Ausgaben-Übersicht für Selbständige",
      when: "Selbstständigkeit",
    });
  }

  if (incomeTypesPresent.has("ChildAllowance")) {
    basedOnInputs.push({
      name: "Kindergeldbescheid",
      description: "Oder Bescheid zur Abzweigung",
      when: "Kindergeld",
    });
  }

  if (incomeTypesPresent.has("AdvanceMaintenancePayment")) {
    basedOnInputs.push({
      name: "Bescheid Unterhaltsvorschuss",
      when: "Unterhaltsvorschuss",
    });
  }

  if (incomeTypesPresent.has("Maintenance")) {
    basedOnInputs.push({
      name: "Nachweis Unterhaltszahlungen",
      description: "z. B. Kontoauszug/Überweisung",
      when: "Unterhalt",
    });
  }

  if (incomeTypesPresent.has("UnemploymentBenefits")) {
    basedOnInputs.push({
      name: "Bescheid Arbeitslosengeld",
      description: "Bewilligung oder Ablehnung",
      when: "Arbeitslosengeld",
    });
  }

  if (incomeTypesPresent.has("SicknessBenefits")) {
    basedOnInputs.push({
      name: "Bescheid Krankengeld/Übergangsgeld",
      when: "Krankengeld",
    });
  }

  const possibleFurtherDocs: DocRow[] = [
    // Wohnen/Kosten der Unterkunft – generisch
    ...(hasHousingCosts
      ? [
          {
            name: "Mietvertrag (vollständig)",
            description: "Als ein zusammenhängendes Dokument",
          },
          {
            name: "Nachweis aktuelle Miethöhe",
            description: "Zum Beispiel letzte Mietanpassung",
          },
        ]
      : []),
    {
      name: "Bei Barzahlung Miete",
      description: "Zahlungsnachweise der letzten 3 Monate",
    },
    {
      name: "Gebührenbescheid Gemeinschaftsunterkunft",
      description: "falls zutreffend",
    },
    {
      name: "Nebenkostenabrechnung",
      description: "Aktuell; sofern Wohnung > 1 Jahr bewohnt",
    },
    {
      name: "Heizkostenabrechnung",
      description: "Aktuell; sofern Wohnung > 1 Jahr bewohnt",
    },
    { name: "Untermietvertrag (WG)", description: "falls Untermiete" },
    {
      name: "Aufteilung der Miete (WG)",
      description:
        "qm/Kaltmiete/Betriebs- und Heizkosten bei gemeinsamem Vertrag, wird durch Jobcenter bereitgestellt",
    },
    {
      name: "Zustimmung Umzug (anderes Jobcenter)",
      description: "falls Kaution/Genossenschaftsanteile beantragt",
    },
    // Aufenthalt/EU/Asyl
    {
      name: "EU: Erklärung EU-Bürger/in",
      description: "wird durch Jobcenter bereitgestellt",
    },
    {
      name: "EU: Bestätigung Agentur für Arbeit",
      description: "Zur unfreiwilligen Arbeitslosigkeit",
    },
    { name: "Geflüchtete: BAMF-Bescheid" },
    { name: "Geflüchtete: elektronischer Aufenthaltstitel" },
    { name: "Geflüchtete: Fiktionsbescheinigung(en)" },
    { name: "Geflüchtete: Aufhebungsbescheid Asylbewerberleistungen" },
    // Sonstiges
    { name: "Betreuerausweis/Vollmacht", description: "falls Vertretung" },
    {
      name: "Bescheid Teilhabe am Arbeitsleben",
      description: "falls vorhanden",
    },
    { name: "Schwerbehindertenausweis", description: "falls vorhanden" },
  ];

  return (
    <div className="space-y-4">
      <Card className="print:shadow-none print:border-none">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Benötigte Unterlagen</CardTitle>
          <CardDescription>
            Hier finden Sie eine Übersicht, welche individuellen Dokumente für
            Ihren Antrag erforderlich sind.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table className="print:text-[13px] text-xs">
            <TableHeader>
              <TableRow>
                <TableHead
                  className="w-[40px]"
                  aria-label="Dokument erledigt"
                />
                <TableHead>Dokument</TableHead>
                <TableHead>Beschreibung</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Section 1 */}
              <TableRow>
                <TableCell colSpan={3} className="bg-muted/50 font-semibold">
                  Generell notwendige Dokumente
                </TableCell>
              </TableRow>
              {generalDocs.map((d, i) => (
                <TableRow key={`g-${i}`}>
                  <TableCell className="align-top">
                    <Checkbox aria-label={`Dokument erledigt: ${d.name}`} />
                  </TableCell>
                  <TableCell className="font-medium">{d.name}</TableCell>
                  <TableCell>{d.description ?? "—"}</TableCell>
                </TableRow>
              ))}

              {/* Section 2 */}
              <TableRow>
                <TableCell colSpan={3} className="bg-muted/50 font-semibold">
                  Dokumente auf Basis Ihrer Eingaben
                </TableCell>
              </TableRow>
              {basedOnInputs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-muted-foreground">
                    Keine zusätzlichen Unterlagen auf Basis Ihrer Angaben
                    erforderlich.
                  </TableCell>
                </TableRow>
              ) : (
                basedOnInputs.map((d, i) => (
                  <TableRow key={`b-${i}`}>
                    <TableCell className="align-top">
                      <Checkbox aria-label={`Dokument erledigt: ${d.name}`} />
                    </TableCell>
                    <TableCell className="font-medium">{d.name}</TableCell>
                    <TableCell>{d.description ?? "—"}</TableCell>
                  </TableRow>
                ))
              )}

              {/* Section 3 */}
              <TableRow>
                <TableCell colSpan={3} className="bg-muted/50 font-semibold">
                  Mögliche weitere Dokumente
                </TableCell>
              </TableRow>
              {possibleFurtherDocs.map((d, i) => (
                <TableRow key={`p-${i}`}>
                  <TableCell className="align-top">
                    <Checkbox aria-label={`Dokument erledigt: ${d.name}`} />
                  </TableCell>
                  <TableCell className="font-medium">{d.name}</TableCell>
                  <TableCell>{d.description ?? "—"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <p className="mt-3 text-xs text-muted-foreground">
            Tipp: Fassen Sie mehrseitige Dokumente zu einer PDF zusammen.
            Vermeiden Sie Fotos einzelner Seiten.
          </p>
        </CardContent>
      </Card>

      <div className="flex print:hidden gap-4">
        <Button asChild className="flex-1 sm:w-auto">
          <a href="https://jobcenter.digital">
            <ExternalLinkIcon className="w-4 h-4 mr-2" />
            Jetzt beantragen
          </a>
        </Button>

        <Button
          variant="secondary"
          className="sm:w-auto flex-1"
          onClick={onPrint}
        >
          <PrinterIcon className="w-4 h-4 mr-2" /> Drucken
        </Button>
      </div>
    </div>
  );
}
