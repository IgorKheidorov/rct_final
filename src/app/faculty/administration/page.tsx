import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import PersonCard from '@/components/ui/PersonCard'

export const metadata: Metadata = {
  title: 'Руководство — ФРКТ БГУ',
  description: 'Руководство факультета радиофизики и компьютерных технологий БГУ.',
}

/** Статический экспорт: страница только SSG, без динамики на сервере. */
export const dynamic = 'force-static'

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

/** Чтение один раз при загрузке модуля (сборка / prerender), не в теле рендера. */
const mdxBody = readContent('faculty_administration.mdx')

export default function AdministrationPage() {
  const content = mdxBody

  return (
    <div data-pagefind-body>
      {/* Header */}
      <section className="bg-bg-primary pt-32 pb-16 px-6 sm:px-10 lg:px-20 border-b border-border-col">
        <p className="font-body text-[11px] text-accent uppercase tracking-label leading-none mb-6">
          // РУКОВОДСТВО
        </p>
        <h1 className="font-display text-5xl md:text-6xl text-text-primary leading-[0.97] tracking-tight">
          АДМИНИСТРАЦИЯ ФАКУЛЬТЕТА
        </h1>
      </section>

      {/* Dean */}
      <section className="bg-bg-section py-16 px-6 sm:px-10 lg:px-20 border-b border-border-col">
        <p className="font-body text-[11px] text-accent uppercase tracking-label leading-none mb-10">
          // ДЕКАН ФАКУЛЬТЕТА
        </p>
        <div className="flex flex-col sm:flex-row gap-10 items-start">
          <img
            src="/images/staff/photo_5253703610099941488_y_06ae2a6ba4.jpg"
            alt="Ушаков Дмитрий Владимирович"
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover flex-shrink-0 border border-border-col"
          />
          <div>
            <p className="font-body text-[11px] text-accent uppercase tracking-label mb-2">
              ДЕКАН
            </p>
            <h2 className="font-display text-2xl md:text-3xl text-text-primary mb-2">
              Ушаков Дмитрий Владимирович
            </h2>
            <p className="font-body text-sm text-text-secondary mb-6">
              Д-р физ.-мат. наук, доцент
            </p>
            <div className="flex flex-col gap-2">
              <a
                href="tel:+375172095903"
                className="font-body text-sm text-text-secondary hover:text-accent transition-colors duration-200"
              >
                +375 (17) 209-59-03
              </a>
              <a
                href="mailto:ushakovdv@bsu.by"
                className="font-body text-sm text-text-secondary hover:text-accent transition-colors duration-200"
              >
                ushakovdv@bsu.by
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* MDX content */}
      {content && (
        <section className="bg-bg-primary py-12 px-6 sm:px-10 lg:px-20">
          <div className="prose prose-sm max-w-none prose-a:hover:underline">
            <MDXRemote source={content} components={{ PersonCard }} />
          </div>
        </section>
      )}
    </div>
  )
}
