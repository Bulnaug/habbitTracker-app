import { type Achievement } from "../types/achievement"

interface Props {
  achievements: Achievement[]
  unlocked: string[]
}

export const Achievements = ({ achievements, unlocked }: Props) => {
  return (
    <div>
      <h2 className="text-sm font-semibold mb-2">Достижения</h2>
      <div className="grid grid-cols-2 gap-3">
        {achievements.map(a => {
          const isUnlocked = unlocked.includes(a.id)

          return (
            <div
              key={a.id}
              className={`p-3 border rounded-lg text-sm ${
                isUnlocked
                  ? "bg-yellow-100 border-yellow-400"
                  : "bg-gray-100 opacity-50"
              }`}
            >
              <div className="font-medium">{a.title}</div>
              <div>{a.description}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
