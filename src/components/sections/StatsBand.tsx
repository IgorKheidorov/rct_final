import type { StatItem } from '@/lib/types'

export interface StatsBandProps {
  items: StatItem[]
}

export function StatsBand({ items }: StatsBandProps) {
  return (
    <div className="bg-bg-section border-y border-border-col py-6 sm:py-8">
      <div className="px-4 sm:px-10 lg:px-20">
        <div className="flex flex-nowrap items-stretch justify-between divide-x divide-border-col">
          {items.map((stat) => (
            <div
              key={stat.label}
              className="flex min-w-0 flex-1 flex-col items-center justify-center gap-1.5 px-2 py-1 sm:px-4 md:px-6"
            >
              <span className="font-display text-xl leading-none text-text-primary sm:text-2xl md:text-3xl lg:text-4xl">
                {stat.value}
              </span>
              <span className="text-center font-body text-[9px] uppercase leading-tight tracking-label text-text-muted sm:text-[11px]">
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
