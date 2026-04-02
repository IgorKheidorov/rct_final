import fs from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import matter from 'gray-matter'

interface SchoolInfo {
  name: string
}

const SCHOOLS: Record<string, SchoolInfo> = {
  semiconductor: {
    name: 'Физика полупроводников и материаловедение',
  },
  informatics: {
    name: 'Радиофизика и информатика',
  },
}

type Props = { params: { slug: string } }

export const dynamicParams = false

export async function generateStaticParams() {
  return ['semiconductor', 'informatics'].map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const school = SCHOOLS[params.slug]
  if (!school) return {}
  return {
    title: `${school.name} — Научные школы ФРКТ БГУ`,
    description: `Научная школа "${school.name}" факультета радиофизики и компьютерных технологий БГУ.`,
  }
}

export default async function ScienceSchoolPage({ params }: Props) {
  const { slug } = params
  const school = SCHOOLS[slug]
  if (!school) notFound()

  const mdxPath = path.join(process.cwd(), 'src', 'content', 'science', `school-${slug}.mdx`)
  let mdxContent: string | null = null
  if (fs.existsSync(mdxPath)) {
    const raw = fs.readFileSync(mdxPath, 'utf-8')
    const { content } = matter(raw)
    mdxContent = content
  }

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary" data-pagefind-body>
      {/* Breadcrumb */}
      <nav className="border-b border-border-col" aria-label="Breadcrumb">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <ol className="flex items-center gap-2 text-sm text-text-secondary flex-wrap">
            <li><Link href="/" className="hover:text-text-primary transition-colors">Главная</Link></li>
            <li aria-hidden="true" className="text-border-col">/</li>
            <li><Link href="/science" className="hover:text-text-primary transition-colors">Наука</Link></li>
            <li aria-hidden="true" className="text-border-col">/</li>
            <li><Link href="/science#schools" className="hover:text-text-primary transition-colors">Научные школы</Link></li>
            <li aria-hidden="true" className="text-border-col">/</li>
            <li className="text-text-primary truncate max-w-xs" aria-current="page">{school.name}</li>
          </ol>
        </div>
      </nav>

      {/* Header */}
      <header className="border-b border-border-col bg-bg-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <p className="font-display text-accent text-xs tracking-label uppercase mb-4">{'// НАУЧНАЯ ШКОЛА'}</p>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-text-primary leading-tight max-w-3xl">
            {school.name}
          </h1>
          <p className="text-text-secondary mt-3 text-sm">ФРКТ БГУ</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-12">
        {mdxContent ? (
          <div className="prose prose-invert max-w-none prose-headings:font-display prose-headings:text-text-primary prose-a:text-accent prose-strong:text-text-primary prose-p:text-text-secondary prose-li:text-text-secondary">
            <MDXRemote source={mdxContent} />
          </div>
        ) : (
          <p className="text-text-secondary italic">Информация о научной школе готовится к публикации.</p>
        )}

        <div className="border-t border-border-col pt-8">
          <Link
            href="/science#schools"
            className="text-sm text-text-secondary hover:text-accent transition-colors font-display uppercase tracking-label"
          >
            ← Все научные школы
          </Link>
        </div>
      </div>
    </div>
  )
}
