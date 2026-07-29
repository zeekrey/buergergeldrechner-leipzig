# Tooling and test baseline

Recorded on 2025-07-29 with Bun 1.3.4.

## Validation

Install the pinned dependencies and Playwright browsers before running the checks:

```sh
bun install --frozen-lockfile
bunx playwright install
bun run check
```

`bun run check` runs every check even when an earlier check fails, then exits non-zero if any check failed. The individual commands are:

```sh
bun run typecheck
bun run lint
bun run test:unit
bun run test:e2e
bun run build
```

## Baseline results

| Check | Result | Notes |
| --- | --- | --- |
| `bun install --frozen-lockfile` | Pass | Lockfile is reproducible. |
| `bun run typecheck` | Known failure | The web app has 55 pre-existing TypeScript errors. The `llm`, `calculation`, and `rag` workspaces pass. Errors include missing MDX declarations, React Hook Form/Zod type mismatches, stale fixture/story types, and UI dependency API mismatches. |
| `bun run lint` | Known failure | The web app reports 374 pre-existing errors across 90 source/config files after generated output is excluded. The `llm` app also reports one error (`react-hooks/immutability`) and one warning. |
| `bun run test:unit` | Pass | 35 tests pass: 9 web in-source tests and 26 calculation tests. |
| `bun run test:e2e` | Pass | 24 tests pass across Chromium, Firefox, and WebKit. |
| `bun run build` | Pass | The calculation package and both Next.js apps build. Existing deprecation/CSS warnings remain non-fatal. |

The known typecheck and lint failures are intentionally recorded here rather than being hidden by the validation scripts. They should be resolved in dedicated cleanup work before treating the aggregate `check` command as green.
