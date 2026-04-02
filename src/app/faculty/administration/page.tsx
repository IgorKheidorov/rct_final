import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'

import PageHero from '@/components/layout/PageHero'
import PageHub from '@/components/layout/PageHub'
import PersonCard from '@/components/ui/PersonCard'

export const metadata: Metadata = {
  title: 'Руководство — ФРКТ БГУ',
  description: 'Руководство факультета радиофизики и компьютерных технологий БГУ.',
}

const DEAN = {
  name: 'Ушаков Дмитрий Владимирович',
  degree: 'Д-р физ.-мат. наук, доцент',
  phone: '+375 (17) 209-59-03',
  email: 'ushakovdv@bsu.by',
  photo: '/images/staff/photo_5253703610099941488_y_06ae2a6ba4.jpg',
}

const DEPUTIES = [
  {
    name: 'Янукович Татьяна Петровна',
    role: 'заместитель декана по идеологической и воспитательной работе',
    degree: 'кандидат физ.-мат. наук, доцент',
    phone: '+375 (17) 209-59-06',
    email: 'yanukovichTP@bsu.by',
    scopus: 'https://www.scopus.com/authid/detail.uri?authorId=55965684500',
    scholar: 'https://scholar.google.com/citations?hl=ru&user=ZCnjGWYAAAAJ',
    photo: '/images/staff/yanukovich_15e8fbbbd5.png',
  },
  {
    name: 'Поляков Александр Владимирович',
    role: 'заместитель декана по учебной работе и образовательным инновациям',
    degree: 'доктор физ.-мат. наук, профессор',
    phone: '+375 (17) 209-58-17',
    email: 'polyakov@bsu.by',
    scopus: 'https://www.scopus.com/authid/detail.uri?authorId=56985351600',
    scholar: 'https://scholar.google.com/citations?user=VPPOyhEAAAAJ&hl=ru',
    photo: '/images/staff/Polyakov_foto_1a3e05304a.JPG',
  },
  {
    name: 'Людчик Олег Ростиславович',
    role: 'заместитель декана по общим вопросам и стратегическому развитию',
    degree: 'кандидат физ.-мат. наук, доцент',
    phone: '+375 (17) 398-75-45',
    email: 'lyudchik@bsu.by',
    scholar: 'https://scholar.google.com/citations?hl=ru&user=9eyEu8sAAAAJ',
    photo: '/images/staff/ludchik_b2d56837ab.jpg',
  },
  {
    name: 'Лобанок Михаил Владимирович',
    role: 'заместитель декана по учебной и профориентационной работе',
    phone: '+375 (17) 209-58-18',
    email: 'lobanokMV@bsu.by',
    scopus: 'https://www.scopus.com/authid/detail.uri?authorId=57731269600',
    scholar: 'https://scholar.google.com/citations?user=NU7dxO4AAAAJ&hl=ru',
    photo: '/images/staff/lobanok_4455f09124.jpg',
  },
  {
    name: 'Раткевич Сергей Владимирович',
    role: 'заместитель декана по научной работе и международной деятельности',
    phone: '+375 (17) 209-58-19',
    email: 'ratkevich@bsu.by',
    scopus: 'https://www.scopus.com/authid/detail.uri?authorId=55322179200',
    scholar: 'https://scholar.google.com/citations?user=kTXAUdcAAAAJ&hl=ru',
    photo: '/images/staff/ratkevich_f90955a8b7.jpg',
  },
  {
    name: 'Григорчук Елена Сергеевна',
    role: 'старший преподаватель, помощник декана по вопросам практики и распределения',
    phone: '+375 (17) 209-58-19',
    email: 'Grigorchuk@bsu.by',
    scholar: 'https://scholar.google.com/citations?hl=ru&user=JT7xC8AAAAAJ',
    photo: '/images/staff/grigorchuk_b1e1a34c5b.png',
  },
  {
    name: 'Мазаник Лариса Сергеевна',
    role: 'ведущий специалист по обеспечению учебного процесса',
    phone: '+375 (17) 209-58-18',
    email: 'MazanikLS@bsu.by',
    photo: '/images/staff/Mazanik_LS_3cb4dc8ecd.jpg',
  },
  {
    name: 'Синкевич Мирослава Марьяновна',
    role: 'методист I категории',
    phone: '+375 (17) 209-58-18',
    email: 'SinkevichMira@bsu.by',
    photo: '/images/staff/Sinkevich_MM_19448400f8.png',
  },
  {
    name: 'Богуслав Илона Сергеевна',
    role: 'специалист',
    phone: '+375 (17) 209-59-35',
    email: 'boguslavIS@bsu.by',
    photo: '/images/staff/boguslav_d207e2c422.jpg',
  },
]

const DEPARTMENTS = [
  { slug: 'rdmt', name: 'Радиофизики и цифровых медиа технологий', href: '/faculty/departments/rdmt' },
  { slug: 'qro', name: 'Квантовой радиофизики и оптоэлектроники', href: '/faculty/departments/qro' },
  { slug: 'physelnano', name: 'Физической электроники и нанотехнологий', href: '/faculty/departments/physelnano' },
  { slug: 'ics', name: 'Информатики и компьютерных систем', href: '/faculty/departments/ics' },
  { slug: 'kis', name: 'Интеллектуальных систем', href: '/faculty/departments/kis' },
  { slug: 'teleit', name: 'Телекоммуникаций и информационных технологий', href: '/faculty/departments/teleit' },
  { slug: 'sacm', name: 'Системного анализа и компьютерного моделирования', href: '/faculty/departments/sacm' },
  { slug: 'phaerotech', name: 'Физики и аэрокосмических технологий', href: '/faculty/departments/phaerotech' },
]

const RESOURCE_GROUPS = [
  {
    id: 'personnel',
    label: 'ПЕРСОНАЛИИ',
    links: [
      { label: 'Сотрудники', href: '/faculty/staff' },
      { label: 'Деканат', href: '/faculty/administration' },
      { label: 'Совет факультета', href: '/faculty/council' },
      { label: 'Профсоюз РКТ', href: '/faculty/prof-rct' },
    ],
  },
  {
    id: 'study-disciplines',
    label: 'УЧЕБНЫЙ ПРОЦЕСС',
    links: [
      { label: 'Каталог учебных дисциплин', href: '/faculty/dis-catalog' },
      { label: 'Распределение выпускников 2025', href: '/faculty/distribution-rct' },
      { label: 'Образовательный портал', href: 'https://edurfe.bsu.by/login/index.php' },
    ],
  },
  {
    id: 'ivr',
    label: 'ВОСПИТАТЕЛЬНАЯ РАБОТА',
    links: [
      { label: 'Радиофизика в годы Великой Отечественной войны', href: '/faculty/ivr-vov' },
      { label: 'О выборах 2025', href: 'https://drive.google.com/file/d/19y4fJsVwDFQ2vTDra51if8zR7n6YFoUP/view?usp=sharing' },
      { label: 'Единые дни информирования', href: 'https://minsk.gov.by/ru/actual/view/209/2024.shtml' },
      { label: 'Минский курьер. Обзор событий столицы', href: 'https://www.youtube.com/playlist?list=PLQT66kQdg6nv9jsj6I7wdEFFtlWFEbpK2' },
      { label: 'За безопасность вместе!', href: 'https://drive.google.com/file/d/1-kCvwASdnGcd3R_QlP2Zh3I6J2euSI69/view?usp=sharing' },
    ],
  },
  {
    id: 'info-resources',
    label: 'ИНФОРМАЦИОННЫЕ РЕСУРСЫ',
    links: [
      { label: 'Нормативные документы для сотрудников', href: 'https://bsu.by/sotrudnikam/normativnye-dokumenty-dlya-sotrudnikov/pravila-vnutrennego-trudovogo-rasporyadka-bgu.php' },
      { label: 'Книга памяти', href: 'https://www.mintrud.gov.by/ru/kniga-pamyati-ru' },
    ],
  },
  {
    id: 'bsu-documents',
    label: 'ДОКУМЕНТЫ БГУ',
    links: [
      { label: 'Этический кодекс БГУ', href: 'https://drive.google.com/file/d/1b2HdnTKgMLoAZO1XnRR4vVNpcPj4oQ0q/view?usp=sharing' },
      { label: 'Правила внутреннего трудового распорядка', href: 'https://drive.google.com/file/d/1jgb4RDTeFs5VOImED6YUmjhek7hbqlOe/view?usp=sharing' },
      { label: 'Правила внутреннего распорядка для обучающихся', href: 'https://drive.google.com/file/d/1xXFDrxYaLWVb82TtPEsblvleKkhD_zVN/view?usp=sharing' },
      { label: 'Положение о пропускном режиме', href: 'https://drive.google.com/file/d/1fyRUW5mXobVSaiqOhiCawWhvqwala22R/view?usp=sharing' },
      { label: 'Коллективный договор БГУ', href: 'https://drive.google.com/file/d/1sKkbBhEMwgAn1DRPj5sCwuonzxKLYVfW/view?usp=sharing' },
      { label: 'Об оказании материальной помощи обучающимся', href: 'https://drive.google.com/file/d/1uvXhUjnk-Rvxfz_Xkcy0XrS902EVEUW9H/view?usp=sharing' },
      { label: 'Об осуществлении образовательного процесса с ИКТ', href: 'https://drive.google.com/file/d/1ku_lmkt-Rvxfz_Xkcy0XrS902EVEUW9H/view?usp=sharing' },
      { label: 'Политика информационной безопасности БГУ', href: 'https://drive.google.com/file/d/1a6xjLacsqifq9pThhbxKr5UoIlT1ZazD/view?usp=sharing' },
      { label: 'Политика обработки персональных данных', href: 'https://drive.google.com/file/d/1uCAeWgBFZO1XnRR4vVNpcPj4oQ0q/view?usp=sharing' },
      { label: 'Охрана труда', href: 'https://drive.google.com/drive/folders/13gtX6JNP64kJh3LZGMP4i0S5KMG_eAns?usp=sharing' },
    ],
  },
] as const

const ADMIN_HUB = [
  {
    id: 'dean',
    title: 'Декан',
    description: 'Руководитель факультета, контакты.',
  },
  {
    id: 'management-team',
    title: 'Заместители и аппарат',
    description: 'Заместители декана и сотрудники деканата.',
  },
  {
    id: 'departments',
    title: 'Кафедры',
    description: 'Восемь кафедр факультета.',
  },
  {
    id: 'resources',
    title: 'Документы и ресурсы',
    description: 'Дисциплины, документы БГУ, порталы.',
  },
] as const

export default function AdministrationPage() {
  return (
    <div data-pagefind-body>
      <PageHero
        eyebrow="Руководство"
        title="Администрация факультета"
        subtitle="Декан, заместители, аппарат деканата и справочные разделы."
        coverImage={{
          src: '/images/faculty_building.jpg',
          alt: 'Корпус факультета радиофизики и компьютерных технологий БГУ',
          priority: true,
        }}
      />

      <PageHub items={ADMIN_HUB} aria-label="Разделы страницы администрации" />

      {/* Dean */}
      <section
        id="dean"
        className="scroll-mt-28 bg-bg-section py-20 px-6 sm:px-10 lg:px-20 border-b border-border-col"
      >
        <p className="font-body text-[11px] text-accent uppercase tracking-label leading-none mb-8">
          // ДЕКАН
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div>
            <h2 className="font-display text-3xl md:text-4xl text-text-primary leading-tight mb-6">
              Руководство факультета
            </h2>
            <p className="font-body text-base text-text-secondary leading-[1.75]">
              Факультет радиофизики и компьютерных технологий возглавляет декан при поддержке
              заместителей по ключевым направлениям деятельности: учебной, научной,
              идеологической и общей работе.
            </p>
          </div>
          <div className="bg-bg-primary rounded-card border border-border-col p-6 sm:p-8 shadow-sm">
            <p className="font-body text-[11px] text-accent uppercase tracking-label leading-none mb-6">
              Декан факультета
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border border-border-col">
                <Image
                  src={DEAN.photo}
                  alt={DEAN.name}
                  fill
                  className="object-cover"
                  sizes="96px"
                  priority
                />
              </div>
              <div>
                <h3 className="font-display text-xl text-heading mb-1">{DEAN.name}</h3>
                <p className="font-body text-sm text-text-secondary mb-4">{DEAN.degree}</p>
                <div className="flex flex-col gap-1.5">
                  <a
                    href={`tel:${DEAN.phone.replace(/[\s()-]/g, '')}`}
                    className="font-body text-sm text-text-secondary hover:text-accent transition-colors"
                  >
                    {DEAN.phone}
                  </a>
                  <a
                    href={`mailto:${DEAN.email}`}
                    className="font-body text-sm text-accent hover:underline"
                  >
                    {DEAN.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Management team */}
      <section
        id="management-team"
        className="scroll-mt-28 bg-bg-primary py-20 px-6 sm:px-10 lg:px-20 border-b border-border-col"
      >
        <p className="font-body text-[11px] text-accent uppercase tracking-label leading-none mb-8">
          // ЗАМЕСТИТЕЛИ И АППАРАТ
        </p>
        <h2 className="font-display text-3xl md:text-4xl text-text-primary leading-tight mb-12">
          Деканат
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-0">
          {DEPUTIES.map((person) => (
            <PersonCard key={person.email} {...person} />
          ))}
        </div>
      </section>

      {/* Departments */}
      <section
        id="departments"
        className="scroll-mt-28 bg-bg-section py-20 px-6 sm:px-10 lg:px-20 border-b border-border-col"
      >
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <p className="font-body text-[11px] text-accent uppercase tracking-label leading-none mb-3">
              // КАФЕДРЫ
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-text-primary leading-tight">
              8 кафедр
            </h2>
          </div>
          <Link
            href="/faculty/departments"
            className="flex-shrink-0 inline-block border border-border-col text-text-secondary font-body text-sm uppercase tracking-label px-6 py-3 hover:border-accent hover:text-accent transition-colors duration-200"
          >
            ВСЕ КАФЕДРЫ →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[2px]">
          {DEPARTMENTS.map((dept) => (
            <Link
              key={dept.slug}
              href={dept.href}
              className="group bg-bg-primary p-6 flex flex-col gap-4 hover:bg-accent/5 transition-colors duration-200 border border-transparent hover:border-accent/30"
            >
              <span className="font-body text-[11px] text-accent uppercase tracking-label leading-none">
                // {dept.slug.toUpperCase()}
              </span>
              <p className="font-body text-sm text-text-primary leading-[1.6] group-hover:text-accent transition-colors duration-200">
                Кафедра {dept.name}
              </p>
              <span
                aria-hidden="true"
                className="mt-auto font-body text-sm text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Resources */}
      <section
        id="resources"
        className="scroll-mt-28 bg-bg-primary py-20 px-6 sm:px-10 lg:px-20"
      >
        <p className="font-body text-[11px] text-accent uppercase tracking-label leading-none mb-8">
          // ДОКУМЕНТЫ И РЕСУРСЫ
        </p>
        <h2 className="font-display text-3xl md:text-4xl text-text-primary leading-tight mb-12">
          Справочные материалы
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[2px]">
          {RESOURCE_GROUPS.map((group) => (
            <div key={group.id} id={group.id} className="bg-bg-section p-6 scroll-mt-28">
              <p className="font-body text-[11px] text-accent uppercase tracking-label leading-none mb-5">
                // {group.label}
              </p>
              <div className="flex flex-col">
                {group.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="font-body text-sm text-text-secondary hover:text-accent transition-colors py-2 border-b border-border-col last:border-0"
                  >
                    {link.label} →
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
