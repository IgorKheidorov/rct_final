import Image from 'next/image'
import Link from 'next/link'

import type { NewsItem } from '@/lib/types'

export interface NewsPreviewProps {
  eyebrow: string
  heading: string
  cta: { label: string; href: string }
  items: NewsItem[]
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
}

interface FeaturedCardProps {
  item: NewsItem
}

function FeaturedCard({ item }: FeaturedCardProps) {
  return (
    <Link
      href={`/news/${item.slug}`}
      className="group relative flex flex-col justify-end overflow-hidden min-h-[420px] md:min-h-full rounded-card border border-border-col shadow-sm hover:shadow-md transition-shadow"
    >
      {item.image ? (
        <>
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/50 to-transparent" />
        </>
      ) : (
        <div className="absolute inset-0 bg-slate-200" />
      )}

      <div className="relative z-10 p-8 flex flex-col gap-4">
        {item.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {item.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="font-body text-[10px] uppercase tracking-label px-2 py-1 bg-white/15 text-white border border-white/25 rounded-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <h3 className="font-display font-semibold text-2xl md:text-3xl text-white leading-tight">
          {item.title}
        </h3>
        <p className="font-body text-sm text-white/85 leading-[1.6] line-clamp-3">
          {item.excerpt}
        </p>
        <p className="font-body text-[11px] uppercase tracking-label text-white/70">
          {formatDate(item.date)}
        </p>
      </div>
    </Link>
  )
}

interface SmallCardProps {
  item: NewsItem
}

function SmallCard({ item }: SmallCardProps) {
  return (
    <Link
      href={`/news/${item.slug}`}
      className="group flex gap-4 bg-white p-5 rounded-card border border-border-col shadow-sm hover:border-accent/50 hover:shadow-md transition-all duration-200"
    >
      {item.image && (
        <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-card">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="80px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex flex-col gap-2 min-w-0">
        {item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {item.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="font-body text-[10px] uppercase tracking-label px-1.5 py-0.5 bg-accent/10 text-accent rounded-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <p className="font-display font-medium text-sm text-heading leading-snug line-clamp-2 group-hover:text-accent transition-colors duration-200">
          {item.title}
        </p>
        <p className="font-body text-[11px] uppercase tracking-label text-text-muted mt-auto">
          {formatDate(item.date)}
        </p>
      </div>
    </Link>
  )
}

export function NewsPreview({ eyebrow, heading, cta, items }: NewsPreviewProps) {
  const [featured, ...rest] = items
  const sideItems = rest.slice(0, 3)

  return (
    <section className="bg-bg-primary py-20 px-6 sm:px-10 lg:px-20 border-t border-border-col">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
        <div className="flex flex-col gap-3">
          <p className="section-label leading-none">{eyebrow}</p>
          <h2 className="font-display font-semibold text-3xl md:text-4xl text-heading leading-tight">
            {heading}
          </h2>
        </div>
        <Link
          href={cta.href}
          className="flex-shrink-0 inline-flex items-center rounded-card border border-border-col bg-white text-text-secondary font-body text-sm font-medium px-6 py-3 hover:border-accent hover:text-accent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          {cta.label} →
        </Link>
      </div>

      {featured ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          <FeaturedCard item={featured} />
          <div className="flex flex-col gap-4">
            {sideItems.map((item) => (
              <SmallCard key={item.slug} item={item} />
            ))}
          </div>
        </div>
      ) : (
        <p className="font-body text-text-muted text-sm">Нет новостей для отображения.</p>
      )}
    </section>
  )
}

export default NewsPreview
