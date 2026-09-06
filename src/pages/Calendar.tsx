import { Link } from 'react-router-dom';
import { DayTypeBadge } from '../components/DayTypeBadge';
import { useProgressContext } from '../context/ProgressContext';
import { plan } from '../data/plan';

export function Calendar() {
  const { isCompleted } = useProgressContext();

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-white">30-day plan</h1>
        <p className="mt-1 text-sm text-slate-400">
          Tap any day for exercises, sets, and equipment tags.
        </p>
      </div>

      <div className="grid grid-cols-7 gap-1.5">
        {plan.map((d) => {
          const done = isCompleted(d.day);
          const base =
            d.type === 'rest'
              ? 'border-slate-700/80 bg-slate-900/50'
              : d.type === 'active-recovery'
                ? 'border-amber-500/20 bg-amber-500/5'
                : 'border-cyan-500/20 bg-cyan-500/5';
          return (
            <Link
              key={d.day}
              to={`/day/${d.day}`}
              title={d.title}
              className={`relative flex aspect-square flex-col items-center justify-center rounded-lg border text-xs font-semibold transition hover:scale-[1.03] ${base} ${
                done ? 'ring-2 ring-emerald-400/60' : ''
              }`}
            >
              <span className={done ? 'text-emerald-300' : 'text-slate-200'}>{d.day}</span>
              {done && (
                <span className="absolute right-0.5 top-0.5 h-1.5 w-1.5 rounded-full bg-emerald-400" />
              )}
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
        {plan.map((d) => (
          <li key={d.day}>
            <Link
              to={`/day/${d.day}`}
              className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] px-3 py-3 transition hover:border-cyan-500/25"
            >
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-bold ${
                  isCompleted(d.day)
                    ? 'bg-emerald-500/20 text-emerald-300'
                    : 'bg-slate-800 text-slate-300'
                }`}
              >
                {d.day}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-100">{d.title}</p>
                <p className="truncate text-xs text-slate-500">{d.focus}</p>
              </div>
              <DayTypeBadge type={d.type} />
            </Link>
          </li>
        ))}
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
