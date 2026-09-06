import { Link } from 'react-router-dom';
import { getExercise } from '../data/exercises';
import type { WorkoutExercise } from '../data/types';
import { EquipmentBadge } from './EquipmentBadge';
import { ExerciseAnimation } from './ExerciseAnimation';

interface Props {
  item: WorkoutExercise;
  index: number;
}

export function WorkoutExerciseRow({ item, index }: Props) {
  const ex = getExercise(item.exerciseId);
  const prescription = formatPrescription(item);

  return (
    <Link
      to={`/exercise/${ex.id}`}
      className="group flex gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-2.5 transition hover:border-cyan-500/30 hover:bg-cyan-500/5"
    >
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
        <ExerciseAnimation
          animationId={ex.animationId}
          alt={ex.name}
          variant="thumb"
          className="h-full w-full rounded-xl"
        />
        <span className="absolute left-1 top-1 flex h-5 w-5 items-center justify-center rounded-md bg-black/65 text-[10px] font-bold text-cyan-300">
          {index + 1}
        </span>
      </div>
      <div className="min-w-0 flex-1 py-0.5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="truncate text-sm font-semibold text-slate-100 group-hover:text-cyan-300">
            {ex.name}
          </h3>
          <span className="shrink-0 text-xs font-medium text-slate-400">{prescription}</span>
        </div>
        <p className="mt-0.5 text-xs text-slate-500">
          {item.sets} set{item.sets === 1 ? '' : 's'}
          {item.restSec > 0 ? ` · ${item.restSec}s rest` : ''}
          {item.bandSuggestion ? ` · ${item.bandSuggestion} band` : ''}
        </p>
        {item.notes && <p className="mt-1 text-xs text-slate-400">{item.notes}</p>}
        <div className="mt-2 flex flex-wrap gap-1">
          {ex.equipment.map((eq) => (
            <EquipmentBadge key={eq} equipment={eq} />
          ))}
        </div>
      </div>
    </Link>
  );
}

function formatPrescription(item: WorkoutExercise): string {
  if (item.reps != null) {
    if (item.reps === 1 && item.notes?.toLowerCase().includes('max')) return 'Max';
    return `${item.reps} reps`;
  }
  if (item.durationSec != null) {
    if (item.durationSec === 1) return 'Max';
    return `${item.durationSec}s`;
  }
  return '';
}
