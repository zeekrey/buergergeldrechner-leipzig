import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UsersIcon } from "lucide-react";
import { UserIcon } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen mx-auto bg-red-50 max-w-3xl">
      {/* step root */}
      <div className="bg-red-200 h-96 w-full flex flex-col">
        {/* step title */}
        <div className="px-8 pt-6">
          <h2 className="font-semibold tracking-tight text-2xl">Leben Sie in einer Partnerschaft?</h2>
        </div>
        {/* step description */}
        <div className="px-8 pt-4">
          <p className="text-sm text-muted-foreground">Viele der folgenden Fragen hängen davon ab, ob Sie <strong>alleinstehend</strong> sind oder einen Partner haben. Zur einer Partnerschaft zählen <strong>eingetragene Partnerschaften</strong> und <strong>verheiratete Paare</strong>.</p>
        </div>
        {/* step content */}
        <div className="px-8 pt-4 flex-grow flex justify-center items-center">
          <RadioGroup className="grid grid-cols-2 gap-4" defaultValue="card">
            <div className="w-48">
              <RadioGroupItem
                className="peer sr-only"
                id="paypal"
                value="paypal"
              />
              <Label
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                htmlFor="paypal"
              >
                <UserIcon className="mb-3 h-6 w-6" />
                Alleinstehend
              </Label>
            </div>
            <div className="w-48">
              <RadioGroupItem className="peer sr-only" id="card" value="card" />
              <Label
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                htmlFor="card"
              >
                <UsersIcon className="mb-3 h-6 w-6" />
                Partnerschaft
              </Label>
            </div>
          </RadioGroup>
        </div>
        {/* step navigation */}
        <div className="px-8 py-6 flex justify-between">
          <Button>⬅️</Button>
          <Button className="w-48">Weiter</Button>
        </div>
      </div>
    </main>
  );
}
