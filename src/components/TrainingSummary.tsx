import { useTraining } from "../context/TrainingContext";
import { Link } from "react-router-dom";
const focusText = {
  strength: [
    "Build strength with control",
    "Log the reps you actually finish. Keep a variation until you can repeat it with steady form.",
  ],
  consistency: [
    "Make room for a small win",
    "Short on time? Choose a short session from the workout preview. Recovery days still belong in your plan.",
  ],
  skills: [
    "Practice the next step",
    "Explore your push, pull, and core skill paths. Use the movement guide before trying a harder variation.",
  ],
};
export function TrainingSummary() {
  const { profile, history } = useTraining();
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - ((start.getDay() + 6) % 7));
  const days = new Set(
    history
      .filter((log) => new Date(log.date) >= start && log.sets.length > 0)
      .map((log) => new Date(log.date).toLocaleDateString()),
  ).size;
  const last = history.at(-1);
  return (
    <section className="panel">
      <div className="section-heading">
        <p className="eyebrow mb-0!">MADE TO FIT YOUR WEEK</p>
        <Link to="/training">My training ↗</Link>
      </div>
      <div className="dashboard-grid">
        <div>
          <h2 className="text-xl font-semibold">
            {focusText[profile.goal][0]}
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            {last?.effort === "hard"
              ? "Your last workout felt hard. Consider an easier session or a recovery day before adding difficulty."
              : focusText[profile.goal][1]}
          </p>
        </div>
        <div>
          <p className="text-3xl font-bold">
            {days}
            <span className="text-base font-normal text-slate-400">
              {" "}
              / {profile.weeklyTarget} workout days
            </span>
          </p>
          <progress
            className="plan-progress"
            value={Math.min(days, profile.weeklyTarget)}
            max={profile.weeklyTarget}
            aria-label="Weekly workout goal"
          />
          <p className="text-xs text-slate-400">
            This week · saved workouts with recorded sets
          </p>
        </div>
      </div>
    </section>
  );
}
