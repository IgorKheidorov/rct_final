interface AccentBarProps {
  className?: string
}

export default function AccentBar({ className = '' }: AccentBarProps) {
  return <div className={`w-10 h-[3px] bg-accent ${className}`} aria-hidden="true" />
}
