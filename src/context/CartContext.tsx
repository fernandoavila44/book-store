import React, { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { CartAction, CartContextType, CartState } from '../types/cart';

const CartContext = createContext<CartContextType | undefined>(undefined);

// Calcula el total del carrito sumando precio x cantidad de cada item
const calculateTotal = (items: CartState['items']): number =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find((item) => item.id === action.payload.id);

      // Si el libro ya está en el carrito, aumentamos la cantidad
      // Si no, lo agregamos con cantidad 1
      const newItems = existingItem
        ? state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...state.items, { ...action.payload, quantity: 1 }];

      return { items: newItems, total: calculateTotal(newItems) };
    }

    case 'REMOVE_ITEM': {
      // payload es el id del libro que se quita del carrito
      const newItems = state.items.filter((item) => item.id !== action.payload);

      return { items: newItems, total: calculateTotal(newItems) };
    }

    case 'CLEAR_CART':
      // Vacía el carrito por completo
      return { items: [], total: 0 };

    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
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