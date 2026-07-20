# MathVault

A personal website for storing and organising your mathematics knowledge.

## Features

- **Rich notes** — Write in Markdown with full LaTeX support (`$inline$` and `$$display$$` math)
- **Categories** — Organise notes by topic: Algebra, Calculus, Geometry, and more
- **Tags** — Add flexible tags for cross-cutting topics
- **Search** — Find notes by title, content, category, or tag
- **Local storage** — Your notes stay in your browser (no account required)
- **Backup** — Export and import your notes as JSON

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Writing maths

Use standard Markdown for headings, lists, and tables. For mathematics:

- Inline: `$E = mc^2$`
- Display: `$$\sum_{n=1}^{\infty} \frac{1}{n^2} = \frac{\pi^2}{6}$$`

## Build

```bash
npm run build
npm run preview
```

## Tech stack

- React + TypeScript + Vite
- Tailwind CSS
- KaTeX (via react-markdown, remark-math, rehype-katex)
