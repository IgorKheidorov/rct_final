import Link from 'next/link'

export interface AboutTeaserProps {
  eyebrow: string
  headline: string
  body: string
  achievements: string[]
  cta: { label: string; href: string }
}

export function AboutTeaser({ eyebrow, headline, body, achievements, cta }: AboutTeaserProps) {
  return (
    <section className="bg-bg-section py-20 px-6 sm:px-10 lg:px-20 border-t border-border-col">
      {/* Section label */}
      <p className="font-body text-[11px] text-accent uppercase tracking-label leading-none mb-12">
        {eyebrow}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Left column */}
        <div className="flex flex-col gap-8">
          <h2 className="font-display text-4xl md:text-5xl text-text-primary leading-[1.0] tracking-tight">
            {headline}
          </h2>
          <p className="font-body text-base text-text-secondary leading-[1.75] max-w-prose">
            {body}
          </p>
          <div className="mt-auto">
            <Link
              href={cta.href}
              className="inline-block bg-accent text-white font-body font-semibold text-sm uppercase tracking-label px-8 py-4 hover:bg-accent/90 transition-colors duration-200"
            >
              {cta.label} →
            </Link>
          </div>
        </div>

        {/* Right column — achievements */}
        <div className="flex flex-col gap-0">
          {achievements.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-4 py-5 border-b border-border-col first:border-t first:border-border-col"
            >
              <span
                aria-hidden="true"
                className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0"
              />
              <p className="font-body text-sm md:text-base text-text-primary leading-[1.6]">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AboutTeaser
