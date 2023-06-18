import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

function Payment() {
  const [cardholderName, setCardholderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { username, signInStatus } = useContext(UserContext);
  const [isUpdatingCard, setIsUpdatingCard] = useState(false);

  useEffect(() => {
    if (signInStatus && !isUpdatingCard) {
      const paymentInfo = JSON.parse(localStorage.getItem(`${username}-payment`) || '{}');
      setCardholderName(paymentInfo.cardholderName || '');
      setCardNumber(paymentInfo.cardNumber || '');
      setExpiryDate(paymentInfo.expiryDate || '');
      setCvv('•••');
    }
    alert("Please sign in to view profile.");
  }, [signInStatus, username, isUpdatingCard]);

  const handleSubmit = e => {
    e.preventDefault();

    if (!signInStatus) {
      setErrorMessage('You need to sign in before making a payment');
      return;
    }

    if (!isUpdatingCard) {
      setIsUpdatingCard(true);
      setCardholderName('');
      setCardNumber('');
      setExpiryDate('');
      setCvv('');
      setErrorMessage('');
      return;
    }

    const paymentInfo = {
      cardholderName,
      cardNumber,
      expiryDate,
      cvv
    };

    localStorage.setItem(`${username}-payment`, JSON.stringify(paymentInfo));
    setErrorMessage('Payment submitted!');
    setIsUpdatingCard(false); // Once the card information is submitted, stop updating
  };

  return (
    <div className="container">
      <h2 className="mt-4 mb-4 text-center" >Payment</h2>
      <form onSubmit={handleSubmit}>
        {errorMessage && <p className="text-danger text-center">{errorMessage}</p>}
        <div className="form-group">
          <label htmlFor="cardholderName">Cardholder Name</label>
          <input
            type="text"
            className="form-control"
            id="cardholderName"
            value={cardholderName}
            onChange={e => setCardholderName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="cardNumber">Card Number</label>
          <input
            type="text"
            className="form-control"
            id="cardNumber"
            value={cardNumber}
            onChange={e => setCardNumber(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="expiryDate">Expiry Date</label>
          <input
            type="text"
            className="form-control"
            id="expiryDate"
            value={expiryDate}
            onChange={e => setExpiryDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
        <label htmlFor="cvv">CVV</label>
        <input
             type={signInStatus ? "password" : "text"}
             className="form-control"
             id="cvv"
             value={cvv}
             onChange={e => setCvv(e.target.value)}
             required
             />
        </div>
        <div className='mt-4 mb-4 text-center'>
        <button type="submit" className="btn btn-primary mt-3">
          {isUpdatingCard ? "Submit Payment" : "Change to Different Card"}
        </button>
        </div>
      </form>
    </div>
  );
}

export default Payment;
