import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import PageHero from '@/components/layout/PageHero'
import PageHub from '@/components/layout/PageHub'

export const metadata: Metadata = {
  title: 'Абитуриентам — ФРКТ БГУ',
  description:
    'Поступление в ФРКТ БГУ 2026. Правила приёма, плановый набор, вступительные испытания, общежитие, дни открытых дверей.',
}

const BACHELOR_TABLE = [
  { specialty: 'Радиофизика и информационные технологии', code: '6-05-0533-05', budget: 86, paid: 10 },
  { specialty: 'Прикладная информатика', code: '6-05-0533-11', budget: 42, paid: 10 },
  { specialty: 'Кибербезопасность', code: '6-05-0533-12', budget: 42, paid: 10 },
  { specialty: 'Интеллектуальная электроника', code: '6-05-0533-15', budget: 22, paid: 2 },
]

const MASTER_TABLE = [
  { specialty: 'Радиофизика и информационные технологии', code: '7-06-0533-03', budget: 10, paid: 3 },
  { specialty: 'Кибербезопасность', code: '7-06-0533-08', budget: 13, paid: 1 },
  { specialty: 'Аэрокосмические технологии', code: '7-06-0533-09', budget: 5, paid: 1 },
]

const DOCUMENTS = [
  { title: 'Правила приёма 2026 (актуальные)', file: '/docs/admission_rules_2026.pdf' },
  { title: 'Порядок приёма в БГУ 2025', file: '/docs/bsu_admission_procedure_2025.pdf' },
  { title: 'Особенности приёма ФРКТ 2025', file: '/docs/rcft_admission_features_2025.pdf' },
  { title: 'Категории льготников', file: '/docs/preferential_categories.pdf' },
]

const SYLLABI_BACHELOR = [
  'Интеллектуальная электроника',
  'Кибербезопасность / Безопасность КТиС',
  'Анализ больших данных и биоинформатика',
  'Интеллектуальные и киберфизические системы',
  'Аэрокосмические технологии',
  'Информатика, программируемая электроника и измерительные системы',
  'Компьютерное проектирование и технология микроэлектронных систем',
  'Фотоника и прикладные компьютерные технологии',
  'Радиофизика и цифровые технологии',
]

const SYLLABI_MASTER = [
  'Аэрокосмические технологии (английский)',
  'Кибербезопасность (английский)',
  'Радиофизика и информационные технологии',
  'Кибербезопасность',
  'Аэрокосмические технологии',
]

const INTERNATIONAL_PARTNERS = {
  'Германия': [
    'Рурский университет',
    'Университет Йены',
    'Университет Магдебурга',
    'Институт цифровых медиатехнологий Ильменау',
  ],
  'Дания': ['Орхусский университет'],
  'Нидерланды': ['Университет Вагенингена', 'Лейденский университет'],
  'Италия': ['Университет Тренто'],
  'Швейцария': ['Бернский университет'],
  'Бельгия': ['Лёвенский университет'],
  'Польша': ['Люблинский политехнический университет'],
  'Франция': ['Лионская высшая школа', 'Институт Марии Кюри / IMRA-EUROPE/TOYOTA, Ницца'],
  'Россия': ['Ведущие российские университеты'],
}

const ADMISSIONS_HUB = [
  {
    id: 'places',
    title: 'Плановый набор',
    description: 'Бюджетные и платные места по специальностям бакалавриата и магистратуры.',
  },
  {
    id: 'requirements',
    title: 'Вступительные испытания',
    description: 'Перечень вступительных испытаний и особенности приёма.',
  },
  {
    id: 'targeted',
    title: 'Целевой приём',
    description: 'Информация для абитуриентов с целевым направлением.',
  },
  {
    id: 'documents',
    title: 'Документы',
    description: 'Правила приёма, порядок подачи документов и льготы.',
  },
  {
    id: 'open-days',
    title: 'Дни открытых дверей',
    description: 'Даты и формат мероприятий для будущих студентов.',
  },
  {
    id: 'dormitory',
    title: 'Общежитие',
    description: 'Условия предоставления места в общежитии БГУ.',
  },
  {
    id: 'international',
    title: 'Международный приём',
    description: 'Партнёрские программы и обучение для иностранных граждан.',
  },
  {
    id: 'military',
    title: 'Военная кафедра',
    description: 'Военно-учётная специальность и военная подготовка.',
  },
] as const

export default function AdmissionsPage() {
  return (
    <div data-pagefind-body>
      <PageHero
        eyebrow="Абитуриентам"
        title="Поступление 2026"
        subtitle="Факультет радиофизики и компьютерных технологий — единственный физико-технический факультет в Республике Беларусь"
        coverImage={{
          src: '/images/specialty_digital_tech.jpg',
          alt: 'Абитуриентам: современные технологии и специальности ФРКТ',
          priority: true,
        }}
      />

      <PageHub items={ADMISSIONS_HUB} />

      {/* Dean welcome */}
      <section className="bg-bg-section py-16 px-6 sm:px-10 lg:px-20 border-b border-border-col">
        <div className="flex flex-col sm:flex-row gap-10 items-start max-w-4xl">
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 overflow-hidden rounded-full border border-border-col">
            <Image
              src="/images/staff/photo_5253703610099941488_y_06ae2a6ba4.jpg"
              alt="Ушаков Дмитрий Владимирович"
              fill
              className="object-cover"
              sizes="128px"
            />
          </div>
          <div>
            <blockquote className="font-body text-base md:text-lg text-text-secondary leading-[1.75] italic mb-6 border-l-2 border-accent pl-6">
              «Факультет радиофизики и компьютерных технологий — единственный физико-технический
              факультет в Республике Беларусь, готовящий физиков-инженеров для радиоэлектроники,
              электроники, телекоммуникаций и ИТ. Ждём вас в числе наших студентов.»
            </blockquote>
            <p className="font-display text-sm text-text-primary">Ушаков Дмитрий Владимирович</p>
            <p className="font-body text-xs text-text-muted uppercase tracking-label">
              Декан, д-р физ.-мат. наук, доцент
            </p>
          </div>
        </div>
      </section>

      {/* Enrollment stats */}
      <section
        id="places"
        className="bg-bg-primary py-16 px-6 sm:px-10 lg:px-20 border-b border-border-col"
      >
        <p className="font-body text-[11px] text-accent uppercase tracking-label leading-none mb-8">
          // ПЛАНОВЫЙ НАБОР 2026
        </p>
        <h2 className="font-display text-3xl md:text-4xl text-text-primary leading-tight mb-10">
          Бюджетные и платные места
        </h2>

        {/* Bachelor table */}
        <p className="font-body text-[11px] text-text-muted uppercase tracking-label mb-4">
          Бакалавриат (первая ступень)
        </p>
        <div className="overflow-x-auto mb-10">
          <table className="w-full font-body text-sm border-collapse">
            <thead>
              <tr className="border-b border-border-col">
                <th className="text-left py-3 pr-6 text-text-muted font-normal uppercase tracking-label text-[11px]">
                  Специальность
                </th>
                <th className="text-left py-3 pr-6 text-text-muted font-normal uppercase tracking-label text-[11px]">
                  Код
                </th>
                <th className="text-right py-3 pr-6 text-text-muted font-normal uppercase tracking-label text-[11px]">
                  Бюджет
                </th>
                <th className="text-right py-3 text-text-muted font-normal uppercase tracking-label text-[11px]">
                  Платно
                </th>
              </tr>
            </thead>
            <tbody>
              {BACHELOR_TABLE.map((row) => (
                <tr key={row.code} className="border-b border-border-col hover:bg-bg-section transition-colors duration-150">
                  <td className="py-3 pr-6 text-text-primary">{row.specialty}</td>
                  <td className="py-3 pr-6 text-text-muted font-mono text-xs">{row.code}</td>
                  <td className="py-3 pr-6 text-right text-accent font-display">{row.budget}</td>
                  <td className="py-3 text-right text-text-secondary">{row.paid}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Master table */}
        <p className="font-body text-[11px] text-text-muted uppercase tracking-label mb-4">
          Магистратура (вторая ступень)
        </p>
        <div className="overflow-x-auto">
          <table className="w-full font-body text-sm border-collapse">
            <thead>
              <tr className="border-b border-border-col">
                <th className="text-left py-3 pr-6 text-text-muted font-normal uppercase tracking-label text-[11px]">
                  Специальность
                </th>
                <th className="text-left py-3 pr-6 text-text-muted font-normal uppercase tracking-label text-[11px]">
                  Код
                </th>
                <th className="text-right py-3 pr-6 text-text-muted font-normal uppercase tracking-label text-[11px]">
                  Бюджет
                </th>
                <th className="text-right py-3 text-text-muted font-normal uppercase tracking-label text-[11px]">
                  Платно
                </th>
              </tr>
            </thead>
            <tbody>
              {MASTER_TABLE.map((row) => (
                <tr key={row.code} className="border-b border-border-col hover:bg-bg-section transition-colors duration-150">
                  <td className="py-3 pr-6 text-text-primary">{row.specialty}</td>
                  <td className="py-3 pr-6 text-text-muted font-mono text-xs">{row.code}</td>
                  <td className="py-3 pr-6 text-right text-accent font-display">{row.budget}</td>
                  <td className="py-3 text-right text-text-secondary">{row.paid}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Requirements */}
      <section
        id="requirements"
        className="bg-bg-section py-16 px-6 sm:px-10 lg:px-20 border-b border-border-col"
      >
        <p className="font-body text-[11px] text-accent uppercase tracking-label leading-none mb-8">
          // ВСТУПИТЕЛЬНЫЕ ИСПЫТАНИЯ
        </p>
        <h2 className="font-display text-3xl md:text-4xl text-text-primary leading-tight mb-8">
          Требования для поступления
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[2px] max-w-3xl">
          {[
            'Централизованный экзамен: русский язык или белорусский язык',
            'Централизованный экзамен: математика или физика',
            'Дополнительный ЦЭ: физика или математика',
            'Средний балл аттестата об общем среднем образовании',
          ].map((item, i) => (
            <div key={i} className="bg-bg-primary p-6 flex items-start gap-4">
              <span className="font-display text-2xl text-accent flex-shrink-0">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="font-body text-sm text-text-secondary leading-[1.6]">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Targeted admission */}
      <section
        id="targeted"
        className="bg-bg-primary py-16 px-6 sm:px-10 lg:px-20 border-b border-border-col"
      >
        <p className="font-body text-[11px] text-accent uppercase tracking-label leading-none mb-8">
          // ЦЕЛЕВОЙ ПРИЁМ
        </p>
        <h2 className="font-display text-3xl md:text-4xl text-text-primary leading-tight mb-6">
          Целевое направление
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="font-body text-sm text-text-secondary leading-[1.8] space-y-3">
            <p>
              <span className="text-text-muted uppercase tracking-label text-[11px]">Приём документов:</span>{' '}
              27 июня — 2 июля
            </p>
            <p>
              <span className="text-text-muted uppercase tracking-label text-[11px]">Место:</span>{' '}
              Юридический факультет, ауд. 308, ул. Ленина, 8, Минск
            </p>
            <p>
              <span className="text-text-muted uppercase tracking-label text-[11px]">Часы работы:</span>{' '}
              9:00–18:00 (выходные: 29 июня, 3 июля)
            </p>
            <p>
              <span className="text-text-muted uppercase tracking-label text-[11px]">Консультация:</span>{' '}
              7 июля
            </p>
            <p>
              <span className="text-text-muted uppercase tracking-label text-[11px]">Экзамен по физике:</span>{' '}
              8–9 июля, 9:00
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <p className="font-body text-[11px] text-text-muted uppercase tracking-label mb-1">
              Документы
            </p>
            {[
              '20 вопросов для вступительного испытания (PDF)',
              'Перечень необходимых документов',
              'Положение о целевой подготовке',
              'Положение о вступительных испытаниях',
            ].map((title) => (
              <div
                key={title}
                className="flex items-center gap-3 font-body text-sm text-text-muted"
              >
                <span aria-hidden="true" className="text-border-col">↓</span>
                <span>{title}</span>
                <span className="ml-auto font-body text-[10px] uppercase tracking-label text-text-muted border border-border-col px-2 py-0.5 shrink-0">
                  скоро
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documents */}
      <section
        id="documents"
        className="bg-bg-section py-16 px-6 sm:px-10 lg:px-20 border-b border-border-col"
      >
        <p className="font-body text-[11px] text-accent uppercase tracking-label leading-none mb-8">
          // ДОКУМЕНТЫ
        </p>
        <h2 className="font-display text-3xl md:text-4xl text-text-primary leading-tight mb-8">
          Правила и регламенты
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <p className="font-body text-[11px] text-text-muted uppercase tracking-label mb-4">
              Общие документы
            </p>
            <ul className="flex flex-col gap-3">
              {DOCUMENTS.map((doc) => (
                <li key={doc.file}>
                  <a
                    href={doc.file}
                    className="flex items-center gap-3 font-body text-sm text-text-secondary hover:text-accent transition-colors duration-200"
                    download
                  >
                    <span aria-hidden="true" className="text-accent flex-shrink-0">↓</span>
                    {doc.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-body text-[11px] text-text-muted uppercase tracking-label mb-4">
              Программы первой ступени
            </p>
            <ul className="flex flex-col gap-2">
              {SYLLABI_BACHELOR.map((item) => (
                <li key={item} className="font-body text-sm text-text-secondary">
                  <span aria-hidden="true" className="text-accent mr-2">↓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Open days */}
      <section
        id="open-days"
        className="bg-bg-primary py-16 px-6 sm:px-10 lg:px-20 border-b border-border-col"
      >
        <p className="font-body text-[11px] text-accent uppercase tracking-label leading-none mb-8">
          // ДНИ ОТКРЫТЫХ ДВЕРЕЙ
        </p>
        <h2 className="font-display text-3xl md:text-4xl text-text-primary leading-tight mb-4">
          «Дни Радиофизика»
        </h2>
        <p className="font-body text-sm text-text-secondary leading-[1.75] max-w-xl mb-10">
          Бесплатное участие. Встречи с руководством, разъяснение правил приёма, экскурсии по
          лабораториям, рассказ о студенческой жизни.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[2px]">
          <div className="bg-bg-section p-8">
            <p className="font-body text-[11px] text-accent uppercase tracking-label mb-3">
              БЛИЖАЙШЕЕ МЕРОПРИЯТИЕ
            </p>
            <p className="font-display text-xl text-text-primary mb-2">
              28 марта 2026, 11:00
            </p>
            <p className="font-body text-sm text-text-secondary mb-3">
              ул. Академика Курчатова, 5, ауд. 115
            </p>
            <p className="font-body text-xs text-text-muted">
              Контакт: Михаил Владимирович — +375(29)654-09-53
            </p>
          </div>
          <div className="bg-bg-section p-8">
            <p className="font-body text-[11px] text-accent uppercase tracking-label mb-3">
              ЕДИНЫЙ ДЕНЬ БГУ
            </p>
            <p className="font-display text-xl text-text-primary mb-2">
              21 марта 2026
            </p>
            <p className="font-body text-sm text-text-secondary">
              пр. Независимости, 116
            </p>
          </div>
        </div>
      </section>

      {/* Dormitory */}
      <section
        id="dormitory"
        className="bg-bg-section py-16 px-6 sm:px-10 lg:px-20 border-b border-border-col"
      >
        <p className="font-body text-[11px] text-accent uppercase tracking-label leading-none mb-8">
          // ОБЩЕЖИТИЕ
        </p>
        <h2 className="font-display text-3xl md:text-4xl text-text-primary leading-tight mb-6">
          Проживание
        </h2>
        <p className="font-body text-base text-text-secondary leading-[1.75] max-w-2xl mb-6">
          Общежития БГУ №10 и №3 по ул. Академика Курчатова, 10. Блочное проживание.
        </p>
        <a
          href="https://studgorodok.bsu.by/index.php/all-docs/registr-docs"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block border border-border-col text-text-secondary font-body text-sm uppercase tracking-label px-6 py-3 hover:border-accent hover:text-accent transition-colors duration-200"
        >
          Условия проживания studgorodok.bsu.by →
        </a>
      </section>

      {/* International */}
      <section
        id="international"
        className="bg-bg-primary py-16 px-6 sm:px-10 lg:px-20 border-b border-border-col"
      >
        <p className="font-body text-[11px] text-accent uppercase tracking-label leading-none mb-8">
          // МЕЖДУНАРОДНЫЕ ПАРТНЁРЫ
        </p>
        <h2 className="font-display text-3xl md:text-4xl text-text-primary leading-tight mb-10">
          Университеты-партнёры
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(INTERNATIONAL_PARTNERS).map(([country, unis]) => (
            <div key={country}>
              <p className="font-body text-[11px] text-accent uppercase tracking-label mb-3">
                {country}
              </p>
              <ul className="flex flex-col gap-1">
                {unis.map((uni) => (
                  <li key={uni} className="font-body text-sm text-text-secondary">
                    {uni}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Military */}
      <section
        id="military"
        className="bg-bg-section py-16 px-6 sm:px-10 lg:px-20"
      >
        <h2 className="font-display text-3xl md:text-4xl text-text-primary leading-tight mb-6">
          Военная кафедра
        </h2>
        <p className="font-body text-base text-text-secondary leading-[1.75] max-w-2xl">
          Возможность параллельного обучения по программе подготовки офицеров запаса на военном
          факультете БГУ.
        </p>
      </section>
    </div>
  )
}
