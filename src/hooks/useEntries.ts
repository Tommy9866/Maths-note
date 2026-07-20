import { useCallback, useEffect, useState } from 'react'
import { loadEntries, saveEntries } from '../storage'
import type { Category, MathEntry } from '../types'

export function useEntries() {
  const [entries, setEntries] = useState<MathEntry[]>(() => loadEntries())

  useEffect(() => {
    saveEntries(entries)
  }, [entries])

  const addEntry = useCallback((entry: Omit<MathEntry, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString()
    const newEntry: MathEntry = {
      ...entry,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    }
    setEntries((prev) => [newEntry, ...prev])
    return newEntry
  }, [])

  const updateEntry = useCallback((id: string, updates: Partial<Omit<MathEntry, 'id' | 'createdAt'>>) => {
    setEntries((prev) =>
      prev.map((entry) =>
        entry.id === id
          ? { ...entry, ...updates, updatedAt: new Date().toISOString() }
          : entry,
      ),
    )
  }, [])

  const deleteEntry = useCallback((id: string) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id))
  }, [])

  const replaceAll = useCallback((newEntries: MathEntry[]) => {
    setEntries(newEntries)
  }, [])

  return { entries, addEntry, updateEntry, deleteEntry, replaceAll }
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
      const haystack = [
        entry.title,
        entry.content,
        entry.category,
        ...entry.tags,
      ]
        .join(' ')
        .toLowerCase()
      return haystack.includes(normalizedQuery)
    })
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
}
