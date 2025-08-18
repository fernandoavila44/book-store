import React, { createContext, useContext, useReducer, useMemo, type ReactNode } from 'react';
import type { CartAction, CartContextType, CartState } from '../types/cart';

const CartContext = createContext<CartContextType | undefined>(undefined);

const initialState: CartState = { items: [], total: 0 };

// Utilidad para recalcular el total a partir de los items (evita desajustes por sumas/restas)
const recalcTotal = (state: CartState) => {
  const sum = state.items.reduce((acc, it) => acc + it.price * it.quantity, 0);
  // Redondeo amable a 2 decimales
  return Math.round(sum * 100) / 100;
};

// Reducer con acciones ADD_ITEM, REMOVE_ITEM, CLEAR_CART
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const exists = state.items.some(it => it.id === action.payload.id);
      const items = exists
        ? state.items.map(it =>
            it.id === action.payload.id ? { ...it, quantity: it.quantity + 1 } : it
          )
        : [...state.items, { ...action.payload, quantity: 1 }];

      const next: CartState = { ...state, items };
      return { ...next, total: recalcTotal(next) };
    }

    case 'REMOVE_ITEM': {
      const itemToRemove = state.items.find(it => it.id === action.payload);
      if (!itemToRemove) return state;

      const items =
        itemToRemove.quantity > 1
          ? state.items.map(it =>
              it.id === action.payload ? { ...it, quantity: it.quantity - 1 } : it
            )
          : state.items.filter(it => it.id !== action.payload);

      const next: CartState = { ...state, items };
      return { ...next, total: recalcTotal(next) };
    }

    case 'CLEAR_CART': {
      return initialState;
    }

    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Evita recrear el objeto value en cada render
  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de un CartProvider');
  }
  return context;
};
