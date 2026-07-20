import { DSE_SECTIONS, sectionLabel } from '../taxonomy'
import type { FormLevel } from '../taxonomy'

export function FormBadge({ form }: { form: FormLevel }) {
  return (
    <span className="inline-flex items-center rounded-full bg-teal-50 px-2 py-0.5 text-xs font-semibold text-teal-800 ring-1 ring-inset ring-teal-200">
      {form}
    </span>
  )
}

export function TopicBadge({ topic }: { topic: string }) {
  return (
    <span className="inline-flex max-w-full items-center truncate rounded-full bg-sky-50 px-2 py-0.5 text-xs font-medium text-sky-900 ring-1 ring-inset ring-sky-200">
      {topic}
    </span>
  )
}

export function SectionBadge({ sectionId }: { sectionId: string }) {
  const section = DSE_SECTIONS.find((item) => item.id === sectionId)
  if (!section) return null
  return (
    <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700 ring-1 ring-inset ring-slate-200">
      {sectionLabel(section)}
    </span>
  )
}
