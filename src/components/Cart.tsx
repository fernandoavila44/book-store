import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart: React.FC = () => {
  const { state, dispatch } = useCart();

  if (state.items.length === 0) {
    return (
      <div className="cart-container">
        <h1>Tu carrito está vacío</h1>
        <Link to="/" className="back-to-store">
          Volver a la tienda
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Carrito de Compras</h1>

      <ul className="cart-items">
        {state.items.map(item => (
          <li key={item.id} className="cart-item">
            <div className="item-info">
              <strong>{item.title}</strong>
              <p>Precio: ${item.price.toFixed(2)}</p>
              <p>Cantidad: {item.quantity}</p>
            </div>
            <button
              onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}
              className="remove-item"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>

      <div className="cart-summary">
        <h2>Total: ${state.total.toFixed(2)}</h2>
      </div>

      <div className="cart-actions">
        <button
          onClick={() => dispatch({ type: 'CLEAR_CART' })}
          className="clear-cart"
        >
          Vaciar carrito
        </button>
        <Link to="/checkout" className="checkout-button">
          Ir al pago
        </Link>
      </div>
    </div>
  );
};

export default Cart;
