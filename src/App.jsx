import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './components/About';
import Footer from './components/Footer';
import Contact from './components/Contact';
import Terms from './components/Terms';
import Faq from './components/Faq';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Signup from './components/signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';


export default function App() {
  return (
    <Router>
    <div className='App'>
      <Navbar/>
      <Routes>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path='/' element={<Home />}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/terms" element={<Terms/>}/>
        <Route path="/faq" element={<Faq/>}/>
      </Routes>

      <Footer/>
    </div>
    </Router>  
  );
}