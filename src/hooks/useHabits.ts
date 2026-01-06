import { useQuery, useMutation } from "convex/react"
import { useMemo } from "react"
import { api } from "../../convex/_generated/api"
import { today } from "../utils/date"
import type { Id } from "../../convex/_generated/dataModel"

export function useHabits() {
  const habits = useQuery(api.habits.getHabits)
  const todayStr = today()

  const addHabit = useMutation(api.habits.addHabit)
  const toggleToday = useMutation(api.habits.toggleToday)
  const removeHabit = useMutation(api.habits.removeHabit)

  const handleAddHabit = (title: string) => {
    addHabit({ title })
  }

  const handleToggle = (id: Id<"habits">) => {
    toggleToday({ id, today: todayStr })
  }

  const handleDelete = (id: Id<"habits">) => {
    removeHabit({ id })
  }

  const progress = useMemo(() => {
    if (!habits || habits.length === 0) return 0

    const completedToday = habits.filter(habit =>
      habit.completedDates.includes(todayStr)
    ).length

    return Math.round((completedToday / habits.length) * 100)
  }, [habits, todayStr])

  return {
    habits: habits ?? [],
    progress,
    handleAddHabit,
    handleDelete,
    handleToggle,
  }
}
