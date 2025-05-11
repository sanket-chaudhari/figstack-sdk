# Knowledge Base

This folder contains long-form documentation, codified decisions, contribution guidelines, and architecture principles. It serves as the institutional memory of this repository and should be kept in sync with the evolving system.

---

## 📌 Purpose

- Record system-wide design principles and mental models
- Explain decision tradeoffs and rationale
- Define contribution guidelines and non-negotiables
- Document changelogs and known caveats
- Serve as input to onboard new contributors (human or agent)

---

## 📁 Suggested Files

```plaintext
knowledge-base/
├── design-principles.md       # Core beliefs guiding the repo
├── decisions.md               # Documented trade-offs and rationale
├── changelog.md               # High-level evolution of the codebase
├── contribution-guide.md      # Expectations from contributors
└── terminology.md             # Shared vocabulary for clarity and reuse
```

---

## 🧱 Writing Guidelines

- Be precise and neutral — this is not a marketing document
- Every principle should come from experience or intent
- Link from other README files to here as a source of truth
- Favor clarity and traceability over completeness

---

## 📎 Example Topics to Capture

- How modularity is enforced
- Snapshot philosophy and downstream separation
- Fallback rules for scope resolution
- Why diagnostics are always scoped locally
- When to extend `core/` vs when to localize functionality

---

## ✅ Summary

This folder is the shared brain of the system. If something is important and not captured elsewhere — it belongs here.
