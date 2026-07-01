import React, { useState } from 'react'
import { money, relativeDay } from '../lib/store.js'

export default function TransactionItem({ exp, cat, onDelete }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`txn ${open ? 'txn--open' : ''}`} onClick={() => setOpen((o) => !o)}>
      <div className="txn__icon" style={{ background: cat.color + '22' }}>
        <span>{cat.emoji}</span>
      </div>
      <div className="txn__mid">
        <p className="txn__name">{cat.name}</p>
        <p className="txn__sub">
          {exp.note ? exp.note + ' · ' : ''}
          {relativeDay(exp.date)}
        </p>
      </div>
      <div className="txn__amt">{money(exp.amount)}</div>
      {open && (
        <button
          className="txn__del"
          onClick={(e) => {
            e.stopPropagation()
            onDelete(exp.id)
          }}
          aria-label="Delete expense"
        >
          Delete
        </button>
      )}
    </div>
  )
}
