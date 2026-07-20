import type { FormLevel } from '../taxonomy'
import type { BrowseMode } from '../types'

interface ActiveFiltersProps {
  mode: BrowseMode
  form: FormLevel | 'All'
  sectionLabel?: string
  topic: string | 'All'
  subtopic: string | 'All'
  resultCount: number
  onClear: () => void
}

export function ActiveFilters({
  mode,
  form,
  sectionLabel,
  topic,
  subtopic,
  resultCount,
  onClear,
}: ActiveFiltersProps) {
  const chips: string[] = []
  if (mode === 'form' && form !== 'All') chips.push(form)
  if (mode === 'dse' && sectionLabel) chips.push(sectionLabel)
  if (topic !== 'All') chips.push(topic)
  if (subtopic !== 'All') chips.push(subtopic)

  if (chips.length === 0) return null

  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-[#d7e3dd] bg-teal-50/50 px-5 py-2.5">
      <span className="text-xs font-semibold tracking-wide text-teal-800 uppercase">Showing</span>
      {chips.map((chip) => (
        <span
          key={chip}
          className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-teal-900 ring-1 ring-teal-200"
        >
          {chip}
        </span>
      ))}
      <span className="text-xs text-[#5b6b7c]">{resultCount} notes</span>
      <button
        type="button"
        onClick={onClear}
        className="ml-auto text-xs font-medium text-teal-800 underline-offset-2 hover:underline"
      >
        Clear filter
      </button>
    </div>
  )
}
