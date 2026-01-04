import { type Habit } from "../types/habit"
import { getLastNDays } from "../utils/dates"

interface Props {
  habits: Habit[]
}

export const Heatmap = ({ habits }: Props) => {
  const days = getLastNDays(30)

  const getIntensity = (date: string) => {
    const completed = habits.filter(h =>
      h.completedDates.includes(date)
    ).length

    if (completed === 0) return "bg-gray-200"
    if (completed === 1) return "bg-green-200"
    if (completed === 2) return "bg-green-400"
    return "bg-green-600"
  }

  return (
    <div>
      <h2 className="text-sm font-semibold mb-2">Активность за 30 дней</h2>
      <div className="grid grid-cols-10 gap-2">
        {days.map(day => (
          <div
            key={day}
            title={day}
            className={`w-6 h-6 rounded ${getIntensity(day)}`}
          />
        ))}
      </div>
    </div>
  )
}
