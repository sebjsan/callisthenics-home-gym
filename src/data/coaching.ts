import type { WorkoutLog } from './training';
import { PROGRAM_ID, getDay } from './plan';

export function sessionAdvice(history: WorkoutLog[], now = Date.now()) {
  const recent = history.filter(log => log.programId === PROGRAM_ID && getDay(log.day)?.type === 'train' && log.sets.length > 0 && Date.parse(log.date) <= now && now - Date.parse(log.date) < 14 * 86400000)
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
  const last = recent[0];
  if (!last) return { ease: false, text: 'Start with today’s targets and leave 2–3 controlled reps in reserve. Record your actual sets to build a useful baseline.' };
  if (last.effort === 'hard' || last.technique === 'needs-practice') return {
    ease: true, text: 'Your recent strength session was hard or form needed practice. Try Easier today, keep recovery days, and rebuild controlled reps before adding difficulty.'
  };
  if (last.skipped > 0) return { ease: false, text: 'Your last strength session was partial. Repeat manageable targets; a short session is available if time was the constraint.' };
  return { ease: false, text: 'Keep building repeatable sets. Review each exercise’s recent practice before changing difficulty; session effort alone does not establish mastery.' };
}
