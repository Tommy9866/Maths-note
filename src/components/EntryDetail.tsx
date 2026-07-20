import type { MathEntry } from '../types'
import { CategoryBadge } from './CategoryBadge'
import { MathContent } from './MathContent'

interface EntryDetailProps {
  entry: MathEntry
}

export function EntryDetail({ entry }: EntryDetailProps) {
  return (
    <article className="flex h-full flex-col">
      <header className="border-b border-[#d7e3dd] bg-white/60 px-8 py-6 backdrop-blur">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <CategoryBadge category={entry.category} size="md" />
          {entry.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-[#eef5f2] px-2 py-0.5 text-xs text-[#5b6b7c]"
            >
              #{tag}
            </span>
          ))}
        </div>
        <h2 className="font-display text-3xl font-semibold tracking-tight text-[#18212b]">
          {entry.title}
        </h2>
        {entry.sourcePath && (
          <p className="mt-2 text-xs text-[#5b6b7c]">
            Source: <code className="text-teal-800">{entry.sourcePath}</code>
          </p>
        )}
      </header>

      <div className="flex-1 overflow-y-auto px-8 py-6">
        <MathContent content={entry.content} />
      </div>
    </article>
  )
}
