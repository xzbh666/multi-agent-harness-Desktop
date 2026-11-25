import test from 'node:test';
import assert from 'node:assert/strict';
import { createTask, transition } from '../packages/core/task.mjs';
import { buildHandoff } from '../packages/core/handoff.mjs';

const fresh = () => createTask({title:'Example',objective:'Implement feature',acceptanceCriteria:['Tests pass']});
const ready = () => transition(transition(transition(fresh(),'start_plan'),'submit_plan',{plan:'Write tests'}),'approve');

test('full approved lifecycle preserves task identity', () => {
  const task = fresh();
  let current = transition(task,'start_plan');
  current = transition(current,'submit_plan',{plan:'Write tests'});
  for (const action of ['approve','start_execution','submit_execution','pass']) current = transition(current,action);
  assert.equal(current.status,'completed');
  assert.equal(current.id,task.id);
  assert.equal(current.revision,6);
  assert.equal(task.status,'created');
});
test('cannot bypass approval or submit empty plan', () => {
  assert.throws(() => transition(fresh(),'start_execution'));
  assert.throws(() => transition(transition(fresh(),'start_plan'),'submit_plan',{plan:' '}));
});
test('repair is bounded', () => {
  let task = ready();
  for (let i=0;i<3;i++) {
    task = transition(transition(task,'start_execution'),'submit_execution');
    if(i<2) task = transition(task,'request_repair');
  }
  assert.throws(() => transition(task,'request_repair'),/limit/);
});
test('handoff carries explicit fields only', () => {
  const task = ready();
  const result = buildHandoff({...task,token:'secret'},{from:'claude',to:'codex',summary:'Approved plan',token:'secret'});
  assert.equal(result.taskId,task.id);
  assert.equal(result.plan,'Write tests');
  assert.equal(Object.hasOwn(result,'token'),false);
  assert.throws(() => buildHandoff(task,{from:'claude',to:'claude',summary:'x'}));
});
test('interruption does not automatically rerun', () => {
  const task = transition(transition(ready(),'start_execution'),'interrupt');
  assert.equal(task.status,'interrupted');
  assert.throws(() => transition(task,'start_execution'));
});
