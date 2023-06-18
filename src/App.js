import React from 'react';
import {Routes, Route } from 'react-router-dom';
import './App.css';
import { UserProvider } from './UserContext';



import Header from './Page/Header';
import Footer from './Page/Footer';
import Menu from './Page/Menu';
import BookingPage from './Page/BookingPage';
import Contact from './Page/Contact';
import Home from './Page/Home';
import Nav from './Page/Nav';
import ConfirmedBooking from './Page/ConfirmBooking';
import SignIn from './Page/SignIn';
import SignUp from './Page/SignUp';
import Profile from './Page/Profile';
import Payment from './Page/Payment';
import ConfirmOrder from './Page/ConfirmOrder';

function App() {
  return (
    <UserProvider>
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <Nav />
      <main className="flex-grow-1">
  
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/bookingpage' element={<BookingPage />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/bookingpage/confirmation' element={<ConfirmedBooking />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/profile' element={<Profile />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/confirmorder" element={<ConfirmOrder />} />

      </Routes>
     
      </main>
      <Footer />
    </div>
    </UserProvider>

  );
}

export default App;
