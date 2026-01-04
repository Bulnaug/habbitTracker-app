import { type Habit } from "../types/habit"
import { calculateStreak } from "../utils/streak"
import { AchievementBadges } from "./AchievementBadges"

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
    <div className="
        flex-1 px-3 py-2 rounded-lg
        px-3 py-2 rounded-lg
        border border-gray-200 dark:border-gray-700
        hover:bg-gray-50 dark:hover:bg-gray-700
    ">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-lg">
            {habit.title}
          </h3>
          <span className="text-sm text-gray-400 dark:text-gray-500">
            🔥 {streak} дн.
          </span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onToggle(habit.id)}
            className={`w-10 h-10 rounded-lg text-white transition ${
              completedToday
                ? "bg-green-500"
                : "bg-gray-400"
            }`}
          >
            ✔
          </button>

          <button
            onClick={() => onDelete(habit.id)}
            className="w-10 h-10 rounded-lg bg-red-500 text-white"
          >
            🗑
          </button>
        </div>
      </div>

      <AchievementBadges
        unlocked={habit.achievements ?? []}
      />
    </div>
  )
}