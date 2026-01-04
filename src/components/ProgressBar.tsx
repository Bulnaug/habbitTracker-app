interface Props {
  progress: number
}

export const ProgressBar = ({ progress }: Props) => {
  return (
    <div>
      <div className="flex justify-between text-gray-400 dark:text-gray-500 mb-1">
        <span>Heute</span>
        <span>{Math.round(progress)}%</span>
      </div>

      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
        <div
          className="bg-green-500 h-3 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}

