import { useCallback, useEffect, useState } from 'react';
import type { ProgressState } from '../data/types';

const STORAGE_KEY = 'chg-progress-v1';

function todayISO(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function daysBetween(a: string, b: string): number {
  const da = new Date(a + 'T12:00:00');
  const db = new Date(b + 'T12:00:00');
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
      completedDays: Array.isArray(parsed.completedDays) ? parsed.completedDays : [],
      lastCompletedDate: parsed.lastCompletedDate ?? null,
      streak: typeof parsed.streak === 'number' ? parsed.streak : 0,
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

  useEffect(() => {
    save(progress);
  }, [progress]);

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
    progress,
    isCompleted,
    toggleDay,
    resetProgress,
    completedCount,
  };
}
