import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, test } from "vitest";

import { Result } from "./result";

describe("result with limited housing costs", () => {
  test("does not present a negative estimate as a definitive refusal", () => {
    const html = renderToStaticMarkup(
      <Result
        communitySize={1}
        income={1000}
        spendings={1200}
        allowance={0}
        overall={-100}
        housingCostReduction={500}
      />
    );
    expect(html).toContain("Kein Anspruch berechnet");
    expect(html).toContain("individuelle Ausnahmen");
    expect(html).toContain("Benötigte Dokumente");
  });
});
