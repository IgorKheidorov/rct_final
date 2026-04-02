#!/usr/bin/env node
/**
 * copy-assets.js
 * Copies images and docs from old_site/ to public/
 */
const fs = require('fs')
const path = require('path')

const ROOT = path.join(__dirname, '..')
const OLD_IMAGES = path.join(ROOT, 'old_site', 'assets', 'images')
const PUB_IMAGES = path.join(ROOT, 'public', 'images')

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

function copyFile(src, dest) {
  if (fs.existsSync(src)) {
    ensureDir(path.dirname(dest))
    fs.copyFileSync(src, dest)
    console.log(`  ✓ ${path.relative(ROOT, dest)}`)
    return true
  }
  console.warn(`  ⚠ missing: ${path.relative(ROOT, src)}`)
  return false
}

function copyDir(src, dest) {
  ensureDir(dest)
  if (!fs.existsSync(src)) {
    console.warn(`  ⚠ dir missing: ${path.relative(ROOT, src)}`)
    return
  }
  for (const file of fs.readdirSync(src)) {
    const s = path.join(src, file)
    const d = path.join(dest, file)
    if (fs.statSync(s).isFile()) copyFile(s, d)
  }
}

console.log('\n── Copying images ──────────────────────────────────────')
const NAMED = [
  'logo.svg', 'faculty_building.jpg',
  'banner_open_house_march28.jpg', 'banner_robocup_asia_pacific_2025.jpg',
  'specialty_aerospace.jpg', 'specialty_informatics.jpg',
  'specialty_microelectronics.jpg', 'specialty_photonics.jpg',
  'specialty_digital_tech.jpg', 'specialty_intelligent_systems.jpg',
  'specialty_bioinformatics.jpg', 'specialty_cybersecurity.jpg',
  'specialty_intelligent_electronics.jpg',
  'masters_program_1.jpg', 'masters_program_2.jpg', 'masters_aerospace.jpg',
]
NAMED.forEach(f => copyFile(path.join(OLD_IMAGES, f), path.join(PUB_IMAGES, f)))

console.log('\n── Copying partner logos ───────────────────────────────')
copyDir(path.join(OLD_IMAGES, 'partners'), path.join(PUB_IMAGES, 'partners'))

console.log('\n── Copying news images ─────────────────────────────────')
copyDir(path.join(OLD_IMAGES, 'news'), path.join(PUB_IMAGES, 'news'))

console.log('\n── Creating doc dirs ───────────────────────────────────')
ensureDir(path.join(ROOT, 'public', 'docs', 'syllabi'))
ensureDir(path.join(ROOT, 'public', 'docs', 'exams'))
console.log('  ✓ public/docs/syllabi/')
console.log('  ✓ public/docs/exams/')

console.log('\n✅ Assets copied.\n')
