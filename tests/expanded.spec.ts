import { test, expect } from '@playwright/test';
import { expandedExercises } from '../src/data/expandedExercises';
import { adaptPlan, defaultProfile, readTraining, canTrain, type TrainingProfile } from '../src/data/training';
import { plan } from '../src/data/plan';

test('pulling choices preserve set count, units, equipment and easier-day behavior', () => {
  const choices: TrainingProfile['pullLevel'][] = ['full', 'neutral', 'chin', 'tempo', 'hold', 'ring-assisted'];
  for (const pullLevel of choices) {
    const profile = { ...defaultProfile, pullLevel, equipment: [...defaultProfile.equipment, 'rings' as const] };
    expect(readTraining(JSON.stringify({ profile })).profile.pullLevel).toBe(pullLevel);
    const day = adaptPlan(plan[2]!, profile).day;
    expect(day.main[0]!.sets).toBe(plan[2]!.main[0]!.sets);
    expect(day.main.every(item => canTrain(item.exerciseId, profile.equipment, item.bandSuggestion))).toBe(true);
    if (pullLevel === 'hold') { expect(day.main[0]!.durationSec).toBe(5); expect(day.main[0]!.reps).toBeUndefined(); }
    else expect(day.main[0]!.durationSec).toBeUndefined();
    const easy = adaptPlan(plan[2]!, profile, false, true).day;
    expect(easy.main[0]!.exerciseId).toBe(pullLevel === 'ring-assisted' ? 'ring-assisted-pull-up' : 'band-assisted-pull-up');
    const none = adaptPlan(plan[2]!, { ...profile, equipment: [] }).day;
    expect(none.main.every(item => canTrain(item.exerciseId, []))).toBe(true);
  }
});

test('new photos load and timed pulling choice persists into the workout preview', async ({ page }) => {
  for (const exercise of Object.values(expandedExercises)) {
    await page.goto(`./exercise/${exercise.id}`);
    await expect(page.getByRole('heading', { name: exercise.name, exact: true })).toBeVisible();
    const img = page.getByRole('img', { name: exercise.name, exact: true });
    await expect(img).toBeVisible();
    await expect.poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
  }
  await page.goto('./training');
  await page.getByRole('combobox', { name: 'Pull-up variation', exact: true }).selectOption('hold');
  await page.getByRole('button', { name: 'Save training profile' }).click();
  await page.reload();
  await expect(page.getByRole('combobox', { name: 'Pull-up variation', exact: true })).toHaveValue('hold');
  await page.goto('./day/3');
  await expect(page.getByRole('heading', { name: 'Pull-Up Top Hold', exact: true })).toBeVisible();
  await expect(page.getByRole('link').filter({ hasText: 'Pull-Up Top Hold' }).first()).toContainText('5s');
});
