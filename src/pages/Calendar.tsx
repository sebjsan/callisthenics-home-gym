import { Link } from 'react-router-dom';
import { DayTypeBadge } from '../components/DayTypeBadge';
import { ExerciseAnimation } from '../components/ExerciseAnimation';
import { useProgressContext } from '../context/ProgressContext';
import { getExercise } from '../data/exercises';
import { getHeroAnimationId, plan } from '../data/plan';
import type { PlanDay } from '../data/types';

function heroLabel(day: PlanDay): string {
  if (day.type === 'rest') return 'Rest & recover';
  const hero = day.main[0] ?? day.warmup[0];
  if (!hero) return day.focus;
  return getExercise(hero.exerciseId).name;
}

export function Calendar() {
  const { isCompleted } = useProgressContext();

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-white">30-day plan</h1>
        <p className="mt-1 text-sm text-slate-400">
          Each day shows the male form demo for that session&apos;s hero exercise. Tap for full workout.
        </p>
      </div>

      {/* Mobile-first rich grid: 2 cols → 3 → 4 */}
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4">
        {plan.map((d) => {
          const done = isCompleted(d.day);
          const animId = getHeroAnimationId(d);
          const rest = d.type === 'rest';
          const base =
            d.type === 'rest'
              ? 'border-slate-700/80 bg-slate-900/60'
              : d.type === 'active-recovery'
                ? 'border-amber-500/25 bg-amber-500/5'
                : 'border-cyan-500/25 bg-cyan-500/5';
          return (
            <Link
              key={d.day}
              to={`/day/${d.day}`}
              title={d.title}
              className={`group relative overflow-hidden rounded-2xl border transition hover:scale-[1.02] hover:border-cyan-400/40 ${base} ${
                done ? 'ring-2 ring-emerald-400/70' : ''
              }`}
            >
              <div className={`relative aspect-[4/5] w-full overflow-hidden ${rest ? 'opacity-70' : ''}`}>
                <ExerciseAnimation
                  animationId={animId}
                  variant="thumb"
                  className="absolute inset-0 h-full w-full rounded-none border-0"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070b14] via-[#070b14]/35 to-transparent" />
                <span
                  className={`absolute left-2 top-2 flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold shadow-lg backdrop-blur-sm ${
                    done
                      ? 'bg-emerald-500/90 text-white'
                      : 'bg-black/55 text-slate-100'
                  }`}
                >
                  {d.day}
                </span>
                {done && (
                  <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white shadow">
                    ✓
                  </span>
                )}
                <div className="absolute inset-x-0 bottom-0 p-2.5">
                  <p className="truncate text-[11px] font-semibold text-white">{d.title}</p>
                  <p className="truncate text-[10px] text-slate-400">{heroLabel(d)}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-3 text-[10px] text-slate-500">
        <Legend swatch="bg-cyan-500/30 border-cyan-500/40" label="Train" />
        <Legend swatch="bg-amber-500/30 border-amber-500/40" label="Active recovery" />
        <Legend swatch="bg-slate-700 border-slate-600" label="Rest" />
        <Legend swatch="ring-2 ring-emerald-400" label="Completed" />
      </div>

      <ul className="space-y-2">
        {plan.map((d) => {
          const done = isCompleted(d.day);
          const animId = getHeroAnimationId(d);
          return (
            <li key={d.day}>
              <Link
                to={`/day/${d.day}`}
                className={`flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-2 pr-3 transition hover:border-cyan-500/25 ${
                  done ? 'ring-1 ring-emerald-400/40' : ''
                }`}
              >
                <div
                  className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-xl ${
                    d.type === 'rest' ? 'opacity-70' : ''
                  }`}
                >
                  <ExerciseAnimation
                    animationId={animId}
                    variant="thumb"
                    className="h-full w-full rounded-xl"
                  />
                  <span
                    className={`absolute left-1 top-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-[10px] font-bold ${
                      done ? 'bg-emerald-500 text-white' : 'bg-black/60 text-slate-100'
                    }`}
                  >
                    {d.day}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-100">{d.title}</p>
                  <p className="truncate text-xs text-slate-500">
                    {heroLabel(d)}
                    {d.focus && d.type !== 'rest' ? ` · ${d.focus}` : ''}
                  </p>
                </div>
                <DayTypeBadge type={d.type} />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Legend({ swatch, label }: { swatch: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`h-3 w-3 rounded border ${swatch}`} />
      {label}
    </span>
  );
}
