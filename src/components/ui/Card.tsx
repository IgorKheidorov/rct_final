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
    'block rounded-card bg-white border border-border-col shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2'
  const accentClass = accent ? 'border-l-[3px] border-l-accent' : ''
  const hoverClass = href ? 'hover:border-accent hover:shadow-md cursor-pointer' : ''

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
