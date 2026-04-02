import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getAllNews } from '@/lib/utils'
import { formatDate } from '@/lib/utils'
import PageHero from '@/components/layout/PageHero'
import PageHub from '@/components/layout/PageHub'
import SectionLabel from '@/components/ui/SectionLabel'
import Tag from '@/components/ui/Tag'

export const metadata: Metadata = {
  title: 'Новости — ФРКТ БГУ',
  description: 'Новости и события факультета радиофизики и компьютерных технологий БГУ.',
}

const TAG_LABELS: Record<string, string> = {
  enrollee: 'Абитуриентам',
  media: 'Медиа',
  students: 'Студентам',
  events: 'События',
  science: 'Наука',
}

const ALL_TAGS = ['enrollee', 'media', 'students', 'events', 'science']

const NEWS_HUB = [
  {
    id: 'news-filters',
    title: 'Фильтр по тегам',
    description: 'Быстрый переход к новостям абитуриентам, студентам, науке и событиям.',
  },
  {
    id: 'news-list',
    title: 'Лента новостей',
    description: 'Все публикации с датами и кратким описанием.',
  },
] as const

export default function NewsPage() {
  const allNews = getAllNews()

  return (
    <div className="min-h-screen bg-bg-primary" data-pagefind-body>
      <PageHero
        eyebrow="Новости и события"
        title="Новости ФРКТ"
        subtitle="Последние события, достижения студентов и научные новости факультета."
        coverImage={{
          src: '/images/specialty_digital_tech.jpg',
          alt: 'Новости и события факультета',
          priority: true,
        }}
      />

      <PageHub items={NEWS_HUB} />

      <section
        id="news-filters"
        className="border-b border-border-col px-6 md:px-20 py-4 bg-bg-section"
      >
        <div className="flex flex-wrap gap-2">
          <span className="text-[11px] font-body uppercase tracking-label text-text-muted self-center mr-2">
            Фильтр:
          </span>
          {ALL_TAGS.map(tag => (
            <Link
              key={tag}
              href={`/news?tag=${tag}`}
              className="px-3 py-1 text-[11px] font-body uppercase tracking-label border border-border-col text-text-secondary hover:border-accent hover:text-accent transition-colors"
            >
              {TAG_LABELS[tag]}
            </Link>
          ))}
        </div>
      </section>

      <section id="news-list" className="px-6 md:px-20 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2px]">
          {allNews.map((item) => (
            <article
              key={item.slug}
              className="bg-bg-section border border-border-col hover:border-accent/50 transition-colors group"
            >
              {item.image && (
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-bg-section border-b border-border-col">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain object-center"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  {item.tags.slice(0, 2).map(tag => (
                    <Tag key={tag} variant="muted">
                      {TAG_LABELS[tag] || tag}
                    </Tag>
                  ))}
                  <span className="text-[11px] text-text-muted ml-auto">
                    {formatDate(item.date)}
                  </span>
                </div>
                <h2 className="font-display text-lg text-text-primary leading-tight mb-2 group-hover:text-accent transition-colors">
                  <Link href={`/news/${item.slug}`}>{item.title}</Link>
                </h2>
                <p className="text-text-secondary text-sm line-clamp-3 leading-relaxed">
                  {item.excerpt}
                </p>
                <Link
                  href={`/news/${item.slug}`}
                  className="inline-block mt-4 text-[11px] font-body uppercase tracking-label text-accent hover:underline"
                >
                  Читать →
                </Link>
              </div>
            </article>
          ))}
        </div>

        {allNews.length === 0 && (
          <p className="text-text-secondary text-center py-20">Нет опубликованных новостей.</p>
        )}
      </section>
    </div>
  )
}
