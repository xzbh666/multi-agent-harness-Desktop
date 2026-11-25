# Multi-Agent Harness Desktop (MAH)

**One workspace. Multiple agents. Shared tasks.**

A free, open-source, local-first desktop platform for orchestrating Claude Code, Codex, Pi, Gemini CLI and other independent agents. Bring your own agents, APIs and subscriptions. No paid platform subscription or mandatory default LLM.

一个以任务为中心的本地桌面 Agent 编排平台，而非另一个聊天客户端。

## Development status

Foundation only: deterministic task/workflow core and tests, desktop architecture and handoff specifications. Real CLI integrations, SQLite persistence and Tauri packaging are not yet implemented or verified.

## Quick start (core only)

Requires Node.js 22+.

```sh
npm test
```

For the next development steps read [HANDOFF](docs/HANDOFF.md), [PLAN](docs/PLAN.md), [ARCHITECTURE](docs/ARCHITECTURE.md), [PRD](docs/PRD.md) and [AGENTS](AGENTS.md).

## Target workflow

Claude Code plans → user approves → Codex implements → Pi/DeepSeek reviews → bounded repair or completion. All stages belong to one task ID and share explicit context.

## License

MIT.
