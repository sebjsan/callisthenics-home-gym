# Callisthenics Home Gym

A Vite + React + TypeScript app for men's home calisthenics, with an original **Balanced Foundations** program inspired by public features of Calistree, Freeletics, THENX, and BetterMe.

## The rebuilt 30-day program

Each full week has three full-body strength sessions, two easy movement days, and two full rest days. Strength sessions cover pressing, pulling, lower-body work, and core control. Week 1 introduces the movements, week 2 adds reps, week 3 adds sets, and week 4 reduces volume. Day 29 repeats the day-1 baseline; day 30 is recovery and review. Targets are suggestions: repeat earlier sessions when needed and keep roughly 2–3 clean reps in reserve.

Harder push-ups and unassisted pull-ups require an explicit profile choice. Dates do not unlock advanced exercises. The weekly attendance target includes saved recovery sessions and does not rearrange the program.

## Exercises and guidance

Ten new movements expand equipment-free pressing, squats, lunges, split squats, calves, hinges, shoulder control, easy marching, and side-plank regressions. They include photorealistic generated male exercise images and written technique cues; videos are not supplied for these additions. Existing exercise photos and SVG fallbacks remain. Progression links and readiness guidance connect related movements.

The supported gear is a mat, floor push-up bars, light/medium/heavy bands, and a securely mounted BDL pull-up/dip station. Equipment-aware substitutions preserve practical alternatives where possible. When no pulling equipment is available, pulling work is explicitly omitted; floor shoulder drills are not presented as equivalent to loaded pulling.

## Features

- Daily dashboard, four program phases, exercise search, no-equipment filter, and favorites.
- Saved effort and variation choices, short/easier session controls, and visible changes before starting.
- Guided sets, pause/resume timers, optional spoken prompts, and actual rep/second logging.
- Two-sided holds use a timer for both sides and record seconds per side; pause to switch.
- Partial workouts, effort feedback, band-specific best sets, baseline/review comparison, and JSON export.
- Brighter blue accents on charcoal surfaces.

## Stored data

No account or cloud sync. New program completion uses `chg-progress-balanced-v2`; the original `chg-progress-v1` is preserved and can be exported with its original plan from Progress. History, profile, and favorites remain under `chg-training-v1`, retaining the latest 200 workouts. Old records are labeled Original program. Current sessions use a program-scoped v3 sessionStorage key. Earlier unsaved sessions are not migrated to changed prescriptions.

## Run and verify

```sh
npm ci
npm run dev
npm run build
npm run lint
npx playwright install chromium
npm run test:e2e -- --workers=4
```

If using an existing Chrome for Testing installation, set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to its executable path.

Desktop and mobile checks cover program structure, all 32 equipment combinations, both effort levels, variation choices, archive preservation/export, new movement guidance, two-sided timers, settings persistence, session reload, save retry, partial workouts, and storage failures.

See [research and implementation limits](docs/product-research.md). The app uses original programming and content; it does not reproduce paid competitor programs. The public site publishes separately from `gh-pages`.

## License

Personal / private use for the repo owner.
