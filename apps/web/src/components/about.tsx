import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertCircleIcon } from "lucide-react";

export function About() {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Über dieses Angebot</DialogTitle>
      </DialogHeader>
      <div>
        <Alert className="mb-4" variant="destructive">
          <AlertCircleIcon className="h-4 w-4" />
          <AlertTitle>Dies ist kein offizielles Angebot</AlertTitle>
          <AlertDescription>
            Es handelt sich hierbei um ein <strong>fiktives Angebot</strong>,
            welches im Rahmen eines Projektes erstellt wurde. Alle Angaben sind
            können frei erfunden sein.
          </AlertDescription>
        </Alert>
        <div className="prose prose-sm">
          <p>
            Die Anwendung wurde im Rahmen des Projektes &quot;Digitale
            Verwaltung&quot; erstellt. Sie dient dazu, die Möglichkeiten von
            digitalen Anträgen zu testen.
          </p>
          <h4>Funktionen</h4>
          <ul>
            <li>Der Antrag ist in leicht verständlichen Fragen unterteilt.</li>
            <li>tbd.</li>
          </ul>
          <h4>Datenschutz und Sicherheit</h4>
          <p>
            Alle eingegeben Informationen werden{" "}
            <strong>nicht gespeichert.</strong> Eingaben werden unter Umständen
            in Ihrem Browser temporär vorgehalten, jedoch nicht an uns
            übermittelt.
          </p>
          <p>Es werden keinerlei persönliche Daten erhoben.</p>
          <h4>Verantwortlich</h4>
          <p>
            Diese Webseite wurde erstellt von Christian Krey. Anfragen gerne via{" "}
            <a href="https://twitter.com/zeekrey_">twitter.com</a>. Dieses
            Projekt ist{" "}
            <a href="https://github.com/zeekrey/smart-city-challenge">
              Open Source
            </a>
            .
          </p>
        </div>
      </div>
    </DialogContent>
  );
}
