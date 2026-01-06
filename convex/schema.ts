import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  habits: defineTable({
    title: v.string(),
    completedDates: v.array(v.string()),
  }),
})
