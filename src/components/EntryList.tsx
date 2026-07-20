import type { MathEntry } from '../types'
import { CategoryBadge } from './CategoryBadge'

interface EntryListProps {
  entries: MathEntry[]
  selectedId: string | null
  onSelect: (id: string) => void
}

export function EntryList({ entries, selectedId, onSelect }: EntryListProps) {
  if (entries.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eef5f2] font-display text-2xl text-teal-700">
          ∅
        </div>
        <h3 className="font-display text-base font-semibold text-[#18212b]">No notes found</h3>
        <p className="mt-1 max-w-xs text-sm text-[#5b6b7c]">
          Try another search, or ask Cursor to add a note in <code>content/notes/</code>.
        </p>
      </div>
    )
  }

  return (
    <ul className="divide-y divide-[#e4efe9]">
      {entries.map((entry) => {
        const active = entry.id === selectedId
        return (
          <li key={entry.id}>
            <button
              type="button"
              onClick={() => onSelect(entry.id)}
              className={`w-full px-5 py-4 text-left transition ${
                active ? 'bg-teal-50/80' : 'hover:bg-white/70'
              }`}
            >
              <div className="mb-2 flex items-start justify-between gap-3">
                <h3
                  className={`font-display leading-snug font-semibold ${
                    active ? 'text-teal-950' : 'text-[#18212b]'
                  }`}
                >
                  {entry.title}
                </h3>
              </div>
              <div className="mb-2">
                <CategoryBadge category={entry.category} />
              </div>
              {entry.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {entry.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-[#eef5f2] px-1.5 py-0.5 text-xs text-[#5b6b7c]"
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
