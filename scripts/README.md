# Developer Scripts

This folder contains CLI tools intended for use by developers during local development, diagnostics, or testing.

These scripts are designed to be run via `npx tsx` and operate within the current project's scope and `.env` configuration.

---

## 📌 Purpose

- Test if `.env` is correctly configured
- Run diagnostics and health checks
- Parse and resolve Figma URLs
- Trigger snapshot generation, changelog detection, or scoring jobs

---

## 📁 Folder Structure

```plaintext
scripts/
├── test-env.ts            # Validates .env and Figma token
├── parse-url.ts           # Parses any valid Figma link
├── run-health-check.ts    # Runs scoped validation and diagnostics
└── ...                    # Add new scripts here as needed
```

---

## 🧪 Usage

Run any script using:

```bash
npx tsx scripts/test-env.ts
npx tsx scripts/parse-url.ts "https://www.figma.com/file/abc123?node-id=0%3A1" --resolve
```

---

## 🧱 Design Principles

- **Clarity**: Output should be human-readable and useful during development
- **Scope-Aware**: Scripts should rely on `.env` or CLI flags for context
- **Non-invasive**: Scripts should not write to disk unless explicitly intended

---

## 🧩 Contribution Guidelines

- Name scripts clearly using kebab-case
- Prefer local scoped behavior over global state changes
- Document inputs, outputs, and expectations inside the file

---

## ✅ Summary

This folder is the developer's toolbox — useful for testing the infrastructure layer, resolving Figma file metadata, and executing workflows on demand.
