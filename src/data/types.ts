export type Equipment =
  | "rings"
  | "yoga-mat"
  | "push-up-bars"
  | "resistance-band-light"
  | "resistance-band-medium"
  | "resistance-band-heavy"
  | "pull-up-bar";

export type DayType = "train" | "active-recovery" | "rest";

export type AnimationId =
  | "ring-assisted-squat"
  | "ring-curl"
  | "ring-assisted-pull-up"
  | "ring-push-up"
  | "ring-assisted-support"
  | "pull-neutral"
  | "pull-top-hold"

  | "ring-row"
  | "ring-incline-push-up"
  | "floor-push-up"
  | "floor-knee-push-up"
  | "bodyweight-squat"
  | "reverse-lunge"
  | "split-squat"
  | "calf-raise"
  | "prone-w"
  | "march-in-place"
  | "bodyweight-hinge"
  | "knee-side-plank"
  | "push-up"
  | "diamond-push-up"
  | "pike-push-up"
  | "knee-push-up"
  | "band-row"
  | "band-press"
  | "band-pull-apart"
  | "band-face-pull"
  | "band-assisted-pull-up"
  | "scapular-pull"
  | "dead-hang"
  | "negative-pull-up"
  | "chin-up"
  | "pull-up"
  | "hanging-knee-raise"
  | "australian-row"
  | "band-squat"
  | "glute-bridge"
  | "plank"
  | "side-plank"
  | "bird-dog"
  | "cat-cow"
  | "hip-opener"
  | "shoulder-opener"
  | "worlds-greatest-stretch"
  | "band-good-morning"
  | "hollow-hold"
  | "mountain-climber"
  | "band-lat-pulldown"
  | "incline-push-up"
  | "dip"
  | "dead-bug"
  | "pallof-press"
  | "reverse-crunch"
  | "hanging-leg-raise"
  | "supported-knee-raise";

export interface Exercise {
  easierId?: string;
  harderId?: string;
  readiness?: string;
  id: string;
  name: string;
  equipment: Equipment[];
  animationId: AnimationId;
  cues: string[];
  muscles: string[];
  description: string;
}

export interface WorkoutExercise {
  exerciseId: string;
  sets: number;
  reps?: number;
  durationSec?: number;
  restSec: number;
  notes?: string;
  bandSuggestion?: "light" | "medium" | "heavy";
}

export interface PlanDay {
  coaching?: string;
  phase?: string;
  day: number;
  title: string;
  type: DayType;
  focus: string;
  estimatedMinutes: number;
  warmup: WorkoutExercise[];
  main: WorkoutExercise[];
  cooldown: WorkoutExercise[];
}

export interface ProgressState {
  completedDays: number[];
  lastCompletedDate: string | null;
  streak: number;
}
