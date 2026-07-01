import React from 'react'
import { money, monthLabel, sameMonth } from '../lib/store.js'
import { catById } from '../data/categories.js'

export default function Insights({ expenses, categories, monthTotal }) {
  const monthExp = expenses.filter((e) => sameMonth(e.date))
  const byCat = {}
  for (const e of monthExp) byCat[e.categoryId] = (byCat[e.categoryId] || 0) + e.amount
  const rows = Object.entries(byCat)
    .map(([id, amt]) => ({ cat: catById(categories, id), amt }))
    .sort((a, b) => b.amt - a.amt)
  const max = rows.length ? rows[0].amt : 1

  return (
    <div className="view">
      <header className="topbar">
        <div className="wordmark"><span className="dot" />Where it went</div>
        <span className="month">{monthLabel()}</span>
      </header>

      <section className="summary summary--soft">
        <p className="summary__label">This month · no judgment</p>
        <p className="summary__amount">{money(monthTotal)}</p>
      </section>

      <section className="list">
        {rows.length === 0 ? (
          <div className="empty">
            <div className="empty__emoji">📊</div>
            <p className="empty__title">Nothing to show yet</p>
            <p className="empty__text">Log a few expenses and a calm breakdown appears here.</p>
          </div>
        ) : (
          rows.map(({ cat, amt }) => (
            <div className="bar" key={cat.id}>
              <div className="bar__top">
                <span className="bar__name">
                  <span className="bar__emoji">{cat.emoji}</span> {cat.name}
                </span>
                <span className="bar__amt">{money(amt)}</span>
              </div>
              <div className="bar__track">
                <div className="bar__fill" style={{ width: `${(amt / max) * 100}%`, background: cat.color }} />
              </div>
              <span className="bar__pct">{monthTotal ? Math.round((amt / monthTotal) * 100) : 0}% of this month</span>
            </div>
          ))
        )}
      </section>
    </div>
  )
}
