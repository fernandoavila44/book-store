import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const CheckoutPage: React.FC = () => {
  const { state, dispatch } = useCart();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: ''
  });

  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.address) {
      alert('Por favor completa todos los campos');
      return;
    }

    // Simulación de pago / confirmación de pedido
    setOrderPlaced(true);

    // Vaciar carrito después de "comprar"
    dispatch({ type: 'CLEAR_CART' });
  };

  if (orderPlaced) {
    return (
      <div className="checkout-success">
        <h2>¡Gracias por tu compra, {formData.name}!</h2>
        <p>Tu pedido ha sido confirmado y será enviado a:</p>
        <p><strong>{formData.address}</strong></p>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h2>Finalizar Compra</h2>

      {state.items.length === 0 ? (
        <p>No tienes productos en el carrito.</p>
      ) : (
        <>
          <div className="order-summary">
            <h3>Resumen de tu pedido:</h3>
            <ul>
              {state.items.map(item => (
                <li key={item.id}>
                  {item.title} x {item.quantity} - ${item.price.toFixed(2)}
                </li>
              ))}
            </ul>
            <h3>Total: ${state.total.toFixed(2)}</h3>
          </div>

          <form className="checkout-form" onSubmit={handleSubmit}>
            <h3>Datos del comprador</h3>
            <input
              type="text"
              name="name"
              placeholder="Nombre completo"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="text"
              name="address"
              placeholder="Dirección de envío"
              value={formData.address}
              onChange={handleChange}
            />
            <button type="submit" className="pay-button">
              Confirmar y Pagar
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default CheckoutPage;
