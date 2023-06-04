import React from 'react';
import {Routes, Route } from 'react-router-dom';
import './App.css';

import Header from './Header';
import Footer from './Footer';
import Menu from './Page/Menu';
import Reservation from './Page/Reservation';
import Contact from './Page/Contact';
import Home from './Page/Home';
import Nav from './Nav';

function App() {
  return (
    <div>
      <Header />
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/reservation' element={<Reservation />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
