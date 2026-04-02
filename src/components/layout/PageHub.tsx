import type { ReactNode } from 'react'

export type PageHubItem = {
  id: string
  title: string
  description: string
  /** По умолчанию якорь `#id` на текущей странице */
  href?: string
}

export interface PageHubProps {
  items: readonly PageHubItem[]
  /** Для доступности блока навигации */
  'aria-label'?: string
  children?: ReactNode
}

const cardClass =
  'group flex flex-col rounded-card border border-border-col bg-white p-6 shadow-sm transition-all hover:border-accent/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2'

/**
 * Сетка карточек-якорей (как на /education).
 */
export default function PageHub({ items, 'aria-label': ariaLabel = 'Разделы страницы', children }: PageHubProps) {
  return (
    <section
      className="bg-bg-section py-12 px-6 sm:px-10 lg:px-20 border-b border-border-col"
      aria-label={ariaLabel}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((item) => {
          const href = item.href ?? `#${item.id}`
          return (
            <a key={item.id} href={href} className={cardClass}>
              <h2 className="font-display font-semibold text-lg text-heading mb-2">{item.title}</h2>
              <p className="font-body text-sm text-text-secondary leading-relaxed mb-4 flex-1">
                {item.description}
              </p>
              <span className="font-body text-sm font-medium text-accent">Перейти →</span>
            </a>
          )
        })}
      </div>
      {children}
    </section>
  )
}
