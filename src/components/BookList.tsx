import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { useCart } from '../context/CartContext';
import type { Book } from '../types/book';

const BookList = () => {
  // Usar useFetch para obtener libros de la API
  const { data: books, loading, error } = useFetch<Book[]>('http://localhost:3001/books');
  const { dispatch } = useCart();

  const handleAddToCart = (book: Book) => {
    dispatch({ type: 'ADD_ITEM', payload: book });
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
            onClick={() => handleAddToCart(book)}
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