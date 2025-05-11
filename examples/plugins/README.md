# Example Plugins

This folder contains non-production demo plugins built using the core infrastructure of this project. These examples serve as implementation references and scaffolding for teams looking to build production-grade Figma plugins on top of this toolkit.

---

## 📌 Purpose

- Showcase usage of shared core modules (`scope`, `figma-api`, `utils`)
- Demonstrate diagnostic workflows
- Explore scoring, audits, or reporting logic
- Serve as templates for internal or organization-specific tools

---

## 📁 Folder Structure

```plaintext
examples/
└── plugins/
    ├── demo-component-audit/
    └── ...
```

Each folder contains an isolated plugin with its own:
- `index.ts` entry point
- `config.ts` or settings if needed
- `diagnostics/` output (written locally)
- Optional submodules (`scorers/`, `analyzers/`, `report/`)

---

## 🔧 Plugin Characteristics

- Plugins run against specific Figma files or pages, defined by scope
- Each plugin is expected to:
  - Pull data using `core/` modules
  - Process or analyze the data
  - Output logs, scores, or reports to a local folder
- Plugins should not contain shared infrastructure — only logic unique to that use case

---

## 📎 Usage Example

```bash
npx tsx examples/plugins/demo-component-audit/index.ts
```

---

## 🧱 Design Principles

- **Encapsulation**: Each plugin is isolated and owns its own output folder
- **Clarity**: Output files should be human-readable and well-scoped
- **Scalability**: New plugins should be scaffolded by cloning an existing folder

---

## 🔒 IP Safety

These plugins are **examples only** and do not contain organization-specific logic.  
All naming and logic must remain generic and reusable.

---

## ✅ Summary

This folder is your playground for composing and testing plugin logic using the shared infrastructure. Each plugin is a self-contained experiment in how to interface with Figma data.
