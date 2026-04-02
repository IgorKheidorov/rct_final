import fs from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import matter from 'gray-matter'
import remarkGfm from 'remark-gfm'
import PersonCard from '@/components/ui/PersonCard'

interface DepartmentInfo {
  name: string
  head: string
  headDegree: string
  curator: string
  relatedSpecialties: { title: string; href: string }[]
}

const DEPARTMENTS: Record<string, DepartmentInfo> = {
  rdmt: {
    name: 'Кафедра радиофизики и цифровых медиа технологий',
    head: 'Максимович Елена Степановна',
    headDegree: 'Канд. техн. наук',
    curator: 'Беленькая Светлана Сергеевна',
    relatedSpecialties: [
      { title: 'Радиофизика и ИТ — трек РЦТ', href: '/programs/bachelor/rphit/rdt' },
    ],
  },
  qro: {
    name: 'Кафедра квантовой радиофизики и оптоэлектроники',
    head: 'Афоненко Александр Анатольевич',
    headDegree: 'Д-р физ.-мат. наук, профессор',
    curator: 'Кадола Елена Вацлафовна',
    relatedSpecialties: [
      { title: 'Радиофизика и ИТ — Фотоника', href: '/programs/bachelor/rphit/fpkt' },
    ],
  },
  physelnano: {
    name: 'Кафедра физической электроники и нанотехнологий',
    head: 'Борздов Владимир Михайлович',
    headDegree: 'Д-р физ.-мат. наук, профессор',
    curator: 'Василевский Юрий Георгиевич',
    relatedSpecialties: [
      { title: 'Радиофизика и ИТ — КПТМС', href: '/programs/bachelor/rphit/kptms' },
      { title: 'Интеллектуальная электроника', href: '/programs/bachelor/ie' },
    ],
  },
  ics: {
    name: 'Кафедра информатики и компьютерных систем',
    head: 'Семенович Сергей Николаевич',
    headDegree: 'Канд. техн. наук, доцент',
    curator: 'Стецко Игорь Петрович',
    relatedSpecialties: [
      { title: 'Прикладная информатика — ИКС', href: '/programs/bachelor/ai/ics' },
      { title: 'Интеллектуальная электроника', href: '/programs/bachelor/ie/ie' },
    ],
  },
  kis: {
    name: 'Кафедра интеллектуальных систем',
    head: 'Козлова Елена Ивановна',
    headDegree: 'Канд. физ.-мат. наук, доцент',
    curator: 'Штукаер Дмитрий Сергеевич',
    relatedSpecialties: [
      { title: 'Прикладная информатика — ИКС', href: '/programs/bachelor/ai/ics' },
      { title: 'Кибербезопасность', href: '/programs/bachelor/cs' },
    ],
  },
  teleit: {
    name: 'Кафедра телекоммуникаций и информационных технологий',
    head: 'Воротницкий Юрий Иосифович',
    headDegree: 'Канд. физ.-мат. наук, доцент',
    curator: 'Попко Елена Евгеньевна',
    relatedSpecialties: [
      { title: 'Кибербезопасность', href: '/programs/bachelor/cs/cs' },
    ],
  },
  sacm: {
    name: 'Кафедра системного анализа и компьютерного моделирования',
    head: 'Яцков Николай Николаевич',
    headDegree: 'Канд. физ.-мат. наук, доцент',
    curator: 'Яцков Николай Николаевич',
    relatedSpecialties: [
      { title: 'Прикладная информатика — Анализ данных', href: '/programs/bachelor/ai/bd' },
    ],
  },
  phaerotech: {
    name: 'Кафедра физики и аэрокосмических технологий',
    head: 'Сачков Владимир Алексеевич',
    headDegree: 'Д-р физ.-мат. наук, профессор',
    curator: 'Баранова Василина Сергеевна',
    relatedSpecialties: [
      { title: 'Аэрокосмические технологии', href: '/programs/bachelor/rphit/aero' },
    ],
  },
}

interface TabSection {
  id: string
  label: string
  fileKey: string
}

const BASE_TABS: TabSection[] = [
  { id: 'about', label: 'Описание', fileKey: '' },
  { id: 'directions', label: 'Научные направления', fileKey: 'scientific-directions' },
  { id: 'science', label: 'Наука', fileKey: 'science' },
  { id: 'staff', label: 'Преподаватели', fileKey: 'staff' },
  { id: 'graduates', label: 'Известные выпускники', fileKey: 'famous-graduates' },
]

function getDeptContent(slug: string, fileKey: string): string {
  const fileName = fileKey ? `${slug}-${fileKey}.mdx` : `${slug}.mdx`
  const filePath = path.join(process.cwd(), 'src', 'content', 'departments', fileName)
  if (!fs.existsSync(filePath)) return ''
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { content } = matter(raw)
  return content
}

type Props = { params: { slug: string } }

export const dynamicParams = false

export async function generateStaticParams() {
  return ['rdmt', 'qro', 'physelnano', 'ics', 'kis', 'teleit', 'sacm', 'phaerotech'].map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dept = DEPARTMENTS[params.slug]
  if (!dept) return {}
  return {
    title: dept.name,
    description: `Информация о кафедре: ${dept.name}. Руководитель: ${dept.head}.`,
  }
}

export default async function DepartmentPage({ params }: Props) {
  const { slug } = params
  const dept = DEPARTMENTS[slug]
  if (!dept) notFound()

  const tabs: TabSection[] = [...BASE_TABS]
  if (slug === 'ics') {
    tabs.push({ id: 'competencies', label: 'Компетенции', fileKey: 'competencies' })
  }

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary" data-pagefind-body>
      {/* Breadcrumb */}
      <nav className="border-b border-border-col" aria-label="Breadcrumb">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <ol className="flex items-center gap-2 text-sm text-text-secondary flex-wrap">
            <li><Link href="/" className="hover:text-text-primary transition-colors">Главная</Link></li>
            <li aria-hidden="true" className="text-border-col">/</li>
            <li><Link href="/faculty" className="hover:text-text-primary transition-colors">Факультет</Link></li>
            <li aria-hidden="true" className="text-border-col">/</li>
            <li><Link href="/faculty/departments" className="hover:text-text-primary transition-colors">Кафедры</Link></li>
            <li aria-hidden="true" className="text-border-col">/</li>
            <li className="text-text-primary truncate max-w-xs" aria-current="page">{dept.name}</li>
          </ol>
        </div>
      </nav>

      {/* Header */}
      <header className="border-b border-border-col bg-bg-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <p className="font-display text-accent text-xs tracking-label uppercase mb-4">{'// КАФЕДРА'}</p>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-text-primary leading-tight mb-8 max-w-3xl">
            {dept.name}
          </h1>

          <div className="grid sm:grid-cols-2 gap-6 mt-8">
            <div className="border border-border-col bg-bg-primary p-5">
              <p className="text-xs text-text-secondary uppercase tracking-label font-display mb-3">Заведующий кафедрой</p>
              <p className="text-text-primary font-medium mb-1">{dept.head}</p>
              <p className="text-text-secondary text-sm">{dept.headDegree}</p>
            </div>
            {dept.curator && dept.curator !== dept.head && (
              <div className="border border-border-col bg-bg-primary p-5">
                <p className="text-xs text-text-secondary uppercase tracking-label font-display mb-3">Куратор</p>
                <p className="text-text-primary font-medium">{dept.curator}</p>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Tab sections as details/summary */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="space-y-2">
          {tabs.map((tab, i) => {
            const content = getDeptContent(slug, tab.fileKey)
            return (
              <details
                key={tab.id}
                className="group border border-border-col bg-bg-section"
                {...(i === 0 ? { open: true } : {})}
              >
                <summary className="flex items-center justify-between px-6 py-4 cursor-pointer select-none hover:bg-bg-primary transition-colors list-none">
                  <span className="font-display text-sm uppercase tracking-label text-text-primary">
                    {tab.label}
                  </span>
                  <span className="text-accent text-lg font-display transition-transform group-open:rotate-45 duration-200">+</span>
                </summary>
                <div className="px-6 pb-8 pt-4 border-t border-border-col">
                  {content ? (
                    <div className="prose prose-sm max-w-none prose-a:hover:underline">
                      <MDXRemote
                        source={content}
                        components={{ PersonCard }}
                        options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
                      />
                    </div>
                  ) : (
                    <p className="text-text-secondary italic">Содержимое раздела готовится к публикации.</p>
                  )}
                </div>
              </details>
            )
          })}
        </div>

        {/* Related specialties */}
        {dept.relatedSpecialties.length > 0 && (
          <aside className="mt-12 border-t border-border-col pt-10">
            <p className="text-xs text-text-secondary uppercase tracking-label font-display mb-4">Связанные специальности</p>
            <ul className="flex flex-wrap gap-3">
              {dept.relatedSpecialties.map((spec) => (
                <li key={spec.href}>
                  <Link
                    href={spec.href}
                    className="inline-block border border-border-col px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:border-accent transition-colors"
                  >
                    {spec.title}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        )}
      </div>
    </div>
  )
}
