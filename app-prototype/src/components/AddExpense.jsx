import React, { useState } from 'react'
import { money } from '../lib/store.js'
import Keypad from './Keypad.jsx'

export default function AddExpense({ categories, onSave, onClose }) {
  const [raw, setRaw] = useState('0') // amount as a string being typed
  const [catId, setCatId] = useState(null)
  const [note, setNote] = useState('')
  const [showNote, setShowNote] = useState(false)

  const amount = parseFloat(raw) || 0
  const canSave = amount > 0 && !!catId

  function onKey(k) {
    setRaw((r) => {
      if (k === 'del') return r.length <= 1 ? '0' : r.slice(0, -1)
      if (k === '.') return r.includes('.') ? r : r + '.'
      const [, dec] = r.split('.')
      if (dec && dec.length >= 2) return r // max 2 decimals
      if (r === '0') return k
      return r + k
    })
  }

  return (
    <div className="sheet" role="dialog" aria-label="Add expense">
      <div className="sheet__head">
        <button className="icon-btn" onClick={onClose} aria-label="Close">✕</button>
        <span className="sheet__title">Add expense</span>
        <span className="sheet__spacer" />
      </div>

      <div className="amount">
        <span className="amount__cur">$</span>
        <span className="amount__val">{raw}</span>
      </div>

      <div className="cats" role="listbox" aria-label="Category">
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            className={`cat ${catId === c.id ? 'is-sel' : ''}`}
            onClick={() => setCatId(c.id)}
            style={catId === c.id ? { borderColor: c.color, background: c.color + '1e' } : undefined}
          >
            <span className="cat__emoji">{c.emoji}</span>
            <span className="cat__name">{c.name}</span>
          </button>
        ))}
      </div>

      {showNote ? (
        <input
          className="note"
          placeholder="Add a note (optional)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          autoFocus
        />
      ) : (
        <button className="note-add" type="button" onClick={() => setShowNote(true)}>
          + Add a note
        </button>
      )}

      <Keypad onKey={onKey} />

      <button
        className="btn btn--primary btn--save"
        disabled={!canSave}
        onClick={() => onSave({ amount, categoryId: catId, note })}
      >
        {canSave ? `Log ${money(amount)}` : amount > 0 ? 'Pick a category' : 'Enter an amount'}
      </button>
    </div>
  )
}
