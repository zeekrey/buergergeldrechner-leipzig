import { type TAsset, type TStepContext } from "./types";

/** § 12 Abs. 2 SGB II, Stand 01.07.2026 */
export const ASSET_ALLOWANCE_BY_AGE = {
  under30: 5000,
  from30: 10000,
  from40: 12500,
  from50: 20000,
} as const;

/** Vermutete Angemessenheit eines Kfz laut fachlicher Weisung */
export const APPROPRIATE_VEHICLE_VALUE = 15000;

/**
 * Höchstbetrag je angefangenem Jahr der Selbstständigkeit ohne
 * Rentenversicherungsbeiträge, Antragstellung 2026 (9.000 €).
 */
export const SELF_EMPLOYMENT_RETIREMENT_ALLOWANCE_PER_YEAR = 9000;

export function getAssetAllowanceByAge(age: number): number {
  if (age < 30) return ASSET_ALLOWANCE_BY_AGE.under30;
  if (age < 40) return ASSET_ALLOWANCE_BY_AGE.from30;
  if (age < 50) return ASSET_ALLOWANCE_BY_AGE.from40;
  return ASSET_ALLOWANCE_BY_AGE.from50;
}

export function getAppropriateLivingSpace(
  personCount: number,
  propertyKind: "house" | "condo"
): number {
  const base = propertyKind === "house" ? 140 : 130;
  if (personCount <= 4) return base;
  return base + 20 * (personCount - 4);
}

function netVehicleValue(asset: Extract<TAsset, { type: "Vehicle" }>): number {
  return Math.max(0, asset.amount - asset.remainingLoan);
}

function countablePropertyValue(
  amount: number,
  mortgages: number
): number {
  return Math.max(0, amount - mortgages);
}

export type AssetCalculationItem = {
  id: string;
  personId: string;
  type: TAsset["type"];
  countable: number;
  exempt: number;
};

export type AssetManualReviewReason =
  | "asset-excess"
  | "owner-occupied-property"
  | "self-employment-retirement"
  | "vehicle";

export type AssetCalculation = {
  countable: number;
  allowance: number;
  excess: number;
  manualReviewReasons: AssetManualReviewReason[];
  requiresManualReview: boolean;
  community: {
    personId: string;
    name: string;
    allowance: number;
    age?: number;
  }[];
  items: AssetCalculationItem[];
};

export function calculateAssets(context: TStepContext): AssetCalculation {
  const assets = context.assets;

  const communityAllowances = context.community.map((person) => {
    if (person.age === undefined) {
      throw new Error(`Für ${person.name} fehlt das Alter.`);
    }
    return {
      personId: person.id,
      name: person.name,
      age: person.age,
      allowance: getAssetAllowanceByAge(person.age),
    };
  });

  const allowanceSum = communityAllowances.reduce(
    (sum, person) => sum + person.allowance,
    0
  );

  const knownEmployablePersonId = context.isEmployable
    ? context.community.at(0)?.id
    : undefined;

  const activePersonIds = new Set(context.community.map((person) => person.id));
  const activeItems = assets.items.filter((item) =>
    activePersonIds.has(item.personId)
  );

  const vehicles = activeItems.filter(
    (item): item is Extract<TAsset, { type: "Vehicle" }> =>
      item.type === "Vehicle"
  );
  const exemptVehicleId = knownEmployablePersonId
    ? vehicles
        .filter((item) => item.personId === knownEmployablePersonId)
        .map((item) => ({ id: item.id, net: netVehicleValue(item) }))
        .sort((a, b) => b.net - a.net)
        .at(0)?.id
    : undefined;

  const vehicleCountable = new Map<string, { countable: number; exempt: number }>();
  vehicles.forEach((item) => {
    const net = netVehicleValue(item);
    if (item.id === exemptVehicleId) {
      const countable = Math.max(0, net - APPROPRIATE_VEHICLE_VALUE);
      vehicleCountable.set(item.id, { countable, exempt: net - countable });
      return;
    }
    vehicleCountable.set(item.id, { countable: net, exempt: 0 });
  });

  const householdSize = Math.max(context.community.length, 1);
  const karenzzeitApplies = !assets.hasReceivedBenefitsForOneYear;

  const items: AssetCalculationItem[] = activeItems.map((item) => {
    if (item.type === "RetirementProvision") {
      return {
        id: item.id,
        personId: item.personId,
        type: item.type,
        countable: 0,
        exempt: item.amount,
      };
    }

    if (item.type === "Vehicle") {
      const values = vehicleCountable.get(item.id) ?? {
        countable: 0,
        exempt: 0,
      };
      return {
        id: item.id,
        personId: item.personId,
        type: item.type,
        countable: values.countable,
        exempt: values.exempt,
      };
    }

    if (item.type === "OwnerOccupiedProperty") {
      const appropriate = getAppropriateLivingSpace(
        householdSize,
        item.propertyKind
      );
      const net = countablePropertyValue(item.amount, item.mortgages);
      const isAppropriate = item.livingSpace <= appropriate;
      const exemptEntirely = karenzzeitApplies || isAppropriate;
      return {
        id: item.id,
        personId: item.personId,
        type: item.type,
        countable: exemptEntirely ? 0 : net,
        exempt: exemptEntirely ? net : 0,
      };
    }

    if (item.type === "OtherProperty") {
      const net = countablePropertyValue(item.amount, item.mortgages);
      return {
        id: item.id,
        personId: item.personId,
        type: item.type,
        countable: net,
        exempt: item.amount - net,
      };
    }

    return {
      id: item.id,
      personId: item.personId,
      type: item.type,
      countable: item.amount,
      exempt: 0,
    };
  });

  const countable = items.reduce((sum, item) => sum + item.countable, 0);
  const allowance = allowanceSum;
  const excess = Math.max(0, countable - allowance);
  const manualReviewReasons = new Set<AssetManualReviewReason>();

  if (vehicles.length > 0) manualReviewReasons.add("vehicle");
  if (assets.selfEmploymentYearsWithoutPension > 0) {
    manualReviewReasons.add("self-employment-retirement");
  }
  if (activeItems.some((item) => item.type === "OwnerOccupiedProperty")) {
    manualReviewReasons.add("owner-occupied-property");
  }
  if (excess > 0) manualReviewReasons.add("asset-excess");

  return {
    countable,
    allowance,
    excess,
    manualReviewReasons: [...manualReviewReasons],
    requiresManualReview: manualReviewReasons.size > 0,
    community: communityAllowances,
    items,
  };
}
