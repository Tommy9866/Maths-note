import { Link, useNavigate } from 'react-router-dom'
import { DSE_SECTIONS, FORMS, getSubtopicsForTopic, sectionLabel } from '../taxonomy'
import type { FormLevel } from '../taxonomy'
import { MathContent } from './MathContent'

const DEMO_FORMULA = `$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$`

export function DemoPage() {
  const navigate = useNavigate()

  const openForm = (form: FormLevel) => {
    navigate(`/app?group=form&form=${form}`)
  }

  const openSection = (sectionId: string) => {
    navigate(`/app?group=dse&section=${sectionId}`)
  }

  return (
    <div className="demo-page">
      <div className="demo-atmosphere" aria-hidden="true" />
      <div className="demo-hero-visual" aria-hidden="true" />

      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
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

      <main className="relative z-10 mx-auto max-w-6xl px-6 pb-20 pt-8">
        <section className="demo-hero-copy flex min-h-[58vh] max-w-2xl flex-col justify-center">
          <h1 className="demo-title font-display text-5xl leading-[1.05] font-semibold tracking-tight text-[#18212b] sm:text-6xl">
            MathVault
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-[#5b6b7c]">
            A quiet place to browse and read mathematics — organised by form, DSE topic, and
            smaller content units.
          </p>
          <div className="demo-cta-row mt-8">
            <Link
              to="/app"
              className="inline-flex rounded-xl bg-teal-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-700/20 transition hover:bg-teal-600"
            >
              Start reading
            </Link>
          </div>

          <div className="demo-formula mt-14 max-w-xl">
            <div className="border-y border-[#d7e3dd] bg-white/70 px-6 py-5 backdrop-blur">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-teal-50 px-2 py-0.5 text-xs font-semibold text-teal-800 ring-1 ring-inset ring-teal-200">
                  F4
                </span>
                <span className="text-sm font-medium text-[#18212b]">Quadratic Formula</span>
              </div>
              <MathContent content={DEMO_FORMULA} />
            </div>
          </div>
        </section>

        <section className="mt-10 border-t border-[#d7e3dd] pt-12">
          <h2 className="font-display text-2xl font-semibold text-[#18212b]">Browse by form</h2>
          <p className="mt-2 text-sm text-[#5b6b7c]">Choose F1 to F6.</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {FORMS.map((form) => (
              <button
                key={form}
                type="button"
                onClick={() => openForm(form)}
                className="min-w-16 rounded-xl border border-[#d7e3dd] bg-white/80 px-4 py-3 text-sm font-semibold text-[#18212b] transition hover:border-teal-300 hover:bg-teal-50 hover:text-teal-900"
              >
                {form}
              </button>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold text-[#18212b]">
            Browse by DSE topics
          </h2>
          <p className="mt-2 text-sm text-[#5b6b7c]">
            Topics split into smaller units by content level — e.g. Percentage Change (F1) vs
            Simple Interest (F3).
          </p>
          <div className="mt-6 space-y-10">
            {DSE_SECTIONS.map((section) => (
              <div key={section.id}>
                <button
                  type="button"
                  onClick={() => openSection(section.id)}
                  className="text-left font-display text-lg font-semibold text-teal-800 transition hover:text-teal-700"
                >
                  {sectionLabel(section)}
                </button>
                <div className="mt-4 space-y-5">
                  {section.topics.map((topic) => {
                    const subtopics = getSubtopicsForTopic(topic)
                    return (
                      <div key={topic}>
                        <button
                          type="button"
                          onClick={() =>
                            navigate(
                              `/app?group=dse&section=${section.id}&topic=${encodeURIComponent(topic)}`,
                            )
                          }
                          className="text-left text-sm font-semibold text-[#18212b] transition hover:text-teal-800"
                        >
                          {topic}
                        </button>
                        {subtopics.length > 0 ? (
                          <ul className="mt-2 flex flex-wrap gap-2">
                            {subtopics.map((item) => (
                              <li key={item.name}>
                                <button
                                  type="button"
                                  onClick={() =>
                                    navigate(
                                      `/app?group=dse&section=${section.id}&topic=${encodeURIComponent(topic)}&subtopic=${encodeURIComponent(item.name)}`,
                                    )
                                  }
                                  className="rounded-full border border-[#d7e3dd] bg-white/80 px-3 py-1 text-xs text-[#5b6b7c] transition hover:border-teal-300 hover:text-teal-800"
                                >
                                  {item.name}
                                  <span className="ml-1 text-teal-700">
                                    {item.typicalForms.join('/')}
                                  </span>
                                </button>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
