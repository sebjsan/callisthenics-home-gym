import type { AnimationId } from '../data/types';

type Pose = { head: [number, number]; lines: string[] };
const standing: Pose = { head: [85, 35], lines: ['M85 51 L85 103', 'M85 62 L65 85 L62 106', 'M85 62 L105 85 L108 106', 'M85 103 L70 133 L68 162 L58 162', 'M85 103 L100 133 L102 162 L112 162'] };
const squat: Pose = { head: [101, 66], lines: ['M96 82 L75 115', 'M96 88 L119 96 L142 90', 'M75 115 L112 129 L103 163 L117 163', 'M75 115 L60 137 L62 163 L49 163'] };
const lunge: Pose = { head: [89, 51], lines: ['M89 67 L91 108', 'M89 77 L69 96 L61 116', 'M89 77 L111 95 L118 115', 'M91 108 L57 117 L53 162 L38 162', 'M91 108 L125 151 L148 148 L154 163'] };
const push: Pose = { head: [45, 73], lines: ['M58 82 L112 105 L152 120 L169 152', 'M66 85 L65 117 L62 153 L47 153'] };
const lowPush: Pose = { head: [43, 118], lines: ['M57 122 L113 135 L153 145 L169 153', 'M68 125 L88 112 L65 153 L48 153'] };
const kneePush: Pose = { head: [45, 83], lines: ['M58 92 L108 119 L137 152 L163 138', 'M66 95 L65 122 L62 153 L47 153'] };
const lowKnee: Pose = { head: [43, 120], lines: ['M57 124 L110 138 L137 152 L163 138', 'M68 127 L88 115 L65 153 L48 153'] };
const hinge: Pose = { head: [141, 87], lines: ['M125 91 L77 104', 'M112 94 L120 124 L120 144', 'M77 104 L91 133 L85 162 L102 162', 'M77 104 L66 133 L63 162 L78 162'] };
const calf: Pose = { head: [85, 25], lines: ['M85 41 L85 93', 'M85 52 L65 75 L62 96', 'M85 52 L105 75 L108 96', 'M85 93 L72 126 L72 152 L59 162', 'M85 93 L99 126 L99 152 L112 162'] };
const march: Pose = { head: [85, 35], lines: ['M85 51 L85 103', 'M85 62 L59 78 L53 58', 'M85 62 L105 84 L108 106', 'M85 103 L65 108 L66 140 L53 140', 'M85 103 L99 133 L100 162 L112 162'] };
const sideLow: Pose = { head: [43, 111], lines: ['M57 123 L95 151 L135 154 L158 133', 'M61 126 L59 159 L82 159'] };
const sideHigh: Pose = { head: [43, 84], lines: ['M57 96 L95 117 L135 154 L158 133', 'M61 101 L59 159 L82 159'] };
const prone: Pose = { head: [92, 40], lines: ['M92 56 L92 109', 'M92 67 L62 86 L46 62', 'M92 67 L122 86 L138 62', 'M92 109 L77 155', 'M92 109 L107 155'] };
const proneLift: Pose = { head: [92, 40], lines: ['M92 56 L92 109', 'M92 67 L62 78 L46 48', 'M92 67 L122 78 L138 48', 'M92 109 L77 155', 'M92 109 L107 155'] };
const splitStand: Pose = { head: [85, 35], lines: ['M85 51 L85 102', 'M85 63 L65 86 L61 108', 'M85 63 L105 86 L108 108', 'M85 102 L63 133 L53 162 L39 162', 'M85 102 L122 127 L148 153 L155 163'] };

const illustrations: Partial<Record<AnimationId, [Pose, Pose, string, string]>> = {
  'floor-push-up': [push, lowPush, 'Start', 'Lower with control'],
  'floor-knee-push-up': [kneePush, lowKnee, 'Knees supported', 'Lower with control'],
  'bodyweight-squat': [standing, squat, 'Stand tall', 'Sit down & back'],
  'reverse-lunge': [standing, lunge, 'Stand tall', 'Step back & lower'],
  'split-squat': [splitStand, lunge, 'Split stance', 'Lower in place'],
  'calf-raise': [standing, calf, 'Heels down', 'Rise onto toes'],
  'bodyweight-hinge': [standing, hinge, 'Soft knees', 'Hips back'],
  'march-in-place': [standing, march, 'Stand tall', 'Alternate legs'],
  'prone-w': [prone, proneLift, 'Face down · arms W', 'Lift arms slightly'],
  'knee-side-plank': [sideLow, sideHigh, 'Side lying', 'Lift hips & hold'],
};

export function MovementIllustration({ id, name, thumb, className = '' }: { id: AnimationId; name: string; thumb: boolean; className?: string }) {
  const frames = illustrations[id];
  if (!frames) return null;
  return <div className={`relative overflow-hidden rounded-xl border border-blue-400/20 bg-gradient-to-br from-slate-900 to-blue-950 ${className}`}>
    <svg viewBox="0 0 400 205" role="img" aria-label={`${name}: ${frames[2]}, then ${frames[3]}. Schematic movement illustration.`} className={thumb ? 'absolute inset-0 h-full w-full' : 'w-full max-h-72'}>
      <path d="M200 28 V178" stroke="#60a5fa" strokeOpacity=".15" />
      {[frames[0], frames[1]].map((pose, i) => <g key={i} transform={`translate(${i * 200 + 8},0)`}>
        <path d="M25 169 H174" stroke="#60a5fa" strokeOpacity=".35" strokeWidth="3" />
        <circle cx={pose.head[0]} cy={pose.head[1]} r="12" fill="#93c5fd" />
        {pose.lines.map((line, j) => <path key={j} d={line} fill="none" stroke={j === 0 ? '#60a5fa' : '#93c5fd'} strokeWidth={j === 0 ? 13 : 8} strokeLinecap="round" strokeLinejoin="round" />)}
        <text x="92" y="192" textAnchor="middle" fill="#bfdbfe" fontSize="10" fontFamily="system-ui">{frames[i + 2] as string}</text>
      </g>)}
    </svg>
    {!thumb && <p className="pb-3 text-center text-xs text-blue-300">Movement illustration · follow the technique cues below</p>}
  </div>;
}
