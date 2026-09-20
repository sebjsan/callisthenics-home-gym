import { useCallback, useEffect, useState } from "react";
import type { ProgressState } from "../data/types";

const STORAGE_KEY = "chg-progress-v1";

function todayISO(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function daysBetween(a: string, b: string): number {
  const da = new Date(a + "T12:00:00");
  const db = new Date(b + "T12:00:00");
  return Math.round((db.getTime() - da.getTime()) / 86400000);
}

function load(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { completedDays: [], lastCompletedDate: null, streak: 0 };
    }
    const parsed = JSON.parse(raw) as ProgressState;
    return {
      completedDays: Array.isArray(parsed.completedDays)
        ? [
            ...new Set(
              parsed.completedDays.filter(
                (d) => Number.isInteger(d) && d >= 1 && d <= 30,
              ),
            ),
          ]
        : [],
      lastCompletedDate: parsed.lastCompletedDate ?? null,
      streak: typeof parsed.streak === "number" ? parsed.streak : 0,
    };
  } catch {
    return { completedDays: [], lastCompletedDate: null, streak: 0 };
  }
}

function save(state: ProgressState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function useProgress() {
  const [progress, setProgress] = useState<ProgressState>(() => load());
  const [storageError, setStorageError] = useState(false);

  useEffect(() => {
    try {
      save(progress);
      setStorageError(false);
    } catch {
      setStorageError(true);
    }
  }, [progress]);

  const completeDay = useCallback((day: number) => {
    if (!Number.isInteger(day) || day < 1 || day > 30) return;
    setProgress((prev) => {
      if (prev.completedDays.includes(day)) return prev;
      const today = todayISO();
      const gap = prev.lastCompletedDate
        ? daysBetween(prev.lastCompletedDate, today)
        : 2;
      return {
        completedDays: [...prev.completedDays, day].sort((a, b) => a - b),
        lastCompletedDate: today,
        streak: gap === 0 ? prev.streak : gap === 1 ? prev.streak + 1 : 1,
      };
    });
  }, []);

  const isCompleted = useCallback(
    (day: number) => progress.completedDays.includes(day),
    [progress.completedDays],
  );

  const toggleDay = useCallback((day: number) => {
    setProgress((prev) => {
      const done = prev.completedDays.includes(day);
      let completedDays: number[];
      let streak = prev.streak;
      let lastCompletedDate = prev.lastCompletedDate;

      if (done) {
        completedDays = prev.completedDays.filter((d) => d !== day);
        if (completedDays.length === 0) {
          streak = 0;
          lastCompletedDate = null;
        }
      } else {
        completedDays = [...prev.completedDays, day].sort((a, b) => a - b);
        const today = todayISO();
        if (!prev.lastCompletedDate) {
          streak = 1;
        } else {
          const gap = daysBetween(prev.lastCompletedDate, today);
          if (gap === 0) {
            // same day — keep streak
          } else if (gap === 1) {
            streak = prev.streak + 1;
          } else {
            streak = 1;
          }
        }
        lastCompletedDate = today;
      }

      return { completedDays, lastCompletedDate, streak };
    });
  }, []);

  const resetProgress = useCallback(() => {
    setProgress({ completedDays: [], lastCompletedDate: null, streak: 0 });
  }, []);

  const completedCount = progress.completedDays.length;

  return {
    progress: {
      ...progress,
      streak:
        progress.lastCompletedDate &&
        daysBetween(progress.lastCompletedDate, todayISO()) <= 1
          ? progress.streak
          : 0,
    },
    completeDay,
    storageError,
    isCompleted,
    toggleDay,
    resetProgress,
    completedCount,
  };
}
