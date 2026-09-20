import { useState } from "react";
import { Link } from "react-router-dom";
import { DayTypeBadge } from "../components/DayTypeBadge";
import { ExerciseAnimation } from "../components/ExerciseAnimation";
import { useProgressContext } from "../context/ProgressContext";
import {
  getHeroAnimationId,
  getTodayPlanDay,
  plan,
  chapters,
} from "../data/plan";
import { useTraining } from "../context/TrainingContext";
import { adaptPlan } from "../data/training";

export function Calendar() {
  const { profile } = useTraining();
  const { isCompleted, progress, completedCount } = useProgressContext();
  const today = getTodayPlanDay(progress.completedDays);
  const [week, setWeek] = useState(
    Math.min(3, Math.floor((today.day - 1) / 7)),
  );
  const days = plan
    .slice(week * 7, week === 3 ? 30 : (week + 1) * 7)
    .map((day) => adaptPlan(day, profile).day);
  return (
    <div className="space-y-6">
      <div className="page-heading">
        <div>
          <p className="eyebrow">YOUR ROAD TO STRONGER</p>
          <h1>The 30-day plan</h1>
          <p className="text-slate-400 mt-3">
            Balanced Foundations: three full-body strength sessions, two easy
            movement days, and two rest days each week. Week four reduces
            volume; day 29 repeats your baseline.
          </p>
        </div>
        <span className="streak-pill">{completedCount} / 30 complete</span>
      </div>
      <div
        className="grid grid-cols-2 sm:grid-cols-4 gap-2"
        aria-label="Plan weeks"
      >
        {chapters.map((name, i) => (
          <button
            key={name}
            aria-pressed={week === i}
            onClick={() => setWeek(i)}
            className={`panel text-left ${week === i ? "border-cyan-400! bg-cyan-400/5!" : ""}`}
          >
            <span className="eyebrow">WEEK {i + 1}</span>
            <span className="block text-sm font-semibold mt-2">{name}</span>
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {days.map((day) => (
          <Link
            key={day.day}
            to={`/day/${day.day}`}
            className={`panel flex items-center gap-4 p-3! ${isCompleted(day.day) ? "border-cyan-400/30!" : ""}`}
          >
            <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl">
              <ExerciseAnimation
                animationId={getHeroAnimationId(day)}
                alt={day.title}
                variant="thumb"
                className="h-full w-full"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="eyebrow mb-1!">
                DAY {day.day}
                {isCompleted(day.day)
                  ? " · COMPLETE ✓"
                  : day.day === today.day
                    ? " · UP NEXT"
                    : ""}
              </p>
              <h2 className="font-semibold text-sm sm:text-base">
                {day.title}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                {day.estimatedMinutes
                  ? `${day.estimatedMinutes} min · ${day.main.length} main exercises`
                  : "Rest is part of the plan"}
              </p>
            </div>
            <span className="hidden sm:block">
              <DayTypeBadge type={day.type} />
            </span>
            <span aria-hidden="true">↗</span>
          </Link>
        ))}
      </div>
      <p className="text-sm text-slate-400">
        Follow the days in order, with recovery between hard sessions. Repeat a
        day when you need more practice.
      </p>
    </div>
  );
}
