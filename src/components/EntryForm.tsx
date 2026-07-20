import { useState } from 'react'
import { CATEGORIES } from '../types'
import type { Category, MathEntry } from '../types'
import { MathContent } from './MathContent'

interface EntryFormProps {
  initial?: MathEntry
  onSave: (data: {
    title: string
    content: string
    category: Category
    tags: string[]
  }) => void
  onCancel: () => void
}

export function EntryForm({ initial, onSave, onCancel }: EntryFormProps) {
  const [title, setTitle] = useState(initial?.title ?? '')
  const [content, setContent] = useState(initial?.content ?? '')
  const [category, setCategory] = useState<Category>(initial?.category ?? 'Algebra')
  const [tagsInput, setTagsInput] = useState(initial?.tags.join(', ') ?? '')
  const [showPreview, setShowPreview] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    const tags = tagsInput
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean)

    onSave({ title: title.trim(), content, category, tags })
  }

  return (
    <form onSubmit={handleSubmit} className="flex h-full flex-col">
      <header className="border-b border-white/8 px-8 py-6">
        <h2 className="text-xl font-semibold text-white">
          {initial ? 'Edit note' : 'New note'}
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Use Markdown for formatting. LaTeX: <code className="text-indigo-300">$x^2$</code> inline,
          <code className="ml-1 text-indigo-300">$$\int_0^1 x\,dx$$</code> display.
        </p>
      </header>

      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="grid gap-4">
          <div>
            <label htmlFor="title" className="mb-1.5 block text-sm font-medium text-slate-300">
              Title
            </label>
            <input
              id="title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Integration by parts"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="category" className="mb-1.5 block text-sm font-medium text-slate-300">
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="w-full rounded-lg border border-white/10 bg-[#1a1d27] px-4 py-2.5 text-sm text-white outline-none transition focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="tags" className="mb-1.5 block text-sm font-medium text-slate-300">
                Tags
              </label>
              <input
                id="tags"
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="derivatives, limits, proofs"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label htmlFor="content" className="text-sm font-medium text-slate-300">
                Content
              </label>
              <button
                type="button"
                onClick={() => setShowPreview((prev) => !prev)}
                className="text-xs font-medium text-indigo-400 hover:text-indigo-300"
              >
                {showPreview ? 'Hide preview' : 'Show preview'}
              </button>
            </div>

            {showPreview ? (
              <div className="min-h-64 rounded-lg border border-white/10 bg-white/[0.02] p-4">
                {content.trim() ? (
                  <MathContent content={content} />
                ) : (
                  <p className="text-sm text-slate-500">Nothing to preview yet.</p>
                )}
              </div>
            ) : (
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={'## Key idea\n\nThe derivative of $x^n$ is $nx^{n-1}$.\n\n$$\\int_a^b f(x)\\,dx = F(b) - F(a)$$'}
                rows={16}
                className="w-full resize-y rounded-lg border border-white/10 bg-white/5 px-4 py-3 font-mono text-sm leading-relaxed text-white outline-none transition focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20"
              />
            )}
          </div>
        </div>
      </div>

      <footer className="flex items-center justify-end gap-2 border-t border-white/8 px-8 py-4">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-white/10 px-4 py-2 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-slate-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!title.trim()}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {initial ? 'Save changes' : 'Create note'}
        </button>
      </footer>
    </form>
  )
}
