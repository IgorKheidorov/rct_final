import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/layout/PageHero'

export const metadata: Metadata = {
  title: 'Кафедры — ФРКТ БГУ',
  description: 'Восемь кафедр факультета радиофизики и компьютерных технологий БГУ.',
}

const DEPARTMENTS = [
  {
    slug: 'rdmt',
    name: 'Кафедра радиофизики и цифровых медиа технологий',
    head: 'Максимович Елена Степановна',
    headTitle: 'Канд. техн. наук',
    href: '/faculty/departments/rdmt',
  },
  {
    slug: 'qro',
    name: 'Кафедра квантовой радиофизики и оптоэлектроники',
    head: 'Афоненко Александр Анатольевич',
    headTitle: 'Д-р физ.-мат. наук, профессор',
    href: '/faculty/departments/qro',
  },
  {
    slug: 'physelnano',
    name: 'Кафедра физической электроники и нанотехнологий',
    head: 'Борздов Владимир Михайлович',
    headTitle: 'Д-р физ.-мат. наук, профессор',
    href: '/faculty/departments/physelnano',
  },
  {
    slug: 'ics',
    name: 'Кафедра информатики и компьютерных систем',
    head: 'Семенович Сергей Николаевич',
    headTitle: 'Канд. техн. наук, доцент',
    href: '/faculty/departments/ics',
  },
  {
    slug: 'kis',
    name: 'Кафедра интеллектуальных систем',
    head: 'Козлова Елена Ивановна',
    headTitle: 'Канд. физ.-мат. наук, доцент',
    href: '/faculty/departments/kis',
  },
  {
    slug: 'teleit',
    name: 'Кафедра телекоммуникаций и информационных технологий',
    head: 'Воротницкий Юрий Иосифович',
    headTitle: 'Канд. физ.-мат. наук, доцент',
    href: '/faculty/departments/teleit',
  },
  {
    slug: 'sacm',
    name: 'Кафедра системного анализа и компьютерного моделирования',
    head: 'Яцков Николай Николаевич',
    headTitle: 'Канд. физ.-мат. наук, доцент',
    href: '/faculty/departments/sacm',
  },
  {
    slug: 'phaerotech',
    name: 'Кафедра физики и аэрокосмических технологий',
    head: 'Сачков Владимир Алексеевич',
    headTitle: 'Д-р физ.-мат. наук, профессор',
    href: '/faculty/departments/phaerotech',
  },
]

export default function DepartmentsPage() {
  return (
    <div data-pagefind-body>
      <PageHero
        eyebrow="Факультет"
        title="Кафедры"
        subtitle="8 кафедр объединяют более 100 преподавателей, исследователей и инженеров."
        coverImage={{
          src: '/images/faculty_building.jpg',
          alt: 'Корпус факультета радиофизики и компьютерных технологий БГУ',
          priority: true,
        }}
      />

      {/* Departments list */}
      <section className="bg-bg-primary py-16 px-6 sm:px-10 lg:px-20">
        <div className="flex flex-col gap-[2px]">
          {DEPARTMENTS.map((dept, index) => (
            <Link
              key={dept.slug}
              href={dept.href}
              className="group flex flex-col sm:flex-row sm:items-center gap-4 bg-bg-section p-8 hover:bg-bg-primary transition-colors duration-200 border border-transparent hover:border-border-col"
            >
              <span className="font-body text-[11px] text-accent uppercase tracking-label w-16 flex-shrink-0">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="flex-1">
                <p className="font-display text-lg md:text-xl text-text-primary leading-tight mb-2 group-hover:text-accent transition-colors duration-200">
                  {dept.name}
                </p>
                <p className="font-body text-sm text-text-muted">
                  Зав. кафедрой: {dept.head} — {dept.headTitle}
                </p>
              </div>
              <span
                aria-hidden="true"
                className="font-body text-sm text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0"
              >
                →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Back link */}
      <div className="bg-bg-primary px-6 sm:px-10 lg:px-20 pb-16">
        <Link
          href="/faculty"
          className="inline-block border border-border-col text-text-secondary font-body text-sm uppercase tracking-label px-6 py-3 hover:border-accent hover:text-accent transition-colors duration-200"
        >
          ← О ФАКУЛЬТЕТЕ
        </Link>
      </div>
    </div>
  )
}
