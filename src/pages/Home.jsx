import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

export default function Home () {
    return(
        <div className='home-container'>
            <div className='hero-section'>
               <h1 className='hero-title'>Welcome to LoanAptech</h1>
               <p className='hero-subtitle'>Get instant personal loans up to $50,000 with low interest rates and flexible repayment options</p>
               <Link to="/applyloan" className='hero-cta-btn'>Apply now, its free</Link>    
            </div>
            <div className='features-grid'>
                 <div className='feature-card'>
                   <div className='feature-icon'>Lightning Fast</div>
                   <h3>Lightning Fast Approval</h3>
                   <p>Get decision in under 10 minutes</p>
                 </div>
                <div className='feature-card'>
                   <div className='feature-icon'>No Paperwork</div>
                   <h3>No Paperwork Required</h3>
                   <p>100% digital & hassle-free process</p>
                </div>
                <div className='feature-card'>
                   <div className='feature-icon'>Best Rates</div>
                   <h3>Lowest Interest Rates</h3>
                   <p>Starting from just 8.99% p.a.</p>
                </div>
        </div>
        <div className='home-links'>
            Already applied ?
            <Link  to="/loanstatus" className='home-link'>Check Loan Status</Link>
            <Link  to="/dashboard" className='home-link' >Go to Dashboard</Link>
         </div>
    </div>

    );
}