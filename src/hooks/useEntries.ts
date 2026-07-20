import { useMemo } from 'react'
import { loadRepoNotes } from '../lib/loadNotes'
import type { Category, MathEntry } from '../types'

const notes = loadRepoNotes()

export function useEntries() {
  return useMemo(() => ({ entries: notes }), [])
}

export function filterEntries(
  entries: MathEntry[],
  query: string,
  category: Category | 'All',
): MathEntry[] {
  const normalizedQuery = query.trim().toLowerCase()

  return entries
    .filter((entry) => category === 'All' || entry.category === category)
    .filter((entry) => {
      if (!normalizedQuery) return true
      const haystack = [entry.title, entry.content, entry.category, ...entry.tags]
        .join(' ')
        .toLowerCase()
      return haystack.includes(normalizedQuery)
    })
}
