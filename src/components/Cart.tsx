import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import type { CartItem } from '../types/cart';
import styles from './Cart.module.css';


const Cart: React.FC = () => {
  const { state, dispatch } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const handleRemoveItem = (itemId: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: itemId });
  };

  return (
    <div className={styles.cartContainer}>
      <h2>Tu Carrito</h2>
      {state.items.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        <>
          <ul className={styles.cartItems}>
            {state.items.map((item: CartItem) => (
              <li key={item.id} className={styles.cartItem}>
                <div className={styles.itemInfo}>
                  <h3>{item.title}</h3>
                  <p>Precio: ${item.price.toFixed(2)}</p>
                  <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <div className={styles.quantityControls}>
                  <button
                    onClick={() => dispatch({ type: 'DECREASE_QUANTITY', payload: item.id })}
                    aria-label={`Disminuir cantidad de ${item.title}`}
                  >
                    -
                  </button>
                  <span className={styles.quantity}>{item.quantity}</span>
                  <button
                    onClick={() => dispatch({ type: 'INCREASE_QUANTITY', payload: item.id })}
                    aria-label={`Aumentar cantidad de ${item.title}`}
                  >
                    +
                  </button>
                </div>
                <button
                  className={styles.removeItem}
                  onClick={() => handleRemoveItem(item.id)}
                  aria-label={`Eliminar ${item.title} del carrito`}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
          <div className={styles.cartSummary}>
            <h3>Total: ${state.total.toFixed(2)}</h3>
            <button
              onClick={handleCheckout}
              className={styles.checkoutButton}
            >
              Proceder al Pago
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;