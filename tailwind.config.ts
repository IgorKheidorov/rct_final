import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        /** Семантика: основной фон страницы (светлый портал) */
        page: '#ffffff',
        /** Чередующиеся секции / подложка */
        surface: '#f1f5f9',
        /** Карточки и приподнятые блоки */
        'surface-elevated': '#ffffff',
        /** Legacy aliases — те же значения, что page/surface */
        'bg-primary': '#ffffff',
        'bg-section': '#f1f5f9',
        accent: '#1A56DB',
        'text-primary': '#0f172a',
        'text-secondary': '#475569',
        'text-muted': '#64748b',
        /** Заголовки — чуть глубже основного текста (ИТ-вуз, спокойная иерархия) */
        heading: '#0c1222',
        'border-col': '#e2e8f0',
      },
      fontFamily: {
        sans: ['var(--font-ibm-plex)', 'system-ui', 'sans-serif'],
        display: ['var(--font-ibm-plex)', 'system-ui', 'sans-serif'],
        body: ['var(--font-ibm-plex)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        label: '0.2em',
      },
      borderRadius: {
        /** Карточки и группы списков (Обучение и др.) */
        card: '8px',
      },
      typography: ({ theme }: { theme: (key: string) => string }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.text-secondary'),
            '--tw-prose-headings': theme('colors.heading'),
            '--tw-prose-lead': theme('colors.text-secondary'),
            '--tw-prose-links': theme('colors.accent'),
            '--tw-prose-bold': theme('colors.text-primary'),
            '--tw-prose-counters': theme('colors.text-muted'),
            '--tw-prose-bullets': theme('colors.text-muted'),
            '--tw-prose-hr': theme('colors.border-col'),
            '--tw-prose-quotes': theme('colors.text-secondary'),
            '--tw-prose-quote-borders': theme('colors.accent'),
            '--tw-prose-captions': theme('colors.text-muted'),
            '--tw-prose-code': theme('colors.text-primary'),
            '--tw-prose-pre-code': theme('colors.text-secondary'),
            '--tw-prose-pre-bg': theme('colors.bg-section'),
            '--tw-prose-th-borders': theme('colors.border-col'),
            '--tw-prose-td-borders': theme('colors.border-col'),
            h2: {
              fontFamily: 'var(--font-ibm-plex), system-ui, sans-serif',
              fontWeight: '600',
              fontSize: '1.25rem',
              borderBottom: `1px solid ${theme('colors.border-col')}`,
              paddingBottom: '0.5rem',
              marginTop: '2rem',
              marginBottom: '0.75rem',
            },
            h3: {
              fontFamily: 'var(--font-ibm-plex), system-ui, sans-serif',
              fontWeight: '600',
              fontSize: '1rem',
              marginTop: '1.5rem',
              marginBottom: '0.5rem',
            },
            h4: {
              fontFamily: 'var(--font-ibm-plex), system-ui, sans-serif',
              fontWeight: '600',
              fontSize: '0.8125rem',
              letterSpacing: '0.02em',
              color: theme('colors.text-muted'),
              marginTop: '1.25rem',
              marginBottom: '0.4rem',
            },
            blockquote: {
              borderLeftColor: theme('colors.accent'),
              borderLeftWidth: '3px',
              paddingLeft: '1rem',
              color: theme('colors.text-muted'),
              fontStyle: 'normal',
              backgroundColor: theme('colors.bg-section'),
              padding: '1rem 1rem 1rem 1.25rem',
              marginLeft: 0,
              marginRight: 0,
              'p:first-child::before': { content: '""' },
              'p:last-child::after': { content: '""' },
            },
            a: {
              color: theme('colors.accent'),
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' },
            },
            'ul > li::marker': { color: theme('colors.accent') },
            'ol > li::marker': { color: theme('colors.text-muted') },
            li: {
              marginTop: '0.35rem',
              marginBottom: '0.35rem',
              lineHeight: '1.65',
            },
            p: {
              lineHeight: '1.75',
              marginTop: '0.75em',
              marginBottom: '0.75em',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config
