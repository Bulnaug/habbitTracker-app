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
        className="flex-1 px-3 py-2 border rounded-lg"
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
