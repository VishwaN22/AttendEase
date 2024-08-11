import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div>
      <nav className="navbar">
        <div className="container">
          <a href="/" className="logo">AttendEase</a>
          <div className="nav-buttons">
            <Link to="/login" className="btn">Login</Link>
            <Link to="/register" className="btn btn-primary">Register</Link>
          </div>
        </div>
      </nav>

      <header className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Streamline Your Attendance Management</h1>
          <p className="hero-tagline">Effortlessly track and manage employee attendance with AttendEase</p>
          {/* <Link to="/register" className="btn btn-primary">Get Started</Link> */}
        </div>
        <div className="hero-image">
          {/* Add your main hero image here */}
         
        </div>
      </header>

      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Features</h2>
          <div className="features">
            <div className="feature-item">
              <img src="https://img.freepik.com/free-vector/confirmed-attendance-concept-illustration_114360-7495.jpg?size=626&ext=jpg" alt="Feature 1" />
              <h3>Easy Tracking</h3>
              <p>Monitor employee attendance with just a few clicks.</p>
            </div>
            <div className="feature-item">
              <img src="https://img.freepik.com/free-vector/hand-drawn-gathering-data-business-concept_23-2149170409.jpg?ga=GA1.1.1939710569.1722662196&semt=ais_hybrid" alt="Feature 2" />
              <h3>Automated Reports</h3>
              <p>Generate detailed attendance reports effortlessly.</p>
            </div>
            <div className="feature-item">
              <img src="https://img.freepik.com/free-vector/business-woman-inserting-credit-card-into-smartphone_74855-2347.jpg?ga=GA1.1.1939710569.1722662196&semt=ais_hybrid" alt="Feature 3" />
              <h3>Secure and Reliable</h3>
              <p>Ensure data security with top-notch encryption.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 AttendEase. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
