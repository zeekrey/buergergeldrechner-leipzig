---
title: Vergleich – Zuschuss, Darlehen, Sachleistung und Direktzahlung
category: comparison
source_sections: §§ 4, 22, 24, 29, 42a
source_pages: 6, 29–36, 44–45
source_count: 1
---

# Vergleich: Zuschuss, Darlehen, Sachleistung und Direktzahlung

| Form | Rückzahlung? | Verfügung durch Berechtigte? | Beispiele |
|---|---|---|---|
| **Zuschuss/Geldleistung** | grundsätzlich nein | regelmäßig ja | Regelbedarf, Mehrbedarf |
| **Darlehen** | ja | je nach Bedarf | unabweisbarer Regelbedarfsbedarf, Kaution, nicht sofort verwertbares Vermögen |
| **Sachleistung** | grundsätzlich nein; bei § 24 Abs. 1 wird Anschaffungswert als Darlehen gewährt | nein | Versorgung, Gegenstand, Gemeinschaftsunterkunft |
| **Gutschein** | regelmäßig nein | zweckgebunden | Bildung und Teilhabe |
| **Direktzahlung** | nein, sofern zugrunde liegende Leistung Zuschuss ist | Zahlung geht an Dritten | Vermieter, Bildungsanbieter, Versicherer |

## Entscheidende Unterscheidungen

**Leistungsart** und **Zahlungsweg** sind verschiedene Achsen. Unterkunft kann ein Zuschuss sein, aber direkt an den Vermieter fließen. Eine Sachleistung kann in § 24 Abs. 1 zugleich einen Darlehensrückzahlungsanspruch in Höhe des Anschaffungswerts auslösen.

## Typische Regeln

- § 4 nennt Dienst-, Geld- und Sachleistungen als Grundformen.
- § 22 ermöglicht oder verlangt in bestimmten Fällen Vermieterdirektzahlung; Kautionen sollen Darlehen sein.
- § 24 ordnet unabweisbare Regelbedarfsbedarfe als Darlehen ein, Erstausstattungen dagegen gesondert als Geld-/Sachleistung.
- § 29 erlaubt bei Bildung und Teilhabe Gutscheine, Anbieterzahlung oder Geldleistung.
- § 42a regelt Tilgung und Fälligkeit von Darlehen.

## Modellierung

Ein Leistungsdatensatz sollte getrennt speichern:

```text
legal_basis
need_type
benefit_type (grant/loan)
delivery_type (cash/goods/service/voucher)
payee (person/provider/landlord/insurer)
repayment_claim
```

**Quelle:** §§ 4, 22, 24, 29, 42a; PDF-S. 6, 29–36, 44–45.
