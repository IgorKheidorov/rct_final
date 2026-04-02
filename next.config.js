/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  // output:'export' is only needed for `next build` (static site generation).
  // In dev mode it causes the server to enforce generateStaticParams at
  // request-time, breaking hot-reload on dynamic routes.
  output: isProd ? 'export' : undefined,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
