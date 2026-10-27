
import React, {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
} from 'react';

import type {
  CartAction,
  CartContextType,
  CartState,
} from '../types/cart';

const CartContext = createContext<CartContextType | undefined>(undefined);

// Calcula el valor total de los libros del carrito.
const calculateTotal = (items: CartState['items']): number => {
  return items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
};

// Administra las acciones del carrito.
const cartReducer = (
  state: CartState,
  action: CartAction
): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      const items = existingItem
        ? state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...state.items, { ...action.payload, quantity: 1 }];

      return {
        items,
        total: calculateTotal(items),
      };
    }

    case 'REMOVE_ITEM': {
      const items = state.items.filter(
        (item) => item.id !== action.payload
      );

      return {
        items,
        total: calculateTotal(items),
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

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
  });

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Permite acceder al carrito desde los componentes.
export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart debe usarse dentro de un CartProvider');
  }

  return context;
};
