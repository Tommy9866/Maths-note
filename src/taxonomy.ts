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

/** Smaller content units inside a DSE topic, often tied to different forms. */
export const TOPIC_SUBTOPICS: Record<string, TopicSubtopic[]> = {
  Percentages: [
    { name: 'Percentage Basics', typicalForms: ['F1'] },
    { name: 'Percentage Change', typicalForms: ['F1'] },
    { name: 'Profit and Loss', typicalForms: ['F2'] },
    { name: 'Simple Interest', typicalForms: ['F3'] },
    { name: 'Compound Interest', typicalForms: ['F3'] },
  ],
  Estimation: [
    { name: 'Rounding and Significant Figures', typicalForms: ['F1', 'F2'] },
    { name: 'Error and Approximation', typicalForms: ['F2', 'F3'] },
  ],
  Mensuration: [
    { name: 'Plane Figures', typicalForms: ['F1', 'F2'] },
    { name: 'Solids', typicalForms: ['F2', 'F3'] },
  ],
  'Other Typical Topics': [
    { name: 'Rates and Ratio', typicalForms: ['F1', 'F2'] },
    { name: 'Directed Numbers', typicalForms: ['F1'] },
  ],
  'Quadratic Equations in One Unknown (I)': [
    { name: 'Solving by Factorisation', typicalForms: ['F4'] },
    { name: 'Quadratic Formula', typicalForms: ['F4', 'F5'] },
    { name: 'Nature of Roots', typicalForms: ['F4', 'F5'] },
  ],
  'Quadratic Equations in One Unknown (II)': [
    { name: 'Solving Problems with Quadratics', typicalForms: ['F4', 'F5'] },
  ],
  'Functions and Graphs': [
    { name: 'Function Notation', typicalForms: ['F4'] },
    { name: 'Sketching Graphs', typicalForms: ['F4', 'F5'] },
  ],
  'Equations of Straight Lines': [
    { name: 'Slope and Intercept', typicalForms: ['F4'] },
    { name: 'Forms of a Line', typicalForms: ['F4', 'F5'] },
  ],
  'Trigonometry (I)': [
    { name: 'Trigonometric Ratios', typicalForms: ['F4'] },
    { name: 'Solving Right Triangles', typicalForms: ['F4', 'F5'] },
  ],
  'Measures of Dispersion': [
    { name: 'Range and IQR', typicalForms: ['F5'] },
    { name: 'Variance and Standard Deviation', typicalForms: ['F5', 'F6'] },
  ],
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
