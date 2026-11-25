# Agent development contract

Read docs/HANDOFF.md, docs/PRD.md, docs/ARCHITECTURE.md and docs/PLAN.md first.
Task first; independent CLI runtimes, no mandatory default model, local-first data,
free platform, installable macOS desktop application, user-owned API/subscription.
Never silently change explicitly selected agent/model. Never modify existing CLI
configuration or copy OAuth tokens. Never log secrets. Use structured process
arguments, not shell interpolation. CLI authentication reuse is not isolation.
Do not bypass native approvals. Treat agent output as untrusted data.
Keep changes modular and tested. Record decisions, assumptions, actual test
results and unfinished work in docs/DECISIONS.md and docs/HANDOFF.md.
Use stable task IDs and separate run/session IDs. Handoffs must contain goal,
acceptance criteria, approved plan, relevant artifacts, test results and open issues.
Do not claim successful real CLI execution or desktop packaging without evidence.
