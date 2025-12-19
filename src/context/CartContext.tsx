import React, { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { CartAction, CartContextType, CartState } from '../types/cart';

const CartContext = createContext<CartContextType | undefined>(undefined);

//TODO: 📌 Implementar el reducer con acciones ADD_ITEM, REMOVE_ITEM y CLEAR para limpiar el carrito completamente
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const book = action.payload;
      if (!book) return state;

      const existingItem = state.items.find(
        (item) => item.id === book.id
      );

      let updatedItems;

      if (existingItem) {
        updatedItems = state.items.map((item) =>
          item.id === book.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedItems = [
          ...state.items,
          { ...book, quantity: 1 },
        ];
      }

      const updatedTotal = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      return {
        items: updatedItems,
        total: updatedTotal,
      };
    }

    case 'REMOVE_ITEM': {
      const id = action.payload;

      const updatedItems = state.items
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);

      const updatedTotal = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      return {
        items: updatedItems,
        total: updatedTotal,
      };
    }

    case 'CLEAR_CART':
      return {
        items: [],
        total: 0,
      };

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