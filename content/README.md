# Notes (internal)

Markdown notes loaded by the site. Frontmatter:

```yaml
---
title: Percentage Change
form: F1
section: junior
topic: Percentages
subtopic: Percentage Change
tags: foundation
---
```

- `form`: one or more of F1–F6 (match the content level)
- `section`: `algebra-functions` | `geometry` | `statistics` | `junior`
- `topic`: DSE topic name from `src/taxonomy.ts`
- `subtopic`: smaller unit inside the topic (split by content, e.g. Percentage Change vs Simple Interest)

### Note body style

Prefer this structure:

1. **Formula table** for lists of formulas  
2. **Derivation** (short why / proof idea)  
3. **Number examples** (worked values in a table)

Enrichment / beyond-syllabus facts use subtopic `Enrichment Facts`.

### Diagrams

```markdown
[[diagram:right-triangle|Optional caption]]
```

Ids:

- Geometry / graphs: `right-triangle`, `parabola`, `straight-line`, `circle-area`, `cylinder`, `function-curve`, `box-plot`, `percentage-bar`
- F1 demo-style aids: `digit-sum`, `divisibility-digits`, `index-notation`, `prime-vs-composite`, `factor-tree`, `short-division-prime`, `short-division-hcf`, `short-division-lcm`, `order-brackets`, `decimal-align`
