import { type TAsset, type TStepContext } from "./types";
/** § 12 Abs. 2 SGB II, Stand 01.07.2026 */
export declare const ASSET_ALLOWANCE_BY_AGE: {
    readonly under30: 5000;
    readonly from30: 10000;
    readonly from40: 12500;
    readonly from50: 20000;
};
/** Vermutete Angemessenheit eines Kfz laut fachlicher Weisung */
export declare const APPROPRIATE_VEHICLE_VALUE = 15000;
/**
 * Höchstbetrag je angefangenem Jahr der Selbstständigkeit ohne
 * Rentenversicherungsbeiträge, Antragstellung 2026 (9.000 €).
 */
export declare const SELF_EMPLOYMENT_RETIREMENT_ALLOWANCE_PER_YEAR = 9000;
export declare function getAssetAllowanceByAge(age: number): number;
export declare function getAppropriateLivingSpace(personCount: number, propertyKind: "house" | "condo"): number;
export type AssetCalculationItem = {
    id: string;
    personId: string;
    type: TAsset["type"];
    countable: number;
    exempt: number;
};
export type AssetManualReviewReason = "asset-excess" | "owner-occupied-property" | "self-employment-retirement" | "vehicle";
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
export declare function calculateAssets(context: TStepContext): AssetCalculation;
