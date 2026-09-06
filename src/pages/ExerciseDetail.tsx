import { Link, useParams } from 'react-router-dom';
import { EquipmentBadge } from '../components/EquipmentBadge';
import { ExerciseAnimation } from '../components/ExerciseAnimation';
import { exercises } from '../data/exercises';

export function ExerciseDetail() {
  const { exerciseId } = useParams();
  const ex = exerciseId ? exercises[exerciseId] : undefined;

  if (!ex) {
    return (
      <div className="space-y-4">
        <p className="text-slate-400">Exercise not found.</p>
        <Link to="/" className="text-cyan-400">
          Back home
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <button
          type="button"
          onClick={() => history.back()}
          className="text-xs font-medium text-cyan-400 hover:text-cyan-300"
        >
          ← Back
        </button>
        <h1 className="mt-2 text-xl font-bold text-white">{ex.name}</h1>
        <p className="mt-1 text-sm text-slate-400">{ex.description}</p>
      </div>

      <ExerciseAnimation animationId={ex.animationId} alt={ex.name} />

      <div className="flex flex-wrap gap-1.5">
        {ex.equipment.map((eq) => (
          <EquipmentBadge key={eq} equipment={eq} />
        ))}
      </div>

      <section className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
        <h2 className="text-sm font-semibold text-slate-200">Primary muscles</h2>
        <div className="mt-2 flex flex-wrap gap-2">
          {ex.muscles.length === 0 ? (
            <p className="text-xs text-slate-500">No primary muscles listed.</p>
          ) : (
            ex.muscles.map((m) => (
              <span
                key={m}
                className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1 text-xs font-medium capitalize text-slate-200"
              >
                {m}
              </span>
            ))
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
        <h2 className="text-sm font-semibold text-slate-200">Coaching cues</h2>
        <ol className="mt-3 space-y-2">
          {ex.cues.map((cue, i) => (
            <li key={cue} className="flex gap-3 text-sm text-slate-300">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-500/15 text-xs font-bold text-cyan-400">
                {i + 1}
              </span>
              <span className="pt-0.5 leading-relaxed">{cue}</span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
