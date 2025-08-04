import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useCart();

  return (
    <nav className="navbar">
      <h1 onClick={() => navigate('/')}>Bookstore</h1>
      <div className="nav-links">
        <button onClick={() => navigate('/')}>Inicio</button>
        <button
          onClick={() => navigate('/cart')}
          className="cart-button"
        >
          Carrito ({state.items.length})
        </button>
      </div>
    </nav>
  );
};

export default Navbar;