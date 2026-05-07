#!/usr/bin/env node
// Mirror Drupal-served files into .output/public so the static build is
// self-contained. Targets /sites/default/files/* only (images, uploads).
// Strips query strings (e.g. alternateWidths, itok) — only the base file
// is fetched and referenced. Run after `nuxt generate`.

import { readFile, writeFile, mkdir, readdir, rm } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { spawn } from 'node:child_process'

const OUT_DIR = '.output/public'
const ORIGIN = process.env.NUXT_PUBLIC_DRUPAL_CE_DRUPAL_BASE_URL
  || 'http://lupus-decoupled.ddev.site'

const TEXT_EXTS = new Set(['.html', '.json', '.js', '.mjs', '.css', '.txt', '.xml', '.svg'])
const MIRROR_PATH_PREFIX = '/sites/default/files/'

const HOST_ESC = new URL(ORIGIN).host.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
// Plain URL form (HTML).
const PLAIN_RE = new RegExp(`https?:\\/\\/${HOST_ESC}[^\\s"'<>\\\\)]+`, 'g')
// JSON-escaped URL form: /sites... appears as /sites... (Nuxt _payload.json).
const ESCAPED_RE = new RegExp(
  `https?:\\\\u002[Ff]\\\\u002[Ff]${HOST_ESC}(?:[^\\s"'<>)]|\\\\u002[Ff])+`,
  'g',
)

const fetched = new Map() // localPath -> ok|null
let touched = 0

function decodeJsonEscapes(s) {
  return s.replace(/\\u002[Ff]/g, '/')
}

function encodeJsonEscapes(s) {
  return s.replace(/\//g, '\\u002F')
}

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) yield* walk(path)
    else yield path
  }
}

// Use curl: honors HTTP(S)_PROXY (needed for ddev URLs in dev containers)
// and works across Node versions without an undici dep.
function curlDownload(url, dest) {
  return new Promise((resolve) => {
    const args = ['-sSL', '-o', dest, '-w', '%{http_code}', url]
    const child = spawn('curl', args, { stdio: ['ignore', 'pipe', 'pipe'] })
    let code = ''
    let err = ''
    child.stdout.on('data', d => (code += d.toString()))
    child.stderr.on('data', d => (err += d.toString()))
    child.on('close', (exit) => {
      if (exit !== 0) return resolve({ ok: false, reason: err.trim() || `curl exit ${exit}` })
      const status = parseInt(code, 10)
      if (status >= 400) return resolve({ ok: false, reason: `HTTP ${status}` })
      resolve({ ok: true })
    })
  })
}

async function fetchOnce(url, localPath) {
  if (fetched.has(localPath)) return fetched.get(localPath)
  const dest = join(OUT_DIR, localPath)
  await mkdir(dirname(dest), { recursive: true })
  const res = await curlDownload(url, dest)
  if (!res.ok) {
    console.warn(`  skip ${url} (${res.reason})`)
    fetched.set(localPath, null)
    return null
  }
  fetched.set(localPath, localPath)
  return localPath
}

async function rewrite(content, raw, escaped) {
  const decoded = escaped ? decodeJsonEscapes(raw) : raw
  let parsed
  try { parsed = new URL(decoded) }
  catch { return { content, changed: false } }
  if (!parsed.pathname.startsWith(MIRROR_PATH_PREFIX)) {
    return { content, changed: false }
  }
  const localPath = parsed.pathname
  const local = await fetchOnce(decoded, localPath)
  if (!local) return { content, changed: false }
  const replacement = escaped ? encodeJsonEscapes(local) : local
  return { content: content.split(raw).join(replacement), changed: true }
}

async function processFile(file) {
  const ext = file.slice(file.lastIndexOf('.'))
  if (!TEXT_EXTS.has(ext)) return
  let content = await readFile(file, 'utf8')
  const plain = [...new Set(content.match(PLAIN_RE) || [])]
  const escaped = [...new Set(content.match(ESCAPED_RE) || [])]
  if (!plain.length && !escaped.length) return

  let changed = false
  for (const raw of plain) {
    const r = await rewrite(content, raw, false)
    content = r.content
    changed = changed || r.changed
  }
  for (const raw of escaped) {
    const r = await rewrite(content, raw, true)
    content = r.content
    changed = changed || r.changed
  }
  if (changed) {
    await writeFile(file, content)
    // Drop precompressed siblings so surge doesn't serve stale .br/.gz.
    await rm(`${file}.br`, { force: true })
    await rm(`${file}.gz`, { force: true })
    touched += 1
  }
}

async function run() {
  console.log(`bundle-assets: mirroring ${ORIGIN}${MIRROR_PATH_PREFIX}* into ${OUT_DIR}/`)
  for await (const file of walk(OUT_DIR)) {
    await processFile(file)
  }
  const ok = [...fetched.values()].filter(v => v).length
  const skipped = fetched.size - ok
  console.log(`bundle-assets: ${ok} files mirrored, ${skipped} skipped, ${touched} text files rewritten`)
}

run().catch(e => { console.error(e); process.exit(1) })
