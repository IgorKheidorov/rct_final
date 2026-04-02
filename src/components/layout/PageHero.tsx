import Image from 'next/image'
import type { ReactNode } from 'react'

export type PageHeroCoverImage = {
  src: string
  alt: string
  priority?: boolean
}

export interface PageHeroProps {
  /** Короткий лейбл над заголовком */
  eyebrow: string
  title: string
  subtitle?: string
  /** Полноширинный фон с градиентом для читаемости текста */
  coverImage?: PageHeroCoverImage
  /** Правая колонка на больших экранах (например факты без дублирования фото фона) */
  aside?: ReactNode
  /** Подпись для скринридеров к блоку `aside` */
  asideLabel?: string
  children?: ReactNode
  className?: string
}

/**
 * Единый герой раздела: градиент или фоновое фото, section-label, заголовок.
 * С `aside` — двухколоночная сетка от `lg`.
 */
export default function PageHero({
  eyebrow,
  title,
  subtitle,
  coverImage,
  aside,
  asideLabel = 'Дополнительная информация',
  children,
  className = '',
}: PageHeroProps) {
  const headline = (
    <>
      <p className="section-label mb-6 leading-none">{eyebrow}</p>
      <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-heading leading-[1.05] tracking-tight mb-4 max-w-3xl">
        {title}
      </h1>
      {subtitle ? (
        <p className="font-body text-base text-text-secondary leading-relaxed max-w-xl">{subtitle}</p>
      ) : null}
      {children}
    </>
  )

  const sectionBg = coverImage
    ? 'bg-bg-primary min-h-[260px] md:min-h-[300px]'
    : 'bg-gradient-to-b from-slate-50 to-bg-primary'

  return (
    <section
      className={`relative isolate overflow-hidden ${sectionBg} pt-32 pb-12 px-6 sm:px-10 lg:px-20 border-b border-border-col ${className}`}
    >
      {coverImage ? (
        <>
          <Image
            src={coverImage.src}
            alt={coverImage.alt}
            fill
            priority={coverImage.priority}
            className="z-0 object-cover object-center"
            sizes="100vw"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-bg-primary/95 via-bg-primary/85 to-bg-primary/40"
          />
        </>
      ) : null}

      <div className="relative z-10">
        {aside ? (
          <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:items-end lg:gap-10">
            <div className="min-w-0 lg:col-span-7 xl:col-span-8">{headline}</div>
            <aside aria-label={asideLabel} className="mt-10 min-w-0 lg:col-span-5 xl:col-span-4 lg:mt-0">
              {aside}
            </aside>
          </div>
        ) : (
          headline
        )}
      </div>
    </section>
  )
}
