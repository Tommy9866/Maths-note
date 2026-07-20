import { useMemo, useRef, useState } from 'react'
import { filterEntries, useEntries } from './hooks/useEntries'
import { exportEntries, importEntries } from './storage'
import { CATEGORIES } from './types'
import type { Category, ViewMode } from './types'
import { EntryDetail } from './components/EntryDetail'
import { EntryForm } from './components/EntryForm'
import { EntryList } from './components/EntryList'
import { SearchBar } from './components/SearchBar'
import { Sidebar } from './components/Sidebar'

function App() {
  const { entries, addEntry, updateEntry, deleteEntry, replaceAll } = useEntries()
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All')
  const fileInputRef = useRef<HTMLInputElement>(null)

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

  const handleCreate = () => {
    setSelectedId(null)
    setViewMode('create')
  }

  const handleEdit = () => {
    setViewMode('edit')
  }

  const handleDelete = () => {
    if (!selectedEntry) return
    if (window.confirm(`Delete "${selectedEntry.title}"? This cannot be undone.`)) {
      deleteEntry(selectedEntry.id)
      setSelectedId(null)
      setViewMode('list')
    }
  }

  const handleSaveNew = (data: {
    title: string
    content: string
    category: Category
    tags: string[]
  }) => {
    const created = addEntry(data)
    setSelectedId(created.id)
    setViewMode('view')
  }

  const handleSaveEdit = (data: {
    title: string
    content: string
    category: Category
    tags: string[]
  }) => {
    if (!selectedEntry) return
    updateEntry(selectedEntry.id, data)
    setViewMode('view')
  }

  const handleImport = async (file: File) => {
    try {
      const imported = await importEntries(file)
      if (
        entries.length > 0 &&
        !window.confirm('Import will replace all current notes. Continue?')
      ) {
        return
      }
      replaceAll(imported)
      setSelectedId(null)
      setViewMode('list')
    } catch {
      window.alert('Could not import file. Please check the JSON format.')
    }
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
        <header className="flex flex-wrap items-center gap-3 border-b border-white/8 bg-[#13161f]/80 px-5 py-4 backdrop-blur">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <div className="lg:hidden">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as Category | 'All')}
                className="rounded-lg border border-white/10 bg-[#1a1d27] px-3 py-2 text-sm text-white outline-none"
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
            <button
              type="button"
              onClick={() => exportEntries(entries)}
              className="rounded-lg border border-white/10 px-3 py-2 text-sm text-slate-400 transition hover:bg-white/5 hover:text-slate-200"
              title="Export backup"
            >
              Export
            </button>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="rounded-lg border border-white/10 px-3 py-2 text-sm text-slate-400 transition hover:bg-white/5 hover:text-slate-200"
              title="Import backup"
            >
              Import
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/json,.json"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) void handleImport(file)
                e.target.value = ''
              }}
            />
            <button
              type="button"
              onClick={handleCreate}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500"
            >
              + New note
            </button>
          </div>
        </header>

        <div className="flex min-h-0 flex-1">
          <section
            className={`w-full shrink-0 overflow-y-auto border-r border-white/8 bg-[#0f1117] md:w-80 lg:w-96 ${
              viewMode !== 'list' && selectedEntry ? 'hidden md:block' : ''
            }`}
          >
            <EntryList
              entries={filteredEntries}
              selectedId={selectedId}
              onSelect={handleSelect}
            />
          </section>

          <main className="min-w-0 flex-1 overflow-y-auto bg-[#0f1117]">
            {viewMode === 'create' && (
              <EntryForm onSave={handleSaveNew} onCancel={() => setViewMode('list')} />
            )}

            {viewMode === 'edit' && selectedEntry && (
              <EntryForm
                initial={selectedEntry}
                onSave={handleSaveEdit}
                onCancel={() => setViewMode('view')}
              />
            )}

            {viewMode === 'view' && selectedEntry && (
              <EntryDetail entry={selectedEntry} onEdit={handleEdit} onDelete={handleDelete} />
            )}

            {viewMode === 'list' && !selectedEntry && (
              <EmptyState onCreate={handleCreate} hasEntries={entries.length > 0} />
            )}

            {viewMode === 'view' && !selectedEntry && (
              <EmptyState onCreate={handleCreate} hasEntries={entries.length > 0} />
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

function EmptyState({
  onCreate,
  hasEntries,
}: {
  onCreate: () => void
  hasEntries: boolean
}) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-8 py-16 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-600/20 to-violet-600/20 text-4xl ring-1 ring-indigo-500/20">
        ∫
      </div>
      <h2 className="text-xl font-semibold text-white">
        {hasEntries ? 'Select a note' : 'Start building your maths library'}
      </h2>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-500">
        {hasEntries
          ? 'Choose a note from the list to read it, or create a new one.'
          : 'Capture theorems, formulas, proofs, and problem-solving techniques — all with beautiful LaTeX rendering.'}
      </p>
      <button
        type="button"
        onClick={onCreate}
        className="mt-6 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-500"
      >
        Create your first note
      </button>
    </div>
  )
}

export default App
