import type { Metadata } from 'next'

import { getAllNews } from '@/lib/utils'
import type { ProgramItem } from '@/lib/types'
import HeroSection from '@/components/sections/HeroSection'
import AnnouncementsBanner from '@/components/sections/AnnouncementsBanner'
import ProgramsGrid from '@/components/sections/ProgramsGrid'
import AboutTeaser from '@/components/sections/AboutTeaser'
import NewsPreview from '@/components/sections/NewsPreview'
import PartnersSection from '@/components/sections/PartnersSection'

export const metadata: Metadata = {
  title: 'Факультет радиофизики и компьютерных технологий — БГУ',
  description:
    'Единственный в Беларуси факультет физико-технического профиля. Программирование, кибербезопасность, ИИ, квантовые вычисления, IoT и аэрокосмические технологии.',
}

const ANNOUNCEMENTS = [
  {
    text: 'День открытых дверей — 28 марта 2026, 11:00, ул. Курчатова 5, ауд. 115',
    href: '/admissions#open-days',
  },
  {
    text: 'Единый день открытых дверей БГУ — 21 марта, пр. Независимости, 116',
    href: '/admissions#open-days',
  },
  {
    text: 'RoboCup Asia-Pacific 2025 — студенты ФРКТ заняли 1 место',
    href: '/news',
  },
]

const PROGRAMS: ProgramItem[] = [
  {
    code: '6-05-0533-05',
    title: 'Радиофизика и информационные технологии',
    qualification: 'Радиофизик. Инженер-программист',
    tracks: 5,
    budget: 86,
    paid: 10,
    image: '/images/specialty_digital_tech.jpg',
    href: '/programs/bachelor/rphit',
  },
  {
    code: '6-05-0533-11',
    title: 'Прикладная информатика',
    qualification: 'Информатик. Программист',
    tracks: 2,
    budget: 42,
    paid: 10,
    image: '/images/specialty_intelligent_systems.jpg',
    href: '/programs/bachelor/ai',
  },
  {
    code: '6-05-0533-12',
    title: 'Кибербезопасность',
    qualification: 'Специалист по защите информации',
    tracks: 1,
    budget: 42,
    paid: 10,
    image: '/images/specialty_cybersecurity.jpg',
    href: '/programs/bachelor/cs',
    accent: true,
  },
  {
    code: '6-05-0533-15',
    title: 'Интеллектуальная электроника',
    qualification: 'Радиофизик. Инженер-программист',
    tracks: 1,
    budget: 22,
    paid: 2,
    image: '/images/specialty_intelligent_electronics.jpg',
    href: '/programs/bachelor/ie',
  },
]

export default function HomePage() {
  const allNews = getAllNews()
  const latestNews = allNews.slice(0, 4)

  return (
    <div data-pagefind-body>
      <HeroSection />
      <AnnouncementsBanner items={ANNOUNCEMENTS} />
      <ProgramsGrid
        eyebrow="// ПРОГРАММЫ"
        heading="Направления подготовки"
        cta={{ label: 'ВСЕ ПРОГРАММЫ →', href: '/programs' }}
        items={PROGRAMS}
      />
      <AboutTeaser
        eyebrow="// О ФАКУЛЬТЕТЕ"
        headline="Единственный в Беларуси факультет физико-технического профиля"
        body="Уникальный сплав знаний по информатике, программированию, радиофизике и электронике, востребованный современной наукой и индустрией. Наши выпускники работают на наукоёмких предприятиях, в центрах кибербезопасности, ИТ-компаниях и ведущих научных центрах страны."
        achievements={[
          'Антенны для межпланетных космических станций',
          'БГУСат-1 — первый наноспутник белорусского университета',
          'Проекты Марс, Венера, Буран-Энергия',
          'Партнёрство с ПВТ, EPAM, ITransition и ведущими IT-компаниями',
        ]}
        cta={{ label: 'ОБ УНИВЕРСИТЕТЕ →', href: '/faculty' }}
      />
      <NewsPreview
        eyebrow="// АКТУАЛЬНОЕ"
        heading="Новости и события"
        cta={{ label: 'ВСЕ НОВОСТИ →', href: '/news' }}
        items={latestNews}
      />
      <PartnersSection eyebrow="// ПАРТНЁРЫ" heading="Компании-партнёры" />
    </div>
  )
}
