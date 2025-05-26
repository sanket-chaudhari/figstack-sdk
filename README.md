# figstack-sdk

The `figstack-sdk` is a modular, agent-compatible developer toolkit for building plugins, services, and diagnostics around Figma files, tokens, components, and system usage. It is designed to support AI-assisted workflows, manual scripting, and CI-driven automation.

---

## ✅ Project Purpose

This repository contains core modules and scaffolding patterns that support:

- Traversing and reading Figma files using the REST API
- Parsing Figma links and resolving node scopes
- Running scoped diagnostics with readable logs
- Generating and comparing structured snapshots
- Building plugins and services that follow system conventions

It supports both human developers and intelligent agents operating under protocol control.

---

## 🧩 Protocol & Governance

This repository follows the [ai-handshake](https://github.com/sanket-chaudhari/ai-handshake) collaboration protocol.

- 📄 Current protocol version and configuration can be found in `.agentrc.json`
- 📚 Transition context is documented in: `docs/handshake-context.md`
- 🧠 All updates are tracked using Modular Code Payloads (MCPs)
- 📌 Committed changes reflect milestones, module evolution, or architecture shifts

---

## 🧱 Folder Structure (as of latest integration)

```
core/                  → Authenticated Figma API clients, scope resolution logic
utils/                 → Stateless utilities (parsing, logging, fallbacks)
scripts/               → CLI developer tools for testing and validation
plugins/               → Functional tools built using the SDK
services/              → Long-running or batch-mode tools (scaffolded)
mcp/                   → Local execution agent for modular code payloads
diagnostics/           → Structured logs generated per plugin or scope
scaffold-templates/    → Reusable plugin/service bootstrap templates
docs/                  → Architecture, protocol, changelog, and version maps
```

---

## 🧪 CLI Tooling

This SDK provides scoped developer tools using `tsx`:

| Script                  | Purpose                                      |
|--------------------------|----------------------------------------------|
| `scripts/test-env.ts`   | Validate `.env` and project setup            |
| `scripts/parse-url.ts`  | Normalize any valid Figma link               |
| `scripts/init-plugin.ts`| Scaffold a new plugin using internal template|

Run any script using:

```bash
npx tsx scripts/<script>.ts
```

---

## 📁 Logs and Outputs

All outputs are scoped to the plugin/service/module that generated them.

- Snapshots → `snapshots/<plugin>/...`
- Diagnostics → `diagnostics/<plugin>/...`
- Reports → may be scoped internally by service

This maintains traceability and prevents global log pollution.

---

## ✍️ Contribution Guidelines

- Use MCPs for all agent-authored file changes
- All module folders must include a `README.md`
- Any new functionality must log scoped outputs and update `changelog.md`
- Human developers should review `.agentrc.json` for configuration expectations

---

## 📌 Active Protocol Hooks

- `docs/handshake-context.md` — migration background
- `docs/mcp-agent.md` — future GitHub integration notes
- `docs/changelog.md` — live log of milestone-tagged commits
- `docs/version-map.md` — system version alignment

---

This system is now protocol-aware and ready for agent-based iteration and long-term maintainability.
