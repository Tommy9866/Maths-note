export const FORMS = ['F1', 'F2', 'F3', 'F4', 'F5', 'F6'] as const
export type FormLevel = (typeof FORMS)[number]

export interface DseSection {
  id: string
  roman: string
  title: string
  topics: string[]
}

export const DSE_SECTIONS: DseSection[] = [
  {
    id: 'algebra-functions',
    roman: 'I',
    title: 'Algebra & Functions',
    topics: [
      'Quadratic Equations in One Unknown (I)',
      'Quadratic Equations in One Unknown (II)',
      'Functions and Graphs',
      'More about Polynomials',
      'Exponential and Logarithmic Functions',
      'Variations',
      'More about Equations',
      'Inequalities',
      'Linear Programming',
      'Arithmetic and Geometric Sequences',
      'Summation of Arithmetic and Geometric Sequences',
      'More about Graphs of Functions',
    ],
  },
  {
    id: 'geometry',
    roman: 'II',
    title: 'Geometry & Analytical Geometry',
    topics: [
      'Equations of Straight Lines',
      'Trigonometry (I)',
      'Basic Properties of Circles (I)',
      'Basic Properties of Circles (II)',
      'Trigonometry (II)',
      'Equations of Circles',
      'Locus',
    ],
  },
  {
    id: 'statistics',
    roman: 'III',
    title: 'Data Handling, Probability & Statistics',
    topics: [
      'Measures of Dispersion',
      'Permutation and Combination',
      'More about Probability',
      'Use and Abuses of Statistics',
    ],
  },
  {
    id: 'junior',
    roman: 'IV',
    title: 'Junior Secondary Foundation Topics',
    topics: ['Percentages', 'Estimation', 'Mensuration', 'Other Typical Topics'],
  },
]

export const ALL_DSE_TOPICS = DSE_SECTIONS.flatMap((section) => section.topics)

export function findDseSectionByTopic(topic: string): DseSection | undefined {
  return DSE_SECTIONS.find((section) => section.topics.includes(topic))
}

export function sectionLabel(section: DseSection): string {
  return `${section.roman}. ${section.title}`
}
