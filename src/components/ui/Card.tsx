import type { ReactNode } from 'react'
import Link from 'next/link'

interface CardProps {
  children: ReactNode
  className?: string
  accent?: boolean
  href?: string
}

export default function Card({ children, className = '', accent = false, href }: CardProps) {
  const base =
    'block bg-bg-section border border-border-col transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent'
  const accentClass = accent ? 'border-l-2 border-l-accent' : ''
  const hoverClass = href ? 'hover:border-accent hover:bg-bg-primary cursor-pointer' : ''

  const classes = [base, accentClass, hoverClass, className].filter(Boolean).join(' ')

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return <div className={classes}>{children}</div>
}
