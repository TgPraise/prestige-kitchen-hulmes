import { createContext, useContext, useEffect, useMemo, useReducer } from 'react'

// Cart lives for the current visit only (sessionStorage), per the plan: no accounts.
const KEY = 'pk:cart'
const CartContext = createContext(null)

function reducer(state, action) {
  switch (action.type) {
    case 'add': {
      const found = state.find((i) => i.id === action.item.id)
      return found
        ? state.map((i) => (i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i))
        : [...state, { id: action.item.id, name: action.item.name, pricePence: action.item.pricePence, priceFrom: !!action.item.priceFrom, qty: 1 }]
    }
    case 'inc':
      return state.map((i) => (i.id === action.id ? { ...i, qty: i.qty + 1 } : i))
    case 'dec':
      return state.flatMap((i) => (i.id === action.id ? (i.qty > 1 ? [{ ...i, qty: i.qty - 1 }] : []) : [i]))
    case 'remove':
      return state.filter((i) => i.id !== action.id)
    case 'clear':
      return []
    default:
      return state
  }
}

function load() {
  try {
    return JSON.parse(sessionStorage.getItem(KEY)) || []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, [], load)

  useEffect(() => {
    try {
      sessionStorage.setItem(KEY, JSON.stringify(items))
    } catch {
      /* storage unavailable: cart still works in memory */
    }
  }, [items])

  const value = useMemo(() => {
    const count = items.reduce((n, i) => n + i.qty, 0)
    const subtotalPence = items.every((i) => i.pricePence != null)
      ? items.reduce((n, i) => n + i.pricePence * i.qty, 0)
      : null
    // True when any line is a "from" price, so the UI can say "from £X" instead of implying a final total
    const subtotalIsFrom = items.some((i) => i.priceFrom)
    const qtyOf = (id) => items.find((i) => i.id === id)?.qty ?? 0
    return {
      items,
      count,
      subtotalPence,
      subtotalIsFrom,
      qtyOf,
      add: (item) => dispatch({ type: 'add', item }),
      inc: (id) => dispatch({ type: 'inc', id }),
      dec: (id) => dispatch({ type: 'dec', id }),
      remove: (id) => dispatch({ type: 'remove', id }),
      clear: () => dispatch({ type: 'clear' }),
    }
  }, [items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
