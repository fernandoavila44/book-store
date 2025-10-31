import React, { createContext, useReducer, useContext } from 'react';
import type { CartContextType, CartState, CartAction, CartItem } from '../types/cart';

const initialState: CartState = {
  items: [],
  total: 0,
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      let updatedItems: CartItem[];

      if (existingItem) {
        updatedItems = state.items.map(item =>
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
      const filtered = state.items.filter(item => item.id !== action.payload);
      const total = filtered.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      return { items: filtered, total };
    }

    case 'CLEAR_CART':
      return { items: [], total: 0 };

    default:
      return state;
  }
};

const CartContext = createContext<CartContextType>({
  state: initialState,
  dispatch: () => undefined,
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

