# Scaffolding Contract

This document defines the expectations and structural rules for all scaffolded projects generated via the internal scaffolding tools in `scripts/`.

---

## 🔧 Plugin Scaffold (plugin@1.0.0)

### Required Files
- `index.ts`: Main execution entry point
- `diagnostics/`: Local folder to store runtime outputs
- `scaffold.json`: Contains metadata like scaffold version
- `README.md`: Describes plugin purpose, inputs, and diagnostics scope

### Core Imports
- Must use utilities from `core/` only
- Must resolve scope using `core/scope/resolveScope.ts`

### Output Behavior
- Diagnostic files must be saved to `diagnostics/`
- Snapshot logic (if any) must respect `snapshots/` scoping per plugin

---

## 🛡️ Change Management

- If any structural expectation changes, the `scaffold-changelog.md` must be updated.
- Each generated scaffold must include a version string stored in `scaffold.json`.

---

## 🧩 Future Notes

Additional scaffold types (e.g., `service`, `report`, `script`) will define their own sub-contracts in this file.
