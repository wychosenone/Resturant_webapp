
import React, { useContext, useState } from 'react';
import { Cart } from 'react-bootstrap-icons';
import Item1 from '../Assets/greek_salad.jpg';
import Item2 from '../Assets/bruchetta.svg';
import Item3 from '../Assets/lemon_dessert.jpg';
import Item4 from '../Assets/item4.jpg';
import { UserContext } from '../UserContext';
import {useNavigate} from 'react-router-dom'


function Menu() {
  const { username } = useContext(UserContext);
  const navigate = useNavigate();
 

  const menuItems = [
    { id: 1, name: 'Greek Salad', price: 10, photo: Item1 },
    { id: 2, name: 'Bruchetta', price: 12, photo: Item2 },
    { id: 3, name: 'Lemon Dessert', price: 8, photo: Item3 },
    { id: 4, name: 'Roasted Chicken', price: 15, photo: Item4 },
  ];

  const [cart, setCart] = useState(JSON.parse(localStorage.getItem(`${username}-cart`)) || menuItems.reduce((obj, item) => ({ ...obj, [item.id]: 0 }), {}));
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutProgress, setCheckoutProgress] = useState(0);
  const total = menuItems.reduce((sum, item) => sum + cart[item.id] * item.price, 0);
  const adjustQuantity = (id, amount) => {
    const newCart = { ...cart, [id]: Math.max(0, cart[id] + amount) };
    setCart(newCart);
    localStorage.setItem(`${username}-cart`, JSON.stringify(newCart));
  };
    const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleCheckOut = () => {
    let progressInterval;

    setCheckoutProgress(0);
    progressInterval = setInterval(() => {
      setCheckoutProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(progressInterval);
          return 100;
        } else {
          return prevProgress + 10;
        }
      });
    }, 300);

    setTimeout(() => {
      const orderDetails = menuItems.reduce((obj, item) => {
        if (cart[item.id] > 0) {
          return { ...obj, [item.id]: { name: item.name, quantity: cart[item.id], price: item.price } };
        }
        return obj;
      }, {});

      localStorage.setItem(`${username}-order`, JSON.stringify(orderDetails));
      navigate('/confirmorder');
    }, 3000);
};



  return (
    <div className="menu-content">
      <h2 className="text-center mt-4 mb-4">Menu</h2>
      <div className="row mx-auto">
        {menuItems.map(item => (
          <div key={item.id} className="col-md-4 mb-4">
            <div className="card p-2 m-2">
              <img src={item.photo} alt={item.name} className="card-img-top" />
              <div className="card-body text-center">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">${item.price}</p>
                <div className="d-flex align-items-center justify-content-center">
                  <button className="decrement-btn" onClick={() => adjustQuantity(item.id, -1)}>-</button>
                  <span>{cart[item.id]}</span>
                  <button className="increment-btn" onClick={() => adjustQuantity(item.id, 1)}>+</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Cart className="cart-icon" onClick={toggleCart} size={50} />
      {isCartOpen && (
        <div className="cart-overlay">
          <button onClick={toggleCart} className="close-cart-btn">X</button>
          <h3 className="cart-title">Shopping Cart</h3>
          <ul className="cart-items">
  {Object.keys(cart).map(itemId => {
    const item = menuItems.find(item => item.id === parseInt(itemId));
    if (cart[itemId] > 0) {
      return (
        <li key={item.id} className="cart-item">
          <span>{item.name}: {cart[itemId]} x ${item.price} = ${cart[itemId] * item.price}</span>
          <button className="decrement-btn" onClick={() => adjustQuantity(item.id, -1)}>-</button>
          <button className="increment-btn" onClick={() => adjustQuantity(item.id, 1)}>+</button>
        </li>
      );
    }
    return null;
  })}
</ul>

          <h4 className="cart-total">Total: ${total}</h4>
          <button onClick={() => setCart(menuItems.reduce((obj, item) => ({ ...obj, [item.id]: 0 }), {}))} className="clear-cart-btn">Clear Cart</button>
          <button className="check-out" onClick={handleCheckOut}>Check out</button>
        </div>
      )}
      {checkoutProgress > 0 && checkoutProgress < 100 && (
      <div className="parent-container">
          <div className="progress-bar-container">
            <p style={{ marginBottom: '20px' }}>Processing to payment</p>
            <div className="progress-bar">
            <span style={{width: `${checkoutProgress}%`}}>{checkoutProgress}%</span>
         </div>
      </div>
       </div>
      )}
    </div>
  );
}

export default Menu;
