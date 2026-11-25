# Handoff to local Codex

## Current state
Initial repository foundation created remotely by ChatGPT. The core state
machine, handoff schema and unit test source are included. No real local CLI,
macOS build, npm test or dependency install has been executed in this session.
Do not treat code presence as a passing test.

## Start here
1. Read AGENTS.md, PRD.md, ARCHITECTURE.md, PLAN.md, DECISIONS.md.
2. Run node --version and npm test. Fix any failures; record results.
3. Inspect installed Claude Code, Codex and Pi paths and versions with user consent.
   Do not read/copy auth files. Verify documented CLI interfaces against versions.
4. Create adapter spikes using a disposable workspace, preserving native approvals.
   Capture redacted structured events and prove exact selected model, cancellation
   and session resume where available. If unavailable, show capability as false.
5. Scaffold Tauri 2 + React/TypeScript under apps/desktop using official tooling.
   Keep native permissions narrow. No arbitrary shell command IPC.
6. Implement SQLite persistence and minimal task detail/run timeline UI.
7. Demonstrate a real approved Claude -> Codex -> Pi/DeepSeek workflow.
8. Build local macOS ARM64 app and DMG, document unsigned build status.

## Non-goals
Do not start with dynamic LLM routing, cloud sync, credential vault, full history
import or elaborate UI before the real adapters and task persistence are verified.
Do not replace the CLI's existing settings. Ask before installing system dependencies.
Use a feature branch and update this handoff with verified commands and blockers.
