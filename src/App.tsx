import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { EntryDetail } from './components/EntryDetail'
import { EntryList } from './components/EntryList'
import { Sidebar } from './components/Sidebar'
import { filterEntries, useEntries } from './hooks/useEntries'
import { FEATURED_LESSON, FORMS } from './taxonomy'
import type { FormLevel } from './taxonomy'
import type { BrowseMode, ViewMode } from './types'

function App() {
  const { entries } = useEntries()
  const [searchParams, setSearchParams] = useSearchParams()
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const mode: BrowseMode = 'form'
  const selectedForm = normalizeForm(searchParams.get('form')) || 'F1'

  const filteredEntries = useMemo(
    () =>
      filterEntries(entries, {
        mode,
        form: selectedForm,
        sectionId: 'All',
        topic: 'All',
        subtopic: 'All',
        query: '',
      }),
    [entries, selectedForm],
  )

  // Auto-open the only lesson so the user lands in the reader, not a maze.
  useEffect(() => {
    if (filteredEntries.length === 1) {
      setSelectedId(filteredEntries[0].id)
      setViewMode('view')
      return
    }
    if (filteredEntries.length === 0) {
      setSelectedId(null)
      setViewMode('list')
    }
  }, [filteredEntries])

  const selectedEntry = useMemo(
    () => entries.find((entry) => entry.id === selectedId) ?? null,
    [entries, selectedId],
  )

  const formCounts = useMemo(() => {
    const result = { All: entries.length } as Record<FormLevel | 'All', number>
    for (const form of FORMS) {
      result[form] = entries.filter((entry) => entry.forms.includes(form)).length
    }
    return result
  }, [entries])

  const emptyCounts = useMemo(() => ({ All: 0 }), [])

  const updateForm = (form: FormLevel | 'All') => {
    const params = new URLSearchParams()
    params.set('group', 'form')
    if (form !== 'All') params.set('form', form)
    setSearchParams(params)
  }

  return (
    <div className="flex h-full">
      <div className="hidden w-72 shrink-0 lg:block">
        <Sidebar
          mode={mode}
          onModeChange={() => undefined}
          selectedForm={selectedForm}
          onSelectForm={updateForm}
          selectedSectionId="All"
          onSelectSection={() => undefined}
          selectedTopic="All"
          onSelectTopic={() => undefined}
          selectedSubtopic="All"
          onSelectSubtopic={() => undefined}
          formCounts={formCounts}
          sectionCounts={emptyCounts}
          topicCounts={emptyCounts}
          subtopicCounts={emptyCounts}
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between gap-3 border-b border-[#d7e3dd] bg-white/70 px-5 py-4 backdrop-blur">
          <div className="min-w-0">
            <p className="text-xs font-semibold tracking-wide text-teal-800 uppercase">
              {selectedForm === 'All' ? 'Library' : selectedForm}
            </p>
            <h1 className="truncate font-display text-lg font-semibold text-[#18212b]">
              {selectedEntry?.title ?? FEATURED_LESSON.title}
            </h1>
          </div>
          <Link
            to="/"
            className="shrink-0 rounded-xl border border-[#d7e3dd] bg-white px-3 py-2 text-sm text-[#5b6b7c] transition hover:border-teal-300 hover:text-[#18212b]"
          >
            Home
          </Link>
        </header>

        <div className="flex min-h-0 flex-1">
          {filteredEntries.length > 1 && (
            <section
              className={`w-full shrink-0 overflow-y-auto border-r border-[#d7e3dd] bg-white/40 md:w-80 ${
                viewMode !== 'list' && selectedEntry ? 'hidden md:block' : ''
              }`}
            >
              <EntryList
                entries={filteredEntries}
                selectedId={selectedId}
                onSelect={(id) => {
                  setSelectedId(id)
                  setViewMode('view')
                }}
                onFilterForm={updateForm}
                onFilterTopic={() => undefined}
                onFilterSubtopic={() => undefined}
                activeForm={selectedForm}
                activeTopic="All"
                activeSubtopic="All"
              />
            </section>
          )}

          <main className="min-w-0 flex-1 overflow-y-auto">
            {viewMode === 'view' && selectedEntry ? (
              <EntryDetail
                entry={selectedEntry}
                onFilterForm={updateForm}
                onFilterTopic={() => undefined}
                onFilterSubtopic={() => undefined}
                activeForm={selectedForm}
                activeTopic="All"
                activeSubtopic="All"
              />
            ) : (
              <EmptyState count={filteredEntries.length} />
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

function EmptyState({ count }: { count: number }) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-8 py-16 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-teal-50 font-display text-4xl text-teal-700 ring-1 ring-teal-100">
        ∫
      </div>
      <h2 className="font-display text-2xl font-semibold text-[#18212b]">
        {count > 0 ? 'Select a note to read' : 'No lesson here yet'}
      </h2>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-[#5b6b7c]">
        {count > 0
          ? 'Pick a note from the list.'
          : 'Start from Home and open the Form 1 divisibility lesson.'}
      </p>
      <Link
        to={FEATURED_LESSON.path}
        className="mt-6 rounded-xl bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white"
      >
        Open {FEATURED_LESSON.title}
      </Link>
    </div>
  )
}

function normalizeForm(value: string | null): FormLevel | 'All' {
  if (!value) return 'F1'
  const upper = value.toUpperCase()
  return (FORMS as readonly string[]).includes(upper) ? (upper as FormLevel) : 'F1'
}

export default App
