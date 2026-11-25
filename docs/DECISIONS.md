# Decisions and assumptions

- D001: Task-first, multiple independent CLI agents per task; no mandatory LLM scheduler.
- D002: macOS ARM64 first, installable desktop app, proposed Tauri 2.
- D003: MIT and local-first; BYO agents/keys/subscriptions.
- D004: use official structured CLI interfaces; capability-aware adapters.
- D005: explicit handoff rather than claiming lossless internal-context migration.
- D006: dependency-free JS core initially, TypeScript desktop/adapter layer later.
- D007: no desktop runtime scaffold in this initial core commit; local Codex
  should generate the official Tauri template and verify the native build.
- Open: exact CLI flags, process lifetime, persistence schema migrations,
  desktop signing, per-agent sandbox design and sidecar packaging.
