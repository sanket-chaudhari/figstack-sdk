# MCP (Minimal Change Protocol)

This folder contains the interface and agent logic for managing file writes in a controlled, predictable way — especially useful when using AI-assisted workflows or batch tools that generate or mutate files.

---

## 📌 Purpose

- Accept structured input describing intended file changes
- Perform safe, atomic write operations into the repo
- Maintain auditability and separation of code generation from code review

---

## 📁 Typical Contents

```plaintext
mcp/
├── input.json        # Declares desired file updates or creations
├── output.json       # Optional response (e.g. for success/failure logs)
└── mcp-agent.ts      # Reads input.json and writes files safely
```

---

## 🧪 Usage

Write an `input.json` like:

```json
{
  "files": [
    {
      "path": "scripts/example.ts",
      "content": "// this is a test"
    }
  ],
  "commitMessage": "Add example script"
}
```

Run the agent manually:

```bash
npx tsx mcp/mcp-agent.ts
```

---

## 🧱 Design Principles

- **Explicitness**: Changes are always declared up front in a machine-readable form
- **Isolation**: The MCP system is independent of any logic in `core/`, `examples/`, etc.
- **Auditability**: All file writes can be reviewed before commit

---

## 🛡️ Git Hygiene

MCP input/output files should never be committed unless you're debugging or versioning agent state.

---

## ✅ Summary

The `mcp/` folder exists to enable machine-generated file changes in a way that respects the modularity and cleanliness of the repository. Think of it as a safe middle layer between tools and code.
