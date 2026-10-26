import React, { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { CartAction, CartContextType, CartState } from '../types/cart';

const CartContext = createContext<CartContextType | undefined>(undefined);

//TODO: 📌 Implementar el reducer con acciones ADD_ITEM, REMOVE_ITEM y CLEAR para limpiar el carrito completamente
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
  const existingItemIndex = state.items.findIndex(
    item => item.id === action.payload.id
  );

  if (existingItemIndex !== -1) {
    const updatedItems = [...state.items];

    updatedItems[existingItemIndex].quantity += 1;

    return {
      ...state,
      items: updatedItems,
      total: state.total + action.payload.price,
    };
  }

  const newItem = {
    ...action.payload,
    quantity: 1,
  };

  return {
    ...state,
    items: [...state.items, newItem],
    total: state.total + action.payload.price,
  };
}
    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(
        item => item.id !== action.payload
      );
      return {
        ...state,
        items: updatedItems,
        total: updatedItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),
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