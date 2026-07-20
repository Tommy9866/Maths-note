import type { MathEntry } from '../types'
import { CategoryBadge } from './CategoryBadge'
import { MathContent } from './MathContent'

interface EntryDetailProps {
  entry: MathEntry
  onEdit: () => void
  onDelete: () => void
}

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

export function EntryDetail({ entry, onEdit, onDelete }: EntryDetailProps) {
  return (
    <article className="flex h-full flex-col">
      <header className="border-b border-white/8 px-8 py-6">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <CategoryBadge category={entry.category} size="md" />
          {entry.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-white/5 px-2 py-0.5 text-xs text-slate-400"
            >
              #{tag}
            </span>
          ))}
        </div>
        <h2 className="text-2xl font-semibold tracking-tight text-white">{entry.title}</h2>
        <p className="mt-2 text-xs text-slate-500">
          Updated {formatDateTime(entry.updatedAt)}
          {entry.createdAt !== entry.updatedAt && (
            <> · Created {formatDateTime(entry.createdAt)}</>
          )}
        </p>
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={onEdit}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="rounded-lg border border-white/10 px-4 py-2 text-sm font-medium text-slate-400 transition hover:border-rose-500/30 hover:bg-rose-500/10 hover:text-rose-300"
          >
            Delete
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-8 py-6">
        <MathContent content={entry.content} />
      </div>
    </article>
  )
}
