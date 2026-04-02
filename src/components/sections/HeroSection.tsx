import Link from 'next/link'

const STATS = [
  { value: '100+', label: 'Преподавателей' },
  { value: '4', label: 'Специальности' },
  { value: '94%', label: 'Трудоустройство' },
  { value: '#1', label: 'В Беларуси' },
]

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-slate-50 to-bg-primary border-b border-border-col">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
      >
        <div className="absolute top-0 right-0 w-px h-full bg-border-col" />
        <div className="absolute top-0 left-[38%] w-px h-full bg-border-col hidden lg:block" />
      </div>

      <div className="relative max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-20 pt-28 pb-16 md:pt-32 md:pb-20">
        <p className="section-label mb-6 leading-none">
          Факультет радиофизики и компьютерных технологий · БГУ
        </p>

        <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-heading mb-6 max-w-4xl">
          Наука.{' '}
          <span className="text-accent">Знание.</span>{' '}
          Будущее.
        </h1>

        <p className="font-body text-base md:text-lg text-text-secondary leading-relaxed max-w-2xl mb-10">
          Единственный в Республике Беларусь факультет физико-технического профиля.
          Программирование и кибербезопасность, искусственный интеллект и квантовые вычисления,
          интернет вещей и аэрокосмические технологии.
        </p>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/admissions"
            className="inline-flex items-center justify-center bg-accent text-white font-body font-semibold text-sm px-8 py-3.5 rounded-card hover:bg-accent/90 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            Поступить →
          </Link>
          <Link
            href="/programs"
            className="inline-flex items-center justify-center border border-border-col text-text-primary font-body font-semibold text-sm px-8 py-3.5 rounded-card bg-white hover:border-accent hover:text-accent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            Программы обучения
          </Link>
        </div>
      </div>

      <div className="relative border-t border-border-col bg-slate-50/80">
        <div className="max-w-[1440px] mx-auto grid grid-cols-2 sm:grid-cols-4">
          {STATS.map((stat, index) => (
            <div
              key={stat.label}
              className={[
                'px-6 sm:px-10 lg:px-12 py-8 flex flex-col gap-2',
                index < STATS.length - 1 ? 'border-r border-border-col' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <span className="font-display font-semibold text-2xl md:text-3xl text-heading leading-none">
                {stat.value}
              </span>
              <span className="font-body text-[11px] font-medium tracking-wide text-text-muted">
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
