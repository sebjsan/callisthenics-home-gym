import type { Exercise } from './types';
export const expandedExercises: Record<string, Exercise> = {
  "ring-assisted-squat": {
    "id": "ring-assisted-squat",
    "name": "Ring-Assisted Squat",
    "equipment": [
      "rings"
    ],
    "muscles": [
      "quads",
      "glutes",
      "balance"
    ],
    "description": "Use the rings for light balance assistance while practicing a comfortable squat.",
    "cues": [
      "Set rings around waist height with equal strap lengths.",
      "Keep both feet flat and lower between your hips.",
      "Use only light hand assistance; let your legs do the work.",
      "Stand smoothly without pulling yourself up with your arms."
    ],
    "animationId": "ring-assisted-squat",
    "readiness": "Use a support suitable for ring training. Adjust foot assistance or body angle to keep control; stop if the movement hurts."
  },
  "ring-curl": {
    "id": "ring-curl",
    "name": "Ring Biceps Curl",
    "equipment": [
      "rings"
    ],
    "muscles": [
      "biceps",
      "forearms",
      "core"
    ],
    "description": "A bodyweight curl with feet planted. Start almost upright and increase your lean gradually.",
    "cues": [
      "Stand facing the anchors, grip rings with palms toward you.",
      "Lean back slightly with a straight trunk and feet planted.",
      "Keep upper arms steady in front; bend elbows to bring rings toward your temples.",
      "Straighten elbows slowly without dropping your hips."
    ],
    "animationId": "ring-curl",
    "readiness": "Use a support suitable for ring training. Adjust foot assistance or body angle to keep control; stop if the movement hurts."
  },
  "ring-assisted-pull-up": {
    "id": "ring-assisted-pull-up",
    "name": "Feet-Assisted Ring Pull-Up",
    "equipment": [
      "rings"
    ],
    "muscles": [
      "lats",
      "biceps",
      "upper back"
    ],
    "description": "A vertical pull with feet supporting part of your weight. Use leg assistance throughout; this differs from a leaning row.",
    "cues": [
      "Lower rings so you can squat beneath them with feet flat.",
      "Begin with arms extended overhead and torso upright.",
      "Pull elbows toward your ribs while using your legs as much as needed.",
      "Lower slowly with feet planted; avoid jumping or swinging."
    ],
    "animationId": "ring-assisted-pull-up",
    "readiness": "Use a support suitable for ring training. Adjust foot assistance or body angle to keep control; stop if the movement hurts."
  },
  "ring-push-up": {
    "id": "ring-push-up",
    "name": "Low Ring Push-Up",
    "equipment": [
      "rings"
    ],
    "muscles": [
      "chest",
      "triceps",
      "core"
    ],
    "description": "A harder progression from incline ring push-ups with rings near the floor. Build stable incline reps before lowering the rings.",
    "easierId": "ring-incline-push-up",
    "cues": [
      "Set rings equally just above the floor and grip shoulder-width apart.",
      "Walk feet back into a straight plank, toes on the floor.",
      "Lower chest between the rings through a comfortable range.",
      "Press up without letting rings drift outward or hips sag."
    ],
    "animationId": "ring-push-up",
    "readiness": "Use a support suitable for ring training. Adjust foot assistance or body angle to keep control; stop if the movement hurts."
  },
  "ring-assisted-support": {
    "id": "ring-assisted-support",
    "name": "Feet-Assisted Ring Support Hold",
    "equipment": [
      "rings"
    ],
    "muscles": [
      "triceps",
      "shoulders",
      "core"
    ],
    "description": "Practice the ring support position with feet on the floor throughout. Keep enough weight on your legs to steady the rings.",
    "cues": [
      "Set rings beside your hips with straps taut.",
      "Stand with both feet grounded and hands holding rings close to your sides.",
      "Straighten elbows and press gently down while keeping shoulders away from ears.",
      "Hold a steady position and breathe; keep foot support throughout."
    ],
    "animationId": "ring-assisted-support",
    "readiness": "Use a support suitable for ring training. Adjust foot assistance or body angle to keep control; stop if the movement hurts."
  },
  "pull-neutral": {
    "id": "pull-neutral",
    "name": "Neutral-Grip Pull-Up",
    "equipment": [
      "pull-up-bar"
    ],
    "muscles": [
      "lats",
      "biceps",
      "upper back"
    ],
    "description": "An unassisted pull-up using the station's parallel grips, with palms facing each other.",
    "easierId": "band-assisted-pull-up",
    "cues": [
      "Use the parallel handles in the station's pull-up orientation.",
      "Start from a controlled hang with palms facing each other.",
      "Pull elbows down until your chin reaches hand height without craning.",
      "Lower to straight arms with control; avoid swinging."
    ],
    "animationId": "pull-neutral",
    "readiness": "Build controlled assisted reps first. Use a grip and range you can manage without pain or swinging."
  },
  "pull-top-hold": {
    "id": "pull-top-hold",
    "name": "Pull-Up Top Hold",
    "equipment": [
      "pull-up-bar"
    ],
    "muscles": [
      "lats",
      "biceps",
      "grip"
    ],
    "description": "A timed hold at the top of a strict pull-up. Choose this only when you can reach the top under control.",
    "easierId": "band-assisted-pull-up",
    "cues": [
      "Pull up smoothly until your chin clears the bar.",
      "Hold with elbows bent and shoulders down; keep neck neutral.",
      "Breathe while keeping your body still.",
      "End the hold before you lose position and lower slowly."
    ],
    "animationId": "pull-top-hold",
    "readiness": "Build controlled assisted reps first. Use a grip and range you can manage without pain or swinging."
  }
};
