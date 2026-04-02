import Image from 'next/image'
import Link from 'next/link'

import type { ProgramItem } from '@/lib/types'

export interface ProgramsGridProps {
  eyebrow: string
  heading: string
  cta: { label: string; href: string }
  items: ProgramItem[]
  /** Якорь для навигации с главной страницы «Программы» */
  sectionId?: string
}

interface ProgramCardProps {
  item: ProgramItem
}

function ProgramCard({ item }: ProgramCardProps) {
  const isAccent = item.accent === true

  return (
    <Link
      href={item.href}
      className={[
        'group relative flex flex-col justify-between overflow-hidden min-h-[300px] p-8 rounded-card border border-border-col',
        'transition-all duration-300 shadow-sm hover:shadow-md',
        isAccent ? 'bg-accent border-accent' : 'bg-white hover:border-accent/40',
      ].join(' ')}
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className={[
            'object-cover transition-transform duration-500 group-hover:scale-105',
            isAccent ? 'opacity-25 mix-blend-luminosity' : 'opacity-[0.08] group-hover:opacity-[0.12]',
          ].join(' ')}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-4 h-full">
        {/* Top meta */}
        <div className="flex items-start justify-between gap-4">
          <span className="font-body text-[11px] font-medium tracking-wide text-text-secondary">
            {item.code}
          </span>
          {item.english && (
            <span className="font-body text-[10px] font-medium tracking-wide px-2 py-0.5 border border-text-secondary text-text-secondary rounded-sm">
              EN
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          className={[
            'font-display font-semibold text-xl md:text-2xl leading-tight flex-1',
            isAccent ? 'text-white' : 'text-heading',
          ].join(' ')}
        >
          {item.title}
        </h3>

        {/* Bottom meta */}
        <div className="flex flex-col gap-2 mt-auto">
          {item.qualification && (
            <p
              className={[
                'font-body text-xs',
                isAccent ? 'text-white/70' : 'text-text-muted',
              ].join(' ')}
            >
              {item.qualification}
            </p>
          )}

          <div
            className={[
              'flex flex-wrap items-center gap-x-4 gap-y-1 pt-2 border-t',
              isAccent ? 'border-white/20' : 'border-border-col',
            ].join(' ')}
          >
            {item.tracks !== undefined && item.tracks > 0 && (
              <span
                className={[
                  'font-body text-xs font-medium tracking-wide',
                  isAccent ? 'text-white/80' : 'text-text-secondary',
                ].join(' ')}
              >
                {item.tracks} {item.tracks === 1 ? 'трек' : 'треков'}
              </span>
            )}
            <span
              className={[
                'font-body text-xs font-medium tracking-wide',
                isAccent ? 'text-white/80' : 'text-text-secondary',
              ].join(' ')}
            >
              {item.budget} бюдж.
            </span>
          </div>
        </div>
      </div>

      {/* Hover arrow */}
      <span
        aria-hidden="true"
        className={[
          'absolute top-6 right-6 text-lg transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0',
          isAccent ? 'text-white' : 'text-accent',
        ].join(' ')}
      >
        →
      </span>
    </Link>
  )
}

export function ProgramsGrid({ eyebrow, heading, cta, items, sectionId }: ProgramsGridProps) {
  return (
    <section id={sectionId} className="bg-bg-primary py-20 px-6 sm:px-10 lg:px-20 border-b border-border-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-8">
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

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
        {items.map((item) => (
          <ProgramCard key={item.href} item={item} />
        ))}
      </div>
    </section>
  )
}

export default ProgramsGrid
