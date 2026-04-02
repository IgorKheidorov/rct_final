'use client'

import Image from 'next/image'
import { useState } from 'react'

import type { PartnerItem } from '@/lib/types'

export interface PartnersSectionProps {
  eyebrow: string
  heading: string
  partners?: PartnerItem[]
}

const DEFAULT_PARTNERS: PartnerItem[] = [
  { name: 'LeverX',         file: 'leverx.png',      url: 'https://leverx.com' },
  { name: 'EPAM',           file: 'epam.png',         url: 'https://epam.com' },
  { name: 'ITransition',    file: 'itransition.png',  url: 'https://itransition.com' },
  { name: 'NTLab',          file: 'ntlab.png',        url: 'https://ntlab.com' },
  { name: 'Aristek Systems',file: 'aristek.svg',      url: 'https://aristeksystems.com' },
  { name: 'Abiatec',        file: 'abiatec.png',      url: 'https://abiatec.com' },
  { name: 'Effective Soft', file: 'effectivesoft.png',url: 'https://effectivesoft.com' },
  { name: 'D-Link',         file: 'dlink.png',        url: 'https://dlink.com' },
  { name: 'ПВТ',            file: 'htp.png',          url: 'https://park.by' },
]

interface LogoProps {
  partner: PartnerItem
}

function PartnerLogo({ partner }: LogoProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={partner.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={partner.name}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center justify-center px-6 py-5 border-r border-border-col last:border-r-0 min-w-[120px] flex-1"
    >
      <Image
        src={`/images/partners/${partner.file}`}
        alt={partner.name}
        width={120}
        height={48}
        className={[
          'object-contain max-h-10 w-auto transition-all duration-300',
          hovered ? 'grayscale-0 opacity-100' : 'grayscale opacity-40',
        ].join(' ')}
      />
    </a>
  )
}

export function PartnersSection({ eyebrow, heading, partners }: PartnersSectionProps) {
  const list = partners ?? DEFAULT_PARTNERS

  return (
    <section className="bg-bg-section py-20 px-6 sm:px-10 lg:px-20 border-t border-border-col">
      {/* Header */}
      <div className="flex flex-col gap-3 mb-12">
        <p className="font-body text-[11px] text-accent uppercase tracking-label leading-none">
          {eyebrow}
        </p>
        <h2 className="font-display text-3xl md:text-4xl text-text-primary leading-tight">
          {heading}
        </h2>
      </div>

      {/* Logos row */}
      <div className="border border-border-col overflow-x-auto">
        <div className="flex flex-nowrap divide-x-0 min-w-max">
          {list.map((partner) => (
            <PartnerLogo key={partner.name} partner={partner} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default PartnersSection
