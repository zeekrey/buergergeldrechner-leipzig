# Calculation engine

Shared calculation engine for the Grundsicherungsrechner.

The package calculates a non-binding estimate of a possible entitlement to **Grundsicherungsgeld**, the monetary benefit within the **Grundsicherung für Arbeitsuchende**. Product terminology follows the [BMAS description of the reform](https://www.bmas.de/DE/Service/Gesetze-und-Gesetzesvorhaben/FAQ-Gesetz-zur-Umgestaltung-der-Grundsicherung-fuer-Arbeitsuchende/faq-gesetz-zur-umgestaltung-der-grundsicherung-fuer-arbeitsuchende-art.html).

The engine combines:

- Regelbedarf and Mehrbedarf
- costs of accommodation and heating
- household income and applicable allowances
- the resulting estimated Grundsicherungsanspruch

It provides an estimate only and does not replace an official assessment by a Jobcenter.

## Development

From the repository root:

```bash
bun run --filter calculation test
bun run --filter calculation typecheck
bun run --filter calculation build
```
