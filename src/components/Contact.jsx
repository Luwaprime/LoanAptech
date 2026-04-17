import React from 'react';
import './Contact.css';

export default function Contact() {
    return (
        <div className='contact-page'>
            <div className='contact-container'>
                <h1>Contact Us</h1>
                <p>We're here to help! Reach out anytime.</p>
                <div className='contact-info'>   
                <p><span className='info-item'>Email</span>:support@loanapp.com</p>  
                <p><span className='info-item'>Phone</span>:+1(555) 123-4567</p>
                <p><span className='info-item'>Hours</span>:Mon-Fri 9AM-6PM EST</p>
                <form className='contact-form'>
                    <input type="text" placeholder="Your Name"/>
                   <input type="email" placeholder="Your Email"/>
                   <textarea placeholder="Your Message" rows="5"></textarea>
                   <button>Send Message</button>
                </form>
                </div>
            </div>
        </div>
    );
}