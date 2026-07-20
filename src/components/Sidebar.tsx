import { Link } from 'react-router-dom'
import { CATEGORIES } from '../types'
import type { Category } from '../types'

interface SidebarProps {
  selectedCategory: Category | 'All'
  onSelectCategory: (category: Category | 'All') => void
  counts: Record<Category | 'All', number>
}

export function Sidebar({ selectedCategory, onSelectCategory, counts }: SidebarProps) {
  const items: { label: string; value: Category | 'All' }[] = [
    { label: 'All topics', value: 'All' },
    ...CATEGORIES.map((category) => ({ label: category, value: category })),
  ]

  return (
    <aside className="flex h-full flex-col border-r border-[#d7e3dd] bg-white/80 backdrop-blur">
      <div className="border-b border-[#d7e3dd] px-5 py-5">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-700 font-display text-lg text-white shadow-md shadow-teal-700/20">
            ∑
          </div>
          <div>
            <h1 className="font-display text-lg font-semibold tracking-tight text-[#18212b]">
              MathVault
            </h1>
            <p className="text-xs text-[#5b6b7c]">Cursor-written maths notes</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto p-3">
        <p className="mb-2 px-3 text-xs font-semibold tracking-wider text-[#5b6b7c] uppercase">
          Categories
        </p>
        <ul className="space-y-0.5">
          {items.map(({ label, value }) => {
            const active = selectedCategory === value
            return (
              <li key={value}>
                <button
                  type="button"
                  onClick={() => onSelectCategory(value)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition ${
                    active
                      ? 'bg-teal-50 text-teal-900 ring-1 ring-inset ring-teal-200'
                      : 'text-[#5b6b7c] hover:bg-[#eef5f2] hover:text-[#18212b]'
                  }`}
                >
                  <span>{label}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs ${
                      active ? 'bg-teal-100 text-teal-800' : 'bg-[#eef5f2] text-[#5b6b7c]'
                    }`}
                  >
                    {counts[value]}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="border-t border-[#d7e3dd] p-4">
        <p className="text-xs leading-relaxed text-[#5b6b7c]">
          Add notes with Cursor in <code className="text-teal-800">content/notes/</code>. Use{' '}
          <code className="text-teal-800">$...$</code> and <code className="text-teal-800">$$...$$</code>{' '}
          for LaTeX.
        </p>
      </div>
    </aside>
  )
}
