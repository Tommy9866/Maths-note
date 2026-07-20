import { useMemo } from 'react'
import { loadRepoNotes } from '../lib/loadNotes'
import type { FormLevel } from '../taxonomy'
import type { BrowseMode, MathEntry } from '../types'

const notes = loadRepoNotes()

export function useEntries() {
  return useMemo(() => ({ entries: notes }), [])
}

export interface NoteFilters {
  mode: BrowseMode
  form: FormLevel | 'All'
  sectionId: string | 'All'
  topic: string | 'All'
  query: string
}

export function filterEntries(entries: MathEntry[], filters: NoteFilters): MathEntry[] {
  const normalizedQuery = filters.query.trim().toLowerCase()

  return entries.filter((entry) => {
    if (filters.mode === 'form') {
      if (filters.form !== 'All' && !entry.forms.includes(filters.form)) return false
    } else {
      if (filters.sectionId !== 'All' && entry.dseSectionId !== filters.sectionId) return false
      if (filters.topic !== 'All' && entry.dseTopic !== filters.topic) return false
    }

    if (!normalizedQuery) return true
    const haystack = [
      entry.title,
      entry.content,
      entry.dseTopic,
      ...entry.forms,
      ...entry.tags,
    ]
      .join(' ')
      .toLowerCase()
    return haystack.includes(normalizedQuery)
  })
}
