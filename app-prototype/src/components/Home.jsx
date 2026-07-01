import React from 'react'
import { money, monthLabel, relativeDay, sameMonth, exportJson } from '../lib/store.js'
import { catById } from '../data/categories.js'
import TransactionItem from './TransactionItem.jsx'

export default function Home({ expenses, categories, monthTotal, onDelete, onAdd }) {
  const recent = expenses.slice(0, 15)
  const todayTotal = expenses
    .filter((e) => relativeDay(e.date) === 'Today')
    .reduce((s, e) => s + e.amount, 0)
  const count = expenses.filter((e) => sameMonth(e.date)).length

  return (
    <div className="view">
      <header className="topbar">
        <div className="wordmark"><span className="dot" />Tally</div>
        <span className="month">{monthLabel()}</span>
      </header>

      <section className="summary">
        <p className="summary__label">Spent this month</p>
        <p className="summary__amount">{money(monthTotal)}</p>
        <p className="summary__sub">
          {count} {count === 1 ? 'expense' : 'expenses'} · {money(todayTotal)} today
        </p>
      </section>

      <section className="list">
        <div className="list__head">
          <h2>Recent</h2>
          {expenses.length > 0 && (
            <button className="link" onClick={() => exportJson(expenses)}>Export</button>
          )}
        </div>

        {recent.length === 0 ? (
          <div className="empty">
            <div className="empty__emoji">🌱</div>
            <p className="empty__title">Nothing logged yet</p>
            <p className="empty__text">Tap the <b>+</b> to add your first expense — it takes a few seconds, and there’s no judgment here.</p>
            <button className="btn btn--primary" onClick={onAdd}>Add an expense</button>
          </div>
        ) : (
          recent.map((e) => (
            <TransactionItem
              key={e.id}
              exp={e}
              cat={catById(categories, e.categoryId)}
              onDelete={onDelete}
            />
          ))
        )}
      </section>
    </div>
  )
}
