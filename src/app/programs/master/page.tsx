import type { Metadata } from 'next'
import type { ProgramItem } from '@/lib/types'
import ProgramsGrid from '@/components/sections/ProgramsGrid'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Магистратура — ФРКТ БГУ',
  description:
    'Специальности магистратуры ФРКТ БГУ 2026. Радиофизика и ИТ, Кибербезопасность, Аэрокосмические технологии. Обучение на русском и английском языках.',
}

const PROGRAMS: ProgramItem[] = [
  {
    code: '7-06-0533-03',
    title: 'Радиофизика и информационные технологии',
    budget: 10,
    paid: 3,
    image: '/images/masters_program_1.jpg',
    href: '/programs/master/rfitm',
  },
  {
    code: '7-06-0533-08',
    title: 'Кибербезопасность',
    budget: 13,
    paid: 1,
    image: '/images/specialty_cybersecurity.jpg',
    href: '/programs/master/cs-mag',
    accent: true,
    english: true,
  },
  {
    code: '7-06-0533-09',
    title: 'Аэрокосмические технологии',
    budget: 5,
    paid: 1,
    image: '/images/masters_aerospace.jpg',
    href: '/programs/master/aerocos',
    english: true,
  },
]

const STUDY_INFO = [
  'Срок обучения: 2 года (дневная форма)',
  'Языки: русский и английский (Кибербезопасность, Аэрокосмика)',
  'Требование: диплом бакалавра (или специалиста)',
]

export default function MasterPage() {
  return (
    <div data-pagefind-body>
      {/* Hero */}
      <section className="bg-bg-primary pt-32 pb-16 px-6 sm:px-10 lg:px-20 border-b border-border-col">
        <p className="font-body text-[11px] text-accent uppercase tracking-label leading-none mb-6">
          // МАГИСТРАТУРА — ВТОРАЯ СТУПЕНЬ
        </p>
        <h1 className="font-display text-5xl md:text-6xl text-text-primary leading-[0.97] tracking-tight mb-6">
          3 СПЕЦИАЛЬНОСТИ,
          <br />
          РУССКИЙ И АНГЛИЙСКИЙ
        </h1>
        <Link
          href="/admissions"
          className="inline-block bg-accent text-white font-body font-semibold text-sm uppercase tracking-label px-8 py-4 hover:bg-accent/90 transition-colors duration-200"
        >
          ПОСТУПИТЬ →
        </Link>
      </section>

      {/* Programs grid */}
      <ProgramsGrid
        eyebrow="// СПЕЦИАЛЬНОСТИ МАГИСТРАТУРЫ"
        heading="Направления магистратуры"
        cta={{ label: 'ПОСТУПИТЬ →', href: '/admissions' }}
        items={PROGRAMS}
      />

      {/* Study info */}
      <section className="bg-bg-section py-16 px-6 sm:px-10 lg:px-20 border-t border-border-col">
        <p className="font-body text-[11px] text-accent uppercase tracking-label leading-none mb-8">
          // ФОРМА ОБУЧЕНИЯ
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <ul className="flex flex-col gap-0">
              {STUDY_INFO.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-4 py-4 border-b border-border-col first:border-t first:border-border-col"
                >
                  <span
                    aria-hidden="true"
                    className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0"
                  />
                  <span className="font-body text-sm text-text-primary">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Link
              href="/admissions"
              className="inline-block border border-border-col text-text-secondary font-body text-sm uppercase tracking-label px-6 py-3 hover:border-accent hover:text-accent transition-colors duration-200"
            >
              ПОДРОБНЕЕ →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
