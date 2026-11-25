# Development plan

## P0: local feasibility (next)
- [ ] Inspect macOS CLI installation paths and versions, including GUI PATH.
- [ ] Verify native authentication reuse without reading token files.
- [ ] Spike real Claude, Codex, Pi sessions, structured streaming and cancellation.
- [ ] Test session resume and exact model selection; document unsupported features.
- [ ] Record actual commands, redacted output and failure cases.

## v0.1: desktop foundation
- [ ] Scaffold Tauri 2 + React/TS app with minimal capabilities and IPC.
- [ ] SQLite migrations, task/project/run repository, restart recovery.
- [ ] Adapter registry and three real adapters; fixture-based protocol tests.
- [ ] Task list, task details, agent selector, run timeline and handoff preview.
- [ ] Validate Claude plan -> approval -> Codex execution -> Pi review locally.
- [ ] Build ARM64 .app and .dmg; document signing/notarization limitations.

## v0.2+: workflow
- [ ] Persist workflow templates and approval records, bounded repair.
- [ ] Concurrency limits, worktree isolation, crash recovery.
- [ ] Search/archive/export, native history import with consent.
- [ ] Optional remote runners, credential broker, audit and cost accounting.

## Definition of done
Unit tests and adapter fixture tests pass; actual CLI and desktop smoke tests
recorded separately. No fake execution indicators. No platform API fee.
