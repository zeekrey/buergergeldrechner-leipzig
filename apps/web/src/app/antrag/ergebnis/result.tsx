import { Button } from "@/components/ui/button";
import {
  ExternalLinkIcon,
  HandCoinsIcon,
  PiggyBankIcon,
  ScaleIcon,
  UsersIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function Result({
  communitySize,
  income,
  spendings,
  allowance,
  overall,
}: {
  communitySize: number;
  income: number;
  spendings: number;
  allowance: number;
  overall: number;
}) {
  const isPositive = overall > 0;

  return (
    <div className="py-6 grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-5">
      <div className="flex items-center">
        {isPositive ? (
          <p className="text-base leading-7 text-gray-600">
            Auf Basis Ihrer Angaben sehen Sie die mögliche Höhe des
            Bürgergeldes. Ob Sie tatsächlich Anspruch haben, hängt von weiteren
            Faktoren ab. Bitte beachten Sie, dass es sich hierbei um eine
            unverbindliche Berechnung handelt.
          </p>
        ) : (
          <p className="text-base leading-7 text-gray-600">
            Entsprechend Ihrer Angaben werden Sie keinen Anspruch auf Bürgergeld
            haben. Verfügen Sie über niedriges Einkommen, dann können Sie
            Wohngeld beantragen. Verfügen Sie über niedriges Einkommen und haben
            Kinder in Ihrer Bedarfsgemeinschaft können Sie Kinderzuschlag
            beantragen.
          </p>
        )}
      </div>
      <div
        className={cn(
          "row-span-2 rounded-2xl bg-green-50 px-8 text-center ring-1 ring-inset ring-green-200 md:flex md:flex-col md:justify-center lg:py-16",
          { "ring-yellow-400 bg-yellow-50": !isPositive }
        )}
      >
        <p className="flex items-baseline justify-center gap-x-2">
          <span
            className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900"
            data-testid="result"
          >
            {isPositive
              ? overall.toLocaleString("de-DE", {
                  currency: "EUR",
                  style: "currency",
                })
              : "Kein Anspruch"}
          </span>
        </p>
        {overall > 0 ? (
          <Button asChild>
            <a href="https://jobcenter.digital" className="mt-10">
              <ExternalLinkIcon className="w-4 h-4 mr-2" />
              Jetzt beantragen
            </a>
          </Button>
        ) : (
          <p className="mt-6 text-xs leading-5 text-gray-600">
            Auch wenn kein Anspruch auf Bürgergeld bestehen sollte, können Sie
            sich hier über{" "}
            <a
              href="http://"
              className="font-bold underline underline-offset-2"
            >
              Wohngeld
            </a>{" "}
            und{" "}
            <a
              href="http://"
              className="font-bold underline underline-offset-2"
            >
              Kinderzuschlag
            </a>{" "}
            informieren.
          </p>
        )}
      </div>
      <div>
        <div className="flex items-center gap-x-4">
          <h4 className="flex-none text-sm font-semibold leading-6 text-primary">
            Ihre Eingaben
          </h4>
          <div className="h-px flex-auto bg-gray-100" />
        </div>
        <ul
          role="list"
          className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
        >
          <li className="flex gap-x-3">
            <UsersIcon
              aria-hidden="true"
              className="h-6 w-5 flex-none text-primary"
            />
            {communitySize} {communitySize > 1 ? "Personen" : "Person"}
          </li>
          <li className="flex gap-x-3">
            <PiggyBankIcon
              aria-hidden="true"
              className="h-6 w-5 flex-none text-primary"
            />
            {income.toLocaleString("de-DE", {
              style: "currency",
              currency: "EUR",
            })}{" "}
            Einnahmen
          </li>
          <li className="flex gap-x-3">
            <HandCoinsIcon
              aria-hidden="true"
              className="h-6 w-5 flex-none text-primary"
            />
            {spendings.toLocaleString("de-DE", {
              style: "currency",
              currency: "EUR",
            })}{" "}
            Kosten für Unterkunft und Heizung
          </li>
          <li className="flex gap-x-3">
            <ScaleIcon
              aria-hidden="true"
              className="h-6 w-5 flex-none text-primary"
            />
            {allowance.toLocaleString("de-DE", {
              style: "currency",
              currency: "EUR",
            })}{" "}
            Freibeträge
          </li>
        </ul>
      </div>
    </div>
  );
}
