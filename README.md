# ФРКТ БГУ — Сайт факультета

Официальный сайт факультета радиофизики и компьютерных технологий Белорусского государственного университета.

**Стек:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · MDX · Pagefind

---

## Быстрый старт

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

> Требуется Node.js 20+ и pnpm.

---

## Команды

| Команда | Описание |
|---|---|
| `pnpm dev` | Дев-сервер |
| `pnpm build` | Сборка (Next.js static export → `out/`) |
| `pnpm build:full` | Полная сборка: copy-assets → build → pagefind-индекс |
| `pnpm start` | Локальный просмотр собранного сайта (`serve out/`) |
| `pnpm typecheck` | Проверка типов TypeScript |

---

## Структура проекта

```
src/
├── app/                        # Страницы (Next.js App Router)
│   ├── page.tsx                # Главная
│   ├── faculty/                # Факультет
│   │   ├── page.tsx
│   │   ├── administration/
│   │   ├── council/
│   │   ├── departments/[slug]/
│   │   ├── staff/
│   │   └── prof-rct/
│   ├── programs/               # Программы обучения
│   │   ├── bachelor/[slug]/
│   │   └── master/[slug]/
│   ├── admissions/             # Абитуриентам
│   ├── education/              # Обучение
│   ├── science/                # Наука
│   │   ├── conferences/
│   │   ├── labs/
│   │   ├── schools/
│   │   ├── school-semiconductor/
│   │   └── school-informatics/
│   ├── news/[slug]/            # Новости
│   ├── search/                 # Поиск (Pagefind)
│   └── contacts/
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # Шапка с навигацией и дропдаунами
│   │   ├── Footer.tsx
│   │   ├── PageHero.tsx        # Герой-шапка страницы (фото + градиент)
│   │   └── PageHub.tsx         # Сетка якорных ссылок
│   ├── sections/
│   │   ├── HeroSection.tsx     # Главная — герой
│   │   ├── NewsPreview.tsx
│   │   ├── ProgramsGrid.tsx
│   │   └── StatsBand.tsx
│   ├── news/
│   │   └── NewsFilters.tsx     # Фильтр по тегам + пагинация
│   └── search/
│       └── SearchContext.tsx
│
├── content/                    # MDX-контент
│   ├── faculty_*.mdx
│   ├── science/
│   │   ├── school-semiconductor.mdx
│   │   └── school-informatics.mdx
│   └── news/
│       └── *.mdx
│
├── lib/
│   ├── types.ts
│   ├── utils.ts                # getAllNews, getAllPrograms и др.
│   └── faculty-resources.ts   # Единый список ресурсных ссылок факультета
│
public/
├── images/                     # Фото и изображения
│   ├── logo.svg                # Логотип факультета (героев главной)
│   ├── logo-mark.svg           # Логотип-марка для шапки (PCB/signal mark)
│   └── staff/                  # Фото сотрудников
└── pagefind/                   # Поисковый индекс (генерируется при сборке)
```

---

## Контент

Большинство страниц — **server components** с данными из TypeScript-констант. Там, где нужен длинный текст, используется **MDX** (`src/content/`).

### Добавить новость

Создать файл `src/content/news/my-post.mdx`:

```mdx
---
title: Заголовок новости
date: 2026-04-03
tags: [students, events]
excerpt: Краткое описание для карточки.
image: /images/news/my-image.jpg
---

Текст новости в Markdown.
```

Допустимые теги: `enrollee` · `media` · `students` · `events` · `science`

---

## Деплой

Сайт собирается в статический экспорт (`output: export`) и деплоится как статика.

### Render

Конфигурация в [`render.yaml`](render.yaml). Деплой через **New → Blueprint** в Render Dashboard.

```
Build: pnpm install --frozen-lockfile && pnpm build:full
Publish: out/
```

### Вручную

```bash
pnpm build:full         # собрать в out/
npx serve@latest out    # проверить локально
```

Папку `out/` можно загрузить на любой статический хостинг: Netlify, Vercel (static), GitHub Pages, Nginx.

---

## Поиск

Поиск работает через [Pagefind](https://pagefind.app/) — статический поисковый индекс.

- Индекс генерируется командой `pnpm build:full` (или отдельно: `pnpm index-search`)
- Страницы индексируются по атрибуту `data-pagefind-body`
- В дев-режиме поиск не работает — нужен собранный `out/`

---

## Дизайн-система

Цвета определены в [`tailwind.config.ts`](tailwind.config.ts):

| Токен | Значение | Использование |
|---|---|---|
| `accent` | `#1A56DB` | Акцент, ссылки, кнопки |
| `bg-primary` | `#ffffff` | Основной фон |
| `bg-section` | `#f1f5f9` | Чередующиеся секции |
| `text-primary` | `#0f172a` | Основной текст |
| `text-secondary` | `#475569` | Второстепенный текст |
| `text-muted` | `#64748b` | Подписи, метки |
| `heading` | `#0c1222` | Заголовки |
| `border-col` | `#e2e8f0` | Границы |

Шрифт: **IBM Plex Sans** (display + body).
