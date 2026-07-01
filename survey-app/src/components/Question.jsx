import React from 'react'

const OTHER = 'Other'

export default function Question({ q, value, otherValue, onChange, onOther, likertAnchors }) {
  return (
    <fieldset className="question">
      <legend className="q-label">{q.label}</legend>

      {q.type === 'single' && (
        <div className="options">
          {q.options.map((opt) => (
            <label key={opt} className={`opt ${value === opt ? 'selected' : ''}`}>
              <input
                type="radio"
                name={q.id}
                checked={value === opt}
                onChange={() => onChange(opt)}
              />
              <span>{opt}</span>
            </label>
          ))}
          {q.allowOther && (
            <OtherRow
              selected={value === OTHER}
              onSelect={() => onChange(OTHER)}
              otherValue={otherValue}
              onOther={onOther}
              type="radio"
              name={q.id}
            />
          )}
        </div>
      )}

      {q.type === 'multi' && (
        <div className="options">
          {q.options.map((opt) => {
            const arr = value || []
            const checked = arr.includes(opt)
            return (
              <label key={opt} className={`opt ${checked ? 'selected' : ''}`}>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() =>
                    onChange(checked ? arr.filter((v) => v !== opt) : [...arr, opt])
                  }
                />
                <span>{opt}</span>
              </label>
            )
          })}
          {q.allowOther && (
            <OtherRow
              selected={(value || []).includes(OTHER)}
              onSelect={() => {
                const arr = value || []
                const checked = arr.includes(OTHER)
                onChange(checked ? arr.filter((v) => v !== OTHER) : [...arr, OTHER])
              }}
              otherValue={otherValue}
              onOther={onOther}
              type="checkbox"
            />
          )}
        </div>
      )}

      {q.type === 'likert5' && (
        <div className="likert">
          <span className="likert-end">{likertAnchors[0]}</span>
          <div className="likert-scale">
            {[1, 2, 3, 4, 5].map((n) => (
              <label key={n} className={`likert-dot ${value === n ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name={q.id}
                  checked={value === n}
                  onChange={() => onChange(n)}
                />
                <span>{n}</span>
              </label>
            ))}
          </div>
          <span className="likert-end">{likertAnchors[4]}</span>
        </div>
      )}

      {q.type === 'number' && (
        <div className="number-row">
          {q.prefix && <span className="affix">{q.prefix}</span>}
          <input
            type="number"
            min="0"
            step="0.01"
            inputMode="decimal"
            value={value ?? ''}
            onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))}
          />
          {q.suffix && <span className="affix">{q.suffix}</span>}
        </div>
      )}

      {q.type === 'text' &&
        (q.single ? (
          <input
            type="text"
            className="text-single"
            value={value ?? ''}
            onChange={(e) => onChange(e.target.value)}
          />
        ) : (
          <textarea
            rows={3}
            value={value ?? ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Type your answer…"
          />
        ))}
    </fieldset>
  )
}

function OtherRow({ selected, onSelect, otherValue, onOther, type, name }) {
  return (
    <div className={`opt other ${selected ? 'selected' : ''}`}>
      <label>
        <input type={type} name={name} checked={selected} onChange={onSelect} />
        <span>Other</span>
      </label>
      {selected && (
        <input
          type="text"
          className="other-input"
          placeholder="Please specify…"
          value={otherValue ?? ''}
          onChange={(e) => onOther(e.target.value)}
        />
      )}
    </div>
  )
}
