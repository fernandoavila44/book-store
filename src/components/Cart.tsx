import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import type { CartItem } from '../types/cart';

const Cart: React.FC = () => {
  const { state, dispatch } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  //TODO: 📌 Implementar funcion para eliminar un libro del carrito
  const handleRemove = (id: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  return (
    <div className="cart-container">
      <h2>Tu Carrito</h2>
      {state.items.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        <>
          <ul className="cart-items">
            {state.items.map((item: CartItem) => (
              <li key={item.id} className="cart-item">
                <div>
                  <h3>{item.title}</h3>
                  <p>${item.price.toFixed(2)} x {item.quantity}</p>
                </div>
                <button
                  onClick={() => handleRemove(item.id)}
                  aria-label={`Eliminar ${item.title} del carrito`}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <h3>Total: ${state.total.toFixed(2)}</h3>
            <button
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
