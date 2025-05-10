# Figma Infra Toolkit

This project provides a modular infrastructure layer to enable analysis, scoring, auditing, and diagnostics on Figma files at scale. It is designed to be used by internal plugins, services, and utilities that require structured access to Figma data — including component usage, variant overrides, design system adherence, and token-level analysis.

The system standardizes how tools authenticate, parse links, traverse node trees, resolve metadata, and record outputs. It is engineered for modularity, maintainability, and long-term adoption.

---

## Project Scope (as of May 10, 2025)

This project currently enables:

- **URL parsing**: Extract usable metadata from any valid Figma link
- **Scope resolution**: Convert fileKey / pageName / nodeId into a resolvable scope
- **Environment validation**: Confirm availability of required `.env` keys and API inputs
- **Diagnostics**: Log health checks and scope errors at the plugin/service level
- **CLI support**: Run quick checks and parsing from the terminal
- **Structured outputs**: Store results under relevant folders for traceability

---

## Project Structure

```
core/
  figma-api/       → Low-level Figma API interaction using personal tokens
  scope/           → Validates and resolves file/page/node metadata
  utils/           → Shared helpers like diagnostics, URL parsing

plugins/
  demo-mint-component-audit/   → Example plugin to validate component usage

services/
  (scaffolded)     → Reserved for background jobs, audits, snapshots

scripts/
  *.ts             → CLI tools to test and inspect environment or URLs

knowledge-base/
  (scaffolded)     → Reserved for changelogs, decisions, documentation
```

---

## Functional Modules

Each module is designed to work independently and can be consumed by plugins, services, or developer scripts.

| Module | Purpose |
|--------|---------|
| `parseFigmaUrl()` | Extracts fileKey, nodeId, and other parameters from a Figma link |
| `resolveScope()` | Resolves and verifies page and node info from fileKey/nodeId/pageName |
| `runDiagnostic()` | Validates `.env` configuration and logs diagnostics to local folder |
| `getFile()` | Wrapper to fetch data from the Figma REST API |
| `logDiagnostic()` | Writes output to timestamped logs scoped to plugin/service folders |

Each function is documented locally within its module folder, and individual responsibilities are clearly isolated to avoid cross-coupling.

---

## CLI Tools

Located in `/scripts` — these are internal developer tools for quick testing and validation.

| Script | Purpose |
|--------|---------|
| `test-env.ts` | Validates `.env` file, runs diagnostics, logs to `diagnostics/` folder |
| `parse-url.ts` | Parses any valid Figma link; supports `--resolve` and `--json` flags |

All CLI tools are written in TypeScript, executable via `npx tsx scripts/<tool>.ts`.

---

## Logging and Diagnostics

- Diagnostics are always written in the context of the service/plugin that runs them.
- Output is stored under a local `diagnostics/` folder within the invoking module.
- No central/global logs are maintained.
- All error states are explicit and structured to support debugging and CI integration.

---

## Design Principles

- **Modular by default** — Every module must be independently callable and replaceable
- **No side effects** — All inputs and outputs are explicit; no implicit context
- **Local responsibility** — Diagnostics and logs are always scoped to local context
- **Forward-compatible** — Parsers and snapshots are built to tolerate API evolution
- **Non-blocking by design** — Missing data yields structured error states, not uncaught exceptions
- **Contribution-aware** — Unsupported inputs return helpful fallback messages

---

## Next Milestones

- Implement centralized snapshot service
- Enable schema diffing between snapshots
- Generate changelogs and surface changes in file structure
- Add usage heatmaps and scoring capabilities to the demo plugin
- Expand link parser support (e.g., for projects, teams)
- Populate module-level `README.md` and contribution guidelines

---

## Status

- ✅ Architecture initialized and stable
- ✅ Core modules operational and reused across tools
- ✅ Diagnostic and logging framework in place
- ✅ URL-first workflow validated
- 🧩 Actively extending toward plugin/service authoring
