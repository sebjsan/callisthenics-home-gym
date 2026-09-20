# Four-app review — September 20, 2026

Scope: official public product pages and guidance, compared with the running app and repository. No paid account walkthrough, proprietary programming, or video library was accessed. This is a feature comparison, not a claim of feature parity or equivalent coaching quality.

| Reference | Publicly described strength | Existing app | Improvements in this review |
| --- | --- | --- | --- |
| [BetterMe](https://betterme.world/) | Personalized activities and full-body calisthenics plans | Daily plan, 30-day block, equipment and effort settings | Session-specific no-equipment mode makes the daily plan more practical away from home; original equipment stays saved |
| [Calistree](https://calistree.com/) | Equipment-aware blocks, exercise history/progression, connected skill trees | Equipment filtering and separate skill paths | Related skill paths now appear on exercise detail pages; recent actual sets appear on details and in the player |
| [Freeletics](https://www.freeletics.com/en/blog/posts/coach-feedback/) | Separate effort and technique feedback used in coaching | Effort recorded with generic advice | Optional technique feedback, persisted and exported with logs; recent strength-session feedback generates an explicit easier-session suggestion that the user can apply |
| [THENX](https://thenx.com/pages/app) | Calisthenics programs and technique guides | Exercise cues and human illustrations, guided sets and timers | Technique feedback and nearby skill guides make controlled practice more explicit; previous results are available without exiting the workout |

## Behavior and limits

- Guidance uses the latest dated strength session from this program within 14 days. Recovery sessions, future dates, old program records, and stale logs do not trigger it.
- Hard effort or reported form difficulties suggest easier work. A partial session prompts manageable targets. The app does not infer mastery or automatically increase difficulty from session effort.
- Previous sets retain reps/seconds, per-side labels, and band assistance. Ring angle is not recorded, so the UI explicitly asks users to compare the same angle and range.
- No-equipment mode honestly lists omitted pulling exercises; floor movements are not presented as equivalent pull-up training.
- Existing logs without technique feedback remain valid. Default feedback is unassessed, not an assumed good-form rating.
- Existing rings, blue theme, recovery schedule, progress archive, and local storage remain intact.

## Remaining gaps

The app still has generated still images rather than professionally filmed technique videos; a fixed foundational block rather than an adaptive training engine; no cloud sync or health-platform integration; and a smaller exercise library. These require separate content/integration work and should not be represented as completed. No external paid videos or branded programs were copied.

## Validation

Production build, lint review, desktop/mobile end-to-end suite, and focused checks for feedback persistence, equipment overrides, history labels, and recommendation recency. Lint retains existing non-blocking warnings about Fast Refresh exports and a pre-existing state effect.
