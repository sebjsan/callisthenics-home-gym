import { Link } from 'react-router-dom';
import { DayTypeBadge } from '../components/DayTypeBadge';
import { ExerciseAnimation } from '../components/ExerciseAnimation';
import { useProgressContext } from '../context/ProgressContext';
import { getHeroAnimationId, getTodayPlanDay, TOTAL_DAYS, TRAIN_DAYS } from '../data/plan';

export function Home() {
  const { progress, completedCount, isCompleted } = useProgressContext();
  const today = getTodayPlanDay(progress.completedDays);
  const done = isCompleted(today.day);
  const pct = Math.round((completedCount / TOTAL_DAYS) * 100);

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-violet-500/5 to-transparent">
        <div className="flex gap-3 p-4 sm:p-5">
          <div
            className={`relative h-28 w-24 shrink-0 overflow-hidden rounded-2xl sm:h-32 sm:w-28 ${
              today.type === 'rest' ? 'opacity-75' : ''
            }`}
          >
            <ExerciseAnimation
              animationId={getHeroAnimationId(today)}
              variant="thumb"
              className="h-full w-full rounded-2xl"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium uppercase tracking-widest text-cyan-400/80">
              Today&apos;s focus
            </p>
            <h1 className="mt-1 text-xl font-bold tracking-tight text-white sm:text-2xl">
              Day {today.day}: {today.title}
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <DayTypeBadge type={today.type} />
              {today.estimatedMinutes > 0 && (
                <span className="text-xs text-slate-400">~{today.estimatedMinutes} min</span>
              )}
              {done && (
                <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold uppercase text-emerald-300">
                  Completed
                </span>
              )}
            </div>
            <p className="mt-2 line-clamp-3 text-sm text-slate-300">{today.focus}</p>
          </div>
        </div>
        <div className="px-4 pb-4 sm:px-5 sm:pb-5">
          <Link
            to={`/day/${today.day}`}
            className="inline-flex w-full items-center justify-center rounded-xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-ink shadow-lg shadow-cyan-500/25 transition hover:bg-cyan-400"
          >
            {today.type === 'rest' ? 'View rest day' : done ? 'Review workout' : 'Start workout'}
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-3 gap-3">
        <Stat label="Streak" value={`${progress.streak}d`} />
        <Stat label="Done" value={`${completedCount}/${TOTAL_DAYS}`} />
        <Stat label="Train days" value={`${TRAIN_DAYS}`} />
      </section>

      <section className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
        <div className="mb-2 flex items-center justify-between text-xs text-slate-400">
          <span>Plan progress</span>
          <span>{pct}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
      </section>

      <section className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
        <h2 className="text-sm font-semibold text-slate-200">Your kit</h2>
        <ul className="mt-3 space-y-2 text-sm text-slate-400">
          <li className="flex gap-2"><Bullet /> Yoga mat</li>
          <li className="flex gap-2"><Bullet /> Floor push-up bars</li>
          <li className="flex gap-2"><Bullet /> Resistance bands (light / medium / heavy)</li>
          <li className="flex gap-2"><Bullet /> Wall-mounted pull-up / chin-up bar (BDL)</li>
        </ul>
      </section>

      <section className="rounded-2xl border border-white/5 bg-white/[0.03] p-4 text-sm text-slate-400">
        <h2 className="text-sm font-semibold text-slate-200">How this plan works</h2>
        <p className="mt-2 leading-relaxed">
          Beginner → intermediate progression over 30 days with ~5–6 training days per week.
          Sessions run about 30–45 minutes and build toward unassisted pull-ups using negatives,
          scapular work, and band assistance — balanced with push-up bar pressing and mat mobility.
        </p>
        <Link to="/calendar" className="mt-3 inline-block text-sm font-medium text-cyan-400 hover:text-cyan-300">
          Open 30-day calendar →
        </Link>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.03] px-3 py-3 text-center">
      <p className="text-lg font-bold text-white">{value}</p>
      <p className="text-[10px] uppercase tracking-wider text-slate-500">{label}</p>
    </div>
  );
}

function Bullet() {
  return <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />;
}
