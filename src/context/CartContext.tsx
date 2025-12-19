import React, { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { CartAction, CartContextType, CartState } from '../types/cart';

const CartContext = createContext<CartContextType | undefined>(undefined);

// 📌 Implementación simple del reducer
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const itemExist = state.items.find(
        (item) => item.id === action.payload.id
      );

      let updatedItems;

      if (itemExist) {
        updatedItems = state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedItems = [...state.items, { ...action.payload, quantity: 1 }];
      }

      const total = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      return { items: updatedItems, total };
    }

    case 'REMOVE_ITEM': {
      const updatedItems = state.items
        .map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);

      const total = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      return { items: updatedItems, total };
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
