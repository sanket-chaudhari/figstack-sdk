# Example Services

This folder contains demo services built on top of the core infrastructure modules. These services are distinct from plugins in that they are generally **batch-oriented, long-running, or CI-integrated tools** rather than interactive or user-facing features.

---

## 📌 Purpose

- Demonstrate snapshotting, changelog generation, or cross-file audits
- Test usage of `scope`, `figma-api`, and `utils` at scale
- Provide reference for implementing internal automation

---

## 📁 Folder Structure

```plaintext
examples/
└── services/
    ├── snapshot-service/
    └── ...
```

Each service may contain:
- `index.ts` – entry point
- `modules/` – internal service logic
- `snapshots/` – API outputs or diffs stored locally
- `diagnostics/` – scoped diagnostics (per service)

---

## 🧱 Design Principles

- **Idempotence** – Services can be run repeatedly without breaking state
- **Logging Locality** – Logs and snapshots live within the service folder
- **Clean Interfaces** – Services do not mutate or own shared state

---

## 🧪 Testing Strategy

- Use `.env` variables to scope test runs
- Write assertions as simple integration logs or CI-level checks

---

## 🧩 Sample Use Case

- Run a snapshot every Friday to capture the structure of a shared Figma file
- Use `compareSnapshotShapes()` to detect schema changes
- Log changes to `changelog.md`

---

## ✅ Summary

This folder is where intelligent service logic is tested and validated. While plugins are meant for discrete interactions, services can operate at scale or be integrated into CI flows.

All examples here are generic, test-oriented, and free of proprietary logic.
