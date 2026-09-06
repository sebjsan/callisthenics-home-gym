import type { Equipment } from '../data/types';

const LABELS: Record<Equipment, string> = {
  'yoga-mat': 'Yoga mat',
  'push-up-bars': 'Push-up bars',
  'resistance-band-light': 'Light band',
  'resistance-band-medium': 'Medium band',
  'resistance-band-heavy': 'Heavy band',
  'pull-up-bar': 'Pull-up bar (BDL)',
};

const COLORS: Record<Equipment, string> = {
  'yoga-mat': 'bg-emerald-500/15 text-emerald-300 ring-emerald-500/30',
  'push-up-bars': 'bg-violet-500/15 text-violet-300 ring-violet-500/30',
  'resistance-band-light': 'bg-amber-500/15 text-amber-200 ring-amber-500/30',
  'resistance-band-medium': 'bg-orange-500/15 text-orange-200 ring-orange-500/30',
  'resistance-band-heavy': 'bg-rose-500/15 text-rose-200 ring-rose-500/30',
  'pull-up-bar': 'bg-cyan-500/15 text-cyan-300 ring-cyan-500/30',
};

export function EquipmentBadge({ equipment }: { equipment: Equipment }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ring-1 ring-inset ${COLORS[equipment]}`}
    >
      {LABELS[equipment]}
    </span>
  );
}

export function equipmentLabel(equipment: Equipment): string {
  return LABELS[equipment];
}
