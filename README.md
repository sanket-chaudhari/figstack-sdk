# Figma Tooling Infrastructure

This repository provides a modular, extensible foundation for building Figma automation tools, plugins, and internal services. It is designed to serve as an open-source interface layer between your local developer environment and the Figma REST API — enabling audits, reports, adoption tracking, token extraction, plugin scaffolding, and more.

---

## 🔧 Core Capabilities

- Authenticated access to Figma’s REST API via personal tokens
- Snapshot service to extract scoped Figma JSON (file, page, frame, etc.)
- Schema comparison between snapshots to detect structural drift
- Component usage parsing for adoption audits
- Plugin scaffolding to accelerate internal UI tooling
- CLI-based diagnostics and health reports

---

## 📁 Folder Structure

```plaintext
core/                 → Foundational API wrappers and metadata utilities
diagnostics/          → Scripts and logs for validating .env and scope setup
examples/             → Reference plugins and services using core infra
knowledge-base/       → Architecture decisions, principles, changelogs
mcp/                  → Temporary workspace for MCP (manual copy-paste) I/O
scripts/              → CLI tooling for developers (test-env, health-check)
services/             → Internal backend jobs like snapshot-service
```

---

## 🧱 Modular Philosophy

Each folder is self-contained and explicitly avoids circular dependencies. The `core/` folder is considered the lowest layer and must not import from `scripts/`, `examples/`, or `services`.

Plugins and services are allowed to use any module in `core/`.

---

## 🚀 Scaffolding

We provide a minimal but complete plugin scaffold to help internal teams get started quickly.

Use:

```bash
npx tsx scripts/init-plugin.ts my-new-plugin
```

This will:

- Generate a new plugin folder in `examples/plugins/`
- Add a sample `plugin.json`, `code.ts`, `ui.html`
- Inject a README explaining how to start development

### Versioning & Maintenance

The scaffolding template is version-controlled and stored inside `core/utils/scaffolding/`. Any updates to the scaffold template should:

- Be followed by a regeneration of the golden snapshot
- Trigger a changelog entry
- Be communicated to dependent teams if in active use

Scaffold diffs can be tested using:

```bash
npx tsx scripts/check-scaffold-drift.ts <projectFolder>
```

---

## 📌 Design Principles

- **Modular by Default** – All logic is split across reusable units
- **No IP Leakage** – This repo must not contain any organization-specific tokens, names, or links
- **Composable** – All building blocks must work independently
- **Readable by AI Agents** – Every module must be clearly documented for codegen and LLM traversal

---

## 🧪 Testing Strategy

We follow a progressive scaffolding-based QA approach:
- Run diagnostic scripts on `.env` and `scope`
- Validate snapshot parsing through example plugins
- Surface diff logs on breaking schema changes

---

## 📎 Contribution Model

- Clone or fork this repo
- Add your utility as a module inside `core/utils/`
- Follow the naming, README, and documentation conventions
- Test against your `.env` using `scripts/test-env.ts`

When in doubt, read `knowledge-base/README.md`

---

## 📆 Next Milestones

- Implement centralized snapshot service
- Add usage scoring and heatmaps for component audits
- Expand URL parser to support project/team views
- Publish scoped NPM packages

---

## 🧠 Suggested Usage

This repo is best used as a low-level base — you can:
- Fork it for your company’s design system monitoring
- Use the plugins folder to test quick internal tooling
- Run health-check scripts weekly via CRON
- Maintain snapshot logs to see what’s changing in your Figma universe

---

> This project is actively maintained and intended to be the seed for larger open-source design infrastructure tooling.

---

26 May 2025:

## 🤖 Protocol Update Notice

This repository has adopted the [`ai-handshake`](https://github.com/sanket-chaudhari/ai-handshake) protocol (v1.1.0) as of May 2025.

All AI-human collaboration is now structured around:

- **Milestones** and explicit build steps  
- **Modular Code Payloads (MCPs)** for file updates  
- **Agent-readable configuration** via `.agentrc.json`  
- **Folder-level READMEs and changelogs** for traceability  

This protocol improves clarity, reviewability, and long-term maintainability of the codebase.  
You can find the full context in `docs/handshake-context.md`.
