import { ACHIEVEMENTS } from "../data/achievements"

interface Props {
  unlocked: string[]
}

export const AchievementBadges = ({ unlocked }: Props) => {
  return (
    <div className="flex gap-2 mt-2">
      {ACHIEVEMENTS.map(a => {
        const icon =
          a.requiredStreak >= 30 ? "🏆" :
          a.requiredStreak >= 14 ? "💪" : "🔥"

        return (
          <span
            key={a.id}
            title={a.description}
            className={`text-xl transition-opacity ${
              unlocked.includes(a.id)
                ? "opacity-100"
                : "opacity-30 grayscale"
            }`}
          >
            {icon}
          </span>
        )
      })}
    </div>
  )
}
