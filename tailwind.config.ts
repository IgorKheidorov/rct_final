import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#1C1C1E',
        'bg-section': '#141416',
        'accent': '#1A56DB',
        'text-primary': '#FFFFFF',
        'text-secondary': '#8A8A8E',
        'text-muted': '#6B6B70',
        'border-col': '#2C2C2E',
      },
      fontFamily: {
        display: ['"Archivo Black"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      letterSpacing: {
        label: '0.2em',
      },
      typography: ({ theme }: { theme: (key: string) => string }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.text-secondary'),
            '--tw-prose-headings': theme('colors.text-primary'),
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
              fontFamily: '"Archivo Black", sans-serif',
              fontSize: '1.25rem',
              borderBottom: `1px solid ${theme('colors.border-col')}`,
              paddingBottom: '0.5rem',
              marginTop: '2rem',
              marginBottom: '0.75rem',
            },
            h3: {
              fontFamily: '"Archivo Black", sans-serif',
              fontSize: '1rem',
              marginTop: '1.5rem',
              marginBottom: '0.5rem',
            },
            h4: {
              fontFamily: '"Archivo Black", sans-serif',
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
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
            li: { marginTop: '0.25rem', marginBottom: '0.25rem' },
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
