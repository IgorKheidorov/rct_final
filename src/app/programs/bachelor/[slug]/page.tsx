import fs from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import matter from 'gray-matter'

interface TrackLink {
  slug: string
  title: string
}

interface BachelorProgram {
  specialty: string
  code: string
  qualification: string
  budget: number
  paid: number
  tracks: TrackLink[]
}

const PROGRAMS: Record<string, BachelorProgram> = {
  rphit: {
    specialty: 'Радиофизика и информационные технологии',
    code: '6-05-0533-05',
    qualification: 'Радиофизик. Инженер-программист',
    budget: 86,
    paid: 10,
    tracks: [
      { slug: 'aero', title: 'Аэрокосмические технологии' },
      { slug: 'inform', title: 'Информатика, программируемая электроника и измерительные системы' },
      { slug: 'kptms', title: 'Компьютерное проектирование и технология микроэлектронных систем' },
      { slug: 'fpkt', title: 'Фотоника и прикладные компьютерные технологии' },
      { slug: 'rdt', title: 'Радиофизика и цифровые технологии' },
    ],
  },
  ai: {
    specialty: 'Прикладная информатика',
    code: '6-05-0533-11',
    qualification: 'Информатик. Программист',
    budget: 42,
    paid: 10,
    tracks: [
      { slug: 'ics', title: 'Интеллектуальные и киберфизические системы' },
      { slug: 'bd', title: 'Анализ больших данных и биоинформатика' },
    ],
  },
  cs: {
    specialty: 'Кибербезопасность',
    code: '6-05-0533-12',
    qualification: 'Специалист по защите информации',
    budget: 42,
    paid: 10,
    tracks: [
      { slug: 'cs', title: 'Безопасность компьютерных технологий и систем' },
    ],
  },
  ie: {
    specialty: 'Интеллектуальная электроника',
    code: '6-05-0533-15',
    qualification: 'Радиофизик. Инженер-программист',
    budget: 22,
    paid: 2,
    tracks: [
      { slug: 'ie', title: 'Цифровые интеллектуальные системы' },
    ],
  },
}

type Props = { params: { slug: string } }

export const dynamicParams = false

export async function generateStaticParams() {
  return ['rphit', 'ai', 'cs', 'ie'].map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const prog = PROGRAMS[params.slug]
  if (!prog) return {}
  return {
    title: prog.specialty,
    description: `Бакалавриат. Специальность: ${prog.specialty} (${prog.code}). Квалификация: ${prog.qualification}.`,
  }
}

export default async function BachelorProgramPage({ params }: Props) {
  const { slug } = params
  const prog = PROGRAMS[slug]
  if (!prog) notFound()

  const mdxPath = path.join(process.cwd(), 'src', 'content', 'programs', 'bachelor', `${slug}.mdx`)
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
            <li><Link href="/programs" className="hover:text-text-primary transition-colors">Программы</Link></li>
            <li aria-hidden="true" className="text-border-col">/</li>
            <li><Link href="/programs/bachelor" className="hover:text-text-primary transition-colors">Бакалавриат</Link></li>
            <li aria-hidden="true" className="text-border-col">/</li>
            <li className="text-text-primary truncate max-w-xs" aria-current="page">{prog.specialty}</li>
          </ol>
        </div>
      </nav>

      {/* Header */}
      <header className="border-b border-border-col bg-bg-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <p className="font-display text-accent text-xs tracking-label uppercase mb-4">
            {'// БАКАЛАВРИАТ · '}{prog.code}
          </p>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-text-primary leading-tight mb-4 max-w-3xl">
            {prog.specialty}
          </h1>
          <p className="text-text-secondary text-base mt-2">{prog.qualification}</p>

          {/* Enrollment table */}
          <div className="mt-8 inline-block border border-border-col">
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
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-16">
        {/* Tracks grid */}
        <section aria-labelledby="tracks-heading">
          <h2 id="tracks-heading" className="font-display text-lg uppercase tracking-label text-text-secondary mb-6">
            Направления подготовки
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {prog.tracks.map((track) => (
              <Link
                key={track.slug}
                href={`/programs/bachelor/${slug}/${track.slug}`}
                className="group border border-border-col bg-bg-section p-6 hover:border-accent transition-colors block"
              >
                <p className="font-display text-xs uppercase tracking-label text-accent mb-3">{'// ТРЕК'}</p>
                <p className="text-text-primary group-hover:text-text-primary transition-colors font-medium leading-snug">
                  {track.title}
                </p>
                <p className="text-accent text-xs mt-4 font-display uppercase tracking-label group-hover:underline">
                  Подробнее →
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Syllabi links */}
        <section aria-labelledby="syllabus-heading">
          <h2 id="syllabus-heading" className="font-display text-lg uppercase tracking-label text-text-secondary mb-6">
            Учебные программы
          </h2>
          <ul className="space-y-2">
            {prog.tracks.map((track) => (
              <li key={track.slug}>
                <a
                  href={`/docs/syllabi/bachelor_${track.slug}.pdf`}
                  className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-accent">↓</span>
                  {track.title} — учебный план (PDF)
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* MDX content */}
        {mdxContent ? (
          <section aria-labelledby="content-heading">
            <h2 id="content-heading" className="font-display text-lg uppercase tracking-label text-text-secondary mb-6">
              О специальности
            </h2>
            <div className="prose prose-invert max-w-none prose-headings:font-display prose-headings:text-text-primary prose-a:text-accent prose-strong:text-text-primary prose-p:text-text-secondary prose-li:text-text-secondary">
              <MDXRemote source={mdxContent} />
            </div>
          </section>
        ) : (
          <section>
            <p className="text-text-secondary italic">Подробное описание специальности готовится к публикации.</p>
          </section>
        )}

        {/* Back link */}
        <div className="border-t border-border-col pt-8">
          <Link
            href="/programs/bachelor"
            className="text-sm text-text-secondary hover:text-accent transition-colors font-display uppercase tracking-label"
          >
            ← Все программы бакалавриата
          </Link>
        </div>
      </div>
    </div>
  )
}
