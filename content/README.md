# Maths notes (Cursor-first)

Add knowledge here as Markdown files. The website loads every `.md` file in `content/notes/`.

## Add a note with Cursor

Ask Cursor something like:

> Add a note about integration by parts under Calculus

Or create a file yourself:

```text
content/notes/integration-by-parts.md
```

## File format

```markdown
---
title: Integration by Parts
category: Calculus
tags: integrals, techniques
---

Your explanation and formulas here.

Inline math: $u\,dv = uv - \int v\,du$

Display math:

$$\int u\,dv = uv - \int v\,du$$
```

### Fields

| Field | Required | Notes |
|-------|----------|--------|
| `title` | yes | Shown in the library |
| `category` | yes | One of: Algebra, Calculus, Geometry, Linear Algebra, Number Theory, Statistics, Combinatorics, Other |
| `tags` | no | Comma-separated |

After you add or edit notes, commit and push (or redeploy) so the live site updates.
