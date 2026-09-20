import { test, expect } from '@playwright/test';
import { adaptPlan, canTrain, defaultProfile, readTraining } from '../src/data/training';
import { plan } from '../src/data/plan';
import { buildSession } from '../src/data/session';

test('all adapted plans honor equipment, preserve recovery, and never mutate the source', () => {
  const original = JSON.stringify(plan);
  for (const day of plan) {
    const short = adaptPlan(day, defaultProfile, true);
    expect(short.day.warmup).toEqual(day.warmup);
    expect(short.day.cooldown).toEqual(day.cooldown);
    expect(short.day.main.every(item => item.sets === 1)).toBe(true);
    const noEquipment = adaptPlan(day, { ...defaultProfile, equipment: [] }, true, true);
    expect([...noEquipment.day.warmup, ...noEquipment.day.main, ...noEquipment.day.cooldown].every(item => canTrain(item.exerciseId, [], item.bandSuggestion))).toBe(true);
    if (day.type === 'rest') expect(buildSession(noEquipment.day)).toEqual([]);
  }
  expect(JSON.stringify(plan)).toBe(original);
  expect(canTrain('band-assisted-pull-up', ['pull-up-bar', 'resistance-band-light'])).toBe(true);
  expect(canTrain('band-assisted-pull-up', ['pull-up-bar', 'resistance-band-light'], 'heavy')).toBe(false);
});

test('malformed persisted settings and logs are normalized', () => {
  expect(readTraining('broken')).toEqual(readTraining(null));
  const restored = readTraining(JSON.stringify({ profile: { goal: 'unknown', weeklyTarget: 80, equipment: ['invisible-bar'] }, history: [{ id: 'invalid', sets: null }], favorites: ['missing', 'pull-up', 'pull-up'] }));
  expect(restored.profile.weeklyTarget).toBe(3);
  expect(restored.profile.equipment).toEqual([]);
  expect(restored.history).toEqual([]);
  expect(restored.favorites).toEqual(['pull-up']);
});

test('profile, equipment filtering, and favorite exercises persist', async ({ page }) => {
  await page.goto('./training');
  await page.getByRole('combobox', { name: 'My focus' }).selectOption('skills');
  await page.getByRole('combobox', { name: 'Starting effort' }).selectOption('foundation');
  await page.getByRole('checkbox', { name: 'BDL station' }).uncheck();
  await page.getByRole('button', { name: 'Save training profile' }).click();
  await expect(page.getByRole('status')).toContainText('Profile saved');
  await page.reload();
  await expect(page.getByRole('combobox', { name: 'Starting effort' })).toHaveValue('foundation');
  await expect(page.getByRole('checkbox', { name: 'BDL station' })).not.toBeChecked();
  await page.getByRole('link', { name: 'Exercises', exact: true }).click();
  await page.getByRole('checkbox', { name: 'My equipment only' }).check();
  await page.getByRole('searchbox').fill('Pull-Up');
  await expect(page.getByRole('heading', { name: 'Pull-Up', exact: true })).toHaveCount(0);
  await page.getByRole('searchbox').fill('Dead Bug');
  await page.getByRole('button', { name: 'Favorite Dead Bug', exact: true }).click();
  await page.reload();
  await page.getByRole('checkbox', { name: 'Favorites only' }).check();
  await expect(page.getByRole('heading', { name: 'Dead Bug', exact: true })).toBeVisible();
  await expect(page.locator('article')).toHaveCount(1);
});

test('shorter and easier sessions match their preview', async ({ page }) => {
  await page.goto('./day/22');
  await page.getByRole('checkbox', { name: 'Short session' }).click();
  await expect(page.getByRole('checkbox', { name: 'Short session' })).toBeChecked();
  await page.getByRole('checkbox', { name: 'Easier today' }).click();
  await expect(page.getByRole('checkbox', { name: 'Easier today' })).toBeChecked();
  await expect(page.getByText(/Foundation effort:/)).toBeVisible();
  const expected = adaptPlan(plan[21]!, defaultProfile, true, true);
  await page.getByRole('link', { name: 'Start guided workout' }).click();
  await expect(page.getByText(`Step 1 / ${buildSession(expected.day).length}`, { exact: true })).toBeVisible();
  await expect(page.getByRole('spinbutton', { name: 'Seconds completed' })).toHaveValue('60');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('partial workout keeps actual values without completing the plan day, and exports history', async ({ page }) => {
  test.setTimeout(60000);
  await page.goto('./workout/1?short=1');
  const steps = buildSession(adaptPlan(plan[0]!, defaultProfile, true).day);
  await page.getByRole('spinbutton', { name: 'Seconds completed' }).fill('23');
  await page.getByRole('button', { name: 'Complete set' }).click();
  for (const step of steps.slice(1)) await page.getByRole('button', { name: step.kind === 'rest' ? 'Skip rest' : 'Skip set', exact: step.kind !== 'rest' }).click();
  await page.getByRole('radio', { name: 'Hard', exact: true }).check();
  await page.getByRole('button', { name: 'Save partial workout' }).click();
  await expect(page.getByRole('status')).toContainText('Partial workout saved');
  const state = await page.evaluate(() => ({ training: JSON.parse(localStorage.getItem('chg-training-v1')!), progress: JSON.parse(localStorage.getItem('chg-progress-v1')!) }));
  expect(state.progress.completedDays).toEqual([]);
  expect(state.training.history[0].sets).toEqual([{ exerciseId: 'mat-wgs', value: 23, unit: 'seconds' }]);
  expect(state.training.history[0].effort).toBe('hard');
  await page.getByRole('link', { name: 'View training history' }).click();
  await expect(page.getByText('23 seconds', { exact: true }).first()).toBeVisible();
  const download = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Export history' }).click();
  expect((await download).suggestedFilename()).toBe('home-gym-workout-history.json');
  await page.getByRole('link', { name: 'Today', exact: true }).click();
  await expect(page.getByText(/Your last workout felt hard/)).toBeVisible();
});

test('restart clears unsaved set entries and resets the current timer', async ({ page }) => {
  await page.goto('./workout/1');
  await page.getByRole('spinbutton', { name: 'Seconds completed' }).fill('12');
  page.once('dialog', dialog => dialog.accept());
  await page.getByRole('button', { name: 'Restart session' }).click();
  await expect(page.getByRole('spinbutton', { name: 'Seconds completed' })).toHaveValue('60');
  await expect(page.getByText('0 sets recorded', { exact: true })).toBeVisible();
});
