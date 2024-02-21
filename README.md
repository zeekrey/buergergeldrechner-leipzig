Hierbei handelt es sich um ein Projekt im Rahmen der [Smart City Challange](https://digitalcampus.leipzig.de/sccl-2024/) Leipzig 2024 zum Themen ["Bürgergeldrechner+ - Dein individueller Anspruchsrechner"](https://digitalcampus.leipzig.de/sccl-wettbewerbsbedingungen-2024/buergergeldrechner-dein-individueller-anspruchsrechner/).

## Anforderungen

> Wie gelingt es, mit wenigen Eingaben einen möglichst genauen Anspruch auf Bürgergeld zu berechnen und damit Orientierung für Grundsicherungssuchende zu schaffen ?

### Fachliche Anforderungen

- Das angestrebte Webtool soll anhand eines Webformulars die Prüfung des Anspruches mit möglichst genauen Näherungswerten erreichen
- Inhaltlich sind die Fragen in verschiedene, optisch erkennbare Kategorien unterteilt, welche intuitiv bzw. anhand von allgemeinen Angaben befüllt werden können.
- Sobald man in das nächste Eingabefeld wechselt, werden in einfacher Sprache Hinweise zur Angabe angezeigt.
- Eine Erklärung zu Datenschutz und -sicherheit ist dennoch ratsam, um die Nutzer:innen aufzuklären.
- Neben dem Ergebnis werden entsprechende Verlinkungen und Webseiten zur weiteren Antragstellung angezeigt, ebenso ist die Einbindung von Flyern und Informationsmaterial möglich.
- Letztendlich soll nicht nur das Ergebnis der Berechnung, sondern eine kurze Schritt-für-Schritt Anleitung zur Antragstellung erkennbar sein.
- Das Ergebnis soll Client-seitig temporär gespeichert werden, um die Möglichkeit zu bieten, die Berechnung zu speichern und später fortzusetzen.*
- Es gibt einen Fortschrittsbalken, der anzeigt, wie viele Fragen noch zu beantworten sind.*
- Es gibt eine Art Outline, die anzeigt in welchem Pfad des Entscheidungsbaum man sich gerade befindet.*
- Sollte gängie Accessability-Standards erfüllen.*

### Technische Anforderungen

- Das Webtool soll später über die Website bspw. des Jobcenters Leipzig oder der Stadt Leipzig zugänglich sein.
- Technisch werden die Eingaben durch Javascript-Funktionen verarbeitet und direkt im Webbrowser das Ergebnis errechnet.
- Dabei kommt es an keiner Stelle zur Speicherung der Daten, es wird keine Schnittstelle zu einer Datenbank benötigt, da die Formulareingaben direkt im Formular genutzt werden.
- Die Anwendung soll auf allen gängigen Endgeräten (Desktop, Tablet, Smartphone) funktionieren. *
