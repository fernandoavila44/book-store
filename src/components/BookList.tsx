import { Link } from 'react-router-dom';
import { useState } from 'react';
import useFetch from '../hooks/useFetch';
import { useCart } from '../context/CartContext';
import type { Book } from '../types/book';

const BookList = () => {
  const { dispatch } = useCart();
  const { data: books, loading, error } = useFetch<Book[]>('http://localhost:3001/books');
  const [animatingButton, setAnimatingButton] = useState<number | null>(null);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleAddToCart = (book: Book) => {
    dispatch({ type: 'ADD_ITEM', payload: book });
    setAnimatingButton(book.id);
    setTimeout(() => setAnimatingButton(null), 600); // Duración de la animación
  };

  return (
    <div className="book-grid">
      {books?.map((book) => (
        <div key={book.id} className="book-card">
          <Link to={`/book/${book.id}`}>
            <h3>{book.title}</h3>
          </Link>
          <p>${book.price.toFixed(2)}</p>
          <button
            onClick={() => handleAddToCart(book)}
            className={animatingButton === book.id ? 'add-to-cart-button animate' : 'add-to-cart-button'}
            aria-label={`Añadir ${book.title} al carrito`}
          >
            Añadir al carrito
          </button>
        </div>
      ))}
    </div>
  );
};

export default BookList;