import { test, expect } from "@playwright/test";
import { plan } from "../src/data/plan";
import { buildSession } from "../src/data/session";

test("dashboard, library filters, empty state, and finale navigation", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("./");
  await expect(
    page.getByRole("heading", { name: "Build strength. One day at a time." }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.getByRole("link", { name: "Exercises", exact: true }).click();
  await page.getByRole("searchbox").fill("push-up");
  await expect(
    page.getByRole("heading", { name: "Push-Up (Bars)", exact: true }),
  ).toBeVisible();
  await page
    .getByRole("combobox", { name: "Equipment" })
    .selectOption("resistance-band");
  await expect(
    page.getByRole("heading", { name: "Push-Up (Bars)", exact: true }),
  ).toHaveCount(0);
  await page.getByRole("searchbox").fill("nothing-matches");
  await expect(page.getByText("No exercises found")).toBeVisible();
  await page.getByRole("button", { name: "Clear filters" }).click();
  await expect(page.getByRole("searchbox")).toHaveValue("");
  await page.getByRole("link", { name: "Plan", exact: true }).click();
  await page.getByRole("button", { name: /WEEK 4/ }).click();
  await page.getByRole("link", { name: /Graduation Circuit/ }).click();
  await expect(
    page.getByRole("heading", { name: "Day 30", exact: true }),
  ).toBeVisible();
  expect(errors).toEqual([]);
});

test("timer pauses, resumes, and session preserves position after reload", async ({
  page,
}) => {
  await page.clock.install({ time: new Date("2026-09-20T12:00:00Z") });
  await page.clock.pauseAt(new Date("2026-09-20T12:00:01Z"));
  await page.goto("./workout/1");
  const timer = page.locator(".timer-display");
  await expect(timer).toContainText("1:00");
  await page.getByRole("button", { name: "Start timer" }).click();
  await page.clock.fastForward(5000);
  await expect(timer).toContainText("0:55");
  await page.getByRole("button", { name: "Pause timer" }).click();
  await page.clock.fastForward(10000);
  await expect(timer).toContainText("0:55");
  await page.getByRole("button", { name: "Start timer" }).click();
  await page.clock.fastForward(55000);
  await expect(page.getByRole("status")).toContainText("Time complete");
  await page.getByRole("button", { name: "Complete set" }).click();
  await expect(
    page.getByRole("heading", { name: "Shoulder Opener", exact: true }),
  ).toBeVisible();
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "Shoulder Opener", exact: true }),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Start timer" })).toBeVisible();
  await expect(page.locator(".timer-display")).toContainText("0:45");
});

test("full session saves once and existing completions survive replay", async ({
  page,
}) => {
  await page.goto("./workout/1");
  const steps = buildSession(plan[0]!);
  for (const step of steps) {
    await page
      .getByRole("button", {
        name: step.kind === "rest" ? "Skip rest" : "Complete set",
      })
      .click();
  }
  await expect(
    page.getByRole("heading", { name: "That’s a strong finish." }),
  ).toBeVisible();
  await page.reload();
  await page.getByRole("button", { name: "Save workout" }).click();
  await expect(page.getByRole("status")).toContainText("Workout saved");
  expect(
    await page.evaluate(
      () => JSON.parse(localStorage.getItem("chg-progress-v1")!).completedDays,
    ),
  ).toEqual([1]);
  await page.evaluate(
    (last) => sessionStorage.setItem("chg-session-v1-1", String(last)),
    steps.length - 1,
  );
  await page.reload();
  await page.getByRole("button", { name: "Complete set" }).click();
  await page.getByRole("button", { name: "Save workout" }).click();
  expect(
    await page.evaluate(
      () => JSON.parse(localStorage.getItem("chg-progress-v1")!).completedDays,
    ),
  ).toEqual([1]);
});

test("blocked storage stays usable and explains the limitation", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Storage.prototype.setItem = () => {
      throw new DOMException("blocked", "SecurityError");
    };
  });
  await page.goto("./");
  await expect(page.getByRole("alert")).toContainText(
    "Device storage is unavailable",
  );
  await page.getByRole("link", { name: "Let’s train" }).click();
  await page.getByRole("link", { name: "Start guided workout" }).click();
  await expect(
    page.getByRole("button", { name: "Complete set" }),
  ).toBeVisible();
});

test("rest day has no player and invalid workout routes recover", async ({
  page,
}) => {
  await page.goto("./day/7");
  await expect(
    page.getByRole("link", { name: "Start guided workout" }),
  ).toHaveCount(0);
  await page.getByRole("button", { name: "Mark day complete" }).click();
  await page.reload();
  await expect(page.getByRole("button", { name: /Completed/ })).toBeVisible();
  await page.goto("./workout/999");
  await expect(
    page.getByRole("heading", { name: "No guided session for this day" }),
  ).toBeVisible();
});
