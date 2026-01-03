import { type Habit } from "../types/habit"

interface Props {
  habit: Habit
  today: string
  onToggle: (id: string) => void
}

export const HabitItem = ({ habit, today, onToggle }: Props) => {
  const completedToday = habit.completedDates.includes(today)

  return (
    <div className="flex items-center justify-between p-3 border rounded-lg">
      <span className="font-medium">{habit.title}</span>
      <button
        onClick={() => onToggle(habit.id)}
        className={`px-3 py-1 rounded text-white ${
          completedToday ? "bg-green-500" : "bg-gray-400"
        }`}
      >
        {completedToday ? "✔" : "✖"}
      </button>
    </div>
  )
}
