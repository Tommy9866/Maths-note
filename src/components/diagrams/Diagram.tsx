import type { ReactNode } from 'react'

const diagrams: Record<string, () => ReactNode> = {
  'right-triangle': RightTriangle,
  parabola: Parabola,
  'straight-line': StraightLine,
  'circle-area': CircleArea,
  cylinder: Cylinder,
  'percentage-bar': PercentageBar,
  'function-curve': FunctionCurve,
  'box-plot': BoxPlot,
  'factor-tree': FactorTree,
  'divisibility-digits': DivisibilityDigits,
  'digit-sum': DigitSum,
  'index-notation': IndexNotation,
  'prime-vs-composite': PrimeVsComposite,
  'short-division-prime': ShortDivisionPrime,
  'short-division-hcf': ShortDivisionHcf,
  'short-division-lcm': ShortDivisionLcm,
  'order-brackets': OrderBrackets,
  'decimal-align': DecimalAlign,
}

export function Diagram({ id, caption }: { id: string; caption?: string }) {
  const render = diagrams[id]
  if (!render) {
    return (
      <p className="rounded-xl border border-dashed border-[#d7e3dd] px-4 py-3 text-sm text-[#5b6b7c]">
        Diagram unavailable: {id}
      </p>
    )
  }

  return (
    <figure className="diagram-aid my-6 overflow-hidden rounded-2xl border border-[#d7e3dd] bg-white">
      <div className="flex items-center justify-center bg-gradient-to-b from-[#f3faf7] to-white px-4 py-6">
        {render()}
      </div>
      {caption && (
        <figcaption className="border-t border-[#e4efe9] px-4 py-2.5 text-center text-xs text-[#5b6b7c]">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

function Frame({ children, viewBox = '0 0 320 200' }: { children: ReactNode; viewBox?: string }) {
  return (
    <svg viewBox={viewBox} className="h-auto w-full max-w-md" role="img">
      {children}
    </svg>
  )
}

function RightTriangle() {
  return (
    <Frame viewBox="0 0 320 220">
      <polygon points="60,180 260,180 60,40" fill="#ccfbf1" stroke="#0f766e" strokeWidth="3" />
      <rect x="60" y="155" width="25" height="25" fill="none" stroke="#0f766e" strokeWidth="2" />
      <text x="150" y="200" textAnchor="middle" fill="#5b6b7c" fontSize="14">
        adjacent
      </text>
      <text x="40" y="120" textAnchor="middle" fill="#5b6b7c" fontSize="14" transform="rotate(-90 40 120)">
        opposite
      </text>
      <text x="180" y="100" fill="#0f766e" fontSize="14" fontWeight="600">
        hypotenuse
      </text>
      <text x="88" y="168" fill="#0f766e" fontSize="16" fontWeight="700">
        θ
      </text>
    </Frame>
  )
}

function Parabola() {
  return (
    <Frame viewBox="0 0 320 220">
      <line x1="40" y1="180" x2="300" y2="180" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="160" y1="20" x2="160" y2="200" stroke="#94a3b8" strokeWidth="1.5" />
      <path
        d="M50 40 Q160 260 270 40"
        fill="none"
        stroke="#0f766e"
        strokeWidth="3"
      />
      <circle cx="160" cy="150" r="4" fill="#0f766e" />
      <text x="170" y="148" fill="#0f766e" fontSize="13" fontWeight="600">
        vertex
      </text>
      <text x="250" y="70" fill="#5b6b7c" fontSize="13">
        y = ax² + bx + c
      </text>
    </Frame>
  )
}

function StraightLine() {
  return (
    <Frame viewBox="0 0 320 220">
      <line x1="40" y1="180" x2="300" y2="180" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="60" y1="20" x2="60" y2="200" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="70" y1="160" x2="280" y2="50" stroke="#0f766e" strokeWidth="3" />
      <circle cx="120" cy="134" r="4" fill="#0f766e" />
      <circle cx="220" cy="82" r="4" fill="#0f766e" />
      <path d="M120 134 H220 V82" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 3" />
      <text x="165" y="152" fill="#0284c7" fontSize="12">
        run
      </text>
      <text x="228" y="115" fill="#0284c7" fontSize="12">
        rise
      </text>
      <text x="230" y="55" fill="#0f766e" fontSize="13" fontWeight="600">
        m = rise / run
      </text>
    </Frame>
  )
}

function CircleArea() {
  return (
    <Frame viewBox="0 0 320 220">
      <circle cx="160" cy="110" r="70" fill="#ccfbf1" stroke="#0f766e" strokeWidth="3" />
      <line x1="160" y1="110" x2="230" y2="110" stroke="#0284c7" strokeWidth="2.5" />
      <circle cx="160" cy="110" r="3" fill="#0f766e" />
      <text x="188" y="102" fill="#0284c7" fontSize="14" fontWeight="600">
        r
      </text>
      <text x="160" y="200" textAnchor="middle" fill="#5b6b7c" fontSize="13">
        A = πr² C = 2πr
      </text>
    </Frame>
  )
}

function Cylinder() {
  return (
    <Frame viewBox="0 0 320 220">
      <ellipse cx="160" cy="50" rx="55" ry="18" fill="#ccfbf1" stroke="#0f766e" strokeWidth="2.5" />
      <path d="M105 50 V160" fill="none" stroke="#0f766e" strokeWidth="2.5" />
      <path d="M215 50 V160" fill="none" stroke="#0f766e" strokeWidth="2.5" />
      <ellipse cx="160" cy="160" rx="55" ry="18" fill="#e6faf5" stroke="#0f766e" strokeWidth="2.5" />
      <line x1="230" y1="50" x2="230" y2="160" stroke="#0284c7" strokeWidth="2" strokeDasharray="4 3" />
      <text x="240" y="110" fill="#0284c7" fontSize="14" fontWeight="600">
        h
      </text>
      <text x="160" y="200" textAnchor="middle" fill="#5b6b7c" fontSize="13">
        V = πr²h
      </text>
    </Frame>
  )
}

function PercentageBar() {
  return (
    <Frame viewBox="0 0 320 180">
      <rect x="40" y="70" width="240" height="36" rx="8" fill="#e2e8f0" />
      <rect x="40" y="70" width="84" height="36" rx="8" fill="#0f766e" />
      <text x="70" y="94" fill="white" fontSize="14" fontWeight="700">
        35%
      </text>
      <text x="160" y="140" textAnchor="middle" fill="#5b6b7c" fontSize="13">
        part / whole × 100%
      </text>
    </Frame>
  )
}

function FunctionCurve() {
  return (
    <Frame viewBox="0 0 320 220">
      <line x1="40" y1="180" x2="300" y2="180" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="60" y1="20" x2="60" y2="200" stroke="#94a3b8" strokeWidth="1.5" />
      <path
        d="M70 150 C120 150, 130 40, 180 80 S250 160, 290 60"
        fill="none"
        stroke="#0f766e"
        strokeWidth="3"
      />
      <text x="250" y="50" fill="#0f766e" fontSize="14" fontWeight="600">
        y = f(x)
      </text>
      <circle cx="180" cy="80" r="3.5" fill="#0284c7" />
      <text x="188" y="75" fill="#0284c7" fontSize="12">
        (x, f(x))
      </text>
    </Frame>
  )
}

function BoxPlot() {
  return (
    <Frame viewBox="0 0 320 180">
      <line x1="50" y1="90" x2="270" y2="90" stroke="#94a3b8" strokeWidth="2" />
      <line x1="50" y1="70" x2="50" y2="110" stroke="#0f766e" strokeWidth="2.5" />
      <line x1="270" y1="70" x2="270" y2="110" stroke="#0f766e" strokeWidth="2.5" />
      <rect x="110" y="60" width="100" height="60" fill="#ccfbf1" stroke="#0f766e" strokeWidth="2.5" />
      <line x1="155" y1="60" x2="155" y2="120" stroke="#0284c7" strokeWidth="2.5" />
      <text x="50" y="140" textAnchor="middle" fill="#5b6b7c" fontSize="11">
        min
      </text>
      <text x="110" y="145" textAnchor="middle" fill="#5b6b7c" fontSize="11">
        Q1
      </text>
      <text x="155" y="145" textAnchor="middle" fill="#0284c7" fontSize="11">
        Q2
      </text>
      <text x="210" y="145" textAnchor="middle" fill="#5b6b7c" fontSize="11">
        Q3
      </text>
      <text x="270" y="140" textAnchor="middle" fill="#5b6b7c" fontSize="11">
        max
      </text>
    </Frame>
  )
}

function FactorTree() {
  return (
    <Frame viewBox="0 0 320 220">
      <circle cx="160" cy="36" r="22" fill="#ccfbf1" stroke="#0f766e" strokeWidth="2" />
      <text x="160" y="41" textAnchor="middle" fill="#0f766e" fontSize="14" fontWeight="700">
        36
      </text>
      <line x1="148" y1="56" x2="100" y2="90" stroke="#94a3b8" strokeWidth="2" />
      <line x1="172" y1="56" x2="220" y2="90" stroke="#94a3b8" strokeWidth="2" />
      <circle cx="90" cy="110" r="20" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
      <text x="90" y="115" textAnchor="middle" fill="#0284c7" fontSize="14" fontWeight="700">
        2
      </text>
      <circle cx="230" cy="110" r="20" fill="#ccfbf1" stroke="#0f766e" strokeWidth="2" />
      <text x="230" y="115" textAnchor="middle" fill="#0f766e" fontSize="14" fontWeight="700">
        18
      </text>
      <line x1="218" y1="128" x2="180" y2="158" stroke="#94a3b8" strokeWidth="2" />
      <line x1="242" y1="128" x2="270" y2="158" stroke="#94a3b8" strokeWidth="2" />
      <circle cx="170" cy="178" r="18" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
      <text x="170" y="183" textAnchor="middle" fill="#0284c7" fontSize="13" fontWeight="700">
        2
      </text>
      <circle cx="280" cy="178" r="18" fill="#ccfbf1" stroke="#0f766e" strokeWidth="2" />
      <text x="280" y="183" textAnchor="middle" fill="#0f766e" fontSize="13" fontWeight="700">
        9
      </text>
      <text x="160" y="212" textAnchor="middle" fill="#5b6b7c" fontSize="12">
        36 = 2² × 3²
      </text>
    </Frame>
  )
}

/** Demo-style: highlight last 2 digits for divisibility by 4 (like MIF Demo 3). */
function DivisibilityDigits() {
  return (
    <Frame viewBox="0 0 320 200">
      <text x="160" y="36" textAnchor="middle" fill="#5b6b7c" fontSize="13">
        Is 612 divisible by 4?
      </text>
      <text x="88" y="100" fill="#18212b" fontSize="42" fontWeight="700" fontFamily="ui-monospace, monospace">
        6
      </text>
      <rect x="128" y="58" width="100" height="60" rx="10" fill="#ccfbf1" stroke="#0f766e" strokeWidth="3" />
      <text x="148" y="100" fill="#0f766e" fontSize="42" fontWeight="700" fontFamily="ui-monospace, monospace">
        1
      </text>
      <text x="188" y="100" fill="#0f766e" fontSize="42" fontWeight="700" fontFamily="ui-monospace, monospace">
        2
      </text>
      <text x="178" y="140" textAnchor="middle" fill="#0f766e" fontSize="12" fontWeight="600">
        last two digits
      </text>
      <text x="160" y="168" textAnchor="middle" fill="#18212b" fontSize="14">
        12 ÷ 4 = 3 → yes, 612 is divisible by 4
      </text>
      <text x="160" y="190" textAnchor="middle" fill="#5b6b7c" fontSize="12">
        For 8, check the last three digits instead
      </text>
    </Frame>
  )
}

/** Demo-style: digit sum for divisibility by 3 or 9 (MIF Demo 2 / 6). */
function DigitSum() {
  return (
    <Frame viewBox="0 0 320 210">
      <text x="160" y="30" textAnchor="middle" fill="#5b6b7c" fontSize="13">
        Is 468 divisible by 3 (and by 9)?
      </text>
      <g fontFamily="ui-monospace, monospace" fontSize="36" fontWeight="700">
        <rect x="50" y="50" width="48" height="52" rx="8" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
        <text x="74" y="88" textAnchor="middle" fill="#0284c7">
          4
        </text>
        <text x="112" y="88" fill="#94a3b8">
          +
        </text>
        <rect x="136" y="50" width="48" height="52" rx="8" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
        <text x="160" y="88" textAnchor="middle" fill="#0284c7">
          6
        </text>
        <text x="198" y="88" fill="#94a3b8">
          +
        </text>
        <rect x="222" y="50" width="48" height="52" rx="8" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
        <text x="246" y="88" textAnchor="middle" fill="#0284c7">
          8
        </text>
      </g>
      <path d="M74 110 V130 H246 V110" fill="none" stroke="#94a3b8" strokeWidth="2" />
      <text x="160" y="152" textAnchor="middle" fill="#0f766e" fontSize="20" fontWeight="700">
        sum = 18
      </text>
      <text x="160" y="178" textAnchor="middle" fill="#18212b" fontSize="13">
        18 ÷ 3 = 6 and 18 ÷ 9 = 2 → yes for both
      </text>
      <text x="160" y="198" textAnchor="middle" fill="#5b6b7c" fontSize="12">
        Same demo idea as the textbook digit-sum check
      </text>
    </Frame>
  )
}

/** Demo-style: expanded product → index notation (MIF 1.2 Demo 1). */
function IndexNotation() {
  return (
    <Frame viewBox="0 0 320 200">
      <text x="160" y="28" textAnchor="middle" fill="#5b6b7c" fontSize="13">
        Express in index notation
      </text>
      <rect x="24" y="48" width="272" height="48" rx="10" fill="#f8fafc" stroke="#d7e3dd" />
      <text x="160" y="78" textAnchor="middle" fill="#18212b" fontSize="16" fontFamily="ui-monospace, monospace">
        6 × 6 × 6 × 6
      </text>
      <text x="160" y="118" textAnchor="middle" fill="#0f766e" fontSize="22" fontWeight="700">
        ↓
      </text>
      <rect x="70" y="130" width="180" height="48" rx="10" fill="#ccfbf1" stroke="#0f766e" strokeWidth="2" />
      <text x="160" y="162" textAnchor="middle" fill="#0f766e" fontSize="22" fontWeight="700">
        6⁴
      </text>
    </Frame>
  )
}

/** Demo-style: list factors to decide prime vs composite (MIF 1.2 Demo 3). */
function PrimeVsComposite() {
  return (
    <Frame viewBox="0 0 320 210">
      <text x="80" y="28" textAnchor="middle" fill="#5b6b7c" fontSize="12" fontWeight="600">
        51
      </text>
      <text x="240" y="28" textAnchor="middle" fill="#5b6b7c" fontSize="12" fontWeight="600">
        61
      </text>
      <rect x="20" y="40" width="120" height="120" rx="12" fill="#fff7ed" stroke="#f59e0b" strokeWidth="2" />
      <rect x="180" y="40" width="120" height="120" rx="12" fill="#ecfdf5" stroke="#0f766e" strokeWidth="2" />
      <text x="80" y="68" textAnchor="middle" fill="#92400e" fontSize="12">
        factors
      </text>
      <text x="80" y="92" textAnchor="middle" fill="#18212b" fontSize="13" fontWeight="600">
        1, 3, 17, 51
      </text>
      <text x="80" y="120" textAnchor="middle" fill="#b45309" fontSize="14" fontWeight="700">
        composite
      </text>
      <text x="80" y="142" textAnchor="middle" fill="#78716c" fontSize="11">
        more than 2 factors
      </text>
      <text x="240" y="68" textAnchor="middle" fill="#0f766e" fontSize="12">
        factors
      </text>
      <text x="240" y="92" textAnchor="middle" fill="#18212b" fontSize="13" fontWeight="600">
        1, 61
      </text>
      <text x="240" y="120" textAnchor="middle" fill="#0f766e" fontSize="14" fontWeight="700">
        prime
      </text>
      <text x="240" y="142" textAnchor="middle" fill="#5b6b7c" fontSize="11">
        only 2 factors
      </text>
      <text x="160" y="190" textAnchor="middle" fill="#5b6b7c" fontSize="12">
        Note: 1 is neither prime nor composite
      </text>
    </Frame>
  )
}

/** Demo-style short division for prime factorization of 20 (MIF tip). */
function ShortDivisionPrime() {
  return (
    <Frame viewBox="0 0 320 210">
      <text x="160" y="28" textAnchor="middle" fill="#5b6b7c" fontSize="13">
        Short division → prime factors of 20
      </text>
      <g fontFamily="ui-monospace, monospace" fontSize="18" fontWeight="700">
        <text x="90" y="70" fill="#0284c7">
          2
        </text>
        <text x="120" y="70" fill="#94a3b8">
          |
        </text>
        <text x="145" y="70" fill="#18212b">
          20
        </text>
        <text x="90" y="105" fill="#0284c7">
          2
        </text>
        <text x="120" y="105" fill="#94a3b8">
          |
        </text>
        <text x="145" y="105" fill="#18212b">
          10
        </text>
        <text x="145" y="140" fill="#0f766e">
          5
        </text>
      </g>
      <line x1="125" y1="55" x2="125" y2="150" stroke="#cbd5e1" strokeWidth="2" />
      <text x="160" y="175" textAnchor="middle" fill="#0f766e" fontSize="16" fontWeight="700">
        20 = 2 × 2 × 5 = 2² × 5
      </text>
      <text x="160" y="196" textAnchor="middle" fill="#5b6b7c" fontSize="12">
        Keep dividing by the smallest prime
      </text>
    </Frame>
  )
}

/** Demo-style HCF short division for 56 and 84 (MIF 1.3 Demo 3). */
function ShortDivisionHcf() {
  return (
    <Frame viewBox="0 0 320 220">
      <text x="160" y="26" textAnchor="middle" fill="#5b6b7c" fontSize="13">
        HCF of 56 and 84 by short division
      </text>
      <g fontFamily="ui-monospace, monospace" fontSize="16" fontWeight="700">
        <text x="70" y="60" fill="#0284c7">
          2
        </text>
        <text x="100" y="60" fill="#94a3b8">
          |
        </text>
        <text x="125" y="60" fill="#18212b">
          56
        </text>
        <text x="175" y="60" fill="#18212b">
          84
        </text>
        <text x="70" y="92" fill="#0284c7">
          2
        </text>
        <text x="100" y="92" fill="#94a3b8">
          |
        </text>
        <text x="125" y="92" fill="#18212b">
          28
        </text>
        <text x="175" y="92" fill="#18212b">
          42
        </text>
        <text x="70" y="124" fill="#0284c7">
          7
        </text>
        <text x="100" y="124" fill="#94a3b8">
          |
        </text>
        <text x="125" y="124" fill="#18212b">
          14
        </text>
        <text x="175" y="124" fill="#18212b">
          21
        </text>
        <text x="125" y="156" fill="#5b6b7c">
          2
        </text>
        <text x="175" y="156" fill="#5b6b7c">
          3
        </text>
      </g>
      <text x="160" y="188" textAnchor="middle" fill="#0f766e" fontSize="15" fontWeight="700">
        HCF = 2 × 2 × 7 = 28
      </text>
      <text x="160" y="208" textAnchor="middle" fill="#5b6b7c" fontSize="12">
        Stop when no common prime remains
      </text>
    </Frame>
  )
}

/** Demo-style LCM short division for 18 and 60 (MIF 1.3 Demo 6). */
function ShortDivisionLcm() {
  return (
    <Frame viewBox="0 0 320 220">
      <text x="160" y="26" textAnchor="middle" fill="#5b6b7c" fontSize="13">
        LCM of 18 and 60 by short division
      </text>
      <g fontFamily="ui-monospace, monospace" fontSize="16" fontWeight="700">
        <text x="70" y="60" fill="#0284c7">
          2
        </text>
        <text x="100" y="60" fill="#94a3b8">
          |
        </text>
        <text x="125" y="60" fill="#18212b">
          18
        </text>
        <text x="175" y="60" fill="#18212b">
          60
        </text>
        <text x="70" y="92" fill="#0284c7">
          3
        </text>
        <text x="100" y="92" fill="#94a3b8">
          |
        </text>
        <text x="125" y="92" fill="#18212b">
          9
        </text>
        <text x="175" y="92" fill="#18212b">
          30
        </text>
        <text x="70" y="124" fill="#0284c7">
          3
        </text>
        <text x="100" y="124" fill="#94a3b8">
          |
        </text>
        <text x="125" y="124" fill="#18212b">
          3
        </text>
        <text x="175" y="124" fill="#18212b">
          10
        </text>
        <text x="125" y="156" fill="#5b6b7c">
          1
        </text>
        <text x="175" y="156" fill="#5b6b7c">
          10
        </text>
      </g>
      <text x="160" y="188" textAnchor="middle" fill="#0f766e" fontSize="15" fontWeight="700">
        LCM = 2 × 3 × 3 × 10 = 180
      </text>
      <text x="160" y="208" textAnchor="middle" fill="#5b6b7c" fontSize="12">
        Multiply all divisors and remaining factors
      </text>
    </Frame>
  )
}

/** Demo-style bracket order (MIF 1.4 tip). */
function OrderBrackets() {
  return (
    <Frame viewBox="0 0 320 210">
      <text x="160" y="28" textAnchor="middle" fill="#5b6b7c" fontSize="13">
        Same digits, different brackets
      </text>
      <rect x="20" y="44" width="280" height="40" rx="8" fill="#f8fafc" stroke="#d7e3dd" />
      <text x="160" y="70" textAnchor="middle" fill="#18212b" fontSize="14" fontFamily="ui-monospace, monospace">
        5 × 20 − 18 ÷ 2 = 91
      </text>
      <rect x="20" y="96" width="280" height="40" rx="8" fill="#ecfdf5" stroke="#0f766e" />
      <text x="160" y="122" textAnchor="middle" fill="#0f766e" fontSize="14" fontFamily="ui-monospace, monospace" fontWeight="700">
        5 × (20 − 18) ÷ 2 = 5
      </text>
      <rect x="20" y="148" width="280" height="40" rx="8" fill="#e0f2fe" stroke="#0284c7" />
      <text x="160" y="174" textAnchor="middle" fill="#0284c7" fontSize="14" fontFamily="ui-monospace, monospace" fontWeight="700">
        5 × (20 − 18 ÷ 2) = 55
      </text>
    </Frame>
  )
}

/** Demo-style decimal point alignment for add/subtract. */
function DecimalAlign() {
  return (
    <Frame viewBox="0 0 320 200">
      <text x="160" y="28" textAnchor="middle" fill="#5b6b7c" fontSize="13">
        Line up decimal points
      </text>
      <g fontFamily="ui-monospace, monospace" fontSize="20" fontWeight="700">
        <text x="100" y="70" fill="#18212b">
          82.50
        </text>
        <text x="70" y="100" fill="#94a3b8">
          +
        </text>
        <text x="100" y="100" fill="#18212b">
          7.64
        </text>
        <line x1="95" y1="112" x2="190" y2="112" stroke="#0f766e" strokeWidth="2" />
        <text x="100" y="140" fill="#0f766e">
          90.14
        </text>
      </g>
      <line x1="148" y1="50" x2="148" y2="150" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 3" />
      <text x="160" y="175" textAnchor="middle" fill="#b45309" fontSize="12" fontWeight="600">
        decimal points in a vertical line
      </text>
    </Frame>
  )
}
