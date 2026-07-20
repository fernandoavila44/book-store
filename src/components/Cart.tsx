import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import type { CartItem } from '../types/cart';
import type { Book } from '../types/book';


const Cart: React.FC = () => {
  const { state } = useCart();
  const navigate = useNavigate();
  const {dispatch} = useCart()

  const handleCheckout = () => {
    navigate('/checkout');
  };

  //TODO: 📌 Implementar funcion para eliminar un libro del carrito

  const handleDeleteToCart = (id: number) => {
    dispatch({type: 'REMOVE_ITEM', payload: id});
  };

    const handleAddtToCart = (book: Book) =>{
    dispatch({type: 'ADD_ITEM', payload: book});
  };


  return (
    <div className="cart-container">
      <h2>Tu Carrito</h2>
      {state.items.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        <>
          <ul className="cart-items">
            {state.items.map((item: CartItem) => (
              <li key={item.id} className="cart-item">
                <div>
                  <img src={item.coverImage} alt={item.title} style={{width: "60px"}} />
                  <div className='text-card'>
                    <h3>{item.title}</h3>
                    <p>${item.price.toFixed(2)} x {item.quantity}</p>
                  </div>
                </div>
                <div className='group-button'>
                  <button className="button-mas"
                    onClick={() => handleAddtToCart(item)}
                    aria-label={`Añadir ${item.title} del carrito`}
                  >
                    +
                  </button>
                  <button className="button-menos"
                    onClick={() => handleDeleteToCart(item.id)}
                    aria-label={`Eliminar ${item.title} del carrito`}
                  >
                    _
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <h3>Total: ${state.total.toFixed(2)}</h3>
            <button
              onClick={handleCheckout}
              className="checkout-button"
            >
              Proceder al Pago
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;