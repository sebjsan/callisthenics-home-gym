import { useState } from "react";
import { Link } from "react-router-dom";
import { useTraining } from "../context/TrainingContext";
import { PROGRAM_ID } from "../data/plan";
import { exercises } from "../data/exercises";

export function ProgramReview() {
  const { history } = useTraining();
  const [archiveError, setArchiveError] = useState(false);
  const [legacy] = useState(() => {
    try {
      const raw = localStorage.getItem("chg-progress-v1");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  const baseline = history.find(
    (log) => log.programId === PROGRAM_ID && log.day === 1 && log.skipped === 0,
  );
  const review = history.findLast(
    (log) =>
      log.programId === PROGRAM_ID && log.day === 29 && log.skipped === 0,
  );
  const comparable =
    baseline &&
    review &&
    JSON.stringify(
      baseline.sets.map((s) => [s.exerciseId, s.unit, s.band, s.perSide]),
    ) ===
      JSON.stringify(
        review.sets.map((s) => [s.exerciseId, s.unit, s.band, s.perSide]),
      );
  async function exportArchive() {
    try {
      const { plan } = await import("../data/legacyPlan");
      const url = URL.createObjectURL(
        new Blob(
          [
            JSON.stringify(
              { program: "Original 30-day plan", progress: legacy, plan },
              null,
              2,
            ),
          ],
          { type: "application/json" },
        ),
      );
      const a = document.createElement("a");
      a.href = url;
      a.download = "original-program-archive.json";
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch {
      setArchiveError(true);
    }
  }
  return (
    <section className="panel space-y-4">
      <p className="eyebrow">BALANCED FOUNDATIONS · NEW PROGRAM</p>
      <h2 className="text-xl font-semibold">Your baseline & review</h2>
      <p className="text-sm text-slate-400">
        This rebuilt plan starts its own completion record. Earlier workout
        history remains below, labeled Original program.
      </p>
      {legacy && (
        <div className="space-y-2">
          <p className="text-sm">
            Your original plan completion is archived on this device.
          </p>
          <button className="secondary-button" onClick={exportArchive}>
            Export original plan & completion
          </button>
          {archiveError && (
            <p role="alert">Could not export. Try again while connected.</p>
          )}
        </div>
      )}
      <div className="flex flex-wrap gap-3">
        <Link className="secondary-button" to="/day/1">
          Day 1 · baseline
        </Link>
        <Link className="secondary-button" to="/day/29">
          Day 29 · review
        </Link>
      </div>
      {!baseline || !review ? (
        <p className="text-sm text-slate-400">
          Save complete sessions for days 1 and 29 to compare your results. Keep
          the same variations, band assistance, and set counts.
        </p>
      ) : (
        <>
          <p className="text-sm">
            Reported effort: {baseline.effort} → {review.effort}
          </p>
          {comparable ? (
            <ul className="space-y-2 text-sm">
              {baseline.sets.map((set, i) => (
                <li key={i}>
                  {exercises[set.exerciseId]?.name}: {set.value} →{" "}
                  {review.sets[i]!.value} {set.unit}
                  {set.perSide ? " per side" : ""}
                  {set.band ? ` · ${set.band} band` : ""}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-amber-200">
              Variations, assistance, or set counts changed. Review the
              individual records rather than treating these as a like-for-like
              comparison.
            </p>
          )}
        </>
      )}
    </section>
  );
}
