import type { AnimationId } from '../data/types';

interface Props {
  animationId: AnimationId;
  className?: string;
}

type PoseFamily =
  | 'hang'
  | 'push'
  | 'pike'
  | 'stand'
  | 'hinge'
  | 'quadruped'
  | 'supine'
  | 'plank'
  | 'side'
  | 'lunge';

function familyOf(id: AnimationId): PoseFamily {
  switch (id) {
    case 'pull-up':
    case 'chin-up':
    case 'negative-pull-up':
    case 'scapular-pull':
    case 'dead-hang':
    case 'hanging-knee-raise':
    case 'band-assisted-pull-up':
    case 'band-lat-pulldown':
    case 'band-face-pull':
      return 'hang';
    case 'push-up':
    case 'diamond-push-up':
    case 'knee-push-up':
    case 'incline-push-up':
    case 'mountain-climber':
    case 'australian-row':
      return 'push';
    case 'pike-push-up':
      return 'pike';
    case 'band-good-morning':
      return 'hinge';
    case 'glute-bridge':
    case 'hollow-hold':
      return 'supine';
    case 'cat-cow':
    case 'bird-dog':
      return 'quadruped';
    case 'plank':
      return 'plank';
    case 'side-plank':
      return 'side';
    case 'hip-opener':
    case 'worlds-greatest-stretch':
      return 'lunge';
    default:
      return 'stand';
  }
}

/** Looping 2D stick-figure demos keyed by exercise animation id. */
export function ExerciseAnimation({ animationId, className = '' }: Props) {
  const family = familyOf(animationId);
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-slate-900 to-[#070b14] ${className}`}
      aria-hidden
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(34,211,238,0.14),transparent_55%)]" />
      <svg
        viewBox="0 0 200 200"
        className={`anim-${animationId} anim-family-${family} relative mx-auto block h-56 w-full`}
      >
        <ellipse cx="100" cy="182" rx="72" ry="7" className="fill-cyan-500/15" />
        <EquipmentLayer id={animationId} />
        <Pose family={family} />
      </svg>
      <p className="pb-2 text-center text-[10px] uppercase tracking-widest text-slate-500">
        Looping form demo
      </p>
    </div>
  );
}

function strokeProps() {
  return {
    className: 'stroke-cyan-300 fill-none',
    strokeWidth: 3.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
}

function Pose({ family }: { family: PoseFamily }) {
  const s = strokeProps();
  if (family === 'hang') {
    return (
      <g {...s} className={s.className + " figure-root"}>
        <circle className="fill-cyan-300/25" cx="100" cy="70" r="11" />
        <path d="M100 81 L100 125" />
        <path className="arm-l" d="M100 88 L72 48" />
        <path className="arm-r" d="M100 88 L128 48" />
        <path className="leg-l" d="M100 125 L85 165" />
        <path className="leg-r" d="M100 125 L115 165" />
      </g>
    );
  }
  if (family === 'push' || family === 'plank') {
    return (
      <g {...s} className={s.className + " figure-root"}>
        <circle className="fill-cyan-300/25" cx="52" cy="108" r="10" />
        <path d="M62 110 L130 110" />
        <path d="M70 110 L58 145" />
        <path d="M70 110 L58 145" transform="translate(20,0)" />
        <path className="leg-l" d="M130 110 L168 118" />
        <path className="leg-r" d="M130 110 L168 125" />
      </g>
    );
  }
  if (family === 'pike') {
    return (
      <g {...s} className={s.className + " figure-root"}>
        <circle className="fill-cyan-300/25" cx="70" cy="95" r="10" />
        <path d="M78 100 L110 70 L145 125" />
        <path d="M78 100 L60 140" />
        <path d="M85 98 L62 138" />
        <path d="M145 125 L160 145" />
        <path d="M145 125 L170 140" />
      </g>
    );
  }
  if (family === 'hinge') {
    return (
      <g {...s} className={s.className + " figure-root"}>
        <circle className="fill-cyan-300/25" cx="118" cy="70" r="11" />
        <path d="M112 80 L90 115" />
        <path d="M100 95 L70 90" />
        <path d="M100 95 L75 105" />
        <path d="M90 115 L78 160" />
        <path d="M90 115 L108 160" />
      </g>
    );
  }
  if (family === 'supine') {
    return (
      <g {...s} className={s.className + " figure-root"}>
        <circle className="fill-cyan-300/25" cx="48" cy="130" r="10" />
        <path d="M58 130 L130 125" />
        <path d="M70 128 L55 105" />
        <path d="M75 128 L60 108" />
        <path className="leg-l" d="M130 125 L165 110" />
        <path className="leg-r" d="M130 125 L160 135" />
      </g>
    );
  }
  if (family === 'quadruped') {
    return (
      <g {...s} className={s.className + " figure-root"}>
        <circle className="fill-cyan-300/25" cx="68" cy="95" r="10" />
        <path d="M78 100 L125 105" />
        <path d="M85 102 L70 145" />
        <path d="M90 100 L55 85" />
        <path d="M120 105 L140 145" />
        <path d="M125 105 L165 95" />
      </g>
    );
  }
  if (family === 'side') {
    return (
      <g {...s} className={s.className + " figure-root"}>
        <circle className="fill-cyan-300/25" cx="100" cy="70" r="10" />
        <path d="M100 80 L100 130" />
        <path d="M100 95 L70 145" />
        <path d="M100 95 L100 55" />
        <path d="M100 130 L100 165" />
        <path d="M100 130 L120 165" />
      </g>
    );
  }
  if (family === 'lunge') {
    return (
      <g {...s} className={s.className + " figure-root"}>
        <circle className="fill-cyan-300/25" cx="100" cy="55" r="11" />
        <path d="M100 66 L100 110" />
        <path d="M100 80 L70 70" />
        <path d="M100 80 L130 55" />
        <path d="M100 110 L70 160" />
        <path d="M100 110 L135 145" />
      </g>
    );
  }
  // stand — rows, presses, squats, pull-aparts
  return (
    <g {...s} className={s.className + " figure-root"}>
      <circle className="fill-cyan-300/25" cx="100" cy="48" r="11" />
      <path d="M100 59 L100 110" />
      <path className="arm-l" d="M100 72 L70 95" />
      <path className="arm-r" d="M100 72 L130 95" />
      <path d="M100 110 L82 160" />
      <path d="M100 110 L118 160" />
    </g>
  );
}

function EquipmentLayer({ id }: { id: AnimationId }) {
  const hang =
    id === 'pull-up' ||
    id === 'chin-up' ||
    id === 'negative-pull-up' ||
    id === 'scapular-pull' ||
    id === 'dead-hang' ||
    id === 'hanging-knee-raise' ||
    id === 'band-assisted-pull-up' ||
    id === 'band-lat-pulldown' ||
    id === 'band-face-pull';
  const bars =
    id === 'push-up' ||
    id === 'diamond-push-up' ||
    id === 'pike-push-up' ||
    id === 'knee-push-up' ||
    id === 'incline-push-up' ||
    id === 'mountain-climber';
  const band =
    id === 'band-row' ||
    id === 'band-press' ||
    id === 'band-pull-apart' ||
    id === 'band-squat' ||
    id === 'band-good-morning' ||
    id === 'shoulder-opener' ||
    id === 'band-assisted-pull-up' ||
    id === 'band-lat-pulldown' ||
    id === 'band-face-pull';

  return (
    <g>
      {hang && (
        <g className="stroke-violet-400/85" strokeWidth="3" strokeLinecap="round">
          <path d="M36 36 H164" />
          <path d="M44 36 V44 M156 36 V44" />
        </g>
      )}
      {bars && (
        <g className="stroke-violet-400/80" strokeWidth="2.5" strokeLinecap="round">
          <path d="M48 148 h16 M48 148 v14" />
          <path d="M136 148 h16 M152 148 v14" />
        </g>
      )}
      {band && (
        <path
          className="stroke-amber-400/55 fill-none"
          strokeWidth="2"
          strokeDasharray="5 4"
          d="M60 100 Q100 78 140 100"
        />
      )}
      {(id === 'cat-cow' ||
        id === 'bird-dog' ||
        id === 'glute-bridge' ||
        id === 'plank' ||
        id === 'side-plank' ||
        id === 'hollow-hold' ||
        id === 'hip-opener' ||
        id === 'worlds-greatest-stretch') && (
        <rect
          x="40"
          y="168"
          width="120"
          height="8"
          rx="2"
          className="fill-emerald-500/25 stroke-emerald-400/40"
          strokeWidth="1"
        />
      )}
    </g>
  );
}
