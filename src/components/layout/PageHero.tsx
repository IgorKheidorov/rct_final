import type { ReactNode } from 'react'

export interface PageHeroProps {
  /** Короткий лейбл над заголовком */
  eyebrow: string
  title: string
  subtitle?: string
  children?: ReactNode
  className?: string
}

/**
 * Единый герой раздела (как на /education): градиент, section-label, крупный заголовок.
 */
export default function PageHero({ eyebrow, title, subtitle, children, className = '' }: PageHeroProps) {
  return (
    <section
      className={`bg-gradient-to-b from-slate-50 to-bg-primary pt-32 pb-12 px-6 sm:px-10 lg:px-20 border-b border-border-col ${className}`}
    >
      <p className="section-label mb-6 leading-none">{eyebrow}</p>
      <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-heading leading-[1.05] tracking-tight mb-4 max-w-3xl">
        {title}
      </h1>
      {subtitle ? (
        <p className="font-body text-base text-text-secondary leading-relaxed max-w-xl">{subtitle}</p>
      ) : null}
      {children}
    </section>
  )
}
