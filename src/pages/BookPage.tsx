import React, { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import useFetch from '../hooks/useFetch';
import type { Book } from '../types/book';

const formatPrice = (value: number) => `$${value.toFixed(2)}`;

const BookPage: React.FC = () => {
  
  const { id } = useParams<{ id: string }>();
  const { dispatch } = useCart();

  const { data: book, loading, error } = useFetch<Book>(
    `http://localhost:3001/books/${id}`
  );

  const handleAddToCart = useCallback(() => {
    if (book) {
      dispatch({ type: 'ADD_ITEM', payload: book });
    }
  }, [book, dispatch]);

  if (loading) return <p>Cargando libro...</p>;
  if (error) return <p role="alert">Error: {error}</p>;
  if (!book) return <p>Libro no encontrado</p>;

  
  return (
    <div className="book-detail" data-testid="book-detail">
      <h1>{book.title}</h1>
      <p>Precio: {formatPrice(book.price)}</p>
      {book.description && <p>{book.description}</p>}

      <button
        type="button"
        onClick={handleAddToCart}
        className="add-to-cart"
        aria-label={`Añadir ${book.title} al carrito`}
      >
        Añadir al carrito
      </button>
    </div>
  );
};

export default BookPage;
