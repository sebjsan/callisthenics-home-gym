# Training product review

Reviewed September 20, 2026. These are original implementations inspired by publicly documented product patterns. No paid programs, competitor artwork, videos, or proprietary coaching algorithms are included.

| Product and source | Useful pattern | Applied here |
| --- | --- | --- |
| [Calistree](https://calistree.com/) | Equipment-aware training, progression paths, and exercise tracking | Saved equipment profile, compatible-exercise filter, favorites, three learning paths, and recorded sets. Paths show practice, not automatic mastery. |
| [Freeletics](https://help.freeletics.com/hc/en-us/articles/360003933780-Adapt-your-Bodyweight-training-session) | Adjust a workout to today's constraints | Short-session and easier-today controls with a preview of changed movements and omitted exercises. |
| [THENX](https://app.thenx.com/training) | Movement instruction and guided practice | Existing demos and technique cues integrated into a set-by-set player, with optional spoken prompts and actual result logging. No THENX videos are used. |
| [BetterMe](https://bettermesupport.zendesk.com/hc/en-us/articles/7951485133469-How-to-change-the-workout-program) | Straightforward daily training and profile choices | Daily dashboard, saved starting effort, weekly attendance target, and simple post-workout effort feedback. |

## What the implementation does

The existing 30-day plan remains the source. Foundation mode applies explicit, inspectable substitutions and lower main-work targets. Short mode reduces main exercises to one set. Equipment exclusions are visible before starting, and sessions with no eligible main work cannot start. This is a bounded adaptation system, not a generated or clinically personalized program.

Training focus changes dashboard guidance. The weekly target measures attendance; it does not reschedule the 30-day plan. A hard session triggers a suggestion to consider easier training or recovery, without silently increasing or decreasing future prescriptions.

The player records self-reported repetitions or seconds and prescribed band assistance. Partial sessions enter history without marking the plan day complete. Fully completed adapted sessions are identified as adapted. Best sets are grouped by movement, unit, and band assistance so unlike assistance levels are not merged.

## Data and limits

Profile, favorites, and the latest 200 sessions stay in browser localStorage; history exports as JSON. Current session position and recorded sets stay in sessionStorage. Existing plan completion is preserved. Older unsaved v1 session cursors are not migrated to the new result-logging format. There is no account sync, imported BetterMe subscription content, automatic skill certification, or motion-based form assessment.

## Validation

Desktop and mobile browser checks cover settings persistence, favorites and equipment filters, shorter/easier previews, all 30 days' adaptation rules, timers and reloads, completion retry deduplication, partial sessions, history export, restart behavior, invalid routes, and unavailable storage. Production build and lint are also run.
