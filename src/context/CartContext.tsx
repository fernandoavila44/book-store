//TODO: 📌 Implementar el reducer con acciones ADD_ITEM, REMOVE_ITEM y CLEAR para limpiar el carrito completamente

import { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { CartAction, CartContextType, CartState } from '../types/cart';

const CartContext = createContext<CartContextType | undefined>(undefined);

// Reducer completo según el tipo de acciones del proyecto:
// "ADD_ITEM" | "REMOVE_ITEM" | "CLEAR_CART"
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const item = action.payload; // item (libro)

      const existing = state.items.find((i) => i.id === item.id);

      const updatedItems = existing
        ? state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          )
        : [...state.items, { ...item, quantity: 1 }];

      const updatedTotal = updatedItems.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0
      );

      return { items: updatedItems, total: updatedTotal };
    }

    case 'REMOVE_ITEM': {
      const id = action.payload; // id del libro

      const existing = state.items.find((i) => i.id === id);
      if (!existing) return state;

      const updatedItems =
        existing.quantity > 1
          ? state.items.map((i) =>
              i.id === id ? { ...i, quantity: i.quantity - 1 } : i
            )
          : state.items.filter((i) => i.id !== id);

      const updatedTotal = updatedItems.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0
      );

      return { items: updatedItems, total: updatedTotal };
    }

    case 'CLEAR_CART':
      return { items: [], total: 0 };

    default:
      return state;
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de un CartProvider');
  }
  return context;
};
