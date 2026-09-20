import type { Exercise } from "./types";

// New movements use written technique cards until a verified visual is available.
export const newExercises: Record<string, Exercise> = {
  "floor-knee-push-up": {
    id: "floor-knee-push-up",
    name: "Floor Knee Push-Up",
    animationId: "floor-knee-push-up",
    equipment: [],
    muscles: ["chest", "triceps", "core"],
    description:
      "A floor pressing foundation with the knees supporting part of your weight.",
    cues: [
      "Place hands just wider than shoulders; cushion knees if needed.",
      "Keep a straight line from knees through hips to head.",
      "Lower chest between hands with elbows angled back.",
      "Press up without letting your hips sag.",
    ],
    harderId: "floor-push-up",
    readiness:
      "Try the full version after 2 sets of 10 controlled reps feel comfortable across two sessions.",
  },
  "floor-push-up": {
    id: "floor-push-up",
    name: "Floor Push-Up",
    animationId: "floor-push-up",
    equipment: [],
    muscles: ["chest", "triceps", "core"],
    description: "Full-body pressing without handles or extra equipment.",
    cues: [
      "Set hands just outside shoulder width and extend your legs.",
      "Brace your trunk and squeeze your glutes.",
      "Lower chest and hips together; keep elbows about 30–45 degrees from your body.",
      "Press the floor away and stop the set before your body line breaks.",
    ],
    easierId: "floor-knee-push-up",
    harderId: "bar-diamond-push-up",
    readiness:
      "Repeat clean sets with 2–3 reps in reserve before choosing a harder variation.",
  },
  "bodyweight-squat": {
    id: "bodyweight-squat",
    name: "Bodyweight Squat",
    animationId: "bodyweight-squat",
    equipment: [],
    muscles: ["quads", "glutes"],
    description: "An equipment-free squat through your comfortable range.",
    cues: [
      "Stand about shoulder width, toes turned slightly out.",
      "Bend knees and hips together; keep your whole foot grounded.",
      "Let knees follow your toes and keep your chest comfortably upright.",
      "Stand tall without bouncing or forcing depth.",
    ],
    harderId: "split-squat",
    readiness:
      "Build 2 sets of 12 balanced reps before adding unilateral work.",
  },
  "reverse-lunge": {
    id: "reverse-lunge",
    name: "Reverse Lunge",
    animationId: "reverse-lunge",
    equipment: [],
    muscles: ["quads", "glutes", "balance"],
    description:
      "A controlled step backward to train one leg at a time. Reps are per side.",
    cues: [
      "Start tall with feet hip-width apart.",
      "Step one foot back and lower both knees in a comfortable range.",
      "Keep the front heel down and knee aligned with the toes.",
      "Push through the front foot to return; repeat equally on both sides.",
    ],
    easierId: "bodyweight-squat",
    harderId: "split-squat",
    readiness: "Use squats if stepping backward makes you lose balance.",
  },
  "split-squat": {
    id: "split-squat",
    name: "Split Squat",
    animationId: "split-squat",
    equipment: [],
    muscles: ["quads", "glutes", "balance"],
    description:
      "A stationary split stance for controlled unilateral strength. Reps are per side.",
    cues: [
      "Set feet in a staggered stance with room between them side-to-side.",
      "Keep the front foot flat and back heel lifted.",
      "Bend both knees to lower straight down through a comfortable range.",
      "Push through the front foot; finish all reps then switch sides.",
    ],
    easierId: "bodyweight-squat",
    readiness:
      "Choose this only when you can keep balance and control throughout the set.",
  },
  "calf-raise": {
    id: "calf-raise",
    name: "Standing Calf Raise",
    animationId: "calf-raise",
    equipment: [],
    muscles: ["calves"],
    description: "Slow ankle extension on a flat floor.",
    cues: [
      "Stand hip-width with weight spread evenly across both feet.",
      "Rise onto the balls of your feet without rolling ankles outward.",
      "Pause briefly at the top.",
      "Lower heels slowly to the floor; use a stable wall for balance if needed.",
    ],
  },
  "prone-w": {
    id: "prone-w",
    name: "Prone W Raise",
    animationId: "prone-w",
    equipment: [],
    muscles: ["upper back", "shoulders"],
    description:
      "Light shoulder-control practice on the floor. This does not replace loaded rows or pull-ups.",
    cues: [
      "Lie face down with forehead near the floor and arms shaped like a W.",
      "Keep neck neutral and abdomen gently braced.",
      "Lift hands and elbows slightly while drawing shoulder blades gently together.",
      "Lower slowly without arching your lower back.",
    ],
  },
  "march-in-place": {
    id: "march-in-place",
    name: "Easy March",
    animationId: "march-in-place",
    equipment: [],
    muscles: ["legs", "conditioning"],
    description:
      "Low-impact movement for warming up or an easy recovery session.",
    cues: [
      "Stand tall and alternate lifting each foot.",
      "Swing arms naturally and land quietly.",
      "Keep steps low enough to stay balanced.",
      "Choose a pace where you can speak comfortably.",
    ],
  },
  "bodyweight-hinge": {
    id: "bodyweight-hinge",
    name: "Bodyweight Hip Hinge",
    animationId: "bodyweight-hinge",
    equipment: [],
    muscles: ["hamstrings", "glutes"],
    description:
      "Learn to move through your hips while keeping your back steady.",
    cues: [
      "Stand hip-width with knees softly bent.",
      "Move hips backward while keeping your spine comfortably neutral.",
      "Stop when you feel a mild hamstring stretch, before your back rounds.",
      "Drive hips forward to stand; avoid leaning backward.",
    ],
    harderId: "band-good-morning",
    readiness: "Add band resistance only when your back position stays steady.",
  },
  "knee-side-plank": {
    id: "knee-side-plank",
    name: "Knee Side Plank",
    animationId: "knee-side-plank",
    equipment: [],
    muscles: ["obliques", "core"],
    description:
      "Side-body stability with bent knees supporting a shorter lever. Time is per side.",
    cues: [
      "Lie on your side with elbow under shoulder and knees bent.",
      "Lift hips to form a line from shoulder to knees.",
      "Keep hips stacked and breathe normally.",
      "Lower with control and repeat the hold on the other side.",
    ],
    harderId: "mat-side-plank",
    readiness:
      "Try the full side plank after two steady 25-second holds per side.",
  },
};
