interface Props {
  theme: "light" | "dark"
  toggle: () => void
}

export const ThemeToggle = ({ theme, toggle }: Props) => {
  return (
    <button
      onClick={toggle}
      className="text-sm px-3 py-1 rounded border
        dark:bg-gray-800 dark:text-white"
    >
      {theme === "dark" ? "☀️ Светлая" : "🌙 Тёмная"}
    </button>
  )
}
