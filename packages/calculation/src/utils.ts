import type { TPerson, TIncome } from "./types";

export function flattenIncome(community: TPerson[]) {
  const result: (TIncome & { personId: string; name: string })[] = [];

  community.forEach((person) => {
    person.income?.forEach((income: TIncome) => {
      result.push({
        ...income,
        personId: person.id,
        name: person.name,
      });
    });
  });

  return result;
}

export function generateId(): string {
  const timestamp = Date.now(); // Get current timestamp
  const randomNum = Math.floor(Math.random() * 1000); // Generate a random number
  return `${timestamp}${randomNum}`; // Combine them to create a unique ID
}

export function getChildAgeGroup(
  age: number
): "0-5" | "6-13" | "14-17" | "18+" {
  if (age < 0) {
    throw new Error("Age cannot be negative.");
  } else if (age <= 5) {
    return "0-5";
  } else if (age <= 13) {
    return "6-13";
  } else if (age <= 17) {
    return "14-17";
  } else {
    return "18+";
  }
}

interface AdditionalChildNeedsCategory {
  description: string;
  percentage: number;
}

export const additionalChildNeedsCategory: AdditionalChildNeedsCategory[] = [
  {
    description: "1 Kind unter 7 Jahre",
    percentage: 36,
  },
  {
    description: "1 Kind über 7 Jahre",
    percentage: 12,
  },
  {
    description: "2 Kinder unter 16 Jahre",
    percentage: 36,
  },
  {
    description: "2 Kinder über 16 Jahre",
    percentage: 24,
  },
  {
    description: "1 Kind über 7 Jahre und 1 Kind über 16 Jahre",
    percentage: 24,
  },
  {
    description: "1 Kind unter 7 Jahre und 1 Kind unter 16 Jahre",
    percentage: 36,
  },
  {
    description: "3 Kinder",
    percentage: 36,
  },
  {
    description: "4 Kinder",
    percentage: 48,
  },
  {
    description: "ab 5 Kinder",
    percentage: 60,
  },
];
