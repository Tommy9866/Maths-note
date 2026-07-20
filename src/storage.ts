import type { MathEntry } from './types'

const STORAGE_KEY = 'mathvault-entries-v1'

export function loadEntries(): MathEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return getSampleEntries()
    const parsed = JSON.parse(raw) as MathEntry[]
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : getSampleEntries()
  } catch {
    return getSampleEntries()
  }
}

export function saveEntries(entries: MathEntry[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
}

export function exportEntries(entries: MathEntry[]): void {
  const blob = new Blob([JSON.stringify(entries, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = `mathvault-backup-${new Date().toISOString().slice(0, 10)}.json`
  anchor.click()
  URL.revokeObjectURL(url)
}

export function importEntries(file: File): Promise<MathEntry[]> {
  return file.text().then((text) => {
    const parsed = JSON.parse(text) as MathEntry[]
    if (!Array.isArray(parsed)) throw new Error('Invalid backup file')
    return parsed
  })
}

function getSampleEntries(): MathEntry[] {
  const now = new Date().toISOString()
  return [
    {
      id: crypto.randomUUID(),
      title: 'Quadratic Formula',
      category: 'Algebra',
      tags: ['polynomials', 'roots'],
      createdAt: now,
      updatedAt: now,
      content: `The solutions of $ax^2 + bx + c = 0$ (with $a \\neq 0$) are:

$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$

The expression $\\Delta = b^2 - 4ac$ is called the **discriminant**:

- $\\Delta > 0$ → two distinct real roots
- $\\Delta = 0$ → one repeated real root
- $\\Delta < 0$ → two complex conjugate roots`,
    },
    {
      id: crypto.randomUUID(),
      title: 'Derivative Rules',
      category: 'Calculus',
      tags: ['derivatives', 'rules'],
      createdAt: now,
      updatedAt: now,
      content: `## Basic rules

| Rule | Formula |
|------|---------|
| Power | $\\frac{d}{dx}x^n = nx^{n-1}$ |
| Sum | $\\frac{d}{dx}(f+g) = f' + g'$ |
| Product | $\\frac{d}{dx}(fg) = f'g + fg'$ |
| Chain | $\\frac{d}{dx}f(g(x)) = f'(g(x)) \\cdot g'(x)$ |

## Common derivatives

- $\\frac{d}{dx}\\sin x = \\cos x$
- $\\frac{d}{dx}\\cos x = -\\sin x$
- $\\frac{d}{dx}e^x = e^x$
- $\\frac{d}{dx}\\ln x = \\frac{1}{x}$`,
    },
    {
      id: crypto.randomUUID(),
      title: 'Pythagorean Theorem',
      category: 'Geometry',
      tags: ['triangles', 'classical'],
      createdAt: now,
      updatedAt: now,
      content: `In a right triangle with legs $a$, $b$ and hypotenuse $c$:

$$a^2 + b^2 = c^2$$

> Useful for finding distances in coordinate geometry: the distance between $(x_1, y_1)$ and $(x_2, y_2)$ is
> $$d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$$`,
    },
  ]
}
