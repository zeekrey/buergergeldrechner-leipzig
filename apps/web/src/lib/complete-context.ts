import type { TPerson, TStepContext } from "./types";

export type TCompleteStepContext = Omit<TStepContext, "community"> & {
  community: Array<TPerson & { age: number }>;
};

export function isValidPersonAge(person: TPerson): person is TPerson & {
  age: number;
} {
  if (!Number.isInteger(person.age) || person.age === undefined) return false;
  return person.type === "child"
    ? person.age >= 0 && person.age <= 24
    : person.age >= 15 && person.age <= 120;
}

export function hasCompleteAges(
  context: TStepContext
): context is TCompleteStepContext {
  return context.community.length > 0 && context.community.every(isValidPersonAge);
}

export function requireCompleteAges(
  context: TStepContext
): TCompleteStepContext {
  if (!hasCompleteAges(context)) {
    throw new Error("Für die Berechnung fehlt das Alter mindestens einer Person.");
  }
  return context;
}
