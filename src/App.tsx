import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Home from './pages/Home';
import BookPage from './pages/BookPage';
import CheckoutPage from './pages/CheckoutPage';
import Navbar from './components/Navbar';
import CartPage from './pages/CartPage';

const App: React.FC = () => {
  return (
    <Router>
      <CartProvider>
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/book/:id" element={<BookPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
        </main>
      </CartProvider>
    </Router>
  );
};

export default App;