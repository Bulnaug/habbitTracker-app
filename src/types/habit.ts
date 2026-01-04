export interface Habit {
  id: string
  title: string
  completedDates: string[]
  achievements?: string[] // ids достижений
}