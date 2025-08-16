/*import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import type { Book } from '../types/book';
import { useState } from 'react';

const BookList = () => {
  const { data: books, loading, error } = useFetch<Book[]>('http://localhost:3001/books');

  const [cart, setCart] = useState<Book[]>([]);

  // 📌 Función para agregar un libro al carrito
  const addToCart = (book: Book) => {
    setCart(prev => [...prev, book]);
    console.log(`"${book.title}" añadido al carrito`);
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="book-grid">
      {books?.map((book) => (
        <div key={book.id} className="book-card">
          <Link to={`/book/${book.id}`}>
            <h3>{book.title}</h3>
          </Link>
          <p>${book.price.toFixed(2)}</p>
          <button
            onClick={() => addToCart(book)}
            aria-label={`Añadir ${book.title} al carrito`}
          >
            Añadir al carrito
          </button>
        </div>
      ))}
    </div>
  );
};

export default BookList;*/

import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import type { Book } from '../types/book';
import { useCart } from '../context/CartContext'; // 🔹 Importa el contexto

const BookList = () => {
  const { data: books, loading, error } = useFetch<Book[]>('http://localhost:3001/books');
  const { dispatch } = useCart(); // 🔹 Obtiene el dispatch del contexto

  const addToCart = (book: Book) => {
    dispatch({ type: 'ADD_ITEM', payload: book }); // 🔹 Actualiza el contexto global
    console.log(`"${book.title}" añadido al carrito`);
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="book-grid">
      {books?.map((book) => (
        <div key={book.id} className="book-card">
          <Link to={`/book/${book.id}`}>
            <h3>{book.title}</h3>
          </Link>
          <p>${book.price.toFixed(2)}</p>
          <button
            onClick={() => addToCart(book)}
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



