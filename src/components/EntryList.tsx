import type { MathEntry } from '../types'
import { FormBadge, TopicBadge } from './TopicBadges'

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
        <h3 className="font-display text-base font-semibold text-[#18212b]">No notes here</h3>
        <p className="mt-1 max-w-xs text-sm text-[#5b6b7c]">
          Try another form, DSE topic, or search term.
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
              <h3
                className={`mb-2 font-display leading-snug font-semibold ${
                  active ? 'text-teal-950' : 'text-[#18212b]'
                }`}
              >
                {entry.title}
              </h3>
              <div className="mb-2 flex flex-wrap gap-1.5">
                {entry.forms.map((form) => (
                  <FormBadge key={form} form={form} />
                ))}
              </div>
              <TopicBadge topic={entry.dseTopic} />
            </button>
          </li>
        )
      })}
    </ul>
  )
}
