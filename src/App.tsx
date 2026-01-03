import { useEffect, useState } from "react"
import { type Habit } from "./types/habit"
import { HabitList } from "./components/HabitList"
import { ProgressBar } from "./components/ProgressBar"
import { loadHabits, saveHabits } from "./utils/storage"

const today = new Date().toISOString().slice(0, 10)

const DEFAULT_HABITS: Habit[] = [
  { id: "1", title: "Wasser", completedDates: [] },
  { id: "2", title: "Sport", completedDates: [] },
  { id: "3", title: "Essen", completedDates: [] },
]

function App() {
  const [habits, setHabits] = useState<Habit[]>(
    () => loadHabits().length ? loadHabits() : DEFAULT_HABITS
  )

  useEffect(() => {
    saveHabits(habits)
  }, [habits])

  const toggleHabit = (id: string) => {
    setHabits(prev =>
      prev.map(habit =>
        habit.id === id
          ? {
              ...habit,
              completedDates: habit.completedDates.includes(today)
                ? habit.completedDates.filter(d => d !== today)
                : [...habit.completedDates, today],
            }
          : habit
      )
    )
  }

  const completedCount = habits.filter(h =>
    h.completedDates.includes(today)
  ).length

  const progress = habits.length
    ? (completedCount / habits.length) * 100
    : 0

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-md mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-center">Habit Tracker</h1>

        <ProgressBar progress={progress} />

        <HabitList
          habits={habits}
          today={today}
          onToggle={toggleHabit}
        />
      </div>
    </div>
  )
}

export default App
