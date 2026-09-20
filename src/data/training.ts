import { exercises } from "./exercises";
import type { Equipment, PlanDay, WorkoutExercise } from "./types";

export const gear: Equipment[] = [
  "rings",
  "push-up-bars",
  "pull-up-bar",
  "resistance-band-light",
  "resistance-band-medium",
  "resistance-band-heavy",
];
export type Goal = "strength" | "consistency" | "skills";
export interface TrainingProfile {
  pushLevel: "knees" | "full";
  pullLevel: "assisted" | "full";
  goal: Goal;
  level: "foundation" | "standard";
  weeklyTarget: number;
  equipment: Equipment[];
}
export const defaultProfile: TrainingProfile = {
  pushLevel: "knees",
  pullLevel: "assisted",
  goal: "strength",
  level: "standard",
  weeklyTarget: 3,
  equipment: gear.filter((eq) => eq !== "rings"),
};
export interface SetLog {
  perSide?: boolean;
  exerciseId: string;
  value: number;
  unit: "reps" | "seconds";
  band?: "light" | "medium" | "heavy";
}
export interface WorkoutLog {
  programId?: string;
  id: string;
  day: number;
  date: string;
  title: string;
  effort: "easy" | "right" | "hard";
  sets: SetLog[];
  shortened: boolean;
  skipped: number;
}
export interface TrainingState {
  profile: TrainingProfile;
  favorites: string[];
  history: WorkoutLog[];
}
export const initialTraining: TrainingState = {
  profile: defaultProfile,
  favorites: [],
  history: [],
};
export const skillPaths = [
  { title: "Ring foundations", description: "Practice rows and incline presses with feet on the floor. Start upright; increase the lean only after two comfortable sessions. These are complementary movements, not a difficulty ladder.", ids: ["ring-row", "ring-incline-push-up"] },
  {
    title: "Leg strength & balance",
    description:
      "Build comfortable squats, then practice unilateral control. Use the easier option whenever balance limits your set.",
    ids: ["bodyweight-squat", "reverse-lunge", "split-squat"],
  },
  {
    title: "Your first pull-up",
    description:
      "Build shoulder control, assisted strength, and a controlled lowering before testing a full rep.",
    ids: ["pull-scapular", "band-assisted-pull-up", "pull-negative", "pull-up"],
  },
  {
    title: "Stronger push-ups",
    description:
      "Choose a variation you can control. Move on when every rep stays smooth across multiple sessions.",
    ids: ["bar-knee-push-up", "bar-push-up", "bar-diamond-push-up"],
  },
  {
    title: "Core control",
    description:
      "Start on the floor, then explore supported and hanging work without swinging.",
    ids: [
      "mat-dead-bug",
      "mat-reverse-crunch",
      "bar-supported-knee-raise",
      "pull-hanging-knee",
      "pull-hanging-leg-raise",
    ],
  },
];

// Band strengths in the catalog are alternatives, not a requirement to own every band.
export function canTrain(
  id: string,
  available: Equipment[],
  band?: WorkoutExercise["bandSuggestion"],
): boolean {
  const exercise = exercises[id];
  if (!exercise) return false;
  const fixed = exercise.equipment.filter(
    (eq) => eq !== "yoga-mat" && !eq.startsWith("resistance-band"),
  );
  const bands = exercise.equipment.filter((eq) =>
    eq.startsWith("resistance-band"),
  );
  return (
    fixed.every((eq) => available.includes(eq)) &&
    (bands.length === 0 ||
      (band
        ? available.includes(`resistance-band-${band}`)
        : bands.some((eq) => available.includes(eq))))
  );
}

const easier: Record<string, WorkoutExercise> = {
  "floor-push-up": {
    exerciseId: "floor-knee-push-up",
    sets: 2,
    reps: 6,
    restSec: 60,
  },
  "reverse-lunge": {
    exerciseId: "bodyweight-squat",
    sets: 2,
    reps: 8,
    restSec: 60,
  },
  "split-squat": {
    exerciseId: "bodyweight-squat",
    sets: 2,
    reps: 8,
    restSec: 60,
  },
  "mat-side-plank": {
    exerciseId: "knee-side-plank",
    sets: 2,
    durationSec: 15,
    restSec: 40,
    notes: "Each side",
  },
  "bar-push-up": {
    exerciseId: "bar-knee-push-up",
    sets: 2,
    reps: 8,
    restSec: 60,
  },
  "bar-diamond-push-up": {
    exerciseId: "bar-knee-push-up",
    sets: 2,
    reps: 8,
    restSec: 60,
  },
  "bar-pike-push-up": {
    exerciseId: "bar-knee-push-up",
    sets: 2,
    reps: 8,
    restSec: 60,
  },
  "bar-dip": { exerciseId: "bar-knee-push-up", sets: 2, reps: 8, restSec: 60 },
  "pull-up": {
    exerciseId: "band-assisted-pull-up",
    sets: 2,
    reps: 5,
    restSec: 90,
    bandSuggestion: "heavy",
  },
  "pull-chin-up": {
    exerciseId: "band-assisted-pull-up",
    sets: 2,
    reps: 5,
    restSec: 90,
    bandSuggestion: "heavy",
  },
  "pull-negative": {
    exerciseId: "pull-scapular",
    sets: 2,
    reps: 6,
    restSec: 60,
  },
  "pull-hanging-leg-raise": {
    exerciseId: "mat-reverse-crunch",
    sets: 2,
    reps: 8,
    restSec: 45,
  },
  "pull-hanging-knee": {
    exerciseId: "mat-reverse-crunch",
    sets: 2,
    reps: 8,
    restSec: 45,
  },
  "mat-hollow": {
    exerciseId: "mat-dead-bug",
    sets: 2,
    reps: 6,
    restSec: 45,
    notes: "Each side",
  },
};
export interface AdaptedPlan {
  day: PlanDay;
  changes: string[];
  unavailable: string[];
  shortened: boolean;
}
export function adaptPlan(
  source: PlanDay,
  profile: TrainingProfile,
  short = false,
  gentle = false,
): AdaptedPlan {
  const changes: string[] = [];
  const unavailable: string[] = [];
  const ease = gentle || profile.level === "foundation";
  function adapt(items: WorkoutExercise[], main: boolean) {
    return items.flatMap((original) => {
      let item = { ...original };
      if (main && source.type === "train" && !ease) {
        if (
          profile.pushLevel === "full" &&
          ["bar-knee-push-up", "floor-knee-push-up"].includes(item.exerciseId)
        ) {
          item.exerciseId =
            item.exerciseId === "bar-knee-push-up"
              ? "bar-push-up"
              : "floor-push-up";
          item.reps = Math.min(item.reps ?? 6, 6);
          changes.push(
            "Your selected full push-up variation replaces knee push-ups, with a lower starting rep target.",
          );
        }
        if (
          profile.pullLevel === "full" &&
          item.exerciseId === "band-assisted-pull-up"
        ) {
          item.exerciseId = "pull-up";
          item.reps = 3;
          delete item.bandSuggestion;
          changes.push(
            "Your selected unassisted pull-up variation: 3 controlled reps per set.",
          );
        }
      }
      if (main && source.type === "train" && profile.equipment.includes("rings")) {
        const ringId = item.exerciseId === "band-row"
          ? "ring-row"
          : ["floor-knee-push-up", "floor-push-up"].includes(item.exerciseId)
            ? "ring-incline-push-up" : undefined;
        if (ringId) {
          changes.push(`${exercises[item.exerciseId]!.name} → ${exercises[ringId]!.name} (rings selected)`);
          item = { exerciseId: ringId, sets: item.sets, reps: source.phase === "Build repeatable reps" ? 8 : 6, restSec: 75,
            notes: "Feet stay on the floor. Start nearly upright; keep 2–3 clean reps in reserve. Adjust body angle before adding reps." };
        }
      }
      if (main && ease) {
        if (easier[item.exerciseId]) {
          item = { ...easier[item.exerciseId] };
          changes.push(
            `${exercises[original.exerciseId]!.name} → ${exercises[item.exerciseId]!.name}`,
          );
        } else {
          item.sets = Math.min(item.sets, 2);
          if (item.reps && item.reps > 1)
            item.reps = Math.max(1, Math.ceil(item.reps * 0.75));
          if (item.durationSec && item.durationSec > 1)
            item.durationSec = Math.max(10, Math.ceil(item.durationSec * 0.75));
        }
        // Never turn a max test into a misleading one-rep/one-second target.
        if (item.notes?.toLowerCase().includes("max")) {
          unavailable.push(
            `${exercises[item.exerciseId]!.name} (max test omitted in foundation mode)`,
          );
          return [];
        }
      }
      if (main && short) item.sets = 1;
      if (!canTrain(item.exerciseId, profile.equipment, item.bandSuggestion)) {
        const substitutes: Record<string, string> = {
          "bar-knee-push-up": "floor-knee-push-up",
          "bar-push-up": "floor-push-up",
          "bar-diamond-push-up": "floor-push-up",
          "bar-incline-push-up": "floor-knee-push-up",
          "band-squat": "bodyweight-squat",
          "band-good-morning": "bodyweight-hinge",
        };
        const replacement = substitutes[item.exerciseId];
        if (replacement) {
          changes.push(
            `${exercises[item.exerciseId]!.name} → ${exercises[replacement]!.name} (available equipment)`,
          );
          item = {
            ...item,
            exerciseId: replacement,
            bandSuggestion: undefined,
          };
        } else if (
          item.exerciseId === "band-assisted-pull-up" &&
          canTrain("band-row", profile.equipment)
        ) {
          const band = profile.equipment.includes("resistance-band-medium")
            ? "medium"
            : "heavy";
          item = {
            exerciseId: "band-row",
            sets: item.sets,
            reps: 10,
            restSec: 75,
            bandSuggestion: band,
          };
          changes.push(
            "Assisted pull-up → band row. This trains horizontal pulling, not the pull-up skill.",
          );
        } else if (
          item.bandSuggestion &&
          item.exerciseId !== "band-assisted-pull-up" &&
          canTrain(item.exerciseId, profile.equipment)
        ) {
          const band = exercises[item.exerciseId]!.equipment.find(
            (eq) =>
              eq.startsWith("resistance-band") &&
              profile.equipment.includes(eq),
          )!;
          item.bandSuggestion = band.replace(
            "resistance-band-",
            "",
          ) as WorkoutExercise["bandSuggestion"];
          changes.push(
            `${exercises[item.exerciseId]!.name}: use your ${item.bandSuggestion} band; adjust reps to keep 2–3 in reserve.`,
          );
        }
      }
      if (!canTrain(item.exerciseId, profile.equipment, item.bandSuggestion)) {
        unavailable.push(exercises[item.exerciseId]!.name);
        return [];
      }
      return [item];
    });
  }
  const day = {
    ...source,
    warmup: adapt(source.warmup, false),
    main: adapt(source.main, true),
    cooldown: adapt(source.cooldown, false),
  };
  if (ease)
    changes.unshift("Foundation effort: fewer main sets and lower targets.");
  if (short)
    changes.unshift(
      "Short session: one set per main exercise. Available warm-up and cool-down stay included.",
    );
  // Estimate from the actual prescription; rep pace and transitions vary by person.
  day.estimatedMinutes = Math.ceil(
    [...day.warmup, ...day.main, ...day.cooldown].reduce(
      (total, item) =>
        total +
        item.sets *
          ((item.durationSec ?? (item.reps ?? 1) * 4) *
            (item.notes?.toLowerCase().includes("each side") ? 2 : 1) +
            item.restSec) +
        20,
      0,
    ) / 60,
  );
  return {
    day,
    changes: [...new Set(changes)],
    unavailable: [...new Set(unavailable)],
    shortened: short || ease || unavailable.length > 0 || changes.length > 0,
  };
}

export function validLog(value: unknown): value is WorkoutLog {
  if (!value || typeof value !== "object") return false;
  const v = value as WorkoutLog;
  return (
    typeof v.id === "string" &&
    Number.isInteger(v.day) &&
    v.day >= 1 &&
    v.day <= 30 &&
    typeof v.title === "string" &&
    typeof v.date === "string" &&
    Number.isFinite(Date.parse(v.date)) &&
    ["easy", "right", "hard"].includes(v.effort) &&
    typeof v.shortened === "boolean" &&
    Number.isInteger(v.skipped) &&
    v.skipped >= 0 &&
    Array.isArray(v.sets) &&
    v.sets.every(
      (s) =>
        !!s &&
        !!exercises[s.exerciseId] &&
        Number.isFinite(s.value) &&
        s.value > 0 &&
        s.value <= 3600 &&
        ["reps", "seconds"].includes(s.unit) &&
        (s.band === undefined || ["light", "medium", "heavy"].includes(s.band)),
    )
  );
}
export function readTraining(raw: string | null): TrainingState {
  try {
    const value = JSON.parse(raw ?? "null");
    if (!value || typeof value !== "object") return initialTraining;
    const p = value.profile ?? {};
    return {
      profile: {
        pushLevel: p.pushLevel === "full" ? "full" : "knees",
        pullLevel: p.pullLevel === "full" ? "full" : "assisted",
        goal: ["strength", "consistency", "skills"].includes(p.goal)
          ? p.goal
          : "strength",
        level: p.level === "foundation" ? "foundation" : "standard",
        weeklyTarget: [2, 3, 4, 5].includes(p.weeklyTarget)
          ? p.weeklyTarget
          : 3,
        equipment: Array.isArray(p.equipment)
          ? gear.filter((eq) => p.equipment.includes(eq))
          : [...defaultProfile.equipment],
      },
      favorites: Array.isArray(value.favorites)
        ? [
            ...new Set<string>(
              value.favorites.filter(
                (id: unknown) => typeof id === "string" && !!exercises[id],
              ),
            ),
          ]
        : [],
      history: Array.isArray(value.history)
        ? value.history.filter(validLog).slice(-200)
        : [],
    };
  } catch {
    return initialTraining;
  }
}
