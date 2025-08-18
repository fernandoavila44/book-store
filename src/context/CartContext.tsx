import React, { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { CartAction, CartContextType, CartState } from '../types/cart';

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
      
      if (existingItemIndex >= 0) {
        // Si el item ya existe, incrementar la cantidad
        const updatedItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        const newTotal = updatedItems.reduce((total, item) => total + (item.price * item.quantity), 0);
        
        console.log(`Incrementando cantidad del item "${action.payload.title}" de ${state.items[existingItemIndex].quantity} a ${state.items[existingItemIndex].quantity + 1}`);
        
        return {
          items: updatedItems,
          total: newTotal
        };
      } else {
        // Si el item no existe, agregarlo con cantidad 1
        const newItem = { ...action.payload, quantity: 1 };
        const updatedItems = [...state.items, newItem];
        const newTotal = updatedItems.reduce((total, item) => total + (item.price * item.quantity), 0);
        
        console.log(`Agregando nuevo item "${action.payload.title}" al carrito`);
        
        return {
          items: updatedItems,
          total: newTotal
        };
      }
    }
    
    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(item => item.id !== action.payload);
      const newTotal = updatedItems.reduce((total, item) => total + (item.price * item.quantity), 0);
      
      return {
        items: updatedItems,
        total: newTotal
      };
    }
    
    case 'INCREASE_QUANTITY': {
      const updatedItems = state.items.map(item =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      const newTotal = updatedItems.reduce((total, item) => total + (item.price * item.quantity), 0);
      
      return {
        items: updatedItems,
        total: newTotal
      };
    }
    
    case 'DECREASE_QUANTITY': {
      const existingItem = state.items.find(item => item.id === action.payload);
      if (!existingItem) return state;
      
      if (existingItem.quantity <= 1) {
        // Si la cantidad es 1 o menos, eliminar el item
        const updatedItems = state.items.filter(item => item.id !== action.payload);
        const newTotal = updatedItems.reduce((total, item) => total + (item.price * item.quantity), 0);
        
        return {
          items: updatedItems,
          total: newTotal
        };
      } else {
        // Decrementar la cantidad
        const updatedItems = state.items.map(item =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
        const newTotal = updatedItems.reduce((total, item) => total + (item.price * item.quantity), 0);
        
        return {
          items: updatedItems,
          total: newTotal
        };
      }
    }
    
    case 'CLEAR_CART': {
      return {
        items: [],
        total: 0
      };
    }
    
    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }: { children: ReactNode }) => {
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