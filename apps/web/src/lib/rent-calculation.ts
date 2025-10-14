const maxRent: Record<number, number> = {
  1: 345.79,
  2: 450.0,
  3: 586.63,
  4: 671.44,
  5: 782.46,
  6: 861.79,
  7: 941.12,
  8: 1020.45,
  9: 1099.78,
  10: 1179.11,
  11: 1258.44,
  12: 1337.77,
  13: 1417.1,
  14: 1496.43,
  15: 1575.76,
};
const maxSpace: Record<number, number> = {
  1: 45,
  2: 60,
  3: 75,
  4: 85,
  5: 95,
  6: 105,
  7: 115,
  8: 125,
  9: 135,
  10: 145,
  11: 155,
  12: 165,
  13: 175,
  14: 185,
  15: 195,
};
const minUtilities = (space: number) => space * 1.2;

export function calculateRent({
  rent,
  space,
  utilities,
  communityCount,
}: {
  rent: number;
  space: number;
  utilities: number;
  communityCount: number;
}): {
  isOk: boolean;
  issues?: ("rent" | "space" | "utilities")[];
  description: string;
} {
  //FIXME: Use a custom zod validator here.
  if (utilities < minUtilities(space))
    return {
      isOk: false,
      issues: ["utilities"],
      description:
        "Der Anspruch kann nicht geprüft werden: Kein plausibles Verhältnis zwischen Betriebskosten und Wohnfläche. (Je Quadratmeter müssen die Betriebskosten mindestens 1,20€ betragen)",
    };
  const rentSum = rent + utilities;
  const maximumRent = maxRent[communityCount];
  const maximumSpace = maxSpace[communityCount];

  if (space > maximumSpace && rentSum > maximumRent) {
    return {
      isOk: false,
      issues: ["space", "rent"],
      description:
        "Sowohl die zulässige Wohnfläche als auch die Bruttokaltmiete werden überschritten.",
    };
  } else if (space > maximumSpace) {
    return {
      isOk: false,
      issues: ["space"],
      description: "Die zulässige Wohnfläche wird überschritten.",
    };
  } else if (rentSum > maximumRent) {
    return {
      isOk: false,
      issues: ["rent"],
      description: "Die zulässige Bruttokaltmiete wird überschritten.",
    };
  } else {
    return {
      isOk: true,
      description:
        "Die eingegbenen Mietkosten erfüllen die Vorraussetzung für eine Kostenübernahme.",
    };
  }
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  it("ok case", () => {
    expect(
      calculateRent({
        communityCount: 0,
        rent: 0,
        space: 0,
        utilities: 0,
      }).isOk
    ).toBeTruthy();
  });

  it("ok case", () => {
    const { isOk, description } = calculateRent({
      communityCount: 1,
      rent: maxRent[1] - (maxSpace[1] * 1.2 + 1),
      space: maxSpace[1] - 1,
      utilities: maxSpace[1] * 1.2 + 1,
    });

    console.log(description);

    expect(isOk).toBeTruthy();
  });
}
