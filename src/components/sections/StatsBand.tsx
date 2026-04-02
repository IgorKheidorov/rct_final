import type { StatItem } from '@/lib/types'

export interface StatsBandProps {
  items: StatItem[]
}

export function StatsBand({ items }: StatsBandProps) {
  return (
    <div className="bg-bg-section border-y border-border-col py-8">
      <div className="px-6 sm:px-10 lg:px-20">
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-border-col">
          {items.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col gap-1.5 px-6 first:pl-0 last:pr-0 py-2"
            >
              <span className="font-display text-3xl md:text-4xl text-text-primary leading-none">
                {stat.value}
              </span>
              <span className="font-body text-[11px] uppercase tracking-label text-text-muted leading-none">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StatsBand
