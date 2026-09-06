# Callisthenics Home Gym

A polished **Vite + React + TypeScript + Tailwind CSS** progressive web app for a **30-day beginner to intermediate** home callisthenics plan. Built around one goal: earn your first clean pull-ups (and build the push / core base to support them).

## Equipment (only)

- Yoga mat
- Flor push-up bars
- Resistance bands (light / medium / heavy)
- Wall-mounted pull-up / chin-up bar (BDL)

No other gear is programmed into the plan.

## Plan philosophy

- About **5-6 train days per week** plus active recovery and full rest
- Sessions **about 30-45 minutes** with mat warm-up and cool-down
- Progression path: scapular pulls -> dead hangs -> band-assisted pull-ups -> negatives -> chin-ups -> pull-ups
- Push-up bar work for chest/shoulders/triceps with wrist-friendly depth
- Band rows, pull-aparts, and face pulls to balance pressing
- Hollow body, hanging knee raises, and planks for core transfer to the bar
- Day 29 is a light retest (max pull-ups, push-ups, hang); Day 30 is a celebration circuit

## Assumptions

- You can get into a basic plank and hang from a bar for a few seconds
- Your wall bar (BDL) is securely mounted and rated for dynamic bodyweight use
- Bands can be looped over the pull-up bar for assistance and lat pulldowns
- Progress is tracked in localStorage on the device (no account / backend)
- Pain is not progress - skip or regress any movement that hurts joints

## Screens

| Route | Purpose |
|-------|--------|
| `/` | Today's workout + streak / progress snapshot |
| `/calendar` | 30-day calendar with completion state |
| `/day/:dayId` | Warm-up, main, cool-down with sets/reps/rest + equipment tags |
| `/exercise/:exerciseId` | 2D looping form animation + cues |
| `/progress` | Streak, completion %, reset |

## 2D animations

`ExerciseAnimation` renders SVG stick-figure poses (hang, push, pike, stand, hinge, and more) with CSS keyframe loops selected by `animationId`. Equipment hints (mat, bars, band, pull-up bar) appear in the scene.

## Run locally

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Tech

- Vite + React 19 + TypeScript
- Tailwind CSS v4 (@tailwindcss/vite)
- React Router
- PWA-ready manifest + theme color (installable on mobile)

## Project structure

```
src/
  animations/exercise.css
  components/
  context/ProgressContext.tsx
  data/
  hooks/useProgress.ts
  pages/
```

## License

Personal / private use for the repo owner.
