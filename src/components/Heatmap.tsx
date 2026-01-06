import { type Habit } from "../types/habit"
import { getLastNDays } from "../utils/date"
import type { Id } from "../../convex/_generated/dataModel"


type Props = {
  habits: {  // plural - массив привычек
    _id: Id<"habits">
    title: string
    completedDates: string[]
  }[]
}

// 2. Измените компонент
export function Heatmap({ habits }: Props) {
  const days = getLastNDays(30)

  const getIntensity = (date: string) => {
    // Считаем сколько привычек выполнено в эту дату
    const completedCount = habits.filter(habit =>
      habit.completedDates.includes(date)
    ).length

    if (completedCount === 0) return "bg-gray-200"
    if (completedCount === 1) return "bg-green-200"
    if (completedCount === 2) return "bg-green-400"
    return "bg-green-600"
  }

  return (
    <div>
      <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-4">Aktivität in 30 Tagen</h2>
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
        <span className="text-gray-400 dark:text-gray-100">Wenig</span>
        <div className="w-4 h-4 bg-gray-200 rounded-md" />
        <div className="w-4 h-4 bg-green-300 rounded-md" />
        <div className="w-4 h-4 bg-green-600 rounded-md" />
        <span className="text-gray-400 dark:text-gray-100">Viel</span>
      </div>
    </div>
  )
}
