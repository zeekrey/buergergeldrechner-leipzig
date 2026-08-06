import { describe, expect, it } from "vitest";

import { initialStepsState } from "@/lib/machine";
import { generateMember } from "@/lib/utils";

import { getApplicableStepIds } from "./wizard-progress";

describe("getApplicableStepIds", () => {
  it("skips optional child and disease steps when they are not needed", () => {
    expect(getApplicableStepIds(initialStepsState.context)).toEqual([
      "erwerbsfaehig",
      "partnerschaft",
      "kinder",
      "bedarfsgemeinschaft",
      "kosten-unterkunft-heizung",
      "monatliches-einkommen",
      "ergebnis",
    ]);
  });

  it("includes the child count step when at least one child is present", () => {
    const state = {
      ...initialStepsState.context,
      community: [
        generateMember({ id: "adult-1" }),
        generateMember({
          age: 4,
          id: "child-1",
          name: "Kind 1",
          type: "child",
        }),
      ],
    };

    expect(getApplicableStepIds(state)).toEqual([
      "erwerbsfaehig",
      "partnerschaft",
      "kinder",
      "kinder-anzahl",
      "bedarfsgemeinschaft",
      "kosten-unterkunft-heizung",
      "monatliches-einkommen",
      "ergebnis",
    ]);
  });

  it("includes the disease step when any community member has disease-related needs", () => {
    const state = {
      ...initialStepsState.context,
      community: [
        generateMember({
          attributes: {
            diseases: [],
            hasDiseases: true,
            isPregnant: false,
            isSingleParent: false,
          },
          id: "adult-1",
        }),
      ],
    };

    expect(getApplicableStepIds(state)).toEqual([
      "erwerbsfaehig",
      "partnerschaft",
      "kinder",
      "bedarfsgemeinschaft",
      "krankheiten",
      "kosten-unterkunft-heizung",
      "monatliches-einkommen",
      "ergebnis",
    ]);
  });
});
