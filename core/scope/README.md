# Scope Resolution Module

This module provides logic for resolving scoped references to Figma resources — including files, pages, and nodes — into validated metadata.

It abstracts the complexity of checking whether a given combination of fileKey, pageName, or nodeId is valid and returns a structured result used by downstream services and diagnostics.

---

## 📌 Responsibilities

- Resolve `fileKey`, `pageName`, and `nodeId` into a usable scope
- Validate that a file exists
- Validate that a page and/or node exists within the file
- Return structured metadata: file name, node name, type, etc.
- Standardize failure modes (e.g. not found, ambiguous match)

---

## 🚫 Non-Responsibilities

- This module does not fetch raw file data or traverse node trees
- It does not implement diagnostics or reporting
- No logging or file writes occur here

---

## 📁 Folder Structure

```plaintext
core/
└── scope/
    ├── resolveScope.ts      # Main resolution logic
    └── types.ts             # Internal type definitions for scope metadata
```

---

## 🔧 Example Usage

```ts
import { resolveScope } from '@/core/scope/resolveScope';

const result = await resolveScope({
  fileKey: 'abc123',
  pageName: 'Main',
  nodeId: '0:1'
});

if (result.valid) {
  console.log(result.nodeName); // e.g. "Main CTA"
}
```

---

## 🧱 Design Principles

- **Determinism**: Same inputs always yield the same outputs.
- **Non-interactive**: Functions return results, not prompts or questions.
- **Structured fallback**: All error conditions return structured metadata, never null or undefined.

---

## 🧩 Return Structure

```ts
type ScopeResolutionResult = {
  valid: boolean;
  fileName?: string;
  pageFound?: boolean;
  nodeResolved?: boolean;
  nodeName?: string;
  nodeType?: string;
  error?: string;
}
```

---

## 🧪 Testing Strategy

- Functions are stateless and can be unit tested in isolation.
- Figma API should be mocked in integration tests.

---

## 📍 Future Extensions

- Allow filtering by component instance type
- Add support for resolving nodes by name or label pattern
- Graceful resolution of multi-page documents

---

## ✅ Summary

This module provides the core logic that allows plugins and services to safely understand the structure of a Figma document before acting on it. It enables predictable, API-safe, non-breaking tooling at scale.
