import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'

export const metadata: Metadata = {
  title: 'Профсоюз — ФРКТ БГУ',
  description:
    'Первичная профсоюзная организация факультета радиофизики и компьютерных технологий БГУ.',
}

function readContent(filename: string): string {
  const filePath = path.join(process.cwd(), 'src', 'content', filename)
  if (!fs.existsSync(filePath)) return ''
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { content } = matter(raw)
  return content
}

export default function ProfRctPage() {
  const content = readContent('faculty_prof_rct.mdx')

  return (
    <div data-pagefind-body>
      <section className="bg-bg-primary pt-32 pb-16 px-6 sm:px-10 lg:px-20 border-b border-border-col">
        <p className="font-body text-[11px] text-accent uppercase tracking-label leading-none mb-6">
          // ВНУТРЕННИЕ ОРГАНИЗАЦИИ
        </p>
        <h1 className="font-display text-5xl md:text-6xl text-text-primary leading-[0.97] tracking-tight mb-4">
          ПРОФСОЮЗ
        </h1>
        <p className="font-body text-base text-text-secondary leading-[1.75] max-w-xl">
          Первичная профсоюзная организация работников факультета
        </p>
      </section>

      <section className="bg-bg-primary py-12 px-6 sm:px-10 lg:px-20">
        {content ? (
          <div className="prose prose-sm max-w-none prose-a:hover:underline">
            <MDXRemote
              source={content}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
            />
          </div>
        ) : (
          <p className="font-body text-text-muted text-sm">
            Раздел готовится к публикации.
          </p>
        )}
      </section>
    </div>
  )
}
