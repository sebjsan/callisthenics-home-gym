import type { ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';
import { DayTypeBadge } from '../components/DayTypeBadge';
import { WorkoutExerciseRow } from '../components/WorkoutExerciseRow';
import { useProgressContext } from '../context/ProgressContext';
import { getDay } from '../data/plan';

export function DayDetail() {
  const { dayId } = useParams();
  const dayNum = Number(dayId);
  const day = getDay(dayNum);
  const { isCompleted, toggleDay } = useProgressContext();

  if (!day || Number.isNaN(dayNum)) {
    return (
      <div className="space-y-4">
        <p className="text-slate-400">Day not found.</p>
        <Link to="/calendar" className="text-cyan-400">
          Back to calendar
        </Link>
      </div>
    );
  }

  const done = isCompleted(day.day);

  return (
    <div className="space-y-5">
      <div>
        <Link to="/calendar" className="text-xs font-medium text-cyan-400 hover:text-cyan-300">
          ← Plan
        </Link>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <h1 className="text-xl font-bold text-white">Day {day.day}</h1>
          <DayTypeBadge type={day.type} />
        </div>
        <h2 className="mt-1 text-lg text-slate-200">{day.title}</h2>
        <p className="mt-1 text-sm text-slate-400">
          {day.focus}
          {day.estimatedMinutes > 0 ? ` · ~${day.estimatedMinutes} min` : ''}
        </p>
      </div>

      {day.type === 'rest' ? (
        <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-5 text-sm leading-relaxed text-slate-300">
          Full rest day. Sleep well, walk if you like, and keep hydration up. Mark complete when the
          day is done so your streak stays honest.
        </div>
      ) : (
        <>
          {day.warmup.length > 0 && (
            <Section title="Warm-up" subtitle="Mat + light bands">
              {day.warmup.map((item, i) => (
                <WorkoutExerciseRow key={`w-${item.exerciseId}-${i}`} item={item} index={i} />
              ))}
            </Section>
          )}
          {day.main.length > 0 && (
            <Section title={day.type === 'active-recovery' ? 'Recovery flow' : 'Main work'} subtitle="Quality over ego">
              {day.main.map((item, i) => (
                <WorkoutExerciseRow key={`m-${item.exerciseId}-${i}`} item={item} index={i} />
              ))}
            </Section>
          )}
          {day.cooldown.length > 0 && (
            <Section title="Cool-down" subtitle="On the mat">
              {day.cooldown.map((item, i) => (
                <WorkoutExerciseRow key={`c-${item.exerciseId}-${i}`} item={item} index={i} />
              ))}
            </Section>
          )}
        </>
      )}

      <button
        type="button"
        onClick={() => toggleDay(day.day)}
        className={`w-full rounded-xl px-4 py-3 text-sm font-semibold transition ${
          done
            ? 'border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20'
            : 'bg-cyan-500 text-ink shadow-lg shadow-cyan-500/20 hover:bg-cyan-400'
        }`}
      >
        {done ? '✓ Completed — tap to undo' : 'Mark day complete'}
      </button>

      <div className="flex justify-between text-sm">
        {day.day > 1 ? (
          <Link to={`/day/${day.day - 1}`} className="text-slate-400 hover:text-cyan-300">
            ← Day {day.day - 1}
          </Link>
        ) : (
          <span />
        )}
        {day.day < 30 ? (
          <Link to={`/day/${day.day + 1}`} className="text-slate-400 hover:text-cyan-300">
            Day {day.day + 1} →
          </Link>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-2">
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">{title}</h3>
        <p className="text-xs text-slate-500">{subtitle}</p>
      </div>
      <div className="space-y-2">{children}</div>
    </section>
  );
}
