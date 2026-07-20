import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

interface MathContentProps {
  content: string
  className?: string
}

export function MathContent({ content, className = '' }: MathContentProps) {
  return (
    <div className={`math-content prose-invert max-w-none ${className}`}>
      <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
        {content}
      </ReactMarkdown>
    </div>
  )
}
