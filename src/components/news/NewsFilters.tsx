'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import type { NewsItem } from '@/lib/types'

const TAGS = ['Все', 'enrollee', 'media', 'students', 'events', 'science']

const TAG_LABELS: Record<string, string> = {
  Все: 'Все',
  enrollee: 'Абитуриентам',
  media: 'Медиа',
  students: 'Студентам',
  events: 'События',
  science: 'Наука',
}

const ITEMS_PER_PAGE = 12

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
}

interface NewsFiltersProps {
  items: NewsItem[]
}

export default function NewsFilters({ items }: NewsFiltersProps) {
  const [activeTag, setActiveTag] = useState('Все')
  const [page, setPage] = useState(1)

  const filtered = activeTag === 'Все' ? items : items.filter((n) => n.tags.includes(activeTag))

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  const handleTag = useCallback(
    (tag: string) => {
      setActiveTag(tag)
      setPage(1)
    },
    [],
  )

  return (
    <div>
      {/* Tag filters */}
      <div className="flex flex-wrap gap-2 mb-10">
        {TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => handleTag(tag)}
            className={[
              'font-body text-xs uppercase tracking-label px-4 py-2 border transition-colors duration-200',
              activeTag === tag
                ? 'bg-accent text-white border-accent'
                : 'border-border-col text-text-secondary hover:border-accent hover:text-accent',
            ].join(' ')}
          >
            {TAG_LABELS[tag] ?? tag}
          </button>
        ))}
      </div>

      {/* Count */}
      <p className="font-body text-xs text-text-muted uppercase tracking-label mb-6">
        {filtered.length} материалов
      </p>

      {/* News grid */}
      {paginated.length > 0 ? (
        <div className="flex flex-col gap-[2px]">
          {paginated.map((item) => (
            <Link
              key={item.slug}
              href={`/news/${item.slug}`}
              className="group flex flex-col sm:flex-row gap-6 bg-bg-section p-6 hover:bg-bg-primary transition-colors duration-200 border border-transparent hover:border-border-col"
            >
              {item.image && (
                <div className="relative w-full sm:w-36 h-36 flex-shrink-0 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 144px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="flex flex-col gap-3 min-w-0">
                {item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {item.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="font-body text-[10px] uppercase tracking-label px-2 py-0.5 bg-accent/10 text-accent"
                      >
                        {TAG_LABELS[tag] ?? tag}
                      </span>
                    ))}
                  </div>
                )}
                <h2 className="font-display text-lg text-text-primary leading-tight group-hover:text-accent transition-colors duration-200 line-clamp-2">
                  {item.title}
                </h2>
                {item.excerpt && (
                  <p className="font-body text-sm text-text-secondary leading-[1.6] line-clamp-2">
                    {item.excerpt}
                  </p>
                )}
                <p className="font-body text-[11px] uppercase tracking-label text-text-muted mt-auto">
                  {formatDate(item.date)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="font-body text-text-muted text-sm">Нет новостей по выбранному тегу.</p>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center gap-2 mt-10">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="font-body text-sm text-text-secondary border border-border-col px-4 py-2 hover:border-accent hover:text-accent transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            ←
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={[
                'font-body text-sm px-4 py-2 border transition-colors duration-200',
                p === page
                  ? 'bg-accent text-white border-accent'
                  : 'text-text-secondary border-border-col hover:border-accent hover:text-accent',
              ].join(' ')}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="font-body text-sm text-text-secondary border border-border-col px-4 py-2 hover:border-accent hover:text-accent transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            →
          </button>
        </div>
      )}
    </div>
  )
}
