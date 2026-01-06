import { ProgressBar } from "./components/ProgressBar"
import { Heatmap } from "./components/Heatmap"
import { AddHabit } from "./components/AddHabit"
import { HabitItem } from "./components/HabitItem"
import { useHabits } from "./hooks/useHabits"
import { useTheme } from "./hooks/useTheme"
import { calculateDailyProgress } from "./utils/progress"

export default function App() {
  const { habits, handleAddHabit, handleDelete, handleToggle } = useHabits()
  const { theme, setTheme } = useTheme()


  const dailyProgress = calculateDailyProgress(habits)

  if (!habits) return null

  return (
    <div className={`min-h-screen p-6 ${
            theme === 'dark' ? 'dark bg-gray-900' : 'bg-gray-100'
         }`}
    >
      <div className="
            max-w-md mx-auto space-y-8
            bg-white dark:bg-gray-800
            text-gray-800 dark:text-gray-100
            rounded-xl shadow-lg p-6
           "
      >
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4 text-center">Gewohnheits Tracker</h1>
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

        <ProgressBar value={dailyProgress} />
        <Heatmap habits={habits} />
        <AddHabit onAdd={handleAddHabit} />

        <div className="space-y-3">
          {habits.map(habit => (
            <HabitItem
              key={habit._id}
              habit={habit}
              onToggle={handleToggle}
              onRemove={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
