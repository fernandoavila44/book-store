import React, { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { CartAction, CartContextType, CartState } from '../types/cart';

const CartContext = createContext<CartContextType | undefined>(undefined);

//TODO: 📌 Implementar el reducer con acciones ADD_ITEM, REMOVE_ITEM y CLEAR para limpiar el carrito completamente
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      // payload es un Book; al agregar al carrito necesitamos un CartItem con quantity
      const book = action.payload;
      const existing = state.items.find((i) => i.id === book.id);

      let updatedItems: CartState['items'];
      if (existing) {
        updatedItems = state.items.map((i) =>
          i.id === book.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        const newItem = { ...book, quantity: 1 };
        updatedItems = [...state.items, newItem];
      }

      const updatedTotal = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

      return { items: updatedItems, total: updatedTotal };
    }

    case 'REMOVE_ITEM': {
      const idToRemove = action.payload;
      const updatedItems = state.items.filter((i) => i.id !== idToRemove);
      const updatedTotal = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      return { items: updatedItems, total: updatedTotal };
    }

    case 'CLEAR_CART':
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