import { useState } from "react";
import { Link } from "react-router-dom";
import { useTraining } from "../context/TrainingContext";
import { gear, skillPaths, canTrain } from "../data/training";
import { exercises } from "../data/exercises";
import { equipmentLabel } from "../components/EquipmentBadge";

export function Training() {
  const { profile, saveProfile, error } = useTraining();
  const [draft, setDraft] = useState(profile);
  const [saved, setSaved] = useState(false);
  return (
    <div className="space-y-6">
      <div className="page-heading">
        <div>
          <p className="eyebrow">YOUR TRAINING, YOUR TERMS</p>
          <h1>Make it fit you.</h1>
          <p className="text-slate-400 mt-3">
            Set your home equipment and preferred starting effort. Adjust each
            session when life changes.
          </p>
        </div>
      </div>
      <form
        className="panel space-y-6"
        onSubmit={(event) => {
          event.preventDefault();
          saveProfile(draft);
          setSaved(true);
        }}
        onChange={() => setSaved(false)}
      >
        <div className="grid sm:grid-cols-2 gap-5">
          <label>
            My focus
            <select
              className="form-input"
              value={draft.goal}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  goal: e.target.value as typeof draft.goal,
                })
              }
            >
              <option value="strength">Build strength</option>
              <option value="consistency">Build consistency</option>
              <option value="skills">Learn calisthenics skills</option>
            </select>
          </label>
          <label>
            Starting effort
            <select
              className="form-input"
              value={draft.level}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  level: e.target.value as typeof draft.level,
                })
              }
            >
              <option value="foundation">
                Foundation · easier variations and lower volume
              </option>
              <option value="standard">Original plan · standard targets</option>
            </select>
          </label>
          <label>
            Weekly workout goal
            <select
              className="form-input"
              value={draft.weeklyTarget}
              onChange={(e) =>
                setDraft({ ...draft, weeklyTarget: Number(e.target.value) })
              }
            >
              {[2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n} workout days
                </option>
              ))}
            </select>
          </label>
        </div>
        <fieldset>
          <legend className="font-semibold mb-3">My available equipment</legend>
          <p className="text-sm text-slate-400 mb-4">
            Clear floor space is assumed; a mat is optional. Only select
            equipment you can use today.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {gear.map((eq) => (
              <label className="choice-row" key={eq}>
                <input
                  type="checkbox"
                  checked={draft.equipment.includes(eq)}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      equipment: e.target.checked
                        ? [...draft.equipment, eq]
                        : draft.equipment.filter((x) => x !== eq),
                    })
                  }
                />
                {equipmentLabel(eq)}
              </label>
            ))}
          </div>
        </fieldset>
        <p className="text-sm text-slate-400">
          Your focus guides the dashboard. Starting effort and equipment change
          workout prescriptions. The weekly goal tracks consistency; it does not
          rearrange your 30-day sequence or replace recovery days.
        </p>
        <button className="primary-button" type="submit">
          Save training profile →
        </button>
        {saved && (
          <p
            role="status"
            className={error ? "text-amber-300" : "text-cyan-400"}
          >
            {error
              ? "Saved for this visit only. Device storage is unavailable."
              : "Profile saved. Your next session will use these settings."}
          </p>
        )}
      </form>
      <SkillPaths />
    </div>
  );
}

export function SkillPaths() {
  const { profile, history } = useTraining();
  return (
    <section className="space-y-4">
      <div>
        <p className="eyebrow">A PATH, NOT A DEADLINE</p>
        <h2 className="text-2xl font-semibold">Build your skills</h2>
        <p className="text-sm text-slate-400 mt-2">
          Explore the sequence and log your practice. A recorded set is
          practice, not proof of mastery.
        </p>
      </div>
      <div className="grid lg:grid-cols-3 gap-4">
        {skillPaths.map((path) => (
          <div className="panel" key={path.title}>
            <h3 className="font-semibold">{path.title}</h3>
            <p className="text-sm text-slate-400 mt-2 mb-4">
              {path.description}
            </p>
            <ol className="space-y-3">
              {path.ids.map((id, index) => {
                const practiced = history.some((log) =>
                  log.sets.some((set) => set.exerciseId === id),
                );
                return (
                  <li key={id}>
                    <Link className="skill-step" to={`/exercise/${id}`}>
                      <span
                        className={
                          practiced ? "skill-number practiced" : "skill-number"
                        }
                      >
                        {practiced ? "✓" : index + 1}
                      </span>
                      <span>
                        {exercises[id]!.name}
                        <small>
                          {!canTrain(id, profile.equipment)
                            ? "Equipment needed"
                            : practiced
                              ? "Practiced"
                              : "Explore technique"}
                        </small>
                      </span>
                      <span aria-hidden="true">↗</span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </div>
        ))}
      </div>
    </section>
  );
}
