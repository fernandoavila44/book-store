import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import type { Book } from '../types/book';
import { useCart } from '../context/CartContext';

const BookList = () => {
  // Usar useFetch para obtener libros de la API
  const { data: books, loading, error } = useFetch<Book[]>('http://localhost:3001/books');

  const {dispatch} = useCart();
  
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;
  //TODO: 📌 implementar funcion para agregar el libro al carrito

  const handleAddtToCart = (book: Book) =>{
    dispatch({type: 'ADD_ITEM', payload: book});
  };




  return (
    <div className="book-grid">
      {books?.map((book) => (
        <div key={book.id} className="book-card">
         
          <div className='content-card'>
            <div className='text-card'>
              <Link to={`/book/${book.id}`}>
              <h3>{book.title}</h3>
              </Link>
              <p>${book.price.toFixed(2)}</p>
            </div>
            <img src={book.coverImage} alt={book.title} style={{width: "60px"}} />
          </div>
          <button
            onClick={() =>handleAddtToCart(book)}
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