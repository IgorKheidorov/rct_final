import type { Metadata } from 'next'
import Link from 'next/link'

import PageHero from '@/components/layout/PageHero'
import PageHub from '@/components/layout/PageHub'

export const metadata: Metadata = {
  title: 'Наука — ФРКТ БГУ',
  description:
    'Научная деятельность факультета радиофизики и компьютерных технологий БГУ. Конференции, лаборатории, научные школы.',
}

const CONFERENCES = [
  {
    title: "QE'2025 — «Квантовая электроника»",
    desc: 'XV Международная научно-техническая конференция',
    deadline: '30 сентября 2025',
    email: 'qe@bsu.by',
    href: '/science/conferences#qe2025',
  },
  {
    title: 'CTDA — «Компьютерные технологии и анализ данных»',
    desc: 'Двухлетняя международная конференция',
    website: 'https://ctda.bsu.by/',
    href: '/science/conferences#ctda',
  },
  {
    title: 'Прикладная оптика, информатика, радиофизика, физика ТТ',
    desc: 'Двухлетняя международная конференция при участии НИИПФП',
    href: '/science/conferences#applied-optics',
  },
]

const LABS = [
  'НИЛ лазерных систем',
  'НИЛ полупроводниковых лазеров',
  'НИЛ информационно-измерительных систем',
  'НИЛ робототехники и встраиваемых систем',
  'НИЛ методов обработки информации',
  'НИЛ моделирования и анализа процессов и систем',
  'Аэрокосмический образовательный центр БГУ',
]

const SCHOOLS = [
  {
    title: 'Физика полупроводников и материаловедение',
    href: '/science/school-semiconductor',
  },
  {
    title: 'Радиофизика и информатика',
    href: '/science/school-informatics',
  },
]

const SCIENCE_HUB = [
  {
    id: 'conferences',
    title: 'Конференции',
    description: 'Международные научно-технические конференции факультета.',
  },
  {
    id: 'labs',
    title: 'Лаборатории',
    description: 'Научно-исследовательские лаборатории и направления работ.',
  },
  {
    id: 'schools',
    title: 'Научные школы',
    description: 'Ведущие школы и тематические направления.',
  },
] as const

export default function SciencePage() {
  return (
    <div data-pagefind-body>
      <PageHero
        eyebrow="Наука и исследования"
        title="Научная деятельность ФРКТ"
        subtitle="Фундаментальные и прикладные исследования, международные конференции, 7 научных лабораторий, 2 ведущие научные школы"
        coverImage={{
          src: '/images/masters_aerospace.jpg',
          alt: 'Наука и исследования: аэрокосмические и инженерные направления ФРКТ',
          priority: true,
        }}
      />

      <PageHub items={SCIENCE_HUB} />

      {/* Conferences */}
      <section
        id="conferences"
        className="bg-bg-section py-16 px-6 sm:px-10 lg:px-20 border-b border-border-col"
      >
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <div>
            <p className="font-body text-[11px] text-accent uppercase tracking-label leading-none mb-3">
              // КОНФЕРЕНЦИИ
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-text-primary leading-tight">
              Международные конференции
            </h2>
          </div>
          <Link
            href="/science/conferences"
            className="flex-shrink-0 inline-block border border-border-col text-text-secondary font-body text-sm uppercase tracking-label px-6 py-3 hover:border-accent hover:text-accent transition-colors duration-200"
          >
            ВСЕ КОНФЕРЕНЦИИ →
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[2px]">
          {CONFERENCES.map((conf) => (
            <Link
              key={conf.href}
              href={conf.href}
              className="group bg-bg-primary p-8 flex flex-col gap-4 hover:bg-accent/5 transition-colors duration-200 border border-transparent hover:border-accent/30"
            >
              <h3 className="font-display text-lg text-text-primary leading-tight group-hover:text-accent transition-colors duration-200">
                {conf.title}
              </h3>
              <p className="font-body text-sm text-text-secondary leading-[1.6]">{conf.desc}</p>
              {conf.deadline && (
                <p className="font-body text-xs text-text-muted uppercase tracking-label mt-auto">
                  Дедлайн: {conf.deadline}
                </p>
              )}
              {conf.email && (
                <p className="font-body text-xs text-accent">{conf.email}</p>
              )}
            </Link>
          ))}
        </div>
      </section>

      {/* Labs */}
      <section
        id="labs"
        className="bg-bg-primary py-16 px-6 sm:px-10 lg:px-20 border-b border-border-col"
      >
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <div>
            <p className="font-body text-[11px] text-accent uppercase tracking-label leading-none mb-3">
              // ЛАБОРАТОРИИ
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-text-primary leading-tight">
              Научно-исследовательские лаборатории
            </h2>
          </div>
          <Link
            href="/science/labs"
            className="flex-shrink-0 inline-block border border-border-col text-text-secondary font-body text-sm uppercase tracking-label px-6 py-3 hover:border-accent hover:text-accent transition-colors duration-200"
          >
            ПОДРОБНЕЕ →
          </Link>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-[2px]">
          {LABS.map((lab, i) => (
            <li key={i} className="flex items-start gap-4 bg-bg-section p-6">
              <span
                aria-hidden="true"
                className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0"
              />
              <span className="font-body text-sm text-text-primary">{lab}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Scientific schools */}
      <section
        id="schools"
        className="bg-bg-section py-16 px-6 sm:px-10 lg:px-20"
      >
        <p className="font-body text-[11px] text-accent uppercase tracking-label leading-none mb-8">
          // НАУЧНЫЕ ШКОЛЫ
        </p>
        <h2 className="font-display text-3xl md:text-4xl text-text-primary leading-tight mb-10">
          Ведущие научные школы
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[2px]">
          {SCHOOLS.map((school) => (
            <Link
              key={school.href}
              href={school.href}
              className="group bg-bg-primary p-8 flex flex-col gap-4 hover:bg-accent/5 transition-colors duration-200 border border-transparent hover:border-accent/30"
            >
              <p className="font-display text-xl text-text-primary leading-tight group-hover:text-accent transition-colors duration-200">
                {school.title}
              </p>
              <span
                aria-hidden="true"
                className="font-body text-sm text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
