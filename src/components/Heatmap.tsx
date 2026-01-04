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
      <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-4">Активность за 30 дней</h2>
      <div className="grid grid-cols-10 gap-1">
        {days.map(day => (
          <div
            key={day}
            title={day}
            className={`w-4 h-4
                rounded-md
                transition
                hover:scale-110 ${getIntensity(day)}`}
          />
        ))}
      </div>
      <div className="flex items-center gap-2 mt-4 text-xs">
        <span className="text-gray-400 dark:text-gray-100">Мало</span>
        <div className="w-4 h-4 bg-gray-200 rounded-md" />
        <div className="w-4 h-4 bg-green-300 rounded-md" />
        <div className="w-4 h-4 bg-green-600 rounded-md" />
        <span className="text-gray-400 dark:text-gray-100">Много</span>
      </div>
    </div>
  )
}
