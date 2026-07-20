import type { ReactNode } from 'react'

interface Step {
  title: string
  body: ReactNode
}

interface TeachingDemoProps {
  question: string
  steps: Step[]
  answer: string
  tip?: string
}

export function TeachingDemo({ question, steps, answer, tip }: TeachingDemoProps) {
  return (
    <div className="teach-demo">
      <div className="teach-demo-question">
        <span className="teach-demo-label">Question</span>
        <p>{question}</p>
      </div>

      <ol className="teach-demo-steps">
        {steps.map((step, index) => (
          <li key={step.title}>
            <div className="teach-demo-step-num">{index + 1}</div>
            <div className="teach-demo-step-body">
              <h4>{step.title}</h4>
              <div>{step.body}</div>
            </div>
          </li>
        ))}
      </ol>

      <div className="teach-demo-answer">
        <span className="teach-demo-label">Answer</span>
        <div className="teach-demo-answer-text">{answer}</div>
      </div>

      {tip && (
        <p className="teach-demo-tip">
          <strong>Remember:</strong> {tip}
        </p>
      )}
    </div>
  )
}

const demos: Record<string, () => ReactNode> = {
  'div-by-2': DemoDivBy2,
  'div-by-3': DemoDivBy3,
  'div-by-4': DemoDivBy4,
  'div-by-5': DemoDivBy5,
  'div-by-6': DemoDivBy6,
  'div-by-9': DemoDivBy9,
  'div-by-10': DemoDivBy10,
}

export function TeachingDemoById({ id }: { id: string }) {
  const render = demos[id]
  if (!render) {
    return <p className="teach-demo-missing">Demo not found: {id}</p>
  }
  return <>{render()}</>
}

function Line({ children }: { children: ReactNode }) {
  return <div className="teach-line">{children}</div>
}

function DigitRow({
  digits,
  highlight,
}: {
  digits: string[]
  highlight?: number[]
}) {
  const marked = new Set(highlight ?? [])
  return (
    <div className="teach-digit-row" aria-label={digits.join('')}>
      {digits.map((digit, index) => (
        <span
          key={`${digit}-${index}`}
          className={marked.has(index) ? 'teach-digit teach-digit-on' : 'teach-digit'}
        >
          {digit}
        </span>
      ))}
    </div>
  )
}

function DemoDivBy2() {
  return (
    <TeachingDemo
      question="Is 374 divisible by 2?"
      tip="For 2: look only at the last digit. Even last digit means yes."
      steps={[
        {
          title: 'Look at the last digit only',
          body: <DigitRow digits={['3', '7', '4']} highlight={[2]} />,
        },
        {
          title: 'Ask: is that digit even?',
          body: <Line>Last digit = 4. Even digits are 0, 2, 4, 6, 8.</Line>,
        },
        {
          title: 'Decide',
          body: <Line>4 is even → 374 is divisible by 2.</Line>,
        },
      ]}
      answer="Yes. 374 is divisible by 2."
    />
  )
}

function DemoDivBy3() {
  return (
    <TeachingDemo
      question="Is 468 divisible by 3?"
      tip="For 3: add all digits. If the sum is divisible by 3, the number is too."
      steps={[
        {
          title: 'Write each digit',
          body: <DigitRow digits={['4', '6', '8']} />,
        },
        {
          title: 'Add the digits',
          body: <Line>4 + 6 + 8 = 18</Line>,
        },
        {
          title: 'Check the sum with 3',
          body: <Line>18 / 3 = 6 (no remainder)</Line>,
        },
      ]}
      answer="Yes. 468 is divisible by 3."
    />
  )
}

function DemoDivBy4() {
  return (
    <TeachingDemo
      question="Is 612 divisible by 4?"
      tip="For 4: only look at the last 2 digits."
      steps={[
        {
          title: 'Highlight the last 2 digits',
          body: (
            <>
              <DigitRow digits={['6', '1', '2']} highlight={[1, 2]} />
              <p className="teach-note">Ignore the front. Keep only 12.</p>
            </>
          ),
        },
        {
          title: 'Test those 2 digits with 4',
          body: <Line>12 / 4 = 3 (no remainder)</Line>,
        },
        {
          title: 'Decide',
          body: <Line>12 works, so 612 is divisible by 4.</Line>,
        },
      ]}
      answer="Yes. 612 is divisible by 4."
    />
  )
}

function DemoDivBy5() {
  return (
    <TeachingDemo
      question="Is 240 divisible by 5?"
      tip="For 5: the last digit must be 0 or 5."
      steps={[
        {
          title: 'Look at the last digit only',
          body: <DigitRow digits={['2', '4', '0']} highlight={[2]} />,
        },
        {
          title: 'Check the rule',
          body: <Line>Last digit = 0. That is allowed for 5.</Line>,
        },
        {
          title: 'Decide',
          body: <Line>Ends with 0 → divisible by 5.</Line>,
        },
      ]}
      answer="Yes. 240 is divisible by 5."
    />
  )
}

function DemoDivBy6() {
  return (
    <TeachingDemo
      question="Is 288 divisible by 6?"
      tip="For 6: the number must pass BOTH the rule for 2 and the rule for 3."
      steps={[
        {
          title: 'Rule for 2: last digit even?',
          body: (
            <>
              <DigitRow digits={['2', '8', '8']} highlight={[2]} />
              <Line>Last digit = 8 (even) → pass for 2</Line>
            </>
          ),
        },
        {
          title: 'Rule for 3: digit sum',
          body: <Line>2 + 8 + 8 = 18, and 18 / 3 = 6 → pass for 3</Line>,
        },
        {
          title: 'Combine both checks',
          body: <Line>Pass 2 and pass 3 → divisible by 6</Line>,
        },
      ]}
      answer="Yes. 288 is divisible by 6."
    />
  )
}

function DemoDivBy9() {
  return (
    <TeachingDemo
      question="Is 729 divisible by 9?"
      tip="For 9: add the digits. If the sum is divisible by 9, the number is too."
      steps={[
        {
          title: 'Write each digit',
          body: <DigitRow digits={['7', '2', '9']} />,
        },
        {
          title: 'Add the digits',
          body: <Line>7 + 2 + 9 = 18</Line>,
        },
        {
          title: 'Check the sum with 9',
          body: <Line>18 / 9 = 2 (no remainder)</Line>,
        },
      ]}
      answer="Yes. 729 is divisible by 9."
    />
  )
}

function DemoDivBy10() {
  return (
    <TeachingDemo
      question="Is 850 divisible by 10?"
      tip="For 10: the last digit must be 0."
      steps={[
        {
          title: 'Look at the last digit only',
          body: <DigitRow digits={['8', '5', '0']} highlight={[2]} />,
        },
        {
          title: 'Check the rule',
          body: <Line>Last digit = 0.</Line>,
        },
        {
          title: 'Decide',
          body: <Line>Ends with 0 → divisible by 10.</Line>,
        },
      ]}
      answer="Yes. 850 is divisible by 10."
    />
  )
}
