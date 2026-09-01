"use client";

import { calculateAssets } from "calculation";
import { produce } from "immer";
import {
  LandmarkIcon,
  PenIcon,
  PlusCircleIcon,
  WalletIcon,
  XCircleIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Fragment, useCallback, useMemo } from "react";

import { useStateContext } from "@/components/context";
import {
  WizardBackButton,
  WizardNextButton,
} from "@/components/questionnaire/actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  StepContent,
  StepDescription,
  StepNavigation,
  StepRoot,
  StepTitle,
} from "@/components/ui/step-primitives";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableRow,
} from "@/components/ui/table";
import HelpMarkdown from "@/config/steps/vermoegen.mdx";
import { useCompleteContext } from "@/hooks/use-complete-context";
import { stepsConfig } from "@/lib/machine";
import { assetType, type TAsset } from "@/lib/types";

import { AssetDialog } from "./asset-dialog";

const step = stepsConfig[9];

function formatEuro(value: number) {
  return value.toLocaleString("de-DE", {
    currency: "EUR",
    style: "currency",
  });
}

export default function StepAssets() {
  const { push } = useRouter();
  const [state, setState] = useStateContext();
  const completeContext = useCompleteContext(state);

  const hasOwnerOccupiedProperty = state.assets.items.some(
    (item) => item.type === "OwnerOccupiedProperty"
  );
  const hasSelfEmployment = state.community.some((person) =>
    person.income.some((income) => income.type === "SelfEmploymentIncome")
  );

  const calculation = useMemo(
    () => (completeContext ? calculateAssets(completeContext) : undefined),
    [completeContext]
  );

  const handleRemove = useCallback(
    (asset: TAsset) => {
      setState(
        produce(state, (draft) => {
          draft.assets.items = draft.assets.items.filter(
            (item) => item.id !== asset.id
          );
        })
      );
    },
    [setState, state]
  );

  const hasValidSelfEmploymentYears =
    Number.isInteger(state.assets.selfEmploymentYearsWithoutPension) &&
    state.assets.selfEmploymentYearsWithoutPension >= 0;

  function handleSubmit() {
    if (!hasValidSelfEmploymentYears) return;
    const nextStep = step.next(state);
    push(`${stepsConfig[nextStep].id}`);
  }

  const handleBack = useCallback(() => {
    push(`${stepsConfig[step.previous(state)].id}`);
  }, [push]);

  if (!calculation) return null;

  return (
    <StepRoot id={step.id}>
      <StepTitle title={step.title}>
        <HelpMarkdown />
      </StepTitle>
      <StepDescription>{step.description}</StepDescription>
      <StepContent className="flex flex-col gap-6">
        <ScrollArea className="sm:h-[280px] w-full">
          {state.assets.items.length === 0 ? (
            <Empty className="border border-dashed">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <WalletIcon />
                </EmptyMedia>
                <EmptyTitle>Kein Vermögen angegeben</EmptyTitle>
                <EmptyDescription>
                  Hausrat müssen Sie nicht eintragen. Konten, Wertpapiere,
                  Fahrzeuge oder Immobilien können Sie hinzufügen.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <AssetDialog>
                  <Button type="button" variant="secondary">
                    <PlusCircleIcon data-icon="inline-start" />
                    Vermögen hinzufügen
                  </Button>
                </AssetDialog>
              </EmptyContent>
            </Empty>
          ) : (
            <Table>
              <TableBody>
                {state.community
                  .filter((person) =>
                    state.assets.items.some((item) => item.personId === person.id)
                  )
                  .map((person) => (
                    <Fragment key={person.id}>
                      <TableRow>
                        <TableCell
                          className="bg-muted font-semibold"
                          colSpan={3}
                        >
                          {person.name}
                        </TableCell>
                      </TableRow>
                      {state.assets.items
                        .filter((item) => item.personId === person.id)
                        .map((asset) => {
                          const itemResult = calculation.items.find(
                            (entry) => entry.id === asset.id
                          );
                          return (
                            <TableRow key={asset.id}>
                              <TableCell>{assetType[asset.type].label}</TableCell>
                              <TableCell>
                                {formatEuro(asset.amount)}
                                {itemResult && itemResult.exempt > 0 ? (
                                  <span className="text-muted-foreground">
                                    {` (${formatEuro(itemResult.exempt)} frei)`}
                                  </span>
                                ) : null}
                              </TableCell>
                              <TableCell className="flex justify-center">
                                <AssetDialog selectedAsset={asset}>
                                  <Button
                                    aria-label={`${assetType[asset.type].label} bearbeiten`}
                                    type="button"
                                    variant="ghost"
                                  >
                                    <PenIcon />
                                  </Button>
                                </AssetDialog>
                                <Button
                                  aria-label={`${assetType[asset.type].label} entfernen`}
                                  onClick={() => handleRemove(asset)}
                                  type="button"
                                  variant="ghost"
                                >
                                  <XCircleIcon />
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </Fragment>
                  ))}
                <TableRow>
                  <TableCell className="text-center" colSpan={3}>
                    <AssetDialog>
                      <Button type="button" variant="secondary">
                        <PlusCircleIcon data-icon="inline-start" />
                        Vermögen hinzufügen
                      </Button>
                    </AssetDialog>
                  </TableCell>
                </TableRow>
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={2} className="font-bold">
                    Anrechenbares Vermögen
                  </TableCell>
                  <TableCell className="text-right">
                    {formatEuro(calculation.countable)}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          )}
        </ScrollArea>

        {hasOwnerOccupiedProperty ? (
          <Field orientation="horizontal">
            <Switch
              checked={state.assets.hasReceivedBenefitsForOneYear}
              id="karenzzeit"
              onCheckedChange={(checked) =>
                setState(
                  produce(state, (draft) => {
                    draft.assets.hasReceivedBenefitsForOneYear = checked;
                  })
                )
              }
            />
            <FieldLabel htmlFor="karenzzeit">
              Ich beziehe seit mindestens einem Jahr Grundsicherung
            </FieldLabel>
          </Field>
        ) : null}

        {hasSelfEmployment ||
        state.assets.selfEmploymentYearsWithoutPension > 0 ? (
          <Field>
            <FieldLabel htmlFor="self-employment-years">
              Jahre Selbstständigkeit ohne Rentenversicherung
            </FieldLabel>
            <InputGroup>
              <InputGroupInput
                aria-invalid={!hasValidSelfEmploymentYears || undefined}
                id="self-employment-years"
                min={0}
                onChange={(event) =>
                  setState(
                    produce(state, (draft) => {
                      draft.assets.selfEmploymentYearsWithoutPension =
                        Number(event.target.value) || 0;
                    })
                  )
                }
                step={1}
                type="number"
                value={state.assets.selfEmploymentYearsWithoutPension || ""}
              />
              <InputGroupAddon align="inline-end">
                <InputGroupText>Jahre</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
            <FieldDescription>
              Geben Sie nur vollständige angefangene Jahre an. Das Jobcenter
              prüft, ob und für welche bestimmten Altersvorsorgewerte je Jahr
              bis zu 9.000 Euro unberücksichtigt bleiben.
            </FieldDescription>
            {!hasValidSelfEmploymentYears ? (
              <FieldError>
                Bitte geben Sie eine nichtnegative ganze Zahl an.
              </FieldError>
            ) : null}
          </Field>
        ) : null}

        <Alert>
          <LandmarkIcon />
          <AlertTitle>
            {calculation.requiresManualReview
              ? "Manuelle Vermögensprüfung erforderlich"
              : "Freibetrag der Bedarfsgemeinschaft"}
          </AlertTitle>
          <AlertDescription>
            {formatEuro(calculation.allowance)} bleiben als allgemeiner
            Freibetrag frei. {" "}
            {calculation.requiresManualReview
              ? "Ihre Angaben enthalten Vermögen, das nur das Jobcenter anhand der Nachweise und persönlichen Umstände abschließend bewerten kann."
              : "Ihr angegebenes Vermögen liegt innerhalb der Freibeträge."}
          </AlertDescription>
        </Alert>
      </StepContent>
      <StepNavigation>
        <WizardBackButton onClick={handleBack}>Zurück</WizardBackButton>
        <WizardNextButton
          disabled={!hasValidSelfEmploymentYears}
          onClick={handleSubmit}
          type="button"
        >
          Weiter
        </WizardNextButton>
      </StepNavigation>
    </StepRoot>
  );
}
