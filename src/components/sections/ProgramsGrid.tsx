import Image from 'next/image'
import Link from 'next/link'

import type { ProgramItem } from '@/lib/types'

export interface ProgramsGridProps {
  eyebrow: string
  heading: string
  cta: { label: string; href: string }
  items: ProgramItem[]
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
        'group relative flex flex-col justify-between overflow-hidden min-h-[320px] p-8',
        'transition-all duration-300',
        isAccent ? 'bg-accent' : 'bg-bg-primary hover:bg-bg-section',
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
            isAccent ? 'opacity-20 mix-blend-luminosity' : 'opacity-10 group-hover:opacity-15',
          ].join(' ')}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-4 h-full">
        {/* Top meta */}
        <div className="flex items-start justify-between gap-4">
          <span className="font-body text-[11px] uppercase tracking-label text-text-secondary">
            {item.code}
          </span>
          {item.english && (
            <span className="font-body text-[10px] uppercase tracking-label px-2 py-0.5 border border-text-secondary text-text-secondary">
              EN
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          className={[
            'font-display text-xl md:text-2xl leading-tight flex-1',
            isAccent ? 'text-white' : 'text-text-primary',
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

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-2 border-t border-white/10">
            {item.tracks !== undefined && item.tracks > 0 && (
              <span
                className={[
                  'font-body text-xs uppercase tracking-label',
                  isAccent ? 'text-white/80' : 'text-text-secondary',
                ].join(' ')}
              >
                {item.tracks} {item.tracks === 1 ? 'трек' : 'треков'}
              </span>
            )}
            <span
              className={[
                'font-body text-xs uppercase tracking-label',
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

export function ProgramsGrid({ eyebrow, heading, cta, items }: ProgramsGridProps) {
  return (
    <section className="bg-bg-primary py-20 px-6 sm:px-10 lg:px-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-8">
        <div className="flex flex-col gap-3">
          <p className="font-body text-[11px] text-accent uppercase tracking-label leading-none">
            {eyebrow}
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-text-primary leading-tight">
            {heading}
          </h2>
        </div>
        <Link
          href={cta.href}
          className="flex-shrink-0 inline-block border border-border-col text-text-secondary font-body text-sm uppercase tracking-label px-6 py-3 hover:border-accent hover:text-accent transition-colors duration-200"
        >
          {cta.label} →
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[2px]">
        {items.map((item) => (
          <ProgramCard key={item.href} item={item} />
        ))}
      </div>
    </section>
  )
}

export default ProgramsGrid
