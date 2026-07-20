import React from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import type { Book } from '../types/book';
import useFetch from '../hooks/useFetch';

const BookPage: React.FC = () => {
  //useParams es un hook de react router => https://reactrouter.com/api/hooks/useParams
  const { id } = useParams<{ id: string }>();
  const { dispatch } = useCart();

    const { data: book, loading, error } = useFetch<Book[]>(`http://localhost:3001/books/${id}`);

  if (loading) return <p>Cargando libro...</p>;
  if (!book) return <p>Libro no encontrado</p>;

  //TODO: 📌 usar el hook useFetch para consultar la informacion de un libro mediante el id
  //IMPORTANTE: 📌 Despues de realizar esta implementacion descomentar las lineas 10-11 y desde la 17 a la 25
  return (
    <div className="book-detail">
      <h1>{book.title}</h1>
      <img src={book.coverImage} alt={book.title} style={{width: "200px"}} />
      <p>Precio: ${book.price.toFixed(2)}</p>
      {book.description && <p>{book.description}</p>}
      <button
        onClick={() => dispatch({ type: 'ADD_ITEM', payload: book })}
        className="add-to-cart"
      >
        Añadir al carrito
      </button>
    </div>
  );
};

export default BookPage;