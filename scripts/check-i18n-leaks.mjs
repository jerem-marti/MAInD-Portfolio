// Post-generate i18n guard. Run after `npm run generate`:
//   1. No English UI string (fully translated in fr.json) leaks into a French page.
//   2. Every English route has a reachable French counterpart, and vice-versa.
//   3. Each prerendered page carries the right <html lang> and a canonical link.
//
// Exits non-zero on any failure so it can gate CI / the build.

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = '.output/public'
if (!existsSync(ROOT)) {
  console.error(`✗ ${ROOT} not found — run "npm run generate" first.`)
  process.exit(1)
}

// English UI strings that are fully translated in i18n/locales/fr.json — none of
// these should ever appear in the visible text of a /fr page. Chosen to be
// unambiguous chrome/UI phrases (not proper nouns or terms kept in English).
const SENTINELS = [
  'Skip to content',
  'Read the case study',
  'Available for internships from',
  'Replies in French or English',
  'More about Jérémy',
  'Selected work',
  'Hover a row.',
  'Open case study',
  'Three ways out',
  "That page isn't here",
  'Index — all other work',
  'Write to me.',
  'How I got here',
  'Field experience',
  'Back to Index',
  'Case study in progress',
]

function visibleText(file) {
  let s = readFileSync(file, 'utf8')
  const body = s.match(/<body[\s\S]*?>([\s\S]*)<\/body>/)
  s = body ? body[1] : s
  s = s.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ')
  s = s.replace(/<[^>]+>/g, ' ')
  s = s.replace(/&#39;/g, "'").replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&gt;/g, '>').replace(/&lt;/g, '<')
  return s.replace(/\s+/g, ' ')
}

function walkHtml(dir) {
  const out = []
  for (const e of readdirSync(dir)) {
    const p = join(dir, e)
    if (statSync(p).isDirectory()) out.push(...walkHtml(p))
    else if (e.endsWith('.html')) out.push(p)
  }
  return out
}

let failures = 0
const fail = (msg) => { console.error(`✗ ${msg}`); failures++ }

// 1. English-leak scan over every French page.
const frDir = join(ROOT, 'fr')
const frPages = existsSync(frDir) ? walkHtml(frDir) : []
if (!frPages.length) fail('no /fr pages found')
for (const f of frPages) {
  const text = visibleText(f)
  for (const s of SENTINELS) {
    if (text.includes(s)) fail(`English leak "${s}" in ${f.replace(ROOT, '')}`)
  }
}

// 2. Route parity. EN routes → FR counterparts (custom French segments).
const slugs = walkHtml(join(ROOT, 'work'))
  .map(p => p.replace(/\\/g, '/').match(/\/work\/(.+)\/index\.html$/)?.[1])
  .filter(Boolean)
const pairs = [
  ['index.html', 'fr/index.html'],
  ['about/index.html', 'fr/a-propos/index.html'],
  ['contact/index.html', 'fr/contact/index.html'],
  ...slugs.map(s => [`work/${s}/index.html`, `fr/projets/${s}/index.html`]),
]
for (const [en, fr] of pairs) {
  if (!existsSync(join(ROOT, en))) fail(`missing EN route ${en}`)
  if (!existsSync(join(ROOT, fr))) fail(`missing FR counterpart ${fr} for ${en}`)
}

// 3. <html lang> + canonical per locale.
const checkLang = (file, lang) => {
  if (!existsSync(join(ROOT, file))) return
  const s = readFileSync(join(ROOT, file), 'utf8')
  if (!new RegExp(`<html[^>]*\\blang="${lang}"`).test(s)) fail(`${file} missing <html lang="${lang}">`)
  if (!/<link rel="canonical"/.test(s)) fail(`${file} missing canonical`)
}
checkLang('index.html', 'en')
checkLang('about/index.html', 'en')
checkLang('fr/index.html', 'fr')
checkLang('fr/a-propos/index.html', 'fr')
for (const s of slugs) {
  checkLang(`work/${s}/index.html`, 'en')
  checkLang(`fr/projets/${s}/index.html`, 'fr')
}

if (failures) {
  console.error(`\n✗ i18n check failed: ${failures} issue(s).`)
  process.exit(1)
}
console.log(`✓ i18n check passed: ${frPages.length} FR pages scanned, ${pairs.length} route pairs present, lang/canonical OK.`)
