# Architecture

Proposed: Tauri 2 + React/TypeScript desktop UI; Rust native process/IPC boundary;
Node/TypeScript adapter sidecar only if needed, bundled for end users; SQLite
for local persistence. Core currently uses dependency-free JavaScript ESM
to permit quick tests without install. Migrate to TypeScript when interfaces stabilize.

UI -> typed IPC -> task coordinator -> adapter registry -> native CLI
                                  -> SQLite / artifact store

Entities: Project, Task, Run, AgentProfile, NativeSessionRef, Event, Artifact,
Approval, Handoff. Task ID stable across runs. Run ID unique per attempt.
Native session IDs are namespaced by adapter and never assumed transferable.

Adapter contract: detect, capabilities, start, stream events, cancel, resume
(if supported). Prefer Claude structured CLI output, Codex App Server and Pi RPC;
verify installed versions and documented protocols before choosing exact flags.
Normalize events but preserve raw sanitized records separately. No shell execution
from agent output. Approval is enforced by runtime, not prompt.

State transitions are deterministic; persist events and state atomically.
After crash mark in-flight runs interrupted unless proven alive; do not
automatically repeat writes. Serialize writers per workspace until worktree
isolation is implemented. Handoff previews structured context, not implicit
full transcript transfer. Never assume model output is trustworthy.

Security: local data is not necessarily offline: provider calls transmit context.
No credential copying, no raw tokens in logs, no arbitrary privileged IPC.
Same-user processes are not a security boundary. Future isolated credential
broker must expose narrowly scoped operations and require explicit approval.
