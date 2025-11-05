import React, { createContext, useContext, useReducer, type ReactNode, type Dispatch } from 'react';
import type { Book } from '../types/book';


export interface CartItem extends Book {
  quantity: number;
}


export interface CartState {
  items: CartItem[];
  total: number;
}


export type CartAction =
  | { type: 'ADD_ITEM'; payload: Book }
  | { type: 'REMOVE_ITEM'; payload: { id: string } }
  | { type: 'CLEAR' };

export interface CartContextType {
  state: CartState;
  dispatch: Dispatch<CartAction>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      let updatedItems;

      if (existingItemIndex > -1) {
        updatedItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedItems = [...state.items, { ...action.payload, quantity: 1 }];
      }

      const newTotal = updatedItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      return { items: updatedItems, total: newTotal };
    }

    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(
        (item) => item.id !== action.payload.id
      );
  
      const newTotal = updatedItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
  
      return { items: updatedItems, total: newTotal };
    }

    case 'CLEAR': {
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

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de un CartProvider');
  }
  return context;
};