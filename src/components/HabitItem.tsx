import { today } from "../utils/date"
import { calculateProgress, calculateStreak } from "../hooks/habitStats"


export function HabitItem({
  habit,
  onToggle,
  onRemove,
}: any) {
  const doneToday = habit.completedDates.includes(today())

  const streak = calculateStreak(habit.completedDates)
  const progress = calculateProgress(habit.completedDates)  

  return (
    <div className={`
            flex-1 px-3 py-2 rounded-lg
            px-3 py-2 rounded-lg
            border border-gray-200 dark:border-gray-700
            hover:scale-[1.01]
            transition-all
            duration-200
            ${doneToday ? "opacity-70" : "opacity-100"}
         `}
    > 
      <div className="mt-2">
        
        <div className="h-2 w-full rounded bg-muted">
         
          <div
            className="h-2 rounded bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        
        <div className="mt-1 text-xs text-muted-foreground">
          {progress}% за последние 7 дней
        </div>
      </div>


      <div className="group flex justify-between items-center">
        <div>
          <span className={`font-semibold text-lg ${doneToday ? "line-through opacity-60" : ""}`}>
            {habit.title}
          </span>
          <div className="text-sm text-gray-400 dark:text-gray-500">
            🔥 {streak} day streak
          </div>
        </div>  
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
          <button 
            onClick={() => onToggle(habit._id)}
            className={`
                  p-2
                  rounded-lg
                  opacity-60
                  transition
                  hover:opacity-100
                  hover:scale-110
                  active:scale-95
                  focus:outline-none
                  focus:ring-2
                  focus:ring-white/20
                  ${doneToday ? "text-green-500" : "text-gray-400"}
            `}
          >
            <span className="text-xl">✓</span>
          </button>
          <button
            onClick={() => {
              console.log("DELETE", habit._id)
              onRemove(habit._id)
            }}
            className="
                  p-2
                  rounded-lg
                  opacity-50
                  transition
                  hover:opacity-100
                  hover:scale-110
                  active:scale-95
                  focus:outline-none
                  focus:ring-2
                  focus:ring-white/20
            "
          >
            🗑
          </button>
        </div>
      </div>
    </div>
  )
}
