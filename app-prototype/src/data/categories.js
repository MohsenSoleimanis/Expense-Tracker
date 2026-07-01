// Default, user-shaped categories (mental accounting). Editable in a real build.
export const defaultCategories = [
  { id: 'food', name: 'Food & Drink', emoji: '🍔', color: '#E8A13B' },
  { id: 'groceries', name: 'Groceries', emoji: '🛒', color: '#5BA36A' },
  { id: 'transport', name: 'Transport', emoji: '🚌', color: '#4C86C6' },
  { id: 'coffee', name: 'Coffee', emoji: '☕', color: '#B07A4F' },
  { id: 'shopping', name: 'Shopping', emoji: '🛍️', color: '#C86FA6' },
  { id: 'home', name: 'Home & Bills', emoji: '🏠', color: '#7A76C2' },
  { id: 'health', name: 'Health', emoji: '💊', color: '#4FB0A5' },
  { id: 'fun', name: 'Fun', emoji: '🎬', color: '#E07A5F' },
  { id: 'travel', name: 'Travel', emoji: '✈️', color: '#3FA7D6' },
  { id: 'other', name: 'Other', emoji: '📦', color: '#8A938C' },
]

export const catById = (cats, id) =>
  cats.find((c) => c.id === id) || { id: 'other', name: 'Other', emoji: '📦', color: '#8A938C' }
