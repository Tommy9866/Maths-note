import type { Components } from 'react-markdown'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { Diagram } from './diagrams/Diagram'

interface MathContentProps {
  content: string
  className?: string
}

const markdownComponents: Components = {
  table: ({ children }) => (
    <div className="table-scroll">
      <table>{children}</table>
    </div>
  ),
}

/** Supports [[diagram:id]] or [[diagram:id|caption]] in markdown notes. */
export function MathContent({ content, className = '' }: MathContentProps) {
  const parts = content.split(/\[\[diagram:([a-z0-9-]+)(?:\|([^\]]+))?\]\]/g)

  return (
    <div className={`math-content max-w-none ${className}`}>
      {parts.map((part, index) => {
        if (index % 3 === 0) {
          if (!part.trim()) return null
          return (
            <ReactMarkdown
              key={index}
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[[rehypeKatex, { throwOnError: false, strict: 'ignore' }]]}
              components={markdownComponents}
            >
              {part}
            </ReactMarkdown>
          )
        }
        if (index % 3 === 1) {
          const caption = parts[index + 1] || undefined
          return <Diagram key={index} id={part} caption={caption} />
        }
        return null
      })}
    </div>
  )
}
