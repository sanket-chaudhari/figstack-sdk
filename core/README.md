# ✅ Core Modules

This folder provides the foundational infrastructure for interacting with Figma at a low level. Each submodule encapsulates a specific type of core behavior and is designed to be reusable, testable, and free of application logic.

---

## 📌 Responsibilities

- Provide scoped access to Figma REST API endpoints
- Handle resolution of `fileKey`, `pageName`, and `nodeId`
- Offer shared utility functions used across plugins and services
- Act as the central dependency for all project logic
- Validate diagnostic metadata and scaffold version compliance

---

## 🗂️ Folder Structure

```plaintext
core/
├── figma-api/   # Raw HTTP wrapper for accessing Figma REST API
├── scope/       # Functions for resolving metadata and node context
└── utils/       # Stateless helpers: formatters, diagnostics, parsers
```

Each folder has its own scoped `README.md`.

---

## 🧭 Design Principles

- **Strict Separation** – This folder must not import from `examples/`, `scripts/`, or `services`
- **No I/O** – No logging, file writing, or CLI interaction is permitted here
- **Statelessness** – All functions should be deterministic and input-driven
- **Composable** – Higher-level modules should be able to import any part of `core/` without circular dependencies

---

## 🧪 Testing Strategy

- All core modules are tested in isolation via mock inputs
- Schema consistency and shape validation are monitored using snapshot diffs
- Diagnostic utilities simulate partial failures to ensure graceful degradation
- Scaffold drift checks are validated against `scaffold-template.json` in utils

---