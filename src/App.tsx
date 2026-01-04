import { useEffect, useState } from "react"
import { type Habit } from "./types/habit"
import { HabitList } from "./components/HabitList"
import { ProgressBar } from "./components/ProgressBar"
import { AddHabit } from "./components/AddHabit"
import { Heatmap } from "./components/Heatmap"
import { loadHabits, saveHabits } from "./utils/storage"
import { calculateStreak } from "./utils/streak"
import { ACHIEVEMENTS } from "./data/achievements"
import { checkAchievements } from "./utils/achievements"
import { useTheme } from "./hooks/useTheme"
import { ThemeToggle } from "./components/ThemeToggle"

const today = new Date().toISOString().slice(0, 10)


function App() {
  const [habits, setHabits] = useState<Habit[]>(() => loadHabits())
  const { theme, setTheme } = useTheme()

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
      prev.map(h => {
        if (h.id !== id) return h

        const updatedDates = h.completedDates.includes(today)
          ? h.completedDates.filter(d => d !== today)
          : [...h.completedDates, today]

        const streak = calculateStreak(updatedDates)
        const achievements = checkAchievements(
          streak,
          h.achievements,
          ACHIEVEMENTS
        )

        return {
          ...h,
          completedDates: updatedDates,
          achievements,
        }
      })
    )
  }

  const completed = habits.filter(h =>
    h.completedDates.includes(today)
  ).length

  const progress = habits.length
    ? (completed / habits.length) * 100
    : 0

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white p-6">
      <div className="max-w-md mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-center">Habit Tracker</h1>
        <ThemeToggle
          theme={theme}
          toggle={() => setTheme(theme === "dark" ? "light" : "dark")}
        />

        <ProgressBar progress={progress} />

        <Heatmap habits={habits} />
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
