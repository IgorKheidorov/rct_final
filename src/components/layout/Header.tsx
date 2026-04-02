'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Search, Menu, X, ChevronDown } from 'lucide-react'

import { useSearchContext } from '@/components/search/SearchContext'

type NavChild = { label: string; href: string }
type NavLink = { label: string; href: string; children?: NavChild[] }

const NAV_LINKS: NavLink[] = [
  {
    label: 'Факультет',
    href: '/faculty',
    children: [
      { label: 'Кафедры', href: '/faculty/departments' },
      { label: 'Персонал', href: '/faculty/staff' },
      { label: 'Учёный совет', href: '/faculty/council' },
      { label: 'Администрация', href: '/faculty/administration' },
      { label: 'Проф-ком РКТ', href: '/faculty/prof-rct' },
    ],
  },
  {
    label: 'Программы',
    href: '/programs',
    children: [
      { label: 'Бакалавриат', href: '/programs/bachelor' },
      { label: 'Магистратура', href: '/programs/master' },
    ],
  },
  { label: 'Абитуриентам', href: '/admissions' },
  { label: 'Обучение', href: '/education' },
  {
    label: 'Наука',
    href: '/science',
    children: [
      { label: 'Лаборатории', href: '/science/labs' },
      { label: 'Конференции', href: '/science/conferences' },
      { label: 'Школы РКТ', href: '/science/schools' },
    ],
  },
  { label: 'Новости', href: '/news' },
  { label: 'Контакты', href: '/contacts' },
]

const OFFSET = 'focus-visible:ring-offset-[#0f172a]'

export default function Header() {
  const { setIsOpen: setSearchOpen } = useSearchContext()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const drawerRef = useRef<HTMLDivElement>(null)

  const openDropdown = (href: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpenMenu(href)
  }

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 120)
  }

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
      if (e.key === 'Escape') setOpenMenu(null)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [setSearchOpen])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 h-[72px] bg-[#0f172a] border-b border-white/10 shadow-lg">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 h-full flex items-center gap-8">

          {/* Logo */}
          <Link
            href="/"
            className={`flex items-center gap-3 shrink-0 group rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${OFFSET}`}
          >
            <span className="w-2 h-8 bg-accent" aria-hidden="true" />
            <span className="font-display font-semibold text-white text-xl leading-none tracking-tight group-hover:text-accent transition-colors">
              ФРКТ
              <span className="font-body font-medium text-white/50 text-xs ml-1.5 tracking-normal">
                БГУ
              </span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 flex-1" aria-label="Основная навигация">
            {NAV_LINKS.map((link) =>
              link.children ? (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => openDropdown(link.href)}
                  onMouseLeave={scheduleClose}
                >
                  <Link
                    href={link.href}
                    className={`flex items-center gap-1 px-3 py-2 text-white/70 text-sm font-body hover:text-white rounded-card transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${OFFSET}`}
                    aria-haspopup="true"
                    aria-expanded={openMenu === link.href}
                  >
                    {link.label}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${openMenu === link.href ? 'rotate-180' : ''}`}
                    />
                  </Link>

                  {openMenu === link.href && (
                    <div
                      className="absolute top-full left-0 mt-1 min-w-[180px] bg-[#1e293b] border border-white/10 rounded-card shadow-xl py-1 z-50"
                      onMouseEnter={() => openDropdown(link.href)}
                      onMouseLeave={scheduleClose}
                      role="menu"
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          role="menuitem"
                          onClick={() => setOpenMenu(null)}
                          className="block px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors font-body"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 text-white/70 text-sm font-body hover:text-white rounded-card transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${OFFSET}`}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Right controls */}
          <div className="hidden lg:flex items-center gap-3 ml-auto">
            <button
              onClick={() => setSearchOpen(true)}
              className={`flex items-center gap-2 px-3 py-1.5 border border-white/20 rounded-card text-white/60 hover:text-white hover:border-white/40 transition-colors text-xs font-body focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${OFFSET}`}
              aria-label="Открыть поиск"
            >
              <Search size={14} />
              <span>Ctrl+K</span>
            </button>
            <Link
              href="/admissions"
              className={`flex items-center px-4 py-2 bg-accent text-white font-display text-sm font-semibold hover:bg-accent/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${OFFSET}`}
            >
              Поступить →
            </Link>
          </div>

          {/* Mobile controls */}
          <div className="flex lg:hidden items-center gap-3 ml-auto">
            <button
              onClick={() => setSearchOpen(true)}
              className="text-white/60 hover:text-white transition-colors p-1"
              aria-label="Открыть поиск"
            >
              <Search size={20} />
            </button>
            <button
              onClick={() => setMobileOpen(true)}
              className="text-white/60 hover:text-white transition-colors p-1"
              aria-label="Открыть меню"
              aria-expanded={mobileOpen}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile backdrop */}
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
        className={`fixed top-0 right-0 h-full w-72 z-50 bg-[#0f172a] border-l border-white/10 transform transition-transform duration-300 lg:hidden ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-modal="true"
        role="dialog"
        aria-label="Мобильное меню"
      >
        <div className="flex items-center justify-between px-5 h-[72px] border-b border-white/10">
          <span className="font-display font-semibold text-white text-lg">Меню</span>
          <button
            onClick={() => setMobileOpen(false)}
            className="text-white/60 hover:text-white transition-colors"
            aria-label="Закрыть меню"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex flex-col py-4 overflow-y-auto" aria-label="Мобильная навигация">
          {NAV_LINKS.map((link) =>
            link.children ? (
              <div key={link.href}>
                <button
                  onClick={() =>
                    setMobileExpanded(mobileExpanded === link.href ? null : link.href)
                  }
                  className="w-full flex items-center justify-between px-5 py-3.5 text-white/70 text-sm font-body hover:text-white hover:bg-white/5 transition-colors border-b border-white/10"
                  aria-expanded={mobileExpanded === link.href}
                >
                  {link.label}
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${mobileExpanded === link.href ? 'rotate-180' : ''}`}
                  />
                </button>
                {mobileExpanded === link.href && (
                  <div className="bg-white/5">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className="block pl-8 pr-5 py-3 text-white/60 text-sm font-body hover:text-white hover:bg-white/5 transition-colors border-b border-white/5"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-5 py-3.5 text-white/70 text-sm font-body hover:text-white hover:bg-white/5 transition-colors border-b border-white/10"
              >
                {link.label}
              </Link>
            )
          )}
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
