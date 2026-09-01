export function getOpenGraphResult({
  assetsRequireManualReview,
  overall,
  resultStatus,
}: {
  assetsRequireManualReview: boolean;
  overall: number;
  resultStatus: "calculated" | "manual-review";
}) {
  const requiresManualReview =
    resultStatus === "manual-review" || assetsRequireManualReview;

  return requiresManualReview
    ? {
        label: "Ergebnis",
        value: "Manuelle Prüfung erforderlich",
      }
    : {
        label: "Berechneter Grundsicherungsanspruch",
        value: overall.toLocaleString("de-DE", {
          currency: "EUR",
          style: "currency",
        }),
      };
}
