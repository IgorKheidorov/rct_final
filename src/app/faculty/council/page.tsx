import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import PersonCard from '@/components/ui/PersonCard'
import PageHero from '@/components/layout/PageHero'
import { FACULTY_RESOURCE_GROUPS } from '@/lib/faculty-resources'

export const metadata: Metadata = {
  title: 'Учёный совет — ФРКТ БГУ',
  description: 'Учёный совет факультета радиофизики и компьютерных технологий БГУ.',
}

function readContent(filename: string): string {
  const filePath = path.join(process.cwd(), 'src', 'content', filename)
  if (!fs.existsSync(filePath)) return ''
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { content } = matter(raw)
  return content
}

export default function CouncilPage() {
  const content = readContent('faculty_council.mdx')

  return (
    <div data-pagefind-body>
      <PageHero
        eyebrow="Учёный совет"
        title="Учёный совет факультета"
        subtitle="Коллегиальный орган управления факультетом, координирующий научную и образовательную деятельность."
        coverImage={{
          src: '/images/faculty_building.jpg',
          alt: 'Корпус факультета радиофизики и компьютерных технологий БГУ',
          priority: true,
        }}
      />

      <section className="bg-bg-primary py-16 px-6 sm:px-10 lg:px-20 border-b border-border-col">
        {content ? (
          <div className="prose prose-sm max-w-none prose-a:hover:underline">
            <MDXRemote
              source={content}
              components={{ PersonCard }}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
            />
          </div>
        ) : (
          <p className="font-body text-text-muted text-sm">
            Состав учёного совета обновляется. Пожалуйста, зайдите позже.
          </p>
        )}
      </section>

      <section className="bg-bg-primary py-20 px-6 sm:px-10 lg:px-20">
        <p className="font-body text-[11px] text-accent uppercase tracking-label leading-none mb-8">
          // ДОКУМЕНТЫ И РЕСУРСЫ
        </p>
        <h2 className="font-display text-3xl md:text-4xl text-text-primary leading-tight mb-12">
          Справочные материалы
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[2px]">
          {FACULTY_RESOURCE_GROUPS.map((group) => (
            <div key={group.id} className="bg-bg-section p-6">
              <p className="font-body text-[11px] text-accent uppercase tracking-label leading-none mb-5">
                // {group.label}
              </p>
              <div className="flex flex-col">
                {group.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="font-body text-sm text-text-secondary hover:text-accent transition-colors py-2 border-b border-border-col last:border-0"
                  >
                    {link.label} →
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
