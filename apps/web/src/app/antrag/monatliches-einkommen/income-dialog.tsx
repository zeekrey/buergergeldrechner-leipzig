import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { z } from "zod";

import { useStateContext } from "@/components/context";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IncomeTypEnum, TPerson } from "@/lib/types";
import { type TIncome, incomeType } from "@/lib/types";

import { DefaultIncome } from "./income-dialogs/default-income";
import { EmploymentIncome } from "./income-dialogs/employment-income";
import { ParentalAllowance } from "./income-dialogs/parental-allowance";
import { SelfEmploymentIncome } from "./income-dialogs/self-employment-income";
import { ShortTimeWorkIncome } from "./income-dialogs/short-time-work-income";
import { VoluntarySocialYear } from "./income-dialogs/voluntary-social-year";

const incomeTypeList = Object.entries(incomeType).map((type) => type);

export type IncomeComponentProps = {
  person: TPerson;
  income?: TIncome;
  setOpen: Dispatch<SetStateAction<boolean>>;
  incomeType?: z.infer<typeof IncomeTypEnum>;
};

export const incomeComponentMap = {
  EmploymentIncome: EmploymentIncome,
  SelfEmploymentIncome: SelfEmploymentIncome,
  BAfOG: DefaultIncome,
  ChildAllowance: DefaultIncome,
  AdvanceMaintenancePayment: DefaultIncome,
  Maintenance: DefaultIncome,
  UnemploymentBenefits: DefaultIncome,
  SicknessBenefits: DefaultIncome,
  HousingAllowance: DefaultIncome,
  ChildSupplement: DefaultIncome,
  ParentalAllowance: ParentalAllowance,
  Pension: DefaultIncome,
  MaintenanceContributionFromMasterCraftsmen: DefaultIncome,
  ShortTimeWorkAllowance: ShortTimeWorkIncome,
  VocationalTrainingAllowance: DefaultIncome,
  TaxFreeSideJob: DefaultIncome,
  VoluntarySocialYear: VoluntarySocialYear,
  OtherIncome: DefaultIncome,
  ChildBenefitTransfer: DefaultIncome,
} satisfies Record<
  z.infer<typeof IncomeTypEnum>,
  React.FunctionComponent<never>
>;

export const IncomeDialog = ({
  children,
  selectedPerson,
  selectedIncome,
}: {
  children: React.ReactNode;
  selectedPerson?: TPerson;
  selectedIncome?: TIncome;
}) => {
  const [open, setOpen] = useState(false);
  const [state] = useStateContext();
  const [person, setPerson] = useState(selectedPerson);
  const [incomeType, setIncomeType] = useState(
    selectedIncome?.type ?? ("EmploymentIncome" as TIncome["type"])
  );

  /** Needed, otherwise the local person state, won't be updated. */
  useEffect(() => {
    setPerson(selectedPerson);
  }, [state.community]);

  const IncomeComponent = incomeComponentMap[incomeType] as React.FunctionComponent<IncomeComponentProps>;

  const handlePersonChange = (personId: string) => {
    const _person = state.community.find((pers) => pers.id === personId);
    setPerson(_person);
  };

  const handleIncomeChange = (incomeType: string) => {
    const _income = incomeTypeList.find((inc) => inc[0] === incomeType);
    if (_income) setIncomeType(_income.at(0) as TIncome["type"]);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Einkommen erfassen</DialogTitle>
          <DialogDescription>
            Bitte erfassen Sie jede Art von Einkommen.
          </DialogDescription>
        </DialogHeader>
        <Select
          onValueChange={handlePersonChange}
          defaultValue={person?.id ?? state.community.at(0)?.id}
        >
          <SelectTrigger disabled={Boolean(selectedPerson)}>
            <SelectValue placeholder="Person auswählen" />
          </SelectTrigger>
          <SelectContent>
            {state.community.map((person) => (
              <SelectItem value={person.id} key={person.name}>
                {person.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select onValueChange={handleIncomeChange} defaultValue={incomeType}>
          <SelectTrigger className="truncate">
            <SelectValue
              placeholder="Einkommensart auswählen"
              className="truncate"
            />
          </SelectTrigger>
          <SelectContent>
            {incomeTypeList.map((type) => (
              <SelectItem value={type[0]} key={type[0]}>
                {type[1].label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <IncomeComponent
          person={person ?? (state.community.at(0) as TPerson)}
          setOpen={setOpen}
          income={selectedIncome}
          incomeType={incomeType}
        />
      </DialogContent>
    </Dialog>
  );
};
