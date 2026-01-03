import { useEffect, useState } from "react"
import { type Habit } from "./types/habit"
import { HabitList } from "./components/HabitList"
import { ProgressBar } from "./components/ProgressBar"
import { AddHabit } from "./components/AddHabit"
import { loadHabits, saveHabits } from "./utils/storage"

const today = new Date().toISOString().slice(0, 10)

function App() {
  const [habits, setHabits] = useState<Habit[]>(() => loadHabits())

  useEffect(() => {
    saveHabits(habits)
  }, [habits])

  const addHabit = (title: string) => {
    setHabits(prev => [
      ...prev,
      {
        id: crypto.randomUUID(),
        title,
        completedDates: [],
      },
    ])
  }

  const deleteHabit = (id: string) => {
    setHabits(prev => prev.filter(h => h.id !== id))
  }

  const toggleHabit = (id: string) => {
    setHabits(prev =>
      prev.map(h =>
        h.id === id
          ? {
              ...h,
              completedDates: h.completedDates.includes(today)
                ? h.completedDates.filter(d => d !== today)
                : [...h.completedDates, today],
            }
          : h
      )
    )
  }

  const completed = habits.filter(h =>
    h.completedDates.includes(today)
  ).length

  const progress = habits.length
    ? (completed / habits.length) * 100
    : 0

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-md mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-center">Habit Tracker</h1>

        <ProgressBar progress={progress} />

        <AddHabit onAdd={addHabit} />

        <HabitList
          habits={habits}
          today={today}
          onToggle={toggleHabit}
          onDelete={deleteHabit}
        />
      </div>
    </div>
  )
}

export default App
