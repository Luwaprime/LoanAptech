import React from 'react';
import './Footer.css';

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
                        <li><a href="/Home">Home</a></li>
                        <li><a href="/Loans">Loan Products</a></li>
                        <li><a href="/Apply">Apply Now</a></li>
                        <li><a href="/about">About Us</a></li>
                        </ul>
                    </div>
                    <div className="footer-links">
                        <h3>Support</h3>
                        <ul>
                        <li><a href="/contact">Contact Us</a></li>
                        <li><a href="#">Faq</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="/terms">Terms of service</a></li>
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