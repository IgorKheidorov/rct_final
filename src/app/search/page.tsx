'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import SectionLabel from '@/components/ui/SectionLabel'

interface SearchResult {
  url: string
  meta?: { title?: string }
  excerpt?: string
}

function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  useEffect(() => {
    if (!query) return

    const run = async () => {
      setLoading(true)
      try {
        // eslint-disable-next-line no-new-func
        const pagefind = await (new Function('return import("/pagefind/pagefind.js")')() as Promise<Record<string, (...args: unknown[]) => unknown>>)
        await (pagefind.init as () => Promise<void>)()
        const res = await (pagefind.search as (q: string) => Promise<{ results: Array<{ data: () => Promise<SearchResult> }> }>)(query)
        const data = await Promise.all(res.results.slice(0, 20).map(r => r.data()))
        setResults(data)
      } catch {
        setResults([])
      } finally {
        setLoading(false)
        setSearched(true)
      }
    }
    run()
  }, [query])

  if (!query) {
    return (
      <p className="text-text-secondary text-center py-20">
        Введите запрос в строке поиска (Ctrl+K) для поиска по сайту.
      </p>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (searched && results.length === 0) {
    return (
      <p className="text-text-secondary text-center py-20">
        Ничего не найдено по запросу &laquo;{query}&raquo;
      </p>
    )
  }

  return (
    <div className="space-y-[2px]">
      <p className="text-text-muted text-sm mb-6">{results.length} результатов по запросу «{query}»</p>
      {results.map((result, i) => (
        <Link
          key={i}
          href={result.url}
          className="block p-6 bg-bg-section border border-border-col hover:border-accent/50 transition-colors group"
        >
          <p className="text-[11px] font-body uppercase tracking-label text-text-muted mb-1">
            {result.url}
          </p>
          <h3 className="font-display text-lg text-text-primary group-hover:text-accent transition-colors">
            {result.meta?.title || result.url}
          </h3>
          {result.excerpt && (
            <p
              className="text-text-secondary text-sm mt-2 line-clamp-2"
              dangerouslySetInnerHTML={{ __html: result.excerpt }}
            />
          )}
        </Link>
      ))}
    </div>
  )
}

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-bg-primary px-6 md:px-20 py-16" data-pagefind-body>
      <SectionLabel className="mb-4">// ПОИСК ПО САЙТУ</SectionLabel>
      <h1 className="font-display text-3xl md:text-4xl text-text-primary mb-2">
        Поиск по сайту
      </h1>
      <p className="text-text-muted text-sm mb-10">
        Используйте Ctrl+K для быстрого поиска с любой страницы.
      </p>
      <Suspense
        fallback={
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          </div>
        }
      >
        <SearchResults />
      </Suspense>
    </div>
  )
}
