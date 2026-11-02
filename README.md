# Grundsicherungsrechner

![License](https://img.shields.io/badge/license-GNU-blue.svg)

A small web application that provides a non-binding estimate of a possible entitlement to German basic income support for jobseekers (Grundsicherung für Arbeitsuchende). 🇩🇪

> [!NOTE]
> The project originated as part of the [Smart City Challenge Leipzig 2024](https://digitalcampus.leipzig.de/sccl-2024/) and is now maintained as the Grundsicherungsrechner.

## Terminology

The application follows the terminology described by the [Federal Ministry of Labour and Social Affairs (BMAS)](https://www.bmas.de/DE/Service/Gesetze-und-Gesetzesvorhaben/FAQ-Gesetz-zur-Umgestaltung-der-Grundsicherung-fuer-Arbeitsuchende/faq-gesetz-zur-umgestaltung-der-grundsicherung-fuer-arbeitsuchende-art.html):

- **Grundsicherung für Arbeitsuchende** is the name of the benefit system under SGB II.
- **Grundsicherungsgeld** is the name of the monetary benefit.
- **Grundsicherungsrechner** is the name used for this application.

The estimate does not replace an official assessment by the responsible Jobcenter.

## Project structure

- `apps/web`: productive Next.js web application
- `packages/calculation`: shared calculation engine
- `specs`: requirements and procurement specifications

The experimental areas `apps/llm` and `packages/rag` are outside the productive application described by the current specification.

## Development

```bash
bun install
bun run --filter calculation typecheck
bun run --filter '@grundsicherungsrechner/web' lint
bun run test:unit
bun run --filter '@grundsicherungsrechner/web' build
```

Set `NEXT_PUBLIC_SITE_URL` to the production origin (for example, `https://example.org`) so canonical and Open Graph URLs resolve to the deployed domain. Development defaults to `http://localhost:3000`.

## Contributing

Please [open an issue](https://github.com/zeekrey/smart-city-challenge/issues) to share a requirement or submit a pull request with a brief explanation of the proposed change.

## License

This project is licensed under the GNU License. See [LICENSE](LICENSE) for details.
