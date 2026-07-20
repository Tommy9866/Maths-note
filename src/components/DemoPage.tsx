import { Link } from 'react-router-dom'
import { MathContent } from './MathContent'

const DEMO_FORMULA = `$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$`

export function DemoPage() {
  return (
    <div className="demo-page min-h-full overflow-x-hidden">
      <div className="demo-atmosphere" aria-hidden="true" />

      <header className="relative z-10 mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 font-serif text-lg text-white shadow-lg shadow-indigo-600/30">
            ∑
          </div>
          <span className="text-lg font-semibold tracking-tight text-white">MathVault</span>
        </div>
        <Link
          to="/app"
          className="rounded-lg border border-white/15 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-indigo-400/40 hover:bg-white/5 hover:text-white"
        >
          Open app
        </Link>
      </header>

      <main className="relative z-10 mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl flex-col justify-center px-6 pb-20 pt-8">
        <div className="demo-hero-copy max-w-2xl">
          <p className="mb-4 text-sm font-medium tracking-[0.2em] text-indigo-300/90 uppercase">
            Maths knowledge base
          </p>
          <h1 className="demo-title text-5xl font-semibold tracking-tight text-white sm:text-6xl">
            MathVault
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-slate-400">
            Store theorems, formulas, and proofs with beautiful LaTeX — organised by topic and
            searchable whenever you need them.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/app"
              className="demo-cta inline-flex rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 transition hover:bg-indigo-500"
            >
              Try the live demo
            </Link>
            <a
              href="https://github.com/Tommy9866/Maths-note"
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-lg border border-white/15 px-6 py-3 text-sm font-medium text-slate-300 transition hover:border-white/25 hover:bg-white/5 hover:text-white"
            >
              View on GitHub
            </a>
          </div>
        </div>

        <div className="demo-formula mt-14 max-w-xl">
          <p className="mb-3 text-xs font-medium tracking-wider text-slate-500 uppercase">
            Sample note preview
          </p>
          <div className="rounded-2xl border border-white/10 bg-[#13161f]/80 px-6 py-5 backdrop-blur">
            <div className="mb-2 flex items-center gap-2">
              <span className="rounded-full bg-violet-500/20 px-2 py-0.5 text-xs font-medium text-violet-300 ring-1 ring-inset ring-violet-500/30">
                Algebra
              </span>
              <span className="text-sm font-medium text-slate-200">Quadratic Formula</span>
            </div>
            <MathContent content={DEMO_FORMULA} />
          </div>
        </div>
      </main>
    </div>
  )
}
