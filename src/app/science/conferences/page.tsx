import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Конференции — ФРКТ БГУ',
  description:
    'Международные научные конференции факультета радиофизики и компьютерных технологий БГУ.',
}

export default function ConferencesPage() {
  return (
    <div data-pagefind-body>
      {/* Header */}
      <section className="bg-bg-primary pt-32 pb-16 px-6 sm:px-10 lg:px-20 border-b border-border-col">
        <p className="font-body text-[11px] text-accent uppercase tracking-label leading-none mb-6">
          // КОНФЕРЕНЦИИ
        </p>
        <h1 className="font-display text-5xl md:text-6xl text-text-primary leading-[0.97] tracking-tight mb-4">
          МЕЖДУНАРОДНЫЕ КОНФЕРЕНЦИИ
        </h1>
        <p className="font-body text-base text-text-secondary leading-[1.75] max-w-xl">
          ФРКТ БГУ организует и проводит ведущие международные научно-технические конференции
        </p>
      </section>

      {/* QE'2025 */}
      <section
        id="qe2025"
        className="bg-bg-section py-16 px-6 sm:px-10 lg:px-20 border-b border-border-col"
      >
        <p className="font-body text-[11px] text-accent uppercase tracking-label leading-none mb-6">
          // QE&#39;2025
        </p>
        <h2 className="font-display text-3xl md:text-4xl text-text-primary leading-tight mb-4">
          XV Международная научно-техническая конференция «Квантовая электроника»
        </h2>
        <p className="font-body text-sm text-text-muted uppercase tracking-label mb-10">
          Минск, Беларусь
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <p className="font-body text-[11px] text-text-muted uppercase tracking-label mb-4">
              Организаторы
            </p>
            <ul className="flex flex-col gap-2 mb-8">
              {[
                'Министерство образования Республики Беларусь',
                'Белорусский государственный университет',
                'НИИПФП им. А.Н. Севченко при БГУ',
                'Институт физики им. Б.И. Степанова НАН Беларуси',
                'Белорусский республиканский фонд фундаментальных исследований',
              ].map((org, i) => (
                <li key={i} className="flex items-start gap-3 font-body text-sm text-text-secondary">
                  <span aria-hidden="true" className="mt-1.5 w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                  {org}
                </li>
              ))}
            </ul>

            <p className="font-body text-[11px] text-text-muted uppercase tracking-label mb-4">
              Тематика конференции
            </p>
            <ul className="flex flex-col gap-2 mb-8">
              {[
                'Теоретические проблемы квантовой электроники',
                'Физика лазеров',
                'Системы и методы квантовой электроники',
                'Компьютеризация лазерных исследований',
                'Прикладные исследования',
                'Информационные технологии в радиофизике',
                'Методика преподавания',
              ].map((topic, i) => (
                <li key={i} className="flex items-start gap-3 font-body text-sm text-text-secondary">
                  <span aria-hidden="true" className="mt-1.5 w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                  {topic}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-body text-[11px] text-text-muted uppercase tracking-label mb-4">
              Организационный комитет
            </p>
            <div className="flex flex-col gap-2 mb-8 font-body text-sm text-text-secondary">
              <p><span className="text-text-muted">Председатель:</span> М.М. Кугейко</p>
              <p><span className="text-text-muted">Зам. председателя:</span> Д.В. Ушаков</p>
              <p><span className="text-text-muted">Учёный секретарь:</span> А.А. Афоненко</p>
              <p className="mt-2 text-text-muted text-xs">Члены:</p>
              <p>А.В. Баркова, Е.С. Воропай, С.В. Гапоненко, П.В. Кучинский, В.Ю. Плавский, А.Л. Толстик, Г.П. Яблонский</p>
            </div>

            <p className="font-body text-[11px] text-text-muted uppercase tracking-label mb-4">
              Публикации
            </p>
            <ul className="flex flex-col gap-2 mb-8">
              {[
                'Труды конференции в электронном формате, депонированы в БГУ',
                'Индексирование в РИНЦ',
                'Избранные статьи: «Журнал БГУ. Физика», «Фотоника», «Журнал прикладной спектроскопии»',
              ].map((pub, i) => (
                <li key={i} className="flex items-start gap-3 font-body text-sm text-text-secondary">
                  <span aria-hidden="true" className="mt-1.5 w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                  {pub}
                </li>
              ))}
            </ul>

            <p className="font-body text-[11px] text-text-muted uppercase tracking-label mb-4">
              Подача заявок
            </p>
            <div className="font-body text-sm text-text-secondary mb-4 space-y-2">
              <p><span className="text-text-muted">Дедлайн:</span> 30 сентября 2025</p>
              <p><span className="text-text-muted">Email:</span>{' '}
                <a href="mailto:qe@bsu.by" className="text-accent hover:underline">qe@bsu.by</a>
              </p>
              <p className="leading-[1.6]">
                Электронное письмо: ФИО, организация, телефон, email, формат доклада (устный/постер)
              </p>
            </div>

            <p className="font-body text-[11px] text-text-muted uppercase tracking-label mb-4">
              Оргвзнос
            </p>
            <div className="font-body text-sm text-text-secondary space-y-1">
              <p>Общий: 90 белорусских рублей</p>
              <p>Студенты и магистранты: бесплатно</p>
            </div>
          </div>
        </div>

        {/* Bank details */}
        <div className="mt-10 bg-bg-primary p-8 border border-border-col">
          <p className="font-body text-[11px] text-text-muted uppercase tracking-label mb-4">
            Банковские реквизиты
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-body text-sm text-text-secondary">
            <p><span className="text-text-muted">Организация:</span> Белорусский государственный университет</p>
            <p><span className="text-text-muted">Адрес:</span> 220030, Минск, пр. Независимости, 4</p>
            <p><span className="text-text-muted">Счёт:</span> BY88BLBB36320100235722001001</p>
            <p><span className="text-text-muted">Банк:</span> Белинвестбанк, г. Минск</p>
            <p><span className="text-text-muted">BIC:</span> BLBBBY2X</p>
            <p><span className="text-text-muted">УНП:</span> 100235722</p>
            <p><span className="text-text-muted">ОКПО:</span> 02071815</p>
            <p><span className="text-text-muted">Назначение:</span> «Квантовая электроника»</p>
          </div>
        </div>

        {/* Contact */}
        <div className="mt-6 font-body text-sm text-text-secondary space-y-1">
          <p className="font-body text-[11px] text-text-muted uppercase tracking-label mb-3">Контакт</p>
          <p>220030, Минск, пр. Независимости, 4, БГУ, ФРКТ, Кафедра квантовой радиофизики и оптоэлектроники</p>
          <p>Тел.: <a href="tel:+375172821039" className="text-accent hover:underline">+375 17 282-10-39</a></p>
          <p>Факс: +375 17 365-10-16</p>
          <p>Email: <a href="mailto:qe@bsu.by" className="text-accent hover:underline">qe@bsu.by</a></p>
        </div>
      </section>

      {/* CTDA */}
      <section
        id="ctda"
        className="bg-bg-primary py-16 px-6 sm:px-10 lg:px-20 border-b border-border-col"
      >
        <p className="font-body text-[11px] text-accent uppercase tracking-label leading-none mb-6">
          // CTDA
        </p>
        <h2 className="font-display text-3xl md:text-4xl text-text-primary leading-tight mb-4">
          Международная научная конференция «Компьютерные технологии и анализ данных»
        </h2>
        <p className="font-body text-sm text-text-muted uppercase tracking-label mb-8">
          Двухлетняя · Факультет радиофизики и компьютерных технологий, БГУ
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <p className="font-body text-[11px] text-text-muted uppercase tracking-label mb-4">
              Секции
            </p>
            <ul className="flex flex-col gap-2">
              {[
                'Системы машинного и глубокого обучения',
                'Интеллектуальные технологии и системы',
                'Компьютерное моделирование процессов и систем',
                'Биоинформатика',
              ].map((section, i) => (
                <li key={i} className="flex items-start gap-3 font-body text-sm text-text-secondary">
                  <span aria-hidden="true" className="mt-1.5 w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                  {section}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <a
              href="https://ctda.bsu.by/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-border-col text-text-secondary font-body text-sm uppercase tracking-label px-6 py-3 hover:border-accent hover:text-accent transition-colors duration-200"
            >
              САЙТ КОНФЕРЕНЦИИ →
            </a>
          </div>
        </div>
      </section>

      {/* Applied Optics */}
      <section
        id="applied-optics"
        className="bg-bg-section py-16 px-6 sm:px-10 lg:px-20"
      >
        <p className="font-body text-[11px] text-accent uppercase tracking-label leading-none mb-6">
          // ПРИКЛАДНАЯ ОПТИКА
        </p>
        <h2 className="font-display text-3xl md:text-4xl text-text-primary leading-tight mb-4">
          Международная конференция по прикладной оптике, информатике, радиофизике и физике
          твёрдого тела
        </h2>
        <p className="font-body text-sm text-text-muted uppercase tracking-label mb-8">
          Двухлетняя · НИИПФП при БГУ совместно с ФРКТ
        </p>

        <div>
          <p className="font-body text-[11px] text-text-muted uppercase tracking-label mb-4">
            Секции
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              'Прикладная оптика и спектроскопия',
              'Прикладная информатика',
              'Прикладная радиофизика',
              'Физика твёрдого тела',
            ].map((section, i) => (
              <li key={i} className="flex items-start gap-3 font-body text-sm text-text-secondary">
                <span aria-hidden="true" className="mt-1.5 w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                {section}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Back */}
      <div className="bg-bg-primary px-6 sm:px-10 lg:px-20 py-10 border-t border-border-col">
        <Link
          href="/science"
          className="inline-block border border-border-col text-text-secondary font-body text-sm uppercase tracking-label px-6 py-3 hover:border-accent hover:text-accent transition-colors duration-200"
        >
          ← НАЗАД К НАУКЕ
        </Link>
      </div>
    </div>
  )
}
