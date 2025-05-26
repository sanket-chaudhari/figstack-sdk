# ai-handshake Integration Context

This document explains the rationale, history, and current transition of this repository (`figstack-sdk`) to the `ai-handshake` collaboration protocol (v1.1.0).

---

## 📦 Original Purpose

This project was originally created to support modular tooling around the Figma API and SDK interactions. It included CLI diagnostics, core modules, and infrastructure for plugin/service execution. Initial development followed a pragmatic rhythm led by structured human–AI collaboration, but without a formalized protocol layer.

---

## 🤝 Why Transition to `ai-handshake`

The new `ai-handshake` protocol (v1.1.0) introduces:

- Milestone-based planning and build cycles
- Agent-aware file generation and changelog tracking
- Modular Code Payload (MCP) structure for controlled code changes
- Clear documentation roles and system ownership conventions

By adopting this protocol, this repo becomes future-compatible with intelligent agents, reusable tooling, and governance systems.

---

## 🔁 What’s Changing

| Area               | Before                  | After (ai-handshake)                |
|--------------------|--------------------------|--------------------------------------|
| Planning Rhythm    | Task-based               | Milestone-structured                 |
| File Updates       | Scripted/manual          | MCP-driven (payloads + commits)      |
| Documentation Flow | Ad hoc                   | Role-driven + structured READMEs     |
| Agent Access       | Informal context         | Explicit `.agentrc.json` contract    |

---

## 🔐 Compatibility

The previous working mode is preserved. This change is additive — all existing CLI tools and services remain operational.
