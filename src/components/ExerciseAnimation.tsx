import { createContext, useContext, useId, useState } from 'react';
import type { AnimationId } from '../data/types';

/** Public URL for a generated exercise photo (respects Vite/GitHub Pages base). */
export function exerciseImageUrl(animationId: AnimationId): string {
  return `${import.meta.env.BASE_URL}exercises/${animationId}.png`;
}

export type ExerciseAnimationVariant = 'full' | 'thumb';

interface Props {
  animationId: AnimationId;
  className?: string;
  /** full = detail demo with label; thumb = compact calendar/list thumbnail */
  variant?: ExerciseAnimationVariant;
}

type SvgThemeIds = { bodyFill: string; shortsFill: string; muscleGlow: string };

const SvgTheme = createContext<SvgThemeIds>({
  bodyFill: 'bodyFill',
  shortsFill: 'shortsFill',
  muscleGlow: 'muscleGlow',
});

function useBody() {
  const { bodyFill } = useContext(SvgTheme);
  return {
    fill: `url(#${bodyFill})`,
    stroke: '#67e8f9',
    strokeWidth: 1.6,
    strokeLinejoin: 'round' as const,
  };
}

function useShorts() {
  const { shortsFill } = useContext(SvgTheme);
  return {
    fill: `url(#${shortsFill})`,
    stroke: '#22d3ee',
    strokeWidth: 1.4,
    strokeOpacity: 0.55,
  };
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

type HighlightRegion = 'lats' | 'chest' | 'shoulders' | 'core' | 'glutes' | 'legs' | 'back' | 'none';

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

function highlightOf(id: AnimationId): HighlightRegion {
  switch (id) {
    case 'pull-up':
    case 'chin-up':
    case 'negative-pull-up':
    case 'band-assisted-pull-up':
    case 'band-lat-pulldown':
    case 'australian-row':
    case 'band-row':
      return 'lats';
    case 'scapular-pull':
    case 'band-face-pull':
    case 'band-pull-apart':
    case 'shoulder-opener':
    case 'pike-push-up':
      return 'shoulders';
    case 'push-up':
    case 'diamond-push-up':
    case 'knee-push-up':
    case 'incline-push-up':
    case 'band-press':
      return 'chest';
    case 'plank':
    case 'side-plank':
    case 'hollow-hold':
    case 'hanging-knee-raise':
    case 'mountain-climber':
    case 'dead-hang':
      return 'core';
    case 'glute-bridge':
    case 'band-good-morning':
    case 'bird-dog':
      return 'glutes';
    case 'band-squat':
    case 'hip-opener':
    case 'worlds-greatest-stretch':
      return 'legs';
    case 'cat-cow':
      return 'back';
    default:
      return 'none';
  }
}

/** Photo-first exercise demo keyed by animation id (SVG only if image fails). */
export function ExerciseAnimation({
  animationId,
  className = '',
  variant = 'full',
}: Props) {
  const [imgFailed, setImgFailed] = useState(false);
  const thumb = variant === 'thumb';

  if (imgFailed) {
    return (
      <SvgExerciseFallback
        animationId={animationId}
        className={className}
        variant={variant}
      />
    );
  }

  return (
    <div
      className={`relative overflow-hidden border border-white/10 bg-gradient-to-b from-slate-900 to-[#070b14] ${
        thumb ? 'rounded-xl' : 'rounded-2xl'
      } ${className}`}
      aria-hidden
    >
      <img
        src={exerciseImageUrl(animationId)}
        alt=""
        loading="lazy"
        decoding="async"
        onError={() => setImgFailed(true)}
        className={
          thumb
            ? 'absolute inset-0 h-full w-full object-cover'
            : 'relative mx-auto block h-64 w-full object-cover sm:h-72'
        }
      />
      {!thumb && (
        <p className="pb-2 pt-1 text-center text-[10px] uppercase tracking-widest text-slate-500">
          Form demo
        </p>
      )}
    </div>
  );
}

/** Stick-figure SVG used only when the exercise PNG fails to load. */
function SvgExerciseFallback({
  animationId,
  className = '',
  variant = 'full',
}: Props) {
  const uid = useId().replace(/:/g, '');
  const family = familyOf(animationId);
  const highlight = highlightOf(animationId);
  const thumb = variant === 'thumb';
  // Unique defs per instance so many calendar thumbs don't clash.
  const bodyFill = `chg-body-${uid}`;
  const shortsFill = `chg-shorts-${uid}`;
  const muscleGlow = `chg-glow-${uid}`;

  return (
    <SvgTheme.Provider value={{ bodyFill, shortsFill, muscleGlow }}>
      <div
        className={`relative overflow-hidden border border-white/10 bg-gradient-to-b from-slate-900 to-[#070b14] ${
          thumb ? 'rounded-xl' : 'rounded-2xl'
        } ${className}`}
        aria-hidden
      >
        <div
          className={`pointer-events-none absolute inset-0 ${
            thumb
              ? 'bg-[radial-gradient(ellipse_at_50%_20%,rgba(34,211,238,0.12),transparent_60%)]'
              : 'bg-[radial-gradient(ellipse_at_50%_0%,rgba(34,211,238,0.14),transparent_55%)]'
          }`}
        />
        <svg
          viewBox="0 0 200 240"
          className={`anim-${animationId} anim-family-${family} relative mx-auto block w-full ${
            thumb ? 'h-full min-h-[4.5rem]' : 'h-64 sm:h-72'
          }`}
        >
          <defs>
            <linearGradient id={bodyFill} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="55%" stopColor="#334155" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>
            <linearGradient id={shortsFill} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>
            <filter id={muscleGlow} x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation={thumb ? 2.5 : 3.5} result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <ellipse cx="100" cy="220" rx="78" ry="8" className="fill-cyan-500/15" />
          <EquipmentLayer id={animationId} />
          <Pose family={family} highlight={highlight} animationId={animationId} />
        </svg>
        {!thumb && (
          <p className="pb-2 text-center text-[10px] uppercase tracking-widest text-slate-500">
            Form demo
          </p>
        )}
      </div>
    </SvgTheme.Provider>
  );
}

function MaleHead({
  cx,
  cy,
  scale = 1,
  tilt = 0,
}: {
  cx: number;
  cy: number;
  scale?: number;
  tilt?: number;
}) {
  return (
    <g
      className="head"
      transform={`translate(${cx} ${cy}) rotate(${tilt}) scale(${scale}) translate(${-cx} ${-cy})`}
    >
      {/* short hair / skull top */}
      <ellipse cx={cx} cy={cy - 2} rx="11.5" ry="12.5" fill="#1e293b" stroke="#67e8f9" strokeWidth="1.4" />
      <path
        d={`M${cx - 11} ${cy - 2} Q${cx - 8} ${cy - 14} ${cx} ${cy - 15} Q${cx + 8} ${cy - 14} ${cx + 11} ${cy - 2}`}
        fill="#0f172a"
        stroke="#22d3ee"
        strokeWidth="1"
        strokeOpacity="0.5"
      />
      {/* jaw suggestion */}
      <path
        d={`M${cx - 7} ${cy + 4} Q${cx} ${cy + 12} ${cx + 7} ${cy + 4}`}
        fill="none"
        stroke="#94a3b8"
        strokeWidth="1.2"
        strokeOpacity="0.7"
      />
      {/* ear hints */}
      <ellipse cx={cx - 11} cy={cy + 1} rx="2" ry="3" fill="#334155" stroke="#67e8f9" strokeWidth="0.8" strokeOpacity="0.4" />
      <ellipse cx={cx + 11} cy={cy + 1} rx="2" ry="3" fill="#334155" stroke="#67e8f9" strokeWidth="0.8" strokeOpacity="0.4" />
    </g>
  );
}

function MuscleHighlight({
  region,
  family,
}: {
  region: HighlightRegion;
  family: PoseFamily;
}) {
  if (region === 'none') return null;
  const { muscleGlow } = useContext(SvgTheme);
  const common = {
    className: 'muscle-hl',
    filter: `url(#${muscleGlow})`,
    fill: 'rgba(251, 146, 60, 0.35)',
    stroke: 'rgba(249, 115, 22, 0.55)',
    strokeWidth: 1,
  };
  if (family === 'hang') {
    if (region === 'lats')
      return (
        <ellipse {...common} className="muscle-hl hl-lats" cx="100" cy="105" rx="22" ry="28" />
      );
    if (region === 'shoulders')
      return (
        <>
          <ellipse {...common} className="muscle-hl hl-sh" cx="72" cy="78" rx="10" ry="8" />
          <ellipse {...common} className="muscle-hl hl-sh" cx="128" cy="78" rx="10" ry="8" />
        </>
      );
    if (region === 'core')
      return <ellipse {...common} className="muscle-hl hl-core" cx="100" cy="125" rx="14" ry="18" />;
  }
  if (family === 'push' || family === 'plank' || family === 'pike') {
    if (region === 'chest')
      return <ellipse {...common} className="muscle-hl hl-chest" cx="78" cy="108" rx="16" ry="12" />;
    if (region === 'shoulders')
      return <ellipse {...common} className="muscle-hl hl-sh" cx="72" cy="95" rx="12" ry="10" />;
    if (region === 'core')
      return <ellipse {...common} className="muscle-hl hl-core" cx="100" cy="112" rx="18" ry="10" />;
    if (region === 'lats')
      return <ellipse {...common} className="muscle-hl hl-lats" cx="100" cy="108" rx="20" ry="12" />;
  }
  if (family === 'stand') {
    if (region === 'lats' || region === 'back')
      return <ellipse {...common} className="muscle-hl hl-lats" cx="100" cy="95" rx="18" ry="22" />;
    if (region === 'chest')
      return <ellipse {...common} className="muscle-hl hl-chest" cx="100" cy="82" rx="16" ry="12" />;
    if (region === 'shoulders')
      return (
        <>
          <ellipse {...common} className="muscle-hl hl-sh" cx="74" cy="72" rx="9" ry="7" />
          <ellipse {...common} className="muscle-hl hl-sh" cx="126" cy="72" rx="9" ry="7" />
        </>
      );
    if (region === 'legs')
      return (
        <>
          <ellipse {...common} className="muscle-hl hl-legs" cx="88" cy="155" rx="10" ry="22" />
          <ellipse {...common} className="muscle-hl hl-legs" cx="112" cy="155" rx="10" ry="22" />
        </>
      );
  }
  if (family === 'hinge' && (region === 'glutes' || region === 'back'))
    return <ellipse {...common} className="muscle-hl hl-glutes" cx="95" cy="125" rx="16" ry="14" />;
  if (family === 'supine') {
    if (region === 'glutes')
      return <ellipse {...common} className="muscle-hl hl-glutes" cx="118" cy="128" rx="18" ry="12" />;
    if (region === 'core')
      return <ellipse {...common} className="muscle-hl hl-core" cx="90" cy="125" rx="20" ry="10" />;
  }
  if (family === 'quadruped') {
    if (region === 'glutes')
      return <ellipse {...common} className="muscle-hl hl-glutes" cx="130" cy="118" rx="14" ry="12" />;
    if (region === 'back')
      return <ellipse {...common} className="muscle-hl hl-back" cx="100" cy="108" rx="22" ry="10" />;
  }
  if (family === 'side' && region === 'core')
    return <ellipse {...common} className="muscle-hl hl-core" cx="100" cy="115" rx="10" ry="22" />;
  if (family === 'lunge' && region === 'legs')
    return (
      <>
        <ellipse {...common} className="muscle-hl hl-legs" cx="78" cy="155" rx="11" ry="24" />
        <ellipse {...common} className="muscle-hl hl-legs" cx="128" cy="145" rx="10" ry="18" />
      </>
    );
  return null;
}

function Pose({
  family,
  highlight,
  animationId,
}: {
  family: PoseFamily;
  highlight: HighlightRegion;
  animationId: AnimationId;
}) {
  if (family === 'hang') return <HangPose highlight={highlight} id={animationId} />;
  if (family === 'push' || family === 'plank')
    return <PushPose highlight={highlight} id={animationId} plank={family === 'plank'} />;
  if (family === 'pike') return <PikePose highlight={highlight} />;
  if (family === 'hinge') return <HingePose highlight={highlight} />;
  if (family === 'supine') return <SupinePose highlight={highlight} id={animationId} />;
  if (family === 'quadruped') return <QuadPose highlight={highlight} id={animationId} />;
  if (family === 'side') return <SidePose highlight={highlight} />;
  if (family === 'lunge') return <LungePose highlight={highlight} />;
  return <StandPose highlight={highlight} id={animationId} />;
}

/** Hanging from bar — pull-ups, chin-ups, hangs, knee raises */
function HangPose({ highlight, id }: { highlight: HighlightRegion; id: AnimationId }) {
  const BODY = useBody();
  const SHORTS = useShorts();

  const kneeRaise = id === 'hanging-knee-raise';
  return (
    <g className="figure-root hang-figure">
      <MuscleHighlight region={highlight} family="hang" />
      {/* torso — athletic V taper */}
      <g className="torso-group">
        <path
          className="torso"
          {...BODY}
          d="M78 78 C70 88, 68 105, 72 128 L78 148 L122 148 L128 128 C132 105, 130 88, 122 78 C114 70, 86 70, 78 78 Z"
        />
        {/* chest definition */}
        <path
          d="M82 88 Q100 96 118 88"
          fill="none"
          stroke="#94a3b8"
          strokeWidth="1"
          strokeOpacity="0.35"
        />
        {/* shorts */}
        <path
          className="shorts"
          {...SHORTS}
          d="M78 145 L72 168 L90 170 L100 152 L110 170 L128 168 L122 145 Z"
        />
      </g>
      <MaleHead cx={100} cy={62} />
      {/* left arm up to bar */}
      <g className="arm-l" style={{ transformOrigin: '82px 80px' }}>
        <ellipse cx="68" cy="62" rx="7" ry="18" {...BODY} transform="rotate(-35 68 62)" />
        <ellipse cx="58" cy="42" rx="5.5" ry="14" {...BODY} transform="rotate(-10 58 42)" />
        <circle cx="54" cy="30" r="4.5" fill="#334155" stroke="#67e8f9" strokeWidth="1.3" />
      </g>
      {/* right arm up to bar */}
      <g className="arm-r" style={{ transformOrigin: '118px 80px' }}>
        <ellipse cx="132" cy="62" rx="7" ry="18" {...BODY} transform="rotate(35 132 62)" />
        <ellipse cx="142" cy="42" rx="5.5" ry="14" {...BODY} transform="rotate(10 142 42)" />
        <circle cx="146" cy="30" r="4.5" fill="#334155" stroke="#67e8f9" strokeWidth="1.3" />
      </g>
      {/* legs */}
      <g className={`legs-group ${kneeRaise ? 'legs-raise' : ''}`}>
        <g className="leg-l" style={{ transformOrigin: '88px 168px' }}>
          <ellipse cx="84" cy="185" rx="8" ry="20" {...BODY} />
          <ellipse cx="82" cy="208" rx="5" ry="8" fill="#1e293b" stroke="#67e8f9" strokeWidth="1.2" />
        </g>
        <g className="leg-r" style={{ transformOrigin: '112px 168px' }}>
          <ellipse cx="116" cy="185" rx="8" ry="20" {...BODY} />
          <ellipse cx="118" cy="208" rx="5" ry="8" fill="#1e293b" stroke="#67e8f9" strokeWidth="1.2" />
        </g>
      </g>
    </g>
  );
}

/** Push-up / plank / australian row / mountain climber horizontal */
function PushPose({
  highlight,
  id,
  plank,
}: {
  highlight: HighlightRegion;
  id: AnimationId;
  plank: boolean;
}) {
  const BODY = useBody();
  const SHORTS = useShorts();

  const knees = id === 'knee-push-up';
  const climb = id === 'mountain-climber';
  const row = id === 'australian-row';
  // australian row: body more under bar-ish, slightly inverted feel — keep push layout with different motion
  return (
    <g className={`figure-root push-figure ${plank ? 'is-plank' : ''} ${row ? 'is-row' : ''}`}>
      <MuscleHighlight region={highlight} family="push" />
      {/* legs first (behind) */}
      <g className="leg-l" style={{ transformOrigin: '145px 118px' }}>
        <ellipse
          cx={knees ? 138 : 158}
          cy={knees ? 140 : 122}
          rx="8"
          ry={knees ? 14 : 22}
          {...BODY}
          transform={knees ? 'rotate(55 138 140)' : 'rotate(8 158 122)'}
        />
        {!knees && (
          <ellipse cx="178" cy="128" rx="5" ry="7" fill="#1e293b" stroke="#67e8f9" strokeWidth="1.2" />
        )}
      </g>
      <g className="leg-r" style={{ transformOrigin: '145px 118px' }}>
        <ellipse
          cx={climb ? 130 : knees ? 148 : 160}
          cy={climb ? 100 : knees ? 148 : 132}
          rx="8"
          ry={knees ? 12 : 20}
          {...BODY}
          transform={climb ? 'rotate(-25 130 100)' : knees ? 'rotate(50 148 148)' : 'rotate(18 160 132)'}
        />
      </g>
      {/* torso horizontal */}
      <g className="torso-group" style={{ transformOrigin: '100px 112px' }}>
        <path
          className="torso"
          {...BODY}
          d="M55 105 C58 92, 75 88, 100 90 C125 88, 145 95, 150 112 C148 122, 130 128, 100 128 C70 128, 52 120, 55 105 Z"
        />
        <path
          className="shorts"
          {...SHORTS}
          d="M130 108 L155 115 L152 132 L128 128 Z"
        />
      </g>
      {/* head */}
      <MaleHead cx={42} cy={108} scale={0.95} tilt={-8} />
      {/* arms supporting */}
      <g className="arm-l" style={{ transformOrigin: '68px 108px' }}>
        <ellipse cx="58" cy="128" rx="6.5" ry="16" {...BODY} transform="rotate(15 58 128)" />
        <circle cx="52" cy="148" r="5" fill="#334155" stroke="#67e8f9" strokeWidth="1.3" />
      </g>
      <g className="arm-r" style={{ transformOrigin: '78px 108px' }}>
        <ellipse cx="72" cy="130" rx="6.5" ry="15" {...BODY} transform="rotate(5 72 130)" />
        <circle cx="70" cy="148" r="5" fill="#334155" stroke="#67e8f9" strokeWidth="1.3" />
      </g>
    </g>
  );
}

function PikePose({ highlight }: { highlight: HighlightRegion }) {
  const BODY = useBody();
  const SHORTS = useShorts();

  return (
    <g className="figure-root pike-figure">
      <MuscleHighlight region={highlight} family="pike" />
      {/* inverted-V body: hips high */}
      <g className="torso-group" style={{ transformOrigin: '100px 85px' }}>
        <path
          className="torso"
          {...BODY}
          d="M60 115 C65 95, 80 78, 100 72 C110 78, 125 100, 138 130 L128 135 C118 110, 108 88, 100 84 C90 90, 75 108, 68 125 Z"
        />
        <path className="shorts" {...SHORTS} d="M100 72 L95 95 L110 100 L118 85 Z" />
      </g>
      <MaleHead cx={55} cy={118} scale={0.92} tilt={20} />
      <g className="arm-l" style={{ transformOrigin: '68px 115px' }}>
        <ellipse cx="55" cy="140" rx="6" ry="16" {...BODY} />
        <circle cx="52" cy="158" r="4.5" fill="#334155" stroke="#67e8f9" strokeWidth="1.2" />
      </g>
      <g className="arm-r" style={{ transformOrigin: '72px 112px' }}>
        <ellipse cx="68" cy="142" rx="6" ry="15" {...BODY} />
        <circle cx="66" cy="158" r="4.5" fill="#334155" stroke="#67e8f9" strokeWidth="1.2" />
      </g>
      <g className="leg-l" style={{ transformOrigin: '118px 90px' }}>
        <ellipse cx="145" cy="130" rx="8" ry="24" {...BODY} transform="rotate(35 145 130)" />
        <ellipse cx="162" cy="155" rx="5" ry="7" fill="#1e293b" stroke="#67e8f9" strokeWidth="1.2" />
      </g>
      <g className="leg-r" style={{ transformOrigin: '118px 90px' }}>
        <ellipse cx="150" cy="125" rx="7.5" ry="22" {...BODY} transform="rotate(28 150 125)" />
      </g>
    </g>
  );
}

function StandPose({ highlight, id }: { highlight: HighlightRegion; id: AnimationId }) {
  const BODY = useBody();
  const SHORTS = useShorts();

  const squat = id === 'band-squat';
  return (
    <g className={`figure-root stand-figure ${squat ? 'is-squat' : ''}`}>
      <MuscleHighlight region={highlight} family="stand" />
      <g className="torso-group" style={{ transformOrigin: '100px 100px' }}>
        <path
          className="torso"
          {...BODY}
          d="M78 68 C70 78, 68 100, 74 120 L82 138 L118 138 L126 120 C132 100, 130 78, 122 68 C114 60, 86 60, 78 68 Z"
        />
        <path
          d="M84 78 Q100 86 116 78"
          fill="none"
          stroke="#94a3b8"
          strokeWidth="1"
          strokeOpacity="0.35"
        />
        <path
          className="shorts"
          {...SHORTS}
          d="M82 135 L76 158 L94 160 L100 142 L106 160 L124 158 L118 135 Z"
        />
      </g>
      <MaleHead cx={100} cy={52} />
      <g className="arm-l" style={{ transformOrigin: '78px 75px' }}>
        <ellipse cx="62" cy="95" rx="7" ry="20" {...BODY} transform="rotate(25 62 95)" />
        <ellipse cx="48" cy="118" rx="5" ry="12" {...BODY} transform="rotate(35 48 118)" />
        <circle cx="42" cy="128" r="4.5" fill="#334155" stroke="#67e8f9" strokeWidth="1.2" />
      </g>
      <g className="arm-r" style={{ transformOrigin: '122px 75px' }}>
        <ellipse cx="138" cy="95" rx="7" ry="20" {...BODY} transform="rotate(-25 138 95)" />
        <ellipse cx="152" cy="118" rx="5" ry="12" {...BODY} transform="rotate(-35 152 118)" />
        <circle cx="158" cy="128" r="4.5" fill="#334155" stroke="#67e8f9" strokeWidth="1.2" />
      </g>
      <g className="leg-l" style={{ transformOrigin: '90px 158px' }}>
        <ellipse cx="88" cy="178" rx="9" ry="22" {...BODY} />
        <ellipse cx="86" cy="202" rx="5.5" ry="8" fill="#1e293b" stroke="#67e8f9" strokeWidth="1.2" />
      </g>
      <g className="leg-r" style={{ transformOrigin: '110px 158px' }}>
        <ellipse cx="112" cy="178" rx="9" ry="22" {...BODY} />
        <ellipse cx="114" cy="202" rx="5.5" ry="8" fill="#1e293b" stroke="#67e8f9" strokeWidth="1.2" />
      </g>
    </g>
  );
}

function HingePose({ highlight }: { highlight: HighlightRegion }) {
  const BODY = useBody();
  const SHORTS = useShorts();

  return (
    <g className="figure-root hinge-figure">
      <MuscleHighlight region={highlight} family="hinge" />
      <g className="torso-group" style={{ transformOrigin: '95px 120px' }}>
        <path
          className="torso"
          {...BODY}
          d="M105 70 C95 78, 85 95, 82 115 L88 135 L115 130 C120 110, 125 88, 122 72 C118 64, 110 64, 105 70 Z"
        />
        <path className="shorts" {...SHORTS} d="M88 132 L82 155 L100 158 L112 150 L115 128 Z" />
      </g>
      <MaleHead cx={115} cy={58} tilt={25} />
      <g className="arm-l" style={{ transformOrigin: '95px 90px' }}>
        <ellipse cx="70" cy="95" rx="6" ry="18" {...BODY} transform="rotate(-50 70 95)" />
      </g>
      <g className="arm-r" style={{ transformOrigin: '100px 90px' }}>
        <ellipse cx="78" cy="100" rx="6" ry="16" {...BODY} transform="rotate(-40 78 100)" />
      </g>
      <g className="leg-l" style={{ transformOrigin: '92px 155px' }}>
        <ellipse cx="85" cy="178" rx="9" ry="22" {...BODY} />
        <ellipse cx="82" cy="202" rx="5" ry="8" fill="#1e293b" stroke="#67e8f9" strokeWidth="1.2" />
      </g>
      <g className="leg-r" style={{ transformOrigin: '108px 152px' }}>
        <ellipse cx="115" cy="175" rx="9" ry="22" {...BODY} />
        <ellipse cx="118" cy="200" rx="5" ry="8" fill="#1e293b" stroke="#67e8f9" strokeWidth="1.2" />
      </g>
    </g>
  );
}

function SupinePose({ highlight, id }: { highlight: HighlightRegion; id: AnimationId }) {
  const BODY = useBody();
  const SHORTS = useShorts();

  const hollow = id === 'hollow-hold';
  return (
    <g className={`figure-root supine-figure ${hollow ? 'is-hollow' : ''}`}>
      <MuscleHighlight region={highlight} family="supine" />
      <g className="torso-group" style={{ transformOrigin: '100px 140px' }}>
        <path
          className="torso"
          {...BODY}
          d="M50 138 C55 125, 75 118, 100 120 C125 118, 145 125, 150 138 C148 148, 125 152, 100 152 C75 152, 52 148, 50 138 Z"
        />
        <path className="shorts" {...SHORTS} d="M125 128 L150 132 L148 150 L122 148 Z" />
      </g>
      <MaleHead cx={42} cy={135} scale={0.9} tilt={hollow ? -15 : 0} />
      <g className="arm-l" style={{ transformOrigin: '60px 130px' }}>
        <ellipse
          cx={hollow ? 55 : 58}
          cy={hollow ? 115 : 118}
          rx="5.5"
          ry="14"
          {...BODY}
          transform={hollow ? 'rotate(-40 55 115)' : 'rotate(-55 58 118)'}
        />
      </g>
      <g className="arm-r" style={{ transformOrigin: '65px 130px' }}>
        <ellipse
          cx={hollow ? 68 : 70}
          cy={hollow ? 112 : 120}
          rx="5.5"
          ry="13"
          {...BODY}
          transform={hollow ? 'rotate(-30 68 112)' : 'rotate(-50 70 120)'}
        />
      </g>
      <g className="leg-l" style={{ transformOrigin: '140px 140px' }}>
        <ellipse
          cx={hollow ? 165 : 160}
          cy={hollow ? 125 : 145}
          rx="8"
          ry="20"
          {...BODY}
          transform={hollow ? 'rotate(-15 165 125)' : 'rotate(-5 160 145)'}
        />
      </g>
      <g className="leg-r" style={{ transformOrigin: '140px 140px' }}>
        <ellipse
          cx={hollow ? 168 : 155}
          cy={hollow ? 135 : 155}
          rx="8"
          ry="18"
          {...BODY}
          transform={hollow ? 'rotate(5 168 135)' : 'rotate(25 155 155)'}
        />
      </g>
    </g>
  );
}

function QuadPose({ highlight, id }: { highlight: HighlightRegion; id: AnimationId }) {
  const BODY = useBody();
  const SHORTS = useShorts();

  const bird = id === 'bird-dog';
  return (
    <g className={`figure-root quad-figure ${bird ? 'is-bird' : ''}`}>
      <MuscleHighlight region={highlight} family="quadruped" />
      <g className="torso-group" style={{ transformOrigin: '100px 115px' }}>
        <path
          className="torso"
          {...BODY}
          d="M65 110 C70 98, 90 95, 115 98 C135 100, 148 110, 150 122 C145 130, 120 132, 95 130 C72 128, 62 120, 65 110 Z"
        />
        <path className="shorts" {...SHORTS} d="M130 108 L152 115 L150 132 L128 128 Z" />
      </g>
      <MaleHead cx={55} cy={100} scale={0.9} tilt={-20} />
      <g className="arm-l" style={{ transformOrigin: '75px 115px' }}>
        <ellipse cx="68" cy="140" rx="6" ry="14" {...BODY} />
        <circle cx="66" cy="155" r="4.5" fill="#334155" stroke="#67e8f9" strokeWidth="1.2" />
      </g>
      <g className="arm-r" style={{ transformOrigin: '80px 108px' }}>
        <ellipse
          cx={bird ? 40 : 78}
          cy={bird ? 95 : 105}
          rx="6"
          ry="14"
          {...BODY}
          transform={bird ? 'rotate(-70 40 95)' : 'rotate(-40 78 105)'}
        />
      </g>
      <g className="leg-l" style={{ transformOrigin: '135px 120px' }}>
        <ellipse cx="145" cy="145" rx="7" ry="16" {...BODY} transform="rotate(20 145 145)" />
        <circle cx="150" cy="162" r="4.5" fill="#1e293b" stroke="#67e8f9" strokeWidth="1.2" />
      </g>
      <g className="leg-r" style={{ transformOrigin: '140px 118px' }}>
        <ellipse
          cx={bird ? 170 : 148}
          cy={bird ? 105 : 140}
          rx="7"
          ry="16"
          {...BODY}
          transform={bird ? 'rotate(-20 170 105)' : 'rotate(10 148 140)'}
        />
      </g>
    </g>
  );
}

function SidePose({ highlight }: { highlight: HighlightRegion }) {
  const BODY = useBody();
  const SHORTS = useShorts();

  return (
    <g className="figure-root side-figure">
      <MuscleHighlight region={highlight} family="side" />
      <g className="torso-group" style={{ transformOrigin: '100px 120px' }}>
        <path
          className="torso"
          {...BODY}
          d="M88 70 C78 80, 75 110, 78 140 L90 155 L112 150 C118 120, 120 85, 112 70 C108 62, 95 62, 88 70 Z"
        />
        <path className="shorts" {...SHORTS} d="M80 145 L78 168 L100 170 L112 148 Z" />
      </g>
      <MaleHead cx={100} cy={55} />
      <g className="arm-l" style={{ transformOrigin: '90px 90px' }}>
        <ellipse cx="78" cy="120" rx="6" ry="22" {...BODY} />
        <circle cx="76" cy="145" r="5" fill="#334155" stroke="#67e8f9" strokeWidth="1.2" />
      </g>
      <g className="arm-r" style={{ transformOrigin: '105px 85px' }}>
        <ellipse cx="100" cy="55" rx="5.5" ry="14" {...BODY} transform="rotate(5 100 55)" />
      </g>
      <g className="leg-l" style={{ transformOrigin: '95px 165px' }}>
        <ellipse cx="95" cy="185" rx="8" ry="18" {...BODY} />
        <ellipse cx="94" cy="205" rx="5" ry="7" fill="#1e293b" stroke="#67e8f9" strokeWidth="1.2" />
      </g>
      <g className="leg-r" style={{ transformOrigin: '105px 162px' }}>
        <ellipse cx="112" cy="182" rx="7.5" ry="16" {...BODY} transform="rotate(12 112 182)" />
      </g>
    </g>
  );
}

function LungePose({ highlight }: { highlight: HighlightRegion }) {
  const BODY = useBody();
  const SHORTS = useShorts();

  return (
    <g className="figure-root lunge-figure">
      <MuscleHighlight region={highlight} family="lunge" />
      <g className="torso-group" style={{ transformOrigin: '100px 100px' }}>
        <path
          className="torso"
          {...BODY}
          d="M82 65 C74 75, 72 98, 78 118 L86 135 L114 135 L122 118 C128 98, 126 75, 118 65 C110 57, 90 57, 82 65 Z"
        />
        <path className="shorts" {...SHORTS} d="M86 132 L72 155 L95 158 L100 140 L118 152 L128 148 L114 132 Z" />
      </g>
      <MaleHead cx={100} cy={50} />
      <g className="arm-l" style={{ transformOrigin: '82px 75px' }}>
        <ellipse cx="65" cy="70" rx="6" ry="16" {...BODY} transform="rotate(-40 65 70)" />
      </g>
      <g className="arm-r" style={{ transformOrigin: '118px 75px' }}>
        <ellipse cx="135" cy="55" rx="6" ry="16" {...BODY} transform="rotate(25 135 55)" />
      </g>
      <g className="leg-l" style={{ transformOrigin: '90px 150px' }}>
        <ellipse cx="72" cy="175" rx="9" ry="24" {...BODY} transform="rotate(-8 72 175)" />
        <ellipse cx="68" cy="200" rx="5.5" ry="8" fill="#1e293b" stroke="#67e8f9" strokeWidth="1.2" />
      </g>
      <g className="leg-r" style={{ transformOrigin: '110px 148px' }}>
        <ellipse cx="135" cy="165" rx="8" ry="18" {...BODY} transform="rotate(35 135 165)" />
        <ellipse cx="148" cy="182" rx="5" ry="7" fill="#1e293b" stroke="#67e8f9" strokeWidth="1.2" />
      </g>
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
        <g className="stroke-violet-400/85" strokeWidth="3.5" strokeLinecap="round" fill="none">
          <path d="M28 28 H172" />
          <path d="M36 28 V38 M164 28 V38" />
          <circle cx="36" cy="28" r="3" className="fill-violet-400/50" stroke="none" />
          <circle cx="164" cy="28" r="3" className="fill-violet-400/50" stroke="none" />
        </g>
      )}
      {bars && (
        <g className="stroke-violet-400/80" strokeWidth="2.5" strokeLinecap="round" fill="none">
          <path d="M44 155 h18 M44 155 v16" />
          <path d="M138 155 h18 M156 155 v16" />
          <circle cx="53" cy="155" r="3.5" className="fill-violet-400/40" stroke="none" />
          <circle cx="147" cy="155" r="3.5" className="fill-violet-400/40" stroke="none" />
        </g>
      )}
      {band && (
        <path
          className="stroke-amber-400/60 fill-none band-line"
          strokeWidth="2.5"
          strokeDasharray="6 4"
          d="M55 105 Q100 78 145 105"
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
          x="35"
          y="208"
          width="130"
          height="10"
          rx="3"
          className="fill-emerald-500/25 stroke-emerald-400/40"
          strokeWidth="1"
        />
      )}
    </g>
  );
}
