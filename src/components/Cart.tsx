import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import type { CartItem } from '../types/cart';

const formatPrice = (v: number) => `$${v.toFixed(2)}`;

const Cart: React.FC = () => {
  const { state, dispatch } = useCart();
  const navigate = useNavigate();

  const { items, total } = state;

  const handleCheckout = useCallback(() => {
    navigate('/checkout');
  }, [navigate]);

  const handleRemoveItem = useCallback((id: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  }, [dispatch]);

  return (
    <div className="cart-container" data-testid="cart">
      <h2>Tu Carrito</h2>

      {items.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        <>
          <ul className="cart-items" role="list">
            {items.map((item: CartItem) => (
              <li key={item.id} className="cart-item">
                <div className="cart-item-info">
                  <h3 className="cart-item-title">{item.title}</h3>
                  <p className="cart-item-price">
                    {formatPrice(item.price)} x {item.quantity}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveItem(item.id)}
                  className="remove-item-button"
                  aria-label={`Eliminar ${item.title} del carrito`}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>

          <div className="cart-summary" aria-live="polite">
            <h3>Total: {formatPrice(total)}</h3>
            <button
              type="button"
              onClick={handleCheckout}
              className="checkout-button"
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
