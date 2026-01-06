import { useState } from "react"

export function AddHabit({ onAdd }: { onAdd: (title: string) => void }) {
  const [title, setTitle] = useState("")

  return (
    <div className="flex gap-2 mb-6">
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Neue Gewohnheit"
        className="
            flex-1 px-3 py-2 rounded-lg
            border border-gray-300 dark:border-gray-600
            bg-white dark:bg-gray-700
            text-gray-800 dark:text-gray-100
            focus:outline-none focus:ring-2 focus:ring-white/30
            placeholder:text-gray-400 dark:placeholder:text-gray-500
        "
      />
      <button
        onClick={() => {
          if (!title.trim()) return
          onAdd(title)
          setTitle("")
        }}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg
            transition
            hover:scale-105
            active:scale-95
            focus:outline-none
            focus:ring-2
            focus:ring-white/30
        "
      >
        +
      </button>
    </div>
  )
}

          
