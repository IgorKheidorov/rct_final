const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

const DEPT_DIR = path.join(__dirname, '..', 'src', 'content', 'departments')

// Clean main department MDX (rdmt.mdx, qro.mdx, etc.)
function cleanDeptMain(raw) {
  const { data: frontmatter, content } = matter(raw)
  let c = content

  // Remove broken heading-in-link block: [#### Name\n\ndegree\n\n]/path
  // This appears near the end and is just the head person's card (already in page template)
  c = c.replace(/\[\s*####[^\]]+\]\(\/faculty\/departments\/[^)]+\)\n*/g, '')

  // Remove "О кафедре" navigation section (already shown as page tabs)
  c = c.replace(/####\s+О кафедре\n[\s\S]*?(?=####|\n\n\n|$)/g, (match) => {
    // Only strip if it contains department nav links
    if (match.includes('Общая информация') || match.includes('Научные направления')) return ''
    return match
  })

  // Remove "Кафедры" sidebar navigation section (navigation, not content)
  c = c.replace(/####\s+Кафедры\n[\s\S]*$/m, '')

  // Move "Контакты" section to the end cleanly (keep it, it's useful)
  // It's already at the end, just make sure "Кафедры" after it was removed

  // Fix empty anchor links leftover
  c = c.replace(/^\[\]\(\/faculty\/departments\/[^)]+\)\n*/gm, '')

  // Collapse 3+ blank lines
  c = c.replace(/\n{4,}/g, '\n\n\n')
  c = c.trim()

  return matter.stringify(c, frontmatter)
}

// Transform staff MDX files: convert broken link-wrapped headings to clean person cards
function cleanDeptStaff(raw) {
  const { data: frontmatter, content } = matter(raw)
  let c = content

  // Parse person blocks:
  // Pattern: empty anchor, then [#### Name\nrole\ndegree\nphone]/path, then empty anchor + [email] | [links]
  // Transform to: #### Name\n\n*role, degree*\n\nTel: phone | links
  const persons = []

  // Match each person block
  // Block starts with optional []/dept and then [\n\n#### Name\n\nrole\n\ndegree\n\nphone\n\n]/path
  const blockRegex = /\[\s*\n\s*####\s+(.+?)\n+([^\n]+)\n+([^\n]+)\n+([^\n]+)\n+\]\(\/faculty\/departments\/\w+\)\n+(?:\[\]\(\/faculty\/departments\/\w+\))?([^\n]*)/g

  let lastIndex = 0
  const parts = []
  let match

  // Reset content - strip all the nav/sidebar at the bottom first
  // Remove from "О кафедре" section onwards if present
  c = c.replace(/\[\s*####[^\]]+\]\(\/faculty\/departments\/[^)]+\)\n+####\s+О кафедре[\s\S]*$/m, '')
  c = c.replace(/####\s+О кафедре[\s\S]*$/m, '')
  c = c.replace(/####\s+Кафедры[\s\S]*$/m, '')

  // Remove pagination line
  c = c.replace(/Страница:\[[\s\S]*?\n/g, '')

  // Remove standalone empty anchor links
  c = c.replace(/^\[\]\(\/faculty\/departments\/[^)]+\)\n*/gm, '')

  // Now transform person blocks:
  // Format: [\n\n#### Name\n\nrole\n\ndegree\n\nphone\n\n]/path
  // followed on next line by: [email](mailto:...) | [Scopus](...) | [Scholar](...)
  // Use a state machine approach
  const lines = c.split('\n')
  const output = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // Detect start of person block: line is "[" or "[ "
    if (line.trim() === '[') {
      // Collect until we find the closing "]/faculty/..."
      const block = []
      i++
      while (i < lines.length && !lines[i].match(/^\]\(\/faculty\/departments\/\w+\)/)) {
        block.push(lines[i])
        i++
      }
      i++ // skip the closing ]/path line

      // Parse the block: name, role, degree, phone
      const nonEmpty = block.filter(l => l.trim() !== '')
      if (nonEmpty.length > 0 && nonEmpty[0].startsWith('####')) {
        const name = nonEmpty[0].replace(/^####\s+/, '').trim()
        const role = nonEmpty[1] ? nonEmpty[1].trim() : ''
        const degree = nonEmpty[2] ? nonEmpty[2].trim() : ''
        const phone = nonEmpty[3] ? nonEmpty[3].trim() : ''

        output.push(`#### ${name}`)
        output.push('')

        // Combine role and degree smartly
        if (role && degree && role !== degree) {
          output.push(`*${role}${degree ? `, ${degree}` : ''}*`)
        } else if (role || degree) {
          output.push(`*${role || degree}*`)
        }

        // Check next line for contact links
        // Skip any empty anchor links
        while (i < lines.length && lines[i].match(/^\[\]\(\/faculty\/departments\/\w+\)/)) {
          i++
        }

        // Collect contact line (email | Scopus | Scholar)
        const contactParts = []
        if (phone) contactParts.push(`Тел: ${phone}`)

        if (i < lines.length) {
          const contactLine = lines[i].trim()
          // Check if this line has contact links (email/scopus/scholar)
          if (contactLine.match(/\[.*?mailto:|scopus\.com|scholar\.google/i) ||
              contactLine.match(/\[.*?@.*?\]\(mailto:/)) {
            // Append phone if present
            const fullContact = phone
              ? `Тел: ${phone} | ${contactLine}`
              : contactLine
            output.push('')
            output.push(fullContact)
            i++
          } else if (phone) {
            output.push('')
            output.push(`Тел: ${phone}`)
          }
        } else if (phone) {
          output.push('')
          output.push(`Тел: ${phone}`)
        }

        output.push('')
        output.push('---')
        output.push('')
      }
    } else {
      output.push(line)
      i++
    }
  }

  // Clean up trailing separators and extra blank lines
  let result = output.join('\n')
  result = result.replace(/---\s*$/, '')
  result = result.replace(/\n{4,}/g, '\n\n\n')
  result = result.trim()

  return matter.stringify(result, frontmatter)
}

// Detect if a file is a staff file
function isStaffFile(filename) {
  return filename.endsWith('-staff.mdx')
}

let count = 0
const files = fs.readdirSync(DEPT_DIR)

for (const file of files) {
  if (!file.endsWith('.mdx')) continue
  const fullPath = path.join(DEPT_DIR, file)
  const raw = fs.readFileSync(fullPath, 'utf-8')

  let cleaned
  if (isStaffFile(file)) {
    cleaned = cleanDeptStaff(raw)
  } else {
    cleaned = cleanDeptMain(raw)
  }

  if (cleaned !== raw) {
    fs.writeFileSync(fullPath, cleaned, 'utf-8')
    console.log(`Fixed: ${file}`)
    count++
  }
}

console.log(`\nDone. Fixed ${count} department files.`)
