import type { FormLevel } from '../taxonomy'
import type { MathEntry } from '../types'
import { FormBadge, TopicBadge } from './TopicBadges'

interface EntryListProps {
  entries: MathEntry[]
  selectedId: string | null
  onSelect: (id: string) => void
  onFilterForm: (form: FormLevel) => void
  onFilterTopic: (topic: string) => void
  activeForm: FormLevel | 'All'
  activeTopic: string | 'All'
}

export function EntryList({
  entries,
  selectedId,
  onSelect,
  onFilterForm,
  onFilterTopic,
  activeForm,
  activeTopic,
}: EntryListProps) {
  if (entries.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eef5f2] font-display text-2xl text-teal-700">
          ∅
        </div>
        <h3 className="font-display text-base font-semibold text-[#18212b]">No notes here</h3>
        <p className="mt-1 max-w-xs text-sm text-[#5b6b7c]">
          Try another form, DSE topic, or clear the filter.
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
            <div
              className={`w-full px-5 py-4 transition ${
                active ? 'bg-teal-50/80' : 'hover:bg-white/70'
              }`}
            >
              <button type="button" onClick={() => onSelect(entry.id)} className="w-full text-left">
                <h3
                  className={`mb-2 font-display leading-snug font-semibold ${
                    active ? 'text-teal-950' : 'text-[#18212b]'
                  }`}
                >
                  {entry.title}
                </h3>
              </button>
              <div className="mb-2 flex flex-wrap gap-1.5">
                {entry.forms.map((form) => (
                  <FormBadge
                    key={form}
                    form={form}
                    active={activeForm === form}
                    onClick={onFilterForm}
                  />
                ))}
              </div>
              <TopicBadge
                topic={entry.dseTopic}
                active={activeTopic === entry.dseTopic}
                onClick={onFilterTopic}
              />
            </div>
          </li>
        )
      })}
    </ul>
  )
}
