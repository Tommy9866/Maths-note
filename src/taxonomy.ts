export const FORMS = ['F1', 'F2', 'F3', 'F4', 'F5', 'F6'] as const
export type FormLevel = (typeof FORMS)[number]

export interface DseSection {
  id: string
  roman: string
  title: string
  topics: string[]
}

export interface TopicSubtopic {
  name: string
  typicalForms: FormLevel[]
}

/** Published catalogue — keep small while content is built one topic at a time. */
export const DSE_SECTIONS: DseSection[] = [
  {
    id: 'junior',
    roman: 'IV',
    title: 'Junior Secondary Foundation Topics',
    topics: ['Other Typical Topics'],
  },
]

export const TOPIC_SUBTOPICS: Record<string, TopicSubtopic[]> = {
  'Other Typical Topics': [{ name: 'Divisibility Rules', typicalForms: ['F1'] }],
}

/** Featured lesson shown on the home page. */
export const FEATURED_LESSON = {
  id: 'divisibility-rules',
  title: 'Divisibility Rules',
  form: 'F1' as FormLevel,
  path: '/app?group=form&form=F1',
}

export const ALL_DSE_TOPICS = DSE_SECTIONS.flatMap((section) => section.topics)

export function findDseSectionByTopic(topic: string): DseSection | undefined {
  return DSE_SECTIONS.find((section) => section.topics.includes(topic))
}

export function getSubtopicsForTopic(topic: string): TopicSubtopic[] {
  return TOPIC_SUBTOPICS[topic] ?? []
}

export function sectionLabel(section: DseSection): string {
  return `${section.roman}. ${section.title}`
}
