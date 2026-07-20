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
    <aside className="flex h-full flex-col border-r border-white/8 bg-[#13161f]">
      <div className="border-b border-white/8 px-5 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-lg font-serif text-white shadow-lg shadow-indigo-600/25">
            ∑
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-white">MathVault</h1>
            <p className="text-xs text-slate-500">Your maths knowledge base</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-3">
        <p className="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-slate-500">
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
                      ? 'bg-indigo-600/15 text-indigo-200 ring-1 ring-inset ring-indigo-500/30'
                      : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                  }`}
                >
                  <span>{label}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs ${
                      active ? 'bg-indigo-500/20 text-indigo-300' : 'bg-white/5 text-slate-500'
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

      <div className="border-t border-white/8 p-4">
        <p className="text-xs leading-relaxed text-slate-500">
          Write notes in Markdown. Use <code className="text-indigo-300">$...$</code> for inline math
          and <code className="text-indigo-300">$$...$$</code> for display equations.
        </p>
      </div>
    </aside>
  )
}
