import type { Category } from '../types'
import { CATEGORIES } from '../types'

const CATEGORY_COLORS: Record<Category, string> = {
  Algebra: 'bg-violet-500/20 text-violet-300 ring-violet-500/30',
  Calculus: 'bg-blue-500/20 text-blue-300 ring-blue-500/30',
  Geometry: 'bg-emerald-500/20 text-emerald-300 ring-emerald-500/30',
  'Linear Algebra': 'bg-amber-500/20 text-amber-300 ring-amber-500/30',
  'Number Theory': 'bg-rose-500/20 text-rose-300 ring-rose-500/30',
  Statistics: 'bg-cyan-500/20 text-cyan-300 ring-cyan-500/30',
  Combinatorics: 'bg-orange-500/20 text-orange-300 ring-orange-500/30',
  Other: 'bg-slate-500/20 text-slate-300 ring-slate-500/30',
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

export { CATEGORIES, CATEGORY_COLORS }
