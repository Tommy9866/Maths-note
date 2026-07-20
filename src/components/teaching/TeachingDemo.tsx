import type { ReactNode } from 'react'

interface Step {
  title: string
  body: ReactNode
}

interface TeachingDemoProps {
  question: string
  steps: Step[]
  answer: ReactNode
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
  'div-by-3': DemoDivBy3,
  'div-by-4': DemoDivBy4,
  'div-by-6': DemoDivBy6,
  'index-form': DemoIndexForm,
  'prime-check': DemoPrimeCheck,
  'prime-factor-20': DemoPrimeFactor20,
  'hcf-56-84': DemoHcf5684,
  'lcm-18-60': DemoLcm1860,
  'brackets-order': DemoBracketsOrder,
  'decimal-add': DemoDecimalAdd,
  'percent-of': DemoPercentOf,
  'percent-change': DemoPercentChange,
}

export function TeachingDemoById({ id }: { id: string }) {
  const render = demos[id]
  if (!render) {
    return <p className="teach-demo-missing">Demo not found: {id}</p>
  }
  return <>{render()}</>
}

/** Plain classroom math line — no LaTeX. */
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

/** Short division board with fixed columns so numbers stay aligned. */
function ShortDivision({
  headers,
  rows,
  leftover,
}: {
  headers: string[]
  rows: { divisor: string; values: string[] }[]
  leftover: string[]
}) {
  return (
    <div className="teach-board" role="table" aria-label="Short division">
      <div
        className="teach-board-row teach-board-head"
        style={{ gridTemplateColumns: `3.5rem repeat(${headers.length}, minmax(3.5rem, 1fr))` }}
      >
        <span />
        {headers.map((header) => (
          <span key={header}>{header}</span>
        ))}
      </div>
      {rows.map((row) => (
        <div
          key={`${row.divisor}-${row.values.join('-')}`}
          className="teach-board-row"
          style={{ gridTemplateColumns: `3.5rem repeat(${headers.length}, minmax(3.5rem, 1fr))` }}
        >
          <span className="teach-board-div">{row.divisor}</span>
          {row.values.map((value, index) => (
            <span key={`${value}-${index}`}>{value}</span>
          ))}
        </div>
      ))}
      <div
        className="teach-board-row teach-board-end"
        style={{ gridTemplateColumns: `3.5rem repeat(${headers.length}, minmax(3.5rem, 1fr))` }}
      >
        <span />
        {leftover.map((value, index) => (
          <span key={`${value}-${index}`}>{value}</span>
        ))}
      </div>
    </div>
  )
}

/** Decimal addition with place-value columns. */
function DecimalBoard({
  rows,
  total,
}: {
  rows: { op?: string; digits: string[] }[]
  total: string[]
}) {
  const cols = ['Tens', 'Ones', '.', 'Tenths', 'Hundredths']
  return (
    <div className="teach-decimal" role="table" aria-label="Decimal addition">
      <div className="teach-decimal-row teach-decimal-head">
        <span />
        {cols.map((col) => (
          <span key={col}>{col}</span>
        ))}
      </div>
      {rows.map((row, index) => (
        <div key={index} className="teach-decimal-row">
          <span className="teach-decimal-op">{row.op ?? ''}</span>
          {row.digits.map((digit, digitIndex) => (
            <span
              key={digitIndex}
              className={digit === '.' ? 'teach-decimal-point' : undefined}
            >
              {digit}
            </span>
          ))}
        </div>
      ))}
      <div className="teach-decimal-row teach-decimal-total">
        <span />
        {total.map((digit, index) => (
          <span key={index} className={digit === '.' ? 'teach-decimal-point' : undefined}>
            {digit}
          </span>
        ))}
      </div>
    </div>
  )
}

function DemoDivBy3() {
  return (
    <TeachingDemo
      question="Is 468 divisible by 3?"
      tip="For 3: add all digits. If the sum is divisible by 3, the number is too."
      steps={[
        {
          title: 'Write the digits in boxes',
          body: <DigitRow digits={['4', '6', '8']} />,
        },
        {
          title: 'Add the digits',
          body: <Line>4 + 6 + 8 = 18</Line>,
        },
        {
          title: 'Check if 18 can be divided by 3',
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
              <p className="teach-note">Ignore the front digit. Keep only 12.</p>
            </>
          ),
        },
        {
          title: 'Test 12 with 4',
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

function DemoDivBy6() {
  return (
    <TeachingDemo
      question="Is 288 divisible by 6?"
      tip="For 6: the number must pass BOTH the rule for 2 and the rule for 3."
      steps={[
        {
          title: 'Rule for 2: is the last digit even?',
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

function DemoIndexForm() {
  return (
    <TeachingDemo
      question="Write 6 x 6 x 6 x 6 in index form."
      tip="Count how many times the same number is multiplied. That count becomes the index."
      steps={[
        {
          title: 'Write the product',
          body: <Line>6 x 6 x 6 x 6</Line>,
        },
        {
          title: 'Count the 6s',
          body: (
            <div className="teach-count-row">
              <span>1st 6</span>
              <span>2nd 6</span>
              <span>3rd 6</span>
              <span>4th 6</span>
            </div>
          ),
        },
        {
          title: 'Write base and index in plain form',
          body: <Line>base = 6, index = 4 → 6^4</Line>,
        },
      ]}
      answer="6 x 6 x 6 x 6 = 6^4"
    />
  )
}

function DemoPrimeCheck() {
  return (
    <TeachingDemo
      question="Is 51 prime or composite?"
      tip="Prime = only 2 factors (1 and itself). Composite = more than 2 factors. 1 is neither."
      steps={[
        {
          title: 'List all factors of 51',
          body: (
            <div className="teach-chip-row">
              <span>1</span>
              <span className="teach-chip-warn">3</span>
              <span className="teach-chip-warn">17</span>
              <span>51</span>
            </div>
          ),
        },
        {
          title: 'Count the factors',
          body: <Line>There are 4 factors (more than 2)</Line>,
        },
        {
          title: 'Decide',
          body: <Line>More than 2 factors → composite. Also 51 = 3 x 17.</Line>,
        },
      ]}
      answer="51 is composite."
    />
  )
}

function DemoPrimeFactor20() {
  return (
    <TeachingDemo
      question="Write 20 as a product of prime factors."
      tip="Keep dividing by the smallest prime until only primes remain. Write the answer as 2^2 x 5."
      steps={[
        {
          title: 'Short division board',
          body: (
            <ShortDivision
              headers={['20']}
              rows={[
                { divisor: '2', values: ['20'] },
                { divisor: '2', values: ['10'] },
              ]}
              leftover={['5']}
            />
          ),
        },
        {
          title: 'Read the left column and the last number',
          body: <Line>primes used: 2, 2, and 5</Line>,
        },
        {
          title: 'Write the product in plain form',
          body: <Line>20 = 2 x 2 x 5 = 2^2 x 5</Line>,
        },
      ]}
      answer="20 = 2^2 x 5"
    />
  )
}

function DemoHcf5684() {
  return (
    <TeachingDemo
      question="Find the HCF of 56 and 84."
      tip="HCF = highest common factor. Multiply the common primes in the left column."
      steps={[
        {
          title: 'Short division — keep dividing both numbers by common primes',
          body: (
            <ShortDivision
              headers={['56', '84']}
              rows={[
                { divisor: '2', values: ['56', '84'] },
                { divisor: '2', values: ['28', '42'] },
                { divisor: '7', values: ['14', '21'] },
              ]}
              leftover={['2', '3']}
            />
          ),
        },
        {
          title: 'Stop when the bottom numbers share no common prime',
          body: (
            <>
              <p className="teach-note">Bottom: 2 and 3 — no common prime left.</p>
              <Line>Common divisors on the left: 2, 2, 7</Line>
            </>
          ),
        },
        {
          title: 'Multiply the left-column primes',
          body: <Line>HCF = 2 x 2 x 7 = 28</Line>,
        },
      ]}
      answer="HCF(56, 84) = 28"
    />
  )
}

function DemoLcm1860() {
  return (
    <TeachingDemo
      question="Find the LCM of 18 and 60."
      tip="LCM = least common multiple. Multiply ALL left-column divisors and the leftover numbers."
      steps={[
        {
          title: 'Short division board',
          body: (
            <ShortDivision
              headers={['18', '60']}
              rows={[
                { divisor: '2', values: ['18', '60'] },
                { divisor: '3', values: ['9', '30'] },
                { divisor: '3', values: ['3', '10'] },
              ]}
              leftover={['1', '10']}
            />
          ),
        },
        {
          title: 'Collect every number used',
          body: <Line>Left column: 2, 3, 3. Leftover: 1 and 10.</Line>,
        },
        {
          title: 'Multiply them',
          body: <Line>LCM = 2 x 3 x 3 x 10 = 180</Line>,
        },
      ]}
      answer="LCM(18, 60) = 180"
    />
  )
}

function DemoBracketsOrder() {
  return (
    <TeachingDemo
      question="Why do brackets change the answer?"
      tip="Always do brackets first. Same numbers can give different answers if brackets move."
      steps={[
        {
          title: 'No brackets',
          body: <Line>5 x 20 - 18 / 2 = 100 - 9 = 91</Line>,
        },
        {
          title: 'Bracket around the subtraction',
          body: <Line>5 x (20 - 18) / 2 = 5 x 2 / 2 = 5</Line>,
        },
        {
          title: 'Bracket around a mixed part',
          body: <Line>5 x (20 - 18 / 2) = 5 x (20 - 9) = 55</Line>,
        },
      ]}
      answer="Brackets tell you which part to do first."
    />
  )
}

function DemoDecimalAdd() {
  return (
    <TeachingDemo
      question="Calculate 82.5 + 7.64"
      tip="Line up the decimal points first. Write 82.5 as 82.50 so every column has a digit."
      steps={[
        {
          title: 'Line up place-value columns',
          body: (
            <DecimalBoard
              rows={[
                { digits: ['8', '2', '.', '5', '0'] },
                { op: '+', digits: ['', '7', '.', '6', '4'] },
              ]}
              total={['9', '0', '.', '1', '4']}
            />
          ),
        },
        {
          title: 'Add each column from the right',
          body: (
            <Line>0+4=4, then 5+6=11 (write 1, carry 1), then 2+7+1=10, then 8+1=9</Line>
          ),
        },
        {
          title: 'Keep the decimal point in the same column',
          body: <Line>Answer columns stay under Tenths / Hundredths.</Line>,
        },
      ]}
      answer="82.5 + 7.64 = 90.14"
    />
  )
}

function DemoPercentOf() {
  return (
    <TeachingDemo
      question="Find 35% of 80."
      tip="p% of N means (p / 100) x N. Or think: 35 out of every 100."
      steps={[
        {
          title: 'Change percent to a decimal',
          body: <Line>35% = 35 / 100 = 0.35</Line>,
        },
        {
          title: 'Multiply by the whole',
          body: <Line>0.35 x 80</Line>,
        },
        {
          title: 'Calculate',
          body: <Line>0.35 x 80 = 28</Line>,
        },
      ]}
      answer="35% of 80 = 28"
    />
  )
}

function DemoPercentChange() {
  return (
    <TeachingDemo
      question="A price rises from 80 to 100. What is the percentage increase?"
      tip="Always compare the change with the ORIGINAL value."
      steps={[
        {
          title: 'Find the change',
          body: <Line>100 - 80 = 20</Line>,
        },
        {
          title: 'Divide by the original',
          body: <Line>20 / 80 = 0.25</Line>,
        },
        {
          title: 'Change to a percent',
          body: <Line>0.25 x 100% = 25%</Line>,
        },
      ]}
      answer="25% increase"
    />
  )
}
