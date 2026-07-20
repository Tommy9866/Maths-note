import { Link } from 'react-router-dom'
import { DSE_SECTIONS, FORMS, sectionLabel } from '../taxonomy'
import type { FormLevel } from '../taxonomy'
import type { BrowseMode } from '../types'

interface SidebarProps {
  mode: BrowseMode
  onModeChange: (mode: BrowseMode) => void
  selectedForm: FormLevel | 'All'
  onSelectForm: (form: FormLevel | 'All') => void
  selectedSectionId: string | 'All'
  onSelectSection: (sectionId: string | 'All') => void
  selectedTopic: string | 'All'
  onSelectTopic: (topic: string | 'All') => void
  formCounts: Record<FormLevel | 'All', number>
  sectionCounts: Record<string, number>
  topicCounts: Record<string, number>
}

export function Sidebar({
  mode,
  onModeChange,
  selectedForm,
  onSelectForm,
  selectedSectionId,
  onSelectSection,
  selectedTopic,
  onSelectTopic,
  formCounts,
  sectionCounts,
  topicCounts,
}: SidebarProps) {
  const activeSection = DSE_SECTIONS.find((section) => section.id === selectedSectionId)

  return (
    <aside className="flex h-full flex-col border-r border-[#d7e3dd] bg-white/85 backdrop-blur">
      <div className="border-b border-[#d7e3dd] px-5 py-5">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-700 font-display text-lg text-white shadow-md shadow-teal-700/20">
            ∑
          </div>
          <div>
            <h1 className="font-display text-lg font-semibold tracking-tight text-[#18212b]">
              MathVault
            </h1>
            <p className="text-xs text-[#5b6b7c]">Browse & read</p>
          </div>
        </Link>
      </div>

      <div className="border-b border-[#d7e3dd] p-3">
        <div className="grid grid-cols-2 gap-1 rounded-xl bg-[#eef5f2] p-1">
          <button
            type="button"
            onClick={() => onModeChange('form')}
            className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
              mode === 'form'
                ? 'bg-white text-teal-900 shadow-sm'
                : 'text-[#5b6b7c] hover:text-[#18212b]'
            }`}
          >
            By Form
          </button>
          <button
            type="button"
            onClick={() => onModeChange('dse')}
            className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
              mode === 'dse'
                ? 'bg-white text-teal-900 shadow-sm'
                : 'text-[#5b6b7c] hover:text-[#18212b]'
            }`}
          >
            By DSE
          </button>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-3">
        {mode === 'form' ? (
          <>
            <p className="mb-2 px-3 text-xs font-semibold tracking-wider text-[#5b6b7c] uppercase">
              Form
            </p>
            <ul className="space-y-0.5">
              <FormRow
                label="All forms"
                active={selectedForm === 'All'}
                count={formCounts.All}
                onClick={() => onSelectForm('All')}
              />
              {FORMS.map((form) => (
                <FormRow
                  key={form}
                  label={form}
                  active={selectedForm === form}
                  count={formCounts[form]}
                  onClick={() => onSelectForm(form)}
                />
              ))}
            </ul>
          </>
        ) : (
          <>
            <p className="mb-2 px-3 text-xs font-semibold tracking-wider text-[#5b6b7c] uppercase">
              DSE sections
            </p>
            <ul className="mb-4 space-y-0.5">
              <FormRow
                label="All sections"
                active={selectedSectionId === 'All'}
                count={sectionCounts.All ?? 0}
                onClick={() => {
                  onSelectSection('All')
                  onSelectTopic('All')
                }}
              />
              {DSE_SECTIONS.map((section) => (
                <FormRow
                  key={section.id}
                  label={sectionLabel(section)}
                  active={selectedSectionId === section.id}
                  count={sectionCounts[section.id] ?? 0}
                  onClick={() => {
                    onSelectSection(section.id)
                    onSelectTopic('All')
                  }}
                />
              ))}
            </ul>

            {activeSection && (
              <>
                <p className="mb-2 px-3 text-xs font-semibold tracking-wider text-[#5b6b7c] uppercase">
                  Topics
                </p>
                <ul className="space-y-0.5">
                  <FormRow
                    label="All topics in section"
                    active={selectedTopic === 'All'}
                    count={sectionCounts[activeSection.id] ?? 0}
                    onClick={() => onSelectTopic('All')}
                  />
                  {activeSection.topics.map((topic) => (
                    <FormRow
                      key={topic}
                      label={topic}
                      active={selectedTopic === topic}
                      count={topicCounts[topic] ?? 0}
                      onClick={() => onSelectTopic(topic)}
                    />
                  ))}
                </ul>
              </>
            )}
          </>
        )}
      </nav>
    </aside>
  )
}

function FormRow({
  label,
  active,
  count,
  onClick,
}: {
  label: string
  active: boolean
  count: number
  onClick: () => void
}) {
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm transition ${
          active
            ? 'bg-teal-50 text-teal-900 ring-1 ring-inset ring-teal-200'
            : 'text-[#5b6b7c] hover:bg-[#eef5f2] hover:text-[#18212b]'
        }`}
      >
        <span className="leading-snug">{label}</span>
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 text-xs ${
            active ? 'bg-teal-100 text-teal-800' : 'bg-[#eef5f2] text-[#5b6b7c]'
          }`}
        >
          {count}
        </span>
      </button>
    </li>
  )
}
