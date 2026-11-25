# Product requirements

## Goal
A standalone desktop operating platform for independent AI agents; the task is
the canonical unit, not a conversation or model. Initial target: macOS ARM64.
No platform subscription. User supplies existing CLI authentication/API.

## MVP acceptance
- Create, rename, search and reopen projects/tasks after restart.
- Discover Claude Code, Codex and Pi executables; show version and capabilities.
- Run a real task with each CLI via documented interfaces, stream status/output,
  preserve native session identifiers where supported, cancel safely.
- One task contains separate agent runs. User can approve a plan and hand off
  to a different agent with a preview of shared context.
- Explicit agent/model selection; unavailable selection fails visibly.
- SQLite persists task state, run metadata and sanitized event logs.
- Package an installable .app/.dmg; no manually started web server.
- No credential capture or automatic config modification.
- Display actual runtime errors; distinguish agent success from test success.

## Later
Reusable DAG workflows, bounded review/repair, parallel worktree isolation,
history import, remote agents, optional local credential broker, budget tracking,
knowledge integrations and cross-platform packaging. No full conversation
migration or automatic credential isolation promises in MVP.
