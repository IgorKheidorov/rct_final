'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Search, Menu, X } from 'lucide-react'

import { useSearchContext } from '@/components/search/SearchContext'

const NAV_LINKS = [
  { label: 'Факультет', href: '/faculty' },
  { label: 'Программы', href: '/programs' },
  { label: 'Абитуриентам', href: '/admissions' },
  { label: 'Обучение', href: '/education' },
  { label: 'Наука', href: '/science' },
  { label: 'Новости', href: '/news' },
  { label: 'Контакты', href: '/contacts' },
]

export default function Header() {
  const { setIsOpen: setSearchOpen } = useSearchContext()
  const [mobileOpen, setMobileOpen] = useState(false)
  const drawerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [setSearchOpen])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 h-[72px] bg-bg-primary border-b border-border-col shadow-sm">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 h-full flex items-center gap-8">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 shrink-0 group rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            <span className="w-2 h-8 bg-accent" aria-hidden="true" />
            <span className="font-display font-semibold text-text-primary text-xl leading-none tracking-tight group-hover:text-accent transition-colors">
              ФРКТ
              <span className="font-body font-medium text-text-secondary text-xs ml-1.5 tracking-normal">
                БГУ
              </span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 flex-1" aria-label="Основная навигация">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-text-secondary text-sm font-body hover:text-accent rounded-card transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right controls */}
          <div className="hidden lg:flex items-center gap-3 ml-auto">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 border border-border-col rounded-card text-text-secondary hover:text-accent hover:border-accent transition-colors text-xs font-body focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              aria-label="Открыть поиск"
            >
              <Search size={14} />
              <span>Ctrl+K</span>
            </button>
            <Link
              href="/admissions"
              className="flex items-center px-4 py-2 bg-accent text-white font-display text-sm font-semibold hover:bg-accent/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              Поступить →
            </Link>
          </div>

          {/* Mobile controls */}
          <div className="flex lg:hidden items-center gap-3 ml-auto">
            <button
              onClick={() => setSearchOpen(true)}
              className="text-text-secondary hover:text-text-primary transition-colors p-1"
              aria-label="Открыть поиск"
            >
              <Search size={20} />
            </button>
            <button
              onClick={() => setMobileOpen(true)}
              className="text-text-secondary hover:text-text-primary transition-colors p-1"
              aria-label="Открыть меню"
              aria-expanded={mobileOpen}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile drawer */}
      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 h-full w-72 z-50 bg-bg-primary border-l border-border-col transform transition-transform duration-300 lg:hidden ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-modal="true"
        role="dialog"
        aria-label="Мобильное меню"
      >
        <div className="flex items-center justify-between px-5 h-[72px] border-b border-border-col">
          <span className="font-display font-semibold text-text-primary text-lg">Меню</span>
          <button
            onClick={() => setMobileOpen(false)}
            className="text-text-secondary hover:text-text-primary transition-colors"
            aria-label="Закрыть меню"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex flex-col py-4" aria-label="Мобильная навигация">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="px-5 py-3.5 text-text-secondary text-sm font-body hover:text-text-primary hover:bg-bg-section transition-colors border-b border-border-col"
            >
              {link.label}
            </Link>
          ))}
          <div className="px-5 pt-5">
            <Link
              href="/admissions"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center px-4 py-3 bg-accent text-white font-display text-sm font-semibold hover:bg-accent/90 transition-colors w-full"
            >
              Поступить →
            </Link>
          </div>
        </nav>
      </div>

      {/* Spacer to offset fixed header */}
      <div className="h-[72px]" aria-hidden="true" />
    </>
  )
}
