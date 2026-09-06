export type Equipment =
  | 'yoga-mat'
  | 'push-up-bars'
  | 'resistance-band-light'
  | 'resistance-band-medium'
  | 'resistance-band-heavy'
  | 'pull-up-bar';

export type DayType = 'train' | 'active-recovery' | 'rest';

export type AnimationId =
  | 'push-up'
  | 'diamond-push-up'
  | 'pike-push-up'
  | 'knee-push-up'
  | 'band-row'
  | 'band-press'
  | 'band-pull-apart'
  | 'band-face-pull'
  | 'band-assisted-pull-up'
  | 'scapular-pull'
  | 'dead-hang'
  | 'negative-pull-up'
  | 'chin-up'
  | 'pull-up'
  | 'hanging-knee-raise'
  | 'australian-row'
  | 'band-squat'
  | 'glute-bridge'
  | 'plank'
  | 'side-plank'
  | 'bird-dog'
  | 'cat-cow'
  | 'hip-opener'
  | 'shoulder-opener'
  | 'worlds-greatest-stretch'
  | 'band-good-morning'
  | 'hollow-hold'
  | 'mountain-climber'
  | 'band-lat-pulldown'
  | 'incline-push-up';

export interface Exercise {
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
  bandSuggestion?: 'light' | 'medium' | 'heavy';
}

export interface PlanDay {
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
