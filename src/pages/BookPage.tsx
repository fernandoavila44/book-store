import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { useCart } from '../context/CartContext';
import type { Book } from '../types/book';

const BookPage = () => {
  // Obtenemos el id desde la URL
  const { id } = useParams();

  // Llamamos a la API para traer el libro por id
  const { data: book, loading, error } = useFetch<Book>(
    `http://localhost:3001/books/${id}`
  );

  // Accedemos al carrito
  const { dispatch } = useCart();

  // Función simple para agregar al carrito
  const addToCart = () => {
    if (book) {
      dispatch({ type: 'ADD_ITEM', payload: book });
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!book) return <p>Libro no encontrado</p>;

  return (
    <div className="book-page">
      <h2>{book.title}</h2>
      <p>Precio: ${book.price.toFixed(2)}</p>

      <button onClick={addToCart}>
        Añadir al carrito
      </button>
    </div>
  );
};

export default BookPage;
