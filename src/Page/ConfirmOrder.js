import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext';

function Profile() {
  const { signInStatus, username } = useContext(UserContext);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (signInStatus) {
      // Get user data from local storage
      const userOrder = JSON.parse(localStorage.getItem(`${username}-order`)) || 'No order found';
      const userPayment = JSON.parse(localStorage.getItem(`${username}-payment`)) || 'No payment info found';
      const userReservation = JSON.parse(localStorage.getItem(`${username}-reservation`)) || 'No reservation found';

      setUserData({ order: userOrder, payment: userPayment, reservation: userReservation });
    } else {
      alert('You must be signed in to view your profile.');
    }
  }, [signInStatus, username]);

  if (!signInStatus) {
    return <div>Please sign in to view your profile.</div>;
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-4">
            <div className="card-body">
              <h2 className="card-title">Profile</h2>
              <hr />
              <div>
                <h5>Username: {username}</h5>
              </div>
              <div>
                <h5>Order: {userData.order}</h5>
              </div>
              <div>
                <h5>Reservation: {userData.reservation}</h5>
              </div>
              <div>
                <h5>Payment: {userData.payment}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
