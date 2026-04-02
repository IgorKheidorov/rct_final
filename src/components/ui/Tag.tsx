import type { ReactNode } from 'react'

type TagVariant = 'default' | 'accent' | 'muted'

interface TagProps {
  children: ReactNode
  className?: string
  variant?: TagVariant
}

const VARIANT_CLASSES: Record<TagVariant, string> = {
  default: 'bg-bg-section text-text-secondary border border-border-col',
  accent: 'bg-accent text-white border border-accent',
  muted: 'bg-bg-section text-text-muted border border-border-col',
}

export default function Tag({ children, className = '', variant = 'default' }: TagProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 text-[11px] font-body uppercase tracking-wide font-medium ${VARIANT_CLASSES[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
