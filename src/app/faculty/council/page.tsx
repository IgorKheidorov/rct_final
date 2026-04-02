import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import PersonCard from '@/components/ui/PersonCard'

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
      {/* Header */}
      <section className="bg-bg-primary pt-32 pb-16 px-6 sm:px-10 lg:px-20 border-b border-border-col">
        <p className="font-body text-[11px] text-accent uppercase tracking-label leading-none mb-6">
          // УЧЁНЫЙ СОВЕТ
        </p>
        <h1 className="font-display text-5xl md:text-6xl text-text-primary leading-[0.97] tracking-tight mb-4">
          УЧЁНЫЙ СОВЕТ ФАКУЛЬТЕТА
        </h1>
        <p className="font-body text-base text-text-secondary leading-[1.75] max-w-xl">
          Коллегиальный орган управления факультетом, координирующий научную и образовательную
          деятельность
        </p>
      </section>

      {/* Content */}
      <section className="bg-bg-primary py-12 px-6 sm:px-10 lg:px-20">
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
    </div>
  )
}
