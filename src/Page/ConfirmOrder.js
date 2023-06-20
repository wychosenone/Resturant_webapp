import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../UserContext';

function ConfirmOrder() {
  const { username } = useContext(UserContext);
  const [order, setOrder] = useState({});
  const [date, setDate] = useState('');

  useEffect(() => {
    const savedOrder = JSON.parse(localStorage.getItem(`${username}-order`));
    setOrder(savedOrder);
    const currentDate = new Date();
    setDate(currentDate.toString());
  }, [username]);

  if (!order) {
    return <p>Loading...</p>;
  }

  return (

        <div className="container order-confirmation">
          <h2 className="text-center mt-4 mb-4">Order Confirmation</h2>
          <div>
            <p>Thank you for your order, {username}!</p>
            <h3>Order Details:</h3>
            <ul className="order-list">
              {Object.values(order).map((item) => (
                item.quantity > 0 && (
                  <li key={item.name}>
                    {item.name}: {item.quantity} dishes(s)
                  </li>
                )
              ))}
            </ul>
            <h4>Total Price: ${Object.entries(order).reduce((total, [itemId, item]) => total + item.quantity * item.price, 0)}</h4>
            <p>Your order was placed at {date}. Thank you for shopping with us!</p>
          </div>
        </div>
    
  );
}

export default ConfirmOrder;
