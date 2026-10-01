import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { stripTypeScriptTypes } from 'node:module';
const source = stripTypeScriptTypes(readFileSync(new URL('../src/lib/quiz-state.ts', import.meta.url), 'utf8'));
const { createQuizState, quizReducer } = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);

test('first answer is final, including a wrong answer followed by a correct click', () => {
  const initial = createQuizState(2);
  const answered = quizReducer(initial, { type: 'answer', option: 0, optionCount: 4 });
  assert.equal(quizReducer(answered, { type: 'answer', option: 1, optionCount: 4 }), answered);
  assert.deepEqual(initial.answers, [null, null]);
  assert.deepEqual(answered.answers, [0, null]);
});

test('cannot advance unanswered questions or submit invalid options', () => {
  const state = createQuizState(1);
  assert.equal(quizReducer(state, { type: 'next' }), state);
  for (const option of [-1, 4, 1.5]) assert.equal(quizReducer(state, { type: 'answer', option, optionCount: 4 }), state);
});

test('mixed answers survive completion and restart clears every answer', () => {
  let state = createQuizState(2);
  state = quizReducer(state, { type: 'answer', option: 0, optionCount: 4 });
  state = quizReducer(state, { type: 'next' });
  state = quizReducer(state, { type: 'answer', option: 1, optionCount: 4 });
  state = quizReducer(state, { type: 'next' });
  assert.equal(state.currentIndex, 2);
  assert.equal(state.answers.filter(answer => answer === 1).length, 1);
  assert.equal(quizReducer(state, { type: 'next' }), state);
  assert.deepEqual(quizReducer(state, { type: 'restart' }), createQuizState(2));
});

test('empty sessions cannot advance or answer', () => {
  const state = createQuizState(0);
  assert.equal(quizReducer(state, { type: 'next' }), state);
  assert.equal(quizReducer(state, { type: 'answer', option: 1, optionCount: 4 }), state);
});
