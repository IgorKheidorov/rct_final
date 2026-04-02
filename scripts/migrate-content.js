'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const OLD = path.join(ROOT, 'old_site', 'content');
const NEW = path.join(ROOT, 'src', 'content');

const created = [];
const skipped = [];
const errors = [];

// ─── helpers ──────────────────────────────────────────────────────────────────

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function read(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function write(dest, content) {
  ensureDir(path.dirname(dest));
  fs.writeFileSync(dest, content, 'utf8');
  created.push(path.relative(ROOT, dest));
}

/**
 * Extract the first `## ` heading (news article title) or fall back to `# ` heading.
 * The `# ` heading always contains the site name, so prefer `## `.
 */
function extractTitle(content) {
  const h2 = content.match(/^##\s+(.+)$/m);
  if (h2) return h2[1].trim();
  const h1 = content.match(/^#\s+(.+)$/m);
  if (h1) return h1[1].trim();
  return '';
}

/**
 * Extract the page-level title (the very first `# ` heading, stripping site suffix).
 * Used for non-news pages.
 */
function extractPageTitle(content) {
  const h1 = content.match(/^#\s+(.+)$/m);
  if (!h1) return '';
  // Strip common site suffix like " - Факультет радиофизики…"
  return h1[1].replace(/\s*-\s*(Факультет|Программы|Кафедра|Поступление|О факультете).*/i, '').trim();
}

/**
 * For news: extract tags from tag-link lines like [студенты](/news?tag=students)
 */
function extractTags(content) {
  const tagMap = {
    students: 'students',
    events: 'events',
    science: 'science',
    enrollee: 'enrollee',
    media: 'media',
  };
  const tags = [];
  const tagRe = /\[(?:студенты|мероприятия|наука|абитуриентам|медиа|события)\]\(\/news\?tag=(\w+)\)/gi;
  let m;
  while ((m = tagRe.exec(content)) !== null) {
    const t = tagMap[m[1].toLowerCase()] || m[1];
    if (!tags.includes(t)) tags.push(t);
  }
  if (tags.length === 0) tags.push('events');
  return tags;
}

/**
 * Extract the first image path from markdown content.
 */
function extractImage(content) {
  const m = content.match(/!\[.*?\]\(([^)]+)\)/);
  if (!m) return null;
  const src = m[1];
  // Only return photo/image paths, skip logos
  if (/logo|icon/i.test(src)) {
    const photos = [...content.matchAll(/!\[.*?\]\(([^)]+)\)/g)];
    for (const p of photos) {
      if (!/logo|icon/i.test(p[1])) return p[1];
    }
    return null;
  }
  return src;
}

/**
 * Extract an excerpt – the first non-empty paragraph after the boilerplate.
 * Boilerplate ends at the last occurrence of ](/...) link-only paragraph before
 * the actual prose.
 */
function extractExcerpt(content) {
  // Split into lines, find paragraphs that are actual prose (not links/images/headings)
  const lines = content.split('\n');
  const prose = [];
  for (const line of lines) {
    const l = line.trim();
    if (!l) continue;
    if (l.startsWith('#')) continue;
    if (l.startsWith('[') || l.startsWith('](') || l.startsWith('![')) continue;
    if (l.startsWith('>') || l.startsWith('-') || l.startsWith('*')) continue;
    if (/^\d{1,2}\s+\w+\s+\d{4}$/.test(l)) continue; // date line
    if (/^\[?\+375/.test(l)) continue; // phone
    if (/Свяжитесь|Телефон|Подписывайтесь|Присоединяйтесь|Напишите нам/.test(l)) continue;
    prose.push(l);
  }
  const text = prose.join(' ').slice(0, 220);
  return text.length > 200 ? text.slice(0, 200).replace(/\s\S+$/, '') + '…' : text;
}

/**
 * Build minimal frontmatter for a non-news page.
 */
function buildFrontmatter(fields) {
  const lines = ['---'];
  for (const [k, v] of Object.entries(fields)) {
    if (v === undefined || v === null || v === '') continue;
    if (Array.isArray(v)) {
      lines.push(`${k}: [${v.map(x => `"${x}"`).join(', ')}]`);
    } else {
      const escaped = String(v).replace(/"/g, '\\"');
      lines.push(`${k}: "${escaped}"`);
    }
  }
  lines.push('---', '');
  return lines.join('\n');
}

/**
 * Migrate a single file: read source, prepend frontmatter, write MDX.
 */
function migrateSimple(srcPath, destPath, extraFrontmatter = {}) {
  if (!fs.existsSync(srcPath)) {
    errors.push(`MISSING source: ${path.relative(ROOT, srcPath)}`);
    return;
  }
  const content = read(srcPath);
  const title = extraFrontmatter.title || extractPageTitle(content);
  const fm = buildFrontmatter({ title, ...extraFrontmatter });
  write(destPath, fm + content);
}

/**
 * Migrate a news file with richer frontmatter.
 */
function migrateNews(srcPath, destPath) {
  if (!fs.existsSync(srcPath)) {
    errors.push(`MISSING news source: ${path.relative(ROOT, srcPath)}`);
    return;
  }
  const content = read(srcPath);
  const basename = path.basename(destPath, '.mdx');
  const dateMatch = basename.match(/^(\d{4}-\d{2}-\d{2})/);
  const date = dateMatch ? dateMatch[1] : '';
  const title = extractTitle(content);
  const tags = extractTags(content);
  const excerpt = extractExcerpt(content);
  const imgRaw = extractImage(content);
  let image;
  if (imgRaw) {
    // Normalise to /images/news/<filename>
    const imgBase = path.basename(imgRaw);
    image = `/images/news/${imgBase}`;
  }
  const fm = buildFrontmatter({ title, date, tags, excerpt, ...(image ? { image } : {}) });
  write(destPath, fm + content);
}

/**
 * Write a placeholder MDX file from raw content string.
 */
function writePlaceholder(destPath, title, bodyContent) {
  const fm = buildFrontmatter({ title });
  write(destPath, fm + bodyContent);
}

// ─── normalise news slug ───────────────────────────────────────────────────────

function normaliseNewsSlug(filename) {
  const base = path.basename(filename, '.md');
  // Keep date prefix, normalise rest
  const dateMatch = base.match(/^(\d{4}-\d{2}-\d{2})-(.+)$/);
  if (!dateMatch) return base.toLowerCase().replace(/[\s_]+/g, '-') + '.mdx';
  const prefix = dateMatch[1];
  let rest = dateMatch[2]
    .toLowerCase()
    .replace(/['\u2019]/g, '')       // remove apostrophes
    .replace(/[\s_]+/g, '-')          // spaces & underscores → dash
    .replace(/[.]+/g, '-')            // dots → dash
    .replace(/-{2,}/g, '-')           // collapse multiple dashes
    .replace(/-+$/, '');              // trim trailing dashes
  return `${prefix}-${rest}.mdx`;
}

// ─── MIGRATION PLAN ───────────────────────────────────────────────────────────

console.log('Starting content migration…\n');

// 1. Simple top-level files
const simpleFiles = [
  { src: 'home.md', dest: 'home.mdx', title: 'Факультет РКТ БГУ', description: 'Факультет радиофизики и компьютерных технологий Белорусского государственного университета' },
  { src: 'faculty.md', dest: 'faculty.mdx' },
  { src: 'faculty_administration.md', dest: 'faculty_administration.mdx' },
  { src: 'faculty_staff.md', dest: 'faculty_staff.mdx' },
  { src: 'faculty_council.md', dest: 'faculty_council.mdx' },
  { src: 'enrollee.md', dest: 'admissions.mdx' },
  { src: 'education.md', dest: 'education.mdx' },
  { src: 'science.md', dest: 'science.mdx' },
  { src: 'contacts.md', dest: 'contacts.mdx' },
];

for (const f of simpleFiles) {
  const extra = {};
  if (f.title) extra.title = f.title;
  if (f.description) extra.description = f.description;
  migrateSimple(path.join(OLD, f.src), path.join(NEW, f.dest), extra);
}

// 2. science_conferences.mdx – extract from science.md
{
  const srcPath = path.join(OLD, 'science.md');
  const destPath = path.join(NEW, 'science_conferences.mdx');
  if (fs.existsSync(srcPath)) {
    const content = read(srcPath);
    // Find all conference-related sections (lines mentioning конфер)
    const confIdx = content.indexOf('конфер');
    let confSection = '';
    if (confIdx !== -1) {
      // Take from the nearest preceding heading back 200 chars
      const before = content.lastIndexOf('\n##', confIdx);
      const start = before !== -1 ? before : Math.max(0, confIdx - 200);
      confSection = content.slice(start);
    } else {
      confSection = content;
    }
    const fm = buildFrontmatter({ title: 'Конференции' });
    write(destPath, fm + confSection);
  } else {
    errors.push('MISSING source for science_conferences: science.md');
  }
}

// 3. Department files
const deptSlugs = ['rdmt', 'qro', 'physelnano', 'ics', 'kis', 'teleit', 'sacm', 'phaerotech'];

for (const slug of deptSlugs) {
  const deptDir = path.join(NEW, 'departments');
  ensureDir(deptDir);

  // Main dept page
  migrateSimple(
    path.join(OLD, `dept_${slug}.md`),
    path.join(deptDir, `${slug}.mdx`)
  );

  // scientific_directions – skip teleit (doesn't exist), placeholder instead
  if (slug === 'teleit') {
    writePlaceholder(
      path.join(deptDir, 'teleit-scientific-directions.mdx'),
      'Научные направления',
      '# Научные направления\n\nИнформация о научных направлениях кафедры телекоммуникаций и информационных технологий уточняется.'
    );
  } else {
    migrateSimple(
      path.join(OLD, `dept_${slug}_scientific_directions.md`),
      path.join(deptDir, `${slug}-scientific-directions.mdx`)
    );
  }

  // science
  migrateSimple(
    path.join(OLD, `dept_${slug}_science.md`),
    path.join(deptDir, `${slug}-science.mdx`)
  );

  // staff
  migrateSimple(
    path.join(OLD, `dept_${slug}_staff.md`),
    path.join(deptDir, `${slug}-staff.mdx`)
  );

  // famous_graduates
  migrateSimple(
    path.join(OLD, `dept_${slug}_famous_graduates.md`),
    path.join(deptDir, `${slug}-famous-graduates.mdx`)
  );
}

// ics-competencies (only for ics)
migrateSimple(
  path.join(OLD, 'dept_ics_competencies.md'),
  path.join(NEW, 'departments', 'ics-competencies.mdx')
);

// 4. Bachelor track specialties
const bachelorTracks = [
  { src: 'specialties/aero.md', dest: 'programs/bachelor/rphit/aero.mdx' },
  { src: 'specialties/inform.md', dest: 'programs/bachelor/rphit/inform.mdx' },
  { src: 'specialties/kptms.md', dest: 'programs/bachelor/rphit/kptms.mdx' },
  { src: 'specialties/fpkt.md', dest: 'programs/bachelor/rphit/fpkt.mdx' },
  { src: 'specialties/rdt.md', dest: 'programs/bachelor/rphit/rdt.mdx' },
  { src: 'specialties/ics.md', dest: 'programs/bachelor/ai/ics.mdx' },
  { src: 'specialties/bd.md', dest: 'programs/bachelor/ai/bd.mdx' },
  { src: 'specialties/cs.md', dest: 'programs/bachelor/cs/cs.mdx' },
  { src: 'specialties/ie.md', dest: 'programs/bachelor/ie/ie.mdx' },
];
for (const f of bachelorTracks) {
  migrateSimple(path.join(OLD, f.src), path.join(NEW, f.dest));
}

// 5. Specialty overview pages
migrateSimple(
  path.join(OLD, 'specialties/rphit.md'),
  path.join(NEW, 'programs/bachelor/rphit.mdx')
);

// ai.md – create from SODL data (no source file)
writePlaceholder(
  path.join(NEW, 'programs/bachelor/ai.mdx'),
  'Прикладная информатика',
  '# Прикладная информатика\n\nСпециальность 6-05-0533-11. Квалификация: Информатик. Программист.\n\nПлановый набор: 42 бюджетных мест, 10 платных.\n\nДва направления подготовки: Интеллектуальные и киберфизические системы; Анализ больших данных и биоинформатика.'
);

migrateSimple(
  path.join(OLD, 'specialties/cs-mag.md'),
  path.join(NEW, 'programs/master/cs-mag.mdx')
);

migrateSimple(
  path.join(OLD, 'specialties/aerocos.md'),
  path.join(NEW, 'programs/master/aerocos.mdx')
);

// rfitm.mdx – create from SODL data (no source file)
writePlaceholder(
  path.join(NEW, 'programs/master/rfitm.mdx'),
  'Радиофизика и информационные технологии (магистратура)',
  '# Радиофизика и информационные технологии (магистратура)\n\nСпециальность 7-06-0533-03. Плановый набор: 10 бюджетных мест, 3 платных.\n\nРуководитель: Максимович Е.С., Канд. техн. наук.'
);

// 6. Admissions sub-pages
const admissionsFiles = [
  { src: 'enrollee/rphit.md', dest: 'admissions/rphit.mdx' },
  { src: 'enrollee/ai.md', dest: 'admissions/ai.mdx' },
  // cyrillic 'с' file – find safely via readdirSync
  null, // placeholder, handled below
  { src: 'enrollee/inelec.md', dest: 'admissions/inelec.mdx' },
  { src: 'enrollee/rfitm.md', dest: 'admissions/rfitm.mdx' },
  { src: 'enrollee/cs-mag.md', dest: 'admissions/cs-mag.mdx' },
  { src: 'enrollee/aerot.md', dest: 'admissions/aerot.mdx' },
];

for (const f of admissionsFiles) {
  if (f === null) continue;
  migrateSimple(path.join(OLD, f.src), path.join(NEW, f.dest));
}

// Handle cyrillic 'с' file safely
{
  const enrolleeDir = path.join(OLD, 'enrollee');
  const files = fs.readdirSync(enrolleeDir);
  // Find a file that starts with a Cyrillic 'с' (U+0441) and ends with s.md
  const cyrillicFile = files.find(f => f.charCodeAt(0) === 0x0441 && f.endsWith('.md'));
  if (cyrillicFile) {
    migrateSimple(
      path.join(enrolleeDir, cyrillicFile),
      path.join(NEW, 'admissions/cs.mdx')
    );
  } else {
    errors.push('MISSING cyrillic enrollee file (сs.md)');
  }
}

// 7. Science schools
migrateSimple(
  path.join(OLD, 'science/school-semiconductor.md'),
  path.join(NEW, 'science/school-semiconductor.mdx')
);
migrateSimple(
  path.join(OLD, 'science/school-informatics.md'),
  path.join(NEW, 'science/school-informatics.mdx')
);

// 8. News articles
{
  const newsDir = path.join(OLD, 'news');
  const newsFiles = fs.readdirSync(newsDir).filter(f => f.endsWith('.md'));

  const newsSlugMap = {
    '2019-11-03-cosmos2019.md': '2019-11-03-cosmos2019.mdx',
    '2020-01-22-proto2020.md': '2020-01-22-proto2020.mdx',
    '2021-04-06-bitrix2021.md': '2021-04-06-bitrix2021.mdx',
    '2021-11-28-innstart2021.md': '2021-11-28-innstart2021.mdx',
    '2022-03-15-huawer22.md': '2022-03-15-huawer22.mdx',
    "2025-04-16-People's_Guest.md": '2025-04-16-peoples-guest.mdx',
    '2025-04-24-IT-challenge2025.md': '2025-04-24-it-challenge2025.mdx',
    '2025-06-11-methodological_complex_2025.md': '2025-06-11-methodological-complex-2025.mdx',
    '2025-11-16-RCAP_2025.md': '2025-11-16-rcap-2025.mdx',
    '2025-11-25-RoboCupJunior_25.md': '2025-11-25-robocupjunior-25.mdx',
    '2025-12-24-new_year_26.md': '2025-12-24-new-year-26.mdx',
    '2026-02-13-Education_and_Career_2026.md': '2026-02-13-education-and-career-2026.mdx',
    '2026-02-19-darts_health_26.md': '2026-02-19-darts-health-26.mdx',
    '2026-02-22-100ideas_forBelarus_26.md': '2026-02-22-100ideas-forbelarus-26.mdx',
    '2026-02-23-23february26.md': '2026-02-23-23february26.mdx',
    '2026-02-26-udod_26.md': '2026-02-26-udod-26.mdx',
    '2026-03-06-8march_26.md': '2026-03-06-8march-26.mdx',
    '2026-03-10-Pozdnyakov_dv.md': '2026-03-10-pozdnyakov-dv.mdx',
    '2026-03-11-powerlifting_26.md': '2026-03-11-powerlifting-26.mdx',
    '2026-03-12-basketball_26.md': '2026-03-12-basketball-26.mdx',
    '2026-03-15-open_day_28.03.md': '2026-03-15-open-day-28-03.mdx',
  };

  for (const srcFile of newsFiles) {
    const destFile = newsSlugMap[srcFile] || normaliseNewsSlug(srcFile);
    migrateNews(
      path.join(newsDir, srcFile),
      path.join(NEW, 'news', destFile)
    );
  }
}

// ─── REPORT ───────────────────────────────────────────────────────────────────

console.log(`\n✓ Created ${created.length} files:\n`);
for (const f of created) console.log('  ', f);

if (errors.length > 0) {
  console.log(`\n⚠ Errors / skipped (${errors.length}):\n`);
  for (const e of errors) console.log('  ', e);
}

console.log('\nMigration complete.');
