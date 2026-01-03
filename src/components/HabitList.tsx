import { type Habit } from "../types/habit"
import { HabitItem } from "./HabitItem"

interface Props {
  habits: Habit[]
  today: string
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export const HabitList = ({
  habits,
  today,
  onToggle,
  onDelete,
}: Props) => {
  return (
    <div className="space-y-3">
      {habits.map(habit => (
        <HabitItem
          key={habit.id}
          habit={habit}
          today={today}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
