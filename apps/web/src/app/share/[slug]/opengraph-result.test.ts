import { describe, expect, it } from "vitest";

import { getOpenGraphResult } from "./opengraph-result";

describe("getOpenGraphResult", () => {
  it("does not disclose a provisional amount for manual-review results", () => {
    const result = getOpenGraphResult({
      assetsRequireManualReview: false,
      overall: 1234.56,
      resultStatus: "manual-review",
    });

    expect(result).toEqual({
      label: "Ergebnis",
      value: "Manuelle Prüfung erforderlich",
    });
    expect(result.value).not.toContain("1.234");
    expect(result.value).not.toContain("€");
  });

  it("also honors the asset-level review flag", () => {
    expect(
      getOpenGraphResult({
        assetsRequireManualReview: true,
        overall: 1234.56,
        resultStatus: "calculated",
      }).value
    ).toBe("Manuelle Prüfung erforderlich");
  });

  it("formats a calculated entitlement", () => {
    expect(
      getOpenGraphResult({
        assetsRequireManualReview: false,
        overall: 1234.56,
        resultStatus: "calculated",
      })
    ).toEqual({
      label: "Berechneter Grundsicherungsanspruch",
      value: "1.234,56 €",
    });
  });
});
