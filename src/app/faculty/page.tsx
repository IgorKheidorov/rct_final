import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import StatsBand from '@/components/sections/StatsBand'

export const metadata: Metadata = {
  title: 'О факультете — ФРКТ БГУ',
  description:
    'Единственный физико-технический факультет в Беларуси. Кафедры, история, научные достижения, структура.',
}

const STATS = [
  { value: '100+', label: 'ПРЕПОДАВАТЕЛЕЙ' },
  { value: '1', label: 'АКАДЕМИК НАН' },
  { value: '12', label: 'ДОКТОРОВ НАУК' },
  { value: '32', label: 'ДОЦЕНТОВ' },
  { value: '32', label: 'ИНЖЕНЕРОВ' },
]

const KEY_POINTS = [
  'Единственный физико-технический факультет в Республике Беларусь',
  'Готовит физиков-инженеров для радиоэлектроники, электроники, телекоммуникаций и ИТ',
  'Уникальное сочетание: информатика, программирование, радиофизика, электроника',
  'Международные научно-технические связи',
]

const TIMELINE = [
  { era: 'XX век', text: 'Антенны для межпланетных космических станций' },
  { era: '2021', text: 'БГУСат-1 — первый наноспутник белорусского университета' },
  { era: '2022', text: 'БГУСат-2 — второй малый космический аппарат' },
  {
    era: 'Прошлое',
    text: 'Проекты Марс, Венера, Буран-Энергия; оборонная и авиационная промышленность',
  },
]

const RESEARCH_DIRECTIONS = [
  'Современная информатика и обработка изображений',
  'IoT и искусственный интеллект',
  'Нейронные сети и кибербезопасность',
  'Системный анализ и интеллектуальные системы',
  'Распознавание речи и компьютерные сети',
  'Наноэлектроника и квантовые вычисления',
  'Смарт-электроника и аэрокосмические технологии',
  'Медико-биологические исследования и биоинформатика',
]

const DEPARTMENTS = [
  {
    slug: 'rdmt',
    name: 'Радиофизики и цифровых медиа технологий',
    href: '/faculty/departments/rdmt',
  },
  {
    slug: 'qro',
    name: 'Квантовой радиофизики и оптоэлектроники',
    href: '/faculty/departments/qro',
  },
  {
    slug: 'physelnano',
    name: 'Физической электроники и нанотехнологий',
    href: '/faculty/departments/physelnano',
  },
  {
    slug: 'ics',
    name: 'Информатики и компьютерных систем',
    href: '/faculty/departments/ics',
  },
  {
    slug: 'kis',
    name: 'Интеллектуальных систем',
    href: '/faculty/departments/kis',
  },
  {
    slug: 'teleit',
    name: 'Телекоммуникаций и информационных технологий',
    href: '/faculty/departments/teleit',
  },
  {
    slug: 'sacm',
    name: 'Системного анализа и компьютерного моделирования',
    href: '/faculty/departments/sacm',
  },
  {
    slug: 'phaerotech',
    name: 'Физики и аэрокосмических технологий',
    href: '/faculty/departments/phaerotech',
  },
]

const RESOURCES = [
  { label: 'Сотрудники', href: '/faculty/staff' },
  { label: 'Руководство', href: '/faculty/administration' },
  { label: 'Учёный совет', href: '/faculty/council' },
  { label: 'Профсоюз', href: '/faculty/prof-rct' },
  { label: 'Каталог дисциплин', href: '/faculty#catalog' },
  { label: 'Распределение 2025', href: '/faculty#distribution' },
]

export default function FacultyPage() {
  return (
    <div data-pagefind-body>
      {/* Hero */}
      <section className="relative h-[480px] md:h-[600px] overflow-hidden">
        <Image
          src="/images/faculty_building.jpg"
          alt="Корпус ФРКТ БГУ, ул. Академика Курчатова, 5"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-bg-primary/70" />
        <div className="absolute inset-0 flex flex-col justify-end px-6 sm:px-10 lg:px-20 pb-16">
          <p className="font-body text-[11px] text-accent uppercase tracking-label mb-4">
            // ФАКУЛЬТЕТ РАДИОФИЗИКИ И КОМПЬЮТЕРНЫХ ТЕХНОЛОГИЙ
          </p>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-text-primary leading-[0.97] tracking-tight max-w-3xl">
            О ФАКУЛЬТЕТЕ
          </h1>
        </div>
      </section>

      {/* Stats */}
      <StatsBand items={STATS} />

      {/* About */}
      <section className="bg-bg-primary py-20 px-6 sm:px-10 lg:px-20 border-b border-border-col">
        <p className="font-body text-[11px] text-accent uppercase tracking-label leading-none mb-8">
          // О НАС
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          <div>
            <h2 className="font-display text-3xl md:text-4xl text-text-primary leading-tight mb-8">
              Уникальная комбинация знаний
            </h2>
            <p className="font-body text-base text-text-secondary leading-[1.75] mb-6">
              ФРКТ — единственный физико-технический факультет в Республике Беларусь, объединяющий
              фундаментальную науку и современные технологии. Факультет готовит специалистов
              мирового уровня с 1889 года.
            </p>
            <p className="font-body text-base text-text-secondary leading-[1.75]">
              Уникальное сочетание дисциплин охватывает информатику и программирование,
              радиофизику и электронику, телекоммуникации и кибербезопасность, аэрокосмические
              технологии и биоинформатику.
            </p>
          </div>
          <ul className="flex flex-col gap-0">
            {KEY_POINTS.map((point, i) => (
              <li
                key={i}
                className="flex items-start gap-4 py-5 border-b border-border-col first:border-t first:border-border-col"
              >
                <span
                  aria-hidden="true"
                  className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0"
                />
                <span className="font-body text-sm md:text-base text-text-primary leading-[1.6]">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* History */}
      <section
        id="history"
        className="bg-bg-section py-20 px-6 sm:px-10 lg:px-20 border-b border-border-col"
      >
        <p className="font-body text-[11px] text-accent uppercase tracking-label leading-none mb-8">
          // ИСТОРИЯ
        </p>
        <h2 className="font-display text-3xl md:text-4xl text-text-primary leading-tight mb-12">
          Достижения
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[2px]">
          {TIMELINE.map((item) => (
            <div key={item.era} className="bg-bg-primary p-8 flex flex-col gap-4">
              <span className="font-display text-3xl text-accent">{item.era}</span>
              <p className="font-body text-sm text-text-secondary leading-[1.6]">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Research */}
      <section className="bg-bg-primary py-20 px-6 sm:px-10 lg:px-20 border-b border-border-col">
        <p className="font-body text-[11px] text-accent uppercase tracking-label leading-none mb-8">
          // ИССЛЕДОВАНИЯ
        </p>
        <h2 className="font-display text-3xl md:text-4xl text-text-primary leading-tight mb-12">
          Направления научной работы
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[2px]">
          {RESEARCH_DIRECTIONS.map((dir, i) => (
            <div key={i} className="bg-bg-section p-6 flex items-start gap-4">
              <span
                aria-hidden="true"
                className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0"
              />
              <p className="font-body text-sm text-text-secondary leading-[1.6]">{dir}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Departments */}
      <section className="bg-bg-section py-20 px-6 sm:px-10 lg:px-20 border-b border-border-col">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <p className="font-body text-[11px] text-accent uppercase tracking-label leading-none mb-3">
              // КАФЕДРЫ
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-text-primary leading-tight">
              8 кафедр
            </h2>
          </div>
          <Link
            href="/faculty/departments"
            className="flex-shrink-0 inline-block border border-border-col text-text-secondary font-body text-sm uppercase tracking-label px-6 py-3 hover:border-accent hover:text-accent transition-colors duration-200"
          >
            ВСЕ КАФЕДРЫ →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[2px]">
          {DEPARTMENTS.map((dept) => (
            <Link
              key={dept.slug}
              href={dept.href}
              className="group bg-bg-primary p-6 flex flex-col gap-4 hover:bg-accent/5 transition-colors duration-200 border border-transparent hover:border-accent/30"
            >
              <span className="font-body text-[11px] text-accent uppercase tracking-label leading-none">
                // {dept.slug.toUpperCase()}
              </span>
              <p className="font-body text-sm text-text-primary leading-[1.6] group-hover:text-accent transition-colors duration-200">
                Кафедра {dept.name}
              </p>
              <span
                aria-hidden="true"
                className="mt-auto font-body text-sm text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Resources */}
      <section className="bg-bg-primary py-20 px-6 sm:px-10 lg:px-20">
        <p className="font-body text-[11px] text-accent uppercase tracking-label leading-none mb-8">
          // РЕСУРСЫ
        </p>
        <h2 className="font-display text-3xl md:text-4xl text-text-primary leading-tight mb-10">
          Документы и ресурсы
        </h2>
        <div className="flex flex-wrap gap-4">
          {RESOURCES.map((res) => (
            <Link
              key={res.href}
              href={res.href}
              className="inline-block border border-border-col text-text-secondary font-body text-sm uppercase tracking-label px-6 py-3 hover:border-accent hover:text-accent transition-colors duration-200"
            >
              {res.label} →
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
