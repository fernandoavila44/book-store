import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import BookList from './components/BookList';
import Cart from './components/Cart';
import BookPage from './pages/BookPage';
import CheckoutPage from './pages/CheckoutPage';

const App: React.FC = () => {
  return (
    <CartProvider>
      <Router>
        <header className="navbar">
          <nav>
            <ul className="nav-links">
              <li>
                <Link to="/">Inicio</Link>
              </li>
              <li>
                <Link to="/cart">Carrito</Link>
              </li>
            </ul>
          </nav>
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<BookList />} />
            <Route path="/books/:id" element={<BookPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
        </main>
      </Router>
    </CartProvider>
  );
};

export default App;
