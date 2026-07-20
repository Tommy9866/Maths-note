import { Link } from 'react-router-dom'
import { FEATURED_LESSON } from '../taxonomy'

export function DemoPage() {
  return (
    <div className="demo-page">
      <div className="demo-atmosphere" aria-hidden="true" />
      <div className="demo-hero-visual" aria-hidden="true" />

      <header className="relative z-10 mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-700 font-display text-xl text-white shadow-lg shadow-teal-700/25">
            ∑
          </div>
          <span className="font-display text-xl font-semibold tracking-tight text-[#18212b]">
            MathVault
          </span>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-3xl px-6 pb-24 pt-10">
        <section className="demo-hero-copy flex min-h-[70vh] flex-col justify-center">
          <p className="text-sm font-semibold tracking-wide text-teal-800 uppercase">
            Form 1 · first lesson
          </p>
          <h1 className="demo-title mt-3 font-display text-5xl leading-[1.05] font-semibold tracking-tight text-[#18212b] sm:text-6xl">
            MathVault
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-[#5b6b7c]">
            One clear place to read. We start with Form 1 divisibility rules — step by step,
            with worked examples.
          </p>

          <div className="demo-cta-row mt-9">
            <Link
              to={FEATURED_LESSON.path}
              className="inline-flex rounded-xl bg-teal-700 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-teal-700/20 transition hover:bg-teal-600"
            >
              Read {FEATURED_LESSON.title}
            </Link>
          </div>

          <div className="mt-14 max-w-md border-t border-[#d7e3dd] pt-6">
            <p className="text-sm leading-relaxed text-[#5b6b7c]">
              <span className="font-semibold text-[#18212b]">{FEATURED_LESSON.form}</span>
              {' · '}
              Tests for 2, 3, 4, 5, 6, 9, and 10 — each with a worked example.
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}
