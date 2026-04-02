import fs from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import matter from 'gray-matter'

interface TrackData {
  title: string
  specialtyTitle: string
  specialtySlug: string
  head: string
  curator?: string
  image: string
  admissionsSlug: string
}

const TRACKS: Record<string, Record<string, TrackData>> = {
  rphit: {
    aero: {
      title: 'Аэрокосмические технологии',
      specialtyTitle: 'Радиофизика и информационные технологии',
      specialtySlug: 'rphit',
      head: 'Сачков В.А., Д-р физ.-мат. наук, профессор',
      curator: 'Баранова В.С.',
      image: '/images/specialty_aerospace.jpg',
      admissionsSlug: 'rphit',
    },
    inform: {
      title: 'Информатика, программируемая электроника и измерительные системы',
      specialtyTitle: 'Радиофизика и информационные технологии',
      specialtySlug: 'rphit',
      head: 'Стецко И.П., Канд. техн. наук, доцент',
      image: '/images/specialty_informatics.jpg',
      admissionsSlug: 'rphit',
    },
    kptms: {
      title: 'Компьютерное проектирование и технология микроэлектронных систем',
      specialtyTitle: 'Радиофизика и информационные технологии',
      specialtySlug: 'rphit',
      head: 'Борздов В.М., Д-р физ.-мат. наук, профессор',
      curator: 'Василевский Ю.Г.',
      image: '/images/specialty_microelectronics.jpg',
      admissionsSlug: 'rphit',
    },
    fpkt: {
      title: 'Фотоника и прикладные компьютерные технологии',
      specialtyTitle: 'Радиофизика и информационные технологии',
      specialtySlug: 'rphit',
      head: 'Афоненко А.А., Д-р физ.-мат. наук, профессор',
      curator: 'Кадола Е.В.',
      image: '/images/specialty_photonics.jpg',
      admissionsSlug: 'rphit',
    },
    rdt: {
      title: 'Радиофизика и цифровые технологии',
      specialtyTitle: 'Радиофизика и информационные технологии',
      specialtySlug: 'rphit',
      head: 'Максимович Е.С., Канд. техн. наук',
      curator: 'Беленькая С.С.',
      image: '/images/specialty_digital_tech.jpg',
      admissionsSlug: 'rphit',
    },
  },
  ai: {
    ics: {
      title: 'Интеллектуальные и киберфизические системы',
      specialtyTitle: 'Прикладная информатика',
      specialtySlug: 'ai',
      head: 'Козлова Е.И., Канд. физ.-мат. наук, доцент',
      curator: 'Штукаер Д.С.',
      image: '/images/specialty_intelligent_systems.jpg',
      admissionsSlug: 'ai',
    },
    bd: {
      title: 'Анализ больших данных и биоинформатика',
      specialtyTitle: 'Прикладная информатика',
      specialtySlug: 'ai',
      head: 'Яцков Н.Н., Канд. физ.-мат. наук, доцент',
      image: '/images/specialty_bioinformatics.jpg',
      admissionsSlug: 'ai',
    },
  },
  cs: {
    cs: {
      title: 'Безопасность компьютерных технологий и систем',
      specialtyTitle: 'Кибербезопасность',
      specialtySlug: 'cs',
      head: 'Воротницкий Ю.И., Канд. физ.-мат. наук, доцент',
      curator: 'Попко Е.Е.',
      image: '/images/specialty_cybersecurity.jpg',
      admissionsSlug: 'cs',
    },
  },
  ie: {
    ie: {
      title: 'Цифровые интеллектуальные системы',
      specialtyTitle: 'Интеллектуальная электроника',
      specialtySlug: 'ie',
      head: 'Семенович С.Н., Канд. техн. наук',
      curator: 'Стецко И.П.',
      image: '/images/specialty_intelligent_electronics.jpg',
      admissionsSlug: 'inelec',
    },
  },
}

type Props = { params: { slug: string; track: string } }

export const dynamicParams = false

export async function generateStaticParams() {
  const pairs: { slug: string; track: string }[] = []
  for (const [slug, tracks] of Object.entries(TRACKS)) {
    for (const track of Object.keys(tracks)) {
      pairs.push({ slug, track })
    }
  }
  return pairs
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const trackData = TRACKS[params.slug]?.[params.track]
  if (!trackData) return {}
  return {
    title: trackData.title,
    description: `Направление подготовки "${trackData.title}" в рамках специальности "${trackData.specialtyTitle}".`,
  }
}

export default async function TrackPage({ params }: Props) {
  const { slug, track } = params
  const trackData = TRACKS[slug]?.[track]
  if (!trackData) notFound()

  const mdxPath = path.join(
    process.cwd(),
    'src', 'content', 'programs', 'bachelor', slug, `${track}.mdx`
  )
  let mdxContent: string | null = null
  if (fs.existsSync(mdxPath)) {
    const raw = fs.readFileSync(mdxPath, 'utf-8')
    const { content } = matter(raw)
    mdxContent = content
  }

  const imageExists = fs.existsSync(
    path.join(process.cwd(), 'public', trackData.image)
  )

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
            <li>
              <Link href={`/programs/bachelor/${slug}`} className="hover:text-text-primary transition-colors">
                {trackData.specialtyTitle}
              </Link>
            </li>
            <li aria-hidden="true" className="text-border-col">/</li>
            <li className="text-text-primary truncate max-w-xs" aria-current="page">{trackData.title}</li>
          </ol>
        </div>
      </nav>

      {/* Hero with optional image */}
      <header className="border-b border-border-col bg-bg-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div>
          <p className="font-display text-accent text-xs tracking-label uppercase mb-4">
            {'// НАПРАВЛЕНИЕ ПОДГОТОВКИ'}
          </p>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-text-primary leading-tight mb-8">
                {trackData.title}
              </h1>

              <div className="grid sm:grid-cols-2 gap-4 mt-6">
                <div className="border border-border-col bg-bg-primary p-5">
                  <p className="text-xs text-text-secondary uppercase tracking-label font-display mb-2">Руководитель</p>
                  <p className="text-text-primary text-sm">{trackData.head}</p>
                </div>
                {trackData.curator && (
                  <div className="border border-border-col bg-bg-primary p-5">
                    <p className="text-xs text-text-secondary uppercase tracking-label font-display mb-2">Куратор</p>
                    <p className="text-text-primary text-sm">{trackData.curator}</p>
                  </div>
                )}
              </div>
            </div>

            {imageExists && (
              <div className="relative aspect-video lg:aspect-square overflow-hidden border border-border-col">
                <Image
                  src={trackData.image}
                  alt={trackData.title}
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
        {/* MDX content */}
        {mdxContent ? (
          <div className="prose prose-sm max-w-none prose-headings:font-display prose-headings:text-text-primary prose-a:text-accent prose-strong:text-text-primary prose-p:text-text-secondary prose-li:text-text-secondary">
            <MDXRemote source={mdxContent} />
          </div>
        ) : (
          <p className="text-text-secondary italic">Подробное описание направления готовится к публикации.</p>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 border-t border-border-col pt-8">
          <Link
            href={`/admissions/${trackData.admissionsSlug}`}
            className="inline-flex items-center justify-center bg-accent text-white font-display text-sm font-semibold px-7 py-3 hover:bg-accent/90 transition-colors"
          >
            ПОСТУПИТЬ
          </Link>
          <Link
            href={`/programs/bachelor/${slug}`}
            className="inline-flex items-center justify-center border border-border-col text-text-secondary font-display text-sm font-medium px-7 py-3 hover:border-accent hover:text-accent transition-colors"
          >
            ← {trackData.specialtyTitle}
          </Link>
        </div>
      </div>
    </div>
  )
}
