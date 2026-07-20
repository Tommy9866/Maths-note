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
        <div>{answer}</div>
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
}

export function TeachingDemoById({ id }: { id: string }) {
  const render = demos[id]
  if (!render) {
    return <p className="teach-demo-missing">Demo not found: {id}</p>
  }
  return <>{render()}</>
}

function BigMath({ children }: { children: ReactNode }) {
  return <div className="teach-big-math">{children}</div>
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

function DemoDivBy3() {
  return (
    <TeachingDemo
      question="Is 468 divisible by 3?"
      tip="For 3: add all digits. If the sum is divisible by 3, the number is too."
      steps={[
        {
          title: 'Look at each digit of 468',
          body: <DigitRow digits={['4', '6', '8']} />,
        },
        {
          title: 'Add the digits',
          body: <BigMath>4 + 6 + 8 = 18</BigMath>,
        },
        {
          title: 'Check if 18 can be divided by 3',
          body: <BigMath>18 ÷ 3 = 6 (no remainder)</BigMath>,
        },
      ]}
      answer={<BigMath>Yes — 468 is divisible by 3.</BigMath>}
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
          title: 'Cover the front. Keep only the last 2 digits',
          body: <DigitRow digits={['6', '1', '2']} highlight={[1, 2]} />,
        },
        {
          title: 'Test those 2 digits with 4',
          body: <BigMath>12 ÷ 4 = 3 (no remainder)</BigMath>,
        },
        {
          title: 'Decide',
          body: <p>Since 12 is divisible by 4, 612 is also divisible by 4.</p>,
        },
      ]}
      answer={<BigMath>Yes — 612 is divisible by 4.</BigMath>}
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
          title: 'Check divisible by 2 (last digit even?)',
          body: (
            <>
              <DigitRow digits={['2', '8', '8']} highlight={[2]} />
              <BigMath>Last digit 8 is even → pass for 2</BigMath>
            </>
          ),
        },
        {
          title: 'Check divisible by 3 (digit sum)',
          body: <BigMath>2 + 8 + 8 = 18 , and 18 ÷ 3 = 6 → pass for 3</BigMath>,
        },
        {
          title: 'Combine both checks',
          body: <p>It passes 2 and passes 3, so it is divisible by 6.</p>,
        },
      ]}
      answer={<BigMath>Yes — 288 is divisible by 6.</BigMath>}
    />
  )
}

function DemoIndexForm() {
  return (
    <TeachingDemo
      question="Write 6 × 6 × 6 × 6 in index form."
      tip="Count how many times the same number is multiplied. That count becomes the small number (index)."
      steps={[
        {
          title: 'See the repeated number',
          body: <BigMath>6 × 6 × 6 × 6</BigMath>,
        },
        {
          title: 'Count how many 6s',
          body: (
            <div className="teach-count-row">
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
            </div>
          ),
        },
        {
          title: 'Write base and index',
          body: (
            <BigMath>
              base = 6 , index = 4 → 6<sup>4</sup>
            </BigMath>
          ),
        },
      ]}
      answer={
        <BigMath>
          6 × 6 × 6 × 6 = 6<sup>4</sup>
        </BigMath>
      }
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
          body: <BigMath>4 factors (more than 2)</BigMath>,
        },
        {
          title: 'Decide',
          body: <p>More than 2 factors means composite. Also 51 = 3 × 17.</p>,
        },
      ]}
      answer={<BigMath>51 is composite.</BigMath>}
    />
  )
}

function DemoPrimeFactor20() {
  return (
    <TeachingDemo
      question="Write 20 as a product of prime factors."
      tip="Keep dividing by the smallest prime (2, then 3, then 5...) until you only have primes."
      steps={[
        {
          title: 'Divide by 2',
          body: <BigMath>20 ÷ 2 = 10</BigMath>,
        },
        {
          title: 'Divide 10 by 2 again',
          body: <BigMath>10 ÷ 2 = 5</BigMath>,
        },
        {
          title: 'Stop when the last number is prime',
          body: <BigMath>5 is prime, so stop</BigMath>,
        },
        {
          title: 'Write the product',
          body: (
            <BigMath>
              20 = 2 × 2 × 5 = 2<sup>2</sup> × 5
            </BigMath>
          ),
        },
      ]}
      answer={
        <BigMath>
          20 = 2<sup>2</sup> × 5
        </BigMath>
      }
    />
  )
}

function DemoHcf5684() {
  return (
    <TeachingDemo
      question="Find the HCF of 56 and 84."
      tip="HCF = highest common factor = the biggest number that divides both. Multiply the common primes you used."
      steps={[
        {
          title: 'Divide both by a common prime 2',
          body: <BigMath>56 → 28 , 84 → 42</BigMath>,
        },
        {
          title: 'Divide both by 2 again',
          body: <BigMath>28 → 14 , 42 → 21</BigMath>,
        },
        {
          title: 'Divide both by 7',
          body: <BigMath>14 → 2 , 21 → 3</BigMath>,
        },
        {
          title: 'Stop — 2 and 3 have no common prime',
          body: <BigMath>Common divisors used: 2 , 2 , 7</BigMath>,
        },
      ]}
      answer={<BigMath>HCF = 2 × 2 × 7 = 28</BigMath>}
    />
  )
}

function DemoLcm1860() {
  return (
    <TeachingDemo
      question="Find the LCM of 18 and 60."
      tip="LCM = least common multiple = the smallest number that both numbers can divide into."
      steps={[
        {
          title: 'Divide by common / useful primes',
          body: (
            <>
              <BigMath>÷2 : 18 → 9 , 60 → 30</BigMath>
              <BigMath>÷3 : 9 → 3 , 30 → 10</BigMath>
              <BigMath>÷3 : 3 → 1 , 10 stays 10</BigMath>
            </>
          ),
        },
        {
          title: 'Collect all divisors and remaining numbers',
          body: <BigMath>2 , 3 , 3 , and remaining 10</BigMath>,
        },
        {
          title: 'Multiply them all',
          body: <BigMath>2 × 3 × 3 × 10 = 180</BigMath>,
        },
      ]}
      answer={<BigMath>LCM = 180</BigMath>}
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
          body: <BigMath>5 × 20 − 18 ÷ 2 = 100 − 9 = 91</BigMath>,
        },
        {
          title: 'Bracket around the subtraction',
          body: <BigMath>5 × (20 − 18) ÷ 2 = 5 × 2 ÷ 2 = 5</BigMath>,
        },
        {
          title: 'Bracket around a mixed part',
          body: <BigMath>5 × (20 − 18 ÷ 2) = 5 × (20 − 9) = 55</BigMath>,
        },
      ]}
      answer={<BigMath>Brackets tell you which part to do first.</BigMath>}
    />
  )
}

function DemoDecimalAdd() {
  return (
    <TeachingDemo
      question="Calculate 82.5 + 7.64"
      tip="Line up the decimal points first. You can write 82.5 as 82.50."
      steps={[
        {
          title: 'Line up the decimal points',
          body: (
            <pre className="teach-sum">
{`  82.50
+  7.64`}
            </pre>
          ),
        },
        {
          title: 'Add from the right',
          body: (
            <BigMath>
              0+4=4 , 5+6=11 (write 1, carry 1) , 2+7+1=10 , 8+1=9
            </BigMath>
          ),
        },
        {
          title: 'Keep the decimal point in line',
          body: (
            <pre className="teach-sum">
{`  82.50
+  7.64
  -----
  90.14`}
            </pre>
          ),
        },
      ]}
      answer={<BigMath>82.5 + 7.64 = 90.14</BigMath>}
    />
  )
}
