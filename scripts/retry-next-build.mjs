/**
 * На Windows иногда падает `next build` с PageNotFoundError / ENOENT при сборке
 * трасс или collect page data — повтор обычно проходит.
 */
import { spawnSync } from 'node:child_process'

const attempts = Math.max(1, Math.min(5, +(process.env.NEXT_BUILD_ATTEMPTS || 2)))

for (let i = 1; i <= attempts; i++) {
  const r = spawnSync('npx', ['next', 'build'], {
    stdio: 'inherit',
    shell: true,
    env: process.env,
  })
  if (r.status === 0) process.exit(0)
  if (i < attempts) {
    console.warn(`\n[retry-next-build] attempt ${i}/${attempts} failed, retrying...\n`)
  }
}

process.exit(1)
