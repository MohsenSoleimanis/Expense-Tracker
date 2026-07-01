import React from 'react'

const OTHER = 'Other'

export default function Question({ q, value, otherValue, onChange, onOther, likertAnchors }) {
  return (
    <div className="q">
      <p className="q__label">{q.label}</p>

      {q.type === 'single' && (
        <div className="choices">
          {q.options.map((opt) => (
            <Choice key={opt} type="radio" name={q.id} checked={value === opt} onChange={() => onChange(opt)} label={opt} />
          ))}
          {q.allowOther && (
            <OtherChoice
              type="radio" name={q.id} checked={value === OTHER}
              onSelect={() => onChange(OTHER)} otherValue={otherValue} onOther={onOther}
            />
          )}
        </div>
      )}

      {q.type === 'multi' && (
        <div className="choices">
          {q.options.map((opt) => {
            const arr = value || []
            const checked = arr.includes(opt)
            return (
              <Choice
                key={opt} type="checkbox" name={q.id} checked={checked} label={opt}
                onChange={() => onChange(checked ? arr.filter((v) => v !== opt) : [...arr, opt])}
              />
            )
          })}
          {q.allowOther && (
            <OtherChoice
              type="checkbox" name={q.id} checked={(value || []).includes(OTHER)}
              onSelect={() => {
                const arr = value || []
                const checked = arr.includes(OTHER)
                onChange(checked ? arr.filter((v) => v !== OTHER) : [...arr, OTHER])
              }}
              otherValue={otherValue} onOther={onOther}
            />
          )}
        </div>
      )}

      {q.type === 'likert5' && (
        <div className="likert">
          <div className="scale">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                type="button" key={n} aria-pressed={value === n}
                className={`scale__btn ${value === n ? 'is-sel' : ''}`}
                onClick={() => onChange(n)}
              >
                {n}
              </button>
            ))}
          </div>
          <div className="likert__labels">
            <span>{likertAnchors[0]}</span>
            <span>{likertAnchors[4]}</span>
          </div>
        </div>
      )}

      {q.type === 'number' && (
        <div className="num">
          {q.prefix && <span className="num__affix">{q.prefix}</span>}
          <input
            className="num__input" type="number" min="0" step="0.01" inputMode="decimal"
            placeholder="0" value={value ?? ''}
            onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))}
          />
          {q.suffix && <span className="num__affix num__affix--suf">{q.suffix}</span>}
        </div>
      )}

      {q.type === 'text' &&
        (q.single ? (
          <input className="input" type="text" placeholder="Type here…" value={value ?? ''} onChange={(e) => onChange(e.target.value)} />
        ) : (
          <textarea className="textarea" rows={3} placeholder="Type your answer…" value={value ?? ''} onChange={(e) => onChange(e.target.value)} />
        ))}
    </div>
  )
}

function Choice({ type, name, checked, onChange, label }) {
  return (
    <label className={`choice ${checked ? 'is-sel' : ''}`}>
      <input className="vh" type={type} name={name} checked={checked} onChange={onChange} />
      <span className={`choice__box choice__box--${type}`}>{checked && <Mark />}</span>
      <span className="choice__text">{label}</span>
    </label>
  )
}

function OtherChoice({ type, name, checked, onSelect, otherValue, onOther }) {
  return (
    <div className={`choice choice--other ${checked ? 'is-sel' : ''}`}>
      <label className="choice__head">
        <input className="vh" type={type} name={name} checked={checked} onChange={onSelect} />
        <span className={`choice__box choice__box--${type}`}>{checked && <Mark />}</span>
        <span className="choice__text">Other</span>
      </label>
      {checked && (
        <input
          className="input other-field" placeholder="Please specify…"
          value={otherValue ?? ''} onChange={(e) => onOther(e.target.value)}
        />
      )}
    </div>
  )
}

function Mark() {
  return (
    <svg className="mark" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}
