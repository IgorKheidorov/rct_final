import type { Metadata } from 'next'
import type { ProgramItem } from '@/lib/types'
import ProgramsGrid from '@/components/sections/ProgramsGrid'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Бакалавриат — ФРКТ БГУ',
  description:
    'Специальности бакалавриата ФРКТ БГУ 2026. Радиофизика и ИТ, Прикладная информатика, Кибербезопасность, Интеллектуальная электроника.',
}

const PROGRAMS: ProgramItem[] = [
  {
    code: '6-05-0533-05',
    title: 'Радиофизика и информационные технологии',
    qualification: 'Радиофизик. Инженер-программист',
    tracks: 5,
    budget: 86,
    paid: 10,
    image: '/images/specialty_digital_tech.jpg',
    href: '/programs/bachelor/rphit',
  },
  {
    code: '6-05-0533-11',
    title: 'Прикладная информатика',
    qualification: 'Информатик. Программист',
    tracks: 2,
    budget: 42,
    paid: 10,
    image: '/images/specialty_intelligent_systems.jpg',
    href: '/programs/bachelor/ai',
  },
  {
    code: '6-05-0533-12',
    title: 'Кибербезопасность',
    qualification: 'Специалист по защите информации',
    tracks: 1,
    budget: 42,
    paid: 10,
    image: '/images/specialty_cybersecurity.jpg',
    href: '/programs/bachelor/cs',
    accent: true,
  },
  {
    code: '6-05-0533-15',
    title: 'Интеллектуальная электроника',
    qualification: 'Радиофизик. Инженер-программист',
    tracks: 1,
    budget: 22,
    paid: 2,
    image: '/images/specialty_intelligent_electronics.jpg',
    href: '/programs/bachelor/ie',
  },
]

const STUDY_INFO = [
  'Срок обучения: 4 года (дневная форма)',
  'Язык обучения: русский',
  'Поступление: по результатам ЦЭ + ЦТ, средний балл аттестата',
]

export default function BachelorPage() {
  return (
    <div data-pagefind-body>
      {/* Hero */}
      <section className="bg-bg-primary pt-32 pb-16 px-6 sm:px-10 lg:px-20 border-b border-border-col">
        <p className="font-body text-[11px] text-accent uppercase tracking-label leading-none mb-6">
          // БАКАЛАВРИАТ — ПЕРВАЯ СТУПЕНЬ
        </p>
        <h1 className="font-display text-5xl md:text-6xl text-text-primary leading-[0.97] tracking-tight mb-6">
          4 СПЕЦИАЛЬНОСТИ,
          <br />9 НАПРАВЛЕНИЙ ПОДГОТОВКИ
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
        eyebrow="// СПЕЦИАЛЬНОСТИ"
        heading="Направления бакалавриата"
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
              ПРАВИЛА ПРИЁМА →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
