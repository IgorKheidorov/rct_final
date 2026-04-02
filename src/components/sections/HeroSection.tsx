import Link from 'next/link'

const STATS = [
  { value: '100+', label: 'Преподавателей' },
  { value: '136', label: 'Лет истории' },
  { value: '94%', label: 'Трудоустройство' },
  { value: '#1', label: 'В Беларуси' },
]

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-bg-primary flex flex-col overflow-hidden">
      {/* Geometric accent lines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute top-0 right-0 w-px h-full bg-border-col opacity-40" />
        <div className="absolute top-0 left-[40%] w-px h-full bg-border-col opacity-20 hidden lg:block" />
        <div className="absolute bottom-[180px] left-0 right-0 h-px bg-border-col opacity-40" />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-10 lg:px-20 pt-32 pb-10">
        {/* Eyebrow */}
        <p className="font-body text-[11px] text-accent uppercase tracking-label mb-8 leading-none">
          {'// Факультет радиофизики и компьютерных технологий · БГУ'}
        </p>

        {/* Headline */}
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.97] tracking-tight text-text-primary mb-8 whitespace-pre-line">
          {'НАУКА.\n'}
          <span className="text-accent">{'ЗНАНИЕ.\n'}</span>
          {'БУДУЩЕЕ.'}
        </h1>

        {/* Subtext */}
        <p className="font-body text-base md:text-lg text-text-secondary leading-[1.75] max-w-xl mb-12">
          Единственный физико-технический факультет в Беларуси, объединяющий
          фундаментальную науку и современные технологии с 1889 года.
          Подготовка специалистов мирового уровня в области радиофизики,
          компьютерных технологий и интеллектуальных систем.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4">
          <Link
            href="/admissions"
            className="inline-block bg-accent text-text-primary font-body font-semibold text-sm uppercase tracking-label px-8 py-4 hover:bg-accent/90 transition-colors duration-200"
          >
            Поступить →
          </Link>
          <Link
            href="/programs"
            className="inline-block border border-border-col text-text-primary font-body font-semibold text-sm uppercase tracking-label px-8 py-4 hover:border-accent hover:text-accent transition-colors duration-200"
          >
            Программы обучения
          </Link>
        </div>
      </div>

      {/* Stats strip */}
      <div className="border-t border-border-col">
        <div className="grid grid-cols-2 sm:grid-cols-4">
          {STATS.map((stat, index) => (
            <div
              key={stat.label}
              className={[
                'px-6 sm:px-10 lg:px-20 py-6 flex flex-col gap-1',
                index < STATS.length - 1 ? 'border-r border-border-col' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <span className="font-display text-3xl md:text-4xl text-text-primary leading-none">
                {stat.value}
              </span>
              <span className="font-body text-[11px] uppercase tracking-label text-text-muted">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HeroSection
