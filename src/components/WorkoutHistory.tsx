import { useTraining } from "../context/TrainingContext";
import { exercises } from "../data/exercises";

export function WorkoutHistory() {
  const { history, clearHistory } = useTraining();
  const sets = history.flatMap((log) => log.sets);
  const records = new Map<string, { value: number; unit: string }>();
  for (const set of sets) {
    const key = `${set.exerciseId}:${set.unit}:${set.band ?? ""}`;
    if (!records.has(key) || records.get(key)!.value < set.value)
      records.set(key, { value: set.value, unit: set.unit });
  }
  function exportHistory() {
    const blob = new Blob(
      [
        JSON.stringify(
          { version: 1, exportedAt: new Date().toISOString(), history },
          null,
          2,
        ),
      ],
      { type: "application/json" },
    );
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "home-gym-workout-history.json";
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <section className="space-y-5">
      <div className="section-heading">
        <div>
          <p className="eyebrow">YOUR WORK, RECORDED</p>
          <h2>Training history</h2>
        </div>
        {history.length > 0 && (
          <button className="secondary-button" onClick={exportHistory}>
            Export history
          </button>
        )}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="panel">
          <p className="text-xs text-slate-400">Saved sessions</p>
          <p className="text-3xl font-semibold mt-2">{history.length}</p>
        </div>
        <div className="panel">
          <p className="text-xs text-slate-400">Recorded sets</p>
          <p className="text-3xl font-semibold mt-2">{sets.length}</p>
        </div>
      </div>
      {history.length === 0 ? (
        <div className="panel text-slate-400">
          Finish and save a guided session to see your actual sets and effort
          here. Manually completed plan days do not create workout records.
        </div>
      ) : (
        <>
          <div className="panel">
            <h3 className="font-semibold mb-3">Best recorded sets</h3>
            <p className="text-xs text-slate-400 mb-3">
              Self-reported results, including warm-ups. Compare the same
              variation and assistance.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[...records.entries()].map(([key, record]) => {
                const id = key.split(":")[0]!;
                return (
                  <div key={key} className="flex justify-between gap-3 text-sm">
                    <span>
                      {exercises[id]?.name ?? id}
                      {key.split(":")[2] ? ` (${key.split(":")[2]} band)` : ""}
                    </span>
                    <strong className="text-cyan-400 whitespace-nowrap">
                      {record.value} {record.unit}
                    </strong>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="panel">
            <h3 className="font-semibold mb-2">Recent sessions</h3>
            {[...history]
              .reverse()
              .slice(0, 20)
              .map((log) => (
                <details key={log.id} className="border-t border-white/10 py-4">
                  <summary className="cursor-pointer">
                    <span className="font-semibold">
                      Day {log.day}: {log.title}
                    </span>
                    <span className="block text-xs text-slate-400 mt-2">
                      {new Date(log.date).toLocaleDateString()} ·{" "}
                      {log.sets.length} sets ·{" "}
                      {log.effort === "right"
                        ? "Just right"
                        : log.effort === "hard"
                          ? "Hard"
                          : "Easy"}
                      {log.shortened ? " · Adapted" : ""}
                      {log.skipped > 0
                        ? ` · Partial (${log.skipped} skipped)`
                        : ""}
                    </span>
                  </summary>
                  <ol className="mt-4 space-y-2 text-sm">
                    {log.sets.map((set, i) => (
                      <li className="flex justify-between gap-3" key={i}>
                        <span>
                          {exercises[set.exerciseId]?.name ?? set.exerciseId}
                          {set.band ? ` (${set.band} band)` : ""}
                        </span>
                        <span className="text-slate-400 whitespace-nowrap">
                          {set.value} {set.unit}
                        </span>
                      </li>
                    ))}
                  </ol>
                </details>
              ))}
          </div>
          <button
            className="secondary-button text-rose-300"
            onClick={() => {
              if (
                confirm(
                  "Delete all saved workout history on this device? Plan completion will stay unchanged.",
                )
              )
                clearHistory();
            }}
          >
            Clear workout history
          </button>
        </>
      )}
      <p className="text-xs text-slate-400">
        Stored on this device. Keeps the latest 200 sessions; export a backup
        when you want a permanent copy.
      </p>
    </section>
  );
}
