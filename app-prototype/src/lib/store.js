import { useState, useEffect } from 'react'

// Local-first storage — embodies the "your data is yours / no bank login" principle.
export function useLocalStorage(key, initial) {
  const [val, setVal] = useState(() => {
    try {
      const raw = localStorage.getItem(key)
      return raw ? JSON.parse(raw) : initial
    } catch {
      return initial
    }
  })
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(val))
    } catch {
      /* ignore quota / private-mode errors */
    }
  }, [key, val])
  return [val, setVal]
}

export const money = (n) =>
  new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(n || 0)

export const sameMonth = (iso, ref = new Date()) => {
  const d = new Date(iso)
  return d.getFullYear() === ref.getFullYear() && d.getMonth() === ref.getMonth()
}

export const monthLabel = (ref = new Date()) =>
  ref.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })

export function relativeDay(iso) {
  const d = new Date(iso)
  const now = new Date()
  const startOf = (x) => new Date(x.getFullYear(), x.getMonth(), x.getDate())
  const diff = Math.round((startOf(now) - startOf(d)) / 86400000)
  if (diff === 0) return 'Today'
  if (diff === 1) return 'Yesterday'
  if (diff > 1 && diff < 7) return d.toLocaleDateString(undefined, { weekday: 'long' })
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

export function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

// Export the user's data — embodies the "portable data" principle.
export function exportJson(expenses) {
  const blob = new Blob([JSON.stringify(expenses, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'tally-expenses.json'
  a.click()
  URL.revokeObjectURL(url)
}
