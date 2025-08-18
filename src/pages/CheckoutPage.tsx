import React, { useState, useCallback } from 'react';
import { useCart } from '../context/CartContext';
import type { CartItem } from '../types/cart';
import { useNavigate } from 'react-router-dom';

type FormData = {
  name: string;
  email: string;
  address: string;
};

const formatPrice = (value: number) => `$${value.toFixed(2)}`;

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useCart();
  const { items, total } = state;

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    address: '',
  });

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aquí iría la lógica de envío a un backend
    dispatch({ type: 'CLEAR_CART' });
    // TODO: 📌 Implementar limpieza de carrito despues de que la compra fue satisfactoria
    alert('Compra realizada con éxito!');
    navigate('/');
  };

  return (
    <div className="checkout-page" data-testid="checkout-page">
      <h1>Finalizar Compra</h1>

      <div className="checkout-container">
        <section className="cart-summary" aria-labelledby="summary-title">
          <h2 id="summary-title">Resumen del Pedido</h2>
          <ul>
            {items.map((item: CartItem) => (
              <li key={item.id}>
                {item.title} — {formatPrice(item.price)} x {item.quantity}
              </li>
            ))}
          </ul>
          <h3>Total: {formatPrice(total)}</h3>
        </section>

        <form onSubmit={handleSubmit} className="checkout-form" noValidate>
          <h2>Información de Envío</h2>

          <div className="form-group">
            <label htmlFor="name">Nombre Completo</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Tu nombre y apellidos"
              autoComplete="name"
              value={formData.name}
              onChange={handleInputChange}
              minLength={2}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="tucorreo@ejemplo.com"
              autoComplete="email"
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
              placeholder="Calle 123 #45-67, Bogotá"
              autoComplete="address-line1"
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
