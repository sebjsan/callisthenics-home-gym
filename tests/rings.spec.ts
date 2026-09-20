import { test, expect } from '@playwright/test';
import { adaptPlan, defaultProfile, readTraining, canTrain } from '../src/data/training';
import { plan } from '../src/data/plan';

test('rings substitute without adding volume and preserve existing profiles and recovery', () => {
  const profile = { ...defaultProfile, equipment: [...defaultProfile.equipment, 'rings' as const] };
  expect(readTraining(JSON.stringify({ profile: defaultProfile })).profile.equipment).not.toContain('rings');
  expect(readTraining(JSON.stringify({ profile })).profile.equipment).toContain('rings');
  for (const day of plan) {
    const normal = adaptPlan(day, defaultProfile).day;
    const ring = adaptPlan(day, profile).day;
    expect(ring.main.length).toBe(normal.main.length);
    expect(ring.main.reduce((n, x) => n + x.sets, 0)).toBe(normal.main.reduce((n, x) => n + x.sets, 0));
    if (day.type !== 'train') expect(ring).toEqual(normal);
    expect(ring.main.every(x => canTrain(x.exerciseId, profile.equipment, x.bandSuggestion))).toBe(true);
    const easy = adaptPlan(day, profile, true, true).day;
    expect(easy.main.every(x => x.sets === 1)).toBe(true);
  }
  expect(adaptPlan(plan[0]!, profile).day.main.some(x => x.exerciseId === 'ring-row')).toBe(true);
  expect(adaptPlan(plan[2]!, profile).day.main.some(x => x.exerciseId === 'ring-incline-push-up')).toBe(true);
});

test('ring selection persists and updates library, preview and guided workout', async ({ page }) => {
  await page.goto('./training');
  await page.getByRole('checkbox', { name: 'Gymnastic rings', exact: true }).check();
  await page.getByRole('button', { name: 'Save training profile' }).click();
  await page.reload();
  await expect(page.getByRole('checkbox', { name: 'Gymnastic rings', exact: true })).toBeChecked();
  await page.goto('./library');
  await page.getByRole('combobox', { name: 'Equipment', exact: true }).selectOption('rings');
  await expect(page.locator('article')).toHaveCount(7);
  for (const img of await page.locator('article img').all()) {
    await expect(img).toBeVisible();
    await expect.poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
  }
  await page.goto('./day/1');
  await expect(page.getByText('Ring Row', { exact: true }).first()).toBeVisible();
  await page.getByRole('link', { name: 'Start guided workout' }).click();
  await expect(page.getByText(/Step 1 \//)).toBeVisible();
});
