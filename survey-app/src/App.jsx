import React, { useMemo, useState } from 'react'
import { survey } from './data/survey.js'
import Question from './components/Question.jsx'
import { submitResponse } from './lib/supabase.js'

export default function App() {
  const [status, setStatus] = useState('intro') // intro | form | submitting | done | error
  const [step, setStep] = useState(0)
  const [responses, setResponses] = useState({})
  const [others, setOthers] = useState({})
  const [errorMsg, setErrorMsg] = useState('')

  const visibleSections = useMemo(
    () => survey.sections.filter((s) => !s.showIf || s.showIf(responses)),
    [responses]
  )
  const safeStep = Math.min(step, visibleSections.length - 1)
  const section = visibleSections[safeStep]
  const visibleQuestions = section
    ? section.questions.filter((q) => !q.showIf || q.showIf(responses))
    : []
  const isLast = safeStep === visibleSections.length - 1
  const onForm = status === 'form' || status === 'submitting' || status === 'error'

  const setAnswer = (id, val) => setResponses((r) => ({ ...r, [id]: val }))
  const setOther = (id, val) => setOthers((o) => ({ ...o, [id]: val }))
  const go = (n) => { setStep(n); scrollTop() }
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  async function handleSubmit() {
    setStatus('submitting')
    setErrorMsg('')
    const answers = { ...responses }
    for (const [id, txt] of Object.entries(others)) {
      if (txt && txt.trim()) answers[`${id}_other`] = txt.trim()
    }
    let meta = {}
    try {
      meta = {
        submittedAt: new Date().toISOString(),
        userAgent: navigator.userAgent,
        language: navigator.language,
        screen: `${window.screen?.width}x${window.screen?.height}`,
      }
    } catch { /* best-effort */ }

    try {
      await submitResponse(answers, meta)
      setStatus('done')
      scrollTop()
    } catch (e) {
      setErrorMsg(e.message || 'Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  const headline = status === 'done'
    ? 'Thank you.'
    : 'Help shape a calmer way to handle money.'
  const sub = status === 'done'
    ? 'Your answers were saved anonymously.'
    : 'A short, anonymous study on how people really keep track of their spending.'

  return (
    <div className="app">
      <aside className="brand">
        <div className="brand__inner">
          <div className="brand__logo">
            <span className="brand__mark">◎</span> Spending&nbsp;Study
          </div>

          <div className="brand__body">
            <h1 className="brand__headline">{headline}</h1>
            <p className="brand__sub">{sub}</p>
          </div>

          <div className="brand__foot">
            {onForm && (
              <div className="progress">
                <div className="progress__label">
                  <span>{section.title}</span>
                  <span>{safeStep + 1} / {visibleSections.length}</span>
                </div>
                <div className="progress__track">
                  <div
                    className="progress__bar"
                    style={{ width: `${((safeStep + 1) / visibleSections.length) * 100}%` }}
                  />
                </div>
              </div>
            )}
            {status === 'intro' && (
              <div className="chips">
                <span className="chip">◷ ~5 minutes</span>
                <span className="chip">🔒 Anonymous</span>
                <span className="chip">✎ Skip anything</span>
              </div>
            )}
          </div>

          <div className="brand__glow" aria-hidden="true" />
        </div>
      </aside>

      <main className="panel">
        <div className="panel__inner">
          {status === 'intro' && (
            <section className="intro step" key="intro">
              <p className="intro__eyebrow">Spending habits research</p>
              <h2 className="intro__title">{survey.title}</h2>
              <p className="intro__text">{survey.intro}</p>
              <div className="actions actions--start">
                <button className="btn btn--primary" onClick={() => { setStatus('form'); scrollTop() }}>
                  Start survey <ArrowR />
                </button>
              </div>
              <p className="fineprint">No sign-up · Please don’t enter account or card numbers.</p>
            </section>
          )}

          {onForm && (
            <section className="step" key={safeStep}>
              <h2 className="step__title">{section.title}</h2>
              {visibleQuestions.map((q) => (
                <Question
                  key={q.id}
                  q={q}
                  value={responses[q.id]}
                  otherValue={others[q.id]}
                  onChange={(val) => setAnswer(q.id, val)}
                  onOther={(val) => setOther(q.id, val)}
                  likertAnchors={survey.likertAnchors}
                />
              ))}
              {status === 'error' && <p className="error">⚠ {errorMsg}</p>}
              <div className="actions">
                <button
                  className="btn btn--ghost"
                  disabled={safeStep === 0 || status === 'submitting'}
                  onClick={() => go(safeStep - 1)}
                >
                  <ArrowL /> Back
                </button>
                {isLast ? (
                  <button className="btn btn--primary" disabled={status === 'submitting'} onClick={handleSubmit}>
                    {status === 'submitting' ? 'Submitting…' : 'Submit'} <ArrowR />
                  </button>
                ) : (
                  <button className="btn btn--primary" onClick={() => go(safeStep + 1)}>
                    Continue <ArrowR />
                  </button>
                )}
              </div>
              <p className="fineprint">You can skip any question.</p>
            </section>
          )}

          {status === 'done' && (
            <section className="done step" key="done">
              <SuccessCheck />
              <h2 className="done__title">All done — thank you!</h2>
              <p className="done__text">
                Your response was saved anonymously. This genuinely helps shape a better, calmer money app.
              </p>
            </section>
          )}
        </div>
      </main>
    </div>
  )
}

/* ---- inline icons ---- */
function ArrowR() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}
function ArrowL() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M11 6l-6 6 6 6" />
    </svg>
  )
}
function SuccessCheck() {
  return (
    <svg className="done__check" viewBox="0 0 80 80" aria-hidden="true">
      <circle cx="40" cy="40" r="34" />
      <path d="M26 41l10 10 20-22" />
    </svg>
  )
}
