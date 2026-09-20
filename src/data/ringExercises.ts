import type { Exercise } from './types';

export const ringExercises: Record<string, Exercise> = {
  'ring-row': {
    id: 'ring-row', name: 'Ring Row', equipment: ['rings'], animationId: 'ring-row',
    muscles: ['upper back', 'lats', 'biceps', 'core'],
    description: 'Adjustable horizontal pulling with feet on the floor. Stand more upright to reduce difficulty; lean farther back when controlled reps feel comfortable.',
    readiness: 'Use a support suitable for ring training. Begin with a shallow lean and 2–3 reps in reserve. Keep the same angle until two sessions feel controlled.',
    cues: ['Set both straps to equal length; grip rings with palms facing each other.', 'Keep feet planted and body straight; begin almost upright.', 'Pull rings toward your ribs without shrugging or thrusting your hips.', 'Lower slowly to straight arms. Move feet to make the next set easier if form changes.'],
  },
  'ring-incline-push-up': {
    id: 'ring-incline-push-up', name: 'Incline Ring Push-Up', equipment: ['rings'], animationId: 'ring-incline-push-up',
    muscles: ['chest', 'triceps', 'shoulders', 'core'], easierId: 'floor-knee-push-up',
    description: 'An introductory ring press with high rings and feet on the floor. Start nearly upright and use a small, comfortable range while learning to steady the rings.',
    readiness: 'Use a support suitable for ring training. Increase your forward lean only after two comfortable sessions; stop the set when the rings drift or your trunk sags.',
    cues: ['Set rings to the same height, around waist to chest level; start with a shallow forward lean.', 'Hold rings shoulder-width apart, feet planted, and body straight.', 'Bend elbows back at a comfortable angle, keeping rings close to the torso.', 'Press smoothly to straight arms. Raise rings or reduce your lean to make it easier.'],
  },
};
