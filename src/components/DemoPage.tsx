import { Link } from 'react-router-dom'
import { MathContent } from './MathContent'

const DEMO_FORMULA = `$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$`

export function DemoPage() {
  return (
    <div className="demo-page">
      <div className="demo-atmosphere" aria-hidden="true" />
      <div className="demo-hero-visual" aria-hidden="true" />

      <header className="relative z-10 mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-700 font-display text-xl text-white shadow-lg shadow-teal-700/25">
            ∑
          </div>
          <span className="font-display text-xl font-semibold tracking-tight text-[#18212b]">
            MathVault
          </span>
        </div>
        <Link
          to="/app"
          className="rounded-xl border border-[#d7e3dd] bg-white/70 px-4 py-2 text-sm font-medium text-[#18212b] transition hover:border-teal-300 hover:bg-white"
        >
          Open library
        </Link>
      </header>

      <main className="relative z-10 mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl flex-col justify-center px-6 pb-20 pt-6">
        <div className="demo-hero-copy max-w-2xl">
          <h1 className="demo-title font-display text-5xl leading-[1.05] font-semibold tracking-tight text-[#18212b] sm:text-6xl">
            MathVault
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-[#5b6b7c]">
            Your personal maths library — add theorems and formulas with Cursor as Markdown, then
            browse them here with clean LaTeX rendering.
          </p>
          <div className="demo-cta-row mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/app"
              className="inline-flex rounded-xl bg-teal-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-700/20 transition hover:bg-teal-600"
            >
              Browse notes
            </Link>
            <a
              href="https://github.com/Tommy9866/Maths-note/tree/cursor/maths-knowledge-website-3425/content/notes"
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-xl border border-[#d7e3dd] bg-white/80 px-6 py-3 text-sm font-medium text-[#18212b] transition hover:border-teal-300 hover:bg-white"
            >
              Add notes via Cursor
            </a>
          </div>
        </div>

        <div className="demo-formula mt-14 max-w-xl">
          <p className="mb-3 text-xs font-semibold tracking-[0.16em] text-[#5b6b7c] uppercase">
            From your library
          </p>
          <div className="border-y border-[#d7e3dd] bg-white/70 px-6 py-5 backdrop-blur">
            <div className="mb-2 flex items-center gap-2">
              <span className="rounded-full bg-teal-50 px-2 py-0.5 text-xs font-medium text-teal-800 ring-1 ring-inset ring-teal-200">
                Algebra
              </span>
              <span className="text-sm font-medium text-[#18212b]">Quadratic Formula</span>
            </div>
            <MathContent content={DEMO_FORMULA} />
          </div>
        </div>
      </main>
    </div>
  )
}
