import React from 'react';
import BookList from '../components/BookList';

const Home: React.FC = () => {
  return (
    <div className="home-page">
      <header className="page-header">
        <h1>Bienvenido a Nuestra Librería</h1>
        <p>Descubre nuestros libros más populares</p>
      </header>
      <BookList />
    </div>
  );
};

export default Home;