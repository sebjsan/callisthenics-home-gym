import { sessionAdvice } from "../data/coaching";
import type { ReactNode } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { DayTypeBadge } from "../components/DayTypeBadge";
import { WorkoutExerciseRow } from "../components/WorkoutExerciseRow";
import { useProgressContext } from "../context/ProgressContext";
import { getDay } from "../data/plan";
import { useTraining } from "../context/TrainingContext";
import { adaptPlan } from "../data/training";

export function DayDetail() {
  const { dayId } = useParams();
  const dayNum = Number(dayId);
  const original = getDay(dayNum);
  const { profile, history } = useTraining();
  const advice = sessionAdvice(history);
  const [options, setOptions] = useSearchParams();
  const adapted = original
    ? adaptPlan(
        original,
        options.get("travel") === "1" ? { ...profile, equipment: [] } : profile,
        options.get("short") === "1",
        options.get("gentle") === "1",
      )
    : null;
  const day = adapted?.day;
  const { isCompleted, toggleDay } = useProgressContext();

  if (!day || Number.isNaN(dayNum)) {
    return (
      <div className="space-y-4">
        <p className="text-slate-400">Day not found.</p>
        <Link to="/calendar" className="text-cyan-400">
          Back to calendar
        </Link>
      </div>
    );
  }

  const done = isCompleted(day.day);

  return (
    <div className="space-y-5">
      <div>
        <Link
          to="/calendar"
          className="text-xs font-medium text-cyan-400 hover:text-cyan-300"
        >
          ← Plan
        </Link>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <h1 className="text-xl font-bold text-white">Day {day.day}</h1>
          <DayTypeBadge type={day.type} />
        </div>
        <h2 className="mt-1 text-lg text-slate-200">{day.title}</h2>
        <p className="mt-1 text-sm text-slate-400">
          {day.focus}
          {day.estimatedMinutes > 0 ? ` · ~${day.estimatedMinutes} min` : ""}
        </p>
      </div>

      <section className="panel text-sm space-y-2">
        <p className="eyebrow">{day.phase} · Balanced Foundations</p>
        <p>{day.coaching}</p>
      </section>
      {day.type === "rest" ? (
        <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-5 text-sm leading-relaxed text-slate-300">
          Full rest day. Sleep well, walk if you like, and keep hydration up.
          Mark complete when the day is done so your streak stays honest.
        </div>
      ) : (
        <>
          <section className="panel space-y-4">
            <div className="section-heading">
              <h3>Make today work</h3>
              <Link to="/training">Equipment & effort ↗</Link>
            </div>
            {day.type === "train" && <div className="text-sm space-y-3">
              <p className="text-blue-300">{advice.text}</p>
              {advice.ease && <button type="button" disabled={options.get("gentle") === "1"} className="secondary-button disabled:opacity-50" onClick={() => { const next = new URLSearchParams(options); next.set("gentle", "1"); setOptions(next, { replace: true }); }}>{options.get("gentle") === "1" ? "Easier session applied" : "Use suggested easier session"}</button>}
            </div>}
            <div className="grid sm:grid-cols-2 gap-3">
              <label className="choice-row">
                <input type="checkbox" checked={options.get("travel") === "1"} onChange={e => { const next = new URLSearchParams(options); if(e.target.checked) next.set("travel", "1"); else next.delete("travel"); setOptions(next, { replace: true }); }} />
                No equipment today
              </label>
              <label className="choice-row">
                <input
                  type="checkbox"
                  checked={options.get("short") === "1"}
                  onChange={(e) => {
                    const next = new URLSearchParams(options);
                    if (e.target.checked) next.set("short", "1");
                    else next.delete("short");
                    setOptions(next, { replace: true });
                  }}
                />
                Short session · fewer sets
              </label>
              <label className="choice-row">
                <input
                  type="checkbox"
                  checked={options.get("gentle") === "1"}
                  onChange={(e) => {
                    const next = new URLSearchParams(options);
                    if (e.target.checked) next.set("gentle", "1");
                    else next.delete("gentle");
                    setOptions(next, { replace: true });
                  }}
                />
                Easier today
              </label>
            </div>
            <p className="text-xs text-slate-400">
              Time is an estimate based on targets, rest, and transitions. Your
              pace may vary.
            </p>
            {adapted?.changes.map((change) => (
              <p key={change} className="text-sm text-cyan-400">
                {change}
              </p>
            ))}
            {!!adapted?.unavailable.length && (
              <div role="status" className="text-sm text-amber-200">
                <p className="font-semibold">Omitted for this session</p>
                <p>{adapted.unavailable.join(" · ")}</p>
                <p className="mt-1">
                  This changes the original workout. Check your equipment or
                  choose a different day if the main focus is missing.
                </p>
              </div>
            )}
          </section>
          {day.main.length > 0 ? (
            <Link
              className="primary-button w-full"
              to={`/workout/${day.day}?${options.toString()}`}
            >
              Start guided workout →
            </Link>
          ) : (
            <div className="panel">
              <p>No main exercises fit these settings.</p>
              <Link to="/training" className="text-cyan-400">
                Update equipment or effort →
              </Link>
            </div>
          )}
          {day.warmup.length > 0 && (
            <Section title="Warm-up" subtitle="Prepare for the movements ahead">
              {day.warmup.map((item, i) => (
                <WorkoutExerciseRow
                  key={`w-${item.exerciseId}-${i}`}
                  item={item}
                  index={i}
                />
              ))}
            </Section>
          )}
          {day.main.length > 0 && (
            <Section
              title={
                day.type === "active-recovery" ? "Recovery flow" : "Main work"
              }
              subtitle="Quality over ego"
            >
              {day.main.map((item, i) => (
                <WorkoutExerciseRow
                  key={`m-${item.exerciseId}-${i}`}
                  item={item}
                  index={i}
                />
              ))}
            </Section>
          )}
          {day.cooldown.length > 0 && (
            <Section title="Cool-down" subtitle="On the mat">
              {day.cooldown.map((item, i) => (
                <WorkoutExerciseRow
                  key={`c-${item.exerciseId}-${i}`}
                  item={item}
                  index={i}
                />
              ))}
            </Section>
          )}
        </>
      )}

      <button
        type="button"
        onClick={() => toggleDay(day.day)}
        className={`w-full rounded-xl px-4 py-3 text-sm font-semibold transition ${
          done
            ? "border border-cyan-500/40 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20"
            : "bg-cyan-500 text-ink shadow-lg shadow-cyan-500/20 hover:bg-cyan-400"
        }`}
      >
        {done ? "✓ Completed — tap to undo" : "Mark day complete"}
      </button>

      <div className="flex justify-between text-sm">
        {day.day > 1 ? (
          <Link
            to={`/day/${day.day - 1}`}
            className="text-slate-400 hover:text-cyan-300"
          >
            ← Day {day.day - 1}
          </Link>
        ) : (
          <span />
        )}
        {day.day < 30 ? (
          <Link
            to={`/day/${day.day + 1}`}
            className="text-slate-400 hover:text-cyan-300"
          >
            Day {day.day + 1} →
          </Link>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-2">
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
          {title}
        </h3>
        <p className="text-xs text-slate-500">{subtitle}</p>
      </div>
      <div className="space-y-2">{children}</div>
    </section>
  );
}
