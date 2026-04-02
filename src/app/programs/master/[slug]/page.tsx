import fs from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import matter from 'gray-matter'

interface MasterProgram {
  specialty: string
  code: string
  budget: number
  paid: number
  english: boolean
  image: string
}

const PROGRAMS: Record<string, MasterProgram> = {
  rfitm: {
    specialty: 'Радиофизика и информационные технологии',
    code: '7-06-0533-03',
    budget: 10,
    paid: 3,
    english: false,
    image: '/images/masters_program_1.jpg',
  },
  'cs-mag': {
    specialty: 'Кибербезопасность',
    code: '7-06-0533-08',
    budget: 13,
    paid: 1,
    english: true,
    image: '/images/specialty_cybersecurity.jpg',
  },
  aerocos: {
    specialty: 'Аэрокосмические технологии',
    code: '7-06-0533-09',
    budget: 5,
    paid: 1,
    english: true,
    image: '/images/masters_aerospace.jpg',
  },
}

type Props = { params: { slug: string } }

export const dynamicParams = false

export async function generateStaticParams() {
  return ['rfitm', 'cs-mag', 'aerocos'].map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const prog = PROGRAMS[params.slug]
  if (!prog) return {}
  return {
    title: `${prog.specialty} — Магистратура`,
    description: `Магистратура. Специальность: ${prog.specialty} (${prog.code}). Бюджетных мест: ${prog.budget}.`,
  }
}

export default async function MasterProgramPage({ params }: Props) {
  const { slug } = params
  const prog = PROGRAMS[slug]
  if (!prog) notFound()

  const mdxPath = path.join(process.cwd(), 'src', 'content', 'programs', 'master', `${slug}.mdx`)
  let mdxContent: string | null = null
  if (fs.existsSync(mdxPath)) {
    const raw = fs.readFileSync(mdxPath, 'utf-8')
    const { content } = matter(raw)
    mdxContent = content
  }

  const imageExists = fs.existsSync(path.join(process.cwd(), 'public', prog.image))

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary" data-pagefind-body>
      {/* Breadcrumb */}
      <nav className="border-b border-border-col" aria-label="Breadcrumb">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <ol className="flex items-center gap-2 text-sm text-text-secondary flex-wrap">
            <li><Link href="/" className="hover:text-text-primary transition-colors">Главная</Link></li>
            <li aria-hidden="true" className="text-border-col">/</li>
            <li><Link href="/programs" className="hover:text-text-primary transition-colors">Программы</Link></li>
            <li aria-hidden="true" className="text-border-col">/</li>
            <li><Link href="/programs/master" className="hover:text-text-primary transition-colors">Магистратура</Link></li>
            <li aria-hidden="true" className="text-border-col">/</li>
            <li className="text-text-primary truncate max-w-xs" aria-current="page">{prog.specialty}</li>
          </ol>
        </div>
      </nav>

      {/* Header */}
      <header className="border-b border-border-col bg-bg-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div>
          <p className="font-display text-accent text-xs tracking-label uppercase mb-4">
            {'// МАГИСТРАТУРА · '}{prog.code}
          </p>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-text-primary leading-tight mb-6">
                {prog.specialty}
              </h1>

              {prog.english && (
                <span className="inline-block border border-accent text-accent font-display text-xs uppercase tracking-label px-3 py-1 mb-6">
                  English track available
                </span>
              )}

              {/* Enrollment */}
              <div className="mt-6 border border-border-col inline-block">
                <table className="text-sm">
                  <thead>
                    <tr className="border-b border-border-col">
                      <th className="px-6 py-3 text-left font-display text-xs uppercase tracking-label text-text-secondary">Форма</th>
                      <th className="px-6 py-3 text-left font-display text-xs uppercase tracking-label text-text-secondary">Бюджет</th>
                      <th className="px-6 py-3 text-left font-display text-xs uppercase tracking-label text-text-secondary">Платно</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-6 py-3 text-text-secondary">Дневная</td>
                      <td className="px-6 py-3 text-text-primary font-display">{prog.budget}</td>
                      <td className="px-6 py-3 text-text-primary font-display">{prog.paid}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {imageExists && (
              <div className="relative aspect-video overflow-hidden border border-border-col">
                <Image
                  src={prog.image}
                  alt={prog.specialty}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-12">
        {mdxContent ? (
          <div className="prose prose-invert max-w-none prose-headings:font-display prose-headings:text-text-primary prose-a:text-accent prose-strong:text-text-primary prose-p:text-text-secondary prose-li:text-text-secondary">
            <MDXRemote source={mdxContent} />
          </div>
        ) : (
          <p className="text-text-secondary italic">Подробное описание программы готовится к публикации.</p>
        )}

        <div className="flex flex-col sm:flex-row gap-4 border-t border-border-col pt-8">
          <Link
            href="/admissions"
            className="inline-flex items-center justify-center bg-accent text-text-primary font-display text-sm uppercase tracking-label px-7 py-3 hover:bg-accent/90 transition-colors"
          >
            ПОСТУПИТЬ
          </Link>
          <Link
            href="/programs/master"
            className="inline-flex items-center justify-center border border-border-col text-text-secondary font-display text-sm uppercase tracking-label px-7 py-3 hover:border-text-secondary hover:text-text-primary transition-colors"
          >
            ← Все программы магистратуры
          </Link>
        </div>
      </div>
    </div>
  )
}
