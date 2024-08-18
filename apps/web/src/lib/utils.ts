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
