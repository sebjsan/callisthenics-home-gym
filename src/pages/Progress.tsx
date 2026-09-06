import { Link } from 'react-router-dom';
import { useProgressContext } from '../context/ProgressContext';
import { plan, TOTAL_DAYS, TRAIN_DAYS } from '../data/plan';

export function ProgressPage() {
  const { progress, completedCount, resetProgress, isCompleted } = useProgressContext();
  const trainDone = plan.filter((d) => d.type === 'train' && isCompleted(d.day)).length;
  const pct = Math.round((completedCount / TOTAL_DAYS) * 100);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white">Progress</h1>
        <p className="mt-1 text-sm text-slate-400">Stored locally on this device.</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Card label="Current streak" value={`${progress.streak} day${progress.streak === 1 ? '' : 's'}`} />
        <Card label="Days completed" value={`${completedCount} / ${TOTAL_DAYS}`} />
        <Card label="Train days done" value={`${trainDone} / ${TRAIN_DAYS}`} />
        <Card label="Plan complete" value={`${pct}%`} />
      </div>

      <section className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
        <div className="mb-2 flex justify-between text-xs text-slate-400">
          <span>Overall</span>
          <span>{pct}%</span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500"
            style={{ width: `${pct}%` }}
          />
        </div>
        {progress.lastCompletedDate && (
          <p className="mt-3 text-xs text-slate-500">
            Last completed: {progress.lastCompletedDate}
          </p>
        )}
      </section>

      <section className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
        <h2 className="text-sm font-semibold text-slate-200">Completed days</h2>
        {progress.completedDays.length === 0 ? (
          <p className="mt-2 text-sm text-slate-500">
            No days marked yet.{' '}
            <Link to="/" className="text-cyan-400">
              Start today&apos;s workout
            </Link>
          </p>
        ) : (
          <div className="mt-3 flex flex-wrap gap-2">
            {progress.completedDays.map((d) => (
              <Link
                key={d}
                to={`/day/${d}`}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/20 text-sm font-semibold text-emerald-300"
              >
                {d}
              </Link>
            ))}
          </div>
        )}
      </section>

      <button
        type="button"
        onClick={() => {
          if (confirm('Reset all progress on this device?')) resetProgress();
        }}
        className="w-full rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm font-medium text-rose-300 hover:bg-rose-500/20"
      >
        Reset progress
      </button>
    </div>
  );
}

function Card({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
      <p className="text-xs uppercase tracking-wider text-slate-500">{label}</p>
      <p className="mt-1 text-xl font-bold text-white">{value}</p>
    </div>
  );
}
