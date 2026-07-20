export type ContentSegment =
  | { type: 'markdown'; text: string }
  | { type: 'diagram'; id: string; caption?: string }
  | { type: 'table'; headers: string[]; rows: string[][] }

const DIAGRAM_RE = /\[\[diagram:([a-z0-9-]+)(?:\|([^\]]+))?\]\]/g
const TABLE_RE =
  /(?:^|\n)(\|[^\n]+\|\r?\n\|[-:\s|]+\|\r?\n(?:\|[^\n]+\|\r?\n?)*)/g

function splitCells(line: string): string[] {
  const trimmed = line.trim().replace(/^\|/, '').replace(/\|$/, '')
  return trimmed.split('|').map((cell) => cell.trim())
}

function isSeparatorRow(line: string): boolean {
  // Keep '-' at the end so it is literal, not a character-class range.
  return /^\|?[:\s|-]+\|?$/.test(line.trim()) && line.includes('-')
}

function parseTableBlock(block: string): { headers: string[]; rows: string[][] } | null {
  const lines = block
    .trim()
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)

  if (lines.length < 2 || !isSeparatorRow(lines[1])) return null

  const headers = splitCells(lines[0])
  const rows = lines
    .slice(2)
    .filter((line) => line.includes('|'))
    .map(splitCells)
    .filter((row) => row.some((cell) => cell.length > 0))

  if (headers.length === 0 || rows.length === 0) return null
  return { headers, rows }
}

function splitByRegex(
  text: string,
  regex: RegExp,
  toSegment: (match: RegExpExecArray) => ContentSegment | null,
): ContentSegment[] {
  const segments: ContentSegment[] = []
  let lastIndex = 0
  const local = new RegExp(regex.source, regex.flags)
  let match: RegExpExecArray | null

  while ((match = local.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: 'markdown', text: text.slice(lastIndex, match.index) })
    }
    const segment = toSegment(match)
    if (segment) segments.push(segment)
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) {
    segments.push({ type: 'markdown', text: text.slice(lastIndex) })
  }

  return segments
}

export function parseNoteContent(content: string): ContentSegment[] {
  const withDiagrams = splitByRegex(content, DIAGRAM_RE, (match) => ({
    type: 'diagram',
    id: match[1],
    caption: match[2] || undefined,
  }))

  const segments: ContentSegment[] = []
  for (const part of withDiagrams) {
    if (part.type !== 'markdown') {
      segments.push(part)
      continue
    }

    const tableParts = splitByRegex(part.text, TABLE_RE, (match) => {
      const parsed = parseTableBlock(match[1] ?? match[0])
      if (!parsed) return { type: 'markdown', text: match[0] }
      return { type: 'table', ...parsed }
    })

    for (const piece of tableParts) {
      if (piece.type === 'markdown' && !piece.text.trim()) continue
      segments.push(piece)
    }
  }

  return segments
}
