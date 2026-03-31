import React, { createContext, useReducer, useContext } from 'react';
import type { CartState, CartAction, CartContextType } from '../types/cart';

const initialState: CartState = {
  items: [],
  total: 0,
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {

    case 'ADD_ITEM': {
      const existing = state.items.find((i) => i.id === action.payload.id);
      const updatedItems = existing
        ? state.items.map((i) =>
            i.id === action.payload.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          )
        : [...state.items, { ...action.payload, quantity: 1 }];

      return {
        items: updatedItems,
        total: updatedItems.reduce((acc, i) => acc + i.price * i.quantity, 0),
      };
    }

    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter((i) => i.id !== action.payload);
      return {
        items: updatedItems,
        total: updatedItems.reduce((acc, i) => acc + i.price * i.quantity, 0),
      };
    }

    case 'CLEAR_CART':
      return initialState;

    default:
      return state;
  }
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart debe usarse dentro de CartProvider');
  return context;
}