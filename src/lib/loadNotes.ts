import { ALL_DSE_TOPICS, DSE_SECTIONS, FORMS, findDseSectionByTopic } from '../taxonomy'
import type { FormLevel } from '../taxonomy'
import type { MathEntry } from '../types'

const noteModules = import.meta.glob('../../content/notes/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

export function loadRepoNotes(): MathEntry[] {
  return Object.entries(noteModules)
    .map(([path, raw]) => parseNote(path, raw))
    .filter((entry): entry is MathEntry => entry !== null)
    .sort((a, b) => a.title.localeCompare(b.title))
}

function parseNote(path: string, raw: string): MathEntry | null {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  if (!match) {
    console.warn(`Note missing frontmatter: ${path}`)
    return null
  }

  const frontmatter = parseFrontmatter(match[1])
  const content = match[2].trim()
  const title = frontmatter.title?.trim()
  if (!title) {
    console.warn(`Note missing title: ${path}`)
    return null
  }

  const forms = parseForms(frontmatter.form ?? frontmatter.forms)
  const dseTopic = (frontmatter.topic ?? frontmatter.dse_topic ?? '').trim()
  const sectionFromTopic = findDseSectionByTopic(dseTopic)
  const dseSectionId =
    frontmatter.section?.trim() ||
    sectionFromTopic?.id ||
    DSE_SECTIONS[0].id

  if (dseTopic && !ALL_DSE_TOPICS.includes(dseTopic)) {
    console.warn(`Unknown DSE topic "${dseTopic}" in ${path}`)
  }

  const subtopic = (frontmatter.subtopic ?? title).trim()
  const tags = (frontmatter.tags ?? '')
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean)

  const slug = path
    .split('/')
    .pop()!
    .replace(/\.md$/, '')

  return {
    id: slug,
    title,
    content,
    forms,
    dseSectionId,
    dseTopic: dseTopic || 'Other Typical Topics',
    subtopic,
    tags,
  }
}

function parseFrontmatter(block: string): Record<string, string> {
  const result: Record<string, string> = {}
  for (const line of block.split(/\r?\n/)) {
    const idx = line.indexOf(':')
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    const value = line.slice(idx + 1).trim()
    result[key] = value
  }
  return result
}

function parseForms(value?: string): FormLevel[] {
  if (!value) return []
  return value
    .split(',')
    .map((part) => part.trim().toUpperCase())
    .filter((part): part is FormLevel => (FORMS as readonly string[]).includes(part))
}
