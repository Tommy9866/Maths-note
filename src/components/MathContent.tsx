import type { ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { Diagram } from './diagrams/Diagram'
import { TeachingDemoById } from './teaching/TeachingDemo'
import { parseNoteContent, type ContentSegment } from '../lib/parseContent'

interface MathContentProps {
  content: string
  className?: string
}

function InlineMarkdown({ text }: { text: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkMath]}
      rehypePlugins={[[rehypeKatex, { throwOnError: false, strict: 'ignore' }]]}
      components={{
        p: ({ children }) => <span>{children}</span>,
      }}
    >
      {text}
    </ReactMarkdown>
  )
}

function renderSegments(segments: ContentSegment[]): ReactNode[] {
  return segments.map((segment, index) => {
    if (segment.type === 'demo') {
      return <TeachingDemoById key={index} id={segment.id} />
    }

    if (segment.type === 'diagram') {
      return <Diagram key={index} id={segment.id} caption={segment.caption} />
    }

    if (segment.type === 'table') {
      return (
        <div key={index} className="table-scroll">
          <table>
            <thead>
              <tr>
                {segment.headers.map((header, headerIndex) => (
                  <th key={`${header}-${headerIndex}`}>
                    <InlineMarkdown text={header} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {segment.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {segment.headers.map((_, cellIndex) => (
                    <td key={cellIndex}>
                      <InlineMarkdown text={row[cellIndex] ?? ''} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    }

    return (
      <ReactMarkdown
        key={index}
        remarkPlugins={[remarkMath]}
        rehypePlugins={[[rehypeKatex, { throwOnError: false, strict: 'ignore' }]]}
      >
        {segment.text}
      </ReactMarkdown>
    )
  })
}

export function MathContent({ content, className = '' }: MathContentProps) {
  const segments = parseNoteContent(content)
  return <div className={`math-content max-w-none ${className}`}>{renderSegments(segments)}</div>
}
