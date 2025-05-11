# Utilities — Shared Logic Module

This folder contains stateless, reusable utility functions that support the broader system. These utilities are used across modules for tasks like parsing, formatting, logging, and environment validation.

---

## 📌 Responsibilities

- Figma URL parsing (e.g. extracting `fileKey`, `nodeId`, etc.)
- Diagnostic result formatting and file writing
- Shared string or object transformation utilities
- Schema shape comparisons

---

## 🚫 Non-Responsibilities

- No Figma API access or data fetching
- No business logic or domain-specific assumptions
- No `.env` resolution or token validation

---

## 📁 Folder Structure

```plaintext
core/
└── utils/
    ├── parseFigmaUrl.ts         # Extracts metadata from valid Figma URLs
    ├── diagnostics.ts           # Utilities to run and log diagnostics
    ├── compareSnapshotShapes.ts # Compares shape of two API snapshot responses
    └── format.ts                # General formatting utilities
```

---

## 🔧 Example Usage

```ts
import { parseFigmaUrl } from '@/core/utils/parseFigmaUrl';

const result = parseFigmaUrl('https://www.figma.com/file/abc123?node-id=0%3A1');
console.log(result.fileKey); // abc123
console.log(result.nodeId);  // 0:1
```

---

## 🧱 Design Principles

- **Purity**: All functions are pure and produce no side effects.
- **Reuse**: Shared logic should live here if used in more than one module.
- **Resilience**: All utilities gracefully handle edge cases and malformed inputs.

---

## 📍 Contribution Guidelines

When adding a utility:

- It must not introduce state or implicit dependencies
- It must not mutate input
- It must be testable in isolation

---

## 🧪 Testing Strategy

- Pure functions → unit tested in isolation
- Diagnostic utilities → tested via CLI-level smoke tests

---

## ✅ Summary

This module acts as the foundational glue for the rest of the project. If it's not domain logic, a Figma API call, or CLI orchestration — it's likely a utility, and belongs here.
