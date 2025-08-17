import React, { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { CartAction, CartContextType, CartState } from '../types/cart';

const CartContext = createContext<CartContextType | undefined>(undefined);

// Función reducer
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const book = action.payload;      
      
      const existingItemIndex = state.items.findIndex(item => item.id === book.id);
      
      let newItems;
      if (existingItemIndex >= 0) {
        
        newItems = [...state.items];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + 1
        };
      } else {
        
        newItems = [...state.items, { ...book, quantity: 1 }];
      }
      
      
      const newTotal = newItems.reduce((total, item) => total + (item.price * item.quantity), 0);
      
      return { items: newItems, total: newTotal };
    }
    
    case 'REMOVE_ITEM': {
      const bookId = action.payload;     
      
      const newItems = state.items.filter(item => item.id !== bookId);     
      
      const newTotal = newItems.reduce((total, item) => total + (item.price * item.quantity), 0);      
      return { items: newItems, total: newTotal };
    }
    
    case 'CLEAR_CART': {
      
      return { items: [], total: 0 };
    }
    
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