import { getExercise } from './exercises';
import type { AnimationId, PlanDay } from './types';

export const plan: PlanDay[] = [
  // ——— Week 1 ———
  {
    day: 1,
    title: 'Push Foundation',
    type: 'train',
    focus: 'Chest & triceps primer — no dips yet',
    estimatedMinutes: 35,
    warmup: [
      { exerciseId: 'mat-wgs', sets: 1, restSec: 0, durationSec: 60 },
      { exerciseId: 'mat-shoulder-opener', sets: 1, restSec: 0, durationSec: 45, bandSuggestion: 'light' },
      { exerciseId: 'band-pull-apart', sets: 2, restSec: 30, reps: 12, bandSuggestion: 'light' },
      { exerciseId: 'mat-bird-dog', sets: 1, restSec: 0, reps: 6, notes: 'Each side — wake the core' },
    ],
    main: [
      { exerciseId: 'bar-knee-push-up', sets: 3, restSec: 60, reps: 8, notes: 'Full depth between bars' },
      { exerciseId: 'band-press', sets: 3, restSec: 60, reps: 12, bandSuggestion: 'medium' },
      { exerciseId: 'bar-incline-push-up', sets: 3, restSec: 60, reps: 10 },
      { exerciseId: 'band-row', sets: 3, restSec: 60, reps: 12, bandSuggestion: 'medium', notes: 'Balance the push volume' },
      { exerciseId: 'mat-plank', sets: 3, restSec: 45, durationSec: 25 },
    ],
    cooldown: [
      { exerciseId: 'mat-hip-opener', sets: 1, restSec: 0, durationSec: 60 },
      { exerciseId: 'mat-cat-cow', sets: 1, restSec: 0, durationSec: 45 },
    ],
  },
  {
    day: 2,
    title: 'Pull Pattern Primer',
    type: 'train',
    focus: 'Vertical pull groove + scapular control',
    estimatedMinutes: 35,
    warmup: [
      { exerciseId: 'mat-cat-cow', sets: 1, restSec: 0, durationSec: 45 },
      { exerciseId: 'mat-shoulder-opener', sets: 1, restSec: 0, durationSec: 45, bandSuggestion: 'light' },
      { exerciseId: 'pull-dead-hang', sets: 2, restSec: 45, durationSec: 20 },
      { exerciseId: 'band-pull-apart', sets: 2, restSec: 30, reps: 15, bandSuggestion: 'light' },
    ],
    main: [
      { exerciseId: 'pull-scapular', sets: 3, restSec: 45, reps: 8 },
      { exerciseId: 'band-lat-pulldown', sets: 3, restSec: 60, reps: 12, bandSuggestion: 'medium' },
      { exerciseId: 'band-assisted-pull-up', sets: 3, restSec: 90, reps: 5, notes: 'Heaviest band for 5 clean reps', bandSuggestion: 'heavy' },
      { exerciseId: 'band-face-pull', sets: 3, restSec: 45, reps: 12, bandSuggestion: 'light' },
      { exerciseId: 'mat-dead-bug', sets: 3, restSec: 45, reps: 8, notes: 'Each side — slow' },
    ],
    cooldown: [
      { exerciseId: 'mat-hip-opener', sets: 1, restSec: 0, durationSec: 60 },
      { exerciseId: 'mat-wgs', sets: 1, restSec: 0, durationSec: 45 },
    ],
  },
  {
    day: 3,
    title: 'Active Recovery A — Mobility Flow',
    type: 'active-recovery',
    focus: 'Full-body mobility & easy blood flow',
    estimatedMinutes: 25,
    warmup: [],
    main: [
      { exerciseId: 'mat-cat-cow', sets: 2, restSec: 20, durationSec: 45 },
      { exerciseId: 'mat-wgs', sets: 2, restSec: 30, durationSec: 50 },
      { exerciseId: 'mat-hip-opener', sets: 2, restSec: 20, durationSec: 45 },
      { exerciseId: 'mat-shoulder-opener', sets: 2, restSec: 20, durationSec: 45, bandSuggestion: 'light' },
      { exerciseId: 'mat-bird-dog', sets: 2, restSec: 30, reps: 8, notes: 'Each side' },
      { exerciseId: 'pull-dead-hang', sets: 2, restSec: 60, durationSec: 25, notes: 'Easy hang — breathe and relax grip' },
    ],
    cooldown: [],
  },
  {
    day: 4,
    title: 'Legs + Core',
    type: 'train',
    focus: 'Squats, hinges & lower-abs primer',
    estimatedMinutes: 35,
    warmup: [
      { exerciseId: 'mat-cat-cow', sets: 1, restSec: 0, durationSec: 45 },
      { exerciseId: 'mat-hip-opener', sets: 1, restSec: 0, durationSec: 60 },
      { exerciseId: 'mat-glute-bridge', sets: 2, restSec: 30, reps: 10 },
      { exerciseId: 'mat-wgs', sets: 1, restSec: 0, durationSec: 45 },
    ],
    main: [
      { exerciseId: 'band-squat', sets: 3, restSec: 60, reps: 12, bandSuggestion: 'medium' },
      { exerciseId: 'band-good-morning', sets: 3, restSec: 60, reps: 12, bandSuggestion: 'light' },
      { exerciseId: 'mat-glute-bridge', sets: 3, restSec: 45, reps: 15 },
      { exerciseId: 'mat-mountain-climber', sets: 2, restSec: 45, durationSec: 30, notes: 'Controlled — hips steady' },
      { exerciseId: 'mat-reverse-crunch', sets: 3, restSec: 45, reps: 10 },
    ],
    cooldown: [
      { exerciseId: 'mat-shoulder-opener', sets: 1, restSec: 0, durationSec: 60, bandSuggestion: 'light' },
      { exerciseId: 'band-pull-apart', sets: 1, restSec: 0, reps: 12, bandSuggestion: 'light' },
    ],
  },
  {
    day: 5,
    title: 'Full-Body Strength',
    type: 'train',
    focus: 'Push + pull + squat balance',
    estimatedMinutes: 40,
    warmup: [
      { exerciseId: 'mat-wgs', sets: 1, restSec: 0, durationSec: 50 },
      { exerciseId: 'mat-bird-dog', sets: 1, restSec: 0, reps: 6, notes: 'Each side' },
      { exerciseId: 'band-pull-apart', sets: 2, restSec: 30, reps: 12, bandSuggestion: 'light' },
      { exerciseId: 'mat-hip-opener', sets: 1, restSec: 0, durationSec: 45 },
    ],
    main: [
      { exerciseId: 'bar-incline-push-up', sets: 3, restSec: 60, reps: 10 },
      { exerciseId: 'band-assisted-pull-up', sets: 3, restSec: 90, reps: 5, bandSuggestion: 'heavy' },
      { exerciseId: 'band-squat', sets: 3, restSec: 60, reps: 12, bandSuggestion: 'medium' },
      { exerciseId: 'band-row', sets: 3, restSec: 60, reps: 12, bandSuggestion: 'medium' },
      { exerciseId: 'mat-hollow', sets: 3, restSec: 45, durationSec: 20 },
    ],
    cooldown: [
      { exerciseId: 'mat-shoulder-opener', sets: 1, restSec: 0, durationSec: 60, bandSuggestion: 'light' },
      { exerciseId: 'mat-cat-cow', sets: 1, restSec: 0, durationSec: 45 },
    ],
  },
  {
    day: 6,
    title: 'Pull Skill — Hang & Scapula',
    type: 'train',
    focus: 'Dead hang, scapular pulls & assisted volume',
    estimatedMinutes: 38,
    warmup: [
      { exerciseId: 'mat-cat-cow', sets: 1, restSec: 0, durationSec: 45 },
      { exerciseId: 'mat-shoulder-opener', sets: 1, restSec: 0, durationSec: 45, bandSuggestion: 'light' },
      { exerciseId: 'pull-dead-hang', sets: 2, restSec: 45, durationSec: 20 },
      { exerciseId: 'band-pull-apart', sets: 2, restSec: 30, reps: 15, bandSuggestion: 'light' },
    ],
    main: [
      { exerciseId: 'pull-scapular', sets: 4, restSec: 45, reps: 10 },
      { exerciseId: 'pull-dead-hang', sets: 3, restSec: 60, durationSec: 25, notes: 'Packed shoulders — build time' },
      { exerciseId: 'band-assisted-pull-up', sets: 4, restSec: 90, reps: 5, bandSuggestion: 'heavy' },
      { exerciseId: 'band-lat-pulldown', sets: 3, restSec: 60, reps: 12, bandSuggestion: 'medium' },
      { exerciseId: 'pull-hanging-knee', sets: 3, restSec: 60, reps: 6 },
    ],
    cooldown: [
      { exerciseId: 'mat-hip-opener', sets: 1, restSec: 0, durationSec: 60 },
      { exerciseId: 'mat-wgs', sets: 1, restSec: 0, durationSec: 45 },
    ],
  },
  {
    day: 7,
    title: 'Full Rest',
    type: 'rest',
    focus: 'Recovery',
    estimatedMinutes: 0,
    warmup: [],
    main: [],
    cooldown: [],
  },

  // ——— Week 2 ———
  {
    day: 8,
    title: 'Push + First Dips',
    type: 'train',
    focus: 'Full push-ups & station dip intro',
    estimatedMinutes: 40,
    warmup: [
      { exerciseId: 'mat-wgs', sets: 1, restSec: 0, durationSec: 60 },
      { exerciseId: 'mat-shoulder-opener', sets: 1, restSec: 0, durationSec: 45, bandSuggestion: 'light' },
      { exerciseId: 'band-pull-apart', sets: 2, restSec: 30, reps: 12, bandSuggestion: 'light' },
      { exerciseId: 'mat-bird-dog', sets: 1, restSec: 0, reps: 6, notes: 'Each side' },
    ],
    main: [
      { exerciseId: 'bar-push-up', sets: 3, restSec: 75, reps: 6, notes: 'Drop to knees only if form breaks' },
      { exerciseId: 'bar-dip', sets: 3, restSec: 75, reps: 5, notes: 'Flip to dip hooks — band under knees OK' },
      { exerciseId: 'band-press', sets: 3, restSec: 60, reps: 12, bandSuggestion: 'medium' },
      { exerciseId: 'band-face-pull', sets: 3, restSec: 45, reps: 15, bandSuggestion: 'light' },
      { exerciseId: 'mat-side-plank', sets: 2, restSec: 45, durationSec: 20, notes: 'Each side' },
    ],
    cooldown: [
      { exerciseId: 'mat-hip-opener', sets: 1, restSec: 0, durationSec: 60 },
      { exerciseId: 'mat-cat-cow', sets: 1, restSec: 0, durationSec: 45 },
    ],
  },
  {
    day: 9,
    title: 'Pull — Negatives & Rows',
    type: 'train',
    focus: 'Eccentric strength + horizontal pull',
    estimatedMinutes: 40,
    warmup: [
      { exerciseId: 'mat-cat-cow', sets: 1, restSec: 0, durationSec: 45 },
      { exerciseId: 'mat-shoulder-opener', sets: 1, restSec: 0, durationSec: 45, bandSuggestion: 'light' },
      { exerciseId: 'pull-dead-hang', sets: 2, restSec: 45, durationSec: 20 },
      { exerciseId: 'band-pull-apart', sets: 2, restSec: 30, reps: 15, bandSuggestion: 'light' },
    ],
    main: [
      { exerciseId: 'pull-negative', sets: 4, restSec: 90, reps: 4, notes: '3–5 sec lowering' },
      { exerciseId: 'band-assisted-pull-up', sets: 3, restSec: 90, reps: 6, bandSuggestion: 'heavy' },
      { exerciseId: 'band-row', sets: 3, restSec: 60, reps: 10, bandSuggestion: 'heavy' },
      { exerciseId: 'band-face-pull', sets: 3, restSec: 45, reps: 12, bandSuggestion: 'light' },
      { exerciseId: 'band-pallof', sets: 2, restSec: 45, reps: 10, notes: 'Each side', bandSuggestion: 'light' },
    ],
    cooldown: [
      { exerciseId: 'mat-hip-opener', sets: 1, restSec: 0, durationSec: 60 },
      { exerciseId: 'mat-wgs', sets: 1, restSec: 0, durationSec: 45 },
    ],
  },
  {
    day: 10,
    title: 'Active Recovery B — Light Bands + Hips',
    type: 'active-recovery',
    focus: 'Easy band work & hip mobility',
    estimatedMinutes: 25,
    warmup: [],
    main: [
      { exerciseId: 'band-pull-apart', sets: 3, restSec: 30, reps: 15, bandSuggestion: 'light' },
      { exerciseId: 'band-face-pull', sets: 2, restSec: 40, reps: 12, bandSuggestion: 'light' },
      { exerciseId: 'mat-hip-opener', sets: 2, restSec: 20, durationSec: 50 },
      { exerciseId: 'mat-glute-bridge', sets: 3, restSec: 30, reps: 12 },
      { exerciseId: 'band-good-morning', sets: 2, restSec: 40, reps: 10, bandSuggestion: 'light', notes: 'Easy hinge — feel hamstrings' },
      { exerciseId: 'mat-wgs', sets: 2, restSec: 30, durationSec: 45 },
    ],
    cooldown: [],
  },
  {
    day: 11,
    title: 'Legs + Hanging Core',
    type: 'train',
    focus: 'Lower body strength & hanging knee raises',
    estimatedMinutes: 38,
    warmup: [
      { exerciseId: 'mat-cat-cow', sets: 1, restSec: 0, durationSec: 45 },
      { exerciseId: 'mat-hip-opener', sets: 1, restSec: 0, durationSec: 60 },
      { exerciseId: 'mat-glute-bridge', sets: 2, restSec: 30, reps: 10 },
      { exerciseId: 'mat-wgs', sets: 1, restSec: 0, durationSec: 45 },
    ],
    main: [
      { exerciseId: 'band-squat', sets: 4, restSec: 60, reps: 12, bandSuggestion: 'medium' },
      { exerciseId: 'band-good-morning', sets: 3, restSec: 60, reps: 12, bandSuggestion: 'medium' },
      { exerciseId: 'mat-glute-bridge', sets: 3, restSec: 45, reps: 15 },
      { exerciseId: 'band-lat-pulldown', sets: 2, restSec: 60, reps: 12, bandSuggestion: 'medium', notes: 'Light upper pull for balance' },
      { exerciseId: 'pull-hanging-knee', sets: 3, restSec: 60, reps: 8 },
    ],
    cooldown: [
      { exerciseId: 'mat-shoulder-opener', sets: 1, restSec: 0, durationSec: 60, bandSuggestion: 'light' },
      { exerciseId: 'band-pull-apart', sets: 1, restSec: 0, reps: 12, bandSuggestion: 'light' },
    ],
  },
  {
    day: 12,
    title: 'Full-Body Density',
    type: 'train',
    focus: 'Push, pull, squat — tighter rest',
    estimatedMinutes: 42,
    warmup: [
      { exerciseId: 'mat-wgs', sets: 1, restSec: 0, durationSec: 50 },
      { exerciseId: 'mat-bird-dog', sets: 1, restSec: 0, reps: 6, notes: 'Each side' },
      { exerciseId: 'band-pull-apart', sets: 2, restSec: 30, reps: 12, bandSuggestion: 'light' },
      { exerciseId: 'mat-hip-opener', sets: 1, restSec: 0, durationSec: 45 },
    ],
    main: [
      { exerciseId: 'bar-push-up', sets: 3, restSec: 60, reps: 8 },
      { exerciseId: 'band-assisted-pull-up', sets: 3, restSec: 90, reps: 6, notes: 'Try medium if heavy feels easy', bandSuggestion: 'medium' },
      { exerciseId: 'band-squat', sets: 3, restSec: 60, reps: 15, bandSuggestion: 'medium' },
      { exerciseId: 'band-row', sets: 3, restSec: 60, reps: 12, bandSuggestion: 'medium' },
      { exerciseId: 'bar-dip', sets: 2, restSec: 75, reps: 5, notes: 'Quality lockouts — band OK' },
      { exerciseId: 'mat-reverse-crunch', sets: 3, restSec: 40, reps: 12 },
    ],
    cooldown: [
      { exerciseId: 'mat-shoulder-opener', sets: 1, restSec: 0, durationSec: 60, bandSuggestion: 'light' },
      { exerciseId: 'mat-cat-cow', sets: 1, restSec: 0, durationSec: 45 },
    ],
  },
  {
    day: 13,
    title: 'Pull Skill — Negatives Peak',
    type: 'train',
    focus: 'Slow eccentrics + assisted volume',
    estimatedMinutes: 42,
    warmup: [
      { exerciseId: 'mat-cat-cow', sets: 1, restSec: 0, durationSec: 45 },
      { exerciseId: 'mat-shoulder-opener', sets: 1, restSec: 0, durationSec: 45, bandSuggestion: 'light' },
      { exerciseId: 'pull-dead-hang', sets: 2, restSec: 45, durationSec: 20 },
      { exerciseId: 'band-pull-apart', sets: 2, restSec: 30, reps: 15, bandSuggestion: 'light' },
    ],
    main: [
      { exerciseId: 'pull-scapular', sets: 3, restSec: 40, reps: 10 },
      { exerciseId: 'pull-negative', sets: 4, restSec: 90, reps: 4, notes: '5-sec negatives if possible' },
      { exerciseId: 'band-assisted-pull-up', sets: 3, restSec: 90, reps: 6, bandSuggestion: 'medium' },
      { exerciseId: 'band-lat-pulldown', sets: 3, restSec: 60, reps: 12, bandSuggestion: 'medium' },
      { exerciseId: 'bar-supported-knee-raise', sets: 3, restSec: 60, reps: 10, notes: 'Flip to dip / leg-raise hooks' },
    ],
    cooldown: [
      { exerciseId: 'mat-hip-opener', sets: 1, restSec: 0, durationSec: 60 },
      { exerciseId: 'mat-wgs', sets: 1, restSec: 0, durationSec: 45 },
    ],
  },
  {
    day: 14,
    title: 'Full Rest',
    type: 'rest',
    focus: 'Recovery',
    estimatedMinutes: 0,
    warmup: [],
    main: [],
    cooldown: [],
  },

  // ——— Week 3 ———
  {
    day: 15,
    title: 'Push Volume + Dips',
    type: 'train',
    focus: 'Higher push reps & station dips',
    estimatedMinutes: 42,
    warmup: [
      { exerciseId: 'mat-wgs', sets: 1, restSec: 0, durationSec: 60 },
      { exerciseId: 'mat-shoulder-opener', sets: 1, restSec: 0, durationSec: 45, bandSuggestion: 'light' },
      { exerciseId: 'band-pull-apart', sets: 2, restSec: 30, reps: 12, bandSuggestion: 'light' },
      { exerciseId: 'mat-bird-dog', sets: 1, restSec: 0, reps: 6, notes: 'Each side' },
    ],
    main: [
      { exerciseId: 'bar-push-up', sets: 3, restSec: 75, reps: 10 },
      { exerciseId: 'bar-dip', sets: 3, restSec: 75, reps: 8, notes: 'Full range on BDL dip handles' },
      { exerciseId: 'bar-pike-push-up', sets: 3, restSec: 75, reps: 6, notes: 'Quality over depth' },
      { exerciseId: 'band-face-pull', sets: 3, restSec: 45, reps: 15, bandSuggestion: 'light' },
      { exerciseId: 'mat-plank', sets: 3, restSec: 45, durationSec: 35 },
    ],
    cooldown: [
      { exerciseId: 'mat-hip-opener', sets: 1, restSec: 0, durationSec: 60 },
      { exerciseId: 'mat-cat-cow', sets: 1, restSec: 0, durationSec: 45 },
    ],
  },
  {
    day: 16,
    title: 'Pull — Chin-Up Focus',
    type: 'train',
    focus: 'Supinated pulls + eccentric support',
    estimatedMinutes: 45,
    warmup: [
      { exerciseId: 'mat-cat-cow', sets: 1, restSec: 0, durationSec: 45 },
      { exerciseId: 'mat-shoulder-opener', sets: 1, restSec: 0, durationSec: 45, bandSuggestion: 'light' },
      { exerciseId: 'pull-dead-hang', sets: 2, restSec: 45, durationSec: 20 },
      { exerciseId: 'band-pull-apart', sets: 2, restSec: 30, reps: 15, bandSuggestion: 'light' },
    ],
    main: [
      { exerciseId: 'pull-chin-up', sets: 4, restSec: 120, reps: 3, notes: 'Band assist OK — cluster reps fine' },
      { exerciseId: 'pull-negative', sets: 3, restSec: 90, reps: 4, notes: '4–5 sec lowers' },
      { exerciseId: 'band-lat-pulldown', sets: 3, restSec: 60, reps: 12, bandSuggestion: 'heavy' },
      { exerciseId: 'band-face-pull', sets: 3, restSec: 45, reps: 12, bandSuggestion: 'light' },
      { exerciseId: 'mat-hollow', sets: 3, restSec: 45, durationSec: 30 },
    ],
    cooldown: [
      { exerciseId: 'mat-hip-opener', sets: 1, restSec: 0, durationSec: 60 },
      { exerciseId: 'mat-wgs', sets: 1, restSec: 0, durationSec: 45 },
    ],
  },
  {
    day: 17,
    title: 'Active Recovery C — Core + Stretch',
    type: 'active-recovery',
    focus: 'Gentle core work & long stretches',
    estimatedMinutes: 25,
    warmup: [],
    main: [
      { exerciseId: 'mat-bird-dog', sets: 2, restSec: 30, reps: 8, notes: 'Each side' },
      { exerciseId: 'mat-dead-bug', sets: 2, restSec: 30, reps: 8, notes: 'Each side — slow' },
      { exerciseId: 'mat-plank', sets: 2, restSec: 40, durationSec: 25 },
      { exerciseId: 'mat-reverse-crunch', sets: 2, restSec: 40, reps: 10 },
      { exerciseId: 'mat-cat-cow', sets: 2, restSec: 20, durationSec: 50 },
      { exerciseId: 'mat-shoulder-opener', sets: 2, restSec: 20, durationSec: 50, bandSuggestion: 'light' },
      { exerciseId: 'mat-hip-opener', sets: 2, restSec: 20, durationSec: 50 },
    ],
    cooldown: [],
  },
  {
    day: 18,
    title: 'Legs + Supported Core',
    type: 'train',
    focus: 'Heavy squats & supported knee raises',
    estimatedMinutes: 38,
    warmup: [
      { exerciseId: 'mat-cat-cow', sets: 1, restSec: 0, durationSec: 45 },
      { exerciseId: 'mat-hip-opener', sets: 1, restSec: 0, durationSec: 60 },
      { exerciseId: 'mat-glute-bridge', sets: 2, restSec: 30, reps: 10 },
      { exerciseId: 'mat-wgs', sets: 1, restSec: 0, durationSec: 45 },
    ],
    main: [
      { exerciseId: 'band-squat', sets: 4, restSec: 60, reps: 15, bandSuggestion: 'heavy' },
      { exerciseId: 'band-good-morning', sets: 3, restSec: 60, reps: 12, bandSuggestion: 'medium' },
      { exerciseId: 'mat-glute-bridge', sets: 3, restSec: 45, reps: 15 },
      { exerciseId: 'mat-mountain-climber', sets: 2, restSec: 45, durationSec: 35 },
      { exerciseId: 'bar-supported-knee-raise', sets: 3, restSec: 60, reps: 12, notes: 'Flip to dip / leg-raise hooks' },
    ],
    cooldown: [
      { exerciseId: 'mat-shoulder-opener', sets: 1, restSec: 0, durationSec: 60, bandSuggestion: 'light' },
      { exerciseId: 'band-pull-apart', sets: 1, restSec: 0, reps: 12, bandSuggestion: 'light' },
    ],
  },
  {
    day: 19,
    title: 'Full-Body Power',
    type: 'train',
    focus: 'Compounds + anti-extension core',
    estimatedMinutes: 42,
    warmup: [
      { exerciseId: 'mat-wgs', sets: 1, restSec: 0, durationSec: 50 },
      { exerciseId: 'mat-bird-dog', sets: 1, restSec: 0, reps: 6, notes: 'Each side' },
      { exerciseId: 'band-pull-apart', sets: 2, restSec: 30, reps: 12, bandSuggestion: 'light' },
      { exerciseId: 'mat-hip-opener', sets: 1, restSec: 0, durationSec: 45 },
    ],
    main: [
      { exerciseId: 'bar-push-up', sets: 3, restSec: 60, reps: 12 },
      { exerciseId: 'pull-chin-up', sets: 3, restSec: 90, reps: 3 },
      { exerciseId: 'band-squat', sets: 3, restSec: 60, reps: 15, bandSuggestion: 'heavy' },
      { exerciseId: 'band-row', sets: 3, restSec: 60, reps: 12, bandSuggestion: 'heavy' },
      { exerciseId: 'bar-pike-push-up', sets: 2, restSec: 60, reps: 8 },
      { exerciseId: 'mat-dead-bug', sets: 3, restSec: 40, reps: 8, notes: 'Each side' },
    ],
    cooldown: [
      { exerciseId: 'mat-shoulder-opener', sets: 1, restSec: 0, durationSec: 60, bandSuggestion: 'light' },
      { exerciseId: 'mat-cat-cow', sets: 1, restSec: 0, durationSec: 45 },
    ],
  },
  {
    day: 20,
    title: 'Pull Skill — First Pull-Ups',
    type: 'train',
    focus: 'Pronated pull-up attempts + chin volume',
    estimatedMinutes: 45,
    warmup: [
      { exerciseId: 'mat-cat-cow', sets: 1, restSec: 0, durationSec: 45 },
      { exerciseId: 'mat-shoulder-opener', sets: 1, restSec: 0, durationSec: 45, bandSuggestion: 'light' },
      { exerciseId: 'pull-dead-hang', sets: 2, restSec: 45, durationSec: 20 },
      { exerciseId: 'band-pull-apart', sets: 2, restSec: 30, reps: 15, bandSuggestion: 'light' },
    ],
    main: [
      { exerciseId: 'pull-scapular', sets: 3, restSec: 40, reps: 12 },
      { exerciseId: 'pull-up', sets: 5, restSec: 120, reps: 1, notes: 'Max-effort singles — band assist for 1 clean rep OK' },
      { exerciseId: 'pull-chin-up', sets: 3, restSec: 90, reps: 4 },
      { exerciseId: 'band-lat-pulldown', sets: 3, restSec: 60, reps: 12, bandSuggestion: 'heavy' },
      { exerciseId: 'pull-hanging-knee', sets: 3, restSec: 60, reps: 10 },
    ],
    cooldown: [
      { exerciseId: 'mat-hip-opener', sets: 1, restSec: 0, durationSec: 60 },
      { exerciseId: 'mat-wgs', sets: 1, restSec: 0, durationSec: 45 },
    ],
  },
  {
    day: 21,
    title: 'Full Rest',
    type: 'rest',
    focus: 'Recovery',
    estimatedMinutes: 0,
    warmup: [],
    main: [],
    cooldown: [],
  },

  // ——— Week 4 ———
  {
    day: 22,
    title: 'Push Strength Peak',
    type: 'train',
    focus: 'Quality push-ups, dips & close-grip',
    estimatedMinutes: 42,
    warmup: [
      { exerciseId: 'mat-wgs', sets: 1, restSec: 0, durationSec: 60 },
      { exerciseId: 'mat-shoulder-opener', sets: 1, restSec: 0, durationSec: 45, bandSuggestion: 'light' },
      { exerciseId: 'band-pull-apart', sets: 2, restSec: 30, reps: 12, bandSuggestion: 'light' },
      { exerciseId: 'mat-bird-dog', sets: 1, restSec: 0, reps: 6, notes: 'Each side' },
    ],
    main: [
      { exerciseId: 'bar-push-up', sets: 3, restSec: 75, reps: 12 },
      { exerciseId: 'bar-dip', sets: 4, restSec: 75, reps: 8, notes: 'Quality lockouts on BDL handles' },
      { exerciseId: 'bar-diamond-push-up', sets: 3, restSec: 75, reps: 8 },
      { exerciseId: 'band-row', sets: 3, restSec: 60, reps: 12, bandSuggestion: 'heavy', notes: 'Horizontal balance after heavy press' },
      { exerciseId: 'mat-side-plank', sets: 2, restSec: 40, durationSec: 30, notes: 'Each side' },
    ],
    cooldown: [
      { exerciseId: 'mat-hip-opener', sets: 1, restSec: 0, durationSec: 60 },
      { exerciseId: 'mat-cat-cow', sets: 1, restSec: 0, durationSec: 45 },
    ],
  },
  {
    day: 23,
    title: 'Pull-Up Practice',
    type: 'train',
    focus: 'Pull-up skill volume + hanging leg raises',
    estimatedMinutes: 45,
    warmup: [
      { exerciseId: 'mat-cat-cow', sets: 1, restSec: 0, durationSec: 45 },
      { exerciseId: 'mat-shoulder-opener', sets: 1, restSec: 0, durationSec: 45, bandSuggestion: 'light' },
      { exerciseId: 'pull-dead-hang', sets: 2, restSec: 45, durationSec: 20 },
      { exerciseId: 'band-pull-apart', sets: 2, restSec: 30, reps: 15, bandSuggestion: 'light' },
    ],
    main: [
      { exerciseId: 'pull-up', sets: 5, restSec: 120, reps: 2, notes: 'Cluster if needed — ~8–10 quality reps total' },
      { exerciseId: 'pull-chin-up', sets: 3, restSec: 90, reps: 5 },
      { exerciseId: 'band-face-pull', sets: 3, restSec: 45, reps: 15, bandSuggestion: 'light' },
      { exerciseId: 'band-assisted-pull-up', sets: 2, restSec: 75, reps: 8, notes: 'Light band back-off volume', bandSuggestion: 'light' },
      { exerciseId: 'pull-hanging-leg-raise', sets: 3, restSec: 60, reps: 6, notes: 'Bend knees to regress' },
    ],
    cooldown: [
      { exerciseId: 'mat-hip-opener', sets: 1, restSec: 0, durationSec: 60 },
      { exerciseId: 'mat-wgs', sets: 1, restSec: 0, durationSec: 45 },
    ],
  },
  {
    day: 24,
    title: 'Active Recovery D — Easy Legs + Mobility',
    type: 'active-recovery',
    focus: 'Posterior chain flush & mobility',
    estimatedMinutes: 25,
    warmup: [],
    main: [
      { exerciseId: 'mat-glute-bridge', sets: 3, restSec: 30, reps: 15 },
      { exerciseId: 'band-good-morning', sets: 2, restSec: 40, reps: 12, bandSuggestion: 'light' },
      { exerciseId: 'band-squat', sets: 2, restSec: 45, reps: 10, bandSuggestion: 'light', notes: 'Easy depth — no grind' },
      { exerciseId: 'mat-hip-opener', sets: 2, restSec: 20, durationSec: 50 },
      { exerciseId: 'mat-wgs', sets: 2, restSec: 30, durationSec: 45 },
      { exerciseId: 'mat-cat-cow', sets: 2, restSec: 20, durationSec: 45 },
      { exerciseId: 'pull-dead-hang', sets: 2, restSec: 60, durationSec: 30, notes: 'Easy hang — decompress' },
    ],
    cooldown: [],
  },
  {
    day: 25,
    title: 'Legs + Anti-Rotation',
    type: 'train',
    focus: 'Lower body & Pallof press finisher',
    estimatedMinutes: 38,
    warmup: [
      { exerciseId: 'mat-cat-cow', sets: 1, restSec: 0, durationSec: 45 },
      { exerciseId: 'mat-hip-opener', sets: 1, restSec: 0, durationSec: 60 },
      { exerciseId: 'mat-glute-bridge', sets: 2, restSec: 30, reps: 10 },
      { exerciseId: 'mat-wgs', sets: 1, restSec: 0, durationSec: 45 },
    ],
    main: [
      { exerciseId: 'band-squat', sets: 4, restSec: 60, reps: 15, bandSuggestion: 'heavy' },
      { exerciseId: 'band-good-morning', sets: 3, restSec: 60, reps: 12, bandSuggestion: 'medium' },
      { exerciseId: 'mat-glute-bridge', sets: 3, restSec: 45, reps: 15 },
      { exerciseId: 'band-face-pull', sets: 2, restSec: 45, reps: 12, bandSuggestion: 'light' },
      { exerciseId: 'band-pallof', sets: 3, restSec: 45, reps: 10, notes: 'Each side', bandSuggestion: 'medium' },
    ],
    cooldown: [
      { exerciseId: 'mat-shoulder-opener', sets: 1, restSec: 0, durationSec: 60, bandSuggestion: 'light' },
      { exerciseId: 'band-pull-apart', sets: 1, restSec: 0, reps: 12, bandSuggestion: 'light' },
    ],
  },
  {
    day: 26,
    title: 'Full-Body Intensity',
    type: 'train',
    focus: 'Dips, pull-ups, squats — higher density',
    estimatedMinutes: 42,
    warmup: [
      { exerciseId: 'mat-wgs', sets: 1, restSec: 0, durationSec: 50 },
      { exerciseId: 'mat-bird-dog', sets: 1, restSec: 0, reps: 6, notes: 'Each side' },
      { exerciseId: 'band-pull-apart', sets: 2, restSec: 30, reps: 12, bandSuggestion: 'light' },
      { exerciseId: 'mat-hip-opener', sets: 1, restSec: 0, durationSec: 45 },
    ],
    main: [
      { exerciseId: 'bar-dip', sets: 3, restSec: 70, reps: 10 },
      { exerciseId: 'pull-up', sets: 4, restSec: 90, reps: 2 },
      { exerciseId: 'band-squat', sets: 3, restSec: 60, reps: 15, bandSuggestion: 'heavy' },
      { exerciseId: 'band-row', sets: 3, restSec: 50, reps: 12, bandSuggestion: 'heavy' },
      { exerciseId: 'bar-diamond-push-up', sets: 2, restSec: 60, reps: 10 },
      { exerciseId: 'mat-reverse-crunch', sets: 3, restSec: 40, reps: 12 },
    ],
    cooldown: [
      { exerciseId: 'mat-shoulder-opener', sets: 1, restSec: 0, durationSec: 60, bandSuggestion: 'light' },
      { exerciseId: 'mat-cat-cow', sets: 1, restSec: 0, durationSec: 45 },
    ],
  },
  {
    day: 27,
    title: 'Pull Skill — Capacity',
    type: 'train',
    focus: 'Pull-up volume + hanging leg raises',
    estimatedMinutes: 45,
    warmup: [
      { exerciseId: 'mat-cat-cow', sets: 1, restSec: 0, durationSec: 45 },
      { exerciseId: 'mat-shoulder-opener', sets: 1, restSec: 0, durationSec: 45, bandSuggestion: 'light' },
      { exerciseId: 'pull-dead-hang', sets: 2, restSec: 45, durationSec: 20 },
      { exerciseId: 'band-pull-apart', sets: 2, restSec: 30, reps: 15, bandSuggestion: 'light' },
    ],
    main: [
      { exerciseId: 'pull-up', sets: 6, restSec: 100, reps: 2, notes: 'Aim for 10–12 total quality pull-ups' },
      { exerciseId: 'pull-chin-up', sets: 3, restSec: 90, reps: 5 },
      { exerciseId: 'pull-negative', sets: 2, restSec: 90, reps: 4, notes: 'Slow lowers after fresh sets' },
      { exerciseId: 'band-lat-pulldown', sets: 2, restSec: 60, reps: 12, bandSuggestion: 'heavy' },
      { exerciseId: 'pull-hanging-leg-raise', sets: 3, restSec: 60, reps: 8 },
    ],
    cooldown: [
      { exerciseId: 'mat-hip-opener', sets: 1, restSec: 0, durationSec: 60 },
      { exerciseId: 'mat-wgs', sets: 1, restSec: 0, durationSec: 45 },
    ],
  },
  {
    day: 28,
    title: 'Full Rest',
    type: 'rest',
    focus: 'Recovery before finale',
    estimatedMinutes: 0,
    warmup: [],
    main: [],
    cooldown: [],
  },

  // ——— Finale ———
  {
    day: 29,
    title: 'Peak Test Day',
    type: 'train',
    focus: 'Retest max pull-ups, push-ups & hang',
    estimatedMinutes: 40,
    warmup: [
      { exerciseId: 'mat-wgs', sets: 1, restSec: 0, durationSec: 50 },
      { exerciseId: 'mat-bird-dog', sets: 1, restSec: 0, reps: 6, notes: 'Each side' },
      { exerciseId: 'band-pull-apart', sets: 2, restSec: 30, reps: 12, bandSuggestion: 'light' },
      { exerciseId: 'mat-hip-opener', sets: 1, restSec: 0, durationSec: 45 },
    ],
    main: [
      { exerciseId: 'pull-up', sets: 1, restSec: 180, reps: 1, notes: 'Max unbroken set — record your number' },
      { exerciseId: 'bar-push-up', sets: 1, restSec: 180, reps: 1, notes: 'Max unbroken set — record your number' },
      { exerciseId: 'pull-dead-hang', sets: 1, restSec: 120, durationSec: 1, notes: 'Max hang time — record seconds' },
      { exerciseId: 'pull-chin-up', sets: 3, restSec: 90, reps: 5, notes: 'Clean volume after testing' },
      { exerciseId: 'bar-dip', sets: 2, restSec: 75, reps: 8 },
      { exerciseId: 'bar-pike-push-up', sets: 2, restSec: 75, reps: 8 },
      { exerciseId: 'mat-hollow', sets: 2, restSec: 40, durationSec: 40 },
    ],
    cooldown: [
      { exerciseId: 'mat-shoulder-opener', sets: 1, restSec: 0, durationSec: 60, bandSuggestion: 'light' },
      { exerciseId: 'mat-cat-cow', sets: 1, restSec: 0, durationSec: 45 },
    ],
  },
  {
    day: 30,
    title: 'Graduation Circuit',
    type: 'train',
    focus: 'Celebrate consistency — full-body circuit',
    estimatedMinutes: 40,
    warmup: [
      { exerciseId: 'mat-wgs', sets: 1, restSec: 0, durationSec: 50 },
      { exerciseId: 'mat-bird-dog', sets: 1, restSec: 0, reps: 6, notes: 'Each side' },
      { exerciseId: 'band-pull-apart', sets: 2, restSec: 30, reps: 12, bandSuggestion: 'light' },
      { exerciseId: 'mat-hip-opener', sets: 1, restSec: 0, durationSec: 45 },
    ],
    main: [
      { exerciseId: 'bar-push-up', sets: 3, restSec: 50, reps: 10 },
      { exerciseId: 'pull-up', sets: 3, restSec: 75, reps: 3, notes: 'Or best assisted variation' },
      { exerciseId: 'bar-dip', sets: 2, restSec: 50, reps: 8, notes: 'Celebrate station pressing' },
      { exerciseId: 'band-squat', sets: 2, restSec: 50, reps: 12, bandSuggestion: 'medium' },
      { exerciseId: 'band-row', sets: 2, restSec: 50, reps: 12, bandSuggestion: 'medium' },
      { exerciseId: 'pull-hanging-leg-raise', sets: 2, restSec: 50, reps: 8 },
    ],
    cooldown: [
      { exerciseId: 'mat-shoulder-opener', sets: 1, restSec: 0, durationSec: 60, bandSuggestion: 'light' },
      { exerciseId: 'mat-cat-cow', sets: 1, restSec: 0, durationSec: 45 },
    ],
  },
];

export function getDay(day: number): PlanDay | undefined {
  return plan.find((d) => d.day === day);
}


/** Hero male-figure animation for a plan day (calendar thumbs, today card). */
export function getHeroAnimationId(day: PlanDay): AnimationId {
  const hero = day.main[0] ?? day.warmup[0];
  if (hero) return getExercise(hero.exerciseId).animationId;
  // Rest / empty days: calm male recovery pose (easy dead hang)
  return 'dead-hang';
}

export function getTodayPlanDay(completedDays: number[]): PlanDay {
  const next = plan.find((d) => !completedDays.includes(d.day));
  return next ?? plan[plan.length - 1]!;
}

export const TRAIN_DAYS = plan.filter((d) => d.type === 'train').length;
export const TOTAL_DAYS = plan.length;
