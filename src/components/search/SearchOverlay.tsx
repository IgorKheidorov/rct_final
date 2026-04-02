'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X } from 'lucide-react'

import { useSearchContext } from './SearchContext'

interface PagefindResultData {
  url: string
  meta: { title?: string }
  excerpt: string
}

interface PagefindResult {
  data: () => Promise<PagefindResultData>
}

interface PagefindModule {
  init?: () => Promise<void>
  search: (query: string) => Promise<{ results: PagefindResult[] }>
}

export default function SearchOverlay() {
  const { isOpen, setIsOpen } = useSearchContext()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<PagefindResultData[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const inputRef = useRef<HTMLInputElement>(null)
  const pagefindRef = useRef<PagefindModule | null>(null)
  const router = useRouter()

  const onClose = useCallback(() => {
    setIsOpen(false)
    setQuery('')
    setResults([])
    setSelectedIndex(0)
  }, [setIsOpen])

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((i) => Math.min(i + 1, results.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((i) => Math.max(i - 1, 0))
      } else if (e.key === 'Enter') {
        const selected = results[selectedIndex]
        if (selected) {
          router.push(selected.url)
          onClose()
        }
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, results, selectedIndex, onClose, router])

  const runSearch = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([])
      return
    }
    setLoading(true)
    try {
      if (!pagefindRef.current) {
        // pagefind is injected at build time; use new Function to avoid
        // TypeScript static module resolution for this runtime-only path.
        const pf = (await new Function(
          'return import("/pagefind/pagefind.js")'
        )()) as PagefindModule
        if (typeof pf.init === 'function') {
          await pf.init()
        }
        pagefindRef.current = pf
      }
      const res = await pagefindRef.current.search(q)
      const data = await Promise.all(
        res.results.slice(0, 8).map((r: PagefindResult) => r.data())
      )
      setResults(data)
      setSelectedIndex(0)
    } catch {
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => runSearch(query), 300)
    return () => clearTimeout(timer)
  }, [query, runSearch])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-start justify-center pt-[10vh] px-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Поиск по сайту"
    >
      <div
        className="w-full max-w-[640px] bg-bg-primary border border-border-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input row */}
        <div className="flex items-center border-b border-border-col px-4 gap-3">
          <Search className="text-text-secondary shrink-0" size={16} aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск по сайту..."
            className="flex-1 bg-transparent text-text-primary placeholder:text-text-muted text-sm h-14 outline-none font-body"
            aria-label="Поисковый запрос"
            autoComplete="off"
          />
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text-primary transition-colors p-1"
            aria-label="Закрыть поиск"
          >
            <X size={16} />
          </button>
        </div>

        {/* Results area */}
        <div className="max-h-[60vh] overflow-y-auto" role="listbox" aria-label="Результаты поиска">
          {/* Empty state */}
          {!query.trim() && !loading && (
            <p className="text-text-muted text-sm px-4 py-10 text-center font-body">
              Начните вводить запрос...
            </p>
          )}

          {/* Loading */}
          {loading && (
            <div className="flex justify-center items-center py-10" aria-live="polite">
              <div
                className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin"
                aria-label="Загрузка..."
              />
            </div>
          )}

          {/* No results */}
          {!loading && query.trim() && results.length === 0 && (
            <p className="text-text-muted text-sm px-4 py-10 text-center font-body" aria-live="polite">
              Ничего не найдено
            </p>
          )}

          {/* Results list */}
          {!loading &&
            results.map((result, i) => (
              <button
                key={result.url}
                role="option"
                aria-selected={i === selectedIndex}
                onClick={() => {
                  router.push(result.url)
                  onClose()
                }}
                className={`w-full text-left px-4 py-3.5 border-b border-border-col transition-colors focus:outline-none ${
                  i === selectedIndex
                    ? 'bg-bg-section'
                    : 'hover:bg-bg-section'
                }`}
              >
                <p className="text-text-primary text-sm font-medium font-body truncate">
                  {result.meta?.title ?? result.url}
                </p>
                <p
                  className="text-text-secondary text-xs mt-1 line-clamp-2 font-body"
                  dangerouslySetInnerHTML={{ __html: result.excerpt }}
                />
              </button>
            ))}
        </div>

        {/* Footer hint */}
        <div className="flex items-center gap-4 px-4 py-2 border-t border-border-col">
          <span className="text-text-muted text-[11px] font-body">
            <kbd className="font-body">↑↓</kbd> навигация
          </span>
          <span className="text-text-muted text-[11px] font-body">
            <kbd className="font-body">Enter</kbd> перейти
          </span>
          <span className="text-text-muted text-[11px] font-body">
            <kbd className="font-body">Esc</kbd> закрыть
          </span>
        </div>
      </div>
    </div>
  )
}
