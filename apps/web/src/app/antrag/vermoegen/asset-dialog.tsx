"use client";

import { produce } from "immer";
import { type FormEvent, useEffect, useMemo, useState } from "react";

import { useStateContext } from "@/components/context";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  assetType,
  ExtendedAssetSchema,
  type TAsset,
  type TAssetType,
} from "@/lib/types";
import { generateId } from "@/lib/utils";

const assetTypeList = Object.entries(assetType) as [
  TAssetType,
  { label: string },
][];

function toNumber(value: string): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function AssetDialog({
  children,
  selectedAsset,
}: {
  children: React.ReactNode;
  selectedAsset?: TAsset;
}) {
  const [open, setOpen] = useState(false);
  const [state, setState] = useStateContext();
  const [personId, setPersonId] = useState(
    selectedAsset?.personId ?? state.community.at(0)?.id ?? ""
  );
  const [type, setType] = useState<TAssetType>(
    selectedAsset?.type ?? "BankAccount"
  );
  const [amount, setAmount] = useState(String(selectedAsset?.amount ?? ""));
  const [remainingLoan, setRemainingLoan] = useState(
    selectedAsset?.type === "Vehicle"
      ? String(selectedAsset.remainingLoan)
      : ""
  );
  const [livingSpace, setLivingSpace] = useState(
    selectedAsset?.type === "OwnerOccupiedProperty"
      ? String(selectedAsset.livingSpace)
      : ""
  );
  const [propertyKind, setPropertyKind] = useState<"house" | "condo">(
    selectedAsset?.type === "OwnerOccupiedProperty"
      ? selectedAsset.propertyKind
      : "condo"
  );
  const [submitted, setSubmitted] = useState(false);
  const [mortgages, setMortgages] = useState(
    selectedAsset?.type === "OwnerOccupiedProperty" ||
      selectedAsset?.type === "OtherProperty"
      ? String(selectedAsset.mortgages)
      : ""
  );

  useEffect(() => {
    if (!open) return;
    setSubmitted(false);
    setPersonId(selectedAsset?.personId ?? state.community.at(0)?.id ?? "");
    setType(selectedAsset?.type ?? "BankAccount");
    setAmount(String(selectedAsset?.amount ?? ""));
    setRemainingLoan(
      selectedAsset?.type === "Vehicle" ? String(selectedAsset.remainingLoan) : ""
    );
    setLivingSpace(
      selectedAsset?.type === "OwnerOccupiedProperty"
        ? String(selectedAsset.livingSpace)
        : ""
    );
    setPropertyKind(
      selectedAsset?.type === "OwnerOccupiedProperty"
        ? selectedAsset.propertyKind
        : "condo"
    );
    setMortgages(
      selectedAsset?.type === "OwnerOccupiedProperty" ||
        selectedAsset?.type === "OtherProperty"
        ? String(selectedAsset.mortgages)
        : ""
    );
  }, [open, selectedAsset, state.community]);

  const selectedPerson = useMemo(
    () => state.community.find((person) => person.id === personId),
    [personId, state.community]
  );

  const amountValid = Number.isFinite(Number(amount)) && Number(amount) > 0;
  const remainingLoanValid =
    Number.isFinite(Number(remainingLoan)) && toNumber(remainingLoan) >= 0;
  const livingSpaceValid =
    Number.isFinite(Number(livingSpace)) && toNumber(livingSpace) > 0;
  const mortgagesValid =
    Number.isFinite(Number(mortgages)) && toNumber(mortgages) >= 0;

  function buildAsset(): unknown {
    if (!selectedPerson) return undefined;
    const base = {
      id: selectedAsset?.id ?? generateId(),
      personId: selectedPerson.id,
      type,
      amount: toNumber(amount),
    };

    switch (type) {
      case "Vehicle":
        return { ...base, remainingLoan: toNumber(remainingLoan) };
      case "OwnerOccupiedProperty":
        return {
          ...base,
          livingSpace: toNumber(livingSpace),
          propertyKind,
          mortgages: toNumber(mortgages),
        };
      case "OtherProperty":
        return { ...base, mortgages: toNumber(mortgages) };
      default:
        return base;
    }
  }

  const parsedAsset = ExtendedAssetSchema.safeParse(buildAsset());

  function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    if (!parsedAsset.success) return;
    const asset: TAsset = parsedAsset.data;

    setState(
      produce(state, (draft) => {
        const index = draft.assets.items.findIndex((item) => item.id === asset.id);
        if (index === -1) {
          draft.assets.items.push(asset);
        } else {
          draft.assets.items[index] = asset;
        }
      })
    );
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Vermögen erfassen</DialogTitle>
          <DialogDescription>
            Geben Sie den aktuellen Verkehrswert an. Schulden werden nur bei
            Fahrzeugen und Immobilien abgezogen.
          </DialogDescription>
        </DialogHeader>
        <form noValidate onSubmit={handleSave}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="asset-person">Person</FieldLabel>
            <Select
              disabled={Boolean(selectedAsset)}
              onValueChange={setPersonId}
              value={personId}
            >
              <SelectTrigger className="w-full" id="asset-person">
                <SelectValue placeholder="Person auswählen" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {state.community.map((person) => (
                    <SelectItem key={person.id} value={person.id}>
                      {person.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
          <Field>
            <FieldLabel htmlFor="asset-type">Art des Vermögens</FieldLabel>
            <Select
              onValueChange={(value) => setType(value as TAssetType)}
              value={type}
            >
              <SelectTrigger className="w-full" id="asset-type">
                <SelectValue placeholder="Art auswählen" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {assetTypeList.map(([id, meta]) => (
                    <SelectItem key={id} value={id}>
                      {meta.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
          <Field data-invalid={(submitted && !amountValid) || undefined}>
            <FieldLabel htmlFor="asset-amount">Verkehrswert</FieldLabel>
            <InputGroup>
              <InputGroupInput
                aria-invalid={(submitted && !amountValid) || undefined}
                id="asset-amount"
                inputMode="decimal"
                min={0}
                onChange={(event) => setAmount(event.target.value)}
                placeholder="0"
                type="number"
                value={amount}
              />
              <InputGroupAddon align="inline-end">
                <InputGroupText>€</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
            <FieldDescription>
              Der Betrag, den Sie bei einem Verkauf voraussichtlich erzielen
              würden.
            </FieldDescription>
            {submitted && !amountValid ? (
              <FieldError>Bitte geben Sie einen positiven Verkehrswert an.</FieldError>
            ) : null}
          </Field>
          {type === "Vehicle" ? (
            <Field data-invalid={(submitted && !remainingLoanValid) || undefined}>
              <FieldLabel htmlFor="asset-loan">Offener Autokredit</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  aria-invalid={(submitted && !remainingLoanValid) || undefined}
                  id="asset-loan"
                  inputMode="decimal"
                  min={0}
                  onChange={(event) => setRemainingLoan(event.target.value)}
                  placeholder="0"
                  type="number"
                  value={remainingLoan}
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupText>€</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              {submitted && !remainingLoanValid ? (
                <FieldError>Der offene Kredit darf nicht negativ sein.</FieldError>
              ) : null}
            </Field>
          ) : null}
          {type === "OwnerOccupiedProperty" ? (
            <>
              <Field>
                <FieldLabel id="property-kind-label">Art der Immobilie</FieldLabel>
                <ToggleGroup
                  aria-labelledby="property-kind-label"
                  onValueChange={(value) => {
                    if (value === "house" || value === "condo") {
                      setPropertyKind(value);
                    }
                  }}
                  spacing={0}
                  type="single"
                  value={propertyKind}
                  variant="outline"
                >
                  <ToggleGroupItem value="condo">Wohnung</ToggleGroupItem>
                  <ToggleGroupItem value="house">Haus</ToggleGroupItem>
                </ToggleGroup>
              </Field>
              <Field data-invalid={(submitted && !livingSpaceValid) || undefined}>
                <FieldLabel htmlFor="asset-space">Wohnfläche</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    aria-invalid={(submitted && !livingSpaceValid) || undefined}
                    id="asset-space"
                    inputMode="decimal"
                    min={0}
                    onChange={(event) => setLivingSpace(event.target.value)}
                    placeholder="0"
                    type="number"
                    value={livingSpace}
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupText>m²</InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
                <FieldDescription>
                  Die angemessene Wohnfläche richtet sich nach der Zahl der
                  Personen in Ihrem Haushalt.
                </FieldDescription>
                {submitted && !livingSpaceValid ? (
                  <FieldError>Bitte geben Sie eine positive Wohnfläche an.</FieldError>
                ) : null}
              </Field>
              <Field data-invalid={(submitted && !mortgagesValid) || undefined}>
                <FieldLabel htmlFor="asset-mortgage">
                  Grundschuld oder Hypothek
                </FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    aria-invalid={(submitted && !mortgagesValid) || undefined}
                    id="asset-mortgage"
                    inputMode="decimal"
                    min={0}
                    onChange={(event) => setMortgages(event.target.value)}
                    placeholder="0"
                    type="number"
                    value={mortgages}
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupText>€</InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
                {submitted && !mortgagesValid ? (
                  <FieldError>Die Hypothek darf nicht negativ sein.</FieldError>
                ) : null}
              </Field>
            </>
          ) : null}
          {type === "OtherProperty" ? (
            <Field data-invalid={(submitted && !mortgagesValid) || undefined}>
              <FieldLabel htmlFor="asset-other-mortgage">
                Grundschuld oder Hypothek
              </FieldLabel>
              <InputGroup>
                <InputGroupInput
                  aria-invalid={(submitted && !mortgagesValid) || undefined}
                  id="asset-other-mortgage"
                  inputMode="decimal"
                  min={0}
                  onChange={(event) => setMortgages(event.target.value)}
                  placeholder="0"
                  type="number"
                  value={mortgages}
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupText>€</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              {submitted && !mortgagesValid ? (
                <FieldError>Die Hypothek darf nicht negativ sein.</FieldError>
              ) : null}
            </Field>
          ) : null}
        </FieldGroup>
        <div className="flex justify-between pt-2">
          <Button onClick={() => setOpen(false)} type="button" variant="secondary">
            Abbrechen
          </Button>
          <Button disabled={!selectedPerson} type="submit">
            {selectedAsset ? "Speichern" : "Hinzufügen"}
          </Button>
        </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
