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
