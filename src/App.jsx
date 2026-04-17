import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './components/About';
import Footer from './components/Footer';
import Contact from './components/Contact';
import Terms from './components/Terms';

export default function App() {
  return (
    <Router>
    <div className='App'>
      <Routes>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/terms" element={<Terms/>}/>
      </Routes>

      <Footer/>
    </div>
    </Router>  
  );
}