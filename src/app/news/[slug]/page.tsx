import fs from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import matter from 'gray-matter'
import { getAllNews, formatDate } from '@/lib/utils'

type Props = { params: { slug: string } }

export const dynamicParams = false

export async function generateStaticParams() {
  const newsDir = path.join(process.cwd(), 'src', 'content', 'news')
  if (!fs.existsSync(newsDir)) return []
  return fs
    .readdirSync(newsDir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => ({ slug: f.replace(/\.mdx$/, '') }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const filePath = path.join(process.cwd(), 'src', 'content', 'news', `${params.slug}.mdx`)
  if (!fs.existsSync(filePath)) return {}
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data } = matter(raw)
  return {
    title: (data.title as string) || 'Новость',
    description: (data.excerpt as string) || '',
    openGraph: data.image
      ? { images: [{ url: data.image as string }] }
      : undefined,
  }
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = params
  const filePath = path.join(process.cwd(), 'src', 'content', 'news', `${slug}.mdx`)
  if (!fs.existsSync(filePath)) notFound()

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data: frontmatter, content } = matter(raw)

  const title = (frontmatter.title as string) || ''
  const date = (frontmatter.date as string) || ''
  const tags: string[] = (frontmatter.tags as string[]) || []
  const image = frontmatter.image as string | undefined

  // Related news: up to 3 articles sharing at least one tag, excluding current
  const allNews = getAllNews()
  const related = allNews
    .filter(
      (n) =>
        n.slug !== slug &&
        tags.length > 0 &&
        n.tags.some((t) => tags.includes(t))
    )
    .slice(0, 3)

  const imageExists = image && fs.existsSync(path.join(process.cwd(), 'public', image))

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      {/* Breadcrumb */}
      <nav className="border-b border-border-col" aria-label="Breadcrumb">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <ol className="flex items-center gap-2 text-sm text-text-secondary flex-wrap">
            <li><Link href="/" className="hover:text-text-primary transition-colors">Главная</Link></li>
            <li aria-hidden="true" className="text-border-col">/</li>
            <li><Link href="/news" className="hover:text-text-primary transition-colors">Новости</Link></li>
            <li aria-hidden="true" className="text-border-col">/</li>
            <li className="text-text-primary truncate max-w-xs" aria-current="page">{title}</li>
          </ol>
        </div>
      </nav>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16" data-pagefind-body>
        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag) => (
              <Link
                key={tag}
                href={`/news?tag=${encodeURIComponent(tag)}`}
                className="border border-border-col text-text-secondary font-display text-xs uppercase tracking-label px-3 py-1 hover:border-accent hover:text-accent transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}

        {/* Date */}
        {date && (
          <time
            dateTime={date}
            className="block text-text-secondary text-sm font-body mb-4"
          >
            {formatDate(date)}
          </time>
        )}

        {/* Title */}
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-text-primary leading-tight mb-8">
          {title}
        </h1>

        {/* Image */}
        {imageExists && (
          <div className="relative aspect-video w-full overflow-hidden border border-border-col mb-10">
            <Image
              src={image!}
              alt={title}
              fill
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Body */}
        <div className="prose prose-invert max-w-none prose-headings:font-display prose-headings:text-text-primary prose-a:text-accent prose-strong:text-text-primary prose-p:text-text-secondary prose-li:text-text-secondary prose-img:border prose-img:border-border-col">
          <MDXRemote source={content} />
        </div>

        {/* Back link */}
        <div className="border-t border-border-col mt-12 pt-8">
          <Link
            href="/news"
            className="text-sm text-text-secondary hover:text-accent transition-colors font-display uppercase tracking-label"
          >
            ← Все новости
          </Link>
        </div>
      </article>

      {/* Related news */}
      {related.length > 0 && (
        <section className="border-t border-border-col bg-bg-section" aria-labelledby="related-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
            <h2 id="related-heading" className="font-display text-lg uppercase tracking-label text-text-secondary mb-8">
              Похожие новости
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/news/${item.slug}`}
                  className="group border border-border-col bg-bg-primary p-6 hover:border-accent transition-colors block"
                >
                  {item.date && (
                    <time dateTime={item.date} className="text-text-secondary text-xs font-body block mb-3">
                      {formatDate(item.date)}
                    </time>
                  )}
                  <p className="font-display text-text-primary group-hover:text-accent transition-colors leading-snug text-sm">
                    {item.title}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
