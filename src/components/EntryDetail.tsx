import type { FormLevel } from '../taxonomy'
import type { MathEntry } from '../types'
import { MathContent } from './MathContent'

interface EntryDetailProps {
  entry: MathEntry
  onFilterForm: (form: FormLevel) => void
  onFilterTopic: (topic: string) => void
  onFilterSubtopic: (topic: string, subtopic: string) => void
  activeForm: FormLevel | 'All'
  activeTopic: string | 'All'
  activeSubtopic: string | 'All'
}

export function EntryDetail({ entry }: EntryDetailProps) {
  return (
    <article className="flex h-full flex-col">
      <header className="border-b border-[#d7e3dd] bg-white/60 px-6 py-6 backdrop-blur sm:px-10">
        <p className="text-sm font-semibold text-teal-800">
          {entry.forms.join(', ')} · {entry.subtopic}
        </p>
        <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#18212b]">
          {entry.title}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#5b6b7c]">
          Read each worked example in order. Tables at the end are only a quick reminder.
        </p>
      </header>

      <div className="mx-auto w-full max-w-3xl flex-1 overflow-y-auto px-6 py-8 sm:px-10">
        <MathContent content={entry.content} />
      </div>
    </article>
  )
}
