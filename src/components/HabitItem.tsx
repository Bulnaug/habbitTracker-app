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
        hover:scale-[1.01]
        transition-all
        duration-200
    ">
      <div className="group flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-lg">
            {habit.title}
          </h3>
          <span className="text-sm text-gray-400 dark:text-gray-500">
            🔥 {streak} дн.
          </span>
        </div>

        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
          <button
            onClick={() => onToggle(habit.id)}
            className={`
                p-2
                rounded-lg
                opacity-60
                transition
                hover:opacity-100
                hover:scale-110
                active:scale-95
                focus:outline-none
                focus:ring-2
                focus:ring-white/20
                ${completedToday ? "text-green-500" : "text-gray-400"}
            `}
          >
            <span className="text-xl">✓</span>
          </button>

          <button
            onClick={() => onDelete(habit.id)}
            className="
                p-2
                rounded-lg
                opacity-50
                transition
                hover:opacity-100
                hover:scale-110
                active:scale-95
                focus:outline-none
                focus:ring-2
                focus:ring-white/20
            "
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