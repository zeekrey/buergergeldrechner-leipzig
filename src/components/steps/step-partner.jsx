import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UsersIcon } from "lucide-react";
import { UserIcon } from "lucide-react";

export function StepPartner() {
  return (
    <RadioGroup
      className="p-10 flex flex-col sm:flex-row gap-4"
      defaultValue="card"
    >
      <div className="grow">
        <RadioGroupItem className="peer sr-only" id="paypal" value="paypal" />
        <Label
          className="h-full flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          htmlFor="paypal"
        >
          <UserIcon className="mb-3 h-6 w-6" />
          Alleinstehend
        </Label>
      </div>
      <div className="grow">
        <RadioGroupItem className="peer sr-only" id="card" value="card" />
        <Label
          className="h-full flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          htmlFor="card"
        >
          <UsersIcon className="mb-3 h-6 w-6" />
          Partnerschaft
        </Label>
      </div>
    </RadioGroup>
  );
}
