import {
  createContext,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  initialTraining,
  readTraining,
  type TrainingState,
  type TrainingProfile,
  type WorkoutLog,
} from "../data/training";
const KEY = "chg-training-v1";
function useTrainingState() {
  const [state, setState] = useState(() => {
    try {
      return readTraining(localStorage.getItem(KEY));
    } catch {
      return initialTraining;
    }
  });
  const current = useRef(state);
  const [error, setError] = useState(false);
  function commit(update: (previous: TrainingState) => TrainingState) {
    const next = update(current.current);
    current.current = next;
    setState(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
      setError(false);
    } catch {
      setError(true);
    }
  }
  return {
    ...state,
    error,
    saveProfile: (profile: TrainingProfile) =>
      commit((prev) => ({ ...prev, profile })),
    toggleFavorite: (id: string) =>
      commit((prev) => ({
        ...prev,
        favorites: prev.favorites.includes(id)
          ? prev.favorites.filter((x) => x !== id)
          : [...prev.favorites, id],
      })),
    saveWorkout: (log: WorkoutLog) =>
      commit((prev) => ({
        ...prev,
        history: [...prev.history.filter((x) => x.id !== log.id), log].slice(
          -200,
        ),
      })),
    clearHistory: () => commit((prev) => ({ ...prev, history: [] })),
  };
}
const TrainingContext = createContext<ReturnType<
  typeof useTrainingState
> | null>(null);
export function TrainingProvider({ children }: { children: ReactNode }) {
  const value = useTrainingState();
  return (
    <TrainingContext.Provider value={value}>
      {children}
    </TrainingContext.Provider>
  );
}
export function useTraining() {
  const value = useContext(TrainingContext);
  if (!value) throw new Error("TrainingProvider is missing");
  return value;
}
