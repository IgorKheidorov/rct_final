import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/layout/PageHero'

export const metadata: Metadata = {
  title: 'Научные школы — ФРКТ БГУ',
  description: 'Ведущие научные школы факультета радиофизики и компьютерных технологий БГУ.',
}

const SCHOOLS = [
  {
    title: 'Физика полупроводников и материаловедение',
    href: '/science/school-semiconductor',
    description: 'Научная школа в области физики твёрдого тела, полупроводниковых материалов и нанотехнологий.',
  },
  {
    title: 'Радиофизика и информатика',
    href: '/science/school-informatics',
    description: 'Научная школа в области радиофизики, вычислительных методов и информатики.',
  },
]

export default function ScienceSchoolsPage() {
  return (
    <div className="min-h-screen bg-bg-primary" data-pagefind-body>
      <PageHero
        eyebrow="Наука"
        title="Научные школы"
        subtitle="Ведущие научные школы факультета, объединяющие исследователей вокруг приоритетных направлений."
        coverImage={{
          src: '/images/specialty_digital_tech.jpg',
          alt: 'Научные школы ФРКТ БГУ',
          priority: true,
        }}
      />

      <section className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-20 py-16">
        <div className="flex flex-col gap-[2px]">
          {SCHOOLS.map((school) => (
            <Link
              key={school.href}
              href={school.href}
              className="group flex flex-col gap-2 bg-bg-section p-8 border border-transparent hover:border-border-col hover:bg-bg-primary transition-colors duration-200"
            >
              <h2 className="font-display text-xl text-text-primary group-hover:text-accent transition-colors duration-200">
                {school.title}
              </h2>
              <p className="font-body text-sm text-text-secondary leading-relaxed">
                {school.description}
              </p>
              <span className="font-body text-xs uppercase tracking-label text-accent mt-2">
                Подробнее →
              </span>
            </Link>
          ))}
        </div>

        <div className="border-t border-border-col mt-12 pt-8">
          <Link
            href="/science"
            className="font-body text-sm text-text-secondary hover:text-accent transition-colors uppercase tracking-label"
          >
            ← Наука
          </Link>
        </div>
      </section>
    </div>
  )
}
