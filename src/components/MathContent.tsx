import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { Diagram } from './diagrams/Diagram'

interface MathContentProps {
  content: string
  className?: string
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
            <ReactMarkdown key={index} remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
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
