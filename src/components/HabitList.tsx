import { type Habit } from "../types/habit"
import { HabitItem } from "./HabitItem"

interface Props {
  habits: Habit[]
  today: string
  onToggle: (id: string) => void
}

export const HabitList = ({ habits, today, onToggle }: Props) => {
  return (
    <div className="space-y-3">
      {habits.map(habit => (
        <HabitItem
          key={habit.id}
          habit={habit}
          today={today}
          onToggle={onToggle}
        />
      ))}
    </div>
  )
}
