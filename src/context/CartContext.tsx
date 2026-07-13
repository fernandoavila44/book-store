import React, { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { CartAction, CartContextType, CartState } from '../types/cart';

const CartContext = createContext<CartContextType | undefined>(undefined);

//TODO: 📌 Implementar el reducer con acciones ADD_ITEM, REMOVE_ITEM y CLEAR para limpiar el carrito completamente
const calculateTotal = (items: CartState['items']): number => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      const updatedItems = existingItem
        ? state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...state.items, { ...action.payload, quantity: 1 }];

      return {
        items: updatedItems,
        total: calculateTotal(updatedItems),
      };
    }
     case 'REMOVE_ITEM': {
       const updatedItems = state.items.filter(item => item.id !== action.payload);

      return {
        items: updatedItems,
        total: calculateTotal(updatedItems),
      };
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