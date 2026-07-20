import { DSE_SECTIONS, sectionLabel } from '../taxonomy'
import type { FormLevel } from '../taxonomy'

interface FormBadgeProps {
  form: FormLevel
  onClick?: (form: FormLevel) => void
  active?: boolean
}

export function FormBadge({ form, onClick, active }: FormBadgeProps) {
  const className = `inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ring-1 ring-inset transition ${
    active
      ? 'bg-teal-700 text-white ring-teal-700'
      : 'bg-teal-50 text-teal-800 ring-teal-200 hover:bg-teal-100'
  } ${onClick ? 'cursor-pointer' : ''}`

  if (onClick) {
    return (
      <button
        type="button"
        className={className}
        onClick={(e) => {
          e.stopPropagation()
          onClick(form)
        }}
        title={`Show only ${form}`}
      >
        {form}
      </button>
    )
  }

  return <span className={className}>{form}</span>
}

interface TopicBadgeProps {
  topic: string
  onClick?: (topic: string) => void
  active?: boolean
}

export function TopicBadge({ topic, onClick, active }: TopicBadgeProps) {
  const className = `inline-flex max-w-full items-center truncate rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset transition ${
    active
      ? 'bg-sky-700 text-white ring-sky-700'
      : 'bg-sky-50 text-sky-900 ring-sky-200 hover:bg-sky-100'
  } ${onClick ? 'cursor-pointer' : ''}`

  if (onClick) {
    return (
      <button
        type="button"
        className={className}
        onClick={(e) => {
          e.stopPropagation()
          onClick(topic)
        }}
        title={`Show only “${topic}”`}
      >
        {topic}
      </button>
    )
  }

  return <span className={className}>{topic}</span>
}

interface SubtopicBadgeProps {
  subtopic: string
  onClick?: (subtopic: string) => void
  active?: boolean
}

export function SubtopicBadge({ subtopic, onClick, active }: SubtopicBadgeProps) {
  const className = `inline-flex max-w-full items-center truncate rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset transition ${
    active
      ? 'bg-amber-700 text-white ring-amber-700'
      : 'bg-amber-50 text-amber-900 ring-amber-200 hover:bg-amber-100'
  } ${onClick ? 'cursor-pointer' : ''}`

  if (onClick) {
    return (
      <button
        type="button"
        className={className}
        onClick={(e) => {
          e.stopPropagation()
          onClick(subtopic)
        }}
        title={`Show only “${subtopic}”`}
      >
        {subtopic}
      </button>
    )
  }

  return <span className={className}>{subtopic}</span>
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
