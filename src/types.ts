export const CATEGORIES = [
  'Algebra',
  'Calculus',
  'Geometry',
  'Linear Algebra',
  'Number Theory',
  'Statistics',
  'Combinatorics',
  'Other',
] as const

export type Category = (typeof CATEGORIES)[number]

export interface MathEntry {
  id: string
  title: string
  content: string
  category: Category
  tags: string[]
  createdAt: string
  updatedAt: string
}

export type ViewMode = 'list' | 'view' | 'edit' | 'create'
