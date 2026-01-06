import { query, mutation } from "./_generated/server"
import { v } from "convex/values"

export const getHabits = query({
  handler: async (ctx) => {
    return await ctx.db.query("habits").collect()
  },
})

export const addHabit = mutation({
  args: { title: v.string() },
  handler: async (ctx, { title }) => {
    await ctx.db.insert("habits", {
      title,
      completedDates: [],
    })
  },
})

export const toggleToday = mutation({
  args: {
    id: v.id("habits"),
    today: v.string(),
  },
  handler: async (ctx, { id, today }) => {
    const habit = await ctx.db.get(id)
    if (!habit) return

    const done = habit.completedDates.includes(today)

    await ctx.db.patch(id, {
      completedDates: done
        ? habit.completedDates.filter(d => d !== today)
        : [...habit.completedDates, today],
    })
  },
})

export const removeHabit = mutation({
  args: { id: v.id("habits") },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id)
  },
})
