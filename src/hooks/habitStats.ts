import { today, getLastNDays } from "../utils/date"

/**
 * Streak: сколько дней подряд выполнено до сегодня
 */
export const calculateStreak = (completedDates: string[]): number => {
  let streak = 0
  const day = new Date(today())

  while (true) {
    const d = day.toLocaleDateString("en-CA")
    if (!completedDates.includes(d)) break

    streak++
    day.setDate(day.getDate() - 1)
  }

  return streak
}

/**
 * Progress за последние N дней (0–100)
 */
export const calculateProgress = (
  completedDates: string[],
  days = 7
): number => {
  const range = getLastNDays(days)
  const done = range.filter(d => completedDates.includes(d)).length
  return Math.round((done / days) * 100)
}
