# MathVault

A personal website for storing and organising your mathematics knowledge.

## Live demo

**Public link (everyone can open):**  
[https://tommy9866.github.io/Maths-note/](https://tommy9866.github.io/Maths-note/)

- Demo landing page: [https://tommy9866.github.io/Maths-note/](https://tommy9866.github.io/Maths-note/)
- Full app: [https://tommy9866.github.io/Maths-note/#/app](https://tommy9866.github.io/Maths-note/#/app)

> If the link shows a 404, GitHub Pages may still be deploying (usually 2–5 minutes after the first deploy).

## Features

- **Demo landing page** — Shareable intro with a sample LaTeX note
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

Open [http://localhost:5173/Maths-note/](http://localhost:5173/Maths-note/) in your browser.

## Writing maths

Use standard Markdown for headings, lists, and tables. For mathematics:

- Inline: `$E = mc^2$`
- Display: `$$\sum_{n=1}^{\infty} \frac{1}{n^2} = \frac{\pi^2}{6}$$`

## Build & deploy

```bash
npm run build
npm run preview
```

Deploy to GitHub Pages:

```bash
npm run deploy
```

Or push to `main` / this feature branch — the GitHub Actions workflow publishes automatically.

## Tech stack

- React + TypeScript + Vite
- Tailwind CSS
- KaTeX (via react-markdown, remark-math, rehype-katex)
- GitHub Pages for the public demo
