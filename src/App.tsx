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

const today = new Date().toISOString().slice(0, 10)
type Theme = 'light' | 'dark'



function App() {
  const [habits, setHabits] = useState<Habit[]>(() => loadHabits())
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme') as Theme | null
    if (saved) return saved

    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  })

  useEffect(() => {
    localStorage.setItem('theme', theme)
  }, [theme])

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
    <div 
      className={`min-h-screen p-6 ${
        theme === 'dark' ? 'dark bg-gray-900' : 'bg-gray-100'
      }`}
    >
      <div className="
        max-w-md mx-auto space-y-8
        bg-white dark:bg-gray-800
        text-gray-800 dark:text-gray-100
        rounded-xl shadow-lg p-6
      ">
       <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4 text-center">Habit Tracker</h1>
        <button
          onClick={() => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))}
          className="
            absolute top-4 right-4
            p-2 rounded-full
            bg-gray-200 dark:bg-gray-700
            hover:scale-105 transition
          "
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>

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
