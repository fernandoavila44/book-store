import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useCart();
  const [isAnimating, setIsAnimating] = useState(false);
  const [prevItemCount, setPrevItemCount] = useState(state.items.length);

  useEffect(() => {
    if (state.items.length > prevItemCount) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 600);
    }
    setPrevItemCount(state.items.length);
  }, [state.items.length, prevItemCount]);

  return (
    <nav className="navbar">
      <h1 onClick={() => navigate('/')}>Bookstore</h1>
      <div className="nav-links">
        <button onClick={() => navigate('/')}>Inicio</button>
        <button
          onClick={() => navigate('/cart')}
          className={`cart-button ${isAnimating ? 'animate' : ''}`}
          data-count={state.items.length}
        >
          Carrito
        </button>
      </div>
    </nav>
  );
};

export default Navbar;