import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { IBM_Plex_Sans } from 'next/font/google'

import '@/styles/globals.css'
import { SearchProvider } from '@/components/search/SearchContext'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import SearchOverlay from '@/components/search/SearchOverlay'

export const metadata: Metadata = {
  metadataBase: new URL('https://rct.bsu.by'),
  title: {
    default: 'ФРКТ БГУ',
    template: '%s | ФРКТ БГУ',
  },
  description:
    'Факультет радиофизики и компьютерных технологий Белорусского государственного университета',
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
}

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex',
  display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={ibmPlexSans.variable}>
      <body className={ibmPlexSans.className}>
        <SearchProvider>
          <a href="#main-content" className="skip-link">
            Перейти к содержимому
          </a>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <SearchOverlay />
        </SearchProvider>

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-LXPCYWCCZV"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-LXPCYWCCZV');
          `}
        </Script>
        <Script id="yandex-metrica" strategy="afterInteractive">
          {`
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
            ym(88540556, "init", {
              clickmap: true,
              trackLinks: true,
              accurateTrackBounce: true
            });
          `}
        </Script>
      </body>
    </html>
  )
}
