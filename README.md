# Callisthenics Home Gym

A polished **Vite + React + TypeScript + Tailwind CSS** progressive web app for a **30-day beginner to intermediate** home callisthenics plan. Built around one goal: earn your first clean pull-ups (and build the push / core base to support them).

## Equipment (only)

- Yoga mat
- Floor push-up bars
- Resistance bands (light / medium / heavy)
- **BDL wall-hook pull-up / dip station** ([Amazon](https://a.co/d/0ar2Fena)) — one black-steel piece that **flips and remounts** on different wall-hook heights for pull-up orientation vs dip / leg-raise orientation. Hangs on wall hooks only (no floor-standing posts or power-rack rails). Orange-and-black spiral grips, arm pads, back cushion, multi-grip bar, dip handles, accessory rings.

No other gear is programmed into the plan.

## Plan philosophy

- About **5-6 train days per week** plus active recovery and full rest
- Sessions **about 30-45 minutes** with mat warm-up and cool-down
- Progression path: scapular pulls -> dead hangs -> band-assisted pull-ups -> negatives -> chin-ups -> pull-ups
- Push-up bar work for chest/shoulders/triceps with wrist-friendly depth
- Band rows, pull-aparts, and face pulls to balance pressing
- Dedicated core track: hollow body → hanging knee / supported raises → hanging leg raises, plus dead bugs, reverse crunches, Pallof presses, and side planks
- Day 29 is a light retest (max pull-ups, push-ups, hang); Day 30 is a celebration circuit

## Assumptions

- You can get into a basic plank and hang from a bar for a few seconds
- Your BDL station is hung on securely installed wall hooks and rated for dynamic bodyweight use; flip/remount between pull-up and dip hook heights as needed
- Bands can be looped over the multi-grip bar (pull-up orientation) for assistance and lat pulldowns
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

## Guided training experience

- `/training`: saved equipment, foundation/standard effort, focus, and weekly attendance target; pull-up, push-up, and core learning paths.
- Day previews support shorter or easier sessions and explicitly list substitutions and unavailable exercises. The weekly target does not reschedule the underlying plan.
- Record actual reps/seconds, optional voice prompts, post-session effort, partial workouts, favorites, history, and best sets grouped by band assistance. Export up to 200 locally saved sessions as JSON.
- Existing completed days are preserved. Unsaved cursors from the old player are not migrated; new sessions save both cursor and recorded sets.
- See [product research and implementation limits](docs/product-research.md) for the comparison of Calistree, Freeletics, THENX, and BetterMe.

- Responsive men's training dashboard with the next unfinished day, week overview, and actual plan completion.
- Four plan chapters, including days 29 and 30 in the final chapter.
- `/library`: searchable exercise names and muscles, combined with equipment filters.
- `/workout/:dayId`: guided warm-up, main work, and cool-down with individual sets, manual rep completion, hold/rest timers, pause/resume, and explicit workout saving.
- Session position survives navigation/reload in the same tab. The current step restarts paused; unsaved completed sessions remain ready to save. Replaying a completed day does not remove it from progress.
- Progress remains device-local under the existing storage key. A visible warning explains when the browser cannot persist it. No account, cross-device sync, or personalized prescription engine is included.
- The existing exercise images and SVG fallback demos are retained. The design uses original branding, not BetterMe assets.

### Browser regression checks

```bash
npm ci
npx playwright install chromium
npm run test:e2e
npm run build
npm run lint
```

Tests cover desktop and mobile layouts, exercise filtering, finale navigation, timers, session reload, full workout completion, replay, rest days, invalid routes, and unavailable storage. If using an existing Chrome for Testing installation, set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to its executable path.
