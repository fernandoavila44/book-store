
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { useCart } from '../context/CartContext';
import type { Book } from '../types/book';
import formatCurrency from '../utils/formatCurrency';

const BookList = () => {
  const {
    data: books,
    loading,
    error,
  } = useFetch<Book[]>('http://localhost:3001/books');

  const { dispatch } = useCart();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBooks = (books ?? []).filter((book) =>
    book.title.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  if (loading) {
    return <p>Cargando libros...</p>;
  }

  if (error) {
    return <p>Error al cargar los libros: {error}</p>;
  }

  return (
    <section>
      <div className="book-search">
        <label htmlFor="book-search-input">
          Buscar libros por título
        </label>

        <input
          id="book-search-input"
          type="search"
          placeholder="Ej. Harry Potter..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>

      {filteredBooks.length === 0 ? (
        <p>
          No se encontraron libros con ese título.
        </p>
      ) : (
        <div className="book-grid">
          {filteredBooks.map((book) => (
            <div key={book.id} className="book-card">
              {book.coverImage && (
                <Link to={`/book/${book.id}`}>
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="book-cover"
                  />
                </Link>
              )}

              <Link to={`/book/${book.id}`}>
                <h3>{book.title}</h3>
              </Link>

              <p>{formatCurrency(book.price)}</p>

              <button
                onClick={() =>
                  dispatch({ type: 'ADD_ITEM', payload: book })
                }
                aria-label={`Añadir ${book.title} al carrito`}
              >
                Añadir al carrito
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default BookList;
