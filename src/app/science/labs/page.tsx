import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Лаборатории — ФРКТ БГУ',
  description:
    'Научно-исследовательские лаборатории факультета радиофизики и компьютерных технологий БГУ.',
}

const LABS = [
  {
    name: 'НИЛ лазерных систем',
    dept: 'Квантовая радиофизика и оптоэлектроника',
  },
  {
    name: 'НИЛ полупроводниковых лазеров',
    dept: 'Квантовая радиофизика и оптоэлектроника',
  },
  {
    name: 'НИЛ информационно-измерительных систем',
    dept: 'Радиофизика и цифровые медиа технологии',
  },
  {
    name: 'НИЛ робототехники и встраиваемых систем',
    dept: 'Информатика и компьютерные системы',
  },
  {
    name: 'НИЛ методов обработки информации',
    dept: 'Интеллектуальные системы',
  },
  {
    name: 'НИЛ моделирования и анализа процессов и систем',
    dept: 'Системный анализ и компьютерное моделирование',
  },
  {
    name: 'Аэрокосмический образовательный центр БГУ',
    dept: 'Физика и аэрокосмические технологии',
  },
]

export default function LabsPage() {
  return (
    <div data-pagefind-body>
      {/* Header */}
      <section className="bg-bg-primary pt-32 pb-16 px-6 sm:px-10 lg:px-20 border-b border-border-col">
        <p className="font-body text-[11px] text-accent uppercase tracking-label leading-none mb-6">
          // НАУЧНО-ИССЛЕДОВАТЕЛЬСКИЕ ЛАБОРАТОРИИ
        </p>
        <h1 className="font-display text-5xl md:text-6xl text-text-primary leading-[0.97] tracking-tight mb-4">
          ЛАБОРАТОРИИ ФРКТ
        </h1>
        <p className="font-body text-base text-text-secondary leading-[1.75] max-w-xl">
          7 специализированных научно-исследовательских лабораторий
        </p>
      </section>

      {/* Labs grid */}
      <section className="bg-bg-primary py-16 px-6 sm:px-10 lg:px-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[2px]">
          {LABS.map((lab, i) => (
            <div key={i} className="bg-bg-section p-8 flex flex-col gap-3">
              <span className="font-body text-[11px] text-accent uppercase tracking-label">
                ЛАБ {String(i + 1).padStart(2, '0')}
              </span>
              <h2 className="font-display text-lg md:text-xl text-text-primary leading-tight">
                {lab.name}
              </h2>
              <p className="font-body text-xs text-text-muted uppercase tracking-label mt-auto">
                Кафедра: {lab.dept}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Back */}
      <div className="bg-bg-primary px-6 sm:px-10 lg:px-20 pb-16">
        <Link
          href="/science"
          className="inline-block border border-border-col text-text-secondary font-body text-sm uppercase tracking-label px-6 py-3 hover:border-accent hover:text-accent transition-colors duration-200"
        >
          ← НАЗАД К НАУКЕ
        </Link>
      </div>
    </div>
  )
}
