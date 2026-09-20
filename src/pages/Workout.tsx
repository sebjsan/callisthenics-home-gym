import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getDay } from "../data/plan";
import { getExercise } from "../data/exercises";
import { buildSession } from "../data/session";
import type { PlanDay } from "../data/types";
import { ExerciseAnimation } from "../components/ExerciseAnimation";
import { useProgressContext } from "../context/ProgressContext";

export function Workout() {
  const { dayId } = useParams();
  const day = getDay(Number(dayId));
  if (!day || day.type === "rest")
    return (
      <div className="panel">
        <h1>No guided session for this day</h1>
        <Link
          className="primary-button mt-4"
          to={day ? `/day/${day.day}` : "/calendar"}
        >
          Back to plan
        </Link>
      </div>
    );
  return <Session key={day.day} day={day} />;
}

function Session({ day }: { day: PlanDay }) {
  const [steps] = useState(() => buildSession(day));
  const key = `chg-session-v1-${day.day}`;
  const [cursor, setCursor] = useState(() => {
    try {
      const saved = Number(sessionStorage.getItem(key));
      return Number.isInteger(saved) && saved >= 0 && saved <= steps.length
        ? saved
        : 0;
    } catch {
      return 0;
    }
  });
  const [saved, setSaved] = useState(false);
  const { completeDay, storageError } = useProgressContext();
  useEffect(() => {
    try {
      sessionStorage.setItem(key, String(cursor));
    } catch {
      /* Session still works in memory. */
    }
  }, [key, cursor]);
  if (cursor >= steps.length)
    return (
      <section className="panel text-center py-12">
        <p className="eyebrow">DAY {day.day} · FINISHED</p>
        <h1 className="text-4xl font-bold my-4">That’s a strong finish.</h1>
        <p className="text-slate-400 mb-6">
          Warm-up, main work, cool-down. You showed up for all of it.
        </p>
        {saved ? (
          <>
            <p role="status" className="text-cyan-400 mb-4">
              {storageError
                ? "Workout complete for this visit. Device storage is unavailable."
                : "Workout saved. Your plan is up to date."}
            </p>
            <Link to="/" className="primary-button">
              Back to today →
            </Link>
          </>
        ) : (
          <button
            className="primary-button"
            onClick={() => {
              completeDay(day.day);
              setSaved(true);
              try {
                sessionStorage.removeItem(key);
              } catch {
                /* Optional resume storage. */
              }
            }}
          >
            Save workout
          </button>
        )}
      </section>
    );
  const step = steps[cursor]!;
  const exercise = getExercise(step.item.exerciseId);
  const next = steps.slice(cursor + 1).find((s) => s.kind === "work");
  return (
    <div className="session-layout">
      <div className="section-heading">
        <Link to={`/day/${day.day}`} className="text-slate-400">
          ← Exit session
        </Link>
        <span className="detail-chip">DAY {day.day}</span>
      </div>
      <progress
        className="plan-progress"
        value={cursor}
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
          Step {cursor + 1} / {steps.length}
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
            key={cursor}
            seconds={step.seconds}
            rest={step.kind === "rest"}
            reps={step.item.reps}
            maxEffort={
              step.item.durationSec === 1 ||
              (step.item.reps === 1 &&
                !!step.item.notes?.toLowerCase().includes("max"))
            }
            onNext={() => setCursor((c) => c + 1)}
          />
          <p className="mt-5 text-sm text-cyan-400">{step.item.notes}</p>
          {step.item.bandSuggestion && (
            <p className="mt-2 text-sm text-slate-400">
              Use your {step.item.bandSuggestion} band.
            </p>
          )}
          <ul className="mt-5 space-y-3 text-sm text-slate-300">
            {exercise.cues.slice(0, 3).map((cue) => (
              <li key={cue}>• {cue}</li>
            ))}
          </ul>
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
        Move at your own pace. End a set if form breaks down or a movement
        hurts. Leaving a session keeps your place in this tab; the current step
        restarts when you return.
      </p>
    </div>
  );
}

function StepControls({
  seconds,
  rest,
  reps,
  maxEffort,
  onNext,
}: {
  seconds: number | null;
  rest: boolean;
  reps?: number;
  maxEffort: boolean;
  onNext: () => void;
}) {
  const [remaining, setRemaining] = useState(seconds ?? 0);
  const [deadline, setDeadline] = useState<number | null>(null);
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
              ? "quality reps / time"
              : "reps"}
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
      <button className="primary-button w-full" onClick={onNext}>
        {rest
          ? remaining === 0
            ? "Next set →"
            : "Skip rest →"
          : "Complete set →"}
      </button>
    </>
  );
}
