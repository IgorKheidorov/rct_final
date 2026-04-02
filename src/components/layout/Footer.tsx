import Link from 'next/link'

const SOCIAL_LINKS = [
  {
    name: 'VK',
    href: 'https://vk.com/rcft_bsu',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M21.579 6.855c.14-.465 0-.806-.662-.806h-2.193c-.558 0-.815.295-.955.619 0 0-1.116 2.719-2.695 4.482-.511.513-.743.676-1.022.676-.139 0-.341-.163-.341-.628V6.855c0-.558-.161-.806-.626-.806H9.642c-.348 0-.558.259-.558.504 0 .528.79.65.871 2.138v3.228c0 .707-.128.836-.407.836-.743 0-2.551-2.729-3.624-5.853-.21-.607-.42-.853-.98-.853H2.752c-.627 0-.752.295-.752.619 0 .58.743 3.462 3.461 7.271 1.812 2.601 4.363 4.011 6.687 4.011 1.393 0 1.565-.313 1.565-.853v-1.966c0-.626.133-.752.574-.752.326 0 .885.163 2.186 1.417 1.487 1.487 1.732 2.154 2.568 2.154h2.193c.626 0 .939-.313.759-.931-.197-.615-.907-1.51-1.849-2.569-.511-.604-1.277-1.254-1.51-1.58-.325-.418-.232-.604 0-.976.001 0 2.672-3.764 2.945-5.039z" />
      </svg>
    ),
  },
  {
    name: 'Telegram',
    href: 'https://t.me/rcft_bsu',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/rcft_bsu',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: 'https://facebook.com/rcftbsu',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: 'TikTok',
    href: 'https://tiktok.com/@rcft_bsu',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
      </svg>
    ),
  },
]

const FOOTER_COLS = [
  {
    heading: 'Факультет',
    links: [
      { label: 'О факультете',  href: '/faculty' },
      { label: 'История',       href: '/faculty#history' },
      { label: 'Руководство',   href: '/faculty/administration' },
      { label: 'Кафедры',       href: '/faculty/departments' },
      { label: 'Учёный совет',  href: '/faculty/council' },
      { label: 'Профсоюз',      href: '/faculty/prof-rct' },
    ],
  },
  {
    heading: 'Обучение',
    links: [
      { label: 'Бакалавриат',        href: '/programs/bachelor' },
      { label: 'Магистратура',       href: '/programs/master' },
      { label: 'Расписание',         href: '/education#schedules' },
      { label: 'Учебный календарь',  href: '/education#calendar' },
      { label: 'Документы',          href: '/education#documents' },
    ],
  },
  {
    heading: 'Абитуриентам',
    links: [
      { label: 'Как поступить',            href: '/admissions' },
      { label: 'Специальности',            href: '/programs' },
      { label: 'Плановый набор 2026',      href: '/admissions#places' },
      { label: 'Вступительные испытания',  href: '/admissions#requirements' },
      { label: 'Общежитие',               href: '/admissions#dormitory' },
      { label: 'Дни открытых дверей',      href: '/admissions#open-days' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-slate-100 border-t border-border-col">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">
          {FOOTER_COLS.map((col) => (
            <div key={col.heading}>
              <h3 className="font-body font-semibold text-text-primary text-sm tracking-wide mb-6">
                {col.heading}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-text-secondary text-sm font-body hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contacts column */}
          <div>
            <h3 className="font-body font-semibold text-text-primary text-sm tracking-wide mb-6">
              Контакты
            </h3>
            <address className="not-italic space-y-3">
              <p className="text-text-secondary text-sm font-body leading-relaxed">
                220045 Минск
                <br />
                ул. Курчатова 5
              </p>
              <p>
                <a
                  href="tel:+375172095818"
                  className="text-text-secondary text-sm font-body hover:text-accent transition-colors"
                >
                  +375 (17) 209-58-18
                </a>
              </p>
              <p>
                <a
                  href="mailto:rct@bsu.by"
                  className="text-text-secondary text-sm font-body hover:text-accent transition-colors"
                >
                  rct@bsu.by
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border-col mt-14 pt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-text-muted text-xs font-body">
            <span>© 2025 ФРКТ БГУ. Все права защищены.</span>
            <span className="hidden sm:inline text-border-col" aria-hidden="true">
              |
            </span>
            <a
              href="https://bsu.by"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-text-secondary transition-colors"
            >
              bsu.by
            </a>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className="w-8 h-8 flex items-center justify-center text-text-muted hover:text-accent border border-border-col hover:border-accent hover:bg-white rounded-card transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
