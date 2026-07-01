import React, { useMemo, useState } from 'react'
import { survey } from './data/survey.js'
import Question from './components/Question.jsx'
import { submitResponse, isConfigured } from './lib/supabase.js'

export default function App() {
  const [status, setStatus] = useState('intro') // intro | form | submitting | done | error
  const [step, setStep] = useState(0)
  const [responses, setResponses] = useState({})
  const [others, setOthers] = useState({})
  const [errorMsg, setErrorMsg] = useState('')

  // Sections/questions can be hidden based on earlier answers.
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

  const setAnswer = (id, val) => setResponses((r) => ({ ...r, [id]: val }))
  const setOther = (id, val) => setOthers((o) => ({ ...o, [id]: val }))

  async function handleSubmit() {
    setStatus('submitting')
    setErrorMsg('')

    // Merge "Other" free-text into the answers payload.
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
    } catch {
      /* meta is best-effort */
    }

    try {
      await submitResponse(answers, meta)
      setStatus('done')
    } catch (e) {
      setErrorMsg(e.message || 'Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  // ---------- Screens ----------
  if (status === 'intro') {
    return (
      <Shell>
        <div className="card intro">
          <h1>{survey.title}</h1>
          <p className="lede">{survey.intro}</p>
          {!isConfigured && (
            <p className="warn">
              ⚠ Supabase isn’t configured yet — copy <code>.env.example</code> to{' '}
              <code>.env</code> and add your project URL + anon key before collecting real
              responses.
            </p>
          )}
          <button className="primary" onClick={() => setStatus('form')}>
            Start →
          </button>
          <p className="tiny">Anonymous · ~5 minutes · skip anything you like</p>
        </div>
      </Shell>
    )
  }

  if (status === 'done') {
    return (
      <Shell>
        <div className="card done">
          <div className="check">✓</div>
          <h1>Thank you!</h1>
          <p className="lede">Your answers were saved anonymously. This really helps.</p>
        </div>
      </Shell>
    )
  }

  const submitting = status === 'submitting'

  return (
    <Shell>
      <div className="progress">
        <div
          className="bar"
          style={{ width: `${((safeStep + 1) / visibleSections.length) * 100}%` }}
        />
      </div>
      <p className="step-count">
        Step {safeStep + 1} of {visibleSections.length}
      </p>

      <div className="card">
        <h2 className="section-title">{section.title}</h2>

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

        {status === 'error' && (
          <p className="error">⚠ {errorMsg}</p>
        )}

        <div className="nav">
          <button
            className="ghost"
            disabled={safeStep === 0 || submitting}
            onClick={() => setStep(safeStep - 1)}
          >
            ← Back
          </button>

          {isLast ? (
            <button className="primary" disabled={submitting} onClick={handleSubmit}>
              {submitting ? 'Submitting…' : 'Submit'}
            </button>
          ) : (
            <button className="primary" onClick={() => setStep(safeStep + 1)}>
              Next →
            </button>
          )}
        </div>
      </div>

      <p className="tiny center">You can skip any question. Please don’t enter account or card numbers.</p>
    </Shell>
  )
}

function Shell({ children }) {
  return (
    <div className="page">
      <main className="wrap">{children}</main>
    </div>
  )
}
