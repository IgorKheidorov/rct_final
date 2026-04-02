import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Обучение — ФРКТ БГУ',
  description:
    'Расписание занятий и сессий, учебный календарь 2025–2026, шаблоны дипломных и курсовых работ, образовательный портал.',
}

/** Карточка на фоне bg-bg-primary */
const surfaceOnPrimary =
  'rounded-card border border-border-col bg-bg-section/95 p-2 sm:p-0 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]'

/** Карточка на фоне bg-bg-section */
const surfaceOnSection =
  'rounded-card border border-border-col bg-bg-primary/35 p-2 sm:p-0 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)]'

const rowLinkSchedule =
  'flex w-full items-center gap-3 rounded-card px-3 py-3 font-body text-sm text-text-secondary transition-colors duration-200 hover:bg-bg-primary/30 hover:text-accent'

const rowLinkDownloadOnSection =
  'flex w-full items-center gap-3 rounded-card px-3 py-3 font-body text-sm text-text-secondary transition-colors duration-200 hover:bg-bg-section/40 hover:text-accent'

const rowLinkResource =
  'flex w-full items-center gap-3 rounded-card px-3 py-3 font-body text-sm text-text-secondary transition-colors duration-200 hover:bg-bg-section/35 hover:text-accent'

const calendarSurface =
  'rounded-card border border-border-col bg-bg-section/90 p-4 sm:p-5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]'

const calendarSurfaceAlt =
  'rounded-card border border-border-col bg-bg-primary/35 p-4 sm:p-5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)]'

const SCHEDULES = [
  {
    label: '1-й курс',
    href: 'https://docs.google.com/spreadsheets/d/1Wmsij8rOJAcOaPaKWnUphEghdldCRvXDqvX7am6Km4A/edit?gid=790282860#gid=790282860',
  },
  {
    label: '2-й курс',
    href: 'https://docs.google.com/spreadsheets/d/11LI8TxCfm8zyniVfH4gCaEzzgpTlSqHWeDob5sprBxw/edit?gid=145522605#gid=145522605',
  },
  {
    label: '3-й курс',
    href: 'https://docs.google.com/spreadsheets/d/1itE56-6GQvK2MvNBBtos2O7sGFGD0pC7zpWM4CV2OnU/edit?gid=889138812#gid=889138812',
  },
  {
    label: 'Магистратура 1-й курс (2 семестр)',
    href: 'https://docs.google.com/spreadsheets/d/1t_K6D8claz1NIq8NEGKNRZLJeIqcIp8WCgco9gZuIVk/edit?gid=0#gid=0',
  },
  {
    label: 'Магистратура 1-й курс — Cybersecurity (англ.)',
    href: 'https://docs.google.com/spreadsheets/d/17wEY5DKKRjZnIhs5voqUew7CsgjwfIQORSoDSvTUqqM/edit?gid=0#gid=0',
  },
]

const EXAMS_BACHELOR = [
  { label: 'Пересдачи (февраль)', file: '/docs/exams/makeup_feb.docx' },
  { label: 'Зимняя сессия 1–4 курс', file: '/docs/exams/winter_session_1_4.pdf' },
]

const EXAMS_MASTER = [
  { label: 'Кибербезопасность 1 курс (англ.)', file: '/docs/exams/master_cs1_en.pdf' },
  { label: 'Радиофизика и ИТ 1 курс', file: '/docs/exams/master_rfit1.pdf' },
  { label: 'Кибербезопасность 1 курс', file: '/docs/exams/master_cs1.pdf' },
  { label: 'Аэрокосмические технологии 1 курс', file: '/docs/exams/master_aero1.pdf' },
  { label: 'Радиофизика и ИТ 2 курс', file: '/docs/exams/master_rfit2.pdf' },
  { label: 'Кибербезопасность 2 курс', file: '/docs/exams/master_cs2.pdf' },
  { label: 'Аэрокосмические технологии 2 курс', file: '/docs/exams/master_aero2.pdf' },
  { label: 'Аэрокосмика 2 курс (англ.)', file: '/docs/exams/master_aero2_en.pdf' },
  { label: 'Кибербезопасность 2 курс (англ.)', file: '/docs/exams/master_cs2_en.pdf' },
]

const DIPLOMA_DOCS = [
  { label: 'Шаблон дипломной работы (.docx)', file: '/docs/diploma_template.docx' },
  { label: 'Методические указания по работе с шаблоном (.docx)', file: '/docs/diploma_instructions.docx' },
  { label: 'Образец титульного листа дипломной работы (.docx)', file: '/docs/diploma_title.docx' },
  { label: 'Задание на дипломную работу (.docx)', file: '/docs/diploma_assignment.docx' },
  { label: 'Рекомендации по дипломному проектированию (PDF)', file: '/docs/diploma_design_recommendations.pdf' },
]

const COURSEWORK_DOCS = [
  { label: 'Образец титульного листа курсовой работы (.docx)', file: '/docs/coursework_title.docx' },
  { label: 'Задание по курсовой работе (.docx)', file: '/docs/coursework_assignment.docx' },
  {
    label: 'Рекомендации по курсовому проектированию (PDF)',
    file: '/docs/coursework_design_recommendations.pdf',
  },
  { label: 'Образец оформления ссылок на источники (.docx)', file: '/docs/citation_format.docx' },
]

const RESOURCES = [
  { label: 'Образовательный портал ФРКТ', href: 'https://edurfe.bsu.by/' },
  { label: 'Электронная библиотека БГУ', href: 'https://elib.bsu.by/' },
  {
    label: 'Правила поведения студентов БГУ',
    href: 'https://bsu.by/odno-okno/administartivnie-proceduri/students',
  },
  { label: 'VK факультета', href: 'https://vk.com/rfikt_bsu' },
  { label: 'Instagram факультета', href: 'https://www.instagram.com/rfikt.bsu/' },
  { label: 'VK БГУ', href: 'https://vk.com/bsu_by' },
]

export default function EducationPage() {
  return (
    <div data-pagefind-body>
      <section className="bg-bg-primary pt-32 pb-16 px-6 sm:px-10 lg:px-20 border-b border-border-col">
        <p className="font-body text-[11px] text-accent uppercase tracking-label leading-none mb-6">
          // ОБУЧЕНИЕ
        </p>
        <h1 className="font-display text-5xl md:text-6xl text-text-primary leading-[0.97] tracking-tight mb-4">
          УЧЕБНЫЙ ПРОЦЕСС
        </h1>
        <p className="font-body text-base text-text-secondary leading-relaxed max-w-xl">
          Расписание, сессии, учебный календарь и методические материалы
        </p>
      </section>

      <section
        id="schedules"
        className="bg-bg-primary py-16 px-6 sm:px-10 lg:px-20 border-b border-border-col"
      >
        <p className="font-body text-[11px] text-accent uppercase tracking-label leading-none mb-8">
          // РАСПИСАНИЕ ЗАНЯТИЙ
        </p>
        <h2 className="font-display text-3xl md:text-4xl text-text-primary leading-tight mb-8">
          Расписание
        </h2>
        <div className={surfaceOnPrimary}>
          <ul className="divide-y divide-border-col sm:rounded-card sm:overflow-hidden">
            {SCHEDULES.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={rowLinkSchedule}
                >
                  <span aria-hidden="true" className="text-accent shrink-0">
                    →
                  </span>
                  <span className="text-left">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="exams"
        className="bg-bg-section py-16 px-6 sm:px-10 lg:px-20 border-b border-border-col"
      >
        <p className="font-body text-[11px] text-accent uppercase tracking-label leading-none mb-8">
          // РАСПИСАНИЕ СЕССИЙ
        </p>
        <h2 className="font-display text-3xl md:text-4xl text-text-primary leading-tight mb-10">
          Экзаменационные сессии
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          <div className="flex flex-col gap-3">
            <p className="font-body text-[11px] text-text-muted uppercase tracking-label px-1">
              Бакалавриат 2024–2025
            </p>
            <div className={surfaceOnSection}>
              <ul className="divide-y divide-border-col sm:rounded-card sm:overflow-hidden">
                {EXAMS_BACHELOR.map((item) => (
                  <li key={item.label}>
                    <a href={item.file} className={rowLinkDownloadOnSection} download>
                      <span aria-hidden="true" className="text-accent shrink-0">
                        ↓
                      </span>
                      <span className="text-left">{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <p className="font-body text-[11px] text-text-muted uppercase tracking-label px-1">
              Магистратура 2025–2026
            </p>
            <div className={surfaceOnSection}>
              <ul className="divide-y divide-border-col sm:rounded-card sm:overflow-hidden">
                {EXAMS_MASTER.map((item) => (
                  <li key={item.label}>
                    <a href={item.file} className={rowLinkDownloadOnSection} download>
                      <span aria-hidden="true" className="text-accent shrink-0">
                        ↓
                      </span>
                      <span className="text-left">{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section
        id="calendar"
        className="bg-bg-primary py-16 px-6 sm:px-10 lg:px-20 border-b border-border-col"
      >
        <p className="font-body text-[11px] text-accent uppercase tracking-label leading-none mb-8">
          // УЧЕБНЫЙ КАЛЕНДАРЬ 2025–2026
        </p>
        <h2 className="font-display text-3xl md:text-4xl text-text-primary leading-tight mb-10">
          Учебный год
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          <div className="flex flex-col gap-3">
            <p className="font-body text-[11px] text-text-muted uppercase tracking-label px-1">
              Бакалавриат
            </p>
            <div className={calendarSurface}>
              <div className="flex flex-col divide-y divide-border-col">
                {[
                  { label: 'Осенний семестр (обучение)', value: '1 сентября 2025 — 3 января 2026' },
                  { label: 'Зимняя сессия', value: '5–24 января 2026' },
                  { label: 'Каникулы', value: '26 января — 8 февраля 2026' },
                  { label: 'Весенний семестр (обучение)', value: '9 февраля — 6 июня 2026' },
                  { label: 'Летняя сессия', value: '8–30 июня 2026' },
                  { label: 'Летние каникулы', value: '1 июля — 31 августа 2026' },
                  { label: '4-й курс: преддипломная практика', value: '2 февраля — 18 апреля 2026' },
                  { label: '4-й курс: защита дипломных работ', value: '20 апреля — 30 июня 2026' },
                ].map((row) => (
                  <div key={row.label} className="flex flex-col sm:flex-row gap-1 sm:gap-4 py-3.5 first:pt-0 last:pb-0">
                    <span className="font-body text-xs text-text-muted w-full sm:w-[13.5rem] shrink-0 leading-relaxed">
                      {row.label}
                    </span>
                    <span className="font-body text-sm text-text-primary leading-relaxed">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p className="font-body text-[11px] text-text-muted uppercase tracking-label px-1">
              Магистратура
            </p>
            <div className={calendarSurfaceAlt}>
              <div className="flex flex-col divide-y divide-border-col">
                {[
                  { label: 'Осенний семестр (обучение)', value: '1 сентября — 3 января 2026' },
                  { label: 'Зимняя сессия', value: '5–24 января 2026' },
                  { label: 'Весенний семестр (обучение)', value: '9 февраля — 6 июня 2026' },
                  { label: 'Летняя сессия', value: '8–30 июня 2026' },
                  { label: '2-й курс: НИР/стажировка', value: '2 февраля — 28 марта 2026' },
                  { label: '2-й курс: подготовка диссертации', value: '30 марта — 20 июня 2026' },
                  { label: '2-й курс: защита диссертации', value: '22–30 июня 2026' },
                ].map((row) => (
                  <div key={row.label} className="flex flex-col sm:flex-row gap-1 sm:gap-4 py-3.5 first:pt-0 last:pb-0">
                    <span className="font-body text-xs text-text-muted w-full sm:w-[13.5rem] shrink-0 leading-relaxed">
                      {row.label}
                    </span>
                    <span className="font-body text-sm text-text-primary leading-relaxed">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="documents"
        className="bg-bg-section py-16 px-6 sm:px-10 lg:px-20 border-b border-border-col"
      >
        <p className="font-body text-[11px] text-accent uppercase tracking-label leading-none mb-8">
          // МЕТОДИЧЕСКИЕ МАТЕРИАЛЫ
        </p>
        <h2 className="font-display text-3xl md:text-4xl text-text-primary leading-tight mb-10">
          Шаблоны и инструкции
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          <div className="flex flex-col gap-3">
            <p className="font-body text-[11px] text-text-muted uppercase tracking-label px-1">
              Дипломная работа
            </p>
            <div className={surfaceOnSection}>
              <ul className="divide-y divide-border-col sm:rounded-card sm:overflow-hidden">
                {DIPLOMA_DOCS.map((doc) => (
                  <li key={doc.file}>
                    <a href={doc.file} className={rowLinkDownloadOnSection} download>
                      <span aria-hidden="true" className="text-accent shrink-0">
                        ↓
                      </span>
                      <span className="text-left">{doc.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <p className="font-body text-[11px] text-text-muted uppercase tracking-label px-1">
              Курсовая работа
            </p>
            <div className={surfaceOnSection}>
              <ul className="divide-y divide-border-col sm:rounded-card sm:overflow-hidden">
                {COURSEWORK_DOCS.map((doc) => (
                  <li key={doc.file}>
                    <a href={doc.file} className={rowLinkDownloadOnSection} download>
                      <span aria-hidden="true" className="text-accent shrink-0">
                        ↓
                      </span>
                      <span className="text-left">{doc.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="resources" className="bg-bg-primary py-16 px-6 sm:px-10 lg:px-20">
        <p className="font-body text-[11px] text-accent uppercase tracking-label leading-none mb-8">
          // ПОЛЕЗНЫЕ ССЫЛКИ
        </p>
        <h2 className="font-display text-3xl md:text-4xl text-text-primary leading-tight mb-8">
          Ресурсы
        </h2>
        <div className={surfaceOnPrimary}>
          <ul className="divide-y divide-border-col sm:rounded-card sm:overflow-hidden">
            {RESOURCES.map((res) => (
              <li key={res.href}>
                <a
                  href={res.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={rowLinkResource}
                >
                  <span aria-hidden="true" className="text-accent shrink-0">
                    →
                  </span>
                  <span className="text-left">{res.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
