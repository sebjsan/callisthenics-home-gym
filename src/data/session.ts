import type { PlanDay, WorkoutExercise } from "./types";

export interface SessionStep {
  item: WorkoutExercise;
  phase: string;
  set: number;
  kind: "work" | "rest";
  seconds: number | null;
}

export function buildSession(day: PlanDay): SessionStep[] {
  const steps: SessionStep[] = [];
  for (const [phase, items] of [
    ["Warm-up", day.warmup],
    ["Main work", day.main],
    ["Cool-down", day.cooldown],
  ] as const) {
    for (const item of items) {
      for (let set = 1; set <= item.sets; set++) {
        // Max-effort tests use a manual finish instead of a one-second countdown.
        steps.push({
          item,
          phase,
          set,
          kind: "work",
          seconds:
            item.durationSec && item.durationSec > 1 ? item.durationSec : null,
        });
        if (item.restSec > 0)
          steps.push({ item, phase, set, kind: "rest", seconds: item.restSec });
      }
    }
  }
  if (steps.at(-1)?.kind === "rest") steps.pop();
  return steps;
}
