# System Diagnostic Routines

This file lists all system-level behaviors, constraints, and routines that must be checked regularly — either manually or via automated diagnostics.

This ensures the tooling remains modular, reliable, and agent-compatible.

---

## ✅ Routine: Scaffold Integrity

- Read all `scaffold.json` files under `examples/`
- Compare version with latest in `scaffold-changelog.md`
- If mismatch found, log a warning in diagnostics
- This check is built into `scripts/run-health-check.ts`

---

## 🔍 Additional Routines to Track

| Routine | Description |
|--------|-------------|
| `.env` validation | Ensures required keys are present and correctly formatted |
| Token resolution | Verifies access to test Figma file/page |
| Output file size check | Ensures diagnostics and snapshot files are not oversized |
| Snapshot schema check | Detects API schema changes that could break parsing |
| Dependency hygiene | Scans for untracked files or folders outside Git scope |

---

## 🧠 Agent Compatibility

This file is intended to serve as a stable input for agent-based systems that participate in maintaining or evolving this repository. Any new long-term expectation must be added here.
---

## ✅ Routine: Scaffold Template Change Detection

- Script: `scripts/check-scaffold-template-diff.ts`
- Computes a fingerprint of the template directory (e.g., `plugin@1.0.0`)
- Warns if any file inside it has changed since the last recorded snapshot
- Use `--update` to manually approve intentional changes

---

## ✅ Routine: Scaffolded Project Drift Detection

- Script: `scripts/check-project-vs-scaffold-drift.ts`
- Reads `scaffold.json` from each plugin
- Compares current folder state to the declared scaffold version
- Flags:
  - Extra or missing files
  - Modified core files
  - Unknown scaffold references

This ensures that plugin folders remain aligned with their scaffold contracts.