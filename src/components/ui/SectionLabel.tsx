import type { ReactNode } from 'react'

interface SectionLabelProps {
  children: ReactNode
  className?: string
}

export default function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <p
      className={`font-body text-[11px] text-accent uppercase tracking-label leading-none ${className}`}
    >
      {'// '}
      {children}
    </p>
  )
}
