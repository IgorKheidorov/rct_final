import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Image from 'next/image'
import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import PageHero from '@/components/layout/PageHero'
import PageHub from '@/components/layout/PageHub'
import PersonCard from '@/components/ui/PersonCard'

export const metadata: Metadata = {
  title: 'Руководство — ФРКТ БГУ',
  description: 'Руководство факультета радиофизики и компьютерных технологий БГУ.',
}

/** Статический экспорт: страница только SSG, без динамики на сервере. */
export const dynamic = 'force-static'

const ADMIN_HUB = [
  {
    id: 'dean',
    title: 'Декан',
    description: 'Руководитель факультета, контакты.',
  },
  {
    id: 'management-team',
    title: 'Заместители и аппарат',
    description: 'Заместители декана и сотрудники деканата.',
  },
  {
    id: 'departments',
    title: 'Кафедры',
    description: 'Страницы кафедр факультета.',
  },
  {
    id: 'personnel',
    title: 'Персоналии',
    description: 'Сотрудники, деканат, совет.',
  },
  {
    id: 'faculty-council',
    title: 'Совет факультета',
    description: 'Состав и материалы.',
  },
  {
    id: 'study-disciplines',
    title: 'Учебные дисциплины',
    description: 'Каталог дисциплин.',
  },
  {
    id: 'graduation-2025',
    title: 'Выпуск 2025',
    description: 'Распределение выпускников.',
  },
  {
    id: 'ivr',
    title: 'Идеология и воспитание',
    description: 'Материалы и ссылки.',
  },
  {
    id: 'info-resources',
    title: 'Информационные ресурсы',
    description: 'Порталы и внешние сервисы.',
  },
  {
    id: 'internal-orgs',
    title: 'Внутренние организации',
    description: 'Профсоюз и др.',
  },
  {
    id: 'bsu-documents',
    title: 'Документы БГУ',
    description: 'Нормативные документы университета.',
  },
] as const

function readContent(filename: string): string {
  try {
    const filePath = path.join(process.cwd(), 'src', 'content', filename)
    if (!fs.existsSync(filePath)) return ''
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { content } = matter(raw)
    return content
  } catch {
    return ''
  }
}

const mdxBody = readContent('faculty_administration.mdx')

export default function AdministrationPage() {
  const content = mdxBody

  return (
    <div data-pagefind-body>
      <PageHero
        eyebrow="Руководство"
        title="Администрация факультета"
        subtitle="Декан, заместители, аппарат деканата и справочные разделы."
        coverImage={{
          src: '/images/faculty_building.jpg',
          alt: 'Корпус факультета радиофизики и компьютерных технологий БГУ',
          priority: true,
        }}
      />

      <PageHub items={ADMIN_HUB} aria-label="Разделы страницы администрации" />

      <section
        id="dean"
        className="scroll-mt-28 border-b border-border-col bg-bg-section px-6 py-12 sm:px-10 lg:px-20"
      >
        <div className="mx-auto max-w-4xl rounded-card border border-border-col bg-white p-6 shadow-sm sm:p-8">
          <p className="font-body text-[11px] text-accent uppercase tracking-label leading-none mb-8">
            Декан факультета
          </p>
          <div className="flex flex-col items-start gap-10 sm:flex-row">
            <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-full border border-border-col">
              <Image
                src="/images/staff/photo_5253703610099941488_y_06ae2a6ba4.jpg"
                alt="Ушаков Дмитрий Владимирович"
                fill
                className="object-cover"
                sizes="160px"
                priority
              />
            </div>
            <div>
              <p className="font-body mb-2 text-[11px] uppercase tracking-label text-accent">Декан</p>
              <h2 className="font-display mb-2 text-2xl text-heading md:text-3xl">
                Ушаков Дмитрий Владимирович
              </h2>
              <p className="font-body mb-6 text-sm text-text-secondary">Д-р физ.-мат. наук, доцент</p>
              <div className="flex flex-col gap-2">
                <a
                  href="tel:+375172095903"
                  className="font-body text-sm text-text-secondary transition-colors duration-200 hover:text-accent"
                >
                  +375 (17) 209-59-03
                </a>
                <a
                  href="mailto:ushakovdv@bsu.by"
                  className="font-body text-sm text-text-secondary transition-colors duration-200 hover:text-accent"
                >
                  ushakovdv@bsu.by
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {content ? (
        <section className="bg-bg-primary px-6 py-12 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-4xl">
            <MDXRemote source={content} components={{ PersonCard }} />
          </div>
        </section>
      ) : null}
    </div>
  )
}
