import React from 'react';
import './Landing.css';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="landing-page">
      <h1 className="big-text" style={{fontWeight:"800"}}>"Empower Yourself: Explore our life-changing courses now!"</h1>
     <Link to="/signin">
      <button className="cta-button">Enroll Now</button>
      </Link>
      
      
    </div>
  );
}