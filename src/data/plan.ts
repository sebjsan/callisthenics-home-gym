import { getExercise } from "./exercises";
import type { AnimationId, PlanDay, WorkoutExercise } from "./types";
export const PROGRAM_ID = "balanced-foundations-v2";
export const PROGRAM_NAME = "Balanced Foundations";
export const chapters = [
  "Learn the movements",
  "Build repeatable reps",
  "Add a little volume",
  "Consolidate & review",
];
const rep = (
  exerciseId: string,
  sets: number,
  reps: number,
  restSec = 60,
  notes?: string,
  bandSuggestion?: WorkoutExercise["bandSuggestion"],
): WorkoutExercise => ({
  exerciseId,
  sets,
  reps,
  restSec,
  notes,
  bandSuggestion,
});
const hold = (
  exerciseId: string,
  sets: number,
  durationSec: number,
  restSec = 30,
  notes?: string,
): WorkoutExercise => ({ exerciseId, sets, durationSec, restSec, notes });
const warmup = () => [
  hold("mat-wgs", 1, 60, 0),
  hold("march-in-place", 1, 45, 0),
  rep("bodyweight-hinge", 1, 8, 0),
  rep("mat-bird-dog", 1, 5, 0, "Each side"),
];
const cooldown = () => [
  hold("mat-hip-opener", 1, 45, 0, "Switch sides halfway"),
  hold("mat-cat-cow", 1, 45, 0),
];
function strength(day: number, week: number, kind: number): PlanDay {
  const sets = week === 2 ? 3 : 2;
  const reps = week === 1 ? 10 : 8;
  const routines = [
    [
      rep("bar-knee-push-up", sets, reps),
      rep("band-row", sets, reps + 2, 75, undefined, "medium"),
      rep("bodyweight-squat", sets, reps + 2),
      rep("mat-glute-bridge", sets, reps + 2),
      rep("mat-dead-bug", 2, 6, 40, "Each side"),
    ],
    [
      rep(
        "band-assisted-pull-up",
        sets,
        week === 1 ? 6 : 5,
        90,
        "Keep the same assistance until reps are comfortable.",
        "heavy",
      ),
      rep("floor-knee-push-up", sets, reps),
      rep("reverse-lunge", sets, 6, 60, "Each side"),
      rep("bodyweight-hinge", sets, reps + 2),
      hold("knee-side-plank", 2, 20, 40, "Each side"),
    ],
    [
      rep("band-row", sets, reps + 2, 75, undefined, "medium"),
      rep("bar-knee-push-up", sets, reps),
      rep("split-squat", sets, 6, 60, "Each side"),
      rep("calf-raise", 2, 12, 40),
      hold("mat-plank", 2, week === 1 ? 25 : 20, 45),
    ],
  ];
  return {
    day,
    type: "train",
    title: [
      "Full Body A · Squat & Press",
      "Full Body B · Pull & Hinge",
      "Full Body C · Unilateral Control",
    ][kind]!,
    phase: chapters[week],
    focus: "Push, pull, legs, and core in one balanced session",
    coaching:
      "Finish with about 2–3 clean reps left. Rest longer if needed. Stop or regress when technique changes; repeat the previous week if its targets are not comfortable.",
    estimatedMinutes: 30,
    warmup: warmup(),
    main: routines[kind]!,
    cooldown: cooldown(),
  };
}
function recovery(day: number, week: number): PlanDay {
  return {
    day,
    type: "active-recovery",
    title: "Easy Movement & Mobility",
    phase: chapters[week],
    focus: "Gentle range of motion and easy movement",
    coaching:
      "Stay at a conversational pace. This is recovery, not a conditioning test. An easy walk is optional.",
    estimatedMinutes: 10,
    warmup: [hold("march-in-place", 1, 60, 0)],
    main: [
      hold("mat-cat-cow", 1, 45, 0),
      hold("mat-hip-opener", 1, 60, 0, "Switch sides halfway"),
      rep("prone-w", 1, 8, 20),
      rep("mat-bird-dog", 1, 5, 20, "Each side"),
    ],
    cooldown: [],
  };
}
function rest(day: number, week: number): PlanDay {
  return {
    day,
    type: "rest",
    title: day === 30 ? "Review & Choose Your Next Block" : "Full Rest",
    phase: chapters[week],
    focus:
      day === 30
        ? "Review your records. Repeat this block or choose one harder variation when ready."
        : "Leave room to recover",
    coaching:
      "No sets today. Resume the sequence when ready; do not stack missed strength sessions to catch up.",
    estimatedMinutes: 0,
    warmup: [],
    main: [],
    cooldown: [],
  };
}
export const plan: PlanDay[] = Array.from({ length: 30 }, (_, index) => {
  const day = index + 1;
  const week = Math.min(3, Math.floor(index / 7));
  if (day === 29)
    return {
      ...strength(day, 0, 0),
      phase: "Review",
      title: "Repeat Your Baseline",
      coaching:
        "Repeat day 1 with the same variations, assistance, and targets. Compare effort and clean reps in history. This is not a max test.",
    };
  if (day === 30) return rest(day, week);
  const slot = index % 7;
  return slot === 0
    ? strength(day, week, 0)
    : slot === 2
      ? strength(day, week, 1)
      : slot === 4
        ? strength(day, week, 2)
        : slot === 1 || slot === 5
          ? recovery(day, week)
          : rest(day, week);
});
export function getDay(day: number) {
  return plan.find((d) => d.day === day);
}
export function getHeroAnimationId(day: PlanDay): AnimationId {
  const hero = day.main[0] ?? day.warmup[0];
  return hero ? getExercise(hero.exerciseId).animationId : "cat-cow";
}
export function getTodayPlanDay(completedDays: number[]) {
  return plan.find((d) => !completedDays.includes(d.day)) ?? plan[29]!;
}
export const TRAIN_DAYS = plan.filter((d) => d.type === "train").length;
export const TOTAL_DAYS = plan.length;
