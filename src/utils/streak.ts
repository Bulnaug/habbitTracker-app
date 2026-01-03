export const calculateStreak = (dates: string[]): number => {
  if (!dates.length) return 0

  const sorted = [...dates].sort()
  let streak = 0

  let currentDate = new Date()
  currentDate.setHours(0, 0, 0, 0)

  for (let i = sorted.length - 1; i >= 0; i--) {
    const date = new Date(sorted[i])
    date.setHours(0, 0, 0, 0)

    if (date.getTime() === currentDate.getTime()) {
      streak++
      currentDate.setDate(currentDate.getDate() - 1)
    } else {
      break
    }
  }

  return streak
}
