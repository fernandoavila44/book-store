import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import useFetch from '../hooks/useFetch';
import type { Book } from '../types/book';

const BookList: React.FC = () => {
  const { data: books, loading, error } = useFetch<Book[]>('http://localhost:3001/books');
  const { dispatch } = useCart();

  if (loading) return <p>Cargando libros...</p>;
  if (error) return <p>Error al cargar libros: {error}</p>;
  if (!books) return <p>No se encontraron libros.</p>;

  return (
    <div className="book-list">
      {books.map(book => (
        <div key={book.id} className="book-card">
          <h2>{book.title}</h2>
          <p>Autor: {book.author}</p>
          <p>Precio: ${book.price.toFixed(2)}</p>

          {book.image && <img src={book.image} alt={book.title} className="book-image" />}

          <div className="book-actions">
            <button
              onClick={() => dispatch({ type: 'ADD_ITEM', payload: book })}
              className="add-to-cart"
            >
              Añadir al carrito
            </button>

            <Link to={`/books/${book.id}`} className="details-link">
              Ver detalles
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookList;
