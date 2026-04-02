import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import PersonCard from '@/components/ui/PersonCard'
import StaffFilter from '@/components/faculty/StaffFilter'

export const metadata: Metadata = {
  title: 'Сотрудники — ФРКТ БГУ',
  description: 'Преподаватели и сотрудники факультета радиофизики и компьютерных технологий БГУ.',
}

function readContent(filename: string): string {
  const filePath = path.join(process.cwd(), 'src', 'content', filename)
  if (!fs.existsSync(filePath)) return ''
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { content } = matter(raw)
  return content
}

export default function StaffPage() {
  const content = readContent('faculty_staff.mdx')

  return (
    <div data-pagefind-body>
      {/* Header */}
      <section className="bg-bg-primary pt-32 pb-16 px-6 sm:px-10 lg:px-20 border-b border-border-col">
        <p className="font-body text-[11px] text-accent uppercase tracking-label leading-none mb-6">
          // СОТРУДНИКИ
        </p>
        <h1 className="font-display text-5xl md:text-6xl text-text-primary leading-[0.97] tracking-tight mb-4">
          ПРЕПОДАВАТЕЛИ И ПЕРСОНАЛ
        </h1>
        <p className="font-body text-base text-text-secondary leading-[1.75] max-w-xl">
          100+ преподавателей, 12 докторов наук, 32 доцента
        </p>
      </section>

      <section className="bg-bg-primary py-12 px-6 sm:px-10 lg:px-20">
        <StaffFilter>
          {content ? (
            <div className="prose prose-sm max-w-none prose-a:hover:underline">
              <MDXRemote source={content} components={{ PersonCard }} />
            </div>
          ) : (
            <p className="font-body text-text-muted text-sm">
              Информация о сотрудниках обновляется. Пожалуйста, зайдите позже.
            </p>
          )}
        </StaffFilter>
      </section>
    </div>
  )
}
