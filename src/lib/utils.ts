import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { NewsItem } from './types'

/** База загрузок CMS (как на старом сайте digital-faculty.bsu.by) */
const NEWS_CMS_UPLOAD_BASE = 'https://digital-faculty.bsu.by/data/uploads/'

/**
 * Путь к превью в frontmatter (`/images/news/...`): если файла нет в `public`,
 * подставляем URL с CMS — имена файлов совпадают с экспортом старого сайта.
 */
export function resolveNewsImageSrc(imagePath: string | undefined): string | undefined {
  if (!imagePath) return undefined
  const clean = imagePath.replace(/^\//, '')
  const abs = path.join(process.cwd(), 'public', clean)
  if (fs.existsSync(abs)) {
    return imagePath.startsWith('/') ? imagePath : `/${clean}`
  }
  const file = path.basename(imagePath)
  if (!file) return undefined
  return `${NEWS_CMS_UPLOAD_BASE}${file}`
}

export function getContentPath(relativePath: string): string {
  return path.join(process.cwd(), 'src', 'content', relativePath)
}

export function readMdxFile(filePath: string): { frontmatter: Record<string, unknown>; content: string } {
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  return { frontmatter: data, content }
}

export function getAllNews(): NewsItem[] {
  const newsDir = path.join(process.cwd(), 'src', 'content', 'news')
  if (!fs.existsSync(newsDir)) return []

  const files = fs.readdirSync(newsDir)
    .filter(f => f.endsWith('.mdx'))
    .sort()
    .reverse()

  return files.map(filename => {
    const slug = filename.replace(/\.mdx$/, '')
    const filePath = path.join(newsDir, filename)
    const { frontmatter } = readMdxFile(filePath)
    const rawImage = frontmatter.image as string | undefined
    return {
      slug,
      title: (frontmatter.title as string) || '',
      date: (frontmatter.date as string) || '',
      tags: (frontmatter.tags as string[]) || [],
      excerpt: (frontmatter.excerpt as string) || '',
      image: resolveNewsImageSrc(rawImage),
      author: frontmatter.author as string | undefined,
    }
  })
}

export function getNewsBySlug(slug: string): { frontmatter: Record<string, unknown>; content: string } | null {
  const newsDir = path.join(process.cwd(), 'src', 'content', 'news')
  const filePath = path.join(newsDir, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  return readMdxFile(filePath)
}

export function getAllNewsSlugs(): string[] {
  const newsDir = path.join(process.cwd(), 'src', 'content', 'news')
  if (!fs.existsSync(newsDir)) return []
  return fs.readdirSync(newsDir)
    .filter(f => f.endsWith('.mdx'))
    .map(f => f.replace(/\.mdx$/, ''))
}

export function getDepartmentContent(slug: string, subFile?: string): string {
  const fileName = subFile ? `${slug}-${subFile}.mdx` : `${slug}.mdx`
  const filePath = path.join(process.cwd(), 'src', 'content', 'departments', fileName)
  if (!fs.existsSync(filePath)) return ''
  const { content } = readMdxFile(filePath)
  return content
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.slice(0, length).trimEnd() + '...'
}
