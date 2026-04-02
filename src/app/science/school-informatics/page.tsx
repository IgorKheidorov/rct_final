import fs from 'fs'
import path from 'path'
import type { Metadata } from 'next'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import matter from 'gray-matter'
import PageHero from '@/components/layout/PageHero'

export const metadata: Metadata = {
  title: 'Радиофизика и информатика — ФРКТ БГУ',
  description: 'Научная школа в области радиофизики и информатики факультета радиофизики и компьютерных технологий БГУ.',
}

export default function SchoolInformaticsPage() {
  const mdxPath = path.join(process.cwd(), 'src', 'content', 'science', 'school-informatics.mdx')
  let mdxContent: string | null = null
  if (fs.existsSync(mdxPath)) {
    const raw = fs.readFileSync(mdxPath, 'utf-8')
    const { content } = matter(raw)
    mdxContent = content
  }

  return (
    <div className="min-h-screen bg-bg-primary" data-pagefind-body>
      <PageHero
        eyebrow="Научная школа"
        title="Радиофизика и информатика"
        subtitle="Ведущая научная школа факультета в области радиофизики, вычислительных методов и информатики."
        coverImage={{
          src: '/images/specialty_digital_tech.jpg',
          alt: 'Научная школа радиофизики и информатики',
          priority: true,
        }}
      />

      <section className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-20 py-16">
        {mdxContent ? (
          <div className="prose prose-sm max-w-none prose-a:hover:underline">
            <MDXRemote source={mdxContent} />
          </div>
        ) : (
          <p className="font-body text-text-muted text-sm">
            Информация о научной школе готовится к публикации.
          </p>
        )}

        <div className="border-t border-border-col mt-12 pt-8">
          <Link
            href="/science#schools"
            className="font-body text-sm text-text-secondary hover:text-accent transition-colors uppercase tracking-label"
          >
            ← Все научные школы
          </Link>
        </div>
      </section>
    </div>
  )
}
