import React from 'react'

export default function BottomNav({ tab, setTab, onAdd }) {
  return (
    <nav className="nav">
      <button
        className={`nav__btn ${tab === 'home' ? 'is-active' : ''}`}
        onClick={() => setTab('home')}
      >
        <span className="nav__ico">🏠</span>
        <span className="nav__lbl">Home</span>
      </button>

      <button className="fab" onClick={onAdd} aria-label="Add expense">
        +
      </button>

      <button
        className={`nav__btn ${tab === 'insights' ? 'is-active' : ''}`}
        onClick={() => setTab('insights')}
      >
        <span className="nav__ico">📊</span>
        <span className="nav__lbl">Insights</span>
      </button>
    </nav>
  )
}
