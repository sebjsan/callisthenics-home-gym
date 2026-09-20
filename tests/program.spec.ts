import { test, expect } from '@playwright/test';
import { plan, PROGRAM_ID } from '../src/data/plan';
import { exercises } from '../src/data/exercises';
import { newExercises } from '../src/data/newExercises';
import { adaptPlan, defaultProfile, gear, canTrain } from '../src/data/training';
import { buildSession } from '../src/data/session';

test('balanced program covers the full body, spaces strength, and consolidates before review', () => {
  expect(plan).toHaveLength(30);
  for (let week = 0; week < 4; week++) {
    const days = plan.slice(week * 7, week * 7 + 7);
    expect(days.filter(d => d.type === 'train')).toHaveLength(3);
    expect(days.filter(d => d.type === 'rest')).toHaveLength(2);
    for (const day of days.filter(d => d.type === 'train')) {
      expect(day.main.some(e => /push-up/.test(e.exerciseId))).toBe(true);
      expect(day.main.some(e => /row|pull-up/.test(e.exerciseId))).toBe(true);
      expect(day.main.some(e => /squat|lunge/.test(e.exerciseId))).toBe(true);
      expect(day.warmup.length).toBeGreaterThan(0);
      expect(day.cooldown.length).toBeGreaterThan(0);
    }
  }
  expect(plan[21]!.main.reduce((n, e) => n + e.sets, 0)).toBeLessThan(plan[14]!.main.reduce((n, e) => n + e.sets, 0));
  expect(plan[28]!.main).toEqual(plan[0]!.main);
  expect(plan[29]!.type).toBe('rest');
  for (const ex of Object.values(exercises)) {
    if (ex.easierId) expect(exercises[ex.easierId]).toBeDefined();
    if (ex.harderId) expect(exercises[ex.harderId]).toBeDefined();
  }
  expect(Object.keys(newExercises)).toHaveLength(10);
});

test('every equipment combination produces usable prescriptions or explicit omissions', () => {
  for (let bits = 0; bits < 2 ** gear.length; bits++) {
    const equipment = gear.filter((_, i) => bits & (1 << i));
    for (const source of plan) for (const level of ['foundation', 'standard'] as const) {
      const adapted = adaptPlan(source, { ...defaultProfile, equipment, level });
      for (const item of [...adapted.day.warmup, ...adapted.day.main, ...adapted.day.cooldown]) {
        expect(canTrain(item.exerciseId, equipment, item.bandSuggestion)).toBe(true);
        expect(item.sets).toBeGreaterThan(0);
        expect(item.reps ?? item.durationSec).toBeGreaterThan(0);
      }
      if (source.type === 'rest') expect(buildSession(adapted.day)).toEqual([]);
    }
  }
  const none = adaptPlan(plan[0]!, { ...defaultProfile, equipment: [] });
  expect(none.day.main.some(e => e.exerciseId === 'floor-knee-push-up')).toBe(true);
  expect(none.unavailable).toContain('Band Bent-Over Row');
  const advanced = adaptPlan(plan[2]!, { ...defaultProfile, pushLevel: 'full', pullLevel: 'full' });
  expect(advanced.day.main.some(e => e.exerciseId === 'pull-up' && e.reps === 3)).toBe(true);
  expect(adaptPlan(plan[2]!, { ...defaultProfile, pushLevel: 'full', pullLevel: 'full' }, false, true).day.main.some(e => e.exerciseId === 'pull-up')).toBe(false);
});

test('old progress is archived without claiming completion in the rebuilt plan', async ({ page }) => {
  await page.goto('./');
  await page.evaluate(() => {
    localStorage.removeItem('chg-progress-balanced-v2');
    localStorage.setItem('chg-progress-v1', JSON.stringify({ completedDays: [1, 2, 3], streak: 2, lastCompletedDate: '2026-09-19' }));
  });
  await page.goto('./progress');
  await expect(page.getByText('0 / 30', { exact: true })).toBeVisible();
  const download = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Export original plan & completion' }).click();
  expect((await download).suggestedFilename()).toBe('original-program-archive.json');
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('chg-progress-v1')!).completedDays)).toEqual([1, 2, 3]);
});

test('new movement guide, no-equipment filter, and selected variations work', async ({ page }) => {
  const errors: string[] = []; page.on('pageerror', e => errors.push(e.message));
  await page.goto('./library');
  await page.getByRole('combobox', { name: 'Equipment', exact: true }).selectOption('none');
  await page.getByRole('searchbox').fill('reverse lunge');
  await page.getByRole('link', { name: /Reverse Lunge/ }).click();
  await expect(page.getByText('Exercise illustration', { exact: true })).toBeVisible();
  await page.getByRole('link', { name: 'Easier: Bodyweight Squat' }).click();
  await expect(page.getByRole('heading', { name: 'Bodyweight Squat', exact: true })).toBeVisible();
  await page.goto('./training');
  await page.getByRole('combobox', { name: 'Push-up variation' }).selectOption('full');
  await page.getByRole('combobox', { name: 'Pull-up variation' }).selectOption('full');
  await page.getByRole('button', { name: 'Save training profile' }).click();
  await page.goto('./day/3');
  await expect(page.getByText(/Your selected unassisted pull-up variation/)).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(errors).toEqual([]);
});

test('per-side hold timer and recorded target use consistent units', async ({ page }) => {
  const source = plan[2]!;
  const adapted = adaptPlan(source, defaultProfile);
  const steps = buildSession(adapted.day);
  const cursor = steps.findIndex(s => s.kind === 'work' && s.item.exerciseId === 'knee-side-plank');
  expect(steps[cursor]!.seconds).toBe(40);
  await page.goto('./');
  const signature = JSON.stringify([source.day, adapted.day.warmup, adapted.day.main, adapted.day.cooldown]);
  await page.evaluate(({ key, cursor }) => sessionStorage.setItem(key, JSON.stringify({ id: 'per-side-test', cursor, sets: [], skipped: 0 })), { key: `chg-session-v3-${PROGRAM_ID}-${signature}`, cursor });
  await page.goto('./workout/3');
  await expect(page.locator('.timer-display')).toContainText('0:40');
  await expect(page.getByRole('spinbutton', { name: 'Seconds completed' })).toHaveValue('20');
  await expect(page.getByText(/Timer covers both sides/)).toBeVisible();
});

test('all new exercises load human images in cards and detail pages', async ({ page }) => {
  await page.goto('./library');
  for (const exercise of Object.values(newExercises)) {
    const preview = page.getByRole('img', { name: exercise.name, exact: true });
    await preview.scrollIntoViewIfNeeded();
    await expect(preview).toBeVisible();
    await expect.poll(() => preview.evaluate(el => el instanceof HTMLImageElement && el.complete && el.naturalWidth > 0)).toBe(true);
    const bounds = await preview.boundingBox();
    expect(bounds!.width).toBeGreaterThan(50);
    expect(bounds!.height).toBeGreaterThan(50);
  }
  for (const exercise of Object.values(newExercises)) {
    await page.goto(`./exercise/${exercise.id}`);
    await expect(page.getByRole('img', { name: exercise.name, exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Coaching cues' })).toBeVisible();
  }
});
