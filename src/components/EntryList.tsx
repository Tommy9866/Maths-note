import type { MathEntry } from '../types'
import { CategoryBadge } from './CategoryBadge'

interface EntryListProps {
  entries: MathEntry[]
  selectedId: string | null
  onSelect: (id: string) => void
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function EntryList({ entries, selectedId, onSelect }: EntryListProps) {
  if (entries.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-2xl text-slate-500">
          ∅
        </div>
        <h3 className="text-base font-medium text-slate-300">No notes found</h3>
        <p className="mt-1 max-w-xs text-sm text-slate-500">
          Try a different search or category, or create a new note to get started.
        </p>
      </div>
    )
  }

  return (
    <ul className="divide-y divide-white/6">
      {entries.map((entry) => {
        const active = entry.id === selectedId
        return (
          <li key={entry.id}>
            <button
              type="button"
              onClick={() => onSelect(entry.id)}
              className={`w-full px-5 py-4 text-left transition ${
                active ? 'bg-indigo-600/10' : 'hover:bg-white/[0.03]'
              }`}
            >
              <div className="mb-2 flex items-start justify-between gap-3">
                <h3
                  className={`font-medium leading-snug ${
                    active ? 'text-indigo-100' : 'text-slate-200'
                  }`}
                >
                  {entry.title}
                </h3>
                <time className="shrink-0 text-xs text-slate-500">{formatDate(entry.updatedAt)}</time>
              </div>
              <div className="mb-2">
                <CategoryBadge category={entry.category} />
              </div>
              {entry.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {entry.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-white/5 px-1.5 py-0.5 text-xs text-slate-500"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </button>
          </li>
        )
      })}
    </ul>
  )
}
