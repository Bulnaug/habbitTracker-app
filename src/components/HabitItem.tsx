import { type Habit } from "../types/habit"
import { calculateStreak } from "../utils/streak"

interface Props {
  habit: Habit
  today: string
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export const HabitItem = ({
  habit,
  today,
  onToggle,
  onDelete,
}: Props) => {
  const completedToday = habit.completedDates.includes(today)
  const streak = calculateStreak(habit.completedDates)

  return (
    <div className="flex items-center justify-between p-3 border rounded-lg">
      <div>
        <div className="font-medium">{habit.title}</div>
        <div className="text-sm text-gray-500">
          🔥 Streak: {streak} дн.
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onToggle(habit.id)}
          className={`px-3 py-1 rounded text-white ${
            completedToday ? "bg-green-500" : "bg-gray-400"
          }`}
        >
          ✔
        </button>

        <button
          onClick={() => onDelete(habit.id)}
          className="px-3 py-1 bg-red-500 text-white rounded"
        >
          🗑
        </button>
      </div>
    </div>
  )
}
