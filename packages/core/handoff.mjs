// Explicit allowlist: never spread arbitrary session objects or credential fields.
// Text may itself contain secrets; callers must preview/redact before transmission.
export function buildHandoff(task, { from, to, summary, artifacts = [], tests = [], openIssues = [] }) {
  for (const [key, value] of Object.entries({ from, to, summary })) {
    if (typeof value !== 'string' || !value.trim()) throw new TypeError(key + ' is required');
  }
  if (from === to) throw new Error('Handoff must target a different agent profile');
  for (const list of [artifacts, tests, openIssues]) {
    if (!Array.isArray(list) || list.some(x => typeof x !== 'string')) throw new TypeError('Expected string list');
  }
  return { schemaVersion: 1, taskId: task.id, taskRevision: task.revision,
    from, to, objective: task.objective, acceptanceCriteria: [...task.acceptanceCriteria],
    plan: task.plan, summary, artifacts: [...artifacts], tests: [...tests], openIssues: [...openIssues] };
}
