import { Link } from "react-router-dom";
import { ExerciseAnimation } from "../components/ExerciseAnimation";
import { useProgressContext } from "../context/ProgressContext";
import {
  getHeroAnimationId,
  getTodayPlanDay,
  TOTAL_DAYS,
  plan,
} from "../data/plan";

export function Home() {
  const { progress, completedCount, isCompleted } = useProgressContext();
  const today = getTodayPlanDay(progress.completedDays);
  const week = Math.min(4, Math.ceil(today.day / 7));
  const allDone = completedCount === TOTAL_DAYS;
  const weekDays = plan.slice((week - 1) * 7, week === 4 ? 30 : week * 7);
  return (
    <div className="space-y-7">
      <div className="page-heading">
        <div>
          <p className="eyebrow">MEN’S CALISTHENICS · YOUR DAILY PLAN</p>
          <h1>
            Build strength.
            <br />
            <span className="text-slate-400">One day at a time.</span>
          </h1>
        </div>
        <span className="streak-pill">↗ {progress.streak} day streak</span>
      </div>
      <section className="hero-workout">
        <div className="hero-copy">
          <p className="eyebrow">
            {allDone
              ? "30 DAYS. WELL EARNED."
              : `WEEK ${week} · DAY ${today.day} OF 30`}
          </p>
          <h2>{allDone ? "You showed up. You got stronger." : today.title}</h2>
          <p className="text-slate-300">
            {allDone
              ? "Your plan is complete. Revisit your favorite sessions or explore your progress."
              : today.focus}
          </p>
          <div className="flex flex-wrap gap-2 my-5">
            <span className="detail-chip">
              {today.type === "rest"
                ? "Recovery day"
                : `${today.estimatedMinutes} min`}
            </span>
            <span className="detail-chip">
              {today.main.length} main exercises
            </span>
            <span className="detail-chip">Home training</span>
          </div>
          <Link
            className="primary-button"
            to={allDone ? "/progress" : `/day/${today.day}`}
          >
            {allDone
              ? "See your progress"
              : today.type === "rest"
                ? "Your recovery plan"
                : "Let’s train"}{" "}
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="hero-visual">
          <ExerciseAnimation
            animationId={getHeroAnimationId(today)}
            alt={today.title}
            variant="thumb"
            className="h-full w-full"
          />
          <span className="hero-caption">CONTROL. CONSISTENCY. STRENGTH.</span>
        </div>
      </section>
      <section className="dashboard-grid">
        <div className="panel">
          <div className="section-heading">
            <h2>Your week</h2>
            <Link to="/calendar">View plan ↗</Link>
          </div>
          <div className="week-strip">
            {weekDays.map((d) => (
              <Link
                key={d.day}
                to={`/day/${d.day}`}
                className={`week-day ${d.day === today.day ? "current" : ""} ${isCompleted(d.day) ? "complete" : ""}`}
                aria-label={`Day ${d.day}, ${d.title}${isCompleted(d.day) ? ", complete" : ""}`}
              >
                <span>DAY</span>
                <strong>{isCompleted(d.day) ? "✓" : d.day}</strong>
                <small>
                  {d.type === "rest"
                    ? "Rest"
                    : d.type === "active-recovery"
                      ? "Easy"
                      : "Train"}
                </small>
              </Link>
            ))}
          </div>
          <p className="mt-4 text-sm text-slate-400">
            A little progress, repeated. Recovery counts too.
          </p>
        </div>
        <div className="panel">
          <div className="section-heading">
            <h2>The bigger picture</h2>
            <span className="text-cyan-400">
              {Math.round((completedCount / TOTAL_DAYS) * 100)}%
            </span>
          </div>
          <p className="text-4xl font-bold tracking-tight">
            {completedCount}
            <span className="text-lg text-slate-400 font-normal">
              {" "}
              / 30 days
            </span>
          </p>
          <progress
            className="plan-progress"
            value={completedCount}
            max={TOTAL_DAYS}
            aria-label="Plan completion"
          />
          <Link className="text-sm text-slate-400" to="/progress">
            See your consistency build →
          </Link>
        </div>
      </section>
      <section>
        <div className="section-heading">
          <div>
            <p className="eyebrow">TRAIN WITH INTENTION</p>
            <h2>Master the foundations</h2>
          </div>
          <Link to="/library">All exercises ↗</Link>
        </div>
        <div className="foundation-grid">
          {[
            {
              id: "bar-push-up",
              title: "Own your push-up",
              sub: "Chest · shoulders · triceps",
              animation: "push-up" as const,
            },
            {
              id: "band-assisted-pull-up",
              title: "Build your first pull-up",
              sub: "Back · arms · grip",
              animation: "band-assisted-pull-up" as const,
            },
            {
              id: "mat-hollow",
              title: "Find your core strength",
              sub: "Core · body control",
              animation: "hollow-hold" as const,
            },
          ].map((e) => (
            <Link
              className="foundation-card"
              key={e.id}
              to={`/exercise/${e.id}`}
            >
              <ExerciseAnimation
                animationId={e.animation}
                alt={e.title}
                variant="thumb"
                className="foundation-image"
              />
              <div className="p-4">
                <h3>
                  {e.title} <span aria-hidden="true">↗</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">{e.sub}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="panel flex gap-4 items-start">
        <span className="text-cyan-400 text-2xl" aria-hidden="true">
          ◎
        </span>
        <div>
          <h2 className="font-semibold">Built for your home setup</h2>
          <p className="text-sm text-slate-400 mt-1">
            Your 30-day plan uses a mat, push-up bars, resistance bands, and
            your wall-mounted pull-up / dip station. Progress at your own pace
            and repeat days when you need to.
          </p>
        </div>
      </section>
    </div>
  );
}
