import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/layout/PageHero'
import PageHub from '@/components/layout/PageHub'
import SectionLabel from '@/components/ui/SectionLabel'

export const metadata: Metadata = {
  title: 'Контакты — ФРКТ БГУ',
  description:
    'Адрес, телефоны, email и как добраться до факультета радиофизики и компьютерных технологий БГУ.',
}

const SOCIAL = [
  { platform: 'VKontakte', url: 'https://vk.com/rfikt_bsu', icon: 'VK' },
  { platform: 'Telegram', url: 'https://t.me/rct_bsu', icon: 'TG' },
  { platform: 'Instagram', url: 'https://www.instagram.com/rct.bsu/', icon: 'IG' },
  { platform: 'Facebook', url: 'https://www.facebook.com/groups/1716620758578504', icon: 'FB' },
  { platform: 'TikTok', url: 'https://www.tiktok.com/@rfiktss', icon: 'TT' },
]

const CONTACTS_HUB = [
  {
    id: 'contact-info',
    title: 'Контакты',
    description: 'Адрес, телефон, email факультета и приёмная декана.',
  },
  {
    id: 'directions',
    title: 'Как добраться',
    description: 'Транспорт, карта и ориентиры до корпуса на Курчатова, 5.',
  },
  {
    id: 'social',
    title: 'Соцсети',
    description: 'Официальные страницы ФРКТ в социальных сетях.',
  },
] as const

export default function ContactsPage() {
  return (
    <div className="min-h-screen bg-bg-primary" data-pagefind-body>
      <PageHero
        eyebrow="Контакты"
        title="Свяжитесь с нами"
        subtitle="Адрес, телефоны, email и как добраться до факультета."
        coverImage={{
          src: '/images/faculty_building.jpg',
          alt: 'Корпус факультета радиофизики и компьютерных технологий БГУ',
          priority: true,
        }}
      />

      <PageHub items={CONTACTS_HUB} />

      <div className="px-6 md:px-20 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 border-t border-border-col">
        <div id="contact-info">
          <h2 className="font-display text-2xl text-text-primary mb-6">Факультет ФРКТ БГУ</h2>

          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-bg-section border border-border-col">
              <span className="text-accent text-xl mt-0.5">📍</span>
              <div>
                <p className="text-[11px] font-body uppercase tracking-label text-text-muted mb-1">Адрес</p>
                <p className="text-text-primary">220045, Республика Беларусь,</p>
                <p className="text-text-primary">г. Минск, ул. Академика Курчатова, 5</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-bg-section border border-border-col">
              <span className="text-accent text-xl mt-0.5">📞</span>
              <div>
                <p className="text-[11px] font-body uppercase tracking-label text-text-muted mb-1">Телефон</p>
                <a href="tel:+375172095818" className="text-text-primary hover:text-accent transition-colors">
                  +375 (17) 209-58-18
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-bg-section border border-border-col">
              <span className="text-accent text-xl mt-0.5">✉️</span>
              <div>
                <p className="text-[11px] font-body uppercase tracking-label text-text-muted mb-1">Email</p>
                <a href="mailto:rct@bsu.by" className="text-text-primary hover:text-accent transition-colors">
                  rct@bsu.by
                </a>
              </div>
            </div>
          </div>

          {/* Dean */}
          <div className="mt-8 p-6 bg-bg-section border border-border-col">
            <SectionLabel className="mb-4">// ДЕКАН</SectionLabel>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-border-col flex-shrink-0 flex items-center justify-center">
                <span className="font-display text-text-secondary text-lg">ДУ</span>
              </div>
              <div>
                <p className="font-display text-text-primary">Ушаков Дмитрий Владимирович</p>
                <p className="text-text-secondary text-sm">Декан, д-р физ.-мат. наук, доцент</p>
                <a
                  href="tel:+375172095903"
                  className="text-text-muted text-sm hover:text-accent transition-colors"
                >
                  +375 (17) 209-59-03
                </a>
                <span className="text-border-col mx-2">|</span>
                <a
                  href="mailto:ushakovdv@bsu.by"
                  className="text-text-muted text-sm hover:text-accent transition-colors"
                >
                  ushakovdv@bsu.by
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Map + transport */}
        <div>
          {/* Map placeholder */}
          <div className="bg-bg-section border border-border-col h-64 flex items-center justify-center mb-6">
            <div className="text-center">
              <p className="text-text-muted text-sm mb-3">Минск, ул. Академика Курчатова, 5</p>
              <a
                href="https://yandex.by/maps/?pt=27.477,53.857&z=16&l=map"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-accent text-white text-sm font-body uppercase tracking-label hover:bg-accent/80 transition-colors"
              >
                Открыть карту ↗
              </a>
            </div>
          </div>

          {/* Transport */}
          <div id="directions" className="space-y-4">
            <SectionLabel>// КАК ДОБРАТЬСЯ</SectionLabel>
            <h2 className="font-display text-2xl text-text-primary mt-2 mb-4">Транспорт</h2>

            <div className="p-4 bg-bg-section border border-border-col">
              <p className="text-[11px] font-body uppercase tracking-label text-accent mb-2">Автобус</p>
              <ul className="space-y-1 text-text-secondary text-sm">
                <li>№47с — от Ж/д вокзала, ост. «Факультет радиофизики»</li>
                <li>№96, №132 — ост. «Факультет радиофизики»</li>
                <li>№28, №30ас, №97, №104, №114с, №134с, №144с — ост. «Поворот к корпусу БГУ»</li>
              </ul>
              <a
                href="http://www.minsktrans.by/city/#minsk/bus"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent text-[11px] uppercase tracking-label hover:underline mt-2 inline-block"
              >
                Расписание автобусов ↗
              </a>
            </div>

            <div className="p-4 bg-bg-section border border-border-col">
              <p className="text-[11px] font-body uppercase tracking-label text-accent mb-2">Электричка</p>
              <p className="text-text-secondary text-sm">Направление Столбцы — ст. «Роща»</p>
              <a
                href="http://rasp.rw.by/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent text-[11px] uppercase tracking-label hover:underline mt-2 inline-block"
              >
                Расписание ↗
              </a>
            </div>

            <div className="p-4 bg-bg-section border border-border-col">
              <p className="text-[11px] font-body uppercase tracking-label text-accent mb-2">Метро</p>
              <p className="text-text-secondary text-sm">
                Автозаводская линия (красная) — ст. «Малиновка», затем 10 мин пешком мимо ОМА к переходу через МКАД.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Social */}
      <section id="social" className="border-t border-border-col px-6 md:px-20 py-12 bg-bg-section">
        <SectionLabel className="mb-6">// МЫ В СОЦСЕТЯХ</SectionLabel>
        <div className="flex flex-wrap gap-4">
          {SOCIAL.map(s => (
            <a
              key={s.platform}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 border border-border-col text-text-secondary hover:border-accent hover:text-accent transition-colors text-sm"
            >
              <span className="font-display text-xs">{s.icon}</span>
              {s.platform}
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}
