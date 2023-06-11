import React, { useState } from 'react';
import { Cart } from 'react-bootstrap-icons';
import Item1 from '../Assets/greek_salad.jpg';
import Item2 from '../Assets/bruchetta.svg';
import Item3 from '../Assets/lemon_dessert.jpg';
import Item4 from '../Assets/item4.jpg';



function Menu() {
  const menuItems = [
    { id: 1, name: 'Greek Salad', price: 10, photo: Item1 },
    { id: 2, name: 'Bruchetta', price: 12, photo: Item2 },
    { id: 3, name: 'Lemon Dessert', price: 8, photo: Item3 },
    { id: 4, name: 'Roasted Chicken', price: 15, photo: Item4 },
  ];

  const [cart, setCart] = useState(menuItems.reduce((obj, item) => ({ ...obj, [item.id]: 0 }), {}));
  const [isCartOpen, setIsCartOpen] = useState(false);

  const total = menuItems.reduce((sum, item) => sum + cart[item.id] * item.price, 0);

  const adjustQuantity = (id, amount) => {
    setCart({ ...cart, [id]: Math.max(0, cart[id] + amount) });
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div>
      <h2 className="text-center mt-4 mb-4" style={{ fontFamily: 'Verdana', fontSize: '24px', fontStyle: 'italic' }}>Menu</h2>
      <div className="row">
        {menuItems.map(item => (
          <div key={item.id} className="col-md-6 col-lg-4 mb-4">
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
  {menuItems.map(item => (
    cart[item.id] > 0 && (
      <li key={item.id} className="cart-item">
        <span>{item.name}: {cart[item.id]} x ${item.price} = ${cart[item.id] * item.price}</span>
        <button className="decrement-btn" onClick={() => adjustQuantity(item.id, -1)}>-</button>
        <button className="increment-btn" onClick={() => adjustQuantity(item.id, 1)}>+</button>
      </li>
    )
  ))}
</ul>
    <h4 className="cart-total">Total: ${total}</h4>
    <button onClick={() => setCart(menuItems.reduce((obj, item) => ({ ...obj, [item.id]: 0 }), {}))} className="clear-cart-btn">Clear Cart</button>
    <button className="check-out">Check out</button>
  </div>   
      )}  
    </div>
  );
}

export default Menu;
