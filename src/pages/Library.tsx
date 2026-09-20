import { useState } from "react";
import { Link } from "react-router-dom";
import { exercises } from "../data/exercises";
import { ExerciseAnimation } from "../components/ExerciseAnimation";

export function Library() {
  const [query, setQuery] = useState("");
  const [equipment, setEquipment] = useState("all");
  const matches = Object.values(exercises).filter(
    (ex) =>
      `${ex.name} ${ex.muscles.join(" ")}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()) &&
      (equipment === "all" ||
        ex.equipment.some((eq) => eq.startsWith(equipment))),
  );
  return (
    <div className="space-y-6">
      <div className="page-heading">
        <div>
          <p className="eyebrow">MOVE WITH CONFIDENCE</p>
          <h1>Exercise library</h1>
          <p className="text-slate-400 mt-2">
            Learn the movement. Then make it yours.
          </p>
        </div>
      </div>
      <div className="panel grid sm:grid-cols-2 gap-4">
        <label className="text-sm">
          Search exercises
          <input
            className="form-input"
            type="search"
            placeholder="Try push-up, core, shoulders…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <label className="text-sm">
          Equipment
          <select
            className="form-input"
            value={equipment}
            onChange={(e) => setEquipment(e.target.value)}
          >
            <option value="all">All equipment</option>
            <option value="yoga-mat">Mat</option>
            <option value="push-up-bars">Push-up bars</option>
            <option value="pull-up-bar">Pull-up / dip station</option>
            <option value="resistance-band">Resistance bands</option>
          </select>
        </label>
      </div>
      <p className="text-sm text-slate-400" role="status">
        {matches.length} exercises
      </p>
      <div className="foundation-grid">
        {matches.map((ex) => (
          <Link
            className="foundation-card"
            key={ex.id}
            to={`/exercise/${ex.id}`}
          >
            <ExerciseAnimation
              animationId={ex.animationId}
              alt={ex.name}
              variant="thumb"
              className="foundation-image"
            />
            <div className="p-4">
              <h2 className="font-semibold">{ex.name}</h2>
              <p className="text-xs text-slate-400 mt-2 capitalize">
                {ex.muscles.join(" · ")}
              </p>
            </div>
          </Link>
        ))}
      </div>
      {matches.length === 0 && (
        <div className="panel">
          <h2>No exercises found</h2>
          <p className="text-slate-400 mt-2">
            Try another muscle group or choose all equipment.
          </p>
          <button
            className="secondary-button mt-4"
            onClick={() => {
              setQuery("");
              setEquipment("all");
            }}
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
