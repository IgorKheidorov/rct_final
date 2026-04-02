import fs from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import matter from 'gray-matter'

interface SpecialtyInfo {
  name: string
  code: string
  level: 'bachelor' | 'master'
  programHref: string
}

const SPECIALTIES: Record<string, SpecialtyInfo> = {
  rphit: {
    name: 'Радиофизика и ИТ',
    code: '6-05-0533-05',
    level: 'bachelor',
    programHref: '/programs/bachelor/rphit',
  },
  ai: {
    name: 'Прикладная информатика',
    code: '6-05-0533-11',
    level: 'bachelor',
    programHref: '/programs/bachelor/ai',
  },
  cs: {
    name: 'Кибербезопасность',
    code: '6-05-0533-12',
    level: 'bachelor',
    programHref: '/programs/bachelor/cs',
  },
  inelec: {
    name: 'Интеллектуальная электроника',
    code: '6-05-0533-15',
    level: 'bachelor',
    programHref: '/programs/bachelor/ie',
  },
  rfitm: {
    name: 'Радиофизика и ИТ (магистратура)',
    code: '7-06-0533-03',
    level: 'master',
    programHref: '/programs/master/rfitm',
  },
  'cs-mag': {
    name: 'Кибербезопасность (магистратура)',
    code: '7-06-0533-08',
    level: 'master',
    programHref: '/programs/master/cs-mag',
  },
  aerot: {
    name: 'Аэрокосмические технологии',
    code: '7-06-0533-09',
    level: 'master',
    programHref: '/programs/master/aerocos',
  },
}

type Props = { params: { specialty: string } }

export const dynamicParams = false

export async function generateStaticParams() {
  return ['rphit', 'ai', 'cs', 'inelec', 'rfitm', 'cs-mag', 'aerot'].map((specialty) => ({ specialty }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const spec = SPECIALTIES[params.specialty]
  if (!spec) return {}
  return {
    title: `Поступление — ${spec.name}`,
    description: `Информация о поступлении на специальность ${spec.name} (${spec.code}) на ФРКТ БГУ.`,
  }
}

export default async function AdmissionsSpecialtyPage({ params }: Props) {
  const { specialty } = params
  const spec = SPECIALTIES[specialty]
  if (!spec) notFound()

  const mdxPath = path.join(process.cwd(), 'src', 'content', 'admissions', `${specialty}.mdx`)
  let mdxContent: string | null = null
  if (fs.existsSync(mdxPath)) {
    const raw = fs.readFileSync(mdxPath, 'utf-8')
    const { content } = matter(raw)
    mdxContent = content
  }

  const levelLabel = spec.level === 'master' ? 'МАГИСТРАТУРА' : 'БАКАЛАВРИАТ'

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary" data-pagefind-body>
      {/* Breadcrumb */}
      <nav className="border-b border-border-col" aria-label="Breadcrumb">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <ol className="flex items-center gap-2 text-sm text-text-secondary flex-wrap">
            <li><Link href="/" className="hover:text-text-primary transition-colors">Главная</Link></li>
            <li aria-hidden="true" className="text-border-col">/</li>
            <li><Link href="/admissions" className="hover:text-text-primary transition-colors">Поступление</Link></li>
            <li aria-hidden="true" className="text-border-col">/</li>
            <li className="text-text-primary" aria-current="page">{spec.name}</li>
          </ol>
        </div>
      </nav>

      {/* Header */}
      <header className="border-b border-border-col bg-bg-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <p className="font-display text-accent text-xs tracking-label uppercase mb-4">
            {'// ПОСТУПЛЕНИЕ · '}{levelLabel}{' · '}{spec.code}
          </p>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-text-primary leading-tight max-w-3xl">
            {spec.name}
          </h1>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-12">
        {/* MDX content */}
        {mdxContent ? (
          <div className="prose prose-invert max-w-none prose-headings:font-display prose-headings:text-text-primary prose-a:text-accent prose-strong:text-text-primary prose-p:text-text-secondary prose-li:text-text-secondary">
            <MDXRemote source={mdxContent} />
          </div>
        ) : (
          <p className="text-text-secondary italic">Информация о поступлении готовится к публикации.</p>
        )}

        {/* Links */}
        <div className="flex flex-col sm:flex-row gap-4 border-t border-border-col pt-8">
          <Link
            href={spec.programHref}
            className="inline-flex items-center justify-center bg-accent text-text-primary font-display text-sm uppercase tracking-label px-7 py-3 hover:bg-accent/90 transition-colors"
          >
            О программе
          </Link>
          <Link
            href="/admissions"
            className="inline-flex items-center justify-center border border-border-col text-text-secondary font-display text-sm uppercase tracking-label px-7 py-3 hover:border-text-secondary hover:text-text-primary transition-colors"
          >
            ← Все специальности
          </Link>
        </div>
      </div>
    </div>
  )
}
