import { cn } from "@/lib/utils";
import { Fragment, useMemo, forwardRef } from "react";
import { allowanceType, incomeType, TStepContext } from "@/lib/types";
import { calculateBaseNeed, calculateOverall } from "calculation";

const Table = forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <div
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
));

const TableBody = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
));

const TableCell = forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
    {...props}
  />
));

export function ResultSheet({ state }: { state: TStepContext }) {
  const baseNeed = useMemo(() => calculateBaseNeed(state), [state]);
  const {
    need,
    allowance,
    additionalNeeds,
    income,
    incomeAfterAllowance,
    overall,
  } = useMemo(() => calculateOverall(state), [state]);

  const allowanceSum = useMemo(
    () => allowance.reduce((acc, curr) => acc + (curr.amount ?? 0), 0),
    [allowance]
  );

  const additionalsCount = useMemo(
    () =>
      additionalNeeds.community.reduce((acc, curr) => {
        return acc + curr.additionals.length;
      }, 0),
    []
  );

  const incomeCount = useMemo(
    () =>
      state.community.reduce((acc, curr) => {
        return acc + curr.income.length;
      }, 0),
    []
  );

  return (
    <Table>
      <TableBody className="grid grid-cols-2 sm:grid-cols-4">
        {/* Base need */}
        <TableCell
          style={{
            gridRow: `span ${baseNeed.community.length + 1} / span ${
              baseNeed.community.length + 1
            }`,
          }}
          className="font-medium col-span-2 sm:col-span-1"
        >
          Regelbedarf
        </TableCell>
        {baseNeed.community.map((item, index) => (
          <Fragment key={index}>
            <TableCell className="sm:col-span-2">{item.name}</TableCell>
            <TableCell className="text-right">
              {item.amount.toLocaleString("de-DE", {
                style: "currency",
                currency: "EUR",
              })}
            </TableCell>
          </Fragment>
        ))}
        <TableCell className="sm:col-span-2 bg-muted/30 font-bold">
          Summe
        </TableCell>
        <TableCell className="text-right bg-muted/30 font-bold">
          {baseNeed.sum.toLocaleString("de-DE", {
            style: "currency",
            currency: "EUR",
          })}
        </TableCell>
        {/* Additional need */}
        {Boolean(additionalNeeds.community.length) && (
          <TableCell
            className="font-medium col-span-2 sm:col-span-1"
            style={{
              gridRow: `span ${additionalsCount + 1} / span ${
                additionalsCount + 1
              }`,
            }}
          >
            Mehrbedarfe
          </TableCell>
        )}
        {additionalNeeds.community.map((person, personIndex) => (
          <Fragment key={person.personId + personIndex}>
            <TableCell
              className="font-medium col-span-2 sm:col-span-1"
              style={{
                gridRow: `span ${person.additionals.length} / span ${person.additionals.length}`,
              }}
            >
              {person.name}
            </TableCell>
            {person.additionals.map((additionalNeed, needIndex) => (
              <Fragment key={needIndex}>
                <TableCell className="font-medium">
                  {additionalNeed.name}
                </TableCell>
                <TableCell className="font-medium text-right">
                  {additionalNeed.amount.toLocaleString("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </TableCell>
              </Fragment>
            ))}
          </Fragment>
        ))}
        {Boolean(additionalNeeds.community.length) && (
          <>
            <TableCell className="sm:col-span-2 bg-muted/30 font-bold">
              Summe
            </TableCell>
            <TableCell className="text-right bg-muted/30">
              {additionalNeeds.sum.toLocaleString("de-DE", {
                style: "currency",
                currency: "EUR",
              })}
            </TableCell>
          </>
        )}
        {/* spendings */}
        {state.spendings.sum > 0 && (
          <>
            <TableCell className="font-medium row-span-4 col-span-2 sm:col-span-1">
              Kosten für Unterkunft und Heizung
            </TableCell>
            <TableCell className="sm:col-span-2">
              Kaltmiete (Schuldzins bei Wohneigentum)
            </TableCell>
            <TableCell className="text-right">
              {state.spendings.rent.toLocaleString("de-DE", {
                style: "currency",
                currency: "EUR",
              })}
            </TableCell>
            <TableCell className="sm:col-span-2">Nebenkosten</TableCell>
            <TableCell className="text-right">
              {state.spendings.utilities.toLocaleString("de-DE", {
                style: "currency",
                currency: "EUR",
              })}
            </TableCell>
            <TableCell className="sm:col-span-2">Heizkosten</TableCell>
            <TableCell className="text-right">
              {state.spendings.heating.toLocaleString("de-DE", {
                style: "currency",
                currency: "EUR",
              })}
            </TableCell>
            <TableCell className="sm:col-span-2 bg-muted/30 font-bold">
              Summe
            </TableCell>
            <TableCell className="text-right bg-muted/30">
              {state.spendings.sum.toLocaleString("de-DE", {
                style: "currency",
                currency: "EUR",
              })}
            </TableCell>
          </>
        )}
        {/* sub sum needs */}
        <TableCell className="sm:col-span-3 bg-muted font-bold">
          Summe aller Bedarfe
        </TableCell>
        <TableCell className="text-right bg-muted font-bold">
          {need.toLocaleString("de-DE", {
            style: "currency",
            currency: "EUR",
          })}
        </TableCell>
        {/* income */}
        {Boolean(incomeCount > 0) && (
          <TableCell
            className="font-medium col-span-2 sm:col-span-1"
            style={{
              gridRow: `span ${incomeCount + 1} / span ${incomeCount + 1}`,
            }}
          >
            Einkommen
          </TableCell>
        )}
        {state.community
          .filter((p) => p.income.length)
          .map((person, personIndex) => (
            <Fragment key={personIndex}>
              <TableCell
                className="font-medium col-span-2 sm:col-span-1"
                style={{
                  gridRow: `span ${person.income.length} / span ${person.income.length}`,
                }}
              >
                {person.name}
              </TableCell>
              {person.income.map((income, incomeIndex) => (
                <Fragment key={incomeIndex}>
                  <TableCell className="font-medium">
                    {incomeType[income.type].label}
                  </TableCell>
                  <TableCell className="font-medium text-right">
                    {income.amount.toLocaleString("de-DE", {
                      style: "currency",
                      currency: "EUR",
                    })}
                  </TableCell>
                </Fragment>
              ))}
            </Fragment>
          ))}
        {incomeCount > 0 && (
          <>
            <TableCell className="sm:col-span-2 bg-muted/30 font-bold">
              Summe
            </TableCell>
            <TableCell className="text-right bg-muted/30 font-bold">
              {income.sum.toLocaleString("de-DE", {
                style: "currency",
                currency: "EUR",
              })}
            </TableCell>
          </>
        )}
        {/* allowance */}
        {Boolean(allowance.length) && (
          <TableCell
            className="font-medium col-span-2 sm:col-span-1"
            style={{
              gridRow: `span ${allowance.length + 1} / span ${
                allowance.length + 1
              }`,
            }}
          >
            Freibeträge
          </TableCell>
        )}
        {allowance.map((_allowance, index) => (
          <Fragment key={index}>
            <TableCell className="font-medium sm:col-span-2">
              {allowanceType[_allowance.type].label} (
              {
                state.community.find((pers) => pers.id === _allowance.personId)
                  ?.name
              }
              )
            </TableCell>
            <TableCell className="font-medium text-right">
              {_allowance.amount?.toLocaleString("de-DE", {
                style: "currency",
                currency: "EUR",
              })}
            </TableCell>
          </Fragment>
        ))}
        {Boolean(allowance.length > 0) && (
          <>
            <TableCell className="sm:col-span-2 bg-muted/30 font-bold">
              Summe
            </TableCell>
            <TableCell className="text-right bg-muted/30 font-bold">
              {allowanceSum.toLocaleString("de-DE", {
                style: "currency",
                currency: "EUR",
              })}
            </TableCell>
          </>
        )}
        {/* sub sum income */}
        {incomeAfterAllowance > 0 && (
          <>
            <TableCell className="sm:col-span-3 bg-muted font-bold">
              Summe aller Einkommen (abzgl. Freibeträge)
            </TableCell>
            <TableCell className="text-right bg-muted font-bold">
              {incomeAfterAllowance.toLocaleString("de-DE", {
                style: "currency",
                currency: "EUR",
              })}
            </TableCell>
          </>
        )}
        {/* overall sum  */}
        <>
          <TableCell className="sm:col-span-3 bg-primary font-bold text-primary-foreground">
            Bürgergeldanspruch
          </TableCell>
          <TableCell className="text-right bg-primary font-bold text-primary-foreground">
            {overall.toLocaleString("de-DE", {
              style: "currency",
              currency: "EUR",
            })}
          </TableCell>
        </>
      </TableBody>
    </Table>
  );
}
