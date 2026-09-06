import type { DayType } from '../data/types';

const STYLES: Record<DayType, string> = {
  train: 'bg-cyan-500/15 text-cyan-300 ring-cyan-500/30',
  'active-recovery': 'bg-amber-500/15 text-amber-200 ring-amber-500/30',
  rest: 'bg-slate-500/15 text-slate-300 ring-slate-500/30',
};

const LABELS: Record<DayType, string> = {
  train: 'Train',
  'active-recovery': 'Active recovery',
  rest: 'Rest',
};

export function DayTypeBadge({ type }: { type: DayType }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ring-1 ring-inset ${STYLES[type]}`}
    >
      {LABELS[type]}
    </span>
  );
}
