import { DSE_SECTIONS, sectionLabel } from '../taxonomy'
import type { MathEntry } from '../types'
import { MathContent } from './MathContent'
import { FormBadge, TopicBadge } from './TopicBadges'

interface EntryDetailProps {
  entry: MathEntry
}

export function EntryDetail({ entry }: EntryDetailProps) {
  const section = DSE_SECTIONS.find((item) => item.id === entry.dseSectionId)

  return (
    <article className="flex h-full flex-col">
      <header className="border-b border-[#d7e3dd] bg-white/60 px-8 py-6 backdrop-blur">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {entry.forms.map((form) => (
            <FormBadge key={form} form={form} />
          ))}
          <TopicBadge topic={entry.dseTopic} />
        </div>
        <h2 className="font-display text-3xl font-semibold tracking-tight text-[#18212b]">
          {entry.title}
        </h2>
        {section && (
          <p className="mt-2 text-sm text-[#5b6b7c]">{sectionLabel(section)}</p>
        )}
      </header>

      <div className="flex-1 overflow-y-auto px-8 py-6">
        <MathContent content={entry.content} />
      </div>
    </article>
  )
}
