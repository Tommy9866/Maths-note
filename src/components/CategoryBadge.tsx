import type { Category } from '../types'

const CATEGORY_COLORS: Record<Category, string> = {
  Algebra: 'bg-teal-50 text-teal-800 ring-teal-200',
  Calculus: 'bg-sky-50 text-sky-800 ring-sky-200',
  Geometry: 'bg-emerald-50 text-emerald-800 ring-emerald-200',
  'Linear Algebra': 'bg-amber-50 text-amber-900 ring-amber-200',
  'Number Theory': 'bg-rose-50 text-rose-800 ring-rose-200',
  Statistics: 'bg-cyan-50 text-cyan-800 ring-cyan-200',
  Combinatorics: 'bg-orange-50 text-orange-900 ring-orange-200',
  Other: 'bg-slate-100 text-slate-700 ring-slate-200',
}

interface CategoryBadgeProps {
  category: Category
  size?: 'sm' | 'md'
}

export function CategoryBadge({ category, size = 'sm' }: CategoryBadgeProps) {
  const sizeClass = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-2.5 py-1'
  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ring-1 ring-inset ${CATEGORY_COLORS[category]} ${sizeClass}`}
    >
      {category}
    </span>
  )
}
