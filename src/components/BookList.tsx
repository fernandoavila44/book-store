import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import type { Book } from '../types/book';
import { useCart } from '../context/CartContext';

const BookList = () => {
  const { data: books, loading, error } = useFetch<Book[]>('http://localhost:3001/books');
  const { dispatch } = useCart();

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;
 //TODO: 📌 implementar funcion para agregar el libro al carrito

  const addToCart = (book: Book) => {
    dispatch({ type: 'ADD_ITEM', payload: book });
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
