import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import type { CartItem } from '../types/cart';
import { useNavigate } from 'react-router-dom';

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate()
  const { state, dispatch } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica de envío a un backend

    // Limpiar el carrito después de una compra exitosa
    dispatch({ type: 'CLEAR_CART' });
    
    alert('Compra realizada con éxito!');
    navigate('/')
  };

  return (
    <div className="checkout-page">
      <h1>Finalizar Compra</h1>

      <div className="checkout-container">
        <section className="cart-summary">
          <h2>Resumen del Pedido</h2>
          <ul>
            {state.items.map((item: CartItem) => (
              <li key={item.id}>
                {item.title} - ${item.price.toFixed(2)} x {item.quantity}
              </li>
            ))}
          </ul>
          <h3>Total: ${state.total.toFixed(2)}</h3>
        </section>

        <form onSubmit={handleSubmit} className="checkout-form">
          <h2>Información de Envío</h2>
          <div className="form-group">
            <label htmlFor="name">Nombre Completo</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Dirección</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="submit-order">
            Confirmar Pedido
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;