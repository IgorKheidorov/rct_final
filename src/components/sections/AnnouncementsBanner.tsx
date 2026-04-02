import Link from 'next/link'

export interface AnnouncementItem {
  text: string
  href: string
}

export interface AnnouncementsBannerProps {
  items: AnnouncementItem[]
}

export function AnnouncementsBanner({ items }: AnnouncementsBannerProps) {
  if (!items.length) return null

  return (
    <div className="bg-bg-section border-t border-border-col">
      <div className="px-6 sm:px-10 lg:px-20 py-4 overflow-x-auto scrollbar-none">
        <ul className="flex flex-nowrap gap-0 min-w-max sm:flex-wrap sm:min-w-0">
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <span
                  aria-hidden="true"
                  className="mx-4 h-3 w-px bg-border-col flex-shrink-0"
                />
              )}
              <Link
                href={item.href}
                className="group flex items-center gap-2 font-body text-sm text-text-secondary hover:text-accent transition-colors duration-200 whitespace-nowrap py-0.5"
              >
                <span
                  aria-hidden="true"
                  className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 group-hover:scale-125 transition-transform duration-200"
                />
                {item.text}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default AnnouncementsBanner
