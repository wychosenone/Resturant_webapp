import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext';

function Profile() {
  const { username, signInStatus } = useContext(UserContext);
  const [userData, setUserData] = useState({
    username: '',
    order: {},
    payment: {},
    reservation: [],
  });

  useEffect(() => {
    if (signInStatus) {
      const user = JSON.parse(localStorage.getItem(username)) || {};
      const userOrder = JSON.parse(localStorage.getItem(`${username}-order`)) || {};
      const userPayment = JSON.parse(localStorage.getItem(`${username}-payment`)) || {};
      const userReservation = JSON.parse(localStorage.getItem(`${username}-reservations`)) || [];

      setUserData({
        username: user.username,
        order: userOrder,
        payment: userPayment,
        reservation: userReservation,
      });
    } else {
      alert('Please sign in to view profile.');
    }
  }, [signInStatus, username]);

  return (
    <div className="container">
      <div className="row justify-content-center mx-auto">
        <div className="col-md-6">
          <div className="card mt-4">
            <div className="card-body">
              <h2 className="card-title text-center">Profile</h2>
              <hr />
              <h5>Username:</h5>
              <p>{userData.username}</p>
              <h5>Order:</h5>
              {userData.order &&
                Object.keys(userData.order).map((key, index) => (
                  <p key={index}>{`${key}: Name - ${userData.order[key].name}, Quantity - ${userData.order[key].quantity}, Price - ${userData.order[key].price}`}</p>
                ))}
              <h5>Payment:</h5>
              {userData.payment && Object.keys(userData.payment).length > 0 ? (
                Object.keys(userData.payment).map((key) => (
                  <p key={key}>{`${key}: ${userData.payment[key]}`}</p>
                ))
              ) : (
                <p>No payment method is set up.</p>
              )}
              <h5>Reservation:</h5>
              {userData.reservation.map((res, index) => (
                <p key={index}>{`Reservation ${index + 1}: Date: ${res.selectedDate}, Time: ${res.selectedTime}, Number: ${res.selectedNumber}, Occasion: ${res.selectedOccasion}`}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
