import React from 'react';
import {Routes, Route } from 'react-router-dom';
import './App.css';

import Header from './Header';
import Footer from './Footer';
import Menu from './Page/Menu';
import BookingPage from './Page/BookingPage';
import Contact from './Page/Contact';
import Home from './Page/Home';
import Nav from './Nav';
import ConfirmedBooking from './Page/ConfirmBooking';

function App() {
  return (
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
      </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
