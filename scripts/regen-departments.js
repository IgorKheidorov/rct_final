/**
 * Regenerates all department MDX files from the original old_site source.
 * Properly parses and formats staff cards, removes all navigation chrome.
 */
const fs = require('fs')
const path = require('path')

const SRC_DIR = path.join(__dirname, '..', '..', 'rcft_site', 'old_site', 'content')
const DEST_DIR = path.join(__dirname, '..', 'src', 'content', 'departments')

const DEPT_MAP = {
  rdmt: 'rdmt',
  qro: 'qro',
  physelnano: 'physelnano',
  ics: 'ics',
  kis: 'kis',
  teleit: 'teleit',
  sacm: 'sacm',
  phaerotech: 'phaerotech',
}

const SECTION_MAP = {
  '': '',
  competencies: 'competencies',
  famous_graduates: 'famous-graduates',
  science: 'science',
  scientific_directions: 'scientific-directions',
  staff: 'staff',
}

// ─── helpers ──────────────────────────────────────────────────────────────────

function extractTitle(raw) {
  const m = raw.match(/^#\s+(.+)$/m)
  if (!m) return ''
  return m[1].replace(/\s*-\s*(Факультет|Программы|Кафедра|Поступление|О факультете).*/i, '').trim()
}

function stripCommonBoilerplate(c, keepPersonCards = false) {
  // Remove H1 page title
  c = c.replace(/^#\s+.+\n/m, '')
  // Remove > Source: lines
  c = c.replace(/^>\s+Source:.*\n/gm, '')
  // Remove empty anchor links [](#)
  c = c.replace(/^\[]\(#\)\n*/gm, '')
  c = c.replace(/\[]\(#\)/g, '')
  // Remove "Свяжитесь с нами" sidebar block up to the faculty logo
  c = c.replace(/Свяжитесь с нами:[\s\S]*?(?=\[(?:\n|\s)*!?\[)/g, '')
  // Remove faculty logo/brand block: [  ![](/logo.svg)  # Факультет... ](/)
  c = c.replace(/\[[\s\S]{0,400}?Факультет радиофизики и компьютерных технологий[\s\S]{0,200}?\]\(\/\)\n*/g, '')
  // Remove breadcrumb navigation lines
  c = c.replace(/^\[(?:\/|Главная)?\]\(\/\).*\n/gm, '')
  // Remove H2 duplicate title
  c = c.replace(/^##\s+.+\n/m, '')
  // Remove ### Специальность heading
  c = c.replace(/^###\s+Специальность:.*\n+/m, '')
  // Remove stats table block (Форма обучения ... Стоимость)
  c = c.replace(/Форма обучения[\s\S]*?(?=###\s+Описание|##\s+Описание|[А-Я][^-\n]{15,}\n)/g, '')
  // Remove ### Описание section header
  c = c.replace(/^###\s+Описание\n+/m, '')
  // Remove #### О кафедре navigation section and everything after
  c = c.replace(/^####\s+О кафедре[\s\S]*$/m, '')
  // Remove #### Кафедры navigation section and everything after
  c = c.replace(/^####\s+Кафедры[\s\S]*$/m, '')
  // Remove [Факультет]... footer line
  c = c.replace(/^\[Факультет\][\s\S]*$/m, '')
  // Remove external CDN images
  c = c.replace(/!\[.*?\]\(https?:\/\/digital-faculty\.bsu\.by\/[^)]+\)\n*/g, '')
  c = c.replace(/!\[.*?\]\(https?:\/\/[^)]+\)\n*/g, '')
  // Remove standalone photo link lines: [![](url)](path)
  c = c.replace(/^\[!\[.*?\]\([^)]+\)\]\([^)]+\)\n*/gm, '')

  if (!keepPersonCards) {
    // Remove person card blocks — [#### Name\n...\n](path) (for non-staff pages)
    c = c.replace(/\[(?:\s*####[\s\S]*?)\]\([^)]+\)\n*/g, (match) => {
      if (match.includes('####')) return ''
      return match
    })
  }

  // Fix old-site link targets
  c = c.replace(/\(\/specialties\b/g, '(/programs')
  c = c.replace(/\(\/enrollee\b/g, '(/admissions')
  // Collapse excessive blank lines
  c = c.replace(/\n{4,}/g, '\n\n\n')
  return c.trim()
}

// ─── department main page cleaner ─────────────────────────────────────────────

function cleanDeptMain(raw) {
  // keepPersonCards=false will remove [#### Name...](path) blocks
  let c = stripCommonBoilerplate(raw, false)
  c = c.replace(/\n{4,}/g, '\n\n\n')
  return c.trim()
}

// ─── staff file parser ─────────────────────────────────────────────────────────

function parseStaffContent(raw) {
  // Cut off at pagination line — everything after it is sidebar/navigation junk
  let c = raw.replace(/Страница:[\s\S]*$/, '')

  // keepPersonCards=true so person blocks survive into the state machine below
  c = stripCommonBoilerplate(c, true)

  // Remove standalone empty anchor links [](path) on their own line
  c = c.replace(/^\[\]\([^)]+\)\n*/gm, '')

  // Now parse person blocks:
  // Each person block: line containing just "[" then content lines then "](path)"
  // Followed by: optional [](path) then [email](mailto:...) | [Scopus](...) | [Scholar](...)

  const lines = c.split('\n')
  const output = []
  let i = 0

  const isDegree = (s) => /наук|канд|докт|проф|ассист/i.test(s)
  const isPhone = (s) => /^\+[\d\s\(\)-]{6,}/.test(s.trim())
  const hasContactLinks = (s) =>
    /mailto:|scopus\.com|scholar\.google/i.test(s)

  while (i < lines.length) {
    const trimmed = lines[i].trim()

    // Detect start of person block: standalone "["
    if (trimmed === '[') {
      i++
      const blockLines = []

      // Collect until ](path) — line starting with ]( followed by a path
      while (i < lines.length && !lines[i].trim().match(/^\]\([^)]+\)/)) {
        blockLines.push(lines[i])
        i++
      }
      i++ // skip ](path) closing line

      const nonEmpty = blockLines.filter(l => l.trim() !== '')
      if (nonEmpty.length > 0 && nonEmpty[0].trim().startsWith('####')) {
        const name = nonEmpty[0].replace(/^####\s+/, '').trim()

        let role = ''
        let degree = ''
        let phone = ''

        for (let j = 1; j < nonEmpty.length; j++) {
          const val = nonEmpty[j].trim()
          if (isPhone(val) && !phone) {
            phone = val
          } else if (isDegree(val) && !degree) {
            degree = val
          } else if (!role) {
            role = val
          }
        }

        output.push(`#### ${name}`)
        output.push('')

        // Build italic role+degree line
        const parts = []
        if (role) parts.push(role)
        if (degree && degree !== role) parts.push(degree)
        if (parts.length) output.push(`*${parts.join(', ')}*`)
        output.push('')

        // Skip any empty lines and standalone empty anchors [](path)
        while (i < lines.length && (
          lines[i].trim() === '' ||
          lines[i].trim().match(/^\[\]\([^)]+\)$/)
        )) {
          i++
        }

        // Gather contact line(s)
        const contactParts = []
        if (phone) contactParts.push(`Тел: ${phone}`)

        if (i < lines.length && hasContactLinks(lines[i])) {
          // Strip leading [](path) prefix from contact line if present
          const cl = lines[i].replace(/^\[\]\([^)]+\)/, '').trim()
          contactParts.push(cl)
          i++
        }

        if (contactParts.length) {
          output.push(contactParts.join(' | '))
        }

        output.push('')
        output.push('---')
        output.push('')
      }
    } else {
      // Skip standalone empty anchor lines not already stripped
      if (!trimmed.match(/^\[\]\([^)]+\)$/)) {
        output.push(lines[i])
      }
      i++
    }
  }

  // Remove trailing separator
  let result = output.join('\n').replace(/\n*---\s*$/, '')
  result = result.replace(/\n{4,}/g, '\n\n\n')
  return result.trim()
}

// ─── process all files ─────────────────────────────────────────────────────────

let count = 0

for (const [srcKey, destSlug] of Object.entries(DEPT_MAP)) {
  for (const [srcSuffix, destSuffix] of Object.entries(SECTION_MAP)) {
    const srcFile = srcSuffix
      ? `dept_${srcKey}_${srcSuffix}.md`
      : `dept_${srcKey}.md`
    const srcPath = path.join(SRC_DIR, srcFile)

    if (!fs.existsSync(srcPath)) continue

    const raw = fs.readFileSync(srcPath, 'utf-8')
    const title = extractTitle(raw)

    const cleaned = destSuffix === 'staff'
      ? parseStaffContent(raw)
      : cleanDeptMain(raw)

    const destName = destSuffix ? `${destSlug}-${destSuffix}.mdx` : `${destSlug}.mdx`
    const destPath = path.join(DEST_DIR, destName)
    const output = `---\ntitle: ${JSON.stringify(title)}\n---\n${cleaned}\n`

    fs.writeFileSync(destPath, output, 'utf-8')
    console.log(`Written: ${destName}`)
    count++
  }
}

console.log(`\nDone. Written ${count} department files.`)
