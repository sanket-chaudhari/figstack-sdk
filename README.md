# Figma Tooling Infrastructure

This repository provides a modular infrastructure layer for building Figma-integrated services, diagnostics, and plugins. It is designed to support scalable automation and inspection workflows built on top of the Figma REST API.

This project is intended as general-purpose developer tooling. It avoids all product- or organization-specific logic and is structured to allow safe reuse across professional environments.

---

## Scope

This repository provides core modules and utilities that support:

- Parsing Figma links into structured metadata
- Resolving scopes (fileKey, pageName, nodeId) for downstream processing
- Fetching data from the Figma REST API
- Running environment-level diagnostics
- Storing snapshot and analysis outputs in a structured format
- Composing plugins and services without cross-coupling

---

## Folder Structure

```bash
core/              # Low-level API access, scope resolution, Figma clients
utils/             # Reusable utilities: diagnostics, formatters, link parsers
examples/          # Example plugins and services that consume the core infra
scripts/           # CLI tools for diagnostics, snapshotting, and testing
mcp/               # MCP agent for controlled, structured file generation
knowledge-base/    # Design decisions, changelogs, contribution guidance
diagnostics/       # Diagnostic logs and health reports (per service/plugin)
```

---

## Design Principles

This repository is built with the following non-negotiable principles:

- **Modularity**: All components and utilities are self-contained and replaceable. No interdependencies across scope boundaries.
- **Local Responsibility**: Plugins and services store logs and outputs within their own folder context.
- **No IP Risk**: No business-specific logic, naming, or configuration is allowed in this repository.
- **Durability**: All utilities are written to tolerate partial data, evolving API contracts, and malformed input.
- **Traceability**: All logs, snapshots, and diffs are timestamped and scoped to the plugin or service that created them.
- **Explicit Boundaries**: Scope resolution, diagnostics, snapshotting, and change analysis are clearly separated in design and code.

---

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file:

```env
FIGMA_PERSONAL_ACCESS_TOKEN=figd_...
TEST_FILE_KEY=abc123
TEST_NODE_ID=99:42
```

3. Run diagnostics:

```bash
npx tsx scripts/test-env.ts
```

4. Parse a Figma URL and resolve scope:

```bash
npx tsx scripts/parse-url.ts "<figma link>" --resolve
```

---

## Example Use Cases

- Build a plugin that scores component usage across files
- Run CLI audits for token adoption
- Capture structural snapshots of Figma files for changelog generation
- Resolve node metadata from shared links using a safe parsing layer
- Scaffold custom design quality checks and CI hooks

---

## License

This repository is intended for public distribution.  
All code is written from first principles using only the public Figma REST API.  
No organizational data or intellectual property is present.

---

_Last updated: 2025-05-11_
