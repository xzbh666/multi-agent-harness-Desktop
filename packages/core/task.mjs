import { randomUUID } from 'node:crypto';

export function createTask({ title, objective, acceptanceCriteria = [] }) {
  if (typeof title !== 'string' || !title.trim() || typeof objective !== 'string' || !objective.trim()) {
    throw new TypeError('Task title and objective are required');
  }
  if (!Array.isArray(acceptanceCriteria) || acceptanceCriteria.some(x => typeof x !== 'string')) {
    throw new TypeError('Acceptance criteria must be strings');
  }
  return { id: randomUUID(), title, objective, acceptanceCriteria: [...acceptanceCriteria],
    status: 'created', plan: null, attempts: 0, revision: 0 };
}

const transitions = {
  created: { start_plan: 'planning', cancel: 'cancelled' },
  planning: { submit_plan: 'awaiting_approval', fail: 'failed', cancel: 'cancelled', interrupt: 'interrupted' },
  awaiting_approval: { approve: 'ready', revise: 'planning', cancel: 'cancelled' },
  ready: { start_execution: 'executing', cancel: 'cancelled' },
  executing: { submit_execution: 'reviewing', fail: 'failed', cancel: 'cancelled', interrupt: 'interrupted' },
  reviewing: { pass: 'completed', request_repair: 'ready', fail: 'failed', cancel: 'cancelled', interrupt: 'interrupted' },
  interrupted: { cancel: 'cancelled' },
  failed: {}, completed: {}, cancelled: {}
};

// Pure reducer; persistence and runtime side effects belong to the coordinator.
export function transition(task, action, payload = {}, { maxAttempts = 3 } = {}) {
  if (!Number.isInteger(maxAttempts) || maxAttempts < 1) throw new RangeError('Invalid attempt limit');
  const next = Object.hasOwn(transitions, task.status) && Object.hasOwn(transitions[task.status], action)
    ? transitions[task.status][action] : undefined;
  if (!next) throw new Error('Invalid transition: ' + task.status + ' / ' + action);
  if (action === 'submit_plan' && (typeof payload.plan !== 'string' || !payload.plan.trim())) {
    throw new Error('A nonempty plan is required');
  }
  if (action === 'request_repair' && task.attempts >= maxAttempts) throw new Error('Repair limit reached');
  if (action === 'start_execution' && task.attempts >= maxAttempts) throw new Error('Attempt limit reached');
  return { ...task, status: next, revision: task.revision + 1,
    plan: action === 'submit_plan' ? payload.plan : task.plan,
    attempts: task.attempts + Number(action === 'start_execution') };
}
