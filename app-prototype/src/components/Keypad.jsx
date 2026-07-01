import React from 'react'

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'del']

export default function Keypad({ onKey }) {
  return (
    <div className="keypad">
      {KEYS.map((k) => (
        <button
          key={k}
          type="button"
          className={`key ${k === 'del' ? 'key--del' : ''}`}
          onClick={() => onKey(k)}
        >
          {k === 'del' ? '⌫' : k}
        </button>
      ))}
    </div>
  )
}
