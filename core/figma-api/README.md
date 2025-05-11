# Figma API Core

This module provides **authenticated, low-level access to the Figma REST API**. It acts as a thin, stable interface between your project and Figma’s API surface, abstracting the request setup and authentication process, while allowing downstream modules to focus on higher-level logic.

---

## 📌 Responsibilities

- Authenticated HTTP access to the Figma API
- Centralized handling of API headers and tokens
- Wrapper functions for fetching:
  - Files
  - Nodes within files
  - Pages
  - Team/project metadata (future scope)

---

## 🚫 Non-Responsibilities

- **No schema parsing**
- **No business logic (e.g. diagnostics, scoring, transformation)**
- **No caching or persistence**
- **No CLI commands or logging**

This module is intentionally minimal and must remain stateless and side-effect free.

---

## 📁 Folder Structure

```plaintext
core/
└── figma-api/
    ├── figma-api.ts      # Core HTTP wrapper for REST API requests
    └── index.ts          # Re-exports and convenience exports (optional)
```

---

## 🔐 Authentication

This module expects an environment variable:

```env
FIGMA_PERSONAL_ACCESS_TOKEN=your-token-here
```

This token must be scoped appropriately for read access to the Figma resources in question.  
Reference: [Figma Developer Docs – Access Tokens](https://www.figma.com/developers/api#authentication)

---

## 🔧 Example Usage

```ts
import { getFile } from '@/core/figma-api/figma-api';

const data = await getFile('a1b2c3d4f5'); // fileKey
console.log(data.document.name); // "Design Playground"
```

```ts
import { getNode } from '@/core/figma-api/figma-api';

const node = await getNode('a1b2c3d4f5', '0:123'); // fileKey + nodeId
console.log(node.name); // "CTA Button"
```

All responses are typed and reflect the Figma REST API structure.

---

## ⚙️ Key Exports

| Function     | Purpose                           |
|--------------|-----------------------------------|
| `getFile`    | Fetch full file object by key     |
| `getNode`    | Fetch single node within a file   |
| *(more planned)* | e.g. `getProject`, `getTeam`   |

---

## 🧱 Design Principles

- **Minimalism:** This module should be dependency-free and framework-agnostic.
- **Isolation:** Does not know about any higher-level project logic.
- **Predictability:** Always returns clean JSON data or throws meaningful errors.
- **Portability:** Can be reused across plugins, services, or CLI utilities.

---

## 🚨 Change Safety

This module is used by multiple services and plugins. Changing its structure or API contracts **may break downstream consumers** such as:

- `snapshot-service`
- `diagnostic-utils`
- `run-health-check.ts`

If you must refactor:
- Update all call sites
- Update integration tests if available
- Consider a versioned interface

---

## 🛠️ Extensibility Guidelines

If you need to add a new Figma endpoint wrapper:

1. Add a new function to `figma-api.ts` with clear params and return types.
2. Do not cache, transform, or log anything.
3. Export it via `index.ts` if intended for use outside this module.
4. Update this README.

Example:

```ts
export async function getProject(projectId: string): Promise<ProjectResponse> {
  const url = `https://api.figma.com/v1/projects/${projectId}`;
  return fetchFigmaJson(url);
}
```

---

## 🧪 Testing Strategy

Unit testing is not enforced here, since responses depend on external API state. Integration tests that mock Figma responses should be written at the service level (e.g., in `snapshot-service`).

---

## 📍 Future Considerations

- Add support for rate-limit handling and retries
- Add `getTeam`, `getProject` wrappers
- Add dry-run CLI to test authentication

---

## ✅ Summary

This folder is your foundation for reliable Figma API integration. Keep it clean, modular, and forward-compatible.
