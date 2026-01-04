import { type Achievement } from "../types/achievement"

export const checkAchievements = (
  streak: number,
  unlocked: string[] = [],
  all: Achievement[]
): string[] => {
  const newlyUnlocked = all
    .filter(
      a =>
        streak >= a.requiredStreak &&
        !unlocked.includes(a.id)
    )
    .map(a => a.id)

  return [...unlocked, ...newlyUnlocked]
}
