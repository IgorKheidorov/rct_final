import type { Metadata } from 'next'
import { getAllNews } from '@/lib/utils'
import PageHero from '@/components/layout/PageHero'
import PageHub from '@/components/layout/PageHub'
import NewsFilters from '@/components/news/NewsFilters'

export const metadata: Metadata = {
  title: 'Новости — ФРКТ БГУ',
  description: 'Новости и события факультета радиофизики и компьютерных технологий БГУ.',
}

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

      <section id="news-filters" className="px-6 md:px-20 py-16">
        <NewsFilters items={allNews} />
      </section>
    </div>
  )
}
