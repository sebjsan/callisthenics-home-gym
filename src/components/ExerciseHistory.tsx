import { useTraining } from '../context/TrainingContext';

export function ExerciseHistory({ exerciseId }: { exerciseId: string }) {
  const { history } = useTraining();
  const recent = [...history].sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
    .filter(log => log.sets.some(set => set.exerciseId === exerciseId)).slice(0, 3);
  return <section className="panel space-y-3" aria-label="Previous exercise results">
    <h2 className="font-semibold text-blue-300">Your recent practice</h2>
    {recent.length ? recent.map(log => <div key={log.id} className="text-sm border-t border-white/10 pt-3">
      <p className="text-slate-400">{new Date(log.date).toLocaleDateString()} · {log.effort === 'right' ? 'Just right' : log.effort === 'easy' ? 'Easy' : 'Hard'}{log.skipped > 0 ? ' · Partial session' : ''}</p>
      <p>{log.sets.filter(set => set.exerciseId === exerciseId).map(set => `${set.value} ${set.unit}${set.perSide ? ' each side' : ''}${set.band ? ` (${set.band} band)` : ''}`).join(' · ')}</p>
    </div>) : <p className="text-sm text-slate-400">Your first recorded practice starts here. Save a guided workout to see your actual sets next time.</p>}
    <p className="text-xs text-slate-400">Compare the same range, assistance, and body angle. More reps alone do not establish better form.</p>
  </section>;
}
