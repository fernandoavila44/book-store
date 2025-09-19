import React, { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { CartAction, CartContextType, CartState } from '../types/cart';

const CartContext = createContext<CartContextType | undefined>(undefined);

//TODO✅: (COMPLETADO) 📌 Implementar el reducer con acciones ADD_ITEM, REMOVE_ITEM y CLEAR para limpiar el carrito completamente
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      // ¿Ya existe en el carrito?
      const existingItem = state.items.find(item => item.id === action.payload.id);

      let newItems;
      if (existingItem) {
        // Incrementamos cantidad si ya existe
        newItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Lo agregamos con quantity = 1
        newItems = [...state.items, { ...action.payload, quantity: 1 }];
      }

      const newTotal = newItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      return { items: newItems, total: newTotal };
    }

    case "REMOVE_ITEM": {
      const newItems = state.items
        .map(item =>
          item.id === action.payload // 
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0);

      const newTotal = newItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      return { items: newItems, total: newTotal };
    }

    case "CLEAR_CART": {
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