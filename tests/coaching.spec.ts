import { test, expect } from '@playwright/test';
import { sessionAdvice } from '../src/data/coaching';
import { defaultProfile, readTraining, type WorkoutLog } from '../src/data/training';
import { PROGRAM_ID } from '../src/data/plan';

const makeLog = (overrides: Partial<WorkoutLog> = {}): WorkoutLog => ({
  id: 'practice', programId: PROGRAM_ID, day: 1, title: 'Strength', date: new Date().toISOString(),
  effort: 'right', sets: [{ exerciseId: 'band-row', value: 9, unit: 'reps', band: 'medium' }],
  shortened: false, skipped: 0, ...overrides,
});

test('coaching respects form, chronology, recency and strength sessions', () => {
  expect(sessionAdvice([makeLog({ technique: 'needs-practice' })]).ease).toBe(true);
  expect(sessionAdvice([makeLog({ effort: 'hard', day: 2 })]).ease).toBe(false);
  expect(sessionAdvice([makeLog({ effort: 'hard', programId: undefined })]).ease).toBe(false);
  expect(sessionAdvice([makeLog({ effort: 'hard', date: '2020-01-01' })]).ease).toBe(false);
  expect(sessionAdvice([makeLog(), makeLog({ effort: 'hard', date: new Date(Date.now() - 86400000).toISOString() })]).ease).toBe(false);
  expect(readTraining(JSON.stringify({ history: [makeLog({ technique: 'controlled' })] })).history[0]?.technique).toBe('controlled');
  expect(readTraining(JSON.stringify({ history: [makeLog({ technique: 'invalid' as never })] })).history).toEqual([]);
});

test('feedback can ease a preview and travel equipment stays session-only', async ({ page }) => {
  await page.goto('./');
  await page.evaluate(({ profile, log }) => localStorage.setItem('chg-training-v1', JSON.stringify({ profile, history: [log], favorites: [] })), { profile: defaultProfile, log: makeLog({ technique: 'needs-practice' }) });
  await page.goto('./day/1');
  await page.getByRole('button', { name: 'Use suggested easier session' }).click();
  await expect(page.getByRole('checkbox', { name: 'Easier today' })).toBeChecked();
  await page.getByRole('checkbox', { name: 'No equipment today' }).click();
  await expect(page.getByRole('checkbox', { name: 'No equipment today' })).toBeChecked();
  await expect(page.getByText('Omitted for this session', { exact: true })).toBeVisible();
  await page.getByRole('link', { name: 'Start guided workout' }).click();
  await expect(page).toHaveURL(/travel=1/);
  await page.getByRole('link', { name: 'Exit session' }).click();
  await expect(page.getByRole('checkbox', { name: 'No equipment today' })).toBeChecked();
  await page.goto('./training');
  await expect(page.getByRole('checkbox', { name: 'BDL station' })).toBeChecked();
  await page.goto('./exercise/band-row');
  await expect(page.getByText('9 reps (medium band)', { exact: true })).toBeVisible();
});
