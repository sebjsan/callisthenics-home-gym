import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { getDay, PROGRAM_ID } from "../data/plan";
import { getExercise, exercises } from "../data/exercises";
import { buildSession } from "../data/session";
import { adaptPlan, type SetLog, type WorkoutLog } from "../data/training";
import type { PlanDay } from "../data/types";
import { ExerciseAnimation } from "../components/ExerciseAnimation";
import { useProgressContext } from "../context/ProgressContext";
import { useTraining } from "../context/TrainingContext";

interface SessionState {
  id: string;
  cursor: number;
  sets: SetLog[];
  skipped: number;
}
const newSession = (): SessionState => ({
  id: crypto.randomUUID(),
  cursor: 0,
  sets: [],
  skipped: 0,
});
function restore(key: string, count: number): SessionState {
  try {
    const value = JSON.parse(sessionStorage.getItem(key) ?? "null");
    if (
      value &&
      typeof value.id === "string" &&
      Number.isInteger(value.cursor) &&
      value.cursor >= 0 &&
      value.cursor <= count &&
      Number.isInteger(value.skipped) &&
      value.skipped >= 0 &&
      Array.isArray(value.sets) &&
      value.sets.every(
        (s: SetLog) =>
          s &&
          typeof s.exerciseId === "string" &&
          !!exercises[s.exerciseId] &&
          Number.isFinite(s.value) &&
          s.value > 0 &&
          s.value <= 3600 &&
          ["reps", "seconds"].includes(s.unit) &&
          (s.band === undefined ||
            ["light", "medium", "heavy"].includes(s.band)),
      )
    )
      return value;
  } catch {
    /* Start a new session if the tab's saved state cannot be read. */
  }
  return newSession();
}
export function Workout() {
  const { dayId } = useParams();
  const [options] = useSearchParams();
  const { profile } = useTraining();
  const original = getDay(Number(dayId));
  const adapted = original
    ? adaptPlan(
        original,
        profile,
        options.get("short") === "1",
        options.get("gentle") === "1",
      )
    : null;
  if (!adapted || adapted.day.type === "rest" || adapted.day.main.length === 0)
    return (
      <div className="panel">
        <h1>No guided session for this day</h1>
        <p className="text-slate-400 my-3">
          Choose a training day with exercises that fit your equipment.
        </p>
        <Link
          className="primary-button mt-4"
          to={original ? `/day/${original.day}` : "/calendar"}
        >
          Back to plan
        </Link>
      </div>
    );
  const signature = JSON.stringify([
    adapted.day.day,
    adapted.day.warmup,
    adapted.day.main,
    adapted.day.cooldown,
  ]);
  return (
    <Session
      key={signature}
      storageKey={`chg-session-v3-${PROGRAM_ID}-${signature}`}
      day={adapted.day}
      shortened={adapted.shortened}
      options={options.toString()}
    />
  );
}

function Session({
  day,
  storageKey,
  shortened,
  options,
}: {
  day: PlanDay;
  storageKey: string;
  shortened: boolean;
  options: string;
}) {
  const [steps] = useState(() => buildSession(day));
  const [session, setSession] = useState(() =>
    restore(storageKey, steps.length),
  );
  const [saved, setSaved] = useState(false);
  const [effort, setEffort] = useState<WorkoutLog["effort"]>("right");
  const [voice, setVoice] = useState(false);
  const { completeDay, storageError } = useProgressContext();
  const { saveWorkout, error } = useTraining();
  const step = steps[session.cursor];
  useEffect(() => {
    try {
      if (saved) sessionStorage.removeItem(storageKey);
      else sessionStorage.setItem(storageKey, JSON.stringify(session));
    } catch {
      /* In-memory training stays available. */
    }
  }, [storageKey, session, saved]);
  useEffect(() => {
    if (!voice || !step || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const announcement =
      step.kind === "rest"
        ? `Rest for ${step.seconds} seconds.`
        : `${getExercise(step.item.exerciseId).name}. Set ${step.set}. ${step.item.notes?.toLowerCase().includes("max") ? "Record your result with clean form" : step.item.durationSec ? `${step.item.durationSec} seconds` : `${step.item.reps ?? "Your target"} repetitions`}.`;
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(announcement));
    return () => window.speechSynthesis.cancel();
  }, [voice, step]);
  function advance(value?: number) {
    if (!step) return;
    const recorded =
      step.kind === "work" && value !== undefined
        ? {
            exerciseId: step.item.exerciseId,
            perSide:
              step.item.notes?.toLowerCase().includes("each side") || undefined,
            band: step.item.bandSuggestion,
            value,
            unit:
              step.item.durationSec !== undefined
                ? ("seconds" as const)
                : ("reps" as const),
          }
        : null;
    setSession((prev) => ({
      ...prev,
      cursor: prev.cursor + 1,
      sets: recorded ? [...prev.sets, recorded] : prev.sets,
      skipped: prev.skipped + (step.kind === "work" && !recorded ? 1 : 0),
    }));
  }
  if (!step)
    return (
      <section className="panel text-center py-10">
        <p className="eyebrow">DAY {day.day} · SESSION FINISHED</p>
        <h1 className="text-4xl font-bold my-4">That’s a strong finish.</h1>
        <p className="text-slate-400 mb-4">
          {session.sets.length} sets recorded · {session.skipped} skipped
          {shortened ? " · Adapted session" : ""}
        </p>
        {saved ? (
          <>
            <p role="status" className="text-cyan-400 mb-4">
              {storageError || error
                ? "Workout complete for this visit. Device storage is unavailable."
                : session.skipped > 0
                  ? "Partial workout saved. This plan day stays open."
                  : "Workout saved. Your plan is up to date."}
            </p>
            <p className="text-sm text-slate-400 mb-5">
              {effort === "hard"
                ? "Next time, use Easier today or repeat this session. Keep recovery days."
                : effort === "easy"
                  ? "If every rep stayed controlled, repeat that quality before exploring the next skill step."
                  : "Keep this effort: challenging, with enough control to finish well."}
            </p>
            <Link to="/progress" className="secondary-button mr-2 mb-2">
              View training history
            </Link>
            <Link to="/" className="primary-button">
              Back to today →
            </Link>
          </>
        ) : (
          <>
            <fieldset>
              <legend className="mx-auto font-semibold">
                How did this session feel?
              </legend>
              <div className="effort-options">
                {(["easy", "right", "hard"] as const).map((value) => (
                  <label key={value}>
                    <input
                      type="radio"
                      name="effort"
                      value={value}
                      checked={effort === value}
                      onChange={() => setEffort(value)}
                    />
                    {value === "right"
                      ? "Just right"
                      : value === "easy"
                        ? "Easy"
                        : "Hard"}
                  </label>
                ))}
              </div>
            </fieldset>
            {session.skipped > 0 && (
              <p className="text-sm text-amber-200 mb-4">
                Skipped sets make this a partial session. Saving it will not
                mark the plan day complete.
              </p>
            )}
            {session.sets.length > 0 ? (
              <button
                className="primary-button"
                onClick={() => {
                  saveWorkout({
                    programId: PROGRAM_ID,
                    id: session.id,
                    day: day.day,
                    title: day.title,
                    date: new Date().toISOString(),
                    effort,
                    sets: session.sets,
                    shortened,
                    skipped: session.skipped,
                  });
                  if (session.skipped === 0) completeDay(day.day);
                  setSaved(true);
                }}
              >
                {session.skipped > 0 ? "Save partial workout" : "Save workout"}
              </button>
            ) : (
              <>
                <p className="text-slate-400 mb-4">
                  No sets recorded. Nothing will be added to your history.
                </p>
                <button
                  className="secondary-button"
                  onClick={() => setSession(newSession())}
                >
                  Restart session
                </button>
              </>
            )}
          </>
        )}
      </section>
    );
  const exercise = getExercise(step.item.exerciseId);
  const next = steps.slice(session.cursor + 1).find((s) => s.kind === "work");
  return (
    <div className="session-layout">
      <div className="section-heading">
        <Link to={`/day/${day.day}?${options}`}>← Exit session</Link>
        <span className="detail-chip">DAY {day.day}</span>
      </div>
      <div className="flex flex-wrap justify-between gap-3">
        <span className="text-xs text-slate-400">
          {session.sets.length} sets recorded
        </span>
        {"speechSynthesis" in window && (
          <label className="text-xs text-slate-300 flex gap-2 items-center">
            <input
              type="checkbox"
              checked={voice}
              onChange={(e) => setVoice(e.target.checked)}
            />
            Voice prompts
          </label>
        )}
      </div>
      <progress
        className="plan-progress"
        value={session.cursor}
        max={steps.length}
        aria-label="Session progress"
      />
      <div className="section-heading">
        <p className="eyebrow">
          {step.phase} ·{" "}
          {step.kind === "rest"
            ? "RECOVER"
            : `SET ${step.set} OF ${step.item.sets}`}
        </p>
        <span className="text-xs text-slate-400">
          Step {session.cursor + 1} / {steps.length}
        </span>
      </div>
      <h1 className="text-3xl font-bold tracking-tight mb-5">
        {step.kind === "rest" ? "Breathe. Reset." : exercise.name}
      </h1>
      <div className="dashboard-grid">
        <ExerciseAnimation
          animationId={exercise.animationId}
          alt={exercise.name}
        />
        <div className="panel">
          <StepControls
            key={`${session.id}-${session.cursor}`}
            seconds={step.seconds}
            targetSeconds={step.item.durationSec}
            rest={step.kind === "rest"}
            reps={step.item.reps}
            timed={step.item.durationSec !== undefined}
            maxEffort={
              step.item.durationSec === 1 ||
              (step.item.reps === 1 &&
                !!step.item.notes?.toLowerCase().includes("max"))
            }
            onNext={advance}
          />
          <p className="mt-5 text-sm text-cyan-400">{step.item.notes}</p>
          {step.kind === "work" &&
            step.item.durationSec &&
            step.item.notes?.toLowerCase().includes("each side") && (
              <p className="text-sm text-cyan-300 mt-2">
                Timer covers both sides. Switch at halfway; pause for the
                transition. Record the shorter side’s time below.
              </p>
            )}
          {step.item.bandSuggestion && (
            <p className="mt-2 text-sm text-slate-400">
              Use your {step.item.bandSuggestion} band.
            </p>
          )}
          <details className="mt-5" open>
            <summary className="cursor-pointer font-semibold text-sm">
              Technique cues
            </summary>
            <ul className="mt-3 space-y-3 text-sm text-slate-300">
              {exercise.cues.map((cue) => (
                <li key={cue}>• {cue}</li>
              ))}
            </ul>
          </details>
        </div>
      </div>
      <div className="panel mt-5">
        <p className="eyebrow">UP NEXT</p>
        <p className="mt-2">
          {next
            ? `${getExercise(next.item.exerciseId).name} · Set ${next.set}`
            : "Workout complete"}
        </p>
      </div>
      <p className="text-xs text-slate-400 mt-4">
        Stop a set when form breaks down or a movement hurts. Log what you
        actually completed. This tab keeps your place; the current timer
        restarts paused when you return. Different session settings have
        separate resume points.
      </p>
      <button
        className="secondary-button mt-4"
        onClick={() => {
          if (confirm("Restart this session and discard its unsaved sets?"))
            setSession(newSession());
        }}
      >
        Restart session
      </button>
    </div>
  );
}

function StepControls({
  targetSeconds,
  seconds,
  rest,
  reps,
  timed,
  maxEffort,
  onNext,
}: {
  targetSeconds?: number;
  seconds: number | null;
  rest: boolean;
  reps?: number;
  timed: boolean;
  maxEffort: boolean;
  onNext: (value?: number) => void;
}) {
  const [remaining, setRemaining] = useState(seconds ?? 0);
  const [deadline, setDeadline] = useState<number | null>(null);
  const [actual, setActual] = useState(
    String(maxEffort ? "" : (targetSeconds ?? seconds ?? reps ?? "")),
  );
  const running = deadline !== null;
  useEffect(() => {
    if (deadline === null) return;
    const timer = window.setInterval(() => {
      const left = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
      setRemaining(left);
      if (left === 0) setDeadline(null);
    }, 200);
    return () => window.clearInterval(timer);
  }, [deadline]);
  const value = Number(actual);
  const valid =
    Number.isInteger(value) && value > 0 && value <= (timed ? 3600 : 1000);
  return (
    <>
      <p className="timer-display">
        {seconds != null
          ? `${Math.floor(remaining / 60)}:${String(remaining % 60).padStart(2, "0")}`
          : maxEffort
            ? "Your max"
            : reps}
        <span>
          {seconds != null
            ? "remaining"
            : maxEffort
              ? "record your result below"
              : "target reps"}
        </span>
      </p>
      {seconds != null && remaining > 0 && (
        <button
          className="secondary-button w-full mb-3"
          onClick={() =>
            setDeadline(running ? null : Date.now() + remaining * 1000)
          }
        >
          {running ? "Pause timer" : "Start timer"}
        </button>
      )}
      {seconds != null && remaining === 0 && (
        <p role="status" className="text-cyan-400 mb-3">
          {rest ? "Ready for your next set." : "Time complete. Nice work."}
        </p>
      )}
      {!rest && (
        <label className="text-sm block mb-4">
          {timed ? "Seconds completed" : "Reps completed"}
          <input
            className="form-input"
            type="number"
            inputMode="numeric"
            min="1"
            max={timed ? 3600 : 1000}
            step="1"
            value={actual}
            onChange={(e) => setActual(e.target.value)}
          />
          <span className="text-xs text-slate-400">
            Starts at your target. Adjust to your actual result; per side when
            noted.
          </span>
        </label>
      )}
      <button
        className="primary-button w-full disabled:opacity-40"
        disabled={!rest && !valid}
        onClick={() => onNext(rest ? undefined : value)}
      >
        {rest
          ? remaining === 0
            ? "Next set →"
            : "Skip rest →"
          : "Complete set →"}
      </button>
      {!rest && (
        <button
          className="secondary-button w-full mt-3"
          onClick={() => onNext()}
        >
          Skip set
        </button>
      )}
    </>
  );
}
