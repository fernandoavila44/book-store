import { Book } from './book';

export interface CartItem extends Book {
  quantity: number;
}

export type CartAction =
  | { type: 'ADD_ITEM'; payload: Book }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'DECREASE_QUANTITY'; payload: number }
  | { type: 'INCREASE_QUANTITY'; payload: number }
  | { type: 'CLEAR_CART' };

export interface CartState {
  items: CartItem[];
  total: number;
}

export interface CartContextType {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
}