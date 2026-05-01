import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className='footer'>
        <div className='footer-container'>
            <div className='footer-grid'>
                <div className="footer-brand">
                   <h2>LoanAptech</h2>
                   <p>Your trusted partner for fast, transparent, <br/> and affordable loan solutions.</p>
                </div>
                    <div className="footer-links">
                        <h3>Quick Links</h3>
                        <ul>
                        <li><Link to="/home">Home</Link></li>
                        <li><Link to="/loans">Loan Products</Link></li>
                        <li><Link to="/applyloan">Apply Now</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        </ul>
                    </div>
                    <div className="footer-links">
                        <h3>Support</h3>
                        <ul>
                        <li><Link to="/contact">Contact Us</Link></li>
                        <li><Link to="/faq">Faq</Link></li>
                        <li><Link to="/privacy">Privacy Policy</Link></li>
                        <li><Link to="/terms">Terms of service</Link></li>
                        </ul>
                    </div>
                    <div className="footer-contact">
                        <h3>Get in Touch</h3>
                        <a href="mailto:support@loanaptech.com">support@loanaptech.com</a>
                        <a href="tel:+15551234567">+1(555) 123-4567</a>
                        <p>Mon-Fri: 9AM-6PM EST</p>
                    </div>
            </div>
            <div className='footer-bottom'>
                <p>&copy; 2026 LoanAptech. All rights reserved.</p>
            </div>
        </div>
    </footer>

  );
}