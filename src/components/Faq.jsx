import React from 'react';
import './Faq.css';

export default function Faq() {
    return(
        <div className='faq-page'>
            <div className='faq-container'>
                <h1>Frequently Asked Questions</h1>
                <p className='faq-subtitle'>Everything you need to know about our loan services.</p>
                <div className="faq-list">
                    <details className='faq-item'>
                        <summary>How fast can i get approved?</summary>
                        <p>As fast as you want</p>
                    </details>
                </div>
                <div className="faq-list">
                    <details className='faq-item'>
                        <summary>Do you check your credit score?</summary>
                        <p>Credit score is checked during the application process.</p>
                    </details>
                </div>
                <div className="faq-list">
                    <details className='faq-item'>
                        <summary>What documents do i need?</summary>
                        <p>You will need to provide a government-issued ID, proof of income, and bank statements.</p>
                    </details>
                </div>
                <div className="faq-list">
                    <details className='faq-item'>
                        <summary>Can i pay off early?</summary>
                        <p>Yes, you can pay off your loan early without any penalties.</p>
                    </details>
                </div>
                <div className="faq-list">
                    <details className='faq-item'>
                        <summary>Is my information secure?</summary>
                        <p>Yes, we use industry-standard security measures to protect your information.</p>
                    </details>
                </div>
                <div className="faq-list">
                    <details className='faq-item'>
                        <summary>What if i have bad credit? </summary>
                        <p>We understand that everyone's financial situation is unique. If you have a bad credit score, we still offer loan options that may be suitable for you.</p>
                    </details>
                </div>
            </div>
        </div>
    );
} 