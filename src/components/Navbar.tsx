import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useCart();

  const totalItems = state.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <nav className="navbar">
      <h1 onClick={() => navigate('/')}>Bookstore</h1>
      <div className="nav-links">
        <button onClick={() => navigate('/')}>Inicio</button>
        <button
          onClick={() => navigate('/cart')}
          className="cart-button"
        >
          Carrito ({totalItems})
        </button>
      </div>
    </nav>
  );
};

export default Navbar;