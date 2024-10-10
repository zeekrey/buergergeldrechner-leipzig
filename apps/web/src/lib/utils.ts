import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { TPerson } from "./types";
import { TIncome } from "./types";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function groupBy<T>(array: T[], key: keyof T): { [key: string]: T[] } {
  return array.reduce((acc, current) => {
    (acc[current[key] as string] = acc[current[key] as string] || []).push(
      current
    );
    return acc;
  }, {});
}

interface GroupByCallback<T> {
  (item: T): string;
}

export function groupByFunction<T>(
  arr: T[],
  func: GroupByCallback<T>
): { [key: string]: T[] } {
  return arr.reduce((memo, x) => {
    const key = func(x);
    if (!memo[key]) {
      memo[key] = [];
    }
    memo[key].push(x);
    return memo;
  }, {});
}

export function flattenIncome(community: TPerson[]) {
  const result: TIncome[] = [];

  community.forEach((person) => {
    person.income?.forEach((income) => {
      result.push({
        id: person.id,
        // FIXME:
        //@ts-ignore
        name: person.name,
        ...income,
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

export function getChildAgeGroup(age: number): string {
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
  description: string; // Description of the category
  percentage: number; // Percentage related to the category
  // values: number[]; // Values associated with the category
}

// Updated categories array with all specified categories
export const additionalChildNeedsCategory: AdditionalChildNeedsCategory[] = [
  {
    description: "1 Kind unter 7 Jahre",
    percentage: 36,
    // values: [202.68, 162.36],
  },
  {
    description: "1 Kind über 7 Jahre",
    percentage: 12,
    // values: [67.56, 54.12],
  },
  {
    description: "2 Kinder unter 16 Jahre",
    percentage: 36,
    // values: [202.68, 162.36],
  },
  {
    description: "2 Kinder über 16 Jahre",
    percentage: 24,
    // values: [135.12, 108.24],
  },
  {
    description: "1 Kind über 7 Jahre und 1 Kind über 16 Jahre",
    percentage: 24,
    // values: [135.12, 108.24],
  },
  {
    description: "1 Kind unter 7 Jahre und 1 Kind unter 16 Jahre",
    percentage: 36,
    // values: [202.68, 162.36],
  },
  {
    description: "3 Kinder",
    percentage: 36,
    // values: [202.68, 162.36],
  },
  {
    description: "4 Kinder",
    percentage: 48,
    // values: [270.24, 216.48],
  },
  {
    description: "ab 5 Kinder",
    percentage: 60,
    // values: [337.8, 270.6],
  },
];

export const generateMember = (member?: Partial<TPerson>): TPerson => ({
  id: generateId(),
  type: "adult",
  name: "Antragsteller",
  income: [],
  attributes: {},
  ...member,
});
