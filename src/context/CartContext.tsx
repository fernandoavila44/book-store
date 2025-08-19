import React, { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { CartAction, CartContextType, CartState } from '../types/cart';

const CartContext = createContext<CartContextType | undefined>(undefined);

//TODO: 📌 Implementar el reducer con acciones ADD_ITEM, REMOVE_ITEM y CLEAR para limpiar el carrito completamente
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch(action.type){
    case "ADD_ITEM":{
      const existingItem = state.items.find(item => item.id === action.payload.id);

      let updatedItems;
      if (existingItem) {
        //si ya existe item nos aumenta la cantidad
        updatedItems = state.items.map(item =>
          item.id === action.payload.id
          ?{...item, quantity: item.quantity +1}
          :item
        );
      } else{
        //si no existe lo agregamos con cantidad = 1
        updatedItems = [...state.items,{...action.payload, quantity: 1}];
      }

      const updatedTotal = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,0
      );

      return {items: updatedItems, total: updatedTotal};
    }

    case "REMOVE_ITEM":{
      const updatedItems = state.items
      .map(item => item.id === action.payload? {...item, quantity: item.quantity -1}
        :item
      )
      .filter(item => item.quantity > 0);//quitaos si llega a 0

      const updatedTotal = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
      );

      return {items: updatedItems, total:updatedTotal};
    }

    case "CLEAR_CART":{
      return {items: [], total: 0};
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