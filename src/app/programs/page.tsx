import type { Metadata } from 'next'
import type { ProgramItem } from '@/lib/types'
import ProgramsGrid from '@/components/sections/ProgramsGrid'
import PageHero from '@/components/layout/PageHero'
import PageHub from '@/components/layout/PageHub'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Программы обучения — ФРКТ БГУ',
  description:
    'Бакалавриат и магистратура ФРКТ БГУ 2026. Радиофизика, кибербезопасность, информатика, интеллектуальная электроника, аэрокосмические технологии.',
}

const BACHELOR_PROGRAMS: ProgramItem[] = [
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

const MASTER_PROGRAMS: ProgramItem[] = [
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

const PROGRAMS_HUB = [
  {
    id: 'bachelor',
    title: 'Бакалавриат',
    description: 'Четыре специальности, девять направлений подготовки.',
  },
  {
    id: 'master',
    title: 'Магистратура',
    description: 'Три специальности, обучение на русском и английском.',
  },
  {
    id: 'join',
    title: 'Поступление',
    description: 'Правила приёма, плановый набор и документы для абитуриентов.',
  },
] as const

export default function ProgramsPage() {
  return (
    <div data-pagefind-body>
      <PageHero
        eyebrow="Программы"
        title="Программы обучения"
        subtitle="4 специальности бакалавриата, 9 направлений подготовки. 3 специальности магистратуры, обучение на русском и английском языках."
      />

      <PageHub items={PROGRAMS_HUB} />

      <ProgramsGrid
        sectionId="bachelor"
        eyebrow="// БАКАЛАВРИАТ (4 специальности, 9 направлений)"
        heading="Первая ступень"
        cta={{ label: 'ПОДРОБНЕЕ →', href: '/programs/bachelor' }}
        items={BACHELOR_PROGRAMS}
      />

      <ProgramsGrid
        sectionId="master"
        eyebrow="// МАГИСТРАТУРА (3 специальности)"
        heading="Вторая ступень"
        cta={{ label: 'ПОДРОБНЕЕ →', href: '/programs/master' }}
        items={MASTER_PROGRAMS}
      />

      <section
        id="join"
        className="bg-bg-section py-16 px-6 sm:px-10 lg:px-20 border-t border-border-col"
      >
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div>
            <p className="font-body text-sm text-text-secondary mb-2">
              Готовы поступать? Узнайте о правилах приёма и плановом наборе
            </p>
          </div>
          <Link
            href="/admissions"
            className="flex-shrink-0 inline-block bg-accent text-white font-body font-semibold text-sm uppercase tracking-label px-8 py-4 hover:bg-accent/90 transition-colors duration-200"
          >
            ПОСТУПИТЬ →
          </Link>
        </div>
      </section>
    </div>
  )
}
