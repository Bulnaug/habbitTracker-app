interface Props {
  progress: number
}

export const ProgressBar = ({ progress }: Props) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-3">
      <div
        className="bg-green-500 h-3 rounded-full transition-all"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
