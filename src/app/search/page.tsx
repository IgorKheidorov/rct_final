import type { Metadata } from 'next'

import PageHero from '@/components/layout/PageHero'
import SearchResultsClient from './SearchResultsClient'

export const metadata: Metadata = {
  title: 'Поиск — ФРКТ БГУ',
  description: 'Поиск по сайту факультета радиофизики и компьютерных технологий БГУ.',
}

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-bg-primary" data-pagefind-body>
      <PageHero
        eyebrow="Поиск по сайту"
        title="Поиск"
        subtitle="Используйте Ctrl+K для быстрого поиска с любой страницы."
        coverImage={{
          src: '/images/specialty_intelligent_systems.jpg',
          alt: 'Поиск по материалам сайта факультета',
          priority: true,
        }}
      />
      <div className="px-6 md:px-20 py-16 border-t border-border-col">
        <SearchResultsClient />
      </div>
    </div>
  )
}
