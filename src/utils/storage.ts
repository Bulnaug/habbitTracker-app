import { type Habit } from "../types/habit"

const STORAGE_KEY = "habits"

export const loadHabits = (): Habit[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export const saveHabits = (habits: Habit[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(habits))
}
