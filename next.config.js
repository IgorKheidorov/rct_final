/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'

const isWindows = process.platform === 'win32'

const nextConfig = {
  // output:'export' is only needed for `next build` (static site generation).
  // In dev mode it causes the server to enforce generateStaticParams at
  // request-time, breaking hot-reload on dynamic routes.
  output: isProd ? 'export' : undefined,
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'digital-faculty.bsu.by',
        pathname: '/data/uploads/**',
      },
    ],
  },
  // На Windows параллельная сборка/трассировка иногда даёт PageNotFoundError при
  // collect page data или ENOENT на *.nft.json при collect-build-traces.
  ...(isWindows && {
    experimental: {
      cpus: 1,
      parallelServerBuildTraces: false,
    },
  }),
}

module.exports = nextConfig
