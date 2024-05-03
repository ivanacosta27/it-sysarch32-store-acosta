import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import './App.css';

import Header from './components/Header';
import Home from './components/Home';
import Book from './components/Book';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/book/:id" element={<Book />} /> 
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
