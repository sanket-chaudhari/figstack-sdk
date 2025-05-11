# 📦 Snapshot Service Changelog

This changelog tracks meaningful changes to the snapshot-service logic, structure, and output format.

---

## [Unreleased]
- Added `__meta.apiVersion` to all snapshot files
- Enforced required scope on all snapshot requests
- Planned support for multipart snapshots and `.meta.json`

---

## [0.1.0] - Initial Stable
- Created `getSnapshot()` service with required scope validation
- Supports `fileKey`, `pageName`, `frameIds`
- Writes structured `.json` output via plugins/services
