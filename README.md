# MathVault

A light, personal maths knowledge base. **Add notes with Cursor** as Markdown files; browse them on the web with LaTeX rendering.

## Live demo

- **Home:** https://tommy9866.github.io/Maths-note/
- **Library:** https://tommy9866.github.io/Maths-note/#/app

## Add maths knowledge with Cursor

Notes live in `content/notes/`. Ask Cursor, for example:

> Add a note about Bayes' theorem under Statistics

Or create a file like `content/notes/bayes-theorem.md`:

```markdown
---
title: Bayes' Theorem
category: Statistics
tags: probability, bayesian
---

$$P(A\mid B) = \frac{P(B\mid A)\,P(A)}{P(B)}$$
```

See [content/README.md](content/README.md) for the full format.

After adding notes, commit and push (or run `npm run deploy`) so the live site updates.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:5173/Maths-note/

## Tech stack

- React + TypeScript + Vite
- Tailwind CSS
- KaTeX via react-markdown
- Notes loaded from `content/notes/*.md` at build time
