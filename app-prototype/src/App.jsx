import React, { useMemo, useState } from 'react'
import { useLocalStorage, money, sameMonth, uid } from './lib/store.js'
import { defaultCategories } from './data/categories.js'
import Home from './components/Home.jsx'
import Insights from './components/Insights.jsx'
import AddExpense from './components/AddExpense.jsx'
import BottomNav from './components/BottomNav.jsx'

export default function App() {
  const [expenses, setExpenses] = useLocalStorage('tally.expenses.v1', [])
  const [categories] = useLocalStorage('tally.categories.v1', defaultCategories)
  const [tab, setTab] = useState('home')
  const [addOpen, setAddOpen] = useState(false)
  const [toast, setToast] = useState(null)

  const monthTotal = useMemo(
    () => expenses.filter((e) => sameMonth(e.date)).reduce((s, e) => s + e.amount, 0),
    [expenses]
  )

  function addExpense({ amount, categoryId, note }) {
    const exp = { id: uid(), amount, categoryId, note: note || '', date: new Date().toISOString() }
    setExpenses((list) => [exp, ...list])
    setAddOpen(false)
    // Calm, non-judgmental payoff — never guilt.
    setToast(`Logged ${money(amount)} · ${money(monthTotal + amount)} so far this month`)
    setTimeout(() => setToast(null), 2800)
  }

  function deleteExpense(id) {
    setExpenses((list) => list.filter((e) => e.id !== id))
  }

  return (
    <div className="device">
      <div className="screen">
        {tab === 'home' ? (
          <Home
            expenses={expenses}
            categories={categories}
            monthTotal={monthTotal}
            onDelete={deleteExpense}
            onAdd={() => setAddOpen(true)}
          />
        ) : (
          <Insights expenses={expenses} categories={categories} monthTotal={monthTotal} />
        )}

        <BottomNav tab={tab} setTab={setTab} onAdd={() => setAddOpen(true)} />

        {addOpen && (
          <AddExpense categories={categories} onSave={addExpense} onClose={() => setAddOpen(false)} />
        )}

        {toast && <div className="toast">✓ {toast}</div>}
      </div>
    </div>
  )
}
