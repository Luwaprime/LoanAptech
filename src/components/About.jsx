import React from 'react';
import './About.css';

export default function About() {
  return (
    <div className='about-page'>
      <div className='about-container'>
      <h1>About Us</h1>
      <p>We are a trusted financial platform dedicated to making loan access simple,fast and transparent. Our mission is to <br/> empower individuals and small business with flexible financing options without hassle of traditional banking <br/> bureaucracy</p>
      <div class="features">
                <div class="feature">
                    <h3>Fast Approval</h3>/
                    <p>Get descisions in minutes, not <br/> weeks</p>
                </div>
                <div class="feature">
                    <h3>No Hidden Fees</h3>
                    <p>100% free to apply - no hidden <br/>charges</p>
                </div>
                <div class="feature">
                    <h3>Secure & Private</h3>
                    <p>Your data is encrypted and <br/> never shared</p>
                </div>
            </div>  
      </div>
    </div>

  );
}