import type { FormLevel } from './taxonomy'

export interface MathEntry {
  id: string
  title: string
  content: string
  forms: FormLevel[]
  dseSectionId: string
  dseTopic: string
  tags: string[]
}

export type BrowseMode = 'form' | 'dse'
export type ViewMode = 'list' | 'view'
