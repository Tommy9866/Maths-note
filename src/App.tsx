import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { filterEntries, useEntries } from './hooks/useEntries'
import { DSE_SECTIONS, FORMS } from './taxonomy'
import type { FormLevel } from './taxonomy'
import type { BrowseMode, ViewMode } from './types'
import { EntryDetail } from './components/EntryDetail'
import { EntryList } from './components/EntryList'
import { SearchBar } from './components/SearchBar'
import { Sidebar } from './components/Sidebar'

function App() {
  const { entries } = useEntries()
  const [searchParams, setSearchParams] = useSearchParams()
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const mode: BrowseMode = searchParams.get('group') === 'dse' ? 'dse' : 'form'
  const selectedForm = normalizeForm(searchParams.get('form'))
  const selectedSectionId = searchParams.get('section') ?? 'All'
  const selectedTopic = searchParams.get('topic')
    ? decodeURIComponent(searchParams.get('topic')!)
    : 'All'

  useEffect(() => {
    setSelectedId(null)
    setViewMode('list')
  }, [mode, selectedForm, selectedSectionId, selectedTopic, searchQuery])

  const filteredEntries = useMemo(
    () =>
      filterEntries(entries, {
        mode,
        form: selectedForm,
        sectionId: selectedSectionId,
        topic: selectedTopic,
        query: searchQuery,
      }),
    [entries, mode, selectedForm, selectedSectionId, selectedTopic, searchQuery],
  )

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

  const sectionCounts = useMemo(() => {
    const result: Record<string, number> = { All: entries.length }
    for (const section of DSE_SECTIONS) {
      result[section.id] = entries.filter((entry) => entry.dseSectionId === section.id).length
    }
    return result
  }, [entries])

  const topicCounts = useMemo(() => {
    const result: Record<string, number> = {}
    for (const entry of entries) {
      result[entry.dseTopic] = (result[entry.dseTopic] ?? 0) + 1
    }
    return result
  }, [entries])

  const updateParams = (next: {
    group?: BrowseMode
    form?: FormLevel | 'All'
    section?: string
    topic?: string
  }) => {
    const params = new URLSearchParams(searchParams)
    if (next.group) params.set('group', next.group)
    if (next.form !== undefined) {
      if (next.form === 'All') params.delete('form')
      else params.set('form', next.form)
    }
    if (next.section !== undefined) {
      if (next.section === 'All') params.delete('section')
      else params.set('section', next.section)
    }
    if (next.topic !== undefined) {
      if (next.topic === 'All') params.delete('topic')
      else params.set('topic', next.topic)
    }
    setSearchParams(params)
  }

  return (
    <div className="flex h-full">
      <div className="hidden w-72 shrink-0 xl:block">
        <Sidebar
          mode={mode}
          onModeChange={(nextMode) => updateParams({ group: nextMode })}
          selectedForm={selectedForm}
          onSelectForm={(form) => updateParams({ group: 'form', form })}
          selectedSectionId={selectedSectionId}
          onSelectSection={(section) => updateParams({ group: 'dse', section, topic: 'All' })}
          selectedTopic={selectedTopic}
          onSelectTopic={(topic) => updateParams({ group: 'dse', topic })}
          formCounts={formCounts}
          sectionCounts={sectionCounts}
          topicCounts={topicCounts}
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex flex-wrap items-center gap-3 border-b border-[#d7e3dd] bg-white/70 px-5 py-4 backdrop-blur">
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-3">
            <div className="flex rounded-xl bg-[#eef5f2] p-1 xl:hidden">
              <button
                type="button"
                onClick={() => updateParams({ group: 'form' })}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
                  mode === 'form' ? 'bg-white text-teal-900 shadow-sm' : 'text-[#5b6b7c]'
                }`}
              >
                Form
              </button>
              <button
                type="button"
                onClick={() => updateParams({ group: 'dse' })}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
                  mode === 'dse' ? 'bg-white text-teal-900 shadow-sm' : 'text-[#5b6b7c]'
                }`}
              >
                DSE
              </button>
            </div>

            {mode === 'form' ? (
              <select
                value={selectedForm}
                onChange={(e) =>
                  updateParams({ group: 'form', form: e.target.value as FormLevel | 'All' })
                }
                className="rounded-xl border border-[#d7e3dd] bg-white px-3 py-2 text-sm text-[#18212b] outline-none xl:hidden"
              >
                <option value="All">All forms</option>
                {FORMS.map((form) => (
                  <option key={form} value={form}>
                    {form}
                  </option>
                ))}
              </select>
            ) : (
              <select
                value={selectedSectionId}
                onChange={(e) =>
                  updateParams({ group: 'dse', section: e.target.value, topic: 'All' })
                }
                className="max-w-[14rem] rounded-xl border border-[#d7e3dd] bg-white px-3 py-2 text-sm text-[#18212b] outline-none xl:hidden"
              >
                <option value="All">All sections</option>
                {DSE_SECTIONS.map((section) => (
                  <option key={section.id} value={section.id}>
                    {section.roman}. {section.title}
                  </option>
                ))}
              </select>
            )}

            <div className="min-w-0 flex-1">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>
          </div>

          <Link
            to="/"
            className="rounded-xl border border-[#d7e3dd] bg-white px-3 py-2 text-sm text-[#5b6b7c] transition hover:border-teal-300 hover:text-[#18212b]"
          >
            Home
          </Link>
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
              onSelect={(id) => {
                setSelectedId(id)
                setViewMode('view')
              }}
            />
          </section>

          <main className="min-w-0 flex-1 overflow-y-auto">
            {viewMode === 'view' && selectedEntry ? (
              <EntryDetail entry={selectedEntry} />
            ) : (
              <EmptyState count={filteredEntries.length} mode={mode} />
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

function EmptyState({ count, mode }: { count: number; mode: BrowseMode }) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-8 py-16 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-teal-50 font-display text-4xl text-teal-700 ring-1 ring-teal-100">
        ∫
      </div>
      <h2 className="font-display text-2xl font-semibold text-[#18212b]">
        {count > 0 ? 'Select a note to read' : 'Nothing in this view'}
      </h2>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-[#5b6b7c]">
        {count > 0
          ? mode === 'form'
            ? 'Pick a note from the list, or switch form level in the sidebar.'
            : 'Pick a note from the list, or choose another DSE section or topic.'
          : 'Try a different form, section, or topic.'}
      </p>
    </div>
  )
}

function normalizeForm(value: string | null): FormLevel | 'All' {
  if (!value) return 'All'
  const upper = value.toUpperCase()
  return (FORMS as readonly string[]).includes(upper) ? (upper as FormLevel) : 'All'
}

export default App
