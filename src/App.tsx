import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { filterEntries, useEntries } from './hooks/useEntries'
import { CATEGORIES } from './types'
import type { Category, ViewMode } from './types'
import { EntryDetail } from './components/EntryDetail'
import { EntryList } from './components/EntryList'
import { SearchBar } from './components/SearchBar'
import { Sidebar } from './components/Sidebar'

function App() {
  const { entries } = useEntries()
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All')

  const filteredEntries = useMemo(
    () => filterEntries(entries, searchQuery, selectedCategory),
    [entries, searchQuery, selectedCategory],
  )

  const selectedEntry = useMemo(
    () => entries.find((entry) => entry.id === selectedId) ?? null,
    [entries, selectedId],
  )

  const counts = useMemo(() => {
    const result = { All: entries.length } as Record<Category | 'All', number>
    for (const category of CATEGORIES) {
      result[category] = entries.filter((entry) => entry.category === category).length
    }
    return result
  }, [entries])

  const handleSelect = (id: string) => {
    setSelectedId(id)
    setViewMode('view')
  }

  return (
    <div className="flex h-full">
      <div className="hidden w-64 shrink-0 lg:block">
        <Sidebar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          counts={counts}
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex flex-wrap items-center gap-3 border-b border-[#d7e3dd] bg-white/70 px-5 py-4 backdrop-blur">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <div className="lg:hidden">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as Category | 'All')}
                className="rounded-xl border border-[#d7e3dd] bg-white px-3 py-2 text-sm text-[#18212b] outline-none"
              >
                <option value="All">All topics</option>
                {CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="min-w-0 flex-1">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <Link
              to="/"
              className="rounded-xl border border-[#d7e3dd] bg-white px-3 py-2 text-sm text-[#5b6b7c] transition hover:border-teal-300 hover:text-[#18212b]"
            >
              Home
            </Link>
            <a
              href="https://github.com/Tommy9866/Maths-note/blob/cursor/maths-knowledge-website-3425/content/README.md"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-teal-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-600"
            >
              Add with Cursor
            </a>
          </div>
        </header>

        <div className="flex min-h-0 flex-1">
          <section
            className={`w-full shrink-0 overflow-y-auto border-r border-[#d7e3dd] bg-white/40 md:w-80 lg:w-96 ${
              viewMode !== 'list' && selectedEntry ? 'hidden md:block' : ''
            }`}
          >
            <EntryList
              entries={filteredEntries}
              selectedId={selectedId}
              onSelect={handleSelect}
            />
          </section>

          <main className="min-w-0 flex-1 overflow-y-auto">
            {viewMode === 'view' && selectedEntry ? (
              <EntryDetail entry={selectedEntry} />
            ) : (
              <EmptyState noteCount={entries.length} />
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

function EmptyState({ noteCount }: { noteCount: number }) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-8 py-16 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-teal-50 font-display text-4xl text-teal-700 ring-1 ring-teal-100">
        ∫
      </div>
      <h2 className="font-display text-2xl font-semibold text-[#18212b]">
        {noteCount > 0 ? 'Select a note' : 'Your library is empty'}
      </h2>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-[#5b6b7c]">
        {noteCount > 0
          ? 'Choose a note from the list, or ask Cursor to add a new Markdown file in content/notes/.'
          : 'Ask Cursor to create a note in content/notes/ — then rebuild or redeploy to see it here.'}
      </p>
    </div>
  )
}

export default App
