import { useState } from "react"

interface Props {
  onAdd: (title: string) => void
}

export const AddHabit = ({ onAdd }: Props) => {
  const [title, setTitle] = useState("")

  const submit = () => {
    if (!title.trim()) return
    onAdd(title.trim())
    setTitle("")
  }

  return (
    <div className="flex gap-2">
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Новая привычка"
        className="
            flex-1 px-3 py-2 rounded-lg
            border border-gray-300 dark:border-gray-600
            bg-white dark:bg-gray-700
            text-gray-800 dark:text-gray-100
            focus:outline-none focus:ring-2 focus:ring-blue-500
            placeholder:text-gray-400 dark:placeholder:text-gray-500
        "
      />
      <button
        onClick={submit}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        +
      </button>
    </div>
  )
}
