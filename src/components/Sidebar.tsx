import { Link } from 'react-router-dom'
import { FEATURED_LESSON, FORMS } from '../taxonomy'
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
  selectedSubtopic: string | 'All'
  onSelectSubtopic: (subtopic: string | 'All') => void
  formCounts: Record<FormLevel | 'All', number>
  sectionCounts: Record<string, number>
  topicCounts: Record<string, number>
  subtopicCounts: Record<string, number>
}

export function Sidebar({ selectedForm, formCounts }: SidebarProps) {
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
            <p className="text-xs text-[#5b6b7c]">Read notes</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto p-3">
        <p className="mb-2 px-3 text-xs font-semibold tracking-wider text-[#5b6b7c] uppercase">
          Lessons
        </p>
        <ul className="space-y-0.5">
          <li>
            <Link
              to={FEATURED_LESSON.path}
              className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition ${
                selectedForm === 'F1'
                  ? 'bg-teal-50 font-semibold text-teal-900 ring-1 ring-teal-100'
                  : 'text-[#243040] hover:bg-[#eef5f2]'
              }`}
            >
              <span>
                <span className="text-teal-800">{FEATURED_LESSON.form}</span>
                {' · '}
                {FEATURED_LESSON.title}
              </span>
              <span className="text-xs text-[#5b6b7c]">{formCounts.F1 ?? 0}</span>
            </Link>
          </li>
        </ul>

        <p className="mt-8 mb-2 px-3 text-xs font-semibold tracking-wider text-[#5b6b7c] uppercase">
          Coming later
        </p>
        <ul className="space-y-0.5 px-1">
          {FORMS.filter((form) => form !== 'F1').map((form) => (
            <li
              key={form}
              className="rounded-xl px-3 py-2 text-sm text-[#94a3b8]"
            >
              {form} — not published yet
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
