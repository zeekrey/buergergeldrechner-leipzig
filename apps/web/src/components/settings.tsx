import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import { useState } from "react";

import { Label } from "./ui/label";

type ColorModes = "dark" | "light" | "system";

export function Settings() {
  const { setTheme, theme } = useTheme();
  const [storeData, setStoreData] = useState(true);

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Einstellungen</DialogTitle>
        <DialogDescription>
          Sie haben hier die Möglichkeit einige Einstellungen zu ändern. Diese
          werden nicht gespeicht und sind nur für die aktuelle Sitzung gültig.
        </DialogDescription>
      </DialogHeader>
      <Separator />
      <div className="space-y-4">
        <div>
          <Label>Erscheinungsbild</Label>
          <p className="text-sm text-muted-foreground m-0 p-0">
            Ändern Sie die verwendeten Farben.
          </p>
          <RadioGroup
            className="grid max-w-md grid-cols-3 gap-5 pt-2"
            defaultValue={theme}
            onValueChange={(e) => setTheme(e as ColorModes)}
          >
            <div>
              <Label className="[&:has([data-state=checked])>div]:border-primary">
                <div>
                  <RadioGroupItem className="sr-only" value="light" />
                </div>
                <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
                  <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                    <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                      <div className="h-2 w-[60px] rounded-lg bg-[#ecedef]" />
                      <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                    </div>
                    <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                      <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                      <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                    </div>
                  </div>
                </div>
                <span className="block w-full p-2 text-center font-normal">
                  Hell
                </span>
              </Label>
            </div>
            <div>
              <Label className="[&:has([data-state=checked])>div]:border-primary">
                <div>
                  <RadioGroupItem className="sr-only" value="dark" />
                </div>
                <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
                  <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                    <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                      <div className="h-2 w-[60px] rounded-lg bg-slate-400" />
                      <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                    </div>
                    <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                      <div className="h-4 w-4 rounded-full bg-slate-400" />
                      <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                    </div>
                  </div>
                </div>
                <span className="block w-full p-2 text-center font-normal">
                  Dunkel
                </span>
              </Label>
            </div>
            <div>
              <Label className="[&:has([data-state=checked])>div]:border-primary">
                <div>
                  <RadioGroupItem className="sr-only" value="system" />
                </div>
                <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
                  <div className="space-y-2 rounded-sm bg-zinc-950 p-2">
                    <div className="space-y-2 rounded-md bg-zinc-800 p-2 shadow-sm">
                      <div className="h-2 w-[60px] rounded-lg bg-zinc-400" />
                      <div className="h-2 w-[80px] rounded-lg bg-zinc-400" />
                    </div>
                    <div className="flex items-center space-x-2 rounded-md bg-zinc-800 p-2 shadow-sm">
                      <div className="h-4 w-4 rounded-full bg-zinc-400" />
                      <div className="h-2 w-[80px] rounded-lg bg-zinc-400" />
                    </div>
                  </div>
                </div>
                <span className="block w-full p-2 text-center font-normal">
                  System
                </span>
              </Label>
            </div>
          </RadioGroup>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <Label className="text-sm">Eingaben speichern</Label>
            <div className="text-sm text-muted-foreground">
              Ihre Eingaben können auf Ihrem Gerät gespeichert werden.
            </div>
          </div>
          <div>
            <Switch
              aria-readonly
              checked={storeData}
              onCheckedChange={setStoreData}
            />
          </div>
        </div>
      </div>
    </DialogContent>
  );
}
