import type { Product } from '../context/CartContext';
import { Book } from './book';

export interface CartItem extends Book {
  quantity: number;
}

export type CartAction =
  | { type: 'ADD_ITEM'; payload: any }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'CLEAR_CART' };

export interface CartState {
  items: CartItem[];
  total: number;
}

export interface CartContextType {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  clearCart: () => void;
  addItem: (product: Product) => void;
  removeItem: (id: number) => void;
}