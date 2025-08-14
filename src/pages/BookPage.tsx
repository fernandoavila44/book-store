import React from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import useFetch from '../hooks/useFetch';

interface Book {
  id: number;
  title: string;
  price: number;
  description?: string;
  coverImage?: string;
}

//TODO: 📌 usar el hook useFetch para consultar la informacion de un libro mediante el id
  //IMPORTANTE: 📌 Despues de realizar esta implementacion descomentar las lineas 10-11 y desde la 17 a la 25

const BookPage: React.FC = () => {
  //useParams es un hook de react router => https://reactrouter.com/api/hooks/useParams
  const { id } = useParams<{ id: string }>();
  const { dispatch } = useCart();

  const { data: book, loading } = useFetch<Book>(`http://localhost:3001/books/${id}`);

    if (loading) return <p>Cargando libro...</p>;
    if (!book) return <p>Libro no encontrado</p>;
    

  return (
    <div className="book-detail">
       <h1>{book.title}</h1>
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