const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

const CONTENT_DIR = path.join(__dirname, '..', 'src', 'content')

function cleanMdxContent(raw) {
  const { data: frontmatter, content } = matter(raw)

  let cleaned = content

  // Remove H1 title line (scraped page title)
  cleaned = cleaned.replace(/^#\s+.+?\n/m, '')

  // Remove > Source: lines
  cleaned = cleaned.replace(/^>\s+Source:.*?\n/gm, '')

  // Remove empty anchor links
  cleaned = cleaned.replace(/^\[]\(#\)\n*/gm, '')
  cleaned = cleaned.replace(/\[]\(#\)/g, '')

  // Remove "Свяжитесь с нами:" section with contact links (phone, vk, instagram, email, telegram)
  // This block ends at the faculty logo/brand link
  cleaned = cleaned.replace(
    /Свяжитесь с нами:[\s\S]*?(?=\[(?:\n|\s)*!?\[|##\s)/,
    ''
  )

  // Remove the logo/brand header block (faculty name link)
  cleaned = cleaned.replace(
    /\[[\s\S]*?Факультет радиофизики и компьютерных технологий[\s\S]*?\]\(\/\)\n*/,
    ''
  )

  // Remove breadcrumb navigation lines (lines with multiple [text](/path) inline links separated by nothing)
  cleaned = cleaned.replace(
    /^\[\/\]\(\/\)(\[.*?\]\(.*?\))+.*?\n/gm,
    ''
  )
  // Alternative breadcrumb pattern: [Home](/) [Section](/section) Title
  cleaned = cleaned.replace(
    /^\[(?:Главная|\/|Home)?\]\(\/\).*?\n/gm,
    ''
  )

  // Remove the H2 duplicate title heading (## Название программы)
  // Only remove the first H2 that looks like a title (likely duplicate)
  cleaned = cleaned.replace(/^##\s+.+?\n(?:###\s+Специальность:.*?\n)?/m, '')

  // Remove stats table block (форма обучения ... стоимость обучения)
  cleaned = cleaned.replace(
    /Форма обучения[\s\S]*?(?=###\s+Описание|##\s+Описание|Образовательная программа|Направление|Кафедра)/,
    ''
  )

  // Remove duplicate "### Описание" heading (content already has the description)
  cleaned = cleaned.replace(/^###\s+Описание\n+/m, '')

  // Remove "### Специальность: ..." heading (already shown in page template)
  cleaned = cleaned.replace(/^###\s+Специальность:.*?\n+/m, '')

  // Remove "Анализ больших данных и биоинформатика - [смотреть презентацию](...)" style intro lines
  // (just the inline "title - [see presentation]" line that precedes the real text)
  cleaned = cleaned.replace(/^[А-Яа-яЁёA-Za-z\s,"-]+ - \[смотреть презентацию\]\([^)]+\)\n*/m, '')

  // Remove ### Контакты section and everything after it
  cleaned = cleaned.replace(/^###\s+Контакты[\s\S]*$/m, '')

  // Remove footer navigation (Факультет·Программы·...)
  cleaned = cleaned.replace(/^\[Факультет\][\s\S]*$/m, '')

  // Remove external images from digital-faculty.bsu.by (broken/inaccessible)
  cleaned = cleaned.replace(/!\[.*?\]\(https?:\/\/digital-faculty\.bsu\.by\/[^)]+\)\n*/g, '')
  cleaned = cleaned.replace(/!\[.*?\]\(https?:\/\/[^)]+\)\n*/g, '')

  // Fix link targets pointing to old-site paths
  cleaned = cleaned.replace(/\(\/specialties\)/g, '/programs')
  cleaned = cleaned.replace(/\(\/enrollee\)/g, '/admissions')
  cleaned = cleaned.replace(/\(\/faculty\/departments\/([^/]+)\/staff\/[^)]+\)/g, '/faculty/departments/$1')

  // Fix "### Основные дисциплины" followed by a curriculum link - keep the link but remove the duplicate heading
  // (heading already rendered in page context)
  // Actually keep it - it's useful section structure

  // Collapse 3+ consecutive blank lines into 2
  cleaned = cleaned.replace(/\n{4,}/g, '\n\n\n')

  // Trim leading/trailing whitespace
  cleaned = cleaned.trim()

  // Reconstruct with frontmatter
  return matter.stringify(cleaned, frontmatter)
}

function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  let count = 0
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      count += processDirectory(fullPath)
    } else if (entry.name.endsWith('.mdx')) {
      const raw = fs.readFileSync(fullPath, 'utf-8')
      const cleaned = cleanMdxContent(raw)
      if (cleaned !== raw) {
        fs.writeFileSync(fullPath, cleaned, 'utf-8')
        console.log(`Cleaned: ${path.relative(CONTENT_DIR, fullPath)}`)
        count++
      }
    }
  }
  return count
}

const total = processDirectory(CONTENT_DIR)
console.log(`\nDone. Cleaned ${total} files.`)
